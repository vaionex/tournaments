<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { formatDistanceToNow, format } from 'date-fns';
	import { getCurrentUser, getUserProfile } from '$lib/services/user.service';
	import { deleteComment } from '$lib/services/news.service';
	
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
	
	export let comment: Comment;
	export let isReply = false;
	export let parentId: string | null = null;
	
	let showReplyForm = false;
	let replyContent = '';
	let replyAuthor = '';
	let showAllReplies = false;
	let showActionsMenu = false;
	
	// Authentication state
	let user = null;
	let userProfile = null;
	let submittingReply = false;
	let deletingComment = false;
	
	const dispatch = createEventDispatcher();
	
	$: isOwnComment = user && comment.userId && comment.userId === user.id;
	
	onMount(async () => {
		user = await getCurrentUser();
		if (user) {
			userProfile = await getUserProfile(user.id);
			if (userProfile) {
				replyAuthor = userProfile.display_name || userProfile.username || '';
			}
		}
	});
	
	const VISIBLE_REPLIES_COUNT = 2;
	
	$: replies = comment.replies || [];
	$: displayedReplies = showAllReplies ? replies : replies.slice(0, VISIBLE_REPLIES_COUNT);
	$: hiddenRepliesCount = replies.length - VISIBLE_REPLIES_COUNT;
	
	function getAvatarColor(name: string): string {
		const colors = [
			'from-red-500 to-red-600',
			'from-blue-500 to-blue-600',
			'from-green-500 to-green-600',
			'from-purple-500 to-purple-600',
			'from-yellow-500 to-yellow-600',
			'from-pink-500 to-pink-600',
			'from-indigo-500 to-indigo-600',
			'from-teal-500 to-teal-600'
		];
		const index = name.charCodeAt(0) % colors.length;
		return colors[index];
	}
	
	function handleLike() {
		dispatch('vote', { 
			id: comment.id, 
			type: 'like', 
			isReply, 
			parentId 
		});
	}
	
	function handleDislike() {
		dispatch('vote', { 
			id: comment.id, 
			type: 'dislike', 
			isReply, 
			parentId 
		});
	}
	
	function handleReport() {
		dispatch('report', { 
			type: isReply ? 'reply' : 'comment', 
			id: comment.id, 
			author: comment.author 
		});
		showActionsMenu = false;
	}
	
	async function handleDelete() {
		if (!user || !isOwnComment) {
			return;
		}
		
		if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
			showActionsMenu = false;
			return;
		}
		
		deletingComment = true;
		showActionsMenu = false;
		
		try {
			const result = await deleteComment(comment.id, user.id);
			
			if (result.success) {
				dispatch('deleted', { 
					id: comment.id,
					isReply,
					parentId 
				});
			} else {
				alert(result.error || 'Failed to delete comment');
			}
		} catch (error: any) {
			console.error('Error deleting comment:', error);
			alert(error.message || 'Failed to delete comment');
		} finally {
			deletingComment = false;
		}
	}
	
	function handleSubmitReply() {
		if (!replyContent.trim()) return;
		
		if (!user) {
			// This shouldn't happen if UI is correct, but handle it anyway
			return;
		}
		
		submittingReply = true;
		
		dispatch('reply', {
			parentId: comment.id,
			content: replyContent,
			author: replyAuthor || userProfile?.display_name || 'User'
		});
		
		replyContent = '';
		showReplyForm = false;
		submittingReply = false;
	}
	
	function handleReplyVote(event: CustomEvent) {
		dispatch('vote', event.detail);
	}
	
	function handleReplyReport(event: CustomEvent) {
		dispatch('report', event.detail);
	}
	
	function handleReplyDelete(event: CustomEvent) {
		// Forward the delete event to parent
		dispatch('deleted', event.detail);
	}
	
	function formatDate(date: Date): string {
		const now = new Date();
		const diffInHours = (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60);
		
		if (diffInHours < 24) {
			return formatDistanceToNow(new Date(date), { addSuffix: true });
		}
		return format(new Date(date), 'MMM d, yyyy • h:mm a');
	}
</script>

