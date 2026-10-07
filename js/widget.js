/*
 * Widget flotante: agrega el chat a CUALQUIER página web con una sola línea.
 *
 *   <script src="https://TU-DOMINIO/js/widget.js" data-cliente="colegio" data-color="#1d4ed8"
 *           data-saludo="¿Consultas sobre la admisión 2027? 👋" defer></script>
 *
 * Crea un botón redondo abajo a la derecha que abre el chat (index.html?modo=widget) en un panel.
 */
(function () {
  'use strict';
  var script = document.currentScript;
  if (!script || document.getElementById('cw-boton')) return;

  var base = script.src.replace(/js\/widget\.js(\?.*)?$/, '');
  var cliente = script.getAttribute('data-cliente') || '';
  var color = script.getAttribute('data-color') || '#1d4ed8';
  var saludo = script.getAttribute('data-saludo') || '¿Tiene alguna consulta? ¡Escríbanos! 👋';

  var estilos = document.createElement('style');
  estilos.textContent = [
    '#cw-boton{position:fixed;right:20px;bottom:20px;z-index:2147483000;width:62px;height:62px;border-radius:50%;border:0;cursor:pointer;',
    'background:' + color + ';color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.25);display:grid;place-items:center;transition:transform .2s}',
    '#cw-boton:hover{transform:scale(1.06)}',
    '#cw-boton svg{width:28px;height:28px}',
    '#cw-aviso{position:fixed;right:92px;bottom:30px;z-index:2147483000;max-width:240px;background:#fff;color:#1f2937;padding:12px 16px;',
    'border-radius:16px 16px 4px 16px;box-shadow:0 10px 30px rgba(0,0,0,.18);font:600 14px/1.4 system-ui,sans-serif;cursor:pointer;',
    'opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s;pointer-events:none}',
    '#cw-aviso.cw-visible{opacity:1;transform:none;pointer-events:auto}',
    '#cw-panel{position:fixed;right:20px;bottom:96px;z-index:2147483000;width:390px;height:min(640px,calc(100vh - 120px));',
    'border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3);background:#fff;',
    'opacity:0;transform:translateY(16px) scale(.98);transition:opacity .25s,transform .25s;pointer-events:none}',
    '#cw-panel.cw-abierto{opacity:1;transform:none;pointer-events:auto}',
    '#cw-panel iframe{width:100%;height:100%;border:0;display:block}',
    '@media (max-width:520px){#cw-panel{right:0;left:0;top:0;bottom:auto;width:100%;height:calc(100% - 92px);border-radius:0 0 20px 20px}',
    '#cw-aviso{right:88px;max-width:200px}}',
  ].join('');
  document.head.appendChild(estilos);

  var iconoChat = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6.1L4.5 21l4.3-2.3c1 .2 2.1.3 3.2.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>';
  var iconoCerrar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var boton = document.createElement('button');
  boton.id = 'cw-boton';
  boton.type = 'button';
  boton.setAttribute('aria-label', 'Abrir chat');
  boton.innerHTML = iconoChat;

  var aviso = document.createElement('div');
  aviso.id = 'cw-aviso';
  aviso.textContent = saludo;

  var panel = document.createElement('div');
  panel.id = 'cw-panel';

  document.body.appendChild(panel);
  document.body.appendChild(aviso);
  document.body.appendChild(boton);

  var abierto = false;
  function alternar() {
    abierto = !abierto;
    aviso.classList.remove('cw-visible');
    if (abierto && !panel.firstChild) {
      // El chat se carga recién al abrirlo, para no hacer más lenta la web del cliente.
      var iframe = document.createElement('iframe');
      iframe.title = 'Chat';
      iframe.src = base + 'index.html?modo=widget' + (cliente ? '&cliente=' + encodeURIComponent(cliente) : '');
      panel.appendChild(iframe);
    }
    panel.classList.toggle('cw-abierto', abierto);
    boton.innerHTML = abierto ? iconoCerrar : iconoChat;
    boton.setAttribute('aria-label', abierto ? 'Cerrar chat' : 'Abrir chat');
  }

  boton.addEventListener('click', alternar);
  aviso.addEventListener('click', alternar);
  setTimeout(function () { if (!abierto) aviso.classList.add('cw-visible'); }, 2500);
})();
