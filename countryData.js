async function logJSONData() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name.common",
    //"https://restcountries.com/v3.1/all?fields=name,flags",
  );
  const jsonData = await response.json();
  console.log(jsonData);
}

logJSONData();
