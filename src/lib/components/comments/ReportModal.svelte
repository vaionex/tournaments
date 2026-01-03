<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	
	export let targetAuthor: string;
	
	let selectedReason = '';
	let additionalDetails = '';
	let isSubmitting = false;
	
	const dispatch = createEventDispatcher();
	
	const reportReasons = [
		{ id: 'spam', label: 'Spam or misleading', description: 'Repetitive content, phishing, or scams' },
		{ id: 'harassment', label: 'Harassment or bullying', description: 'Targeting or attacking individuals' },
		{ id: 'hate', label: 'Hate speech', description: 'Discrimination based on identity or vulnerability' },
		{ id: 'violence', label: 'Violence or threats', description: 'Threats of harm or dangerous content' },
		{ id: 'misinformation', label: 'Misinformation', description: 'False or misleading information' },
		{ id: 'inappropriate', label: 'Inappropriate content', description: 'Adult content or offensive material' },
		{ id: 'copyright', label: 'Copyright violation', description: 'Content used without permission' },
		{ id: 'other', label: 'Other', description: 'Something else not listed above' }
	];
	
	function handleClose() {
		dispatch('close');
	}
	
	function handleSubmit() {
		if (!selectedReason) return;
		
		isSubmitting = true;
		
		// Simulate API call
		setTimeout(() => {
			dispatch('submit', {
				reason: selectedReason,
				details: additionalDetails
			});
			isSubmitting = false;
		}, 500);
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
	
	onMount(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<div 
	class="fixed inset-0 z-50 flex items-center justify-center p-4"
	role="dialog"
	aria-modal="true"
	aria-labelledby="report-modal-title"
>
	<!-- Backdrop -->
	<button
		class="absolute inset-0 bg-black/60 backdrop-blur-sm"
		on:click={handleClose}
		aria-label="Close modal"
	/>
	
	<!-- Modal Content -->
	<div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
		<!-- Header -->
		<div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
			<div>
				<h2 id="report-modal-title" class="text-xl font-bold text-gray-900 dark:text-white">
					Report Comment
				</h2>
				<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
					Report content from <span class="font-semibold">{targetAuthor}</span>
				</p>
			</div>
			<button
				on:click={handleClose}
				class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
				aria-label="Close"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
		
		<!-- Body -->
		<div class="flex-1 overflow-y-auto p-6">
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
				Help us understand the problem. What's wrong with this comment?
			</p>
			
			<!-- Report Reasons -->
			<div class="space-y-3">
				{#each reportReasons as reason}
					<label
						class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/80 rounded-xl cursor-pointer transition-all border-2 {selectedReason === reason.id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-transparent'}"
					>
						<input
							type="radio"
							name="report-reason"
							value={reason.id}
							bind:group={selectedReason}
							class="mt-1 w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
						/>
						<div class="flex-1">
							<span class="block font-semibold text-gray-900 dark:text-white">{reason.label}</span>
							<span class="block text-sm text-gray-600 dark:text-gray-400">{reason.description}</span>
						</div>
					</label>
				{/each}
			</div>
			
			<!-- Additional Details -->
			{#if selectedReason}
				<div class="mt-6">
					<label for="additional-details" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
						Additional details <span class="text-gray-400 font-normal">(optional)</span>
					</label>
					<textarea
						id="additional-details"
						bind:value={additionalDetails}
						rows="3"
						placeholder="Provide any additional context that might help us understand the issue..."
						class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
					></textarea>
				</div>
			{/if}
			
			<!-- Info Box -->
			<div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
				<div class="flex gap-3">
					<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<div class="text-sm text-blue-700 dark:text-blue-300">
						<p class="font-semibold mb-1">What happens next?</p>
						<p>Our moderation team will review this report within 24 hours. If the content violates our community guidelines, appropriate action will be taken.</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Footer -->
		<div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
			<button
				on:click={handleClose}
				class="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
			>
				Cancel
			</button>
			<button
				on:click={handleSubmit}
				disabled={!selectedReason || isSubmitting}
				class="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2"
			>
				{#if isSubmitting}
					<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Submitting...
				{:else}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
					</svg>
					Submit Report
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	/* Custom radio button styling */
	input[type="radio"] {
		accent-color: #dc2626;
	}
</style>

