<script>
	import { goto } from '$app/navigation';
</script>

<footer class="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
			<!-- Brand & Description -->
			<div class="lg:col-span-1">
				<a href="/" class="mb-4 inline-block">
					<div class="relative inline-block">
						<div class="bg-red-600 px-4 py-2 transform -skew-x-12 shadow-lg">
							<span class="text-2xl font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
								Tournaments
							</span>
						</div>
					</div>
				</a>
				<p class="text-gray-400 text-sm leading-relaxed mb-4">
					Your premier destination for competitive sports tournaments, athlete rankings, and championship coverage across all major sports.
				</p>
				<!-- Social Media Links -->
				<div class="flex gap-3">
					<a 
						href="https://twitter.com" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors group"
						aria-label="Twitter"
					>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
						</svg>
					</a>
					<a 
						href="https://facebook.com" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors group"
						aria-label="Facebook"
					>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
						</svg>
					</a>
					<a 
						href="https://instagram.com" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors group"
						aria-label="Instagram"
					>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
						</svg>
					</a>
					<a 
						href="https://youtube.com" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors group"
						aria-label="YouTube"
					>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 9v6l5.194-3Z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
			
			<!-- Sports Guides -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sports Guides</h3>
				<ul class="space-y-3">
					<li>
						<a href="/guides" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							All Sports Guides
						</a>
					</li>
					<li>
						<a href="/nfl/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							NFL Guide
						</a>
					</li>
					<li>
						<a href="/nba/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							NBA Guide
						</a>
					</li>
					<li>
						<a href="/mlb/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							MLB Guide
						</a>
					</li>
					<li>
						<a href="/soccer/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Soccer Guide
						</a>
					</li>
					<li>
						<a href="/tennis/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Tennis Guide
						</a>
					</li>
					<li>
						<a href="/esports/guide" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Esports Guide
						</a>
					</li>
				</ul>
			</div>
			
			<!-- Quick Links -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
				<ul class="space-y-3">
					<li>
						<a href="/" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Home
						</a>
					</li>
					<li>
						<a href="/tournaments" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Tournaments
						</a>
					</li>
					<li>
						<a href="/athletes" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Athletes
						</a>
					</li>
					<li>
						<a href="/whats-on" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							What's On
						</a>
					</li>
					<li>
						<a href="/dashboard" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Dashboard
						</a>
					</li>
				</ul>
			</div>
			
			<!-- Company -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
				<ul class="space-y-3">
					<li>
						<a href="/about" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							About Us
						</a>
					</li>
					<li>
						<a href="/contact" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Contact
						</a>
					</li>
					<li>
						<a href="/blog" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Blog
						</a>
					</li>
					<li>
						<a href="/careers" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Careers
						</a>
					</li>
				</ul>
			</div>
			
			<!-- Legal & Newsletter -->
			<div>
				<h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
				<ul class="space-y-3 mb-6">
					<li>
						<a href="/privacy" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Privacy Policy
						</a>
					</li>
					<li>
						<a href="/terms" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Terms of Service
						</a>
					</li>
					<li>
						<a href="/cookies" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							Cookie Policy
						</a>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Bottom Bar -->
		<div class="mt-12 pt-8 border-t border-gray-800">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<p class="text-gray-400 text-sm">
					© {new Date().getFullYear()} Tournaments.com. All rights reserved.
				</p>
				<div class="flex items-center gap-6 text-sm text-gray-400">
					<a href="/sitemap" class="hover:text-white transition-colors">Sitemap</a>
					<a href="/accessibility" class="hover:text-white transition-colors">Accessibility</a>
					<a href="/help" class="hover:text-white transition-colors">Help Center</a>
				</div>
			</div>
		</div>
	</div>
</footer>

