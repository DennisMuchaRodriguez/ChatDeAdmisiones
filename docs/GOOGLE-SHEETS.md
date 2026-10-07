# 📊 Recibir los leads en Google Sheets (gratis)

Con esto, cada vez que alguien deja su nombre y celular en el chat, se agrega una fila en una hoja de
cálculo del cliente. No necesitas servidor ni pagar nada.

## Pasos (≈ 10 minutos)

1. Con la cuenta de Google **del cliente** (o una tuya que luego compartes), crea una hoja nueva en
   [sheets.new](https://sheets.new) y ponle nombre, por ejemplo *"Leads Admisión 2027"*.
2. En la hoja: menú **Extensiones → Apps Script**.
3. Borra lo que aparece y pega este código:

   ```js
   function doPost(e) {
     var libro = SpreadsheetApp.getActiveSpreadsheet();
     var hoja = libro.getSheetByName('Leads') || libro.insertSheet('Leads');
     if (hoja.getLastRow() === 0) {
       hoja.appendRow(['Fecha', 'Nombre', 'Celular', 'Interés', 'Temas consultados', 'Origen']);
     }
     var d = JSON.parse(e.postData.contents);
     hoja.appendRow([
       new Date(),
       d.nombre,
       "'" + d.celular, // el apóstrofo evita que Sheets lo trate como número
       d.interes || '',
       (d.temas || []).join(', '),
       d.origen || ''
     ]);

     // Opcional: avisar por correo en cada lead nuevo (cambia el correo).
     // MailApp.sendEmail('admision@colegio.edu.pe', 'Nuevo interesado: ' + d.nombre,
     //   'Celular: ' + d.celular + '\nInterés: ' + d.interes + '\nConsultó: ' + (d.temas || []).join(', '));

     return ContentService.createTextOutput('ok');
   }
   ```

4. Guarda (icono de disquete).
5. Botón **Implementar → Nueva implementación** → en el engranaje elige **Aplicación web**:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
6. **Implementar** → autoriza los permisos (Google mostrará una advertencia porque el script es tuyo:
   *Configuración avanzada → Ir a … (no seguro)* → *Permitir*).
7. Copia la **URL de la aplicación web** (termina en `/exec`).
8. Pégala en la configuración del cliente:

   ```js
   webhookUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec',
   ```

9. Prueba el chat, deja un nombre y celular, y revisa la hoja: debe aparecer la fila en unos segundos.

## Notas
- Si cambias el código del script, debes hacer **Implementar → Gestionar implementaciones → Editar →
  Versión: nueva** para que se actualice (la URL se mantiene).
- La hoja la puede ver la secretaria o la coordinadora desde el celular con la app de Google Sheets.
- Esa URL solo sirve para **agregar** filas; no permite leer la hoja. Aun así, no la publiques fuera de la web del cliente.
- Upsell: un "reporte semanal" automático por correo con el número de leads y los temas más consultados.
