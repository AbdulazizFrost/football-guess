/**
 * FOOTBALL GUESS — Dataset & Multilingual Localization
 * Supports simultaneous English + Uzbek (Latin)
 */

const PLAYERS_DATA = [
  {
    id: "messi",
    name: "Lionel Messi",
    photo: "assets/players/messi.jpg",
    country: { en: "Argentina", uz: "Argentina" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Inter Miami",
    league: { en: "Major League Soccer (USA)", uz: "MLS (AQSh)" },
    number: 10,
    nationalTeam: { en: "Argentina", uz: "Argentina" },
    previousClub: "Paris Saint-Germain"
  },
  {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    photo: "assets/players/ronaldo.jpg",
    country: { en: "Portugal", uz: "Portugaliya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Al Nassr",
    league: { en: "Saudi Pro League (Saudi Arabia)", uz: "Saudiya Pro-ligasi (Saudiya Arabistoni)" },
    number: 7,
    nationalTeam: { en: "Portugal", uz: "Portugaliya" },
    previousClub: "Manchester United"
  },
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    photo: "assets/players/mbappe.jpg",
    country: { en: "France", uz: "Fransiya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 9,
    nationalTeam: { en: "France", uz: "Fransiya" },
    previousClub: "Paris Saint-Germain"
  },
  {
    id: "haaland",
    name: "Erling Haaland",
    photo: "assets/players/haaland.jpg",
    country: { en: "Norway", uz: "Norvegiya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 9,
    nationalTeam: { en: "Norway", uz: "Norvegiya" },
    previousClub: "Borussia Dortmund"
  },
  {
    id: "bellingham",
    name: "Jude Bellingham",
    photo: "assets/players/bellingham.jpg",
    country: { en: "England", uz: "Angliya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 5,
    nationalTeam: { en: "England", uz: "Angliya" },
    previousClub: "Borussia Dortmund"
  },
  {
    id: "debruyne",
    name: "Kevin De Bruyne",
    photo: "assets/players/debruyne.jpg",
    country: { en: "Belgium", uz: "Belgiya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 17,
    nationalTeam: { en: "Belgium", uz: "Belgiya" },
    previousClub: "Wolfsburg"
  },
  {
    id: "salah",
    name: "Mohamed Salah",
    photo: "assets/players/salah.jpg",
    country: { en: "Egypt", uz: "Misr" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Liverpool",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 11,
    nationalTeam: { en: "Egypt", uz: "Misr" },
    previousClub: "Roma"
  },
  {
    id: "vinicius",
    name: "Vinicius Jr",
    photo: "assets/players/vinicius.jpg",
    country: { en: "Brazil", uz: "Braziliya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 7,
    nationalTeam: { en: "Brazil", uz: "Braziliya" },
    previousClub: "Flamengo"
  },
  {
    id: "kane",
    name: "Harry Kane",
    photo: "assets/players/kane.jpg",
    country: { en: "England", uz: "Angliya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Bayern Munich",
    league: { en: "Bundesliga (Germany)", uz: "Bundesliga (Germaniya)" },
    number: 9,
    nationalTeam: { en: "England", uz: "Angliya" },
    previousClub: "Tottenham"
  },
  {
    id: "rodri",
    name: "Rodri",
    photo: "assets/players/rodri.jpg",
    country: { en: "Spain", uz: "Ispaniya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 16,
    nationalTeam: { en: "Spain", uz: "Ispaniya" },
    previousClub: "Atletico Madrid"
  },
  {
    id: "vandijk",
    name: "Virgil van Dijk",
    photo: "assets/players/vandijk.jpg",
    country: { en: "Netherlands", uz: "Niderlandiya" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Liverpool",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 4,
    nationalTeam: { en: "Netherlands", uz: "Niderlandiya" },
    previousClub: "Southampton"
  },
  {
    id: "lewandowski",
    name: "Robert Lewandowski",
    photo: "assets/players/lewandowski.jpg",
    country: { en: "Poland", uz: "Polsha" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Barcelona",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 9,
    nationalTeam: { en: "Poland", uz: "Polsha" },
    previousClub: "Bayern Munich"
  },
  {
    id: "modric",
    name: "Luka Modrić",
    photo: "assets/players/modric.jpg",
    country: { en: "Croatia", uz: "Xorvatiya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 10,
    nationalTeam: { en: "Croatia", uz: "Xorvatiya" },
    previousClub: "Tottenham"
  },
  {
    id: "courtois",
    name: "Thibaut Courtois",
    photo: "assets/players/courtois.jpg",
    country: { en: "Belgium", uz: "Belgiya" },
    position: { en: "Goalkeeper", uz: "Darvozabon" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 1,
    nationalTeam: { en: "Belgium", uz: "Belgiya" },
    previousClub: "Chelsea"
  },
  {
    id: "alisson",
    name: "Alisson Becker",
    photo: "assets/players/alisson.jpg",
    country: { en: "Brazil", uz: "Braziliya" },
    position: { en: "Goalkeeper", uz: "Darvozabon" },
    club: "Liverpool",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 1,
    nationalTeam: { en: "Brazil", uz: "Braziliya" },
    previousClub: "Roma"
  },
  {
    id: "neuer",
    name: "Manuel Neuer",
    photo: "assets/players/neuer.jpg",
    country: { en: "Germany", uz: "Germaniya" },
    position: { en: "Goalkeeper", uz: "Darvozabon" },
    club: "Bayern Munich",
    league: { en: "Bundesliga (Germany)", uz: "Bundesliga (Germaniya)" },
    number: 1,
    nationalTeam: { en: "Germany", uz: "Germaniya" },
    previousClub: "Schalke 04"
  },
  {
    id: "emartinez",
    name: "Emiliano Martínez",
    photo: "assets/players/emartinez.jpg",
    country: { en: "Argentina", uz: "Argentina" },
    position: { en: "Goalkeeper", uz: "Darvozabon" },
    club: "Aston Villa",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 23,
    nationalTeam: { en: "Argentina", uz: "Argentina" },
    previousClub: "Arsenal"
  },
  {
    id: "terstegen",
    name: "Marc-André ter Stegen",
    photo: "assets/players/terstegen.jpg",
    country: { en: "Germany", uz: "Germaniya" },
    position: { en: "Goalkeeper", uz: "Darvozabon" },
    club: "Barcelona",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 1,
    nationalTeam: { en: "Germany", uz: "Germaniya" },
    previousClub: "Borussia Mönchengladbach"
  },
  {
    id: "rudiger",
    name: "Antonio Rüdiger",
    photo: "assets/players/rudiger.jpg",
    country: { en: "Germany", uz: "Germaniya" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 22,
    nationalTeam: { en: "Germany", uz: "Germaniya" },
    previousClub: "Chelsea"
  },
  {
    id: "saliba",
    name: "William Saliba",
    photo: "assets/players/saliba.jpg",
    country: { en: "France", uz: "Fransiya" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Arsenal",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 2,
    nationalTeam: { en: "France", uz: "Fransiya" },
    previousClub: "Saint-Étienne"
  },
  {
    id: "hakimi",
    name: "Achraf Hakimi",
    photo: "assets/players/hakimi.jpg",
    country: { en: "Morocco", uz: "Marokash" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Paris Saint-Germain",
    league: { en: "Ligue 1 (France)", uz: "1-Liga (Fransiya)" },
    number: 2,
    nationalTeam: { en: "Morocco", uz: "Marokash" },
    previousClub: "Inter Milan"
  },
  {
    id: "dias",
    name: "Rúben Dias",
    photo: "assets/players/dias.jpg",
    country: { en: "Portugal", uz: "Portugaliya" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 3,
    nationalTeam: { en: "Portugal", uz: "Portugaliya" },
    previousClub: "Benfica"
  },
  {
    id: "davies",
    name: "Alphonso Davies",
    photo: "assets/players/davies.jpg",
    country: { en: "Canada", uz: "Kanada" },
    position: { en: "Defender", uz: "Himoyachi" },
    club: "Bayern Munich",
    league: { en: "Bundesliga (Germany)", uz: "Bundesliga (Germaniya)" },
    number: 19,
    nationalTeam: { en: "Canada", uz: "Kanada" },
    previousClub: "Vancouver Whitecaps"
  },
  {
    id: "saka",
    name: "Bukayo Saka",
    photo: "assets/players/saka.jpg",
    country: { en: "England", uz: "Angliya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Arsenal",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 7,
    nationalTeam: { en: "England", uz: "Angliya" },
    previousClub: "Arsenal Academy"
  },
  {
    id: "son",
    name: "Son Heung-min",
    photo: "assets/players/son.jpg",
    country: { en: "South Korea", uz: "Janubiy Koreya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Tottenham",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 7,
    nationalTeam: { en: "South Korea", uz: "Janubiy Koreya" },
    previousClub: "Bayer Leverkusen"
  },
  {
    id: "griezmann",
    name: "Antoine Griezmann",
    photo: "assets/players/griezmann.jpg",
    country: { en: "France", uz: "Fransiya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Atletico Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 7,
    nationalTeam: { en: "France", uz: "Fransiya" },
    previousClub: "Barcelona"
  },
  {
    id: "lmartinez",
    name: "Lautaro Martínez",
    photo: "assets/players/lmartinez.jpg",
    country: { en: "Argentina", uz: "Argentina" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Inter Milan",
    league: { en: "Serie A (Italy)", uz: "A Seriya (Italiya)" },
    number: 10,
    nationalTeam: { en: "Argentina", uz: "Argentina" },
    previousClub: "Racing Club"
  },
  {
    id: "pedri",
    name: "Pedri",
    photo: "assets/players/pedri.jpg",
    country: { en: "Spain", uz: "Ispaniya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Barcelona",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 8,
    nationalTeam: { en: "Spain", uz: "Ispaniya" },
    previousClub: "Las Palmas"
  },
  {
    id: "valverde",
    name: "Federico Valverde",
    photo: "assets/players/valverde.jpg",
    country: { en: "Uruguay", uz: "Urugvay" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Real Madrid",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 8,
    nationalTeam: { en: "Uruguay", uz: "Urugvay" },
    previousClub: "Peñarol"
  },
  {
    id: "bruno",
    name: "Bruno Fernandes",
    photo: "assets/players/bruno.jpg",
    country: { en: "Portugal", uz: "Portugaliya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Manchester United",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 8,
    nationalTeam: { en: "Portugal", uz: "Portugaliya" },
    previousClub: "Sporting CP"
  },
  {
    id: "musiala",
    name: "Jamal Musiala",
    photo: "assets/players/musiala.jpg",
    country: { en: "Germany", uz: "Germaniya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Bayern Munich",
    league: { en: "Bundesliga (Germany)", uz: "Bundesliga (Germaniya)" },
    number: 42,
    nationalTeam: { en: "Germany", uz: "Germaniya" },
    previousClub: "Chelsea Academy"
  },
  {
    id: "yamal",
    name: "Lamine Yamal",
    photo: "assets/players/yamal.jpg",
    country: { en: "Spain", uz: "Ispaniya" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Barcelona",
    league: { en: "La Liga (Spain)", uz: "La Liga (Ispaniya)" },
    number: 19,
    nationalTeam: { en: "Spain", uz: "Ispaniya" },
    previousClub: "Barcelona Academy"
  },
  {
    id: "foden",
    name: "Phil Foden",
    photo: "assets/players/foden.jpg",
    country: { en: "England", uz: "Angliya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 47,
    nationalTeam: { en: "England", uz: "Angliya" },
    previousClub: "Manchester City Academy"
  },
  {
    id: "bsilva",
    name: "Bernardo Silva",
    photo: "assets/players/bsilva.jpg",
    country: { en: "Portugal", uz: "Portugaliya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Manchester City",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 20,
    nationalTeam: { en: "Portugal", uz: "Portugaliya" },
    previousClub: "Monaco"
  },
  {
    id: "rice",
    name: "Declan Rice",
    photo: "assets/players/rice.jpg",
    country: { en: "England", uz: "Angliya" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "Arsenal",
    league: { en: "Premier League (England)", uz: "Premyer-liga (Angliya)" },
    number: 41,
    nationalTeam: { en: "England", uz: "Angliya" },
    previousClub: "West Ham"
  },
  {
    id: "shomurodov",
    name: "Eldor Shomurodov",
    photo: "assets/players/shomurodov.jpg",
    country: { en: "Uzbekistan", uz: "O‘zbekiston" },
    position: { en: "Forward", uz: "Hujumchi" },
    club: "Roma",
    league: { en: "Serie A (Italy)", uz: "A Seriya (Italiya)" },
    number: 14,
    nationalTeam: { en: "Uzbekistan", uz: "O‘zbekiston" },
    previousClub: "Genoa"
  },
  {
    id: "fayzullaev",
    name: "Abbosbek Fayzullaev",
    photo: "assets/players/fayzullaev.jpg",
    country: { en: "Uzbekistan", uz: "O‘zbekiston" },
    position: { en: "Midfielder", uz: "Yarim himoyachi" },
    club: "CSKA Moscow",
    league: { en: "Russian Premier League", uz: "Rossiya Premyer-ligasi" },
    number: 21,
    nationalTeam: { en: "Uzbekistan", uz: "O‘zbekiston" },
    previousClub: "Pakhtakor"
  }
];

// Question Categories & UI text
const QUESTION_TYPES = {
  country: {
    category: { en: "COUNTRY", uz: "DAVLAT" },
    question: {
      en: "Which country is this footballer from?",
      uz: "Bu futbolchi qaysi davlatdan?"
    }
  },
  position: {
    category: { en: "POSITION", uz: "POZITSIYA" },
    question: {
      en: "Which position does he play?",
      uz: "U qaysi pozitsiyada o‘ynaydi?"
    }
  },
  club: {
    category: { en: "CURRENT CLUB", uz: "HOZIRGI KLUB" },
    question: {
      en: "Which club does he play for?",
      uz: "U qaysi klubda o‘ynaydi?"
    }
  },
  number: {
    category: { en: "JERSEY NUMBER", uz: "FUTBOLKA RAQAMI" },
    question: {
      en: "What is his jersey number?",
      uz: "Uning futbolka raqami nechchi?"
    }
  },
  league: {
    category: { en: "LEAGUE", uz: "LIGA" },
    question: {
      en: "Which league does he play in?",
      uz: "U qaysi ligada o‘ynaydi?"
    }
  },
  nationalTeam: {
    category: { en: "NATIONAL TEAM", uz: "TERMA JAMOA" },
    question: {
      en: "Which national team does he represent?",
      uz: "U qaysi terma jamoa safida o‘ynaydi?"
    }
  },
  previousClub: {
    category: { en: "PREVIOUS CLUB", uz: "AVVALGI KLUB" },
    question: {
      en: "Which club did he play for before?",
      uz: "U avval qaysi klubda o‘ynagan?"
    }
  }
};

// All valid positions for options pool
const POSITIONS_POOL = [
  { en: "Goalkeeper", uz: "Darvozabon" },
  { en: "Defender", uz: "Himoyachi" },
  { en: "Midfielder", uz: "Yarim himoyachi" },
  { en: "Forward", uz: "Hujumchi" }
];

// Rating classifications
const RATING_TIERS = [
  { min: 100, en: "ULTIMATE FOOTBALL MASTER 🏆", uz: "HAQIQIY FUTBOL USTASI 🏆" },
  { min: 80,  en: "Football Master",            uz: "Futbol ustasi" },
  { min: 60,  en: "Football Expert",            uz: "Futbol eksperti" },
  { min: 40,  en: "Football Fan",               uz: "Futbol muxlisi" },
  { min: 0,   en: "Football Beginner",          uz: "Boshlang‘ich futbol muxlisi" }
];

// Export for browser scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PLAYERS_DATA, QUESTION_TYPES, POSITIONS_POOL, RATING_TIERS };
}
