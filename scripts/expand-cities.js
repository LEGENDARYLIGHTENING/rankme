import fs from 'fs';
import path from 'path';

const citiesPath = path.join(process.cwd(), 'cities.json');
const existingCities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

// Array of 200 major global cities to push us past 3000 pages
const newCitiesList = [
  "Tokyo", "Delhi", "Shanghai", "Sao Paulo", "Mexico City", "Cairo", "Mumbai", "Beijing", "Dhaka", "Osaka",
  "Karachi", "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Kinshasa", "Lagos", "Manila", "Rio de Janeiro", "Guangzhou",
  "Lahore", "Shenzhen", "Bangalore", "Moscow", "Tianjin", "Jakarta", "Seoul", "Bogota", "Chengdu", "Tehran",
  "Ho Chi Minh City", "Hong Kong", "Baghdad", "Wuhan", "Hanoi", "Lima", "Santiago", "Kuala Lumpur", "Riyadh", "Miami",
  "Dallas", "Houston", "Philadelphia", "Atlanta", "Washington", "Boston", "Phoenix", "Seattle", "Detroit", "Montreal",
  "Berlin", "Madrid", "Rome", "Paris", "Vienna", "Hamburg", "Warsaw", "Budapest", "Barcelona", "Munich",
  "Milan", "Prague", "Sofia", "Brussels", "Birmingham", "Cologne", "Naples", "Stockholm", "Turin", "Marseille",
  "Amsterdam", "Zagreb", "Frankfurt", "Oslo", "Helsinki", "Copenhagen", "Zurich", "Geneva", "Lisbon", "Porto",
  "Auckland", "Wellington", "Christchurch", "Brisbane", "Perth", "Adelaide", "Hobart", "Darwin", "Canberra", "Gold Coast",
  "Cape Town", "Johannesburg", "Durban", "Pretoria", "Nairobi", "Accra", "Casablanca", "Algiers", "Tunis", "Dakar",
  "Bangkok", "Taipei", "Kyoto", "Fukuoka", "Sapporo", "Busan", "Incheon", "Daegu", "Kaohsiung", "Taichung",
  "Pune", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
  "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "Indianapolis", "San Francisco", "Seattle", "Denver",
  "Oklahoma City", "Nashville", "El Paso", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque",
  "Tucson", "Fresno", "Sacramento", "Kansas City", "Mesa", "Atlanta", "Omaha", "Colorado Springs", "Raleigh", "Long Beach",
  "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Bakersfield", "Wichita", "Arlington", "Aurora", "Tampa", "New Orleans",
  "Cleveland", "Honolulu", "Anaheim", "Lexington", "Stockton", "Corpus Christi", "Henderson", "Riverside", "Newark", "Saint Paul",
  "Santa Ana", "Cincinnati", "Irvine", "Orlando", "Pittsburgh", "St. Louis", "Greensboro", "Jersey City", "Anchorage", "Lincoln",
  "Plano", "Durham", "Buffalo", "Chandler", "Chula Vista", "Toledo", "Madison", "Gilbert", "Reno", "Fort Wayne",
  "North Las Vegas", "St. Petersburg", "Lubbock", "Garland", "Laredo", "Irving", "Chesapeake", "Glendale", "Winston-Salem", "Scottsdale",
  "Fremont", "Richmond", "Boise", "Baton Rouge", "Des Moines", "Spokane", "San Bernardino", "Modesto", "Tacoma", "Fontana"
];

// Ensure no duplicates
const existingSlugs = new Set(existingCities.map(c => c.slug));

newCitiesList.forEach(cityName => {
  const slug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!existingSlugs.has(slug)) {
    existingSlugs.add(slug);
    existingCities.push({
      city: cityName,
      country: "Global",
      slug: slug,
      primaryKeyword: 'B2B Web Design & Growth Consultant in ' + cityName,
      localEcosystemIntro: cityName + "'s commercial ecosystem requires highly resilient digital infrastructure to support growing enterprise demands. The local market rewards technically rigorous B2B platforms.",
      localPainPoint: 'B2B companies in ' + cityName + ' often lack the generative SEO and technical foundation required to capture high-intent enterprise pipeline.'
    });
  }
});

fs.writeFileSync(citiesPath, JSON.stringify(existingCities, null, 2));
console.log("Expanded cities.json to " + existingCities.length + " total regions.");
