import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface SportData {
	slug: string;
	name: string;
	description: string;
	overview: string;
	history: string;
	leagues: Array<{
		name: string;
		description: string;
		country?: string;
	}>;
	scoring: string;
	equipment: string[];
	famousMoments: Array<{
		title: string;
		year: string;
		description: string;
	}>;
	currentState: string;
	relatedAthletes: string[];
	relatedTournaments: string[];
	content: string;
}

const sports: Record<string, SportData> = {
	'nfl': {
		slug: 'nfl',
		name: 'American Football (NFL)',
		description: 'America\'s most popular professional sport, featuring 32 teams competing for the Super Bowl championship.',
		overview: 'The National Football League represents the pinnacle of American football, combining athletic strategy with explosive physical play.',
		history: 'Founded in 1920, the NFL has evolved from a small collection of Midwestern teams into America\'s most valuable sports league.',
		leagues: [
			{ name: 'National Football League (NFL)', description: 'Premier professional league in North America', country: 'United States' },
			{ name: 'Canadian Football League (CFL)', description: 'Professional league featuring unique rules and field dimensions', country: 'Canada' },
			{ name: 'NCAA Football', description: 'College-level competition across multiple divisions', country: 'United States' }
		],
		scoring: 'Touchdown (6 points), Extra Point (1 point), Two-Point Conversion (2 points), Field Goal (3 points), Safety (2 points)',
		equipment: ['Helmet with face mask', 'Shoulder pads', 'Jersey and pants', 'Cleats', 'Protective gear'],
		famousMoments: [
			{ title: 'Super Bowl III Guarantee', year: '1969', description: 'Joe Namath guaranteed victory for the New York Jets, delivering one of sports\' greatest upsets' },
			{ title: 'The Catch', year: '1982', description: 'Dwight Clark\'s touchdown reception launched the San Francisco 49ers dynasty' },
			{ title: '28-3 Comeback', year: '2017', description: 'New England Patriots overcame largest Super Bowl deficit to defeat Atlanta Falcons in overtime' }
		],
		currentState: 'The NFL continues expanding globally while addressing player safety through rule changes and technology improvements.',
		relatedAthletes: ['Tom Brady', 'Peyton Manning', 'Jerry Rice'],
		relatedTournaments: ['Super Bowl', 'NFL Playoffs', 'Pro Bowl'],
		content: `American football stands as the United States' most popular spectator sport, combining strategic complexity with explosive athleticism. The National Football League (NFL) serves as the sport's premier professional competition, featuring 32 franchises across American and international markets.

**Historical Development**

Professional football emerged in the late 19th century from college rugby variations. The NFL was established in 1920 in Canton, Ohio, initially featuring teams from small Midwestern cities. The league's growth paralleled America's urbanization, with franchises relocating to major metropolitan areas throughout the mid-20th century.

The merger with the American Football League (AFL) in 1970 created the modern NFL structure, establishing the Super Bowl as America's premier sporting event. This championship game has evolved beyond sports into a cultural phenomenon that shapes American television, advertising, and social traditions.

**League Structure and Competition**

The NFL operates through a sophisticated structure designed to maintain competitive balance. The 32 teams are divided into two conferences (AFC and NFC), each containing four divisions. Regular season play spans 17 games over 18 weeks, followed by playoffs culminating in the Super Bowl.

The league's salary cap system and draft process promote parity, ensuring that success depends on coaching, player development, and strategic decision-making rather than pure financial resources. This structure has created one of professional sports' most competitive environments.

**Strategic Complexity**

Football's appeal stems largely from its strategic depth. Each play involves 11 players per side executing coordinated assignments within specific formations. Offensive and defensive coordinators develop game plans targeting opponent weaknesses while concealing their own strategic intentions.

The interplay between running and passing attacks, combined with specialized personnel groups, creates near-infinite tactical possibilities. This complexity appeals to fans who appreciate strategic nuance while maintaining excitement for casual viewers through explosive scoring plays.

**Physical Demands and Athletic Requirements**

NFL players represent diverse athletic profiles, from 180-pound receivers to 350-pound linemen. The sport demands combinations of speed, strength, agility, and mental processing rarely found in other competitions. Position-specific training has evolved into sophisticated science targeting exact physical requirements.

Player safety has become increasingly important, with rule changes emphasizing protection of defenseless players and medical protocols addressing concussion concerns. These modifications have altered playing styles while maintaining the sport's fundamental appeal.

**Cultural Impact and Media Presence**

Football's influence extends far beyond athletic competition. NFL games consistently rank among television's most-watched programs, driving significant advertising revenue and media innovation. Fantasy football has created additional engagement, with millions participating in leagues that enhance viewing investment.

The sport's cultural significance includes team loyalty that spans generations, with fan identity often tied to geographic location and family tradition. NFL franchises serve as civic symbols, with new stadium construction representing major municipal investments.

**International Growth and Future Directions**

While remaining distinctly American, football is expanding internationally through NFL games in London, Mexico City, and Germany. These efforts aim to develop global fan bases and potential international franchise opportunities.

Youth participation faces challenges due to safety concerns, leading to rule modifications at lower levels and increased emphasis on skill development over physical contact. The sport continues adapting while preserving the elements that created its massive popularity.

**Economic Impact**

The NFL generates billions in annual revenue through television contracts, sponsorships, and merchandise sales. This economic engine supports thousands of jobs beyond players and coaches, including stadium workers, media personnel, and related service industries.

Team valuations have increased dramatically, with several franchises worth multiple billions of dollars. This financial success reflects the sport's unique position in American entertainment and its ability to attract diverse audience demographics.

American football represents a uniquely American sporting creation that combines strategic sophistication with athletic spectacle, creating entertainment that resonates across cultural and demographic boundaries while continuing to evolve with societal changes.`
	},
	'nba': {
		slug: 'nba',
		name: 'Basketball (NBA)',
		description: 'The world\'s premier basketball league featuring the best players competing at the highest level.',
		overview: 'The National Basketball Association showcases basketball\'s highest skill level through 82-game seasons and championship playoffs.',
		history: 'Basketball was invented in 1891 by Dr. James Naismith, with the NBA forming in 1946 through the merger of competing leagues.',
		leagues: [
			{ name: 'National Basketball Association (NBA)', description: 'Premier professional league globally', country: 'United States/Canada' },
			{ name: 'EuroLeague', description: 'Top European professional competition', country: 'Europe' },
			{ name: 'NCAA Basketball', description: 'College basketball across three divisions', country: 'United States' }
		],
		scoring: 'Field Goal (2 or 3 points), Free Throw (1 point), with games to predetermined point totals',
		equipment: ['Basketball', 'Jersey and shorts', 'Basketball shoes', 'Protective gear (optional)'],
		famousMoments: [
			{ title: 'Magic vs. Bird Era', year: '1980s', description: 'Rivalry between Magic Johnson and Larry Bird elevated NBA popularity and television ratings' },
			{ title: 'Michael Jordan\'s Flu Game', year: '1997', description: 'Jordan scored 38 points while battling illness in crucial NBA Finals game' },
			{ title: 'LeBron\'s Block', year: '2016', description: 'LeBron James\' chase-down block helped Cleveland overcome 3-1 deficit for first championship' }
		],
		currentState: 'The NBA continues globalizing with international players comprising significant roster percentages and games played worldwide.',
		relatedAthletes: ['Michael Jordan', 'LeBron James', 'Kobe Bryant'],
		relatedTournaments: ['NBA Finals', 'March Madness', 'FIBA World Cup'],
		content: `Basketball represents one of the world's most popular sports, combining athletic artistry with strategic competition. The National Basketball Association (NBA) stands as the sport's premier professional league, featuring the world's best players in a format that emphasizes individual skill within team concepts.

**Origins and Evolution**

Dr. James Naismith invented basketball in 1891 at the International YMCA Training School in Springfield, Massachusetts, creating a winter activity for his physical education students. The original game featured peach baskets mounted on elevated tracks, with significantly different rules from modern basketball.

Professional leagues emerged in the early 1900s, with the Basketball Association of America (BAA) forming in 1946. The merger with the National Basketball League (NBL) in 1949 created the NBA, which gradually established itself as the sport's premier professional competition through television exposure and star player marketing.

**Global Reach and International Development**

Basketball's international appeal stems from its accessibility and minimal equipment requirements. The sport is played in virtually every country, with professional leagues throughout Europe, Asia, and South America. The NBA's international influence has grown dramatically, with players from over 40 countries representing significant roster percentages.

FIBA (International Basketball Federation) governs global basketball development, organizing World Cups and Olympic competitions that showcase the sport's international talent depth. These competitions have elevated basketball's profile worldwide and created pathways for international players to reach the NBA.

**Playing Style and Strategic Evolution**

Modern basketball emphasizes pace, space, and three-point shooting, dramatically different from the physical, interior-focused play of previous eras. Analytics have revolutionized strategy, with teams prioritizing efficient shot selection and versatile player skills that allow multiple position capabilities.

The NBA's rule changes have encouraged offensive play, including defensive three-second violations and freedom of movement emphasis. These modifications have created higher-scoring, more aesthetically pleasing games that appeal to broader audiences while showcasing player athleticism.

**Star Culture and Individual Expression**

Basketball's structure allows individual personalities to shine while maintaining team requirements. Superstars like Michael Jordan, Magic Johnson, and LeBron James have transcended sports to become global cultural figures. This star system drives fan engagement and commercial success while creating aspirational figures for young players.

The NBA actively promotes player personality expression through social media, fashion, and community involvement. This approach has created deeper fan connections and expanded the league's cultural influence beyond traditional sports boundaries.

**Athletic Requirements and Player Development**

Professional basketball demands exceptional physical attributes combined with refined skills. Players must possess combinations of height, speed, agility, and hand-eye coordination while developing sport-specific techniques including shooting, ball-handling, and defensive positioning.

Modern player development emphasizes versatility, with traditional position roles evolving into fluid responsibilities. Players increasingly develop skills across multiple positions, creating strategic flexibility that defines contemporary basketball success.

**Economic Model and Business Success**

The NBA operates one of sports' most successful business models, generating billions through television contracts, sponsorships, and international expansion. Revenue sharing and salary cap systems maintain competitive balance while allowing franchise growth and player compensation increases.

Team valuations have increased exponentially, with several franchises worth multiple billions. This financial success reflects basketball's broad appeal and the league's marketing sophistication in creating entertainment beyond pure athletic competition.

**Youth Development and Accessibility**

Basketball's popularity among youth stems from its urban accessibility and individual skill development opportunities. Community programs, high school competitions, and AAU circuits provide pathways for talented players while promoting recreational participation.

The sport's relatively low equipment costs and space requirements make it accessible to diverse socioeconomic backgrounds, contributing to its role in community development and social mobility for gifted athletes.

**Technology Integration and Fan Engagement**

The NBA has embraced technological innovation to enhance fan experiences, including virtual reality broadcasts, advanced statistics tracking, and interactive mobile applications. These developments have attracted younger demographics while providing deeper analytical content for sophisticated fans.

Social media integration allows real-time engagement during games, creating community experiences that extend beyond traditional viewing. This technological adoption positions basketball at the forefront of sports entertainment evolution.

Basketball continues evolving as a global sport that combines athletic excellence with cultural influence, creating entertainment that resonates across diverse audiences while maintaining its foundational appeal as an accessible, exciting competition.`
	},
	'soccer': {
		slug: 'soccer',
		name: 'Soccer (Football)',
		description: 'The world\'s most popular sport, played by over 4 billion fans globally with professional leagues on every continent.',
		overview: 'Soccer combines technical skill, tactical intelligence, and physical endurance in a sport accessible to players of all backgrounds.',
		history: 'Modern soccer originated in England in the 1860s, with FIFA establishing global governance and the World Cup creating the sport\'s premier competition.',
		leagues: [
			{ name: 'Premier League', description: 'England\'s top professional division', country: 'England' },
			{ name: 'La Liga', description: 'Spain\'s premier football league', country: 'Spain' },
			{ name: 'Bundesliga', description: 'Germany\'s top professional league', country: 'Germany' },
			{ name: 'Serie A', description: 'Italy\'s premier football division', country: 'Italy' },
			{ name: 'Major League Soccer (MLS)', description: 'Top professional league in North America', country: 'United States/Canada' }
		],
		scoring: 'Goal (1 point), with match winners determined by most goals scored',
		equipment: ['Soccer ball', 'Jersey and shorts', 'Shin guards', 'Soccer cleats', 'Goalkeeper gloves (goalkeepers only)'],
		famousMoments: [
			{ title: 'Maradona\'s Hand of God', year: '1986', description: 'Diego Maradona\'s controversial goal against England became World Cup legend' },
			{ title: 'Brazil\'s 1970 World Cup', year: '1970', description: 'Pelé led Brazil to perfect World Cup victory, scoring in the final' },
			{ title: 'Leicester City\'s Premier League', year: '2016', description: '5000-1 odds overcome as Leicester City won their first Premier League title' }
		],
		currentState: 'Soccer continues growing globally with expanding leagues, increased investment, and growing popularity in traditionally non-soccer markets.',
		relatedAthletes: ['Pelé', 'Lionel Messi', 'Cristiano Ronaldo'],
		relatedTournaments: ['FIFA World Cup', 'UEFA Champions League', 'Copa América'],
		content: `Soccer, known as football outside North America, stands as the world's most popular sport with an estimated 4 billion fans across every continent. The sport's universal appeal stems from its simplicity, accessibility, and the beautiful game's capacity to unite diverse cultures through shared passion.

**Historical Foundation and Global Spread**

Modern soccer emerged from various folk games played in medieval England, with the Football Association establishing standardized rules in 1863. These "Laws of the Game" created the foundation for soccer's global development, as British influence spread the sport throughout the empire and beyond.

FIFA's formation in 1904 provided international governance, leading to the first World Cup in 1930. This tournament established soccer's premier global competition, creating a four-year cycle that captures worldwide attention and determines national sporting pride.

**Professional League Structure**

Soccer's professional structure varies significantly across regions, with promotion and relegation systems in most countries creating competitive hierarchies. Europe's "Big Five" leagues - Premier League, La Liga, Bundesliga, Serie A, and Ligue 1 - represent the sport's highest levels, attracting global talent and enormous television audiences.

These leagues operate transfer markets where players move between clubs for fees that can exceed $100 million. This system creates global talent circulation, with the best players concentrated in Europe's elite clubs while their national team commitments maintain strong connections to their home countries.

**Tactical Evolution and Playing Styles**

Soccer tactics have evolved dramatically from early direct styles to sophisticated systems emphasizing possession, pressing, and positional play. Modern formations like 4-3-3 and 4-2-3-1 provide frameworks, but fluid movement and positional interchange have made rigid position definitions obsolete.

Different regions have developed distinct playing philosophies - Latin American flair, European tactical discipline, African pace and power - creating stylistic diversity that enriches global competition. These approaches influence each other through player transfers and coaching exchanges.

**The Beautiful Game's Artistry**

Soccer's appeal transcends pure athletic competition through moments of individual brilliance and collective artistry. A perfectly weighted pass, an acrobatic goal, or a goalkeeper's spectacular save can create beauty that resonates beyond sport into cultural expression.

This aesthetic dimension, combined with soccer's democratic nature requiring minimal equipment, has made it accessible to children worldwide. Street soccer, futsal, and informal games develop technical skills while fostering creativity and improvisation that professional soccer celebrates.

**Global Competitions and Tournament Structure**

The World Cup represents soccer's pinnacle, with qualifying processes spanning two years and final tournaments capturing global attention. Continental championships like the European Championship, Copa América, and Africa Cup of Nations provide additional high-level competition while celebrating regional soccer traditions.

Club competitions including the UEFA Champions League, Copa Libertadores, and FIFA Club World Cup create opportunities for the world's best teams to compete across continental boundaries, generating enormous commercial value and fan interest.

**Cultural Impact and Social Significance**

Soccer serves as more than entertainment in many societies, representing national identity, community pride, and social cohesion. World Cup victories can unite entire nations, while club loyalties often span generations and define local identity.

The sport has also become a platform for social change, with players and organizations addressing issues including racism, poverty, and human rights. Soccer's global reach provides unique opportunities for positive social impact through community programs and charitable initiatives.

**Women's Soccer Growth**

Women's soccer has experienced tremendous growth, with increasing investment, media coverage, and professional opportunities. The FIFA Women's World Cup has grown into a major global event, while domestic leagues in the United States, Europe, and other regions continue expanding.

Title IX legislation in the United States and similar initiatives globally have created pathways for women's participation, leading to improved competition standards and greater visibility for women's professional soccer.

**Economic Impact and Business Model**

Soccer generates billions in annual revenue through television rights, sponsorships, merchandise, and ticket sales. Europe's elite clubs operate as global businesses with supporters worldwide, while emerging markets present opportunities for league expansion and fan development.

The sport's economic model continues evolving with Financial Fair Play regulations attempting to control spending while maintaining competitive balance. New revenue streams including digital media and international exhibitions are creating additional growth opportunities.

**Technology Integration and Modern Development**

Video Assistant Referee (VAR) technology has introduced controversial but necessary assistance for match officials, while data analytics increasingly influence tactical decisions and player recruitment. These technological advances aim to improve fairness and strategic sophistication while preserving the game's essential character.

Youth development continues emphasizing technical skills, tactical understanding, and physical conditioning, with academies worldwide creating pathways for talented players to reach professional levels while maintaining academic and personal development.

Soccer's enduring appeal lies in its combination of simplicity and complexity, accessibility and excellence, creating a sport that unites billions while celebrating the diverse cultures that embrace the beautiful game.`
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	
	const sport = sports[slug];
	
	if (!sport) {
		throw error(404, 'Sport not found');
	}
	
	return {
		sport
	};
};