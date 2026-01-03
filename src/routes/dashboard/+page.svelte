<script lang="ts">
	import { onMount } from 'svelte';
	import type { LinkedAccount, PendingClaim } from '$lib/types';
	import { simulateDelay } from '$lib/services/api';
	
	let linkedAccounts: LinkedAccount[] = [];
	let pendingClaims: PendingClaim[] = [];
	let loading = true;
	
	onMount(async () => {
		await loadDashboardData();
	});
	
	async function loadDashboardData() {
		loading = true;
		try {
			await simulateDelay();
			
			// In production, these would come from API calls
			linkedAccounts = [
				{ id: '1', platform: 'USTA', username: 'TennisPro', verified: true },
				{ id: '2', platform: 'PGA', username: 'GolfChampion', verified: true },
				{ id: '3', platform: 'Riot Games', username: 'ProPlayer#1234', verified: true },
				{ id: '4', platform: 'Chess.com', username: 'ProPlayer123', verified: true }
			];
			
			pendingClaims = [
				{
					id: '1',
					tournamentName: 'Basketball 3v3 Championship',
					rank: 3,
					date: '2024-11-10',
					status: 'pending'
				}
			];
		} catch (error) {
			console.error('Failed to load dashboard data:', error);
		} finally {
			loading = false;
		}
	}
	
	function handleLinkAccount(platform: string) {
		// In a real app, this would open OAuth flow
		alert(`Linking ${platform} account...`);
	}
	
	function handleUnlinkAccount(id: string) {
		if (confirm('Are you sure you want to unlink this account?')) {
			linkedAccounts = linkedAccounts.filter(acc => acc.id !== id);
		}
	}
</script>

<svelte:head>
	<title>Dashboard - Tournaments.com</title>
</svelte:head>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Your Dashboard</h1>
	
		{#if loading}
			<div class="card animate-pulse">
				<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Linked Accounts -->
				<div class="card">
					<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Linked Accounts</h2>
					<p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
						Link your sports and gaming accounts to verify tournament results automatically.
					</p>
					
					<div class="space-y-3 mb-4">
						{#each linkedAccounts as account (account.id)}
							<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
								<div>
									<div class="font-semibold text-gray-900 dark:text-white">{account.platform}</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">{account.username}</div>
								</div>
								<div class="flex items-center gap-2">
									{#if account.verified}
										<span class="text-green-600 dark:text-green-400 text-sm">Verified</span>
									{/if}
									<button
										on:click={() => handleUnlinkAccount(account.id)}
										class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
									>
										Unlink
									</button>
								</div>
							</div>
						{/each}
					</div>
					
					<button
						on:click={() => handleLinkAccount('New Platform')}
						class="btn-secondary w-full"
					>
						+ Link New Account
					</button>
				</div>
				
				<!-- Pending Claims -->
				<div class="card">
					<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pending Claims</h2>
					<p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
						Tournament results you've claimed that are awaiting verification.
					</p>
					
					{#if pendingClaims.length > 0}
						<div class="space-y-3">
							{#each pendingClaims as claim (claim.id)}
								<div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
									<div class="font-semibold mb-1 text-gray-900 dark:text-white">{claim.tournamentName}</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">
										Rank: #{claim.rank} • {claim.date}
									</div>
									<div class="text-sm text-yellow-700 dark:text-yellow-400 mt-2">
										⏳ Pending verification
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-gray-600 dark:text-gray-400 text-center py-4">
							No pending claims. All your results are verified!
						</p>
					{/if}
				</div>
			</div>
			
			<!-- Quick Actions -->
			<div class="card mt-6">
				<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
				<div class="grid md:grid-cols-3 gap-4">
					<a href="/tournaments" class="btn-primary text-center">
						Browse Tournaments
					</a>
					<a href="/profile/yourusername" class="btn-secondary text-center">
						View Your Profile
					</a>
					<button class="btn-secondary">
						Upgrade to Pro
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
