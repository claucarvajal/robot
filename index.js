const cron = require("node-cron");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
var nodemailer = require("nodemailer");
const { differenceInYears, differenceInMonths } = require("date-fns");

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

async function envioCorreosValidarVacunacion() {
  const { data: personasConEmbarazoAltoRiesgo, error: evalErrorPersona } =
    await supabase
      .from("persona")
      .select("*")
      .eq("embarazo", "")
      .eq("cumple", "pendiente");

  // console.log("personasConEmbarazoAltoRiesgo",personasConEmbarazoAltoRiesgo);
  personasConEmbarazoAltoRiesgo.map(async (persona) => {
    let datosEnviarCorreo = [];

    const { data: vacunacionData, error: vacunacionError } = await supabase
      .from("vacunacion")
      .select("nombre, descripcion, meses");

    const { data: evaluacionvacunacionData, error: evaluacionvacunacionError } =
      await supabase
        .from("evaluacionvacunacion")
        .select("nombre, fechavacunacion")
        .eq("documento", persona.documento);

    if (vacunacionData && evaluacionvacunacionData) {
      const mergedData = vacunacionData.map((v) => {
        const e = evaluacionvacunacionData.find(
          (evaluation) => evaluation.nombre === v.nombre
        );


        const fechaVacunac = e ? new Date(e.fechavacunacion) : new Date();
        const monthsDiff = differenceInMonths(
          fechaVacunac,
          new Date(persona.fechanacimiento)
        );

        console.log("monthsDiff-----", monthsDiff, e);

        let estado = "";
        let color = "";

        if (v.nombre == "001") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 2 ? "En rango" : "Fuera de rango";

          if (monthsDiff >= 0 && monthsDiff <= 2) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "002") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 2 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 2) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "004") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 3) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "005") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 3) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
          // Agregar lógica para el nombre 005
          // Puedes seguir el mismo patrón de condiciones y asignaciones de estado y color
        } else if (v.nombre == "006") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 3) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
          // Agregar lógica para el nombre 006
          // Puedes seguir el mismo patrón de condiciones y asignaciones de estado y color
        } else if (v.nombre == "007") {
          estado =
            monthsDiff > 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 3) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
          // Agregar lógica para el nombre 007
          // Puedes seguir el mismo patrón de condiciones y asignaciones de estado y color
        } else if (v.nombre == "008") {
          estado =
            monthsDiff > 0 && monthsDiff <= 4 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 4) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
          // Agregar lógica para el nombre 008
        } else if (v.nombre == "009") {
          estado =
            monthsDiff > 0 && monthsDiff <= 4 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 4) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "010") {
          estado =
            monthsDiff > 0 && monthsDiff <= 4 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 4) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "011") {
          estado =
            monthsDiff > 0 && monthsDiff <= 4 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 4) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "012") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 6 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 6) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "013") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 6 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 6) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "014") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 6 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 6) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "015") {
          estado =
            monthsDiff > 0 && monthsDiff <= 7 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 7) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "016") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 13 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 13) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "017") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 13 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 13) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "018") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 13 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 13) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "019") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 13 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 13) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "020") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 13 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 13) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "021") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 19 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 19) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "022") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 19 ? "En rango" : "Fuera de rango";
          if (monthsDiff >= 0 && monthsDiff <= 19) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "023") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 61 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 61) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "024") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 61 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 61) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        } else if (v.nombre == "025") {
          estado =
            monthsDiff >= 0 && monthsDiff <= 61 ? "En rango" : "Fuera de rango";
          if (monthsDiff > 0 && monthsDiff <= 61) {
            color = e ? "green" : "orange";
          } else {
            color = e
              ? "yellow"
              : datosEnviarCorreo.push({
                  Tipo: v.nombre,
                  desc: "Pendiente",
                  descripcion: v.descripcion,
                  nombre: persona.nombres,
                });
          }
        }
      });
      mergedData.sort((a, b) => a.nombre - b.nombre);
    }

   

    if (datosEnviarCorreo.length > 0) {
      console.log(persona, datosEnviarCorreo, "ay no");

      envioCorreosVacunacion({
        correos: "claudiamarcelacarvajal27@gmail.com" /*persona.correos*/,
        datosEnviarCorreo: datosEnviarCorreo,
        nombre: persona.nombres,
      });
    }
  });
}

