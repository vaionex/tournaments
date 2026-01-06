<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserPreferences, saveUserPreferences, isTournamentsPlus, getCurrentUser, getUserProfile, updateUserEmail, updateUserPassword, updateUserProfile } from '$lib/services/user.service';
	import { getUserComments } from '$lib/services/news.service';
	import { cache } from '$lib/services/cache.service';
	import { supabase } from '$lib/supabase';
	
	let loading = true;
	let user = null;
	let profile = null;
	
	// Preferences state
	let favoriteSports: string[] = [];
	let favoriteTeams: string[] = [];
	let savingPreferences = false;
	let preferencesSaved = false;
	let isPro = false;
	let showPreferencesModal = false;
	let showSettingsModal = false;
	let showTournamentsPlusModal = false;
	
	// Settings state
	let settingsLoading = false;
	let settingsError = '';
	let settingsSuccess = '';
	let newEmail = '';
	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';
	let displayName = '';
	
	// Comments state
	let recentComments: Array<{
		id: string;
		articleId: string;
		articleTitle: string;
		author: string;
		content: string;
		date: Date;
		likes: number;
		dislikes: number;
		isPro?: boolean;
		replies: Array<{
			id: string;
			author: string;
			content: string;
			date: Date;
			likes: number;
			dislikes: number;
			isPro?: boolean;
		}>;
	}> = [];
	let loadingComments = false;
	
	// Available sports and teams
	const availableSports = [
		{ code: 'NFL', name: 'NFL', icon: '🏈' },
		{ code: 'NBA', name: 'NBA', icon: '🏀' },
		{ code: 'MLB', name: 'MLB', icon: '⚾' },
		{ code: 'NHL', name: 'NHL', icon: '🏒' },
		{ code: 'SOCCER', name: 'Soccer', icon: '⚽' },
		{ code: 'NCAAF', name: 'NCAAF', icon: '🏈' },
		{ code: 'WNBA', name: 'WNBA', icon: '🏀' },
		{ code: 'TENNIS', name: 'Tennis', icon: '🎾' },
		{ code: 'GOLF', name: 'Golf', icon: '⛳' },
		{ code: 'MMA', name: 'MMA/UFC', icon: '🥊' },
		{ code: 'BOXING', name: 'Boxing', icon: '🥊' },
		{ code: 'RACING', name: 'Racing', icon: '🏎️' },
		{ code: 'OLYMPICS', name: 'Olympics', icon: '🏅' },
		{ code: 'ESPORTS', name: 'Esports', icon: '🎮' },
		{ code: 'CRICKET', name: 'Cricket', icon: '🏏' },
		{ code: 'RUGBY', name: 'Rugby', icon: '🏉' }
	];
	
	const sportTeams: Record<string, string[]> = {
		'NFL': ['Chiefs', 'Bills', '49ers', 'Cowboys', 'Eagles', 'Ravens', 'Dolphins', 'Lions', 'Packers', 'Texans'],
		'NBA': ['Lakers', 'Celtics', 'Warriors', 'Bucks', 'Nuggets', 'Heat', 'Suns', 'Mavericks', 'Clippers', 'Knicks'],
		'MLB': ['Yankees', 'Dodgers', 'Astros', 'Braves', 'Rangers', 'Phillies', 'Orioles', 'Twins', 'Mariners', 'Blue Jays'],
		'NHL': ['Avalanche', 'Bruins', 'Lightning', 'Rangers', 'Oilers', 'Panthers', 'Stars', 'Canucks', 'Devils', 'Maple Leafs'],
		'SOCCER': ['Arsenal', 'Man City', 'Liverpool', 'Real Madrid', 'Barcelona', 'Bayern', 'PSG', 'Chelsea', 'Inter', 'AC Milan'],
		'NCAAF': ['Alabama', 'Georgia', 'Michigan', 'Ohio State', 'Texas', 'Oregon', 'Penn State', 'USC', 'Clemson', 'Notre Dame'],
		'WNBA': ['Aces', 'Liberty', 'Sun', 'Storm', 'Wings', 'Mercury', 'Lynx', 'Sky', 'Fever', 'Sparks'],
		'TENNIS': ['ATP Tour', 'WTA Tour', 'Grand Slams', 'Davis Cup'],
		'GOLF': ['PGA Tour', 'LIV Golf', 'LPGA Tour', 'European Tour'],
		'MMA': ['UFC', 'Bellator', 'ONE Championship', 'PFL'],
		'BOXING': ['Top Rank', 'Matchroom', 'PBC', 'Golden Boy'],
		'RACING': ['Formula 1', 'NASCAR', 'IndyCar', 'MotoGP'],
		'OLYMPICS': ['USA', 'China', 'Great Britain', 'Russia'],
		'ESPORTS': ['T1', 'Gen.G', 'Fnatic', 'Cloud9', 'Team Liquid', 'G2 Esports', 'NAVI', 'Team Spirit', 'Sentinels', 'Paper Rex'],
		'CRICKET': ['India', 'Australia', 'England', 'Pakistan', 'South Africa', 'New Zealand'],
		'RUGBY': ['New Zealand', 'South Africa', 'Ireland', 'France', 'England', 'Australia']
	};
	
	onMount(async () => {
		user = await getCurrentUser();
		if (!user) {
			goto('/login');
			return;
		}
		
		await Promise.all([
			loadProfile(),
			loadPreferences(),
			checkProStatus()
		]);
		loading = false;
		// Load comments after initial load
		await loadRecentComments();
	});
	
	async function loadProfile() {
		try {
			profile = await getUserProfile(user.id);
			if (profile) {
				// Use display_name if available, otherwise username, otherwise empty
				displayName = profile.display_name || profile.username || '';
				newEmail = user.email || '';
			}
		} catch (error) {
			console.error('Failed to load profile:', error);
		}
	}
	
	async function loadPreferences() {
		try {
			const prefs = await getUserPreferences();
			favoriteSports = prefs.favoriteSports || [];
			favoriteTeams = prefs.favoriteTeams || [];
		} catch (error) {
			console.error('Failed to load preferences:', error);
		}
	}
	
	async function checkProStatus() {
		isPro = await isTournamentsPlus();
	}
	
	async function loadRecentComments() {
		if (!user) return;
		loadingComments = true;
		try {
			const comments = await getUserComments(user.id, 10);
			recentComments = comments;
		} catch (error) {
			console.error('Failed to load comments:', error);
		} finally {
			loadingComments = false;
		}
	}
	
	function toggleSport(sportCode: string) {
		if (favoriteSports.includes(sportCode)) {
			favoriteSports = favoriteSports.filter(s => s !== sportCode);
			const teamsToRemove = sportTeams[sportCode] || [];
			favoriteTeams = favoriteTeams.filter(t => !teamsToRemove.includes(t));
		} else {
			favoriteSports = [...favoriteSports, sportCode];
		}
		preferencesSaved = false;
	}
	
	function toggleTeam(team: string) {
		if (favoriteTeams.includes(team)) {
			favoriteTeams = favoriteTeams.filter(t => t !== team);
		} else {
			favoriteTeams = [...favoriteTeams, team];
		}
		preferencesSaved = false;
	}
	
	async function savePreferences() {
		savingPreferences = true;
		preferencesSaved = false;
		
		try {
			const success = await saveUserPreferences({
				favoriteSports,
				favoriteTeams
			});
			
			if (success) {
				// Invalidate homepage cache since preferences affect content
				// Clear all homepage caches (for all categories)
				const categories = ['All', 'NFL', 'NBA', 'MLB', 'NHL', 'Soccer', 'Esports', 'Tennis', 'Golf', 'MMA'];
				categories.forEach(cat => {
					cache.delete(`homepage-${cat}`);
				});
				
				preferencesSaved = true;
				setTimeout(() => {
					preferencesSaved = false;
					showPreferencesModal = false;
				}, 2000);
			}
		} catch (error) {
			console.error('Failed to save preferences:', error);
		} finally {
			savingPreferences = false;
		}
	}
	
	async function handleSignOut() {
		await supabase.auth.signOut();
		goto('/');
	}
	
	async function openSettingsModal() {
		showSettingsModal = true;
		settingsError = '';
		settingsSuccess = '';
		// Reload profile to get latest data
		await loadProfile();
	}
	
	async function saveEmail() {
		if (!newEmail || newEmail === user.email) {
			return;
		}
		
		settingsLoading = true;
		settingsError = '';
		settingsSuccess = '';
		
		try {
			const result = await updateUserEmail(newEmail);
			if (result.success) {
				settingsSuccess = 'Email update initiated. Please check your new email for confirmation.';
				user = await getCurrentUser(); // Refresh user data
			} else {
				settingsError = result.error || 'Failed to update email';
			}
		} catch (error: any) {
			settingsError = error.message || 'Failed to update email';
		} finally {
			settingsLoading = false;
		}
	}
	
	async function savePassword() {
		if (!newPassword || !confirmPassword) {
			settingsError = 'Please fill in all password fields';
			return;
		}
		
		if (newPassword !== confirmPassword) {
			settingsError = 'Passwords do not match';
			return;
		}
		
		if (newPassword.length < 6) {
			settingsError = 'Password must be at least 6 characters';
			return;
		}
		
		settingsLoading = true;
		settingsError = '';
		settingsSuccess = '';
		
		try {
			const result = await updateUserPassword(newPassword);
			if (result.success) {
				settingsSuccess = 'Password updated successfully';
				newPassword = '';
				confirmPassword = '';
				currentPassword = '';
			} else {
				settingsError = result.error || 'Failed to update password';
			}
		} catch (error: any) {
			settingsError = error.message || 'Failed to update password';
		} finally {
			settingsLoading = false;
		}
	}
	
	async function saveProfile() {
		if (!displayName.trim()) {
			settingsError = 'Display name is required';
			return;
		}
		
		// Convert display name to a valid username format (lowercase, alphanumeric and underscores)
		const usernameValue = displayName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
		
		if (!usernameValue) {
			settingsError = 'Please enter a valid name';
			return;
		}
		
		settingsLoading = true;
		settingsError = '';
		settingsSuccess = '';
		
		try {
			const result = await updateUserProfile({
				display_name: displayName.trim(),
				username: usernameValue
			});
			
			if (result.success) {
				settingsSuccess = 'Profile updated successfully';
				await loadProfile(); // Reload profile
			} else {
				settingsError = result.error || 'Failed to update profile';
			}
		} catch (error: any) {
			settingsError = error.message || 'Failed to update profile';
		} finally {
			settingsLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Dashboard - Tournaments.com</title>
</svelte:head>

<div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
		{#if loading}
			<div class="space-y-6">
				<div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each Array(6) as _}
						<div class="bg-white dark:bg-gray-800 rounded-xl p-6 h-48 animate-pulse"></div>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Header -->
			<div class="flex items-center justify-between mb-6">
				<div>
					<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
						Welcome back{profile?.display_name ? `, ${profile.display_name.split(' ')[0]}` : ''}!
					</h1>
					<p class="text-gray-600 dark:text-gray-400">
						Your personalized sports news and updates
					</p>
				</div>
				<button
					on:click={handleSignOut}
					class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
				>
					Sign Out
				</button>
			</div>
			
			<!-- Main Dashboard Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Left Column - Main Content -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Content Preferences Card -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div class="flex items-start justify-between mb-4">
							<div>
								<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Content Preferences</h2>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									{favoriteSports.length > 0 
										? `${favoriteSports.length} sport${favoriteSports.length === 1 ? '' : 's'} selected • ${favoriteTeams.length} team${favoriteTeams.length === 1 ? '' : 's'} selected`
										: 'Customize your homepage content'}
								</p>
							</div>
							<button
								on:click={() => showPreferencesModal = true}
								class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
							>
								Edit
							</button>
						</div>
						
						{#if favoriteSports.length > 0}
							<div class="space-y-4">
								<!-- Selected Sports -->
								<div>
									<div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favorite Sports</div>
									<div class="flex flex-wrap gap-2">
										{#each favoriteSports.slice(0, 8) as sportCode}
											{@const sport = availableSports.find(s => s.code === sportCode)}
											{#if sport}
												<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium">
													<span>{sport.icon}</span>
													{sport.name}
												</span>
											{/if}
										{/each}
										{#if favoriteSports.length > 8}
											<span class="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
												+{favoriteSports.length - 8} more
											</span>
										{/if}
									</div>
								</div>
								
								<!-- Selected Teams -->
								{#if favoriteTeams.length > 0}
									<div>
										<div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favorite Teams</div>
										<div class="flex flex-wrap gap-2">
											{#each favoriteTeams.slice(0, 10) as team}
												<span class="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium">
													{team}
												</span>
											{/each}
											{#if favoriteTeams.length > 10}
												<span class="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
													+{favoriteTeams.length - 10} more
												</span>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						{:else}
							<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
								<p class="text-sm text-blue-800 dark:text-blue-300">
									💡 Select your favorite sports and teams to personalize your homepage content.
								</p>
							</div>
						{/if}
					</div>
					
					<!-- Quick Actions -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
						<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<a 
								href="/tournaments" 
								class="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:from-red-100 hover:to-orange-100 dark:hover:from-red-900/30 dark:hover:to-orange-900/30 transition-all group"
							>
								<div class="text-2xl mb-2">🏆</div>
								<div class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
									Browse Tournaments
								</div>
							</a>
							<a 
								href="/players" 
								class="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all group"
							>
								<div class="text-2xl mb-2">👥</div>
								<div class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
									View Players
								</div>
							</a>
							<a 
								href="/news" 
								class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all group"
							>
								<div class="text-2xl mb-2">📰</div>
								<div class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
									Latest News
								</div>
							</a>
						</div>
					</div>
					
					<!-- Recent Comments Card -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div class="flex items-start justify-between mb-4">
							<div>
								<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Your Recent Comments</h2>
								<p class="text-sm text-gray-600 dark:text-gray-400">View your comments and their responses</p>
							</div>
						</div>
						
						{#if loadingComments}
							<div class="space-y-4">
								{#each Array(3) as _}
									<div class="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								{/each}
							</div>
						{:else if recentComments.length > 0}
							<div class="space-y-4">
								{#each recentComments.slice(0, 5) as comment}
									<div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
										<div class="flex items-start gap-3 mb-2">
											<div class="flex-1 min-w-0">
												<div class="flex items-center gap-2 mb-1">
													<span class="text-sm font-semibold text-gray-900 dark:text-white">
														{comment.author}
													</span>
													{#if comment.isPro}
														<span class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
															Tournaments+
														</span>
													{/if}
													<span class="text-xs text-gray-500 dark:text-gray-400">
														{comment.date.toLocaleDateString()} {comment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
													</span>
												</div>
												<p class="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
													{comment.content}
												</p>
												<a 
													href="/news/{comment.articleId}"
													class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
												>
													→ {comment.articleTitle}
												</a>
											</div>
											<div class="flex flex-col items-center gap-1">
												<span class="text-xs text-gray-500 dark:text-gray-400">👍 {comment.likes}</span>
												<span class="text-xs text-gray-500 dark:text-gray-400">👎 {comment.dislikes}</span>
											</div>
										</div>
										
										{#if comment.replies.length > 0}
											<div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
												<div class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
													{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}:
												</div>
												{#each comment.replies as reply}
													<div class="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
														<div class="flex items-center gap-2 mb-1">
															<span class="text-xs font-semibold text-gray-800 dark:text-gray-200">
																{reply.author}
															</span>
															{#if reply.isPro}
																<span class="px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
																	+
																</span>
															{/if}
															<span class="text-xs text-gray-500 dark:text-gray-400">
																{reply.date.toLocaleDateString()} {reply.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
															</span>
														</div>
														<p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
															{reply.content}
														</p>
														<div class="flex items-center gap-2 mt-1">
															<span class="text-xs text-gray-500 dark:text-gray-400">👍 {reply.likes}</span>
															<span class="text-xs text-gray-500 dark:text-gray-400">👎 {reply.dislikes}</span>
														</div>
													</div>
												{/each}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<div class="p-8 text-center text-gray-500 dark:text-gray-400">
								<p class="mb-2">No comments yet</p>
								<a 
									href="/news" 
									class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
								>
									Start commenting on articles →
								</a>
							</div>
						{/if}
					</div>
				</div>
				
				<!-- Right Column - Sidebar -->
				<div class="space-y-6">
					<!-- Account Overview Card -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div class="flex items-start justify-between mb-4">
							<div>
								<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Account</h3>
								{#if isPro}
									<span class="inline-block px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full mt-2">
										Tournaments+
									</span>
								{/if}
							</div>
						</div>
						
						<div class="space-y-4">
							<div>
								<div class="text-sm font-medium text-gray-900 dark:text-white mb-1">
									{profile?.display_name || profile?.username || 'User'}
								</div>
								<div class="text-xs text-gray-500 dark:text-gray-400">
									@{profile?.username || profile?.display_name?.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'username'}
								</div>
							</div>
							
							<div class="pt-4 border-t border-gray-200 dark:border-gray-700">
								<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</div>
								<div class="text-sm text-gray-900 dark:text-white">{user?.email}</div>
							</div>
							
							<div class="text-xs text-gray-500 dark:text-gray-400">
								Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
							</div>
						</div>
					</div>
					
					<!-- Tournaments+ Status Card -->
					<div class="bg-gradient-to-br {isPro ? 'from-red-500 to-orange-500' : 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'} rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 {isPro ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'} rounded-full flex items-center justify-center">
								<span class="text-2xl">{isPro ? '⭐' : '💎'}</span>
							</div>
							<div>
								<h3 class="text-lg font-bold {isPro ? 'text-white' : 'text-gray-900 dark:text-white'}">
									{isPro ? 'Tournaments+' : 'Upgrade to Tournaments+'}
								</h3>
								<p class="text-sm {isPro ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}">
									{isPro ? 'Active member' : 'Unlock premium features'}
								</p>
							</div>
						</div>
						
						{#if isPro}
							<div class="space-y-2 mb-4">
								<div class="flex items-center gap-2 text-sm text-white/90">
									<span>✓</span>
									<span>Highlighted comments</span>
								</div>
								<div class="flex items-center gap-2 text-sm text-white/90">
									<span>✓</span>
									<span>Enhanced profile creation</span>
								</div>
								<div class="flex items-center gap-2 text-sm text-white/90">
									<span>✓</span>
									<span>Priority support</span>
								</div>
							</div>
							<button 
								on:click={() => showTournamentsPlusModal = true}
								class="w-full py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors text-sm"
							>
								Manage Subscription
							</button>
						{:else}
							<div class="space-y-2 mb-4">
								<div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<span>✓</span>
									<span>Highlighted comments</span>
								</div>
								<div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<span>✓</span>
									<span>Enhanced profile creation</span>
								</div>
								<div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<span>✓</span>
									<span>Priority support</span>
								</div>
							</div>
							<button 
								on:click={() => showTournamentsPlusModal = true}
								class="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
							>
								Upgrade Now
							</button>
						{/if}
					</div>
					
					<!-- Account Settings -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Settings</h3>
						<div class="space-y-3">
							<button
								on:click={openSettingsModal}
								class="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group text-left"
							>
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
										{profile?.display_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
									</div>
									<div>
										<div class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
											Edit Profile & Settings
										</div>
										<div class="text-xs text-gray-500 dark:text-gray-400">Update your account information</div>
									</div>
								</div>
								<svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</button>
							<button
								on:click={() => showPreferencesModal = true}
								class="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group text-left"
							>
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
										⚙️
									</div>
									<div>
										<div class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
											Content Preferences
										</div>
										<div class="text-xs text-gray-500 dark:text-gray-400">Customize your feed</div>
									</div>
								</div>
								<svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Settings Modal -->
{#if showSettingsModal}
	<div 
		class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
		on:click={() => showSettingsModal = false}
		on:keydown={(e) => e.key === 'Escape' && (showSettingsModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div 
			class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			on:click|stopPropagation
		>
			<div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
				<button
					on:click={() => showSettingsModal = false}
					class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
				>
					<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			
			<div class="p-6 space-y-6">
				{#if settingsError}
					<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-800 dark:text-red-300">{settingsError}</p>
					</div>
				{/if}
				
				{#if settingsSuccess}
					<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
						<p class="text-sm text-green-800 dark:text-green-300">{settingsSuccess}</p>
					</div>
				{/if}
				
				<!-- Profile Information -->
				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
					<div class="space-y-4">
						<div>
							<label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Display Name / Username
							</label>
							<input
								id="displayName"
								type="text"
								bind:value={displayName}
								placeholder="Your name"
								class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
							/>
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								This will be used as both your display name and username
							</p>
						</div>
						
						<button
							on:click={saveProfile}
							disabled={settingsLoading || !displayName.trim()}
							class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if settingsLoading}
								<span class="flex items-center justify-center gap-2">
									<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Saving...
								</span>
							{:else}
								Save Profile
							{/if}
						</button>
					</div>
				</div>
				
				<!-- Email Settings -->
				<div class="pt-6 border-t border-gray-200 dark:border-gray-700">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email</h3>
					<div class="space-y-4">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								New Email Address
							</label>
							<input
								id="email"
								type="email"
								bind:value={newEmail}
								placeholder="new@email.com"
								class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
							/>
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								You'll need to confirm your new email address
							</p>
						</div>
						
						<button
							on:click={saveEmail}
							disabled={settingsLoading || !newEmail || newEmail === user?.email}
							class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if settingsLoading}
								<span class="flex items-center justify-center gap-2">
									<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Updating...
								</span>
							{:else}
								Update Email
							{/if}
						</button>
					</div>
				</div>
				
				<!-- Password Settings -->
				<div class="pt-6 border-t border-gray-200 dark:border-gray-700">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h3>
					<div class="space-y-4">
						<div>
							<label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								New Password
							</label>
							<input
								id="newPassword"
								type="password"
								bind:value={newPassword}
								placeholder="Enter new password"
								class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
							/>
						</div>
						
						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Confirm New Password
							</label>
							<input
								id="confirmPassword"
								type="password"
								bind:value={confirmPassword}
								placeholder="Confirm new password"
								class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
							/>
						</div>
						
						<button
							on:click={savePassword}
							disabled={settingsLoading || !newPassword || !confirmPassword}
							class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if settingsLoading}
								<span class="flex items-center justify-center gap-2">
									<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Updating...
								</span>
							{:else}
								Update Password
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Preferences Modal -->
{#if showPreferencesModal}
	<div 
		class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
		on:click={() => showPreferencesModal = false}
		on:keydown={(e) => e.key === 'Escape' && (showPreferencesModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div 
			class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
			on:click|stopPropagation
		>
			<div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Content Preferences</h2>
				<button
					on:click={() => showPreferencesModal = false}
					class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
				>
					<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			
			<div class="p-6">
				<p class="text-gray-600 dark:text-gray-400 mb-6">
					Select your favorite sports and teams to personalize your homepage. Only content from your selected sports will appear on the front page.
				</p>
				
				<!-- Sports Selection -->
				<div class="mb-8">
					<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Favorite Sports</h3>
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
						{#each availableSports as sport}
							<button
								on:click={() => toggleSport(sport.code)}
								class="p-4 rounded-xl border-2 transition-all text-left {favoriteSports.includes(sport.code)
									? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
									: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'}"
							>
								<div class="flex items-center gap-2 mb-1">
									<span class="text-2xl">{sport.icon}</span>
									<span class="font-semibold text-sm text-gray-900 dark:text-white">{sport.name}</span>
								</div>
								{#if favoriteSports.includes(sport.code)}
									<div class="text-xs text-red-600 dark:text-red-400 mt-1">✓ Selected</div>
								{/if}
							</button>
						{/each}
					</div>
				</div>
				
				<!-- Teams Selection -->
				{#if favoriteSports.length > 0}
					<div class="mb-8">
						<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Favorite Teams</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Select teams from your favorite sports. You can select multiple teams across different sports.
						</p>
						
						{#each favoriteSports as sportCode}
							{@const teams = sportTeams[sportCode] || []}
							{#if teams.length > 0}
								<div class="mb-6">
									<h4 class="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
										{availableSports.find(s => s.code === sportCode)?.icon} {availableSports.find(s => s.code === sportCode)?.name}
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each teams as team}
											<button
												on:click={() => toggleTeam(team)}
												class="px-4 py-2 rounded-lg text-sm font-medium transition-all {favoriteTeams.includes(team)
													? 'bg-red-500 text-white border-2 border-red-500'
													: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}"
											>
												{favoriteTeams.includes(team) ? '✓ ' : ''}{team}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				{:else}
					<div class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
						<p class="text-blue-800 dark:text-blue-300">
							💡 Select at least one sport above to see available teams.
						</p>
					</div>
				{/if}
				
				<!-- Save Button -->
				<div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
					<div>
						{#if preferencesSaved}
							<p class="text-green-600 dark:text-green-400 text-sm font-medium">✓ Preferences saved successfully!</p>
						{/if}
					</div>
					<div class="flex gap-3">
						<button
							on:click={() => showPreferencesModal = false}
							class="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold rounded-lg transition-colors"
						>
							Cancel
						</button>
						<button
							on:click={savePreferences}
							disabled={savingPreferences}
							class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if savingPreferences}
								<span class="flex items-center gap-2">
									<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Saving...
								</span>
							{:else}
								Save Preferences
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Tournaments+ Coming Soon Modal -->
{#if showTournamentsPlusModal}
	<div 
		class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
		on:click={() => showTournamentsPlusModal = false}
		on:keydown={(e) => e.key === 'Escape' && (showTournamentsPlusModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div 
			class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
			on:click|stopPropagation
		>
			<div class="p-6 text-center">
				<div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-3xl">💎</span>
				</div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
					Tournaments+
				</h2>
				<p class="text-gray-600 dark:text-gray-400 mb-6">
					Coming Soon! We're working hard to bring you premium features including highlighted comments, enhanced profile creation, and priority support.
				</p>
				<button
					on:click={() => showTournamentsPlusModal = false}
					class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
				>
					Got it
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.line-clamp-2) {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

