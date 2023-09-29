let sortOrder = [];
let currentSortOrder = "desc";

fetch("./output.json").then((response) => response.json()).then(
  (json) => {
    const map = new Map(Object.entries(json));
    console.log(map);
    console.log([...map.entries()]);

    let tableBody = document.getElementById("table-body");

    let myTable = document.getElementById("my-table");
    let th = myTable.getElementsByTagName("th");
    console.log(th);
    const iconCountry = th[0].querySelector("i");
    const iconMarketValue = th[1].querySelector("i");
    const iconPopulation = th[2].querySelector("i");
    const iconPerCapita = th[3].querySelector("i");
    const iconList = [
      iconCountry,
      iconMarketValue,
      iconPopulation,
      iconPerCapita,
    ];

    th[0].onclick = () => {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      sortIconHandler(iconCountry, iconList);
      sortOrder = computeSortOrder(map, currentSortOrder, "country");
      reorderTableBySortOrder(sortOrder, "country");
    };
    th[1].onclick = () => {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      sortIconHandler(iconMarketValue, iconList);
      sortOrder = computeSortOrder(map, currentSortOrder, "marketvalue");
      reorderTableBySortOrder(sortOrder, "marketvalue");
    };

    th[2].onclick = () => {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      sortIconHandler(iconPopulation, iconList);
      sortOrder = computeSortOrder(map, currentSortOrder, "population");
      reorderTableBySortOrder(sortOrder, "population");
    };
    th[3].onclick = () => {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      sortIconHandler(iconPerCapita, iconList);
      sortOrder = computeSortOrder(map, currentSortOrder, "percapita");
      reorderTableBySortOrder(sortOrder, "percapita");
    };

    // loop and create table rows
    for (let [country, rowData] of map) {
      var row = document.createElement("tr");
      row.classList.add("border-b");
      row.classList.add("hover:bg-sky-700");

      var countryCell = document.createElement("td");
      countryCell.innerHTML = `
        <div class="flex items-center gap-x-2"> 
          <img src="${
        rowData[1]
      }" class="pl-2 w-8 h-4 object-cover object-center shadow-xl"></img>
          <p>${country}</p>
        </div>
      `;

      row.appendChild(countryCell);

      var marketValueCell = document.createElement("td");
      marketValueCell.textContent = rowData[0];
      row.appendChild(marketValueCell);

      var populationCell = document.createElement("td");
      populationCell.textContent = rowData[2];
      row.appendChild(populationCell);

      var perCapitaValueCell = document.createElement("td");
      perCapitaValueCell.textContent = rowData[3];
      row.appendChild(perCapitaValueCell);

      tableBody.appendChild(row);
    }
  },
);

function sortIconHandler(icon, iconList, lastCaller) {
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
    iconList.forEach((header) => {
      header.classList.remove("fa-caret-up");
      header.classList.remove("fa-caret-down");
      header.classList.add("fa-sort");
      header.style.color = "";
      lastCaller = icon;
      sortIconHandler(icon, iconList, lastCaller);
    });
  }
}

function computeSortOrder(map, order, column) {
  if (column === "country") {
    const sortingOrder = [...map.keys()].sort((a, b) => {
      return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    });
    return sortingOrder;
  }
  if (column === "marketvalue") {
    const sortingOrder = [...map].map((item) => item[1][0]);
    return order === "asc" ? sortingOrder : sortingOrder.reverse();
  }
  if (column === "population") {
    const sortingOrder = [...map.entries()].sort((a, b) => {
      const populationA = parseFloat(a[1][2].replace("m", ""));
      const populationB = parseFloat(b[1][2].replace("m", ""));

      return order === "asc"
        ? populationB - populationA
        : populationA - populationB;
    });
    return sortingOrder.map((item) => item[1][2]);
  }
  if (column === "percapita") {
    const sortingOrder = [...map.entries()].sort((a, b) => {
      const perCapitaA = parseFloat(a[1][3].replace("€", ""));
      const perCapitaB = parseFloat(b[1][3].replace("€", ""));

      return order === "asc"
        ? perCapitaB - perCapitaA
        : perCapitaA - perCapitaB;
    });
    return sortingOrder.map((item) => item[1][3]);
  }
}

function reorderTableBySortOrder(order, column) {
  let index;
  const tableBody = document.getElementById("table-body");
  const rows = Array.from(tableBody.rows); // Convert HTMLCollection to an array
  column === "country"
    ? index = 0
    : column === "marketvalue"
    ? index = 1
    : column === "population"
    ? index = 2
    : index = 3;
  const reorderedRows = order.map((item) =>
    rows.find((row) => row.cells[index].textContent.includes(item))
  );

  // Clear the table body
  tableBody.innerHTML = "";

  // Append the reordered rows back to the table
  reorderedRows.forEach((row) => {
    if (row) {
      tableBody.appendChild(row);
    }
  });
}

// and new Map(Object.entries(JSON.parse(jsonText)))
