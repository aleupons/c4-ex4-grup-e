require("dotenv").config();
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");

const urlApi = process.env.URL_API;
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;

program
  .option("--color <colorPedido>", "Un color exagesimal")
  .option("--abrev", "abrevia los nombres");
program.parse(process.argv);
const { color, abrev } = program.opts();
const abreviacion = !!abrev;

if (color !== undefined) {
  if (color[0] !== "#" || color.length !== 7) {
    console.log("El numero se ha de escribir de forma exagesimal: #······");
    process.exit(1);
  }
}

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

const imprimirParades = async (codiLinia, coordenades, data) => {
  const parades = await getParades(codiLinia);
  if (parades === -1) {
    return;
  }
  console.log(chalk.hex(`${color}`)("\nParadas:"));
  const propietatsParades = parades.map((parada) => parada);
  if (abreviacion) {
    propietatsParades.map((parada) =>
      console.log(
        chalk.hex(`${color}`)(
          `${parada.properties.NOM_ESTACIO.substring(0, 3)}.`
        )
      )
    );
  } else {
    for (const parada of parades) {
      console.log(chalk.hex(`${color}`)(`\n${parada.properties.NOM_ESTACIO}`));
      if (coordenades) {
        console.log(
          chalk.hex(`${color}`)(`Coordenadas: ${parada.geometry.coordinates}`)
        );
      }
      if (data) {
        console.log(
          chalk.hex(`${color}`)(
            `Fecha de inauguración: ${parada.properties.DATA_INAUGURACIO}`
          )
        );
      }
    }
  }
};

module.exports = {
  imprimirParades,
};
