const chalk = require("chalk");

const { preguntarUsuario } = require("./usuari");
const { existeixLinia } = require("./existeixLinia");
const { imprimirParades } = require("./imprimirParades");

const iniciar = async () => {
  const respuestas = await preguntarUsuario();
  switch (respuestas.tipo) {
    case "Bus":
      console.log(
        chalk.yellow(
          "No tenemos informacion disponible de los buses \n www.tmb.cat"
        )
      );
      process.exit(0);
      break;
    default:
      respuestas.tipo = "Metro";
      break;
  }
  const codiLinia = await existeixLinia(
    respuestas.tipo_linea,
    respuestas.tipo_yes_no
  );
  await imprimirParades(
    codiLinia,
    false,
    respuestas.info_parada[0],
    respuestas.info_parada[1]
  );
};

iniciar();
