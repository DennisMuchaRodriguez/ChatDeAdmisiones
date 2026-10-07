# 🚀 Publicar, modificar y entregar al cliente (guía para la primera vez)

Todo se hace desde el navegador, con tu cuenta de GitHub. No necesitas instalar nada ni pagar hosting.

```
Tu repositorio DEMO (ChatDeAdmisiones)  ──►  link de demo para prospectos
        │  "Use this template"
        ▼
Un repositorio POR CLIENTE (chat-colegio-san-jose)  ──►  link del chat del cliente
                                                         └► leads a SU WhatsApp y SU Google Sheets
```

---

## Paso 1 · Pasar el código a la rama principal (`main`) — solo una vez

El código se subió a la rama `claude/sweet-pasteur-q033bj`. Para publicarlo hay que unirlo a `main`:

1. Entra a https://github.com/DennisMuchaRodriguez/ChatDeAdmisiones
2. Pestaña **Pull requests → New pull request**.
3. En *compare* elige `claude/sweet-pasteur-q033bj` → **Create pull request** → **Create pull request**.
4. Presiona **Merge pull request → Confirm merge**.

## Paso 2 · Publicar la demo con GitHub Pages (gratis)

1. En el repositorio: **Settings** (engranaje) → menú izquierdo **Pages**.
2. En *Build and deployment*: **Source: Deploy from a branch** · **Branch: `main`** · carpeta **`/ (root)`** → **Save**.
3. Espera 1–2 minutos y recarga. Arriba aparecerá tu link:
   **https://dennismucharodriguez.github.io/ChatDeAdmisiones/**

Links listos para usar:

| Para qué | Link |
|---|---|
| Demo para prospectos | `https://dennismucharodriguez.github.io/ChatDeAdmisiones/` |
| Video automático (colegio) | `…/ChatDeAdmisiones/?demo=1` |
| Video vertical para celular | `…/ChatDeAdmisiones/?modo=widget&demo=1` |
| Demo de clínica / academia | `…/ChatDeAdmisiones/?cliente=clinica` · `?cliente=academia` |
| Así se ve dentro de una web | `…/ChatDeAdmisiones/ejemplo-widget.html` |

Cada vez que guardes un cambio en `main`, la página se actualiza sola en 1–2 minutos.
(En **Actions** ves el progreso: círculo amarillo = publicando, ✅ = listo.)

---

## Paso 3 · Cómo modificar los archivos (3 formas, de más fácil a más pro)

### A) Directo en GitHub (para cambios pequeños)
1. Abre el archivo, por ejemplo `js/configs/colegio.js`.
2. Icono del **lápiz ✏️** (Edit this file).
3. Cambia el texto → botón verde **Commit changes…** → **Commit changes**.
4. En 1–2 minutos ya está publicado.

### B) github.dev: un editor completo en el navegador (recomendado para empezar)
1. En la página del repositorio presiona la tecla **`.`** (punto). Se abre VS Code en el navegador.
2. Edita los archivos que quieras (puedes abrir varios).
3. Icono de **Source Control** (ramitas, a la izquierda) → escribe un mensaje → **Commit & Push**.

### C) En tu computadora (cuando ya te sientas cómodo)
1. Instala **VS Code** y **GitHub Desktop**.
2. En GitHub Desktop: *File → Clone repository* → elige el repositorio.
3. En VS Code instala la extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*:
   ves los cambios **antes** de publicarlos.
4. En GitHub Desktop: escribe un resumen → **Commit to main** → **Push origin**.

