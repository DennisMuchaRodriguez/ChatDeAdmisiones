/*
 * Interfaz del chat: pinta la página con los datos del cliente, muestra los mensajes
 * con animación de "escribiendo…", guarda los leads y reproduce la demo automática.
 *
 * Parámetros de la URL:
 *   ?cliente=colegio|academia|clinica   qué configuración cargar (por defecto: la primera)
 *   ?demo=1                             reproduce la conversación de demo al abrir
 *   ?ritmo=1.5                          demo más lenta (2 = el doble de pausa entre mensajes)
 *   ?modo=widget                        solo el chat a pantalla completa (para el widget o grabar en vertical)
 *   ?limpio=1                           oculta la barra negra de la demo
 */
(function () {
  'use strict';

  const params = new URLSearchParams(location.search);
  const CONFIGS = globalThis.CONFIGS || {};
  // Si no se indica ?cliente=, se usa la primera configuración cargada en index.html.
  const idCliente = CONFIGS[params.get('cliente')] ? params.get('cliente') : Object.keys(CONFIGS)[0];
  const config = CONFIGS[idCliente];
  const modoWidget = params.get('modo') === 'widget';
  // Con una sola configuración (la web entregada a un cliente) la barra de demo no aparece.
  const sinBarra = modoWidget || params.get('limpio') === '1' || Object.keys(CONFIGS).length < 2;
  const ritmo = Math.min(4, Math.max(0.5, Number(params.get('ritmo')) || 1));

  const $ = (selector) => document.querySelector(selector);
  const elMensajes = $('#mensajes');
  const elSugerencias = $('#sugerencias');
  const elEntrada = $('#entrada');
  const elEnviar = $('#enviar');
  const conMouse = window.matchMedia('(pointer: fine)').matches;

  let bot = null;
  let ocupado = false; // true mientras el bot "escribe"
  let generacion = 0; // aumenta al reiniciar: así se cancelan respuestas y demos pendientes
  let demoActiva = false;

  const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

  // ---- Utilidades ------------------------------------------------------------

  function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  }

  /** Escapa el HTML y convierte **negrita** y saltos de línea. */
  function formatear(texto) {
    return escapar(texto).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  const formatearCelular = (digitos) => digitos.replace(/(\d{3})(?=\d)/g, '$1 ');

  function crear(etiqueta, clase, html) {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (html != null) elemento.innerHTML = html;
    return elemento;
  }

  // ---- Página ----------------------------------------------------------------

  function aplicarTema() {
    const estilo = document.documentElement.style;
    estilo.setProperty('--primario', config.colores.primario);
    estilo.setProperty('--oscuro', config.colores.oscuro);
    estilo.setProperty('--acento', config.colores.acento);
    document.title = `${config.nombre} · ${config.asistente.rol}`;
    if (modoWidget) document.body.classList.add('widget');
  }

  function pintarBarraDemo() {
    const barra = $('#barraDemo');
    if (sinBarra) return barra.remove();
    const clientes = Object.values(CONFIGS)
      .map((c) => `<a href="?cliente=${c.id}" class="${c.id === idCliente ? 'activo' : ''}">${c.logo} ${escapar(c.tipo)}</a>`)
      .join('');
    barra.innerHTML = `
      <span class="etiqueta">DEMO</span>${clientes}
      <span class="espacio"></span>
      <button type="button" id="btnDemo" class="principal">▶ Reproducir demo</button>
      <a href="leads.html?cliente=${idCliente}">📋 Ver leads</a>
      <a href="ejemplo-widget.html?cliente=${idCliente}">🧩 Ver como widget</a>`;
    $('#btnDemo').addEventListener('click', reproducirDemo);
  }

  function pintarInfo() {
    $('#info').innerHTML = `
      <div class="marca"><div class="logo">${config.logo}</div><span class="tipo">${escapar(config.tipo)}</span></div>
      <h1>${escapar(config.nombre)}</h1>
      <p class="eslogan">${escapar(config.eslogan)}</p>
      <p class="cta">💬 ¿Tiene dudas? Pregúntele a <b>${escapar(config.asistente.nombre)}</b>, asistente virtual disponible 24/7.</p>
      <div class="destacados">${config.destacados
        .map((d) => `<div class="destacado"><div class="icono">${d.icono}</div><strong>${escapar(d.titulo)}</strong><span>${escapar(d.texto)}</span></div>`)
        .join('')}</div>
      <ul class="contacto">${config.contacto.map((c) => `<li>${escapar(c)}</li>`).join('')}</ul>`;
    $('#avatar').textContent = config.asistente.avatar || '💬';
    $('#nombreAsistente').textContent = config.asistente.nombre;
    $('#rolAsistente').textContent = config.asistente.rol;
  }

  // ---- Mensajes --------------------------------------------------------------

  function bajar() {
    elMensajes.scrollTop = elMensajes.scrollHeight;
  }

  function agregarBurbuja(quien, texto, nota) {
    const burbuja = crear('div', 'burbuja ' + quien, formatear(texto));
    if (nota) burbuja.appendChild(crear('small', 'nota', formatear(nota)));
    elMensajes.appendChild(burbuja);
    bajar();
  }

  function mostrarEscribiendo() {
    const indicador = crear('div', 'burbuja bot escribiendo', '<span></span><span></span><span></span>');
    indicador.setAttribute('aria-label', 'Escribiendo…');
    elMensajes.appendChild(indicador);
    bajar();
    return indicador;
  }

  /** Tiempo de "escribiendo…": más largo para respuestas largas, pero nunca lento. */
  const tiempoEscritura = (texto) => Math.min(1600, 450 + texto.length * 7);

  function pintarSugerencias(lista) {
    elSugerencias.innerHTML = '';
    (lista || []).forEach((texto) => {
      const chip = crear('button', 'chip');
      chip.type = 'button';
      chip.textContent = texto;
      chip.addEventListener('click', () => enviar(texto));
      elSugerencias.appendChild(chip);
    });
    bajar();
  }

  /** Muestra los mensajes del bot uno por uno, con el indicador de escritura. */
  async function decir(mensajes) {
    const gen = generacion;
    ocupado = true;
    elEnviar.disabled = true;
    for (const m of mensajes) {
      const indicador = mostrarEscribiendo();
      await esperar(tiempoEscritura(m.texto));
      if (gen !== generacion) return;
      indicador.remove();
      agregarBurbuja('bot', m.texto, m.nota);
      if (m.lead) mostrarLead(m.lead);
      await esperar(150);
      if (gen !== generacion) return;
    }
    const ultimo = mensajes[mensajes.length - 1];
    pintarSugerencias(ultimo && ultimo.sugerencias);
    ocupado = false;
    elEnviar.disabled = false;
    if (!demoActiva && conMouse) elEntrada.focus();
  }

  async function enviar(texto) {
    texto = String(texto || '').trim();
    if (!texto || ocupado) return;
    agregarBurbuja('usuario', texto);
    pintarSugerencias(null);
    elEntrada.value = '';
    await decir(bot.responder(texto));
  }

  // ---- Leads -----------------------------------------------------------------

  function mostrarLead(lead) {
    guardarLead(lead);
    const filas = [['Nombre', lead.nombre], ['Celular', formatearCelular(lead.celular)]];
    if (lead.interes) filas.push([(config.lead.extra && config.lead.extra.etiqueta) || 'Interés', lead.interes]);
    const tarjeta = crear(
      'div',
      'tarjeta-lead',
      `<h4>✅ Solicitud registrada</h4><dl>${filas.map(([k, v]) => `<dt>${k}</dt><dd>${escapar(v)}</dd>`).join('')}</dl>`
    );
    if (config.whatsapp) {
      const enlace = crear(
        'a',
        'btn-whatsapp',
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>Continuar por WhatsApp'
      );
      enlace.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(bot.textoWhatsapp(lead))}`;
      enlace.target = '_blank';
      enlace.rel = 'noopener';
      tarjeta.appendChild(enlace);
    }
    elMensajes.appendChild(tarjeta);
    bajar();
  }

  /**
   * Guarda el lead en este navegador (para la página leads.html) y, si el cliente
   * tiene configurada una URL de Google Sheets (webhookUrl), también lo envía allí.
   */
  function guardarLead(lead) {
    const registro = Object.assign({}, lead, { origen: demoActiva ? 'demo' : modoWidget ? 'widget' : 'web' });
    try {
      const clave = 'leads:' + config.id;
      const lista = JSON.parse(localStorage.getItem(clave) || '[]');
      lista.push(registro);
      localStorage.setItem(clave, JSON.stringify(lista));
    } catch (e) {
      // Navegación privada o almacenamiento bloqueado: el chat sigue funcionando igual.
    }
    if (config.webhookUrl) {
      fetch(config.webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script no responde a CORS; el envío llega igual
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(registro),
      }).catch(() => {});
    }
  }

  // ---- Conversación y demo ---------------------------------------------------

  function reiniciar() {
    generacion++;
    demoActiva = false;
    ocupado = false;
    document.body.classList.remove('en-demo');
    elMensajes.innerHTML = '';
    elEntrada.value = '';
    pintarSugerencias(null);
    bot = Bot.crearBot(config);
    return decir(bot.bienvenida());
  }

  /** Reproduce la conversación de config.demo como si la escribiera un padre de familia. */
  async function reproducirDemo() {
    const bienvenida = reiniciar();
    const gen = generacion;
    demoActiva = true;
    document.body.classList.add('en-demo');
    await bienvenida;

    for (const texto of config.demo || []) {
      await esperar(900 * ritmo);
      if (gen !== generacion) return;
      const chip = [...elSugerencias.querySelectorAll('.chip')].find((b) => b.textContent === texto);
      if (chip) {
        chip.classList.add('presionado');
        await esperar(380 * ritmo);
      } else {
        for (const letra of texto) {
          elEntrada.value += letra;
          await esperar(38);
          if (gen !== generacion) return;
        }
        await esperar(250 * ritmo);
      }
      if (gen !== generacion) return;
      await enviar(texto);
    }
    if (gen !== generacion) return;
    demoActiva = false;
    document.body.classList.remove('en-demo');
  }

  // ---- Inicio ----------------------------------------------------------------

  aplicarTema();
  pintarBarraDemo();
  pintarInfo();

  $('#formulario').addEventListener('submit', (evento) => {
    evento.preventDefault();
    enviar(elEntrada.value);
  });
  $('#reiniciar').addEventListener('click', reiniciar);

  if (params.get('demo') === '1') {
    // Pequeña pausa para que dé tiempo de empezar a grabar la pantalla.
    setTimeout(reproducirDemo, 1500);
  } else {
    reiniciar();
  }
})();