<div class="comment-item {isReply ? 'ml-12 sm:ml-16' : ''}" class:pinned={comment.isPinned}>
	{#if comment.isPinned && !isReply}
		<div class="flex items-center gap-2 mb-3 text-sm text-amber-600 dark:text-amber-400">
			<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
				<path fill-rule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
			<span class="font-semibold">Pinned by moderator</span>
		</div>
	{/if}
	
	<div class="bg-white dark:bg-gray-800 {comment.isPinned ? 'border-2 border-amber-300 dark:border-amber-600' : comment.isPro ? 'border-2 border-red-400 dark:border-red-500 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/10 dark:to-orange-900/10' : 'border border-gray-200 dark:border-gray-700'} rounded-2xl p-4 sm:p-6 transition-all hover:shadow-lg">
		<div class="flex gap-3 sm:gap-4">
			<!-- Avatar -->
			<div class="flex-shrink-0">
				{#if comment.avatar}
					<img 
						src={comment.avatar} 
						alt={comment.author}
						class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
					/>
				{:else}
					<div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br {getAvatarColor(comment.author)} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg">
						{comment.author.charAt(0).toUpperCase()}
					</div>
				{/if}
			</div>
			
			<!-- Content -->
			<div class="flex-1 min-w-0">
				<!-- Header -->
				<div class="flex items-start justify-between mb-2">
					<div class="flex items-center flex-wrap gap-2">
						<span class="font-bold text-gray-900 dark:text-white">{comment.author}</span>
						{#if comment.isPro}
							<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-sm">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								Tournaments+
							</span>
						{/if}
						{#if comment.isVerified}
							<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
								</svg>
								Verified
							</span>
						{/if}
						<span class="text-xs text-gray-500 dark:text-gray-400">
							{formatDate(comment.date)}
						</span>
					</div>
					
					<!-- Actions Menu -->
					<div class="relative">
						<button
							on:click={() => showActionsMenu = !showActionsMenu}
							class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
							</svg>
						</button>
						
						{#if showActionsMenu}
							<div 
								class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 py-1 overflow-hidden"
								on:mouseleave={() => showActionsMenu = false}
							>
								{#if isOwnComment}
									<button
										on:click={handleDelete}
										disabled={deletingComment}
										class="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{#if deletingComment}
											<svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
												<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
												<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Deleting...
										{:else}
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											Delete Comment
										{/if}
									</button>
								{:else}
									<button
										on:click={handleReport}
										class="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
										</svg>
										Report Comment
									</button>
								{/if}
								<button
									class="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
									</svg>
									Share
								</button>
								<button
									class="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
									Copy Link
								</button>
							</div>
						{/if}
					</div>
				</div>
				
				<!-- Comment Text -->
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
					{comment.content}
				</p>
				
				<!-- Actions -->
				<div class="flex items-center gap-4 sm:gap-6">
					<!-- Vote Buttons -->
					<div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700/50 rounded-full">
						<button
							on:click={handleLike}
							class="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors"
							title="Upvote"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
							</svg>
						</button>
						<span class="text-sm font-bold {comment.likes - comment.dislikes > 0 ? 'text-green-600 dark:text-green-400' : comment.likes - comment.dislikes < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'} min-w-[2rem] text-center">
							{comment.likes - comment.dislikes}
						</span>
						<button
							on:click={handleDislike}
							class="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
							title="Downvote"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
					</div>
					
					<!-- Reply Button -->
					{#if !isReply}
						{#if user}
							<button
								on:click={() => showReplyForm = !showReplyForm}
								class="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
								</svg>
								Reply
							</button>
						{:else}
							<a
								href="/login"
								class="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
								</svg>
								Reply
							</a>
						{/if}
					{/if}
					
					<!-- Share Button -->
					<button
						class="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
						</svg>
						<span class="hidden sm:inline">Share</span>
					</button>
				</div>
				
				<!-- Reply Form -->
				{#if showReplyForm && !isReply && user}
					<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<form on:submit|preventDefault={handleSubmitReply} class="space-y-3">
							<div class="flex gap-3">
								<div class="w-8 h-8 rounded-full bg-gradient-to-br {getAvatarColor(replyAuthor || 'A')} flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
									{replyAuthor ? replyAuthor.charAt(0).toUpperCase() : '?'}
								</div>
								<div class="flex-1 space-y-3">
									<textarea
										bind:value={replyContent}
										required
										rows="2"
										placeholder="Write a reply..."
										class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
										disabled={submittingReply}
									></textarea>
									<div class="flex justify-end gap-2">
										<button
											type="button"
											on:click={() => { showReplyForm = false; replyContent = ''; }}
											class="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
											disabled={submittingReply}
										>
											Cancel
										</button>
										<button
											type="submit"
											disabled={!replyContent.trim() || submittingReply}
											class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
										>
											{#if submittingReply}
												<span class="flex items-center gap-2">
													<svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
														<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
														<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
													</svg>
													Posting...
												</span>
											{:else}
												Reply
											{/if}
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				{/if}
				
				<!-- Replies -->
				{#if !isReply && replies.length > 0}
					<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<button
							on:click={() => showAllReplies = !showAllReplies}
							class="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
						>
							<svg class="w-4 h-4 transition-transform {showAllReplies ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
							{showAllReplies ? 'Hide' : 'View'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
						</button>
						
						{#if showAllReplies || replies.length <= VISIBLE_REPLIES_COUNT}
							<div class="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
								{#each displayedReplies as reply (reply.id)}
									<svelte:self 
										comment={reply} 
										isReply={true} 
										parentId={comment.id}
										on:vote={handleReplyVote}
										on:report={handleReplyReport}
										on:deleted={handleReplyDelete}
									/>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

