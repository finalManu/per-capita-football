fetch("/output.json").then((response) => response.json()).then(
  (json) => {
    const map = new Map(Object.entries(json));
    console.log(map);
  },
);

// and new Map(Object.entries(JSON.parse(jsonText)))
