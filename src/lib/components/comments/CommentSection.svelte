<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { format, formatDistanceToNow } from 'date-fns';
	import { goto } from '$app/navigation';
	import CommentItem from './CommentItem.svelte';
	import ReportModal from './ReportModal.svelte';
	import { getCurrentUser, getUserProfile } from '$lib/services/user.service';
	import { createComment, createReply, getArticleComments } from '$lib/services/news.service';
	
	export let articleId: string;
	export let comments: Comment[] = [];
	
	// Pagination state
	let currentOffset = 0;
	const COMMENTS_PER_PAGE = 10;
	let hasMoreComments = true;
	let loadingMoreComments = false;
	let loadMoreTrigger: HTMLDivElement;
	let observer: IntersectionObserver | null = null;
	
	interface Reply {
		id: string;
		author: string;
		avatar: string | null;
		content: string;
		date: Date;
		likes: number;
		dislikes: number;
		isVerified?: boolean;
		isPro?: boolean; // Tournaments+ member
		replyTo?: string;
		userId?: string | null;
	}
	
	interface Comment {
		id: string;
		author: string;
		avatar: string | null;
		content: string;
		date: Date;
		likes: number;
		dislikes: number;
		isVerified?: boolean;
		isPinned?: boolean;
		isPro?: boolean; // Tournaments+ member
		replies: Reply[];
		userId?: string | null;
	}
	
	let newComment = '';
	let commentAuthor = '';
	let showComments = true;
	let sortBy: 'newest' | 'oldest' | 'popular' = 'newest';
	let showReportModal = false;
	let reportTarget: { type: 'comment' | 'reply'; id: string; author: string } | null = null;
	let reportSuccessMessage = '';
	
	// Authentication state
	let user = null;
	let userProfile = null;
	let loadingUser = true;
	let submittingComment = false;
	let submittingReply = false;
	let errorMessage = '';
	
	const dispatch = createEventDispatcher();
	
	onMount(async () => {
		user = await getCurrentUser();
		if (user) {
			userProfile = await getUserProfile(user.id);
			if (userProfile) {
				commentAuthor = userProfile.display_name || userProfile.username || '';
			}
		}
		loadingUser = false;
		
		// Load initial comments if not already loaded
		if (comments.length === 0) {
			await loadComments();
		}
		
		// Set up infinite scroll observer
		setupInfiniteScroll();
	});
	
	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
	
	// Reactive statement to set up observer when trigger element becomes available
	$: if (loadMoreTrigger && !loadingMoreComments && hasMoreComments) {
		setupInfiniteScroll();
	}
	
	function setupInfiniteScroll() {
		// Disconnect existing observer if any
		if (observer) {
			observer.disconnect();
		}
		
		if (!loadMoreTrigger) return;
		
		observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !loadingMoreComments && hasMoreComments) {
					loadMoreComments();
				}
			},
			{
				rootMargin: '100px' // Start loading 100px before reaching the bottom
			}
		);
		
		observer.observe(loadMoreTrigger);
	}
	
	async function loadComments(reset: boolean = false) {
		if (reset) {
			currentOffset = 0;
			comments = [];
			hasMoreComments = true;
		}
		
		if (loadingMoreComments || !hasMoreComments) return;
		
		loadingMoreComments = true;
		
		try {
			const newComments = await getArticleComments(articleId, COMMENTS_PER_PAGE, currentOffset);
			
			if (newComments.length === 0) {
				hasMoreComments = false;
			} else {
				if (reset) {
					comments = newComments;
				} else {
					comments = [...comments, ...newComments];
				}
				currentOffset += newComments.length;
				
				// If we got fewer comments than requested, we've reached the end
				if (newComments.length < COMMENTS_PER_PAGE) {
					hasMoreComments = false;
				}
			}
		} catch (error) {
			console.error('Error loading comments:', error);
		} finally {
			loadingMoreComments = false;
		}
	}
	
	async function loadMoreComments() {
		await loadComments(false);
	}
	
	// Sort comments based on selected option
	$: sortedComments = [...comments].sort((a, b) => {
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;
		
		switch (sortBy) {
			case 'newest':
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			case 'oldest':
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			case 'popular':
				return (b.likes - b.dislikes) - (a.likes - a.dislikes);
			default:
				return 0;
		}
	});
	
	async function handleSubmitComment() {
		if (!newComment.trim()) {
			return;
		}
		
		if (!user) {
			errorMessage = 'Please log in to comment';
			return;
		}
		
		submittingComment = true;
		errorMessage = '';
		
		try {
			const result = await createComment(articleId, newComment, user.id);
			
			if (result.success) {
				// Reload comments from database (reset to first page)
				await loadComments(true);
				newComment = '';
				dispatch('commentAdded', result.comment);
			} else {
				errorMessage = result.error || 'Failed to post comment';
			}
		} catch (error: any) {
			console.error('Error submitting comment:', error);
			errorMessage = error.message || 'Failed to post comment';
		} finally {
			submittingComment = false;
		}
	}
	
	async function handleReply(event: CustomEvent<{ parentId: string; content: string; author: string }>) {
		const { parentId, content } = event.detail;
		
		if (!user) {
			errorMessage = 'Please log in to reply';
			return;
		}
		
		submittingReply = true;
		errorMessage = '';
		
		try {
			const result = await createReply(articleId, parentId, content, user.id);
			
			if (result.success) {
				// Reload comments from database (reset to first page to show new reply)
				await loadComments(true);
				dispatch('replyAdded', { parentId, reply: result.reply });
			} else {
				errorMessage = result.error || 'Failed to post reply';
			}
		} catch (error: any) {
			console.error('Error submitting reply:', error);
			errorMessage = error.message || 'Failed to post reply';
		} finally {
			submittingReply = false;
		}
	}
	
	function handleVote(event: CustomEvent<{ id: string; type: 'like' | 'dislike'; isReply: boolean; parentId?: string }>) {
		const { id, type, isReply, parentId } = event.detail;
		
		if (isReply && parentId) {
			comments = comments.map(comment => {
				if (comment.id === parentId) {
					return {
						...comment,
						replies: comment.replies.map(reply => {
							if (reply.id === id) {
								return {
									...reply,
									likes: type === 'like' ? reply.likes + 1 : reply.likes,
									dislikes: type === 'dislike' ? reply.dislikes + 1 : reply.dislikes
								};
							}
							return reply;
						})
					};
				}
				return comment;
			});
		} else {
			comments = comments.map(comment => {
				if (comment.id === id) {
					return {
						...comment,
						likes: type === 'like' ? comment.likes + 1 : comment.likes,
						dislikes: type === 'dislike' ? comment.dislikes + 1 : comment.dislikes
					};
				}
				return comment;
			});
		}
	}
	
	function handleReport(event: CustomEvent<{ type: 'comment' | 'reply'; id: string; author: string }>) {
		reportTarget = event.detail;
		showReportModal = true;
	}
	
	async function handleDelete(event: CustomEvent<{ id: string; isReply: boolean; parentId?: string }>) {
		const { id } = event.detail;
		
		// Reload comments from database after deletion (reset to first page)
		try {
			await loadComments(true);
		} catch (error) {
			console.error('Error reloading comments after deletion:', error);
		}
	}
	
	function handleReportSubmit(event: CustomEvent<{ reason: string; details: string }>) {
		const { reason, details } = event.detail;
		// In a real app, this would send the report to the backend
		// For now, just close the modal and show feedback
		showReportModal = false;
		reportTarget = null;
		// Show success toast (mock - in production, use a proper toast library)
		reportSuccessMessage = 'Thank you for your report. Our moderation team will review it shortly.';
		setTimeout(() => { reportSuccessMessage = ''; }, 5000);
	}
	