async function envioCorreosValidarEmbarazadas() {
  const { data: personasConEmbarazoAltoRiesgo, error: evalErrorPersona } =
    await supabase
      .from("persona")
      .select("*")
      .eq("embarazo", "SI")
      .eq("cumple", "pendiente");

  // console.log("personasConEmbarazoAltoRiesgo",personasConEmbarazoAltoRiesgo);
  personasConEmbarazoAltoRiesgo.map(async (persona) => {
    let datosEnviarCorreo = [];

    const { data: evaluacioncontrolData, error: evalError } = await supabase
      .from("evaluacioncontrol")
      .select("*")
      .eq("documento", persona.documento);

    const { data: controlembarazoData, error: controlError } = await supabase
      .from("controlembarazo")
      .select("*");

    // Merge data based on tipocontrol
    const mergedData = evaluacioncontrolData.map((evalItem) => {
      const controlItem = controlembarazoData.find(
        (control) => control.tipocontrol === evalItem.tipocontrol
      );

      const fechaVisitaCal = evalItem.fechavisita
        ? new Date(evalItem.fechavisita)
        : new Date();
      const monthsDiff = differenceInMonths(
        fechaVisitaCal,
        new Date(persona.fechaembarazo)
      );
      // console.log(
      //   "monthsDiff",
      //   monthsDiff,
      //   fechaEmbarazo,
      //   evalItem.fechavisita,
      //   evalItem
      // );

      let estado = "";
      let color = "";

      if (evalItem.tipocontrol == "inicial") {
        estado =
          monthsDiff >= 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
        if (monthsDiff >= 0 && monthsDiff <= 3) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita
            ? "yellow"
            : datosEnviarCorreo.push({
                Tipo: "inicial",
                desc: "Pendiente",
                descripcion: controlItem.descripcion,
                nombre: persona.nombres,
              });
        }
      } else if (evalItem.tipocontrol == "medio") {
        estado =
          monthsDiff > 0 && monthsDiff <= 6 ? "En rango" : "Fuera de rango";
        if (monthsDiff > 0 && monthsDiff <= 6) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita
            ? "yellow"
            : datosEnviarCorreo.push({
                Tipo: "medio",
                desc: "Pendiente",
                descripcion: controlItem.descripcion,
                nombre: persona.nombres,
              });
        }
      } else if (evalItem.tipocontrol == "final") {
        estado =
          monthsDiff > 0 && monthsDiff <= 9 ? "En rango" : "Fuera de rango";
        if (monthsDiff > 0 && monthsDiff <= 9) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita
            ? "yellow"
            : datosEnviarCorreo.push({
                Tipo: "final",
                desc: "Pendiente",
                descripcion: controlItem.descripcion,
                nombre: persona.nombres,
              });
        }
      }
    });

    // Ordenar mergedData por id del controlembarazo
    mergedData.sort((a, b) => a.id - b.id);
    if (datosEnviarCorreo.length > 0) {
      console.log(persona, datosEnviarCorreo, "ay no");

      envioCorreos({
        correos: "claudiamarcelacarvajal27@gmail.com" /*persona.correos*/,
        datosEnviarCorreo: datosEnviarCorreo,
        nombre: persona.nombres,
      });
    }
  });
}

// Configura tu conexión con Supabase LOCALES
const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Configura tu conexión con Supabase INTERMEDIAS
const supabaseUrlIntermedia =
  process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL_INTERMEDIA;
const supabaseKeyIntermedia =
  process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY_INTERMEDIA;

const supabaseIntermedia = createClient(
  supabaseUrlIntermedia,
  supabaseKeyIntermedia
);

const personaUniqueConstraint = ["documento"];
const hijoUniqueConstraint = ["documento"];
const vacunaUniqueConstraint = ["documento", "nombre"];
const controlUniqueConstraint = ["documento", "tipocontrol"];

