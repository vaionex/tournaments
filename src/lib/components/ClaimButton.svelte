<script>
	export let tournamentId;
	export let rank;
	export let playerName;
	
	let claimed = false;
	let claiming = false;
	
	async function handleClaim() {
		if (claimed) return;
		
		claiming = true;
		// Simulated API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		claimed = true;
		claiming = false;
		
		// In a real app, this would:
		// 1. Check if user is logged in
		// 2. Send claim request to backend
		// 3. Show success/error message
		alert(`Claimed rank #${rank} for ${playerName}! This will be added to your profile after verification.`);
	}
</script>

<button
	on:click={handleClaim}
	disabled={claimed || claiming}
	class="px-4 py-2 text-sm font-semibold rounded-lg transition-all {
		claimed 
			? 'bg-green-100 text-green-700 border border-green-300 cursor-not-allowed' 
			: claiming
			? 'bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed'
			: 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 hover:border-blue-400'
	}"
	title={claimed ? 'Already claimed' : 'Claim this result to your resume'}
>
	{#if claiming}
		Claiming...
	{:else if claimed}
		✓ Claimed
	{:else}
		Claim
	{/if}
</button>

