const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    message: "¿Que tipo de transporte quieres usar?",
    name: "tipo",
    choices: [
      {
        name: "Bus",
        value: "Bus",
      },
      {
        name: "Metro",
        value: "Metro",
      },
    ],
  },
  {
    type: "checkbox",
    message: "¿Qué información extra quiere obtener de cada parada?",
    name: "info parada",
    when: (respuesta) => respuesta.tipo === "Metro",
    choices: [
      {
        name: "Coordenadas",
        value: "Coordenadas",
      },
      {
        name: "Fecha de inauguración",
        value: "inauguracion",
      },
    ],
  },
  {
    type: "list",
    message: "¿Quieres que salgan errores?",
    name: "tipo_yes_no",
    choices: [
      {
        name: "Si",
        value: "Si",
      },
      {
        name: "No",
        value: "No",
      },
    ],
  },
  {
    type: "input",
    message: "¿Que línea quieres consultar?",
    name: "tipo_linea",
  },
]);
