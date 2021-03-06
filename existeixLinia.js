require("dotenv").config();
const chalk = require("chalk");
const fetch = require("node-fetch");

const urlApi = process.env.URL_API;
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;

const getLinies = async () => {
  const response = await fetch(`${urlApi}?app_id=${appId}&app_key=${appKey}`);
  if (response) {
    const { features: linies } = await response.json();
    return linies.map(({ properties }) => properties);
  } else {
    console.log("Error de connexión");
    return -1;
  }
};

const existeixLinia = async (linia, errors, color) => {
  const linies = await getLinies();
  if (linies === -1) {
    return;
  }
  const propietatsLinia = await linies.filter(
    (liniaMetro) => liniaMetro.NOM_LINIA.toLowerCase() === linia.toLowerCase()
  )[0];
  if (propietatsLinia) {
    const colorLinia = `#${propietatsLinia.COLOR_LINIA}`;
    const missatge = `Nombre de la línea: ${propietatsLinia.NOM_LINIA}\nDescripción: ${propietatsLinia.DESC_LINIA}`;
    if (color) {
      console.log(chalk.hex(color)(missatge));
      return propietatsLinia.CODI_LINIA;
    } else if (!color) {
      console.log(chalk.hex(colorLinia)(missatge));
      return propietatsLinia.CODI_LINIA;
    }
  } else if (errors) {
    console.log(chalk.red.bold("La línea no existe"));
    process.exit(0);
  } else {
    process.exit(0);
  }
};

module.exports = {
  existeixLinia,
};
