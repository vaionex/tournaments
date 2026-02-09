<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	
	let sport = '';
	let sportConfig = null;
	let loading = true;
	let activeCategory = 'scoring';
	let playerStats = {};
	let teamStats = {};
	let viewType = 'players'; // 'players' or 'teams'
	
	const sportsConfig = {
		'nfl': {
			name: 'NFL', icon: '🏈', color: 'bg-green-700',
			playerCategories: [
				{ id: 'passing', label: 'Passing', stats: ['YDS', 'TD', 'INT', 'RTG', 'CMP%'] },
				{ id: 'rushing', label: 'Rushing', stats: ['YDS', 'TD', 'AVG', 'ATT', 'LNG'] },
				{ id: 'receiving', label: 'Receiving', stats: ['REC', 'YDS', 'TD', 'AVG', 'TGT'] },
				{ id: 'defense', label: 'Defense', stats: ['TCKL', 'SACK', 'INT', 'FF', 'PD'] }
			],
			teamCategories: [
				{ id: 'offense', label: 'Offense', stats: ['PPG', 'YPG', 'PASS YPG', 'RUSH YPG', 'TOP'] },
				{ id: 'defense', label: 'Defense', stats: ['PPG', 'YPG', 'PASS YPG', 'RUSH YPG', 'SACK'] }
			]
		},
		'nba': {
			name: 'NBA', icon: '🏀', color: 'bg-orange-600',
			playerCategories: [
				{ id: 'scoring', label: 'Scoring', stats: ['PPG', 'FG%', '3P%', 'FT%', 'PTS'] },
				{ id: 'rebounding', label: 'Rebounding', stats: ['RPG', 'ORPG', 'DRPG', 'TRB', 'RPG'] },
				{ id: 'assists', label: 'Assists', stats: ['APG', 'AST', 'TOV', 'A/TO', 'USG%'] },
				{ id: 'defense', label: 'Defense', stats: ['SPG', 'BPG', 'STL', 'BLK', 'DWS'] }
			],
			teamCategories: [
				{ id: 'offense', label: 'Offense', stats: ['PPG', 'FG%', '3P%', 'FT%', 'PACE'] },
				{ id: 'defense', label: 'Defense', stats: ['OPP PPG', 'OPP FG%', 'DRTG', 'BLK', 'STL'] }
			]
		},
		'mlb': {
			name: 'MLB', icon: '⚾', color: 'bg-red-600',
			playerCategories: [
				{ id: 'hitting', label: 'Hitting', stats: ['AVG', 'HR', 'RBI', 'OPS', 'SLG'] },
				{ id: 'pitching', label: 'Pitching', stats: ['W', 'ERA', 'SO', 'WHIP', 'IP'] },
				{ id: 'homeRuns', label: 'Home Runs', stats: ['HR', 'AB/HR', 'SLG', 'ISO', 'FB%'] }
			],
			teamCategories: [
				{ id: 'batting', label: 'Batting', stats: ['AVG', 'OBP', 'SLG', 'OPS', 'HR'] },
				{ id: 'pitching', label: 'Pitching', stats: ['ERA', 'WHIP', 'K/9', 'BB/9', 'HR/9'] }
			]
		},
		'nhl': {
			name: 'NHL', icon: '🏒', color: 'bg-blue-700',
			playerCategories: [
				{ id: 'scoring', label: 'Scoring', stats: ['G', 'A', 'PTS', '+/-', 'PPG'] },
				{ id: 'goaltending', label: 'Goaltending', stats: ['W', 'GAA', 'SV%', 'SO', 'SA'] }
			],
			teamCategories: [
				{ id: 'offense', label: 'Offense', stats: ['GF/G', 'PP%', 'SOG', 'CF%', 'xGF'] },
				{ id: 'defense', label: 'Defense', stats: ['GA/G', 'PK%', 'SA', 'SV%', 'xGA'] }
			]
		},
		'soccer': {
			name: 'Soccer', icon: '⚽', color: 'bg-purple-700',
			playerCategories: [
				{ id: 'scoring', label: 'Goals', stats: ['G', 'A', 'G+A', 'xG', 'G/90'] },
				{ id: 'assists', label: 'Assists', stats: ['A', 'KP', 'xA', 'A/90', 'PPA'] },
				{ id: 'defending', label: 'Defending', stats: ['TCKL', 'INT', 'CLR', 'BLK', 'AER%'] }
			],
			teamCategories: [
				{ id: 'attack', label: 'Attack', stats: ['GF', 'xG', 'SOT', 'POSS', 'PASS%'] },
				{ id: 'defense', label: 'Defense', stats: ['GA', 'xGA', 'CS', 'TCKL', 'INT'] }
			]
		},
		'olympics': {
			name: 'Olympics', icon: '🏅', color: 'bg-blue-600',
			playerCategories: [
				{ id: 'medals', label: 'Medals', stats: ['Gold', 'Silver', 'Bronze', 'Total', 'Events'] },
				{ id: 'records', label: 'Records', stats: ['WR', 'OR', 'PB', 'SB', 'Rank'] },
				{ id: 'performance', label: 'Performance', stats: ['Score', 'Time', 'Distance', 'Height', 'Points'] }
			],
			teamCategories: [
				{ id: 'medal-table', label: 'Medal Table', stats: ['Gold', 'Silver', 'Bronze', 'Total', 'Rank'] },
				{ id: 'participation', label: 'Participation', stats: ['Athletes', 'Events', 'Sports', 'Disciplines', 'Medals'] }
			]
		}
	};
	
	const playerNames = {
		'nfl': {
			'passing': ['Patrick Mahomes', 'Josh Allen', 'Lamar Jackson', 'Jalen Hurts', 'Dak Prescott', 'Joe Burrow', 'Tua Tagovailoa', 'Jared Goff', 'Jordan Love', 'Brock Purdy'],
			'rushing': ['Derrick Henry', 'Christian McCaffrey', 'Bijan Robinson', 'Josh Jacobs', 'Breece Hall', 'Jonathan Taylor', 'Saquon Barkley', 'Travis Etienne', 'Tony Pollard', 'Isiah Pacheco'],
			'receiving': ['Tyreek Hill', 'CeeDee Lamb', 'Ja\'Marr Chase', 'A.J. Brown', 'Davante Adams', 'Amon-Ra St. Brown', 'Justin Jefferson', 'Stefon Diggs', 'Garrett Wilson', 'DeVonta Smith'],
			'defense': ['Micah Parsons', 'T.J. Watt', 'Nick Bosa', 'Myles Garrett', 'Maxx Crosby', 'Fred Warner', 'Sauce Gardner', 'Patrick Surtain II', 'Jalen Ramsey', 'Derwin James']
		},
		'nba': {
			'scoring': ['Luka Dončić', 'Giannis Antetokounmpo', 'Shai Gilgeous-Alexander', 'Joel Embiid', 'Kevin Durant', 'Jayson Tatum', 'LeBron James', 'Stephen Curry', 'Donovan Mitchell', 'Anthony Edwards'],
			'rebounding': ['Domantas Sabonis', 'Rudy Gobert', 'Anthony Davis', 'Nikola Jokić', 'Karl-Anthony Towns', 'Bam Adebayo', 'Jarrett Allen', 'Chet Holmgren', 'Paolo Banchero', 'Victor Wembanyama'],
			'assists': ['Tyrese Haliburton', 'Trae Young', 'James Harden', 'Nikola Jokić', 'Luka Dončić', 'LaMelo Ball', 'De\'Aaron Fox', 'Chris Paul', 'Jalen Brunson', 'Fred VanVleet'],
			'defense': ['Rudy Gobert', 'Victor Wembanyama', 'Jaren Jackson Jr.', 'Anthony Davis', 'Bam Adebayo', 'Giannis Antetokounmpo', 'Draymond Green', 'Marcus Smart', 'Mikal Bridges', 'OG Anunoby']
		},
		'mlb': {
			'hitting': ['Shohei Ohtani', 'Mookie Betts', 'Ronald Acuña Jr.', 'Corey Seager', 'Freddie Freeman', 'Matt Olson', 'Mike Trout', 'Juan Soto', 'Trea Turner', 'Marcus Semien'],
			'pitching': ['Gerrit Cole', 'Spencer Strider', 'Zack Wheeler', 'Corbin Burnes', 'Blake Snell', 'Ranger Suárez', 'Max Scherzer', 'Kevin Gausman', 'Framber Valdez', 'Yoshinobu Yamamoto'],
			'homeRuns': ['Matt Olson', 'Pete Alonso', 'Kyle Schwarber', 'Aaron Judge', 'Shohei Ohtani', 'Marcell Ozuna', 'Yordan Alvarez', 'Mookie Betts', 'Corey Seager', 'Ronald Acuña Jr.']
		},
		'nhl': {
			'scoring': ['Connor McDavid', 'Nathan MacKinnon', 'Nikita Kucherov', 'Auston Matthews', 'Leon Draisaitl', 'Cale Makar', 'David Pastrnak', 'Mikko Rantanen', 'Jack Hughes', 'Matthew Tkachuk'],
			'goaltending': ['Connor Hellebuyck', 'Andrei Vasilevskiy', 'Igor Shesterkin', 'Ilya Sorokin', 'Jake Oettinger', 'Stuart Skinner', 'Juuse Saros', 'Linus Ullmark', 'Filip Gustavsson', 'Tristan Jarry']
		},
		'soccer': {
			'scoring': ['Erling Haaland', 'Mohamed Salah', 'Bukayo Saka', 'Ollie Watkins', 'Cole Palmer', 'Alexander Isak', 'Darwin Núñez', 'Son Heung-min', 'Bruno Fernandes', 'Jarrod Bowen'],
			'assists': ['Kevin De Bruyne', 'Martin Ødegaard', 'James Maddison', 'Bruno Fernandes', 'Bukayo Saka', 'Cole Palmer', 'Trent Alexander-Arnold', 'Mohamed Salah', 'Bernardo Silva', 'Jack Grealish'],
			'defending': ['Virgil van Dijk', 'William Saliba', 'Rúben Dias', 'Josko Gvardiol', 'Cristian Romero', 'Lisandro Martínez', 'Micky van de Ven', 'Gabriel Magalhães', 'Lewis Dunk', 'Ezri Konsa']
		},
		'olympics': {
			'medals': ['Mikaela Shiffrin', 'Johannes Høsflot Klæbo', 'Eileen Gu', 'Marco Odermatt', 'Petra Vlhová', 'Alexander Bolshunov', 'Sofia Goggia', 'Marte Olsbu Røiseland', 'Nils van der Poel', 'Ireen Wüst'],
			'records': ['Mikaela Shiffrin', 'Johannes Høsflot Klæbo', 'Eileen Gu', 'Marco Odermatt', 'Petra Vlhová', 'Alexander Bolshunov', 'Sofia Goggia', 'Marte Olsbu Røiseland', 'Nils van der Poel', 'Ireen Wüst'],
			'performance': ['Mikaela Shiffrin', 'Johannes Høsflot Klæbo', 'Eileen Gu', 'Marco Odermatt', 'Petra Vlhová', 'Alexander Bolshunov', 'Sofia Goggia', 'Marte Olsbu Røiseland', 'Nils van der Poel', 'Ireen Wüst']
		}
	};
	
	const teamNames = {
		'nfl': ['Chiefs', '49ers', 'Ravens', 'Cowboys', 'Lions', 'Eagles', 'Dolphins', 'Bills', 'Bengals', 'Jets'],
		'nba': ['Celtics', 'Nuggets', 'Bucks', 'Thunder', 'Timberwolves', 'Clippers', 'Mavericks', 'Cavaliers', 'Knicks', 'Suns'],
		'mlb': ['Dodgers', 'Braves', 'Astros', 'Rangers', 'Orioles', 'Phillies', 'Yankees', 'Twins', 'Rays', 'Mariners'],
		'nhl': ['Panthers', 'Avalanche', 'Rangers', 'Stars', 'Bruins', 'Oilers', 'Lightning', 'Hurricanes', 'Devils', 'Canucks'],
		'soccer': ['Arsenal', 'Man City', 'Liverpool', 'Aston Villa', 'Tottenham', 'Newcastle', 'Man United', 'Brighton', 'West Ham', 'Chelsea'],
		'olympics': ['USA', 'Norway', 'Germany', 'Canada', 'Sweden', 'Austria', 'Switzerland', 'Italy', 'France', 'Netherlands']
	};
	
	function generatePlayerStats(sportCode) {
		const config = sportsConfig[sportCode];
		const names = playerNames[sportCode] || playerNames['nfl'];
		const stats = {};
		
		config.playerCategories.forEach(cat => {
			const catPlayers = names[cat.id] || names[Object.keys(names)[0]];
			stats[cat.id] = catPlayers.map((name, i) => {
				const statValues = {};
				cat.stats.forEach(stat => {
					if (stat.includes('%')) {
						statValues[stat] = (Math.random() * 30 + 30).toFixed(1);
					} else if (stat === 'AVG') {
						statValues[stat] = (Math.random() * 0.15 + 0.25).toFixed(3);
					} else if (stat === 'ERA' || stat === 'GAA' || stat === 'WHIP') {
						statValues[stat] = (Math.random() * 2 + 1.5).toFixed(2);
					} else if (stat === 'SV%') {
						statValues[stat] = (Math.random() * 0.03 + 0.90).toFixed(3);
					} else {
						statValues[stat] = Math.floor(Math.random() * 500 + 100 - i * 20);
					}
				});
				return {
					rank: i + 1,
					name,
					team: teamNames[sportCode]?.[i % teamNames[sportCode].length] || 'Team',
					image: `https://ui-avatars.com/api/?name=${name.replace(/\s/g, '+')}&background=random&size=60`,
					...statValues
				};
			});
		});
		
		return stats;
	}
	
	function generateTeamStats(sportCode) {
		const config = sportsConfig[sportCode];
		const teams = teamNames[sportCode] || teamNames['nfl'];
		const stats = {};
		
		config.teamCategories.forEach(cat => {
			stats[cat.id] = teams.map((team, i) => {
				const statValues = {};
				cat.stats.forEach(stat => {
					if (stat.includes('%')) {
						statValues[stat] = (Math.random() * 20 + 40).toFixed(1);
					} else if (stat === 'PPG' || stat === 'YPG' || stat.includes('YPG')) {
						statValues[stat] = (Math.random() * 100 + 200 - i * 10).toFixed(1);
					} else {
						statValues[stat] = (Math.random() * 50 + 50 - i * 3).toFixed(1);
					}
				});
				return {
					rank: i + 1,
					team,
					logo: `https://ui-avatars.com/api/?name=${team}&background=random&size=60`,
					...statValues
				};
			});
		});
		
		return stats;
	}
	
	$: categories = viewType === 'players' ? sportConfig?.playerCategories : sportConfig?.teamCategories;
	$: currentStats = viewType === 'players' ? playerStats[activeCategory] : teamStats[activeCategory];
	$: statColumns = categories?.find(c => c.id === activeCategory)?.stats || [];
	
	onMount(async () => {
		sport = $page.params.sport.toLowerCase();
		sportConfig = sportsConfig[sport] || sportsConfig['nba'];
		activeCategory = sportConfig.playerCategories[0].id;
		
		await new Promise(resolve => setTimeout(resolve, 500));
		playerStats = generatePlayerStats(sport);
		teamStats = generateTeamStats(sport);
		loading = false;
	});
