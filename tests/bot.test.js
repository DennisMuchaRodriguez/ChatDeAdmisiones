/*
 * Pruebas del motor del chat. Ejecutar con:  node tests/bot.test.js
 * (no necesita instalar nada, solo Node.js 18 o superior)
 */
'use strict';
const assert = require('node:assert/strict');
const { test } = require('node:test');

require('../js/configs/colegio.js');
require('../js/configs/academia.js');
require('../js/configs/clinica.js');
const { crearBot, normalizar, detectarIntenciones } = require('../js/bot.js');

const CONFIGS = globalThis.CONFIGS;
const titulos = (texto, config) => detectarIntenciones(texto, config.intenciones).map((i) => i.titulo);

test('normalizar quita tildes, signos y mayúsculas', () => {
  assert.equal(normalizar('¿Cuánto es la PENSIÓN?'), 'cuanto es la pension');
  assert.equal(normalizar('  Año   escolar!! '), 'ano escolar');
});

for (const config of Object.values(CONFIGS)) {
  test(`[${config.id}] cada sugerencia inicial tiene respuesta`, () => {
    for (const s of config.sugerenciasIniciales) {
      assert.ok(titulos(s, config).length, `"${s}" no coincide con ninguna intención`);
    }
  });

  test(`[${config.id}] la demo termina registrando un lead`, () => {
    const bot = crearBot(config);
    let lead = null;
    for (const texto of config.demo) {
      const salida = bot.responder(texto);
      assert.ok(salida.length, `sin respuesta para "${texto}"`);
      lead = salida.find((m) => m.lead)?.lead || lead;
    }
    assert.ok(lead, 'la demo no capturó el lead');
    assert.match(lead.celular, /^9\d{8}$/);
    assert.ok(lead.nombre && lead.interes);
  });

  test(`[${config.id}] los textos no dejan plantillas sin reemplazar`, () => {
    const bot = crearBot(config);
    const todo = config.demo.flatMap((t) => bot.responder(t)).map((m) => m.texto).join('\n');
    assert.doesNotMatch(todo, /\{\w+\}/);
  });
}

test('colegio: detecta los temas principales', () => {
  const c = CONFIGS.colegio;
  assert.deepEqual(titulos('¿Tienen vacantes para primer grado?', c), ['Vacantes']);
  assert.deepEqual(titulos('cuanto es la pension', c), ['Pensiones']);
  assert.deepEqual(titulos('Hola, ¿cuánto cuesta?', c), ['Pensiones']);
  assert.deepEqual(titulos('Buenas tardes', c), ['Saludo']);
  assert.deepEqual(titulos('¿Qué requisitos piden? ¿Y el horario?', c).sort(), ['Horarios', 'Requisitos']);
  assert.deepEqual(titulos('¿cuántos alumnos por aula?', c), ['Alumnos por aula']);
  assert.deepEqual(titulos('¿tienen piscina olímpica?', c), []);
});

test('clínica: "análisis de sangre" no se confunde con emergencia', () => {
  const c = CONFIGS.clinica;
  assert.ok(!titulos('¿hacen análisis de sangre?', c).includes('Emergencia'));
  assert.deepEqual(titulos('¿Hay citas para pediatría hoy?', c), ['Citas disponibles']);
  assert.ok(titulos('es una emergencia, mi hijo está sangrando', c).includes('Emergencia'));
});

test('ofrece contacto tras 3 preguntas y valida nombre y celular', () => {
  const bot = crearBot(CONFIGS.colegio);
  bot.responder('vacantes');
  bot.responder('pensiones');
  const tercera = bot.responder('horarios');
  assert.match(tercera.at(-1).texto, /coordinadora/);

  const pideNombre = bot.responder('Sí, que me contacten');
  assert.equal(bot.estado.fase, 'nombre');
  assert.ok(pideNombre.at(-1).nota.includes('29733'), 'falta el texto de consentimiento');

  assert.equal(bot.estado.fase, 'nombre');
  bot.responder('12345');
  assert.equal(bot.estado.fase, 'nombre', 'aceptó un nombre inválido');
  bot.responder('me llamo maría FERNÁNDEZ');
  assert.equal(bot.estado.datos.nombre, 'María Fernández');

  const malo = bot.responder('12345');
  assert.match(malo[0].texto, /9 dígitos/);
  bot.responder('+51 987 654 321');
  assert.equal(bot.estado.datos.celular, '987654321');

  const fin = bot.responder('primaria');
  const lead = fin.find((m) => m.lead).lead;
  assert.equal(lead.interes, 'Primaria');
  assert.deepEqual(lead.temas, ['Vacantes', 'Pensiones', 'Horarios']);
  assert.match(bot.textoWhatsapp(lead), /María Fernández.*Primaria.*987654321/);

  // Si vuelve a pedir que le contacten, no se piden los datos otra vez.
  bot.responder('quiero inscribirme');
  assert.equal(bot.estado.fase, 'chat');
});

test('se puede cancelar la captura y responder "no" a la oferta', () => {
  const bot = crearBot(CONFIGS.colegio);
  bot.responder('quiero separar una vacante');
  assert.equal(bot.estado.fase, 'nombre');
  bot.responder('Ahora no');
  assert.equal(bot.estado.fase, 'chat');

  const otro = crearBot(CONFIGS.colegio);
  ['vacantes', 'pensiones', 'horarios'].forEach((t) => otro.responder(t));
  const r = otro.responder('no');
  assert.match(r[0].texto, /Sin problema/);
  assert.equal(otro.estado.fase, 'chat');
});

test('una pregunta durante la captura del nombre se responde', () => {
  const bot = crearBot(CONFIGS.colegio);
  bot.responder('quiero inscribirme');
  const r = bot.responder('¿cuánto es la matrícula?');
  assert.match(r[0].texto, /Matrícula/);
  assert.equal(bot.estado.fase, 'nombre');
});

test('si no entiende dos veces, ofrece que le contacten', () => {
  const bot = crearBot(CONFIGS.colegio);
  bot.responder('¿tienen piscina?');
  const r = bot.responder('¿y estacionamiento para bicis?');
  assert.ok(r.some((m) => /coordinadora/.test(m.texto)));
});
