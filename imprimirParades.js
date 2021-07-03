require("dotenv").config();
const fetch = require("node-fetch");

const urlApi = process.env.URL_API;
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;

const getParades = async (codiLinia) => {
  const response = await fetch(
    `${urlApi}${codiLinia}/estacions/?app_id=${appId}&app_key=${appKey}`
  );
  if (response) {
    const { features: estacions } = await response.json();
    return estacions.map((estacio) => estacio);
  } else {
    console.log("Error de connexión");
    return -1;
  }
};

const imprimirParades = async (codiLinia, abrev, coordenades, data) => {
  const parades = await getParades(codiLinia);
  if (parades === -1) {
    return;
  }
  console.log("\nParadas:");
  const propietatsParades = parades.map((parada) => parada);
  if (abrev) {
    propietatsParades.map((parada) =>
      console.log(`${parada.properties.NOM_ESTACIO.substring(0, 3)}.`)
    );
  } else {
    for (const parada of parades) {
      console.log(`\n${parada.properties.NOM_ESTACIO}`);
      if (coordenades) {
        console.log(`Coordenadas: ${parada.geometry.coordinates}`);
      }
      if (data) {
        console.log(
          `Fecha de inauguración: ${parada.properties.DATA_INAUGURACIO}`
        );
      }
    }
  }
};

module.exports = {
  imprimirParades,
};
