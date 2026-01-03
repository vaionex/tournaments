<script>
	import { onMount } from 'svelte';
	
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let submitting = false;
	let submitted = false;
	let error = '';
	
	let selectedCategory = 'general';
	
	const categories = [
		{ value: 'general', label: 'General Inquiry' },
		{ value: 'support', label: 'Technical Support' },
		{ value: 'tournament', label: 'Tournament Information' },
		{ value: 'partnership', label: 'Partnership/Business' },
		{ value: 'media', label: 'Media/Press' },
		{ value: 'legal', label: 'Legal/Privacy' },
		{ value: 'feedback', label: 'Feedback/Suggestions' }
	];
	
	function handleSubmit() {
		error = '';
		
		if (!name.trim() || !email.trim() || !message.trim()) {
			error = 'Please fill in all required fields.';
			return;
		}
		
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = 'Please enter a valid email address.';
			return;
		}
		
		submitting = true;
		
		// Simulate form submission
		setTimeout(() => {
			submitting = false;
			submitted = true;
			name = '';
			email = '';
			subject = '';
			message = '';
			selectedCategory = 'general';
		}, 1500);
	}
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Contact Us - Tournaments.com</title>
	<meta name="description" content="Get in touch with Tournaments.com - Contact us for support, inquiries, partnerships, and more." />
</svelte:head>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
				Contact Us
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				Have a question, suggestion, or need help? We're here to assist you. Reach out to us through the form below or use our contact information.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 lg:gap-12">
			<!-- Contact Form -->
			<div class="bento-card">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
				
				{#if submitted}
					<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
						<div class="flex items-start gap-3">
							<svg class="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<h3 class="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Message Sent Successfully!</h3>
								<p class="text-green-700 dark:text-green-400">
									Thank you for contacting us. We'll get back to you as soon as possible, typically within 24-48 hours.
								</p>
							</div>
						</div>
					</div>
					<button
						on:click={() => submitted = false}
						class="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
					>
						Send Another Message
					</button>
				{:else}
					<form on:submit|preventDefault={handleSubmit} class="space-y-6">
						{#if error}
							<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
								<p class="text-red-800 dark:text-red-300 text-sm">{error}</p>
							</div>
						{/if}
						
						<div>
							<label for="category" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
								Category
							</label>
							<select
								id="category"
								bind:value={selectedCategory}
								class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							>
								{#each categories as category}
									<option value={category.value}>{category.label}</option>
								{/each}
							</select>
						</div>
						
						<div>
							<label for="name" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
								Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="name"
								bind:value={name}
								required
								class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								placeholder="Your name"
							/>
						</div>
						
						<div>
							<label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
								Email <span class="text-red-500">*</span>
							</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								placeholder="your.email@example.com"
							/>
						</div>
						
						<div>
							<label for="subject" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
								Subject (Optional)
							</label>
							<input
								type="text"
								id="subject"
								bind:value={subject}
								class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								placeholder="Brief subject line"
							/>
						</div>
						
						<div>
							<label for="message" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
								Message <span class="text-red-500">*</span>
							</label>
							<textarea
								id="message"
								bind:value={message}
								required
								rows="6"
								class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
								placeholder="Please provide details about your inquiry..."
							></textarea>
						</div>
						
						<button
							type="submit"
							disabled={submitting}
							class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
						>
							{#if submitting}
								<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span>Sending...</span>
							{:else}
								<span>Send Message</span>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
								</svg>
							{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Contact Information -->
			<div class="space-y-6">
				<!-- General Contact -->
				<div class="bento-card">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
					<div class="space-y-4">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white mb-1">General Inquiries</h3>
								<a href="mailto:info@tournaments.com" class="text-blue-600 dark:text-blue-400 hover:underline">
									info@tournaments.com
								</a>
							</div>
						</div>
						
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Technical Support</h3>
								<a href="mailto:support@tournaments.com" class="text-blue-600 dark:text-blue-400 hover:underline">
									support@tournaments.com
								</a>
								<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Response time: 24-48 hours</p>
							</div>
						</div>
						
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Partnerships & Business</h3>
								<a href="mailto:partnerships@tournaments.com" class="text-blue-600 dark:text-blue-400 hover:underline">
									partnerships@tournaments.com
								</a>
							</div>
						</div>
						
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Media & Press</h3>
								<a href="mailto:press@tournaments.com" class="text-blue-600 dark:text-blue-400 hover:underline">
									press@tournaments.com
								</a>
							</div>
						</div>
						
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.052z" />
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Privacy & Legal</h3>
								<a href="mailto:legal@tournaments.com" class="text-blue-600 dark:text-blue-400 hover:underline">
									legal@tournaments.com
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- FAQ Quick Links -->
				<div class="bento-card">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Before You Contact</h2>
					<p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
						You might find answers to common questions in our help resources:
					</p>
					<div class="space-y-3">
						<a href="/terms" class="block p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium text-gray-900 dark:text-white">Terms and Conditions</span>
								<svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</a>
						<a href="/privacy" class="block p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium text-gray-900 dark:text-white">Privacy Policy</span>
								<svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</a>
						<a href="/cookies" class="block p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium text-gray-900 dark:text-white">Cookie Policy</span>
								<svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</a>
					</div>
				</div>

				<!-- Response Time Info -->
				<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
					<h3 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Response Times</h3>
					<ul class="text-sm text-blue-800 dark:text-blue-400 space-y-1">
						<li>• General inquiries: 24-48 hours</li>
						<li>• Technical support: 24-48 hours</li>
						<li>• Business inquiries: 2-3 business days</li>
						<li>• Legal/Privacy: 3-5 business days</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

