const inquirer = require("inquirer");

const preguntarUsuario = async () => {
  const respuestas = await inquirer.prompt([
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
      name: "info_parada",
      when: (respuesta) => respuesta.tipo === "Metro",
      choices: [
        {
          name: "Coordenadas",
          value: true,
        },
        {
          name: "Fecha de inauguración",
          value: true,
        },
      ],
    },
    {
      type: "list",
      message: "¿Quieres que salgan errores?",
      name: "tipo_yes_no",
      when: (respuesta) => respuesta.tipo === "Metro",
      choices: [
        {
          name: "Si",
          value: true,
        },
        {
          name: "No",
          value: false,
        },
      ],
    },
    {
      type: "input",
      message: "¿Que línea quieres consultar?",
      name: "tipo_linea",
      when: (respuesta) => respuesta.tipo === "Metro",
    },
    {
      type: "list",
      message: "¿Quieres que se te envien los datos por correo?",
      name: "correo_si_no",
      when: (respuesta) => respuesta.tipo === "Metro",
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
      message: "¿A que direccion de correo lo quieres enviar?",
      name: "correo a enviar",
      when: (correo) => correo.correo_si_no === "Si" && correo.tipo === "Metro",
    },
  ]);
  return respuestas;
};

module.exports = {
  preguntarUsuario,
};
