<script>
	import { onMount } from 'svelte';
	
	const benefits = [
		{
			icon: '💰',
			title: 'Competitive Salary',
			description: 'We offer competitive compensation packages that reflect your skills and experience.'
		},
		{
			icon: '🏥',
			title: 'Health & Wellness',
			description: 'Comprehensive health, dental, and vision insurance for you and your family.'
		},
		{
			icon: '🏖️',
			title: 'Flexible PTO',
			description: 'Take time off when you need it. We trust you to manage your own work-life balance.'
		},
		{
			icon: '🏠',
			title: 'Remote Friendly',
			description: 'Work from anywhere. We support fully remote, hybrid, and in-office arrangements.'
		},
		{
			icon: '📚',
			title: 'Learning & Development',
			description: 'Annual learning budget, conference attendance, and opportunities for professional growth.'
		},
		{
			icon: '⚡',
			title: 'Latest Equipment',
			description: 'Top-of-the-line hardware and software to help you do your best work.'
		}
	];
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Careers - Tournaments.com</title>
	<meta name="description" content="Join the Tournaments.com team - Build the future of competitive sports and gaming. View open positions and apply today." />
</svelte:head>

<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
	<!-- Hero Section -->
	<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
		<!-- Animated background elements -->
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
		</div>
		
		<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-7xl">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-white/20">
					<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				
				<h1 class="headline-hero text-white mb-6 drop-shadow-lg">
					Join Our Team
				</h1>
				<p class="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
					Build the future of competitive sports and gaming. We're looking for passionate people to help us connect millions of fans with the tournaments they love.
				</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl space-y-16 sm:space-y-20">
		<!-- Why Work With Us -->
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
					Why Work With Us
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					We're building something special. Join a team that's passionate about sports, technology, and creating amazing experiences.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
				{#each benefits as benefit}
					<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
						<div class="text-4xl sm:text-5xl mb-4">{benefit.icon}</div>
						<h3 class="headline-small text-gray-900 dark:text-white mb-3">
							{benefit.title}
						</h3>
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
							{benefit.description}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Contact Section -->
		<div class="max-w-5xl mx-auto">
			<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 lg:p-12 text-center">
				<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
					<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
					Interested in Joining Our Team?
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
					We're always looking for talented and passionate people to join our team. Whether you're an engineer, designer, marketer, or have other skills to offer, we'd love to hear from you.
				</p>
				<p class="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
					Send us your resume and a brief note about why you're interested in working at Tournaments.com, and we'll get back to you.
				</p>
				<a
					href="mailto:careers@tournaments.com?subject=Career Inquiry"
					class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-base sm:text-lg"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Send Your Resume to careers@tournaments.com
				</a>
			</div>
		</div>

		<!-- Culture Section -->
		<div class="max-w-5xl mx-auto">
			<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 lg:p-12">
				<div class="text-center mb-10">
					<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
						Our Culture
					</h2>
					<div class="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6"></div>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">What We Value</h3>
						<ul class="space-y-3 text-gray-600 dark:text-gray-400">
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span><strong class="text-gray-900 dark:text-white">Ownership:</strong> Take initiative and see projects through from start to finish.</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span><strong class="text-gray-900 dark:text-white">Collaboration:</strong> We work together, share knowledge, and support each other.</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span><strong class="text-gray-900 dark:text-white">Growth Mindset:</strong> We're always learning, improving, and pushing boundaries.</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span><strong class="text-gray-900 dark:text-white">User Focus:</strong> Everything we do is centered around creating value for our users.</span>
							</li>
						</ul>
					</div>
					<div>
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">What to Expect</h3>
						<ul class="space-y-3 text-gray-600 dark:text-gray-400">
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span>Work on meaningful projects that impact millions of users</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span>Collaborate with a diverse, talented, and supportive team</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span>Fast-paced environment with opportunities to make an impact</span>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span>Regular team events, hackathons, and learning opportunities</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>