</script>

<PageSEO 
	title="{sportConfig?.name || 'Sports'} Stats - Player & Team Statistics"
	description="Complete {sportConfig?.name || 'sports'} statistics, player leaders, and team rankings. Stats for scoring, defense, and more."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="{sportConfig?.color || 'bg-blue-700'} text-white py-6 sm:py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-3">
				<span class="text-3xl sm:text-4xl">{sportConfig?.icon || '🏆'}</span>
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{sportConfig?.name || 'Sports'} Stats</h1>
					<p class="text-sm sm:text-base opacity-90">Player & team statistics leaders</p>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Filters -->
	<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[88px] z-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
				<!-- View Toggle -->
				<div class="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
					<button
						on:click={() => { viewType = 'players'; activeCategory = sportConfig.playerCategories[0].id; }}
						class="px-4 py-2 text-sm font-medium {viewType === 'players' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
					>
						Players
					</button>
					<button
						on:click={() => { viewType = 'teams'; activeCategory = sportConfig.teamCategories[0].id; }}
						class="px-4 py-2 text-sm font-medium {viewType === 'teams' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
					>
						Teams
					</button>
				</div>
				
				<!-- Category Tabs -->
				<div class="flex items-center gap-2 overflow-x-auto">
					{#each categories || [] as cat}
						<button
							on:click={() => activeCategory = cat.id}
							class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all {activeCategory === cat.id 
								? `${sportConfig?.color || 'bg-blue-700'} text-white` 
								: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}"
						>
							{cat.label}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
	
	<!-- Stats Table -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		{#if loading}
			<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
				<div class="p-4 space-y-4">
					{#each Array(10) as _}
						<div class="flex items-center gap-4 animate-pulse">
							<div class="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							<div class="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div class="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div class="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div class="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
							<tr class="text-xs text-gray-500 dark:text-gray-400 uppercase">
								<th class="px-4 py-4 text-left w-12">#</th>
								<th class="px-4 py-4 text-left min-w-[200px]">{viewType === 'players' ? 'Player' : 'Team'}</th>
								{#each statColumns as stat}
									<th class="px-4 py-4 text-right">{stat}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
							{#each currentStats || [] as item}
								<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
									<td class="px-4 py-4">
										<span class="flex items-center justify-center w-8 h-8 rounded-full {item.rank <= 3 ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'} font-bold text-sm">
											{item.rank}
										</span>
									</td>
									<td class="px-4 py-4">
										{#if viewType === 'players'}
											<a href="/players/{item.name.toLowerCase().replace(/\s/g, '-')}" class="flex items-center gap-3 hover:text-blue-600 transition-colors">
												<img src={item.image} alt={item.name} class="w-12 h-12 rounded-full object-cover" />
												<div>
													<div class="font-semibold text-gray-900 dark:text-white">{item.name}</div>
													<div class="text-sm text-gray-500 dark:text-gray-400">{item.team}</div>
												</div>
											</a>
										{:else}
											<a href="/{sport}/team/{item.team.toLowerCase().replace(/\s/g, '-')}" class="flex items-center gap-3 hover:text-blue-600 transition-colors">
												<img src={item.logo} alt={item.team} class="w-12 h-12 rounded-full object-cover" />
												<span class="font-semibold text-gray-900 dark:text-white">{item.team}</span>
											</a>
										{/if}
									</td>
									{#each statColumns as stat}
										<td class="px-4 py-4 text-right font-mono text-sm {stat === statColumns[0] ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}">
											{item[stat]}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>








