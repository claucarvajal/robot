const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configura tu conexión con Supabase LOCALES
const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY;


const supabase = createClient(supabaseUrl, supabaseKey);


// Configura tu conexión con Supabase INTERMEDIAS
const supabaseUrlIntermedia = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL_INTERMEDIA;
const supabaseKeyIntermedia  = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY_INTERMEDIA;


const supabaseIntermedia = createClient(supabaseUrlIntermedia, supabaseKeyIntermedia);

const personaUniqueConstraint = ["documento"];

// Función para realizar operaciones con Supabase
async function insertarPersona() {
    console.log('La función insertarPersona se está ejecutando...');
  try {
    // Supongamos que tienes una tabla llamada "personas"
    let { data: personasIntermedia, error } = await supabaseIntermedia
    .from('personasintermedia')
    .select('tipodoc, documento, nombres, fechanacimiento, departamento, municipio, email, embarazo, entidad, regimen, fechaembarazo, riesgo');

    for (let persona of personasIntermedia) {
      let { data, error } = await supabase
        .from('persona')
        .upsert([
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
        ], { returning: "minimal", onConflict: personaUniqueConstraint  });

      if (error) {
        console.error('Error al insertar persona:', error.message);
      } else {
        console.log('Persona insertada con éxito:', data);
      }
    }

  
  } catch (e) {
    console.error('Error general:', e.message);
  }
}

// Programa la tarea para ejecutarse todos los días a las 10:00 AM
// cron.schedule('0 10 * * *', async () => {
//   // Verifica si es la hora programada y luego llama a la función
//   const now = new Date();
//   if (now.getHours() === 10 && now.getMinutes() === 0) {
//     // Llama a la función supabe y luego inserta a la persona
//     await supabe();
//     await insertarPersona();
//   }
// }, {
//   scheduled: true,
//   timezone: 'America/New_York', // Ajusta la zona horaria según tu ubicación
// });

cron.schedule('*/5 * * * * *', async () => {
    // Llama a la función supabe y luego inserta a la persona
    // await supabe();
    await insertarPersona();
  }, {
    scheduled: true,
    timezone: 'America/New_York', // Ajusta la zona horaria según tu ubicación
  });

console.log('El programa ha comenzado y está programado para ejecutarse a las 10:00 AM.');