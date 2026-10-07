/*
 * Configuración de un cliente: COLEGIO (datos de ejemplo, ficticios).
 *
 * Para un cliente real, copia este archivo, cambia el id y reemplaza los datos.
 * Solo edita textos y palabras clave: no hace falta tocar el motor (js/bot.js).
 *
 * Palabras clave: se comparan sin tildes ni mayúsculas y al inicio de palabra
 * ("pension" encuentra "pensiones"). Con ~ delante cuentan menos (palabras ambiguas).
 * En las respuestas: **negrita** y saltos de línea con \n.
 */
(globalThis.CONFIGS = globalThis.CONFIGS || {}).colegio = {
  id: 'colegio',
  tipo: 'Colegio',
  nombre: 'Colegio Los Álamos',
  eslogan: 'Educación en valores desde 1998 · Inicial, Primaria y Secundaria',
  logo: '🏫',
  colores: { primario: '#1d4ed8', oscuro: '#172554', acento: '#f59e0b' },
  asistente: { nombre: 'Sofía', rol: 'Asistente de Admisión 2027', avatar: '👩🏻‍🏫' },

  // Número que recibe los leads por WhatsApp (código de país + número, sin + ni espacios).
  // Para tus demos pon TU número: así ves llegar el mensaje en vivo. Ej: '51987654321'
  whatsapp: '',
  // Opcional: URL de Google Apps Script para guardar leads en Google Sheets (ver docs/GOOGLE-SHEETS.md)
  webhookUrl: '',

  destacados: [
    { icono: '🎓', titulo: 'Admisión 2027', texto: 'Vacantes abiertas en Inicial, Primaria y Secundaria' },
    { icono: '🗣️', titulo: 'Inglés intensivo', texto: '10 horas semanales y preparación Cambridge' },
    { icono: '👩‍🏫', titulo: '25 alumnos por aula', texto: 'Atención personalizada y tutoría permanente' },
  ],
  contacto: [
    '📍 Av. Los Álamos 1250, Santiago de Surco, Lima',
    '📞 (01) 555-0123',
    '🕘 Admisión: lunes a viernes 8:00–16:00 · sábados 9:00–12:00',
  ],

  bienvenida: [
    '¡Hola! 👋 Soy **Sofía**, la asistente virtual de admisión del **Colegio Los Álamos**.',
    'Puedo responderle sobre **vacantes, pensiones, horarios y requisitos** para el año escolar 2027. ¿Qué le gustaría saber?',
  ],
  sugerenciasIniciales: ['Vacantes 2027', 'Pensiones', 'Horarios', 'Requisitos', 'Agendar visita'],

  intenciones: [
    {
      titulo: 'Saludo',
      baja: true,
      palabras: ['hola', 'buenas', 'buenos dias', 'buen dia', 'saludos', 'que tal', 'alo'],
      respuesta: '¡Hola! 😊 Con gusto le ayudo. ¿Qué le gustaría saber sobre la admisión 2027?',
    },
    {
      titulo: 'Vacantes',
      palabras: ['vacante', 'cupo', 'disponib', 'hay lugar', 'hay espacio', 'quedan', 'hay sitio'],
      respuesta:
        'Sí, aún tenemos vacantes para el **año escolar 2027** 🎉\n\n' +
        '• **Inicial** (3, 4 y 5 años): 9 vacantes\n' +
        '• **Primaria**: 12 vacantes (**1.er grado: 7 disponibles**)\n' +
        '• **Secundaria**: 6 vacantes\n\n' +
        'Se asignan por orden de inscripción, así que le recomiendo separarla pronto.',
    },
    {
      titulo: 'Pensiones',
      palabras: ['pension', 'mensualidad', 'mensual', 'costo', 'cuesta', 'precio', 'pagar', 'pago', 'cuota', 'matricula', 'tarifa', 'descuento', '~cuanto', '~sale'],
      respuesta:
        'Estos son los costos para el **2027**:\n\n' +
        '• Cuota de ingreso (única vez): **S/ 1,200**\n' +
        '• Matrícula: **S/ 450**\n' +
        '• Pensión mensual (marzo a diciembre):\n' +
        '   – Inicial: **S/ 680**\n' +
        '   – Primaria: **S/ 790**\n' +
        '   – Secundaria: **S/ 850**\n\n' +
        '💡 10 % de descuento por hermanos y 5 % por pronto pago.',
    },
    {
      titulo: 'Horarios',
      palabras: ['horario', 'hora', 'entrada', 'salida', 'turno', 'jornada', 'a que hora'],
      respuesta:
        '🕗 **Horario de clases** (lunes a viernes):\n\n' +
        '• Inicial: 8:00 a.m. – 12:30 p.m.\n' +
        '• Primaria: 7:45 a.m. – 2:30 p.m.\n' +
        '• Secundaria: 7:45 a.m. – 3:00 p.m.\n\n' +
        'Talleres opcionales (fútbol, robótica, danza y música): 3:15 – 5:00 p.m.',
    },
    {
      titulo: 'Requisitos',
      palabras: ['requisit', 'document', 'papeles', 'que necesito', 'que piden', 'que se necesita', 'que debo presentar', 'que llevo'],
      respuesta:
        '📋 **Requisitos de admisión:**\n\n' +
        '• Copia de DNI del postulante y de los padres\n' +
        '• Partida de nacimiento\n' +
        '• Libreta de notas del último año\n' +
        '• Constancia de no adeudo del colegio anterior\n' +
        '• Ficha única de matrícula (SIAGIE)\n' +
        '• 2 fotos tamaño carné\n\n' +
        'El postulante rinde una **evaluación diagnóstica** y la familia tiene una **entrevista** con psicología.',
    },
    {
      titulo: 'Edad de ingreso',
      palabras: ['edad', 'anos cumplidos', 'cumplidos', 'que edad', 'cuantos anos'],
      respuesta:
        'Para ingresar, el niño o niña debe tener la edad **cumplida al 31 de marzo de 2027**:\n\n' +
        '• Inicial 3 años → 3 años cumplidos\n' +
        '• Inicial 4 años → 4 años cumplidos\n' +
        '• 1.er grado de Primaria → 6 años cumplidos',
    },
    {
      titulo: 'Proceso de admisión',
      palabras: ['proceso', 'pasos', 'como postulo', 'como es la admision', 'evaluacion', 'examen', 'entrevista', '~admision'],
      respuesta:
        'El proceso de admisión tiene **4 pasos**:\n\n' +
        '1️⃣ Visita guiada al colegio\n' +
        '2️⃣ Entrega de documentos\n' +
        '3️⃣ Evaluación del postulante y entrevista familiar\n' +
        '4️⃣ Resultados en 5 días hábiles y pago de matrícula\n\n' +
        'Todo el proceso toma aproximadamente **2 semanas**.',
    },
    {
      titulo: 'Propuesta educativa',
      palabras: ['ingles', 'idioma', 'taller', 'deporte', 'robotica', 'metodologia', 'propuesta', 'extracurricular', 'cambridge', 'religio', 'nivel academico'],
      respuesta:
        '✨ **Nuestra propuesta educativa:**\n\n' +
        '• Inglés 10 horas semanales con preparación para exámenes Cambridge\n' +
        '• Robótica y programación desde 3.er grado\n' +
        '• Formación en valores y tutoría semanal\n' +
        '• Talleres deportivos y artísticos por las tardes',
    },
    {
      titulo: 'Servicios',
      palabras: ['movilidad', 'transporte', 'bus', 'comedor', 'almuerzo', 'lonchera', 'psicolog', 'enfermeria', 'topico', 'seguro'],
      respuesta:
        'Contamos con estos **servicios**:\n\n' +
        '• 🚌 Movilidad escolar (según zona, desde S/ 180 mensuales)\n' +
        '• 🍽️ Comedor con menú supervisado por nutricionista\n' +
        '• 🩺 Tópico con enfermera permanente\n' +
        '• 🧠 Departamento de psicología',
    },
    {
      titulo: 'Alumnos por aula',
      palabras: ['alumnos por', 'por aula', 'por salon', 'cuantos alumnos', 'cuantos ninos', 'tamano de', 'alumnos hay'],
      respuesta: 'Tenemos un máximo de **25 alumnos por aula** (20 en Inicial). En Inicial, 1.° y 2.° grado cada aula tiene tutora y auxiliar. 👩‍🏫',
    },
    {
      titulo: 'Visita',
      accion: 'datos',
      palabras: ['visita', 'conocer el colegio', 'conocer las instalaciones', 'recorrido', 'ir a ver', 'agendar', 'cita'],
      respuesta: '¡Nos encantaría recibirle! 🏫 Las visitas guiadas son de **lunes a viernes a las 9:00 a.m. y 3:00 p.m.**, y los sábados a las 10:00 a.m. Duran unos 45 minutos.',
    },
    {
      titulo: 'Ubicación y contacto',
      palabras: ['donde', 'ubica', 'direccion', 'queda', 'telefono', 'correo', 'email', 'contacto', 'como llego', 'llegar'],
      respuesta:
        '📍 Estamos en **Av. Los Álamos 1250, Santiago de Surco** (a 2 cuadras del parque principal).\n' +
        '📞 Teléfono: (01) 555-0123\n' +
        '✉️ admision@colegiolosalamos.edu.pe\n\n' +
        'Oficina de admisión: lunes a viernes 8:00–16:00 y sábados 9:00–12:00.',
    },
    {
      titulo: 'Inscripción',
      accion: 'datos',
      palabras: ['inscrib', 'matricular', 'separar', 'reservar', 'postular', 'que me llamen', 'llamenme', 'que me contacten', 'contactenme', 'contacten', 'asesor', 'quiero informacion'],
    },
    {
      titulo: 'Gracias',
      baja: true,
      ofrecerDatos: true,
      palabras: ['gracias', 'muy amable', 'excelente', 'genial', 'entendido'],
      respuesta: '¡Con mucho gusto! 😊',
    },
    {
      titulo: 'Otra consulta',
      baja: true,
      palabras: ['otra consulta', 'otra pregunta', 'tengo otra', 'otra duda', 'algo mas', 'mas informacion'],
      respuesta: 'Claro, ¿qué más le gustaría saber? 😊',
    },
    {
      titulo: 'Despedida',
      baja: true,
      palabras: ['adios', 'chau', 'chao', 'hasta luego', 'bye', 'nos vemos'],
      respuesta: '¡Hasta pronto! 👋 Que tenga un excelente día.',
    },
  ],

  fallback: {
    texto:
      'Disculpe, no tengo esa información a la mano 🙏. Puedo ayudarle con **vacantes, pensiones, horarios, requisitos** o agendar una **visita**. ' +
      'Si prefiere, la coordinadora de admisión puede llamarle.',
  },

  lead: {
    despuesDe: 3,
    oferta: '¿Le gustaría que la **coordinadora de admisión** le contacte para separar la vacante y agendar una visita? 📅',
    intro: '¡Perfecto! Solo necesito dos datos para que la coordinadora le contacte. 😊',
    consentimiento: 'Al enviar sus datos acepta ser contactado(a) por el Colegio Los Álamos con fines de admisión (Ley N.° 29733).',
    extra: { pregunta: 'Por último, ¿para qué **nivel** es la vacante?', opciones: ['Inicial', 'Primaria', 'Secundaria'], etiqueta: 'Nivel' },
    gracias:
      '¡Listo, {nombre}! ✅ Registré sus datos. La coordinadora de admisión le escribirá **hoy mismo** para separar la vacante de {interes}.',
    yaRegistrado: 'Ya tengo sus datos registrados, {nombre} 😊. La coordinadora le contactará muy pronto.',
    whatsappTexto: 'Hola, soy {nombreCompleto}. Me interesa la admisión 2027 para {interes}. Mi celular es {celular}.',
  },

  // Guion de la demo automática (botón "Reproducir demo" o ?demo=1). Dura ~30 s.
  // Si un texto coincide con un botón de sugerencia, la demo lo "presiona".
  demo: [
    '¿Tienen vacantes para primer grado?',
    '¿Cuánto es la pensión?',
    '¿Qué requisitos piden? ¿Y el horario?',
    'Sí, que me contacten',
    'María Fernández',
    '987 654 321',
    'Primaria',
  ],
};