</script>

<div class="comment-section">
	<!-- Success Toast -->
	{#if reportSuccessMessage}
		<div class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 animate-fade-in">
			<svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
				<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
			</svg>
			<p class="text-green-800 dark:text-green-200 text-sm font-medium">{reportSuccessMessage}</p>
			<button 
				on:click={() => reportSuccessMessage = ''}
				class="ml-auto text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
			>
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
				</svg>
			</button>
		</div>
	{/if}

	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<div class="flex items-center gap-4">
			<h2 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
				Comments
			</h2>
			<span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold">
				{comments.length}
			</span>
		</div>
		<button
			on:click={() => showComments = !showComments}
			class="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-1"
		>
			<svg class="w-4 h-4 transition-transform {showComments ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
			{showComments ? 'Hide' : 'Show'}
		</button>
	</div>

	{#if showComments}
		{#if loadingUser}
			<div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
				<div class="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
			</div>
		{:else if user}
			<!-- Comment Form for Logged In Users -->
			<div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
						{commentAuthor ? commentAuthor.charAt(0).toUpperCase() : '?'}
					</div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white">Join the discussion</h3>
				</div>
				
				{#if errorMessage}
					<div class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-800 dark:text-red-300">{errorMessage}</p>
					</div>
				{/if}
				
				<form on:submit|preventDefault={handleSubmitComment} class="space-y-4">
					<div>
						<label for="comment-content" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
							Comment <span class="text-red-500">*</span>
						</label>
						<textarea
							id="comment-content"
							bind:value={newComment}
							required
							rows="4"
							class="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
							placeholder="Share your thoughts... Be respectful and constructive."
							disabled={submittingComment}
						></textarea>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-xs text-gray-500 dark:text-gray-400">
							By commenting, you agree to our <a href="/terms" class="text-red-600 dark:text-red-400 hover:underline">Community Guidelines</a>
						</p>
						<button
							type="submit"
							disabled={!newComment.trim() || submittingComment}
							class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
						>
							{#if submittingComment}
								<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Posting...
							{:else}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
								</svg>
								Post Comment
							{/if}
						</button>
					</div>
				</form>
			</div>
		{:else}
			<!-- Compact Login Prompt for Non-Logged-In Users -->
			<div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-4 mb-8 border border-gray-200 dark:border-gray-700">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							<a href="/login" class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold">Log in</a> to join the discussion
						</p>
					</div>
					<a 
						href="/login"
						class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
					>
						Log In
					</a>
				</div>
			</div>
		{/if}

		<!-- Sort Options -->
		{#if comments.length > 0}
			<div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					<span class="font-semibold text-gray-900 dark:text-white">{comments.length}</span> {comments.length === 1 ? 'comment' : 'comments'}
					{#if hasMoreComments}
						<span class="text-gray-500 dark:text-gray-500"> (loading more...)</span>
					{/if}
				</p>
				<div class="flex items-center gap-2">
					<span class="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
					<select
						bind:value={sortBy}
						class="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
					>
						<option value="newest">Newest First</option>
						<option value="oldest">Oldest First</option>
						<option value="popular">Most Popular</option>
					</select>
				</div>
			</div>
		{/if}

		<!-- Comments List -->
		<div class="space-y-6">
			{#each sortedComments as comment (comment.id)}
				<CommentItem 
					{comment} 
					on:reply={handleReply}
					on:vote={handleVote}
					on:report={handleReport}
					on:deleted={handleDelete}
				/>
			{/each}
			
			{#if comments.length === 0}
				<div class="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
					<svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
					</svg>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No comments yet</h3>
					<p class="text-gray-600 dark:text-gray-400">Be the first to share your thoughts!</p>
				</div>
			{/if}
		</div>

		<!-- Infinite Scroll Trigger & Loading Indicator -->
		<div bind:this={loadMoreTrigger} class="mt-8">
			{#if loadingMoreComments}
				<div class="flex items-center justify-center py-8">
					<svg class="animate-spin h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<span class="ml-3 text-gray-600 dark:text-gray-400">Loading more comments...</span>
				</div>
			{:else if !hasMoreComments && comments.length > 0}
				<div class="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
					No more comments to load
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Report Modal -->
{#if showReportModal && reportTarget}
	<ReportModal
		targetAuthor={reportTarget.author}
		on:submit={handleReportSubmit}
		on:close={() => { showReportModal = false; reportTarget = null; }}
	/>
{/if}

