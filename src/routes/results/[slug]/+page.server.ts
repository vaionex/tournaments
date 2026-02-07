import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface ResultData {
	slug: string;
	title: string;
	description: string;
	event: string;
	year: string;
	date: string;
	location: string;
	winner: {
		name: string;
		country?: string;
		seed?: number;
	};
	runnerUp: {
		name: string;
		country?: string;
		seed?: number;
	};
	score: string;
	format: string;
	attendance?: number;
	prize?: string;
	keyMoments: Array<{
		time: string;
		description: string;
	}>;
	participants: Array<{
		name: string;
		role: string;
		stats?: string;
	}>;
	significance: string;
	content: string;
}

const results: Record<string, ResultData> = {
	'super-bowl-2025': {
		slug: 'super-bowl-2025',
		title: 'Super Bowl LIX Results 2025',
		description: 'Complete results and recap from Super Bowl LIX, featuring championship game details, key plays, and memorable moments.',
		event: 'Super Bowl LIX',
		year: '2025',
		date: 'February 9, 2025',
		location: 'Caesars Superdome, New Orleans, Louisiana',
		winner: {
			name: 'Kansas City Chiefs',
			seed: 1
		},
		runnerUp: {
			name: 'Philadelphia Eagles',
			seed: 1
		},
		score: 'Kansas City Chiefs 31, Philadelphia Eagles 24',
		format: 'Single elimination championship game',
		attendance: 73000,
		prize: '$164 million (winner share: $164,000 per player)',
		keyMoments: [
			{ time: '1st Quarter 8:42', description: 'Patrick Mahomes 45-yard touchdown pass to Travis Kelce' },
			{ time: '2nd Quarter 14:23', description: 'Jalen Hurts 1-yard rushing touchdown' },
			{ time: '3rd Quarter 6:15', description: 'Chris Jones strip sack leads to Chiefs field goal' },
			{ time: '4th Quarter 2:47', description: 'Mahomes 12-yard touchdown pass seals victory' }
		],
		participants: [
			{ name: 'Patrick Mahomes', role: 'Chiefs QB', stats: '26/39, 355 yards, 3 TDs' },
			{ name: 'Jalen Hurts', role: 'Eagles QB', stats: '23/35, 289 yards, 2 TDs, 1 INT' },
			{ name: 'Travis Kelce', role: 'Chiefs TE', stats: '8 receptions, 122 yards, 2 TDs' },
			{ name: 'A.J. Brown', role: 'Eagles WR', stats: '7 receptions, 109 yards, 1 TD' }
		],
		significance: 'Kansas City Chiefs won their third Super Bowl in six years, cementing their dynasty status under coach Andy Reid.',
		content: `Super Bowl LIX delivered another classic championship game as the Kansas City Chiefs defeated the Philadelphia Eagles 31-24 in a thrilling rematch of Super Bowl LVII. Playing in the iconic Caesars Superdome in New Orleans, both teams showcased explosive offenses in a game that lived up to its championship billing.

**First Half Excellence**

The game opened with both offenses finding immediate rhythm. Patrick Mahomes connected with Travis Kelce for a spectacular 45-yard touchdown on the Chiefs' opening drive, demonstrating the chemistry that has made them one of the NFL's most dangerous combinations. The Eagles responded quickly, with Jalen Hurts orchestrating a methodical drive that culminated in his signature 1-yard rushing touchdown.

Both quarterbacks displayed remarkable poise and accuracy throughout the first half. Mahomes utilized the entire field, spreading the ball to multiple receivers while Hurts effectively mixed passing and rushing attacks that kept Kansas City's defense off balance. The first half featured four lead changes, with neither team able to establish sustained control.

**Defensive Adjustments**

The second half saw both defensive coordinators make crucial adjustments. Kansas City's Steve Spagnuolo implemented more aggressive pressure packages that disrupted Philadelphia's rhythm, while Eagles defensive coordinator Sean Desai countered with zone coverages designed to limit big plays.

The turning point came early in the third quarter when Chris Jones recorded a strip sack that gave Kansas City excellent field position. The Chiefs converted this opportunity into a field goal that proved crucial in the final margin. Jones's performance exemplified Kansas City's defensive improvements throughout the season.

**Fourth Quarter Drama**

The final quarter provided classic Super Bowl drama. Philadelphia took a 24-21 lead with 8:47 remaining on a beautiful touchdown pass from Hurts to A.J. Brown. However, Mahomes responded with the championship-caliber performance that has defined his career, leading a methodical 75-yard drive that consumed nearly six minutes of clock time.

The decisive play came with 2:47 remaining when Mahomes found Kelce on a perfectly executed crossing route for a 12-yard touchdown. The pass required exceptional timing and placement, threading through tight coverage to give Kansas City the lead they would not relinquish.

**Individual Brilliance**

Patrick Mahomes earned Super Bowl MVP honors for his exceptional performance under pressure. His ability to extend plays with his mobility while maintaining downfield vision created numerous scoring opportunities. The quarterback's 355 passing yards and three touchdowns demonstrated why he's considered among the game's elite performers.

Jalen Hurts played admirably despite the loss, showing remarkable growth in his third NFL season. His dual-threat ability kept Kansas City's defense honest throughout the game, while his leadership and poise in pressure situations indicated bright future prospects for Philadelphia's franchise.

**Coaching Excellence**

Andy Reid's tactical adjustments throughout the game showcased veteran championship experience. His use of motion and misdirection consistently created favorable matchups, while his clock management in crucial situations proved decisive. Reid's ability to prepare his team for the Super Bowl stage has become a defining characteristic of the Chiefs' recent success.

Philadelphia's Nick Sirianni demonstrated impressive growth in his second Super Bowl appearance. His aggressive play-calling kept pace with Kansas City's explosive offense, while his players' preparation and execution reflected excellent coaching throughout the season.

**Legacy Implications**

This victory established Kansas City as the NFL's first repeat champion since the New England Patriots (2003-2004), cementing their status as a modern dynasty. The Chiefs' ability to perform in pressure situations has become their defining characteristic, with this Super Bowl representing their third championship in six seasons.

For Philadelphia, this loss stings but demonstrates the franchise's championship-caliber potential. The Eagles' young core, led by Hurts, positions them well for continued success in an increasingly competitive NFC conference.

**Historical Context**

Super Bowl LIX will be remembered for its offensive excellence and fourth-quarter drama. The game's 55 combined points and multiple lead changes provided entertainment value that justified the Super Bowl's status as America's premier sporting event. Both teams' performances honored the championship stage while creating memories that will endure for decades.

The victory caps a remarkable season for Kansas City, demonstrating that sustained excellence at the NFL's highest level remains possible through exceptional leadership, strategic preparation, and championship-level execution when stakes are highest.`
	},
	'nba-finals-2024': {
		slug: 'nba-finals-2024',
		title: 'NBA Finals 2024 Results',
		description: 'Complete recap of the 2024 NBA Finals between the Boston Celtics and Dallas Mavericks, featuring game-by-game results and analysis.',
		event: 'NBA Finals 2024',
		year: '2024',
		date: 'June 6-17, 2024',
		location: 'TD Garden (Boston) & American Airlines Center (Dallas)',
		winner: {
			name: 'Boston Celtics',
			seed: 1
		},
		runnerUp: {
			name: 'Dallas Mavericks',
			seed: 5
		},
		score: 'Boston Celtics win series 4-1',
		format: 'Best-of-seven series',
		attendance: 350000,
		prize: '$5.9 million (winning team bonus)',
		keyMoments: [
			{ time: 'Game 1', description: 'Celtics set Finals record with 29 made three-pointers' },
			{ time: 'Game 4', description: 'Luka Dončić triple-double keeps Dallas alive' },
			{ time: 'Game 5', description: 'Jayson Tatum\'s 31 points clinches championship' }
		],
		participants: [
			{ name: 'Jayson Tatum', role: 'Celtics F', stats: '22.2 PPG, 7.8 RPG, 7.2 APG' },
			{ name: 'Jaylen Brown', role: 'Celtics G/F', stats: '20.8 PPG, 5.4 RPG (Finals MVP)' },
			{ name: 'Luka Dončić', role: 'Mavericks G', stats: '29.2 PPG, 8.8 RPG, 5.6 APG' },
			{ name: 'Kyrie Irving', role: 'Mavericks G', stats: '19.8 PPG, 3.2 RPG, 5.0 APG' }
		],
		significance: 'Boston Celtics won their 18th NBA championship, breaking tie with Lakers for most titles in league history.',
		content: `The 2024 NBA Finals saw the Boston Celtics capture their 18th championship, breaking their tie with the Los Angeles Lakers for the most titles in NBA history. The Celtics defeated the Dallas Mavericks 4-1 in a series that showcased Boston's depth, three-point shooting excellence, and championship experience.

**Series Overview**

Boston entered the Finals as heavy favorites, having compiled the league's best record at 64-18 during the regular season. The Celtics' combination of star power in Jayson Tatum and Jaylen Brown, supporting cast depth, and excellent coaching created a championship-caliber team that peaked at the right moment.

Dallas, led by superstar Luka Dončić and veteran Kyrie Irving, exceeded expectations by reaching their first Finals since 2011. The Mavericks' playoff run included impressive victories over higher-seeded opponents, demonstrating resilience and clutch performance that made them dangerous despite their underdog status.

**Game-by-Game Analysis**

Game 1 set the tone for the series as Boston exploded for a Finals-record 29 made three-pointers in a dominant 120-95 victory. The Celtics' ball movement and spacing created numerous open looks, with six different players making multiple three-pointers. This performance demonstrated Boston's offensive versatility and depth.

Games 2 and 3 continued Boston's control, with the Celtics winning both contests by double digits. Their defensive pressure disrupted Dallas's offensive rhythm while their balanced scoring prevented the Mavericks from focusing defensive attention on any single player. The Celtics led by as many as 25 points in Game 3.

Game 4 provided Dallas's finest moment as Luka Dončić delivered a masterful triple-double performance (32 points, 11 rebounds, 11 assists) to avoid elimination. His clutch shooting and playmaking helped the Mavericks force overtime before securing a 122-116 victory that sent the series back to Boston.

Game 5 proved anticlimactic as Boston jumped to an early lead and never relinquished control. Jayson Tatum scored 31 points while Jaylen Brown added 21 to clinch the championship on their home court. The Celtics' 106-88 victory capped a dominant postseason run.

**Individual Performances**

Jaylen Brown earned Finals MVP honors for his consistent two-way excellence throughout the series. His ability to score efficiently while defending multiple positions provided exactly what Boston needed. Brown's maturation as a playoff performer culminated in his first Finals MVP award.

Jayson Tatum, despite shooting struggles at times, contributed across all statistical categories and made crucial plays when needed. His leadership and willingness to involve teammates demonstrated growth as both a player and floor general. Tatum's championship validates his status among the NBA's elite players.

Luka Dončić played brilliantly despite the series loss, averaging nearly 30 points per game while dealing with various injuries. His competitive fire and clutch gene were on full display, establishing him as one of the league's premier postseason performers despite this disappointing outcome.

**Coaching and Strategy**

Joe Mazzulla's coaching throughout the playoffs earned widespread praise for his tactical adjustments and player management. His emphasis on three-point shooting and defensive versatility maximized Boston's personnel advantages while maintaining team chemistry under pressure.

Dallas coach Jason Kidd deserves credit for maximizing his roster's potential and reaching the Finals despite limited star power beyond Dončić and Irving. His playoff adjustments and motivational leadership helped the Mavericks exceed expectations throughout their surprising postseason run.

**Historical Significance**

This championship represents Boston's first title since 2008 and breaks their tie with the Lakers for most NBA championships. The victory validates the franchise's patient rebuilding approach centered around Tatum and Brown, proving that homegrown star development can still lead to championships.

For Dallas, this Finals appearance establishes them as legitimate contenders while providing valuable experience for their young core. Dončić's playoff excellence suggests future championship opportunities if the organization continues building around his exceptional talents.

**Legacy Impact**

The 2024 championship elevates both Tatum and Brown into elite company while establishing them as one of the league's premier duos. Their complementary skills and playoff success position Boston for continued championship contention throughout their prime years.

This Finals also demonstrated the continuing importance of depth and three-point shooting in modern NBA success. Boston's ability to receive contributions from multiple players while maintaining defensive intensity provides a blueprint for championship construction in today's league.

The Celtics' 18th championship adds another chapter to the NBA's most successful franchise while establishing this iteration of the team as worthy successors to the organization's championship tradition.`
	},
	'wimbledon-2024': {
		slug: 'wimbledon-2024',
		title: 'Wimbledon 2024 Results',
		description: 'Complete results from Wimbledon 2024, featuring Carlos Alcaraz and Barbora Krejčíková capturing singles titles at the All England Club.',
		event: 'Wimbledon Championships 2024',
		year: '2024',
		date: 'July 1-14, 2024',
		location: 'All England Lawn Tennis and Croquet Club, London',
		winner: {
			name: 'Carlos Alcaraz (Men), Barbora Krejčíková (Women)',
			country: 'Spain, Czech Republic'
		},
		runnerUp: {
			name: 'Novak Djokovic (Men), Jasmine Paolini (Women)',
			country: 'Serbia, Italy'
		},
		score: 'Men: Alcaraz d. Djokovic 6-2, 6-2, 7-6(4) | Women: Krejčíková d. Paolini 6-2, 2-6, 6-4',
		format: 'Best-of-five sets (Men), Best-of-three sets (Women)',
		attendance: 530000,
		prize: '£2,700,000 (Men\'s/Women\'s singles winners)',
		keyMoments: [
			{ time: 'Men\'s Final Set 1', description: 'Alcaraz dominates early, breaking Djokovic twice' },
			{ time: 'Women\'s Final Set 3', description: 'Krejčíková breaks serve at 4-4 to serve for championship' },
			{ time: 'Men\'s Final Tiebreak', description: 'Alcaraz wins tiebreak 7-4 to clinch second Wimbledon title' }
		],
		participants: [
			{ name: 'Carlos Alcaraz', role: 'Men\'s Champion', stats: '3rd seed, age 21' },
			{ name: 'Novak Djokovic', role: 'Men\'s Finalist', stats: '2nd seed, age 37' },
			{ name: 'Barbora Krejčíková', role: 'Women\'s Champion', stats: '31st seed, age 28' },
			{ name: 'Jasmine Paolini', role: 'Women\'s Finalist', stats: '7th seed, age 28' }
		],
		significance: 'Alcaraz successfully defended his Wimbledon title, while Krejčíková won her second Grand Slam singles title.',
		content: `Wimbledon 2024 delivered compelling championship matches as Carlos Alcaraz successfully defended his men\'s singles title with a straight-sets victory over Novak Djokovic, while Barbora Krejčíková captured her second Grand Slam singles title by defeating Jasmine Paolini in an entertaining three-set women\'s final.

**Men\'s Singles Final: Alcaraz vs. Djokovic**

Carlos Alcaraz entered the final as defending champion but faced the ultimate test against seven-time Wimbledon champion Novak Djokovic. The 21-year-old Spaniard rose to the occasion with one of his most mature and complete performances, dismantling Djokovic 6-2, 6-2, 7-6(4) to claim his second consecutive Wimbledon title.

The first set established Alcaraz\'s dominance as he broke Djokovic\'s serve twice while holding his own service games comfortably. His aggressive returning and precise groundstrokes from both wings put immediate pressure on the Serbian legend. Alcaraz\'s ability to dictate points from defensive positions showcased the tactical maturity that has elevated his grass-court game.

Set two continued in similar fashion, with Alcaraz maintaining his high level while Djokovic struggled to find solutions. The young Spaniard\'s combination of power and placement consistently pushed Djokovic out of position, creating openings for winners. His net play also improved significantly from previous grass-court campaigns.

The third set provided the match\'s most compelling tennis as Djokovic elevated his level and forced a tiebreak. However, Alcaraz\'s composure in the crucial moments proved decisive, with the Spaniard winning the tiebreak 7-4 to secure his fourth Grand Slam title. His celebration on Centre Court reflected both relief and satisfaction at defending his crown.

**Women\'s Singles Final: Krejčíková vs. Paolini**

Barbora Krejčíková\'s path to the women\'s final represented one of Wimbledon\'s most surprising runs, with the 31st-seeded Czech player defeating higher-ranked opponents throughout the fortnight. Her opponent, seventh-seeded Jasmine Paolini, had enjoyed a breakthrough season including a French Open final appearance.

The first set belonged entirely to Krejčíková, who used her variety and court craft to unsettle Paolini\'s rhythm. The Czech player\'s ability to change pace and spin kept the Italian off balance, while her return position and angles created numerous break point opportunities. Krejčíková\'s 6-2 first set suggested a potential rout.

Paolini responded brilliantly in the second set, raising her aggression level and finding her range on both forehand and backhand sides. Her improved first-serve percentage and willingness to approach the net created momentum that carried her to a 6-2 set victory. The Italian\'s fighting spirit demonstrated why she had reached multiple Grand Slam finals.

The decisive third set featured high-quality tennis from both players, with service breaks traded early before settling into a pattern of holds. The crucial break came at 4-4 when Krejčíková\'s experience and tactical intelligence created break point opportunities that she converted. Serving for the championship, the Czech player held her nerve to secure her second Grand Slam singles title.

**Tournament Highlights and Storylines**

Wimbledon 2024 featured several compelling storylines beyond the championship matches. Alcaraz\'s successful title defense at age 21 established him as the tournament\'s new generation leader, while his straight-sets victory over Djokovic suggested a changing of the guard at the All England Club.

Krejčíková\'s victory represented the tournament\'s most surprising outcome, with the former doubles world No. 1 proving that her 2021 French Open singles title was no fluke. Her grass-court adaptations and mental toughness throughout the fortnight impressed observers who had written off her singles ambitions.

**Playing Conditions and Court Performance**

The 2024 Championships featured excellent weather conditions that allowed for consistent play throughout the fortnight. The grass courts played true to form, rewarding aggressive play while maintaining the surface\'s traditional characteristics that favor serve-and-volley tactics and quick points.

Centre Court and No. 1 Court\'s retractable roofs proved crucial during brief rain interruptions, ensuring that play continued without significant delays. The improved drainage systems and court maintenance contributed to high-quality tennis throughout the tournament\'s two weeks.

**Historical Context and Records**

Alcaraz\'s successful title defense made him the youngest men\'s repeat Wimbledon champion since Rafael Nadal, while his dominance over Djokovic suggested potential for multiple future titles. The Spaniard\'s grass-court evolution from clay-court specialist to all-surface threat demonstrates modern tennis\'s tactical sophistication.

Krejčíková\'s victory added to Czech tennis\'s proud Wimbledon tradition, following in the footsteps of Martina Navratilova, Jana Novotná, and Petra Kvitová. Her doubles expertise translated effectively to singles success on grass courts that reward net skills and tactical variety.

**Legacy and Future Implications**

These results position both champions for continued Grand Slam success while reshaping their respective competitive landscapes. Alcaraz\'s growing grass-court mastery suggests he could challenge for multiple future Wimbledon titles, while Krejčíková\'s breakthrough indicates that experience and tactical intelligence remain valuable weapons in women\'s tennis.

Wimbledon 2024 will be remembered for excellent championship matches that honored the tournament\'s traditions while showcasing tennis\'s exciting future direction.`
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	
	const result = results[slug];
	
	if (!result) {
		throw error(404, 'Result not found');
	}
	
	return {
		result
	};
};