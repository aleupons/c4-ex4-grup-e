const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "letha.lynch56@ethereal.email",
    pass: "Nv931U1hC43HhacY2Q",
  },
});

const mensaje = {
  from: "remitente@email.com",
  to: "destinatario@email.com",
  subject: "Correo electrónico de prueba",
  html: "<h1>Probando esto de enviar correos desde <strong>Node.js</strong></h1>",
};

transport.sendMail(mensaje, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
