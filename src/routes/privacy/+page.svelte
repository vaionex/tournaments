<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Privacy Policy - Tournaments.com</title>
	<meta name="description" content="Privacy Policy for Tournaments.com - How we collect, use, and protect your information." />
</svelte:head>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
				Privacy Policy
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
			</p>
		</div>

		<!-- Content -->
		<div class="prose prose-lg dark:prose-invert max-w-none">
			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Welcome to Tournaments.com ("we", "us", "our", or "the Platform"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					By using Tournaments.com, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
				
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.1 Information You Provide</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We collect information that you voluntarily provide to us when you:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li><strong>Create an account:</strong> Username, email address, password (hashed), and profile information</li>
					<li><strong>Update your profile:</strong> Name, location, preferences, and other profile details</li>
					<li><strong>Contact us:</strong> Name, email address, and message content</li>
					<li><strong>Subscribe to newsletters:</strong> Email address and communication preferences</li>
					<li><strong>Participate in features:</strong> Comments, reviews, ratings, and other user-generated content</li>
				</ul>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					When you visit our Platform, we automatically collect certain information about your device and browsing behavior:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
					<li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries</li>
					<li><strong>Location Data:</strong> General geographic location based on IP address (country/city level)</li>
					<li><strong>Cookies and Tracking Technologies:</strong> See our Cookie Policy section below</li>
				</ul>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.3 Information from Third Parties</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We may receive information about you from third-party services:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li><strong>Social Media Platforms:</strong> If you connect your social media accounts</li>
					<li><strong>Analytics Providers:</strong> Aggregated usage statistics and insights</li>
					<li><strong>Payment Processors:</strong> Transaction information (if applicable)</li>
					<li><strong>Tournament Platforms:</strong> Public tournament information and results</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We use the information we collect for the following purposes:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li><strong>Service Delivery:</strong> To provide, maintain, and improve our Platform and services</li>
					<li><strong>Account Management:</strong> To create and manage your account, authenticate users, and process requests</li>
					<li><strong>Personalization:</strong> To customize your experience, show relevant content, and remember your preferences</li>
					<li><strong>Communication:</strong> To send you updates, newsletters, notifications, and respond to inquiries</li>
					<li><strong>Analytics:</strong> To understand how users interact with our Platform and improve user experience</li>
					<li><strong>Security:</strong> To detect, prevent, and address security issues, fraud, and abuse</li>
					<li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms and Conditions</li>
					<li><strong>Marketing:</strong> To send promotional communications (with your consent) and measure campaign effectiveness</li>
					<li><strong>Research:</strong> To conduct research and analysis to improve our services</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Information Sharing and Disclosure</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We do not sell your personal information. We may share your information in the following circumstances:
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.1 Service Providers</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We may share information with third-party service providers who perform services on our behalf, such as:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Hosting and cloud storage providers</li>
					<li>Analytics and data processing services</li>
					<li>Email and communication services</li>
					<li>Payment processors (if applicable)</li>
					<li>Customer support tools</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.2 Legal Requirements</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We may disclose your information if required by law or in response to:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Court orders, subpoenas, or legal processes</li>
					<li>Government requests or regulatory requirements</li>
					<li>Enforcement of our Terms and Conditions</li>
					<li>Protection of our rights, property, or safety</li>
					<li>Prevention of fraud or security threats</li>
				</ul>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.3 Business Transfers</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change in ownership.
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.4 Public Information</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Information you choose to make public on your profile or in public comments, reviews, or posts will be visible to other users and may be indexed by search engines.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies and Tracking Technologies</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We use cookies, web beacons, and similar tracking technologies to collect and store information about your interactions with our Platform.
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.1 Types of Cookies</h3>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li><strong>Essential Cookies:</strong> Required for the Platform to function properly (e.g., authentication, security)</li>
					<li><strong>Performance Cookies:</strong> Help us understand how visitors use our Platform (e.g., analytics)</li>
					<li><strong>Functional Cookies:</strong> Remember your preferences and settings (e.g., theme, language)</li>
					<li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness</li>
				</ul>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.2 Cookie Management</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Platform.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Encryption of data in transit (SSL/TLS)</li>
					<li>Secure password hashing and storage</li>
					<li>Regular security assessments and updates</li>
					<li>Access controls and authentication mechanisms</li>
					<li>Secure hosting infrastructure</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Your Privacy Rights</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Depending on your location, you may have certain rights regarding your personal information:
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.1 Access and Portability</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You have the right to access and receive a copy of your personal information in a structured, machine-readable format.
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.2 Correction and Update</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You can update or correct your personal information through your account settings or by contacting us.
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.3 Deletion</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You can request deletion of your personal information. We will delete your information unless we have a legitimate reason to retain it (e.g., legal obligations).
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.4 Opt-Out</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You can opt-out of marketing communications by:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Clicking the unsubscribe link in marketing emails</li>
					<li>Adjusting your communication preferences in account settings</li>
					<li>Contacting us directly</li>
				</ul>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.5 Cookie Preferences</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You can manage cookie preferences through your browser settings or our cookie consent banner (where available).
				</p>

				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.6 Exercising Your Rights</h3>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					To exercise any of these rights, please contact us at privacy@tournaments.com. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Our Platform is not intended for children under the age of 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal information from children under 13.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected information from a child under 13, we will take steps to delete that information.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					By using our Platform, you consent to the transfer of your information to these countries. We take appropriate safeguards to ensure your information receives adequate protection in accordance with this Privacy Policy.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Data Retention</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We retain your personal information for as long as necessary to:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Provide our services to you</li>
					<li>Comply with legal obligations</li>
					<li>Resolve disputes and enforce agreements</li>
					<li>Maintain security and prevent fraud</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					When we no longer need your information, we will securely delete or anonymize it, except where we are required to retain it for legal purposes.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Third-Party Links</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					Our Platform contains links to third-party websites, services, and tournament platforms. This Privacy Policy does not apply to third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
				</p>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We are not responsible for the privacy practices or content of third-party websites.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. California Privacy Rights (CCPA)</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Right to know what personal information is collected, used, and disclosed</li>
					<li>Right to delete personal information (subject to exceptions)</li>
					<li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
					<li>Right to non-discrimination for exercising your privacy rights</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					To exercise these rights, please contact us at privacy@tournaments.com.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. European Privacy Rights (GDPR)</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Right of access to your personal data</li>
					<li>Right to rectification of inaccurate data</li>
					<li>Right to erasure ("right to be forgotten")</li>
					<li>Right to restrict processing</li>
					<li>Right to data portability</li>
					<li>Right to object to processing</li>
					<li>Right to withdraw consent (where processing is based on consent)</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					You also have the right to lodge a complaint with your local data protection authority.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Changes to This Privacy Policy</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
				</p>
				<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
					<li>Posting the updated policy on this page</li>
					<li>Updating the "Last updated" date</li>
					<li>Sending an email notification (for significant changes)</li>
					<li>Displaying a notice on our Platform</li>
				</ul>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
					Your continued use of the Platform after changes become effective constitutes acceptance of the updated Privacy Policy.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Contact Us</h2>
				<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
				</p>
				<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
					<p class="text-gray-700 dark:text-gray-300 mb-2">
						<strong>Email:</strong> privacy@tournaments.com
					</p>
					<p class="text-gray-700 dark:text-gray-300 mb-2">
						<strong>Data Protection Officer:</strong> dpo@tournaments.com
					</p>
					<p class="text-gray-700 dark:text-gray-300 mb-2">
						<strong>Website:</strong> <a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">tournaments.com/contact</a>
					</p>
					<p class="text-gray-700 dark:text-gray-300">
						<strong>Mailing Address:</strong><br>
						Tournaments.com Privacy Team<br>
						[Your Address]<br>
						[City, State, ZIP Code]
					</p>
				</div>
			</section>

			<!-- Footer Note -->
			<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
				<p class="text-sm text-gray-500 dark:text-gray-400">
					By using Tournaments.com, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.
				</p>
			</div>
		</div>
	</div>
</div>

