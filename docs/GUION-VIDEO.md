# 🎬 Video de 30 segundos: un padre pregunta y el bot responde

El objetivo del video es que el dueño o director piense: **"esto le quita trabajo a mi secretaria
y me consigue contactos mientras duermo"**. No expliques la tecnología: muestra el resultado.

## Guion (ya programado en la demo del colegio)

| Tiempo | En pantalla | Texto sobre el video (opcional) |
|---|---|---|
| 0–3 s | Saludo de Sofía, la asistente | **"Son las 11 p. m. y un papá quiere matricular a su hijo…"** |
| 3–8 s | "¿Tienen vacantes para primer grado?" → responde con vacantes por nivel | "Responde al instante" |
| 8–12 s | "¿Cuánto es la pensión?" → matrícula, pensiones y descuentos | "Con los datos reales del colegio" |
| 12–19 s | "¿Qué requisitos piden? ¿Y el horario?" → responde las dos cosas | "Entiende preguntas dobles" |
| 19–22 s | Ofrece que la coordinadora le contacte → "Sí, que me contacten" | |
| 22–28 s | Pide nombre, celular y nivel → "Solicitud registrada" | **"Y te deja el contacto listo para llamar"** |
| 28–30 s | Pantalla final | **"¿Lo quieres para tu colegio? Escríbeme 👉 [tu WhatsApp]"** |

Para otros rubros usa `?cliente=academia&demo=1` o `?cliente=clinica&demo=1`.
Puedes cambiar los mensajes en la lista `demo` de cada archivo en `js/configs/`.

## Paso a paso para grabar

### Versión horizontal (YouTube, LinkedIn, presentaciones)
1. Abre `index.html?demo=1` en Chrome, en pantalla completa (F11).
2. Empieza a grabar:
   - **Windows:** `Win + Alt + R` (Xbox Game Bar) u **OBS Studio** (gratis).
   - **Mac:** `Cmd + Shift + 5` → *Grabar pantalla completa*.
3. Recarga la página (F5): la demo empieza sola a los 1,5 s y termina en ~30 s.
4. Si se lee muy rápido: `index.html?demo=1&ritmo=1.5`.

### Versión vertical 9:16 (TikTok, Reels, Estados de WhatsApp) ⭐ recomendada
- **Desde el celular:** publica la demo (ver README, sección 4), abre
  `https://TU-SITIO/index.html?modo=widget&demo=1` y usa la grabación de pantalla del teléfono.
- **Desde la PC:** en Chrome presiona `F12` → icono de celular (*Toggle device toolbar*) → elige
  "iPhone 12 Pro", abre `index.html?modo=widget&demo=1` y graba solo esa zona con OBS.

## Edición rápida (CapCut, gratis)
- Agrega los textos de la tabla de arriba, grandes y legibles.
- Música suave y de moda, a volumen bajo.
- Al final: tu nombre, "Desarrollo de asistentes virtuales" y tu número.
- Si puedes, graba tu voz en 1 frase: *"Así atiende tu colegio las 24 horas, aunque tu secretaria esté descansando."*

## Texto para publicar el video

> 🏫 ¿Tu colegio recibe las mismas preguntas todos los días por WhatsApp?
> Vacantes, pensiones, horarios, requisitos…
> Este asistente responde al instante, las 24 horas, y te deja el **nombre y celular** de cada padre interesado.
> Funciona también para academias y clínicas.
> 👉 Escríbeme y lo preparo con los datos de tu institución para que lo pruebes **gratis**.

## Errores comunes al grabar
- Grabar con la barra de marcadores, pestañas o notificaciones visibles → usa pantalla completa.
- Dejar el puntero del mouse encima del chat → muévelo a un costado.
- Videos de más de 40 s → la gente no llega al final, donde está tu llamado a la acción.
- Usar los datos ficticios con un prospecto que ya conoces → mejor personaliza la demo con **sus** datos (ver GUIA-VENTA.md).
