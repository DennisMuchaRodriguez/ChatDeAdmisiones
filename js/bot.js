/*
 * Motor del chatbot de admisiones / informes.
 *
 * No usa IA ni servidor: detecta de qué habla cada mensaje (su "intención")
 * buscando palabras clave, y responde con los datos que están en la
 * configuración del cliente (js/configs/*.js).
 *
 * Al final guía a la persona para dejar nombre y celular (el "lead").
 * Funciona igual en el navegador y en Node (lo usan las pruebas de tests/).
 */
(function (raiz) {
  'use strict';

  // Textos por defecto de la captura de datos. Cada cliente puede cambiarlos en config.lead.
  const LEAD_POR_DEFECTO = {
    despuesDe: 3, // cuántas preguntas respondidas antes de ofrecer que le contacten
    oferta: '¿Le gustaría que un asesor le contacte para darle más detalles? 📅',
    opcionesOferta: ['Sí, que me contacten', 'Tengo otra consulta'],
    intro: '¡Perfecto! Solo necesito dos datos para que le contacten. 😊',
    pedirNombre: '¿Cuál es su **nombre y apellido**?',
    consentimiento: '',
    nombreInvalido: 'Disculpe, ¿me podría escribir su **nombre y apellido**? (solo letras)',
    repetirNombre: 'Para continuar, ¿me indica su **nombre y apellido**?',
    pedirCelular: 'Gracias, {nombre}. ¿A qué **número de celular** le podemos llamar o escribir por WhatsApp?',
    formatoCelular: '^9\\d{8}$', // Perú: 9 dígitos que empiezan con 9
    codigoPais: '51',
    celularInvalido: 'Ese número no parece válido 🤔. Debe tener **9 dígitos** y empezar con 9 (ej. 987 654 321). ¿Me lo podría escribir de nuevo?',
    extra: null, // pregunta opcional al final, ej. { pregunta, opciones, etiqueta }
    gracias: '¡Listo, {nombre}! ✅ Registré sus datos. Le contactaremos muy pronto.',
    yaRegistrado: 'Ya tengo sus datos registrados, {nombre} 😊. Le contactaremos muy pronto.',
    rechazado: 'Sin problema 😊. Si más adelante desea que le contactemos, solo escriba **"quiero que me contacten"**. ¿Algo más en lo que le pueda ayudar?',
    cancelado: 'Entendido, no hay problema 😊. ¿En qué más le puedo ayudar?',
    whatsappTexto: 'Hola, soy {nombreCompleto}. Quisiera más información ({interes}). Mi celular es {celular}.',
  };

  const AFIRMACIONES = ['si', 'claro', 'ok', 'okey', 'dale', 'bueno', 'ya', 'por favor', 'de acuerdo', 'perfecto', 'me parece bien'];
  const NEGACIONES = ['no', 'no gracias', 'ahora no', 'despues', 'luego', 'mas tarde', 'todavia no', 'aun no'];
  const CANCELAR = ['cancelar', 'ahora no', 'no gracias', 'no', 'despues', 'mas tarde', 'salir'];

  /** "¿Cuánto es la PENSIÓN?" -> "cuanto es la pension" */
  function normalizar(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita tildes (y la ~ de la ñ)
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Puntaje de una intención para un texto ya normalizado.
   * Cada palabra clave encontrada suma 2 puntos; las "débiles" (con ~ delante) suman 1.
   * Las claves se buscan al inicio de palabra, así "pension" encuentra "pensiones".
   */
  function puntuar(textoNormalizado, intencion) {
    const texto = ' ' + textoNormalizado;
    let puntos = 0;
    for (const palabra of intencion.palabras || []) {
      const debil = palabra.startsWith('~');
      const clave = normalizar(debil ? palabra.slice(1) : palabra);
      if (clave && texto.includes(' ' + clave)) puntos += debil ? 1 : 2;
    }
    return puntos;
  }

  /**
   * Devuelve las intenciones que mejor encajan (máximo 2, para preguntas dobles como
   * "¿qué requisitos piden y cuál es el horario?").
   * Las intenciones "baja" (saludo, gracias…) solo cuentan si no hay otra.
   */
  function detectarIntenciones(texto, intenciones) {
    const tn = normalizar(texto);
    const encontradas = intenciones
      .map((intencion, orden) => ({ intencion, orden, puntos: puntuar(tn, intencion) }))
      .filter((x) => x.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos || a.orden - b.orden);

    const importantes = encontradas.filter((x) => !x.intencion.baja);
    const candidatas = importantes.length ? importantes : encontradas;
    if (!candidatas.length) return [];

    const fuertes = candidatas.filter((x) => x.puntos >= 2);
    return (fuertes.length ? fuertes : [candidatas[0]]).slice(0, 2).map((x) => x.intencion);
  }

  function capitalizar(nombre) {
    return nombre
      .split(' ')
      .map((p) => p.charAt(0).toLocaleUpperCase('es') + p.slice(1).toLocaleLowerCase('es'))
      .join(' ');
  }

  function crearBot(config) {
    const lead = Object.assign({}, LEAD_POR_DEFECTO, config.lead);
    const formatoCelular = new RegExp(lead.formatoCelular);

    const estado = {
      fase: 'chat', // chat | nombre | celular | extra
      respondidas: 0,
      sinRespuesta: 0,
      temas: [], // temas consultados, se guardan con el lead
      ofrecido: false,
      esperandoSiNo: false,
      capturado: false,
      datos: {},
    };

    const mensaje = (texto, extra) => Object.assign({ texto: rellenar(texto) }, extra);

    function rellenar(plantilla, datos) {
      const d = datos || estado.datos;
      return String(plantilla || '')
        .replace(/\{nombre\}/g, (d.nombre || '').split(' ')[0])
        .replace(/\{nombreCompleto\}/g, d.nombre || '')
        .replace(/\{celular\}/g, d.celular || '')
        .replace(/\{interes\}/g, d.interes || config.tipo)
        .replace(/\{institucion\}/g, config.nombre)
        .replace(/\{asistente\}/g, (config.asistente || {}).nombre || '');
    }

    /** Sugerencias iniciales que aún no se han consultado. */
    function sugerenciasRestantes() {
      const quedan = (config.sugerenciasIniciales || []).filter((s) => {
        const intencion = detectarIntenciones(s, config.intenciones)[0];
        if (!intencion) return true;
        if (estado.capturado && intencion.accion === 'datos') return false;
        return !estado.temas.includes(intencion.titulo);
      });
      if (quedan.length) return quedan;
      return estado.capturado ? [] : [lead.opcionesOferta[0]];
    }

    function ofrecer(salida) {
      estado.ofrecido = true;
      estado.esperandoSiNo = true;
      salida.push(mensaje(lead.oferta, { sugerencias: lead.opcionesOferta }));
    }

    function iniciarCaptura(salida) {
      estado.esperandoSiNo = false;
      if (estado.capturado) {
        salida.push(mensaje(lead.yaRegistrado, { sugerencias: sugerenciasRestantes() }));
        return salida;
      }
      estado.fase = 'nombre';
      salida.push(mensaje(lead.intro));
      salida.push(mensaje(lead.pedirNombre, { nota: lead.consentimiento, sugerencias: ['Ahora no'] }));
      return salida;
    }

    function finalizar(salida) {
      estado.fase = 'chat';
      estado.capturado = true;
      const registro = {
        cliente: config.id,
        nombre: estado.datos.nombre,
        celular: estado.datos.celular,
        interes: estado.datos.interes || '',
        temas: estado.temas.slice(),
        fecha: new Date().toISOString(),
      };
      salida.push(mensaje(lead.gracias, { lead: registro }));
      return salida;
    }

    function preguntarExtraOFinalizar(salida) {
      if (lead.extra) {
        estado.fase = 'extra';
        salida.push(mensaje(lead.extra.pregunta, { sugerencias: lead.extra.opciones }));
        return salida;
      }
      return finalizar(salida);
    }

    /** Respuestas a las intenciones detectadas. Devuelve si alguna pide los datos. */
    function responderIntenciones(intenciones, salida) {
      let pideDatos = false;
      for (const intencion of intenciones) {
        if (intencion.respuesta) salida.push(mensaje(intencion.respuesta));
        if (intencion.accion === 'datos') pideDatos = true;
        if (!intencion.baja) {
          estado.respondidas++;
          if (intencion.titulo && !estado.temas.includes(intencion.titulo)) estado.temas.push(intencion.titulo);
        }
      }
      return pideDatos;
    }

    // ---- Fases de la conversación -------------------------------------------

    function pasoNombre(texto) {
      const salida = [];
      // Si en lugar del nombre hace una pregunta, la respondemos y volvemos a pedir el nombre.
      if (texto.includes('?')) {
        const intenciones = detectarIntenciones(texto, config.intenciones).filter((i) => i.accion !== 'datos');
        if (intenciones.length) {
          responderIntenciones(intenciones, salida);
          salida.push(mensaje(lead.repetirNombre, { sugerencias: ['Ahora no'] }));
          return salida;
        }
      }
      const nombre = texto
        .trim()
        .replace(/^(hola[, ]+)?(me llamo|mi nombre es|yo soy|soy)\s+/i, '')
        .replace(/[.!]+$/, '')
        .replace(/\s+/g, ' ');
      if (!/^\p{L}[\p{L}' .-]{1,59}$/u.test(nombre)) {
        salida.push(mensaje(lead.nombreInvalido, { sugerencias: ['Ahora no'] }));
        return salida;
      }
      estado.datos.nombre = capitalizar(nombre);
      estado.fase = 'celular';
      salida.push(mensaje(lead.pedirCelular, { sugerencias: ['Ahora no'] }));
      return salida;
    }

    function pasoCelular(texto) {
      const salida = [];
      let digitos = texto.replace(/\D/g, '');
      if (!formatoCelular.test(digitos) && lead.codigoPais && digitos.startsWith(lead.codigoPais)) {
        digitos = digitos.slice(lead.codigoPais.length); // acepta "+51 987 654 321"
      }
      if (!formatoCelular.test(digitos)) {
        salida.push(mensaje(lead.celularInvalido, { sugerencias: ['Ahora no'] }));
        return salida;
      }
      estado.datos.celular = digitos;
      return preguntarExtraOFinalizar(salida);
    }

    function pasoExtra(texto) {
      const tn = normalizar(texto);
      const opcion = (lead.extra.opciones || []).find((o) => normalizar(o) === tn);
      estado.datos.interes = opcion || texto.trim().slice(0, 80);
      return finalizar([]);
    }

    function pasoChat(texto, tn) {
      const salida = [];

      // Respuesta a "¿Le gustaría que le contactemos?"
      if (estado.esperandoSiNo) {
        estado.esperandoSiNo = false;
        if (AFIRMACIONES.includes(tn) || tn.startsWith('si ')) return iniciarCaptura(salida);
        if (NEGACIONES.includes(tn)) {
          salida.push(mensaje(lead.rechazado, { sugerencias: sugerenciasRestantes() }));
          return salida;
        }
      }

      const intenciones = detectarIntenciones(texto, config.intenciones);

      if (!intenciones.length) {
        estado.sinRespuesta++;
        salida.push(mensaje(config.fallback.texto, { sugerencias: config.fallback.sugerencias || sugerenciasRestantes() }));
        if (estado.sinRespuesta >= 2 && !estado.capturado) {
          estado.sinRespuesta = 0;
          ofrecer(salida);
        }
        return salida;
      }

      estado.sinRespuesta = 0;
      if (responderIntenciones(intenciones, salida)) return iniciarCaptura(salida);

      const quiereOferta = intenciones.some((i) => i.ofrecerDatos);
      const tocaOferta = !estado.ofrecido && estado.respondidas >= lead.despuesDe;
      if (!estado.capturado && (quiereOferta || tocaOferta)) {
        ofrecer(salida);
      } else {
        const ultimo = salida[salida.length - 1];
        ultimo.sugerencias = intenciones[intenciones.length - 1].sugerencias || sugerenciasRestantes();
      }
      return salida;
    }

    /** Recibe el texto del usuario y devuelve la lista de mensajes del bot. */
    function responder(texto) {
      const tn = normalizar(texto);
      if (!tn) return [];

      if (estado.fase !== 'chat' && CANCELAR.includes(tn)) {
        estado.fase = 'chat';
        return [mensaje(lead.cancelado, { sugerencias: sugerenciasRestantes() })];
      }
      if (estado.fase === 'nombre') return pasoNombre(texto);
      if (estado.fase === 'celular') return pasoCelular(texto);
      if (estado.fase === 'extra') return pasoExtra(texto);
      return pasoChat(texto, tn);
    }

    function bienvenida() {
      const textos = config.bienvenida;
      return textos.map((t, i) => mensaje(t, i === textos.length - 1 ? { sugerencias: config.sugerenciasIniciales } : {}));
    }

    return {
      bienvenida,
      responder,
      estado,
      textoWhatsapp: (registro) => rellenar(lead.whatsappTexto, registro),
    };
  }

  const api = { crearBot, normalizar, detectarIntenciones };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else raiz.Bot = api;
})(globalThis);
