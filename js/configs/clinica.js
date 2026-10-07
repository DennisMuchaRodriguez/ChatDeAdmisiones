/*
 * Configuración de un cliente: CLÍNICA / POLICLÍNICO (datos de ejemplo, ficticios).
 * Misma estructura que colegio.js. Aquí las "vacantes" son citas disponibles.
 * Importante en salud: el bot da información administrativa, nunca diagnósticos.
 */
(globalThis.CONFIGS = globalThis.CONFIGS || {}).clinica = {
  id: 'clinica',
  tipo: 'Clínica',
  nombre: 'Clínica Vida Sana',
  eslogan: 'Más de 15 especialidades con atención el mismo día',
  logo: '🩺',
  colores: { primario: '#0d9488', oscuro: '#134e4a', acento: '#f43f5e' },
  asistente: { nombre: 'Valeria', rol: 'Asistente de Citas', avatar: '👩🏻‍⚕️' },

  whatsapp: '',
  webhookUrl: '',

  destacados: [
    { icono: '📅', titulo: 'Citas el mismo día', texto: 'En medicina general y pediatría' },
    { icono: '🧪', titulo: 'Laboratorio propio', texto: 'Resultados en 24 horas' },
    { icono: '🛡️', titulo: 'Aceptamos seguros', texto: 'EPS y principales seguros privados' },
  ],
  contacto: [
    '📍 Av. La Salud 870, Los Olivos, Lima',
    '📞 (01) 555-0789',
    '🕘 Lunes a sábado 7:00–21:00 · domingos 8:00–14:00',
  ],

  bienvenida: [
    '¡Hola! 👋 Soy **Valeria**, la asistente virtual de la **Clínica Vida Sana**.',
    'Le ayudo con **citas disponibles, precios, horarios, especialidades y requisitos**. ¿Qué necesita?',
  ],
  sugerenciasIniciales: ['Citas disponibles', 'Precios', 'Horarios', 'Especialidades', 'Seguros'],

  intenciones: [
    {
      titulo: 'Emergencia',
      palabras: ['emergencia', 'urgencia', 'urgente', 'sangrado', 'sangrando', 'desmay', 'no puedo respirar', 'dolor fuerte', 'accidente'],
      respuesta:
        '🚨 Si es una **emergencia**, no espere: acuda a nuestra área de **Emergencias 24 horas** (Av. La Salud 870) o llame al **106 (SAMU)**.\n\n' +
        'Por este chat no podemos dar diagnósticos ni indicaciones médicas.',
      sugerencias: ['Ubicación', 'Citas disponibles'],
    },
    {
      titulo: 'Saludo',
      baja: true,
      palabras: ['hola', 'buenas', 'buenos dias', 'buen dia', 'saludos', 'que tal'],
      respuesta: '¡Hola! 😊 Con gusto le ayudo. ¿Con qué especialidad desea atenderse?',
    },
    {
      titulo: 'Citas disponibles',
      palabras: ['disponib', 'turno', 'cupo', 'vacante', 'hay cita', 'hay citas', 'para hoy', 'para manana', 'atienden hoy'],
      respuesta:
        '📅 **Disponibilidad de esta semana:**\n\n' +
        '• Medicina general: **hoy** desde las 4:00 p.m.\n' +
        '• Pediatría: **hoy** desde las 5:30 p.m.\n' +
        '• Ginecología: mañana desde las 9:00 a.m.\n' +
        '• Odontología: mañana desde las 10:00 a.m.\n' +
        '• Cardiología: jueves desde las 3:00 p.m.',
    },
    {
      titulo: 'Precios',
      palabras: ['precio', 'costo', 'cuesta', 'tarifa', 'pagar', 'pago', 'consulta cuesta', 'valor', '~cuanto', '~sale'],
      respuesta:
        '💰 **Precios de consulta (particular):**\n\n' +
        '• Medicina general: **S/ 60**\n' +
        '• Pediatría: **S/ 80**\n' +
        '• Ginecología: **S/ 90**\n' +
        '• Cardiología: **S/ 120** (incluye electrocardiograma)\n' +
        '• Odontología – evaluación: **S/ 40**\n\n' +
        'Aceptamos efectivo, tarjetas, Yape y Plin.',
    },
    {
      titulo: 'Horarios',
      palabras: ['horario', 'hora', 'atienden', 'abren', 'cierran', 'domingo', 'feriado'],
      respuesta:
        '🕗 **Horario de atención:**\n\n' +
        '• Lunes a sábado: 7:00 a.m. – 9:00 p.m.\n' +
        '• Domingos y feriados: 8:00 a.m. – 2:00 p.m.\n' +
        '• Laboratorio (toma de muestras): 7:00 – 11:00 a.m.\n' +
        '• Emergencias: 24 horas',
    },
    {
      titulo: 'Especialidades',
      // Los nombres de especialidades son débiles (~) para que "¿hay citas de pediatría?" responda con la disponibilidad.
      palabras: ['especialidad', 'especialista', 'doctor', 'medico', '~pediatr', '~ginecolog', '~cardiolog', '~odontolog', '~dentista', '~dermatolog', '~traumatolog', '~psicolog', '~nutricion', '~ecograf', '~laboratorio', '~rayos x'],
      respuesta:
        '🩺 **Especialidades:** medicina general, pediatría, ginecología y obstetricia, cardiología, dermatología, traumatología, odontología, psicología y nutrición.\n\n' +
        'También tenemos **laboratorio clínico, ecografías y rayos X**.',
    },
    {
      titulo: 'Requisitos',
      palabras: ['requisit', 'document', 'que necesito', 'que debo llevar', 'que llevo', 'ayuno', 'ayunas', 'orden medica', 'dni'],
      respuesta:
        '📋 **Para su cita solo traiga:**\n\n' +
        '• DNI (o carné de extranjería) del paciente\n' +
        '• Si usa seguro: su carné o código de afiliado\n' +
        '• Para análisis de sangre: **8 horas de ayuno**\n' +
        '• Exámenes o recetas anteriores, si los tiene\n\n' +
        'Le recomendamos llegar 15 minutos antes.',
    },
    {
      titulo: 'Seguros',
      palabras: ['seguro', 'eps', 'aseguradora', 'convenio', 'cobertura', 'sis', 'essalud', 'plan de salud'],
      respuesta: '🛡️ Trabajamos con las **principales EPS y seguros privados**. Al pedir su cita indíquenos su seguro y le confirmamos la cobertura y el copago. Por ahora no atendemos por SIS ni EsSalud.',
    },
    {
      titulo: 'Ubicación',
      palabras: ['donde', 'ubica', 'direccion', 'queda', 'telefono', 'llegar', 'estacionamiento', 'sede'],
      respuesta: '📍 Estamos en **Av. La Salud 870, Los Olivos** (frente al parque Las Flores). Contamos con estacionamiento gratuito.\n📞 (01) 555-0789',
    },
    {
      titulo: 'Agendar cita',
      accion: 'datos',
      palabras: ['agendar', 'reservar', 'separar', 'sacar cita', 'pedir cita', 'quiero una cita', 'quiero cita', 'programar', 'que me llamen', 'que me contacten', 'contacten', 'llamenme'],
    },
    {
      titulo: 'Gracias',
      baja: true,
      ofrecerDatos: true,
      palabras: ['gracias', 'muy amable', 'excelente', 'genial', 'entendido'],
      respuesta: '¡Con gusto! 😊',
    },
    {
      titulo: 'Otra consulta',
      baja: true,
      palabras: ['otra consulta', 'otra pregunta', 'tengo otra', 'otra duda', 'algo mas'],
      respuesta: 'Claro, ¿en qué más le puedo ayudar? 😊',
    },
    {
      titulo: 'Despedida',
      baja: true,
      palabras: ['adios', 'chau', 'chao', 'hasta luego', 'bye', 'nos vemos'],
      respuesta: '¡Hasta pronto! 👋 Cuídese mucho.',
    },
  ],

  fallback: {
    texto: 'Disculpe, no tengo esa información 🙏. Puedo ayudarle con **citas disponibles, precios, horarios, especialidades, seguros** o separarle una cita. Recuerde que por este medio no damos diagnósticos.',
  },

  lead: {
    despuesDe: 3,
    oferta: '¿Desea que le **separemos una cita**? Una asistente le confirmará el horario por WhatsApp. 📅',
    opcionesOferta: ['Sí, separar cita', 'Tengo otra consulta'],
    intro: '¡Perfecto! Solo necesito dos datos para separar su cita. 😊',
    pedirNombre: '¿Cuál es el **nombre y apellido** del paciente?',
    repetirNombre: 'Para continuar, ¿me indica el **nombre y apellido** del paciente?',
    consentimiento: 'Al enviar sus datos acepta ser contactado(a) por Clínica Vida Sana para la gestión de su cita (Ley N.° 29733).',
    extra: { pregunta: 'Por último, ¿con qué **especialidad** desea la cita?', opciones: ['Medicina general', 'Pediatría', 'Ginecología', 'Odontología', 'Otra'], etiqueta: 'Especialidad' },
    gracias: '¡Listo! ✅ Registré la solicitud de cita de **{nombreCompleto}** en {interes}. Una asistente le confirmará el horario por WhatsApp en los próximos minutos.',
    yaRegistrado: 'Ya tengo su solicitud registrada 😊. Le confirmaremos el horario muy pronto.',
    rechazado: 'Sin problema 😊. Si luego desea una cita, solo escriba **"quiero una cita"**. ¿Algo más en lo que le pueda ayudar?',
    whatsappTexto: 'Hola, soy {nombreCompleto}. Quisiera separar una cita de {interes}. Mi celular es {celular}.',
  },

  demo: [
    '¿Hay citas para pediatría hoy?',
    '¿Cuánto cuesta la consulta?',
    '¿Aceptan seguros?',
    'Sí, separar cita',
    'Carlos Mendoza',
    '912 345 678',
    'Pediatría',
  ],
};