async function envioCorreos(datos) {
  console.log(datos, "claud-----");
  // Creamos el objeto de transporte
  // Se debe comprar o configurar un servidor de correos
  var transporter = nodemailer.createTransport({
    host: process.env.SERVIDOR_CORREO,
    port: process.env.PUERTO_CORREO,
    secure: false,
    auth: {
      user: process.env.USER_CORREO,
      pass: process.env.PASS_CORREO,
    },
  });

  // Mensaje revisado con estilos básicos
  var mensaje = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background-color: #f0f0f0; border: 1px solid #dddddd; border-radius: 8px; padding: 20px; max-width: 400px; text-align: center; font-family: Arial, sans-serif;">
          <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">¡Mensaje Importante!</h2>
          <p style="font-size: 16px; color: #333333;">
          Estimada ${datos.nombre},

          Esperamos sinceramente que se encuentre bien. Nos dirigimos a usted con respecto al control de embarazo que estaba programado en nuestra institución. Lamentablemente, no hemos recibido su presencia en la fecha acordada.
          
          Queremos resaltar la vital importancia de este control para su salud y bienestar. Le urgimos amablemente a que se acerque a su EPS lo más pronto posible para llevar a cabo la evaluación necesaria. Estamos aquí para brindarle todo el apoyo que pueda necesitar durante este proceso.
          
          Su atención a este asunto es de suma importancia, y agradecemos sinceramente su comprensión y cooperación.
          
          Atentamente,
          Salud y vida
          </p>
        </td>
      </tr>
    </table>
  `;

  const table = `
  <table style="border-collapse: collapse; width: 100%; border: 1px solid #dddddd;">
    <tr style="background-color: #f0f0f0;">
      <th style="border: 1px solid #dddddd; padding: 8px;">Tipo</th>
      <th style="border: 1px solid #dddddd; padding: 8px;">Descripción</th>
      <th style="border: 1px solid #dddddd; padding: 8px;">Estado</th>
    </tr>
    ${datos.datosEnviarCorreo
      .map(
        (element) => `
      <tr>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.Tipo}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.descripcion}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.desc}</td>
      </tr>
    `
      )
      .join("")}
  </table>
  `;
  mensaje += table;

  var mailOptions = {
    from: "claudiamcarvajal@uts.edu.co",
    to: datos.correos,
    subject: "Mensaje Importante: Control de Embarazo",
    html: mensaje,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
      return true;
    }
  });
}

async function envioCorreosVacunacion(datos) {
  console.log(datos, "claud-----");
  // Creamos el objeto de transporte
  // Se debe comprar o configurar un servidor de correos
  var transporter = nodemailer.createTransport({
    host: process.env.SERVIDOR_CORREO,
    port: process.env.PUERTO_CORREO,
    secure: false,
    auth: {
      user: process.env.USER_CORREO,
      pass: process.env.PASS_CORREO,
    },
  });

  // Mensaje revisado con estilos básicos
  var mensaje = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background-color: #f0f0f0; border: 1px solid #dddddd; border-radius: 8px; padding: 20px; max-width: 400px; text-align: center; font-family: Arial, sans-serif;">
          <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">¡Mensaje Importante!</h2>
          <p style="font-size: 16px; color: #333333;">
          Estimada ${datos.nombre},

          Esperamos sinceramente que tanto usted como su hij@ se encuentren bien. Nos dirigimos a usted con respecto a la cita de vacunación programada para su hijo en nuestra institución. Lamentablemente, no hemos registrado la asistencia de su hijo en la fecha acordada.

          Queremos subrayar la vital importancia de mantener al día las vacunas para garantizar la salud y bienestar de su hijo. Le instamos amablemente a que lo lleve a la clínica o centro de vacunación designado lo antes posible para completar el esquema de vacunación necesario. Estamos aquí para proporcionarle todo el apoyo necesario durante este proceso.
          
          La atención a este asunto es crucial, y agradecemos sinceramente su comprensión y colaboración en este asunto tan importante para la salud de su hijo y la comunidad en general.
          
          Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros. Agradecemos de antemano su cooperación y estamos aquí para ayudarle en todo lo que necesite
          
          Atentamente,
          Salud y vida
          </p>
        </td>
      </tr>
    </table>
  `;

  const table = `
  <table style="border-collapse: collapse; width: 100%; border: 1px solid #dddddd;">
    <tr style="background-color: #f0f0f0;">
      <th style="border: 1px solid #dddddd; padding: 8px;">Tipo</th>
      <th style="border: 1px solid #dddddd; padding: 8px;">Descripción</th>
      <th style="border: 1px solid #dddddd; padding: 8px;">Estado</th>
    </tr>
    ${datos.datosEnviarCorreo
      .map(
        (element) => `
      <tr>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.Tipo}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.descripcion}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${element.desc}</td>
      </tr>
    `
      )
      .join("")}
  </table>
  `;
  mensaje += table;

  var mailOptions = {
    from: "claudiamcarvajal@uts.edu.co",
    to: datos.correos,
    subject: "Mensaje Importante: Control de vacunación",
    html: mensaje,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
      return true;
    }
  });
}

