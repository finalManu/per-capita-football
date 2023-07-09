import marketValueScraper from "./webScrape.js";
import fetchCountryData from "./fetchCountryData.js";

const countryNameMappings = {
  "Ireland": "Republic of Ireland",
  "Czechia": "Czech Republic",
  "Bosnia and Herzegovina": "Bosnia-Herzegovina",
  "DR Congo": "Democratic Republic of the Congo",
  "Gambia": "The Gambia",
};

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

    const countryName = entry.name.common;
    const mappedCountryName = countryNameMappings[countryName] || countryName;

    if (marketValues.has(mappedCountryName)) {
      const marketValue = marketValues.get(mappedCountryName); //marketValue is a string eg '€1.21bn' or '€889.50m'
      const numericMarketValue = convertMarketValue(marketValue);
      const flag = entry.flags.svg;
      const population = (entry.population / 1000000).toFixed(3) + "m";
      const marketValuePerCapita = "€" +
        (numericMarketValue / entry.population).toFixed(2);

      marketValues.set(mappedCountryName, [
        marketValue,
        flag,
        population,
        marketValuePerCapita,
      ]);
    }
  }

  const marketValueEngland = marketValues.get("England");
  marketValues.set("England", [
    marketValueEngland,
    "https://flagcdn.com/gb-eng.svg",
    "56.29m",
    "€" + (convertMarketValue(marketValueEngland) / 56290000).toFixed(2),
  ]);
  const marketValueScotland = marketValues.get("Scotland");
  marketValues.set("Scotland", [
    marketValueScotland,
    "https://flagcdn.com/gb-sct.svg",
    "5.46m",
    "€" + (convertMarketValue(marketValueScotland) / 5460000).toFixed(2),
  ]);
  const marketValueWales = marketValues.get("Wales");
  marketValues.set("Wales", [
    marketValueWales,
    "https://flagcdn.com/gb-wls.svg",
    "3.14m",
    "€" + (convertMarketValue(marketValueWales) / 3140000).toFixed(2),
  ]);
  const marketValueNorthernIreland = marketValues.get("Northern Ireland");
  marketValues.set("Northern Ireland", [
    marketValueNorthernIreland,
    "https://flagcdn.com/gb-nir.svg",
    "1.89m",
    "€" + (convertMarketValue(marketValueNorthernIreland) / 1890000).toFixed(2),
  ]);

  return marketValues;
}

function convertMarketValue(marketValue) {
  const numericValue = parseFloat(marketValue.replace(/€|m|bn/g, "").trim());

  if (marketValue.includes("bn")) {
    return numericValue * 1000000000;
  }

  return numericValue * 1000000;
}

/*
MISSING COUNTRIES:
England => N/A in API only United Kingdom,
Scotland => N/A in API part of the UK,
Wales => N/A in API part of the UK,
Northern Ireland => N/A in API part of the UK,

DISCREPANCIES:
Republic of Ireland => Ireland.
Czech Republic => Czechia.
Bosnia-Herzegovina => Bosnia and Herzegovina.
Democratic Republic of the Congo => DR Congo.
The Gambia => Gambia.
*/

const finalMarketValues = await processAllData();
console.log(finalMarketValues);
