fetch("./output.json").then((response) => response.json()).then(
  (json) => {
    const map = new Map(Object.entries(json));
    console.log(map);
    //table body ref
    var tableBody = document.getElementById("table-body");

    // loop and create table rows
    for (let [country, rowData] of map) {
      var row = document.createElement("tr");

      var countryCell = document.createElement("td");
      countryCell.textContent = country;
      row.appendChild(countryCell);

      var marketValueCell = document.createElement("td");
      marketValueCell.textContent = rowData[0];
      row.appendChild(marketValueCell);

      var flagCell = document.createElement("td");
      var flagImage = document.createElement("img");
      flagImage.src = rowData[1];
      flagCell.appendChild(flagImage);
      row.appendChild(flagCell);

      var populationCell = document.createElement("td");
      populationCell.textContent = rowData[2];
      row.appendChild(populationCell);

      var perCapitaValueCell = document.createElement("td");
      perCapitaValueCell.textContent = rowData[3];
      row.appendChild(perCapitaValueCell);

      // Add the row to the table body
      tableBody.appendChild(row);
    }
  },
);

// and new Map(Object.entries(JSON.parse(jsonText)))
