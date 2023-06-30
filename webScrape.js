import puppeteer from "puppeteer";

async function marketValueScraper(url, totalPages) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  //console.log(`navigating to ${url}`);

  const tableData = [];

  for (let pageIdx = 1; pageIdx <= totalPages; pageIdx++) {
    //console.log(`Scraping data from page ${pageIdx}`);

    await page.goto(`${url}?ajax=yw1&page=${pageIdx}`, {
      waitUntil: "networkidle0",
    });

    const pageTableData = await page.evaluate(() => {
      const table = document.querySelector("#yw1 > table");
      const rows = Array.from(table.querySelectorAll("tr"));
      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        return cells.map((cell) => cell.innerText);
      });
    });

    tableData.push(...pageTableData);
  }

  // Assuming tableData contains the scraped table data
  // Assuming tableData contains the scraped table data

  //console.log(tableData);

  await browser.close();

  for (const row of tableData) {
    if (row.length >= 6) {
      const ranking = row[0].trim(); // Remove any leading/trailing whitespace
      const country = row[1].trim();
      const marketValue = row[5].trim();

      console.log(
        `Ranking: ${ranking}, Country: ${country}, Market Value: ${marketValue}`,
      );
    }
  }
}

marketValueScraper(
  "https://www.transfermarkt.us/vereins-statistik/wertvollstenationalmannschaften/marktwertetop",
  4, // Assuming there are 5 pages to scrape
);
