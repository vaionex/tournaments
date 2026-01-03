<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Terms and Conditions - Tournaments.com</title>
	<meta name="description" content="Terms and Conditions for Tournaments.com - Tournament aggregator and sports news platform." />
</svelte:head>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
				Terms and Conditions
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
			</p>
		</div>

		<!-- Content -->
		<div class="prose prose-lg dark:prose-invert max-w-none">
			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					By accessing and using Tournaments.com ("the Platform", "we", "us", or "our"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We reserve the right to modify these terms at any time. Your continued use of the Platform after any changes constitutes acceptance of the modified terms.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Tournaments.com is an aggregator platform that provides information about tournaments, sports events, and related news. We aggregate tournament information from various sources and provide links to third-party platforms where tournaments may be hosted or registered.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We do not host, organize, or directly manage tournaments. All tournament registrations, participation, and transactions occur on third-party platforms for which we are not responsible.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Some features of the Platform may require you to create an account. You agree to:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Provide accurate, current, and complete information during registration</li>
					<li>Maintain and update your account information to keep it accurate</li>
					<li>Maintain the security of your account credentials</li>
					<li>Accept responsibility for all activities under your account</li>
					<li>Notify us immediately of any unauthorized use of your account</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activity.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Tournament Information</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					While we strive to provide accurate and up-to-date tournament information, we make no warranties or representations regarding:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>The accuracy, completeness, or timeliness of tournament information</li>
					<li>The availability of tournaments or registration slots</li>
					<li>The legitimacy, safety, or quality of tournaments listed</li>
					<li>Prize pools, entry fees, or other tournament details</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Tournament information is provided "as is" and may change without notice. Always verify tournament details directly with the tournament organizer or hosting platform before participating.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Links and Services</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					The Platform contains links to third-party websites and services, including tournament hosting platforms, sports organizations, and news sources. These links are provided for your convenience only.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We do not endorse, control, or assume responsibility for:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>The content, policies, or practices of third-party websites</li>
					<li>Tournament registrations, transactions, or disputes</li>
					<li>The accuracy of information on third-party platforms</li>
					<li>Any damages or losses resulting from your use of third-party services</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Your interactions with third-party platforms are solely between you and the third party. We are not a party to any agreements or transactions you enter into with third parties.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					All content on the Platform, including but not limited to text, graphics, logos, images, software, and design elements, is the property of Tournaments.com or its licensors and is protected by copyright, trademark, and other intellectual property laws.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You may not:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Reproduce, distribute, or create derivative works from our content without permission</li>
					<li>Use our trademarks, logos, or branding without authorization</li>
					<li>Scrape, crawl, or systematically extract data from the Platform</li>
					<li>Use automated tools to access or interact with the Platform</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					You may share links to our content and quote brief excerpts for non-commercial purposes, provided you attribute Tournaments.com as the source.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. User-Generated Content</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If the Platform allows you to submit content (comments, reviews, profiles, etc.), you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on the Platform.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You represent and warrant that:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>You own or have the right to submit the content</li>
					<li>Your content does not violate any third-party rights</li>
					<li>Your content is not defamatory, obscene, or illegal</li>
					<li>Your content does not contain malware or harmful code</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We reserve the right to remove any user-generated content that violates these terms or is otherwise objectionable.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Prohibited Activities</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You agree not to:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Use the Platform for any illegal purpose or in violation of any laws</li>
					<li>Impersonate any person or entity or misrepresent your affiliation</li>
					<li>Interfere with or disrupt the Platform's operation or security</li>
					<li>Attempt to gain unauthorized access to any part of the Platform</li>
					<li>Use bots, scrapers, or automated tools to access the Platform</li>
					<li>Transmit viruses, malware, or other harmful code</li>
					<li>Harass, abuse, or harm other users</li>
					<li>Violate any applicable regulations or third-party rights</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Disclaimers</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
					<li>Warranties regarding the accuracy, reliability, or availability of tournament information</li>
					<li>Warranties that the Platform will be uninterrupted, secure, or error-free</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We do not guarantee that tournament information is accurate, complete, or up-to-date. Always verify information directly with tournament organizers.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOURNAMENTS.COM AND ITS AFFILIATES SHALL NOT BE LIABLE FOR:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Any indirect, incidental, special, consequential, or punitive damages</li>
					<li>Loss of profits, data, or other intangible losses</li>
					<li>Damages resulting from your use or inability to use the Platform</li>
					<li>Damages resulting from tournament participation or third-party interactions</li>
					<li>Errors, omissions, or inaccuracies in tournament information</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Our total liability for any claims shall not exceed the amount you paid to us (if any) in the twelve months preceding the claim, or $100, whichever is greater.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Indemnification</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					You agree to indemnify, defend, and hold harmless Tournaments.com, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4 mt-4">
					<li>Your use of the Platform</li>
					<li>Your violation of these Terms and Conditions</li>
					<li>Your violation of any third-party rights</li>
					<li>Your participation in tournaments or interactions with third parties</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Privacy</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Your use of the Platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Termination</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We may terminate or suspend your access to the Platform at any time, with or without cause or notice, for any reason including:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Violation of these Terms and Conditions</li>
					<li>Fraudulent, abusive, or illegal activity</li>
					<li>Extended periods of inactivity</li>
					<li>At our sole discretion</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Upon termination, your right to use the Platform will immediately cease. All provisions of these terms that by their nature should survive termination shall survive.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Governing Law</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the Platform shall be resolved in the courts of [Your Jurisdiction].
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Changes to Terms</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					We reserve the right to modify these Terms and Conditions at any time. We will notify users of material changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of the Platform after changes become effective constitutes acceptance of the modified terms.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">16. Severability</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					If any provision of these Terms and Conditions is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">17. Entire Agreement</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and Tournaments.com regarding your use of the Platform and supersede all prior agreements and understandings.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">18. Contact Information</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If you have any questions about these Terms and Conditions, please contact us:
				</p>
				<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
					<p class="text-gray-700 dark:text-gray-300 mb-2">
						<strong>Email:</strong> legal@tournaments.com
					</p>
					<p class="text-gray-700 dark:text-gray-300 mb-2">
						<strong>Website:</strong> <a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">tournaments.com/contact</a>
					</p>
				</div>
			</section>

			<!-- Footer Note -->
			<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
				<p class="text-sm text-gray-500 dark:text-gray-400">
					By using Tournaments.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
				</p>
			</div>
		</div>
	</div>
</div>

