export const categories = [
	{ id: 'general', label: 'General', icon: '📋', color: 'blue' },
	{ id: 'tournaments', label: 'Tournaments', icon: '🏆', color: 'green' },
	{ id: 'account', label: 'Account', icon: '👤', color: 'purple' },
	{ id: 'fantasy', label: 'Fantasy Sports', icon: '🎮', color: 'orange' },
	{ id: 'technical', label: 'Technical', icon: '💻', color: 'indigo' },
	{ id: 'billing', label: 'Billing', icon: '💳', color: 'pink' }
];

export const faqs = {
	general: [
		{
			id: 'what-is-tournaments',
			question: 'What is Tournaments.com?',
			answer: 'Tournaments.com is a comprehensive aggregator platform that provides information about tournaments, sports events, and related news. We collect and organize tournament information from various sources to help you discover and follow tournaments across multiple sports and games.'
		},
		{
			id: 'is-it-free',
			question: 'Is Tournaments.com free to use?',
			answer: 'Yes! Tournaments.com is completely free to use. You can browse tournaments, read news, view player profiles, and access all our features without any cost. Some tournaments listed on our platform may have entry fees, but using our platform itself is free.'
		},
		{
			id: 'do-you-host-tournaments',
			question: 'Do you host or organize tournaments?',
			answer: 'No, we do not host or organize tournaments directly. We are an aggregator platform that collects and displays information about tournaments from various sources. When you click to join a tournament, you will be redirected to the tournament organizer\'s platform where registration and participation occur.'
		},
		{
			id: 'how-to-find-tournaments',
			question: 'How do I find tournaments?',
			answer: 'You can find tournaments by browsing our tournaments page, using the search function, filtering by sport/game, date, or prize pool. You can also view featured tournaments on the homepage or explore tournaments by category.'
		},
		{
			id: 'update-frequency',
			question: 'How often is tournament information updated?',
			answer: 'We strive to keep tournament information as up-to-date as possible. However, tournament details may change, and we recommend verifying information directly with the tournament organizer before participating. Always check the official tournament page for the most current information.'
		}
	],
	tournaments: [
		{
			id: 'join-tournament',
			question: 'How do I join a tournament?',
			answer: 'To join a tournament, click on the tournament listing to view details. If the tournament is joinable, you\'ll see a "Join Tournament" button that will redirect you to the tournament organizer\'s platform. Note that many tournaments, especially international professional tournaments, are view-only and cannot be joined directly.'
		},
		{
			id: 'tournament-fees',
			question: 'Do tournaments have entry fees?',
			answer: 'Entry fees vary by tournament. Some tournaments are free to enter, while others may require an entry fee. The entry fee (if any) is displayed on each tournament\'s detail page. All fees are paid directly to the tournament organizer, not to Tournaments.com.'
		},
		{
			id: 'verify-tournament',
			question: 'How can I verify if a tournament is legitimate?',
			answer: 'We do our best to verify tournament information, but we recommend: 1) Checking the tournament organizer\'s official website, 2) Verifying prize pools and entry fees, 3) Reading tournament rules and terms, 4) Checking organizer reviews or reputation. If you encounter a suspicious tournament, please report it to us.'
		},
		{
			id: 'tournament-status',
			question: 'What do tournament statuses mean?',
			answer: 'Tournaments can have different statuses: "Upcoming" means registration is open or the tournament hasn\'t started yet, "Live" means the tournament is currently in progress, and "Completed" means the tournament has finished. You can view results and standings for completed tournaments.'
		},
		{
			id: 'international-tournaments',
			question: 'Can I join international tournaments?',
			answer: 'Most international professional tournaments listed on our platform are view-only and cannot be joined by the general public. These are typically professional competitions with restricted entry. However, some tournaments may have open qualifiers or public brackets that you can participate in.'
		},
		{
			id: 'track-tournament',
			question: 'How can I track tournaments I\'m interested in?',
			answer: 'You can bookmark tournaments, follow specific tournaments, or create an account to save your favorite tournaments. We also send notifications about upcoming tournaments if you subscribe to our newsletter or enable notifications in your account settings.'
		}
	],
	account: [
		{
			id: 'create-account',
			question: 'Do I need to create an account?',
			answer: 'No, you can browse tournaments and read content without an account. However, creating an account allows you to: save favorite tournaments, track your participation, receive personalized recommendations, join fantasy leagues, and access additional features.'
		},
		{
			id: 'account-benefits',
			question: 'What are the benefits of creating an account?',
			answer: 'With an account, you can: personalize your experience, save tournaments and players, participate in fantasy sports leagues, receive tournament updates and notifications, track your tournament history, and access exclusive content and features.'
		},
		{
			id: 'forgot-password',
			question: 'I forgot my password. How do I reset it?',
			answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Make sure to check your spam folder if you don\'t receive the email within a few minutes.'
		},
		{
			id: 'change-email',
			question: 'How do I change my email address?',
			answer: 'Go to your account settings, select "Account Information," and click "Change Email." You\'ll need to verify your new email address before the change takes effect.'
		},
		{
			id: 'delete-account',
			question: 'How do I delete my account?',
			answer: 'You can delete your account from the account settings page. This action is permanent and will delete all your data, saved tournaments, and preferences. If you need assistance, contact our support team.'
		},
		{
			id: 'privacy-data',
			question: 'How is my personal information used?',
			answer: 'We use your information to provide and improve our services, personalize your experience, and communicate with you. We never sell your personal information. For detailed information, please see our Privacy Policy.'
		}
	],
	fantasy: [
		{
			id: 'what-is-fantasy',
			question: 'What is Fantasy Sports?',
			answer: 'Fantasy sports is a game where you create a virtual team of real players and compete based on their real-world performance. You draft players, manage your team, and earn points based on how your players perform in actual games. It\'s completely free to play on Tournaments.com.'
		},
		{
			id: 'how-fantasy-works',
			question: 'How does Fantasy Sports work?',
			answer: '1) Join or create a league, 2) Draft your team of real players, 3) Your team earns points based on real player performance, 4) Compete weekly against other teams, 5) Climb the leaderboard and compete for the top spot. All leagues on our platform are free to join.'
		},
		{
			id: 'fantasy-cost',
			question: 'Is Fantasy Sports free?',
			answer: 'Yes! All fantasy sports leagues on Tournaments.com are completely free. There are no entry fees, no hidden costs, and no money involved. It\'s purely for fun and competition.'
		},
		{
			id: 'create-league',
			question: 'How do I create a fantasy league?',
			answer: 'Go to the Fantasy page, click "Create League," choose your sport, set league settings (format, scoring, etc.), invite friends or make it public, and start drafting your team. The process is simple and takes just a few minutes.'
		},
		{
			id: 'join-league',
			question: 'How do I join a fantasy league?',
			answer: 'Browse available public leagues on the Fantasy page, filter by sport or preferences, click on a league to view details, and click "Join League" if there are available spots. You can also join leagues via invitation links.'
		},
		{
			id: 'fantasy-scoring',
			question: 'How is scoring calculated?',
			answer: 'Scoring is based on real player performance in actual games. Points are awarded for various statistics (goals, assists, points, etc.) depending on the sport. Each league may have slightly different scoring rules, which are displayed when you join.'
		}
	],
	technical: [
		{
			id: 'browser-support',
			question: 'Which browsers are supported?',
			answer: 'Tournaments.com works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Some features may not work on older browsers.'
		},
		{
			id: 'mobile-app',
			question: 'Is there a mobile app?',
			answer: 'Currently, we don\'t have a native mobile app, but our website is fully responsive and optimized for mobile devices. You can access all features through your mobile browser. We\'re working on a mobile app for the future.'
		},
		{
			id: 'site-slow',
			question: 'The site is loading slowly. What should I do?',
			answer: 'Try: clearing your browser cache, disabling browser extensions, checking your internet connection, trying a different browser, or refreshing the page. If the problem persists, contact our technical support team.'
		},
		{
			id: 'features-not-working',
			question: 'Some features aren\'t working. How do I fix this?',
			answer: 'Make sure JavaScript is enabled in your browser, clear your browser cache and cookies, try using an incognito/private browsing window, or update your browser to the latest version. If issues continue, contact support.'
		},
		{
			id: 'dark-mode',
			question: 'How do I enable dark mode?',
			answer: 'Click the theme toggle button in the header to switch between light and dark modes. Your preference will be saved and remembered for future visits.'
		},
		{
			id: 'notifications',
			question: 'How do I enable notifications?',
			answer: 'Go to your account settings, navigate to "Notifications," and enable the types of notifications you want to receive. You may need to allow browser notifications when prompted.'
		}
	],
	billing: [
		{
			id: 'is-there-billing',
			question: 'Do you charge for anything?',
			answer: 'No, Tournaments.com is completely free to use. We do not charge for browsing tournaments, creating accounts, or using our fantasy sports features. However, individual tournaments may have their own entry fees paid directly to tournament organizers.'
		},
		{
			id: 'tournament-fees-where',
			question: 'Where do tournament entry fees go?',
			answer: 'Tournament entry fees (if any) are paid directly to the tournament organizer, not to Tournaments.com. We are an aggregator platform and do not collect or process tournament fees. All transactions occur on the tournament organizer\'s platform.'
		},
		{
			id: 'refund-policy',
			question: 'What is your refund policy?',
			answer: 'Since we do not charge for our services, there are no refunds needed. For tournament entry fees, refund policies are determined by the individual tournament organizers. Please check the tournament\'s terms and conditions for their refund policy.'
		},
		{
			id: 'payment-methods',
			question: 'What payment methods do you accept?',
			answer: 'We do not process payments on Tournaments.com. If a tournament has an entry fee, payment is handled by the tournament organizer on their platform. Payment methods vary by organizer and are displayed on their registration page.'
		}
	]
};

