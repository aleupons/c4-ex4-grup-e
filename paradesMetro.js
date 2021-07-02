const fetch = require("node-fetch");

const urlApi = process.env.URL_API;
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;

const getParades = async (codiLinia) => {
  const response = await fetch(
    `${urlApi}${codiLinia}/estacions?app_id=${appId}&app_key=${appKey}`
  );
  if (response) {
    const { features: estacions } = await response.json();
    console.log(estacions.map(({ properties }) => properties));
  } else {
    console.log("Error de connexión");
    process.exit(1);
  }
};
getParades(101);