// Función para realizar operaciones con Supabase
async function insertarPersona() {
  console.log("La función insertarPersona se está ejecutando...");
  try {
    //PERSONA**********************************************************************
    let { data: personasIntermedia, error } = await supabaseIntermedia
      .from("personasintermedia")
      .select(
        "tipodoc, documento, nombres, fechanacimiento, departamento, municipio, email, embarazo, entidad, regimen, fechaembarazo, riesgo, cumple"
      );

    for (let persona of personasIntermedia) {
      let { data, error } = await supabase.from("persona").upsert(
        [
          {
            tipodoc: persona.tipodoc,
            documento: persona.documento,
            nombres: persona.nombres,
            fechanacimiento: persona.fechanacimiento,
            departamento: persona.departamento,
            municipio: persona.municipio,
            email: persona.email,
            embarazo: persona.embarazo,
            hijo: "", // Aquí puedes proporcionar el valor para 'hijo'
            fechaembarazo: persona.fechaembarazo,
            entidad: persona.entidad,
            regimen: persona.regimen,
            riesgo: persona.riesgo,
            cumple: persona.cumple,
          },
        ],
        { returning: "minimal", onConflict: personaUniqueConstraint }
      );

      if (error) {
        console.error("Error al insertar persona:", error.message);
      } else {
        console.log("Persona insertada con éxito:", data);
      }
    }

    //HIJO**********************************************************************
    let { data: hijosIntermedia, errorHijos } = await supabaseIntermedia
      .from("hijosintermedia")
      .select("documento, nombres, responsable");

    for (let hijo of hijosIntermedia) {
      const hijoData = {
        responsable: hijo.responsable,
        documento: hijo.documento,
        nombres: hijo.nombres,
      };

      let { data, errorHijos } = await supabase
        .from("hijos")
        .upsert([hijoData], {
          returning: "minimal",
          onConflict: hijoUniqueConstraint,
        });

      if (errorHijos) {
        console.error("Error al insertar hijos:", errorHijos.message);
      } else {
        console.log("hijos insertada con éxito:", data);
      }
    }

    //EVALUACIONVACUNA**********************************************************************
    let { data: vacunaIntermedia, errorVacuna } = await supabaseIntermedia
      .from("vacunacionintermedia")
      .select("documento, nombre, responsable, fechavacunacion");

    for (let vacuna of vacunaIntermedia) {
      const vacunaData = {
        documento: vacuna.documento,
        nombre: vacuna.nombre,
        fechavacunacion: vacuna.fechavacunacion,
        responsable: vacuna.responsable,
      };

      let { data, errorVacuna } = await supabase
        .from("evaluacionvacunacion")
        .upsert([vacunaData], {
          returning: "minimal",
          onConflict: vacunaUniqueConstraint,
        });

      if (errorVacuna) {
        console.error("Error al insertar vacuna hijos:", errorVacuna.message);
      } else {
        console.log("vacuna hijos insertada con éxito:", data);
      }
    }

    //EVALUACIONCONTROL**********************************************************************
    let { data: controlIntermedia, errorControl } = await supabaseIntermedia
      .from("controlembarazointermedia")
      .select("documento, fechavisita, tipocontrol");

    for (let control of controlIntermedia) {
      const controlData = {
        documento: control.documento,
        fechavisita: control.fechavisita,
        tipocontrol: control.tipocontrol,
      };

      let { data, errorControl } = await supabase
        .from("evaluacioncontrol")
        .upsert([controlData], {
          returning: "minimal",
          onConflict: controlUniqueConstraint,
        });

      if (errorControl) {
        console.error("Error al insertar control ", errorControl.message);
      } else {
        console.log("control insertada con éxito:", data);
      }
    }
  } catch (e) {
    console.error("Error general:", e.message);
  }
}

// Programa la tarea para ejecutarse todos los días a las 12:00 pM
// cron.schedule('0 24 * * *', async () => {
//   // Verifica si es la hora programada y luego llama a la función
//   const now = new Date();
//   if (now.getHours() === 24 && now.getMinutes() === 0) {
//     // Llama a la función supabe y luego inserta a la persona
//     await insertarPersona();
//   }
// }, {
//   scheduled: true,
//   timezone: 'America/New_York', // Ajusta la zona horaria según tu ubicación
// });

cron.schedule(
  "*/5 * * * * *",
  async () => {
    await insertarPersona();
    console.log(
      "WEB: El programa ha comenzado y está programado para ejecutarse todos los días a las 12:00 PM."
    );
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Ajusta la zona horaria según tu ubicación
  }
);

//CONTROL EMBARAZO
cron.schedule(
  "18 18 * * *",
  async () => {
    await envioCorreosValidarEmbarazadas();
    console.log(
      "CORREO CONTRAL: El programa ha comenzado  y está programado para ejecutarse cada mes a las 09:05 PM."
    );
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Ajusta la zona horaria según tu ubicación
  }
);

//CONTROL VACUNACIÓN
cron.schedule(
  "18 18 * * *",
  async () => {
    await envioCorreosValidarVacunacion();
    console.log(
      "CORREO VACUNAS: El programa ha comenzado y está programado para ejecutarse cada mes a las 10:05 PM."
    );
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Ajusta la zona horaria según tu ubicación
  }
);

