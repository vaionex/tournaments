export interface SportIntro {
  sport: string;
  title: string;
  intro: string;
}

export const sportIntros: Record<string, SportIntro> = {
  nfl: {
    sport: 'nfl',
    title: 'NFL - America\'s Premier Football League',
    intro: `The National Football League (NFL) stands as America's most beloved and watched professional sports league, captivating millions of fans every season with its unparalleled combination of athleticism, strategy, and drama. Established in 1920, the NFL has evolved into a cultural phenomenon that transcends sports, becoming a cornerstone of American entertainment and tradition.

What makes the NFL so compelling is its perfect storm of physical prowess and mental acuity. Each game represents a chess match between coaching staffs, where split-second decisions can determine the outcome of entire seasons. The league's 32 teams, divided equally between the American and National Football Conferences, compete in a 17-game regular season that builds toward the ultimate prize: the Super Bowl, one of the most-watched television events in the United States.

Fans are drawn to the NFL's unique blend of individual heroism and team unity. Star quarterbacks like Josh Allen, Lamar Jackson, and Tua Tagovailoa command the spotlight with their arm strength and leadership, while dynamic players at every position contribute to the spectacle. The league's salary cap system ensures competitive balance, meaning any team can potentially make a championship run with the right combination of talent, coaching, and execution.

The current season has been marked by incredible storylines and emerging rivalries. The Kansas City Chiefs continue their dynasty under Patrick Mahomes, while teams like the Buffalo Bills, Cincinnati Bengals, and San Francisco 49ers challenge for supremacy. The playoff format, featuring 14 teams competing in a single-elimination tournament, guarantees that every postseason game carries enormous stakes and emotional investment.

Beyond the on-field action, the NFL has mastered the art of year-round engagement. The NFL Draft in April creates months of anticipation as fans debate prospects and potential team needs. Training camps and preseason games build excitement for the regular season, while the offseason features free agency moves and trades that reshape competitive landscapes.

The league's commitment to player safety, technological innovation, and global expansion continues to evolve the sport while maintaining its core appeal. From Thursday Night Football to Monday Night Football, the NFL provides consistent entertainment that brings families and communities together, cementing its position as America's favorite pastime.`
  },
  
  nba: {
    sport: 'nba',
    title: 'NBA - Basketball Excellence at the Highest Level',
    intro: `The National Basketball Association (NBA) represents the pinnacle of professional basketball, showcasing the world's most talented athletes in a fast-paced, high-scoring sport that combines individual brilliance with team chemistry. Since its founding in 1946, the NBA has grown into a global entertainment powerhouse that transcends cultural and geographical boundaries.

Basketball's appeal lies in its accessibility and constant action. Unlike other major sports, basketball provides continuous excitement with no downtime between plays, creating an electric atmosphere that keeps fans engaged from tip-off to final buzzer. The NBA's 30 teams compete in an 82-game regular season that tests endurance, skill, and mental toughness, culminating in the intensity of the NBA Playoffs where legends are made and championships are earned.

Current superstars like Nikola Jokić, Luka Dončić, Jayson Tatum, and Giannis Antetokounmpo have elevated the game to new heights with their versatility and basketball IQ. The modern NBA emphasizes three-point shooting, pace, and positionless basketball, creating dynamic offensive displays that regularly produce high-scoring games and highlight-reel plays that dominate social media.

The league's competitive landscape remains incredibly balanced, with multiple teams capable of championship runs. The Boston Celtics, Denver Nuggets, Phoenix Suns, and Milwaukee Bucks represent the elite tier, while emerging teams like the Sacramento Kings and Cleveland Cavaliers showcase the league's depth and parity. The play-in tournament has added extra excitement to the playoff race, giving more teams meaningful games late in the season.

Fans are captivated by the NBA's storytelling elements. Rivalries between players and cities create compelling narratives that extend beyond individual games. The league's embrace of social media and digital content allows unprecedented access to players' personalities, training regimens, and behind-the-scenes moments that humanize these elite athletes.

The NBA's global reach continues to expand, with international players comprising nearly 25% of rosters and games played worldwide. This international influence has enriched the league's style of play while building passionate fanbases in Europe, Asia, and Africa. The association between basketball and youth culture, fashion, and entertainment makes the NBA uniquely influential in shaping broader cultural trends.

From regular season battles to the intensity of playoff basketball, the NBA provides year-round entertainment that celebrates athletic excellence, competitive spirit, and the pursuit of championship glory that defines professional sports at its finest.`
  },

  mlb: {
    sport: 'mlb',
    title: 'MLB - America\'s Pastime and Baseball Tradition',
    intro: `Major League Baseball (MLB) holds the distinguished title of America's pastime, representing over 150 years of professional baseball history and tradition. As the oldest major professional sports league in the United States, MLB has woven itself into the fabric of American culture, creating generations of fans who pass their love for the game from parents to children.

Baseball's unique appeal stems from its perfect balance of individual achievement and team success. Unlike other sports bound by time clocks, baseball unfolds at its own rhythm, allowing for dramatic late-game comebacks and tension that builds with each pitch. The 162-game regular season tests every aspect of a team's depth and character, while the postseason's single-elimination format creates October magic that has produced some of sports' most memorable moments.

The current MLB landscape features unprecedented talent and competitive balance. Superstars like Shohei Ohtani, Ronald Acuña Jr., Mookie Betts, and Aaron Judge showcase different aspects of baseball excellence, from two-way brilliance to power hitting and defensive mastery. The sport's statistical richness allows fans to appreciate subtle nuances that create deeper engagement and understanding.

Modern baseball has evolved significantly while maintaining its core traditions. Advanced analytics have revolutionized strategy, from defensive positioning to pitching usage, while maintaining the game's fundamental appeal. The introduction of the pitch clock and other pace-of-play initiatives has modernized the viewing experience without sacrificing baseball's thoughtful, strategic nature.

Fans are drawn to baseball's accessibility and intimate ballpark atmosphere. Unlike other major sports, baseball stadiums offer unique personalities and features that enhance the experience. From Fenway Park's Green Monster to Yankee Stadium's short right field, each venue tells its own story while contributing to the game's rich narrative tradition.

The playoff format, featuring Wild Card games, Division Series, League Championship Series, and the World Series, creates a month-long celebration of baseball excellence. October baseball carries special significance as teams battle for the right to call themselves world champions, with series that often extend to dramatic seventh games that etch themselves into sports history.

MLB's international growth continues expanding the game's reach, with players from Japan, the Dominican Republic, Venezuela, and other nations bringing diverse playing styles and passionate fanbases. This global influence enriches the sport while maintaining baseball's quintessentially American character.

From spring training's renewal and hope to the intensity of pennant races, MLB provides a seasonal rhythm that connects deeply with American life, offering comfort, excitement, and endless possibilities that define the beautiful game of baseball.`
  },

  nhl: {
    sport: 'nhl',
    title: 'NHL - Hockey\'s Speed, Skill, and Intensity',
    intro: `The National Hockey League (NHL) delivers the fastest, most physically demanding team sport in professional athletics, combining blazing speed, incredible skill, and relentless intensity that creates an unmatched viewing experience. Since its founding in 1917, the NHL has grown from its Canadian roots into a league that showcases the world's best hockey talent across North America and beyond.

Hockey's appeal lies in its non-stop action and unpredictable nature. Played at speeds exceeding 20 miles per hour on skates, NHL games feature continuous action with line changes happening on the fly, creating a dynamic flow that keeps fans on the edge of their seats. The sport's physical nature, combined with remarkable skill and precision, produces a unique entertainment experience where momentum can shift instantly.

Current NHL superstars like Connor McDavid, Nathan MacKinnon, Erik Karlsson, and David Pastrnak represent the pinnacle of hockey excellence, combining breakaway speed with extraordinary puck-handling skills that regularly produce highlight-reel goals. The modern NHL emphasizes skill and speed over pure physicality, though the sport maintains its gritty, competitive edge that fans cherish.

The league's 32 teams compete in an 82-game regular season that tests durability and depth, as hockey's physical demands require teams to manage player health throughout the grueling schedule. The Stanley Cup Playoffs represent the sport's crowning achievement, featuring a brutal four-round tournament where teams must win 16 games to claim hockey's ultimate prize.

Fans are captivated by hockey's playoff intensity, where players compete through injuries and exhaustion for the chance to hoist the Stanley Cup, the oldest trophy in North American professional sports. The playoff format's best-of-seven series create compelling storylines and dramatic moments that showcase hockey's warrior mentality and team-first culture.

The NHL's competitive balance ensures that multiple teams enter each season with legitimate championship aspirations. Recent Stanley Cup winners like the Colorado Avalanche, Tampa Bay Lightning, and Vegas Golden Knights demonstrate how different roster construction approaches can lead to success, whether through high-scoring offense, defensive excellence, or goaltending prowess.

Hockey's international character adds global appeal, with players from Sweden, Finland, Russia, Czech Republic, and other nations bringing diverse playing styles that enrich the sport. This international influence creates compelling storylines during Olympic years and World Championship tournaments that showcase national pride and hockey excellence.

The NHL's embrace of technology and fan engagement continues evolving the viewing experience while preserving hockey's essential character. From enhanced statistical analysis to innovative camera angles that capture the sport's speed and skill, the league provides multiple ways for fans to appreciate hockey's complexity and beauty.

Whether it's the thunderous sound of a slap shot, the artistry of a perfectly executed passing play, or the drama of playoff overtime, the NHL offers an entertainment experience that celebrates athletic excellence, teamwork, and the relentless pursuit of the Stanley Cup.`
  },

  soccer: {
    sport: 'soccer',
    title: 'Soccer - The World\'s Most Beautiful Game',
    intro: `Soccer, known as football to most of the world, stands as the planet's most popular and widely played sport, captivating billions of fans with its elegant simplicity, tactical complexity, and emotional intensity. From grassroots youth leagues to elite professional competitions, soccer's universal appeal transcends cultural, economic, and geographical boundaries like no other sport.

The beautiful game's magic lies in its accessibility and infinite possibilities. With nothing more than a ball and open space, soccer can be played anywhere, creating a democratic sport that belongs to everyone. Yet at its highest levels, soccer becomes a sophisticated tactical ballet where world-class athletes demonstrate skill, creativity, and intelligence that borders on artistry.

Major League Soccer (MLS) has transformed American soccer into a rapidly growing force, attracting international superstars like Lorenzo Insigne, Giorgio Chiellini, and Carlos Vela while developing homegrown talents like Tyler Adams, Weston McKennie, and Christian Pulisic. The league's 29 teams compete in a unique format that combines regular season play with playoff drama, creating compelling storylines that engage casual and hardcore fans alike.

European soccer remains the sport's pinnacle, with leagues like the Premier League, La Liga, Serie A, and Bundesliga showcasing the world's best talent. Superstars like Erling Haaland, Kylian Mbappé, and Lionel Messi continue pushing the boundaries of what's possible on the soccer pitch, while tactical innovations from managers like Pep Guardiola and Jürgen Klopp influence how the game is played globally.

International competitions add another layer of excitement, with the FIFA World Cup representing sport's most watched event. The recent World Cup in Qatar demonstrated soccer's global reach and emotional power, as fans from every continent united in celebrating their national teams' achievements and heartbreaks.

Fans are drawn to soccer's continuous action and low-scoring drama, where single moments of brilliance can determine outcomes. The sport's 90-minute format, with minimal stoppages, creates sustained tension that builds toward climactic conclusions. Goals are precious commodities that explode stadiums into euphoric celebrations, creating memories that last lifetimes.

Soccer culture extends far beyond match days, encompassing passionate supporter groups, transfer speculation, and tactical debates that fuel year-round engagement. The sport's connection to community identity, whether supporting local clubs or national teams, creates emotional bonds that span generations and define cultural identity for millions of people.

The Champions League, UEFA's premier club competition, represents soccer's most prestigious tournament, featuring Europe's elite clubs competing for continental supremacy. These midweek matches provide additional drama and showcase the sport's highest quality, creating must-see television for soccer enthusiasts worldwide.

From youth academies developing future stars to veteran players extending illustrious careers, soccer's pathway system creates compelling narratives of development, achievement, and legacy that resonate with fans who see reflections of their own journeys in their favorite players' stories.`
  },

  tennis: {
    sport: 'tennis',
    title: 'Tennis - Individual Excellence and Grand Slam Glory',
    intro: `Tennis stands as the premier individual sport, showcasing athletic excellence, mental fortitude, and competitive spirit in its purest form. From the grass courts of Wimbledon to the clay of Roland Garros, tennis provides year-round entertainment through its diverse playing surfaces, prestigious tournaments, and compelling rivalries that capture global audiences.

The sport's appeal lies in its combination of physical demands and psychological warfare. Tennis players compete alone against their opponents, with no teammates to rely on during crucial moments. This isolation creates intense pressure that reveals character and produces dramatic moments where champions are separated from contenders through sheer will and determination.

Current tennis features an incredible depth of talent across both men's and women's tours. Players like Novak Djokovic, Carlos Alcaraz, and Jannik Sinner represent different generations and playing styles, while stars like Iga Świątek, Aryna Sabalenka, and Coco Gauff continue elevating women's tennis to new heights. The sport's global nature ensures year-round competition across multiple continents and playing conditions.

Grand Slam tournaments represent tennis's crown jewels, with the Australian Open, French Open, Wimbledon, and US Open each offering unique challenges and traditions. These two-week events test players' physical conditioning, tactical adaptability, and mental strength across seven matches, creating compelling storylines as unknown qualifiers face established champions in early rounds that can produce stunning upsets.

Tennis fans appreciate the sport's accessibility and intimate viewing experience. Unlike team sports, tennis allows fans to closely follow individual players' journeys, creating personal connections that span entire careers. The sport's ranking system provides clear hierarchies and meaningful stakes for every tournament, as players compete for prize money, ranking points, and prestige.

The ATP and WTA tours create a global circuit that showcases tennis in diverse settings, from indoor hard courts to outdoor clay surfaces that require different skills and strategies. This variety ensures that different player types can succeed, whether they're powerful baseliners, serve-and-volley specialists, or defensive counterpunchers who excel at different times of year.

Professional tennis's scoring system adds unique drama, as matches can swing dramatically based on crucial points and momentum shifts. The sport's tradition of no coaching during matches preserves individual achievement and creates pressure situations that reveal true champions' ability to problem-solve and adapt under extreme stress.

Tennis's international appeal creates compelling Davis Cup and Fed Cup competitions where national pride intersects with individual excellence. These team events showcase different dynamics as players compete for their countries rather than personal achievements, adding patriotic elements that enhance the sport's emotional resonance.

From breakthrough teenagers announcing their arrival on tennis's biggest stages to veteran champions extending legendary careers, tennis provides compelling narratives of triumph, heartbreak, and redemption that engage fans emotionally while celebrating the pursuit of individual excellence at its highest level.`
  },

  golf: {
    sport: 'golf',
    title: 'Golf - Precision, Strategy, and Championship Excellence',
    intro: `Golf represents the ultimate test of individual skill, mental discipline, and strategic thinking, combining physical precision with psychological resilience across some of the world's most beautiful and challenging landscapes. From the hallowed grounds of Augusta National to the windswept links of Scotland, golf offers a unique sporting experience that celebrates tradition while embracing innovation.

The sport's enduring appeal stems from its accessibility and lifelong challenge. Unlike other professional sports that require specific physical attributes, golf can be enjoyed by players of all ages and skill levels, creating a democratic game where weekend warriors can play the same courses as their professional heroes. This connection between amateur and professional golf creates unique fan engagement and aspirational elements.

Today's professional golf features unprecedented depth and global representation. Stars like Scottie Scheffler, Jon Rahm, and Rory McIlroy compete alongside emerging talents from around the world, while the LIV Golf series has added new dynamics to professional golf's landscape. The PGA Tour, DP World Tour, and various international circuits provide year-round competition that showcases golf's best players across diverse conditions and formats.

Major championships represent golf's ultimate achievements, with the Masters Tournament, PGA Championship, U.S. Open, and The Open Championship each presenting unique challenges and storied traditions. These four events test different aspects of players' games while providing the sport's most prestigious victories that define careers and create lasting legacies.

Golf fans appreciate the sport's strategic complexity and shot-making artistry. Every hole presents multiple options and risk-reward decisions that reveal players' course management skills and mental approach. The sport's scoring system creates compelling leaderboard drama, as players can gain or lose multiple strokes on individual holes, ensuring that tournament outcomes remain uncertain until final putts drop.

The sport's technological evolution continues enhancing both playing and viewing experiences. Advanced equipment has increased distances and accuracy, while statistical analysis and course setup innovations create more engaging competition. Television coverage innovations like shot tracer technology and multiple camera angles allow fans to appreciate golf's precision and difficulty.

Professional golf's international schedule creates diverse playing conditions that test different skills throughout the year. From desert courses in the Middle East to seaside links in Europe and parkland layouts in America, touring professionals must adapt their games to various climates, altitudes, and course designs that reward different strategic approaches.

Golf's connection to business and entertainment creates unique crossover appeal, as corporate partnerships and celebrity involvement enhance the sport's cultural relevance. Professional golf tournaments often feature pro-am events and charity components that connect players with fans and communities while supporting important causes.

The sport's tradition of self-policing and sportsmanship maintains golf's reputation for integrity and respect, creating an environment where players call penalties on themselves and observe strict etiquette standards that enhance the competitive experience for participants and spectators alike.`
  },

  mma: {
    sport: 'mma',
    title: 'MMA/UFC - Mixed Martial Arts Combat Excellence',
    intro: `Mixed Martial Arts (MMA), led by the Ultimate Fighting Championship (UFC), represents combat sports' ultimate evolution, combining techniques from boxing, wrestling, Brazilian Jiu-Jitsu, Muay Thai, and other martial arts disciplines into the most complete fighting system ever developed. Since the UFC's inception in 1993, MMA has grown from niche spectacle to mainstream entertainment that showcases the world's most well-rounded and athletic combat artists.

MMA's appeal lies in its raw authenticity and unlimited possibilities. Unlike traditional combat sports that restrict techniques, MMA allows fighters to utilize their complete skill sets, creating dynamic matchups where grapplers face strikers, wrestlers battle submission specialists, and well-rounded mixed martial artists test their abilities against specialists in various disciplines.

Current MMA features incredible talent across all weight divisions, with champions like Islam Makhachev, Jon Jones, Alex Pereira, and Sean O'Malley representing different fighting styles and backgrounds. The sport's global reach has produced elite fighters from Brazil, Russia, Ireland, Nigeria, and countless other nations, creating compelling international storylines and diverse fighting philosophies.

The UFC's divisional structure creates clear pathways to championship opportunities, with rankings determining title shot deserving fighters. Each weight class from flyweight to heavyweight offers unique stylistic matchups and competitive landscapes, ensuring that casual and hardcore fans can follow multiple storylines simultaneously across different divisions.

Fight fans are drawn to MMA's unpredictable nature and finish potential. Unlike other sports where outcomes unfold gradually, MMA fights can end instantaneously through knockouts, submissions, or technical stoppages, creating tension that maintains excitement from opening bell to final horn. The sport's anything-can-happen nature ensures that underdogs always possess fighting chances against favored opponents.

The UFC's pay-per-view model creates major events that transcend sports entertainment, featuring carefully crafted cards that build toward main event showdowns between elite fighters. These events often generate crossover interest from casual sports fans who appreciate MMA's dramatic storytelling and athletic excellence.

MMA's technical complexity provides multiple layers of appreciation, as fans can analyze striking techniques, grappling exchanges, cardio management, and tactical adjustments that separate elite fighters from contenders. The sport's chess-match elements become more apparent as fans develop deeper understanding of different fighting disciplines and strategic concepts.

International MMA promotions like Bellator, ONE Championship, and various regional organizations provide additional platforms for fighters to develop skills and build followings before potentially reaching the UFC's elite level. This developmental system creates storylines of growth and achievement that resonate with fans who appreciate journeyman fighters' struggles.

The sport's connection to traditional martial arts creates respectful appreciation for combat disciplines' histories and philosophies, while modern training methods and sports science continue evolving fighter preparation and performance standards that push human athletic capabilities to new limits.

From preliminary card prospects establishing their reputations to legendary champions cementing their legacies, MMA provides compelling narratives of courage, determination, and martial arts excellence that celebrate human competitive spirit at its most fundamental level.`
  },

  boxing: {
    sport: 'boxing',
    title: 'Boxing - The Sweet Science and Championship Glory',
    intro: `Boxing, known as "The Sweet Science," represents combat sports' purest and most noble form, where fighters rely solely on their fists, footwork, and fighting intelligence to achieve victory. With a history spanning thousands of years and professional roots dating to the 1800s, boxing maintains its position as combat sports' most prestigious and respected discipline, producing athletic heroes who transcend their sport to become global cultural icons.

The sport's enduring appeal lies in its fundamental simplicity and infinite complexity. While the basic concept—two fighters using only their fists within specific rules—appears straightforward, boxing's tactical depth, technical nuances, and psychological elements create a sophisticated art form that rewards years of study and appreciation.

Current professional boxing features exceptional talent across all weight divisions, with unified and undisputed champions like Oleksandr Usyk, Terence Crawford, and Naoya Inoue representing boxing excellence at its highest level. The sport's multiple sanctioning bodies (WBC, WBA, IBF, WBO) create additional title opportunities and unification bouts that add prestige and meaning to championship achievements.

Boxing's weight class system ensures competitive balance and allows fighters of different physical attributes to achieve championship success. From flyweight to heavyweight, each division offers unique stylistic matchups and compelling storylines, whether it's heavyweight knockout power, middleweight combination punching, or lightweight speed and technical skill.

Fight fans are captivated by boxing's dramatic potential and individual heroism. Every punch carries knockout possibility, creating tension that builds throughout entire fights as boxers probe for weaknesses, establish rhythms, and execute game plans that can change instantly with single shots. The sport's scoring system rewards consistent performance while allowing for dramatic comeback victories that become legendary.

Professional boxing's pay-per-view culture creates major events that capture mainstream attention, featuring carefully matched fighters whose contrasting styles and personalities generate compelling narratives. These mega-fights often transcend sports to become cultural events that attract celebrity attention and international media coverage.

The sport's international character produces fighters from every continent, bringing diverse training methods, cultural backgrounds, and fighting philosophies that enrich boxing's tactical landscape. Champions from Mexico, Puerto Rico, England, Japan, and other boxing hotbeds carry national pride and cultural expectations that add emotional stakes to their championship pursuits.

Boxing's connection to trainer-fighter relationships creates unique mentorship dynamics that produce compelling behind-the-scenes storylines. Legendary trainers like Freddie Roach, Nacho Beristain, and others become integral parts of fighters' success stories, creating partnerships that extend beyond simple preparation to become lifelong bonds built through shared sacrifice and achievement.

The sport's amateur system, including Olympic competition, provides developmental pathways for future professionals while maintaining boxing's connection to its purest competitive roots. Olympic boxing showcases emerging talent and national pride while introducing new fans to boxing's technical beauty and competitive intensity.

From promising prospects building their professional records to legendary champions defending their legacies against hungry challengers, boxing provides endless narratives of ambition, courage, and athletic excellence that celebrate the human spirit's ability to overcome adversity through dedication, skill, and unwavering determination.`
  },

  racing: {
    sport: 'racing',
    title: 'Racing - Speed, Technology, and Motorsport Excellence',
    intro: `Motorsport racing represents the ultimate fusion of human skill, technological innovation, and competitive speed, creating spectacular entertainment that showcases both individual driver excellence and cutting-edge engineering. From Formula 1's global circuits to NASCAR's oval racing and IndyCar's diverse challenges, racing provides year-round excitement across multiple disciplines that test different aspects of driving ability and mechanical performance.

Racing's universal appeal stems from its combination of danger, precision, and technological advancement. Drivers compete at speeds exceeding 200 mph while making split-second decisions that determine race outcomes and sometimes survival itself. This element of risk, combined with incredible skill requirements, creates respect and admiration for drivers who master these powerful machines under extreme conditions.

Formula 1 stands as motorsport's premier category, featuring the world's best drivers competing in the most advanced racing cars ever built. Current stars like Max Verstappen, Lewis Hamilton, and Charles Leclerc showcase different driving styles and personalities while representing teams that spend hundreds of millions of dollars developing aerodynamic and power unit technologies that eventually influence road car development.

NASCAR provides uniquely American racing entertainment, where close-quarters competition at high speeds creates dramatic finishes and compelling rivalries. The sport's playoff format and elimination-style championship chase ensure that multiple drivers remain competitive throughout the season, while superspeedway racing creates pack racing that can produce surprise winners and spectacular crashes.

IndyCar offers the most diverse racing challenge, with drivers competing on oval tracks, street circuits, and permanent road courses that require different skill sets and strategic approaches. The Indianapolis 500 remains American racing's most prestigious event, combining history, tradition, and incredible speed in a single-day spectacle that crowns racing legends.

Racing fans appreciate the sport's technological complexity and strategic elements that extend beyond pure driving skill. Tire strategies, fuel management, aerodynamic setups, and weather conditions create variables that influence race outcomes and reward teams that make superior tactical decisions under pressure.

The sport's international character creates compelling storylines as drivers from different countries and backgrounds compete for racing's most prestigious victories. European Formula 1 drivers face American NASCAR and IndyCar specialists in various racing formats, showcasing how different training methods and racing philosophies translate across motorsport disciplines.

Modern racing's safety innovations have dramatically improved driver protection while maintaining competitive excitement. Advanced safety systems, improved barrier design, and enhanced medical response capabilities allow drivers to compete at extreme speeds with significantly reduced risk, enabling pure focus on racing performance rather than survival concerns.

Racing's connection to automotive technology creates practical benefits that extend beyond entertainment, as motorsport development drives innovations in aerodynamics, materials science, hybrid powertrains, and safety systems that eventually benefit ordinary road cars and transportation efficiency.

From promising rookies earning their first victories to veteran champions extending legendary careers, racing provides compelling narratives of talent development, technological mastery, and competitive excellence that celebrate human achievement at the intersection of skill, courage, and mechanical perfection.`
  },

  olympics: {
    sport: 'olympics',
    title: 'Olympics - Global Athletic Excellence and Unity',
    intro: `The Olympic Games represent the pinnacle of international athletic competition, bringing together the world's greatest athletes every four years to compete for their countries in a celebration of sporting excellence, cultural unity, and human achievement. Since the modern Olympics' revival in 1896, these Games have grown into the world's largest and most prestigious sporting event, transcending politics and cultural differences through shared appreciation of athletic dedication and competitive spirit.

The Olympics' unique appeal lies in their ability to showcase sports and athletes that receive limited attention during non-Olympic years, creating global stars and inspiring moments that resonate far beyond traditional sports audiences. From swimming and track and field to gymnastics and figure skating, Olympic sports display human physical capabilities at their absolute limits across diverse disciplines that test speed, strength, endurance, flexibility, and artistic expression.

Recent Olympic Games have featured legendary performances from athletes like Katie Ledecky, Simone Biles, Usain Bolt, and Michael Phelps, who have redefined what's possible in their respective sports while becoming global ambassadors for Olympic values of excellence, respect, and friendship. These superstar athletes inspire millions worldwide while demonstrating the rewards of lifelong dedication to athletic perfection.

The Olympic format creates compelling narratives of national pride and individual achievement, as athletes compete not only for personal glory but also for their countries' honor and recognition. Medal counts become sources of national celebration, while underdog victories from smaller nations create David-versus-Goliath stories that capture global imagination and demonstrate sport's democratic potential.

Olympic fans appreciate the Games' diversity and accessibility, as virtually every viewer can find sports and athletes that resonate with their interests and backgrounds. The Olympic program's breadth ensures that strength-based sports, endurance events, technical disciplines, and artistic competitions all receive equal billing and celebration during the Games' concentrated timeframe.

The Paralympic Games add another dimension of inspiration and achievement, showcasing athletes who overcome physical challenges to achieve sporting excellence that often surpasses able-bodied performances. Paralympic competition demonstrates human resilience and determination while expanding definitions of athletic achievement and competitive possibility.

Olympic sports' international governance through various federations ensures standardized competition rules and qualification processes that create legitimate pathways for athletes from all nations to achieve Olympic participation. This democratic access principle maintains the Olympics' credibility while providing opportunities for emerging sporting nations to develop competitive programs.

The Olympics' connection to host cities creates lasting legacies through infrastructure development, cultural exchange, and economic impact that extends far beyond the Games themselves. Olympic venues become symbols of national achievement while providing ongoing benefits to local communities through enhanced sporting facilities and international recognition.

From teenage prodigies announcing their arrival on the world's biggest stage to veteran athletes completing storied careers with final medal pursuits, the Olympics provide compelling human stories that celebrate dedication, sacrifice, and the pursuit of excellence that defines elite athletic competition at its most meaningful level.

The Olympic movement's emphasis on fair play, anti-doping efforts, and peaceful competition maintains idealistic principles while addressing modern challenges that threaten sporting integrity and international cooperation through athletic achievement.`
  },

  esports: {
    sport: 'esports',
    title: 'Esports - Competitive Gaming and Digital Athletics',
    intro: `Esports represents the fastest-growing competitive entertainment sector, transforming video gaming from recreational activity into professional sport that attracts millions of viewers and offers substantial prize pools rivaling traditional athletics. From League of Legends' World Championship to Counter-Strike 2 Major tournaments, competitive gaming has established legitimate sporting infrastructure that celebrates strategic thinking, mechanical skill, and team coordination at the highest levels.

The appeal of esports lies in its accessibility and infinite complexity. Unlike traditional sports that require specific physical attributes, competitive gaming allows anyone with dedication and talent to potentially reach professional levels, creating democratic opportunity structures that attract diverse global audiences. This accessibility, combined with the visual spectacle of high-level play, has created passionate fanbases that rival traditional sports in enthusiasm and engagement.

Current esports features multiple game titles with unique competitive ecosystems, from real-time strategy games that test decision-making under pressure to first-person shooters that require precise aim and tactical coordination. Games like League of Legends, Dota 2, Counter-Strike 2, Valorant, and others have developed professional leagues with structured seasons, playoffs, and international championships that provide year-round competitive entertainment.

Professional esports players like Faker, s1mple, TenZ, and others have achieved celebrity status within gaming communities while demonstrating skill levels that require thousands of practice hours to develop. These elite competitors showcase reaction times, strategic thinking, and pressure performance that parallels traditional athletic achievement while representing entirely digital competitive environments.

Esports fans appreciate the strategic depth and constant evolution that characterize competitive gaming. Unlike traditional sports with relatively fixed rules, esports titles receive regular updates that change gameplay mechanics, creating dynamic competitive environments that require constant adaptation and learning. This evolution ensures that esports competition remains fresh and challenging for both players and viewers.

The global nature of esports creates international competition that transcends geographical boundaries, as players from Korea, Europe, North America, and other regions compete in online and offline tournaments that showcase different regional playing styles and strategic approaches. This international competition has produced compelling rivalries and cultural exchanges that enrich the competitive landscape.

Tournament formats ranging from online qualifiers to massive arena events create diverse competitive experiences that accommodate different audience preferences. Major esports events like The International, League of Legends Worlds, and CS2 Majors feature production values and attendance figures that rival traditional sporting championships while maintaining uniquely digital entertainment elements.

The industry's rapid growth has created professional infrastructure including player contracts, coaching staffs, training facilities, and support systems that mirror traditional sports organizations. This professionalization has legitimized esports while providing career pathways for players, coaches, analysts, and content creators who contribute to the ecosystem's continued expansion.

Esports' connection to streaming platforms and social media creates unprecedented fan engagement opportunities, as viewers can interact with players directly, access practice sessions, and participate in communities that extend far beyond tournament broadcasts. This connectivity has created new forms of sports entertainment that blend competition with personality-driven content.

From amateur tournaments that provide entry points for aspiring professionals to international championships that crown world champions, esports offers compelling narratives of improvement, teamwork, and competitive excellence that celebrate mental athletics and digital mastery in an increasingly connected world.`
  },

  cricket: {
    sport: 'cricket',
    title: 'Cricket - Tradition, Strategy, and Global Passion',
    intro: `Cricket stands as the world's second-most popular sport, captivating over 2.5 billion fans across diverse cultures and continents through its unique combination of individual skill, team strategy, and dramatic narrative possibilities that unfold across various formats from Test matches to Twenty20 cricket. With roots dating back centuries, cricket has evolved from English countryside recreation into a global sporting phenomenon that defines cultural identity for nations across Asia, Australia, England, and the Caribbean.

The sport's enduring appeal lies in its intellectual complexity and infinite strategic possibilities. Cricket's fundamental battle between bat and ball creates countless tactical scenarios where captains must balance aggressive scoring with defensive patience, while individual players showcase specialized skills in batting, bowling, and fielding that require years of dedicated practice to master.

Modern cricket features multiple formats that test different aspects of players' abilities and offer varied entertainment experiences. Test cricket, the sport's longest and most prestigious format, unfolds across five days of competition that test mental endurance and tactical evolution. One Day Internationals provide structured entertainment with clear conclusions, while Twenty20 cricket delivers explosive action and high-scoring excitement that attracts new audiences to the sport.

Current cricket showcases exceptional global talent, with players like Virat Kohli, Joe Root, Steve Smith, and Babar Azam representing different batting philosophies and national playing styles. Fast bowlers like Jasprit Bumrah and Pat Cummins demonstrate the sport's physical demands, while spinners like Ravichandran Ashwin showcase cricket's tactical sophistication and mental chess-match elements.

The Indian Premier League (IPL) has revolutionized cricket's commercial and entertainment landscape, combining international stars with emerging talent in a franchise-based format that provides year-round cricket content and creates new revenue streams that benefit players and cricket development worldwide. Other T20 leagues in Australia, England, and the Caribbean have followed this model while maintaining regional characteristics.

Cricket fans appreciate the sport's statistical richness and historical continuity, as individual achievements can be compared across eras while team performances create lasting legacies that span generations. The sport's record-keeping tradition allows fans to contextualize current performances within cricket's long history while celebrating modern achievements.

International cricket's structure creates compelling narratives through bilateral series and multi-nation tournaments like the Cricket World Cup, T20 World Cup, and Champions Trophy. These competitions showcase national pride and regional rivalries while providing platforms for emerging cricket nations to compete against established powers.

The sport's connection to former British colonies has created a Commonwealth sporting tradition that transcends political relationships, with cricket serving as a cultural bridge that maintains connections between diverse nations through shared sporting passion and competitive respect.

Cricket's unique terminology, complex rules, and traditional etiquette create distinctive cultural experiences that separate devoted fans from casual observers, while initiatives to simplify and accelerate the game continue attracting new audiences without sacrificing cricket's essential character and strategic depth.

From village cricket that maintains community traditions to international tournaments that captivate global audiences, cricket provides compelling narratives of perseverance, skill development, and competitive excellence that celebrate both individual achievement and team unity across multiple formats and cultural contexts.`
  },

  rugby: {
    sport: 'rugby',
    title: 'Rugby - Power, Passion, and Global Competition',
    intro: `Rugby represents one of the world's most physically demanding and tactically sophisticated team sports, combining raw power with strategic complexity in a game that celebrates courage, teamwork, and sporting integrity. Born in England but embraced globally, rugby has developed into two distinct formats—Rugby Union and Rugby League—that showcase different aspects of the sport's appeal while maintaining core values of respect, discipline, and competitive excellence.

The sport's unique appeal stems from its continuous action and tactical diversity, as teams advance the ball through running, passing, and kicking while competing for possession in dynamic scrums, lineouts, and breakdowns that require specialized skills and coordinated teamwork. Rugby's physical nature demands exceptional fitness and mental toughness, creating respect for players who compete without protective equipment in situations that require both individual courage and collective sacrifice.

International rugby features compelling competitions that showcase national pride and regional rivalries, from the Six Nations Championship that captivates European audiences to The Rugby Championship featuring southern hemisphere powerhouses. The Rugby World Cup, held every four years, represents the sport's pinnacle achievement and creates global audiences that appreciate rugby's unique combination of power, skill, and sportsmanship.

Current rugby stars like Antoine Dupont, Eben Etzebeth, Ardie Savea, and Marcus Smith represent different positions and playing styles that contribute to rugby's tactical richness. From powerful forwards who dominate set pieces to agile backs who create scoring opportunities through speed and creativity, rugby showcases diverse athletic talents that combine into cohesive team performances.

Professional rugby leagues in Europe, Australia, New Zealand, and South Africa provide year-round entertainment through domestic competitions and international club tournaments that maintain high competitive standards. The Heineken Champions Cup and other cross-border competitions create additional storylines while showcasing different national playing philosophies and development systems.

Rugby fans appreciate the sport's emphasis on respect and fair play, as players typically accept referee decisions without argument while competing intensely within established boundaries. This sporting culture creates an environment where opponents can compete fiercely during matches while maintaining mutual respect and camaraderie afterward.

The sport's amateur traditions and professional development have created pathways for players from diverse backgrounds to achieve international recognition, while rugby's global growth continues expanding into new markets through sevens rugby, youth development programs, and cultural exchange initiatives that spread rugby values worldwide.

Women's rugby has experienced tremendous growth, with international competitions and professional leagues providing platforms for female athletes to showcase rugby skills while inspiring new generations of players. The women's Rugby World Cup and Olympic sevens competition have elevated the profile of women's rugby while demonstrating the sport's universal appeal.

Rugby's connection to education and character development creates strong traditions in schools and universities, where rugby programs emphasize leadership, teamwork, and personal development alongside competitive achievement. These educational foundations continue producing players who embody rugby's core values throughout their careers and communities.

From grassroots clubs that maintain local traditions to international matches that captivate global audiences, rugby provides compelling narratives of physical courage, tactical intelligence, and sporting integrity that celebrate team achievement and individual excellence within a framework of respect and competitive honor.`
  }
};

export function getSportIntro(sport: string): SportIntro | null {
  return sportIntros[sport.toLowerCase()] || null;
}