> ⚠️ **Lo que más rompe la página:** olvidar una coma `,` o una comilla `'` en el archivo de configuración.
> Si el chat aparece en blanco, presiona **F12 → Console**: el error en rojo te dice el archivo y la línea.
> Si un texto lleva apóstrofo (ej. *O'Higgins*), escríbelo entre comillas dobles: `"Colegio O'Higgins"`.

---

## Paso 4 · Crear el chat de un cliente nuevo

### 4.1 Convierte tu demo en plantilla (solo una vez)
**Settings → General →** marca **☑ Template repository**.

### 4.2 Crea el repositorio del cliente
1. En tu repositorio demo: botón verde **Use this template → Create a new repository**.
2. Nombre: `chat-colegio-san-jose` (minúsculas y guiones) · **Public** → **Create repository**.

### 4.3 Pon los datos del cliente
En el repositorio nuevo (con la tecla `.` es más cómodo):

1. Edita `js/configs/colegio.js` (o el rubro que corresponda) con **sus** datos: nombre, colores, asistente,
   vacantes, pensiones, horarios, requisitos, dirección, consentimiento y el guion `demo`.
2. `whatsapp: '51XXXXXXXXX'` → el número **del cliente** (código 51 + 9 dígitos, sin espacios ni +).
3. `webhookUrl:` → la URL de su Google Sheets (ver [GOOGLE-SHEETS.md](GOOGLE-SHEETS.md)).
4. En `index.html` **borra** las líneas de los otros rubros, deja solo una:
   ```html
   <script src="js/configs/colegio.js"></script>
   ```
   Así desaparece la barra negra de DEMO y el chat carga directo.
5. **Borra lo que el cliente no necesita ver:** la carpeta `docs/` (¡tiene tu guía de venta y precios!),
   `leads.html`, `ejemplo-widget.html` y `tests/`. Reemplaza el `README.md` por uno corto con el nombre del cliente.

### 4.4 Publícalo
Igual que el Paso 2, en el repositorio del cliente. Su link será:
`https://dennismucharodriguez.github.io/chat-colegio-san-jose/`

### 4.5 Pruébalo antes de entregarlo
Desde tu celular: haz 15–20 preguntas como un padre real, deja un lead de prueba y confirma que llega al
WhatsApp y a la hoja. (Usa el checklist de la sección 8 de GUIA-VENTA.md.)

---

## Paso 5 · Cómo le das acceso al cliente

**El cliente no necesita GitHub ni tocar código.** Lo que le entregas es:

| Le entregas | Qué hace el cliente con eso |
|---|---|
| 🔗 **El link del chat** | Lo pone en la bio de Instagram/Facebook, en Google Maps, en la respuesta automática de WhatsApp Business ("Para informes rápidos entra aquí: …") y en sus anuncios |
| 🧩 **La línea del widget** (si tiene web) | Su webmaster la pega antes de `</body>`, o tú lo haces. En WordPress: plugin *WPCode* → *Footer* |
| 📲 **Los leads en su WhatsApp** | Le llegan con nombre, celular e interés cuando el padre presiona "Continuar por WhatsApp" |
| 📊 **La hoja de Google Sheets** | Créala con **su** cuenta de Google (o créala tú y compártela como *Editor*). Ahí ve todos los interesados |
| 📄 **Un mini manual** | 1 página: link, cómo ver la hoja, "llamar el mismo día", y cómo pedirte cambios |

### ¿Y si el cliente quiere el código?
Define en tu cotización qué incluye. Opciones:
- **Tú lo administras** (lo más común, va con el mantenimiento mensual): el repositorio queda en tu cuenta
  y tú haces los cambios cuando te los pide.
- **Darle acceso:** en su repositorio → **Settings → Collaborators → Add people** → su usuario de GitHub.
- **Entregárselo todo:** **Settings → General → Danger Zone → Transfer ownership** a la cuenta del cliente.
- **Solo los archivos:** botón **Code → Download ZIP** y se lo envías.

---

## Paso 6 · Que se vea profesional (opcional, pero recomendado)

- **Una cuenta/organización con tu marca:** crea una organización gratis en GitHub (ej. `tumarca-web`)
  y crea ahí los repositorios de clientes. Los links quedan `tumarca-web.github.io/colegio-san-jose`
  en vez de tu nombre personal.
- **Dominio del cliente:** si el colegio ya tiene dominio (ej. `colegiosanjose.edu.pe`), pídele a quien lo
  administra que cree un registro **CNAME** `admision` → `dennismucharodriguez.github.io`. Luego en
  **Settings → Pages → Custom domain** escribe `admision.colegiosanjose.edu.pe`, guarda y marca
  **Enforce HTTPS**. El chat queda en `https://admision.colegiosanjose.edu.pe`.

## Alternativa sin GitHub: Netlify Drop
Si un cliente lo necesita *ya*: entra a `app.netlify.com/drop` y arrastra la carpeta del proyecto (ya
personalizada). Te da un link en segundos. Desventaja: cada cambio requiere volver a arrastrar la carpeta.
Netlify también permite repositorios **privados** gratis (GitHub Pages gratis solo publica repositorios públicos).

---

## ❓ Dudas comunes

**¿Alguien puede ver mi código si el repositorio es público?**
Sí, pero el código de cualquier página web se puede ver desde el navegador igual. Lo que sí debes cuidar es
**no dejar `docs/GUIA-VENTA.md` en los repositorios de clientes** (tiene tus precios y tu estrategia).
Si quieres que tampoco se vea en tu demo, guárdalo fuera del repositorio.

**Cambié algo y no se actualiza.**
Espera 2 minutos, revisa la pestaña **Actions**, y recarga con **Ctrl + F5** (borra la caché).

**¿Cuánto cuesta todo esto?**
GitHub Pages, Google Sheets y Apps Script: **gratis**. Solo pagarías un dominio propio si lo quieres (un `.com` cuesta alrededor de US$ 10–15 al año).
