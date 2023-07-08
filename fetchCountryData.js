async function fetchCountryData() {
  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=name,flags,population`, //(GETS ALL COUNTRIES NAME POP FLAG)
  );

  if (!res.ok) {
    throw new Error(`fetch not ok`);
  }

  return res.json();
}

export default fetchCountryData;
