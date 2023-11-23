const cron = require("node-cron");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
var nodemailer = require("nodemailer");

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

async function envioCorreos() {
  const res = await pool.query("SELECT * from persona WHERE id = $1", [721]);
  console.log("user:", res.rows);
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


async function envioCorreos() {
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
          Estimado/a [Nombre del destinatario],

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

  var mailOptions = {
    from: "claudiamcarvajal@uts.edu.co",
    to: "claudiamarcelacarvajal27@gmail.com",
    subject: "Mensaje Importante: Control de Embarazo",
    html: mensaje,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
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
        "tipodoc, documento, nombres, fechanacimiento, departamento, municipio, email, embarazo, entidad, regimen, fechaembarazo, riesgo"
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

cron.schedule(
  "*/5 * * * * *",
  async () => {
    await envioCorreos();
    console.log(
      "CORREO: El programa ha comenzado  y está programado para ejecutarse cada mes a las 12:00 PM."
    );
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Ajusta la zona horaria según tu ubicación
  }
);
