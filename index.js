let currentSortOrder = "desc";

const json = await fetch("./output.json").then((response) => response.json()); // {"Country":[marketvalue,flag,population,percapita],...}
const entries = Object.entries(json); // [["Country", [marketvalue,flag,population,percapita]], ...]
const rowData = entries.map(([key, values]) => [key, ...values]).map((
  [country, marketValue, flag, population, percapita],
) => [flag, country, marketValue, population, percapita]); // [[flag, "Country", marketvalue,population,percapita], ...]

const possibleOrders = ["country", "marketvalue", "population", "percapita"];
const orderToTable = new Map(); // All columns ordered in descending order
possibleOrders.forEach((order, i) => {
  const orderedRowData = [...rowData].sort((rowA, rowB) => {
    const indexAfterSkipingFlag = i + 1;
    let a = rowA[indexAfterSkipingFlag];
    let b = rowB[indexAfterSkipingFlag];

    if (order === "country") {
      return a.localeCompare(b);
    }
    if (order === "marketvalue") {
      return 0;
    }
    a = parseFloat(a.replace("€", "").replace("m", ""));
    b = parseFloat(b.replace("€", "").replace("m", ""));
    return b - a;
  });
  orderToTable.set(order, orderedRowData);
});

//El to know its element
let tableBodyEl = document.getElementById("table-body");
let myTableEl = document.getElementById("my-table");
// let thEls = myTableEl.getElementsByTagName("th"); //HTMLCollection (missing array methods)
let thEls = [...myTableEl.getElementsByTagName("th")]; //Now array, map filter reduce etc available

createAndAddRowsToTable(orderToTable.get("marketvalue"));

possibleOrders.forEach((order, i) => {
  thEls[i].onclick = () => {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    sortIconHandler(thEls[i].querySelector("i"));
    if (currentSortOrder === "asc") {
      createAndAddRowsToTable(orderToTable.get(order));
    } else { //currentSortOrder === "desc"
      createAndAddRowsToTable([...orderToTable.get(order)].reverse());
    }
  };
});

function createAndAddRowsToTable(orderArray) {
  // loop and create table rows
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  for (let entry of orderArray) {
    var row = document.createElement("tr");
    row.classList.add("border-b");
    row.classList.add("hover:bg-sky-700");

    var countryCell = document.createElement("td");
    countryCell.innerHTML = `
        <div class="flex items-center gap-x-2"> 
          <img src="${
      entry[0]
    }" class="pl-2 w-8 h-4 object-cover object-center shadow-xl"></img>
          <p>${entry[1]}</p>
        </div>
      `;

    row.appendChild(countryCell);

    var marketValueCell = document.createElement("td");
    marketValueCell.textContent = entry[2];
    row.appendChild(marketValueCell);

    var populationCell = document.createElement("td");
    populationCell.textContent = entry[3];
    row.appendChild(populationCell);

    var perCapitaValueCell = document.createElement("td");
    perCapitaValueCell.textContent = entry[4];
    row.appendChild(perCapitaValueCell);

    tableBodyEl.appendChild(row);
  }
}
function sortIconHandler(icon, lastCaller) {
  //Reset icons first if user clicks on a different column, otherwise toggle current icon
  lastCaller === icon || undefined ? changeIcon() : resetIcons(icon);

  function changeIcon() {
    icon.classList.remove("fa-sort");
    if (currentSortOrder === "asc") {
      icon.classList.remove("fa-caret-down");
      icon.classList.add("fa-caret-up");
      icon.style.color = "#00f900";
    }
    if (currentSortOrder === "desc") {
      icon.classList.remove("fa-caret-up");
      icon.classList.add("fa-caret-down");
      icon.style.color = "#ff2600";
    }
  }
  function resetIcons(icon) {
    thEls.forEach((th) => {
      th.querySelector("i").classList.remove("fa-caret-up");
      th.querySelector("i").classList.remove("fa-caret-down");
      th.querySelector("i").classList.add("fa-sort");
      th.querySelector("i").style.color = "";
      lastCaller = icon;
      sortIconHandler(icon, lastCaller);
    });
  }
}
