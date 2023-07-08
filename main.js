import marketValueScraper from "./webScrape.js";
import fetchCountryData from "./fetchCountryData.js";

const marketValues = await marketValueScraper(
  "https://www.transfermarkt.us/vereins-statistik/wertvollstenationalmannschaften/marktwertetop",
  4, // Assuming there are 4 pages to scrape
  //marketValues is a Map object with countries as keys and array as value {country: [marketValue]}
);

async function processAllData() {
  let countryData;

  try {
    countryData = await fetchCountryData();
    //console.log(countryData);
  } catch (error) {
    console.error(error);
  }

  for (let entry of countryData) {
    //countryData is an array of objects, each object contains 3 key-value pairs
    // "flags":obj, "name":obj, and population:number.
    if (marketValues.has(entry.name.common)) {
      const marketValue = marketValues.get(entry.name.common); //marketValue is a string eg '€1.21bn' or '€889.50m'
      const numericMarketValue = convertMarketValue(marketValue);
      const flag = entry.flags.svg;
      const population = (entry.population / 1000000).toFixed(3) + " M";
      const marketValuePerCapita = numericMarketValue / entry.population;

      marketValues.set(entry.name.common, [
        marketValue,
        flag,
        population,
        marketValuePerCapita,
      ]);
    }
  }

  return marketValues;
}

function convertMarketValue(marketValue) {
  const numericValue = parseFloat(marketValue.replace(/€|m|bn/g, "").trim());

  if (marketValue.includes("bn")) {
    return numericValue * 1000000000;
  }

  return numericValue * 1000000;
}

const finalMarketValues = await processAllData();
console.log(finalMarketValues);
