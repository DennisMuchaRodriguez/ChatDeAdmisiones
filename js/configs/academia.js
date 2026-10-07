/*
 * Configuración de un cliente: ACADEMIA PREUNIVERSITARIA (datos de ejemplo, ficticios).
 * Misma estructura que colegio.js: solo cambian los textos y las palabras clave.
 */
(globalThis.CONFIGS = globalThis.CONFIGS || {}).academia = {
  id: 'academia',
  tipo: 'Academia',
  nombre: 'Academia Pre Cumbre',
  eslogan: 'Preparación preuniversitaria para UNI, San Marcos y Católica',
  logo: '📚',
  colores: { primario: '#7c3aed', oscuro: '#2e1065', acento: '#f97316' },
  asistente: { nombre: 'Diego', rol: 'Asesor de Matrícula', avatar: '🧑🏻‍💻' },

  whatsapp: '',
  webhookUrl: '',

  destacados: [
    { icono: '🏆', titulo: '+1,200 ingresantes', texto: 'En los últimos 5 años' },
    { icono: '📝', titulo: 'Simulacros semanales', texto: 'Con ranking y solucionario' },
    { icono: '💻', titulo: 'Presencial o virtual', texto: 'Clases en vivo y grabadas' },
  ],
  contacto: [
    '📍 Jr. Las Cumbres 455, Cercado de Lima',
    '📞 (01) 555-0456',
    '🕘 Informes: lunes a sábado 8:00–20:00',
  ],

  bienvenida: [
    '¡Hola! 👋 Soy **Diego**, asesor virtual de la **Academia Pre Cumbre**.',
    'Te ayudo con **ciclos, vacantes, precios, horarios y requisitos**. ¿Qué te gustaría saber?',
  ],
  sugerenciasIniciales: ['Ciclos y vacantes', 'Precios', 'Horarios', 'Requisitos', 'Clase de prueba'],

  intenciones: [
    {
      titulo: 'Saludo',
      baja: true,
      palabras: ['hola', 'buenas', 'buenos dias', 'buen dia', 'saludos', 'que tal'],
      respuesta: '¡Hola! 😊 ¿A qué universidad estás postulando? Te cuento todo sobre nuestros ciclos.',
    },
    {
      titulo: 'Ciclos y vacantes',
      palabras: ['ciclo', 'vacante', 'cupo', 'disponib', 'quedan', 'cuando empieza', 'inicio', 'empiezan'],
      respuesta:
        '📅 **Ciclos que inician pronto:**\n\n' +
        '• **Ciclo Intensivo UNI** – inicia 3 de noviembre (14 vacantes)\n' +
        '• **Ciclo San Marcos** – inicia 10 de noviembre (22 vacantes)\n' +
        '• **Ciclo Escolar** (4.° y 5.° de secundaria) – inicia 17 de noviembre (18 vacantes)\n\n' +
        'Las aulas son de máximo 35 alumnos.',
    },
    {
      titulo: 'Precios',
      palabras: ['precio', 'costo', 'cuesta', 'pension', 'mensualidad', 'pago', 'pagar', 'cuota', 'matricula', 'descuento', 'beca', '~cuanto'],
      respuesta:
        '💰 **Inversión por ciclo:**\n\n' +
        '• Ciclo Intensivo UNI (4 meses): **S/ 1,400** o 4 cuotas de S/ 380\n' +
        '• Ciclo San Marcos (4 meses): **S/ 1,200** o 4 cuotas de S/ 330\n' +
        '• Ciclo Escolar (3 meses): **S/ 750** o 3 cuotas de S/ 270\n\n' +
        'Matrícula: S/ 100 · 🎁 Media beca para los primeros puestos del examen de becas.',
    },
    {
      titulo: 'Horarios',
      palabras: ['horario', 'hora', 'turno', 'en la manana', 'en la tarde', 'en la noche', 'dias de clase', 'que dias'],
      respuesta:
        '🕗 **Turnos disponibles** (lunes a sábado):\n\n' +
        '• Mañana: 7:30 a.m. – 1:00 p.m.\n' +
        '• Tarde: 2:00 p.m. – 7:30 p.m.\n' +
        '• Virtual en vivo: 6:00 p.m. – 10:00 p.m.\n\n' +
        'Todas las clases quedan grabadas en el aula virtual.',
    },
    {
      titulo: 'Requisitos',
      palabras: ['requisit', 'document', 'papeles', 'que necesito', 'que piden', 'como me inscribo', 'como me matriculo'],
      respuesta:
        '📋 Para matricularte solo necesitas:\n\n' +
        '• Copia de DNI\n' +
        '• Certificado o constancia de estudios (o libreta de 5.° de secundaria)\n' +
        '• 1 foto tamaño carné\n\n' +
        'Si eres menor de edad, la matrícula la firma tu padre, madre o apoderado.',
    },
    {
      titulo: 'Simulacros',
      palabras: ['simulacro', 'examen', 'evaluacion', 'ranking', 'material', 'libro', 'separata'],
      respuesta: '📝 Rendimos **simulacros tipo admisión cada sábado**, con ranking y solucionario en video. El material (separatas y banco de preguntas) está incluido en el precio.',
    },
    {
      titulo: 'Modalidad',
      palabras: ['virtual', 'online', 'presencial', 'a distancia', 'zoom', 'grabad', 'modalidad'],
      respuesta: '💻 Puedes estudiar **presencial o virtual**. Las clases virtuales son en vivo y quedan grabadas, y tienes acceso a asesorías por WhatsApp con los profesores.',
    },
    {
      titulo: 'Clase de prueba',
      accion: 'datos',
      palabras: ['clase de prueba', 'clase gratis', 'prueba gratis', 'probar', 'visita', 'conocer'],
      respuesta: '¡Claro! Puedes asistir a una **clase de prueba gratuita** en cualquier turno esta semana. 🎓',
    },
    {
      titulo: 'Ubicación',
      palabras: ['donde', 'ubica', 'direccion', 'queda', 'telefono', 'llegar', 'local', 'sede'],
      respuesta: '📍 Nuestra sede está en **Jr. Las Cumbres 455, Cercado de Lima** (a 3 cuadras de la Plaza Dos de Mayo).\n📞 (01) 555-0456',
    },
    {
      titulo: 'Inscripción',
      accion: 'datos',
      palabras: ['inscrib', 'matricular', 'separar', 'reservar', 'que me llamen', 'que me contacten', 'contacten', 'llamenme', 'asesor'],
    },
    {
      titulo: 'Gracias',
      baja: true,
      ofrecerDatos: true,
      palabras: ['gracias', 'muy amable', 'excelente', 'genial', 'entendido', 'chevere', 'bacan'],
      respuesta: '¡De nada! 😊',
    },
    {
      titulo: 'Otra consulta',
      baja: true,
      palabras: ['otra consulta', 'otra pregunta', 'tengo otra', 'otra duda', 'algo mas'],
      respuesta: 'Claro, ¿qué más te gustaría saber? 😊',
    },
    {
      titulo: 'Despedida',
      baja: true,
      palabras: ['adios', 'chau', 'chao', 'hasta luego', 'bye', 'nos vemos'],
      respuesta: '¡Éxitos en tu preparación! 💪 Aquí estaré si tienes más dudas.',
    },
  ],

  fallback: {
    texto: 'Uy, esa información no la tengo 🙏. Puedo ayudarte con **ciclos, precios, horarios, requisitos** o reservar una **clase de prueba gratis**. También un asesor puede llamarte.',
  },

  lead: {
    despuesDe: 3,
    oferta: '¿Quieres que un **asesor de matrícula** te contacte para separar tu vacante (y tu clase de prueba gratis)? 🎓',
    intro: '¡Genial! Solo necesito dos datos para que un asesor te contacte. 😊',
    pedirNombre: '¿Cuál es tu **nombre y apellido**?',
    nombreInvalido: '¿Me podrías escribir tu **nombre y apellido**? (solo letras)',
    repetirNombre: 'Para continuar, ¿me dices tu **nombre y apellido**?',
    pedirCelular: 'Gracias, {nombre}. ¿A qué **número de celular** te podemos escribir por WhatsApp?',
    celularInvalido: 'Ese número no parece válido 🤔. Debe tener **9 dígitos** y empezar con 9. ¿Me lo escribes de nuevo?',
    consentimiento: 'Al enviar tus datos aceptas ser contactado(a) por Academia Pre Cumbre con fines informativos (Ley N.° 29733).',
    extra: { pregunta: 'Por último, ¿a qué **universidad** postulas?', opciones: ['UNI', 'San Marcos', 'Católica', 'Otra'], etiqueta: 'Universidad' },
    gracias: '¡Listo, {nombre}! ✅ Un asesor te escribirá **en menos de 1 hora** para separar tu vacante en el ciclo {interes}.',
    yaRegistrado: 'Ya tengo tus datos, {nombre} 😊. Un asesor te escribirá muy pronto.',
    rechazado: 'Sin problema 😊. Si luego quieres que te contactemos, escribe **"quiero inscribirme"**. ¿Algo más?',
    cancelado: 'Entendido 😊. ¿En qué más te puedo ayudar?',
    whatsappTexto: 'Hola, soy {nombreCompleto}. Quiero información del ciclo {interes}. Mi celular es {celular}.',
  },

  demo: [
    'Hola, ¿cuándo empiezan los ciclos?',
    '¿Cuánto cuesta el de San Marcos?',
    '¿Qué horarios tienen?',
    'Sí, que me contacten',
    'Lucía Ramos',
    '956 123 478',
    'San Marcos',
  ],
};
