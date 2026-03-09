# 🧠 Flujo del Terapeuta: Envío y Revisión de Formularios Clínicos

Este documento describe el proceso completo que un terapeuta sigue dentro del sistema para asignar formularios clínicos a sus pacientes, revisar sus respuestas y obtener posibles reportes.

---

## 🚪 1. Inicio de Sesión

El terapeuta accede a la plataforma a través del panel de autenticación y se le otorgan permisos específicos de acuerdo a su `role: THERAPIST`.

---

## 👥 2. Gestión de Pacientes

Ruta: `/therapist/clients`

- Visualiza una lista paginada de sus pacientes.
- Puede buscar por nombre o correo electrónico.
- Tiene la opción de **crear un nuevo paciente** si aún no existe en el sistema.

---

## 📋 3. Visualización de Formularios Disponibles

Ruta: `/therapist/forms`

- Se despliegan todos los formularios clínicos disponibles.
- Cada formulario contiene:
  - `title`
  - `description`
  - lista de `questions`

---

## 📨 4. Envío de Formulario al Paciente

Desde la vista del paciente o del catálogo de formularios, el terapeuta puede asignar un formulario.

**Flujo técnico:**

```http
POST /form-invitations
Payload:

json
Copiar
Editar
{
  "clientId": "UUID del paciente",
  "formTemplateId": "UUID del formulario"
}
```

El sistema genera una FormInvitation con:

Un token único.

Fecha de creación y expiración.

Estado isCompleted: false.

## 📩 5. Notificación al Paciente

Se puede enviar automáticamente un email con el enlace único:

```plaintext
https://midominio.com/form/response?token=UNIQUE_TOKEN
El paciente accede sin necesidad de iniciar sesión.
```

## ✍️ 6. Llenado del Formulario

El paciente responde cada pregunta.

Al finalizar, se envía el formulario.

Lógica en backend:

Se marca la invitación como completada.

Se crea un FormResponse y sus respectivas Answer.

## ✅ 7. Revisión por Parte del Terapeuta

Ruta: /therapist/forms/responses o desde /therapist/clients/[id]

El terapeuta ve una tabla con los formularios respondidos.

Puede filtrar por:

Nombre del paciente

Título del formulario

Fecha de llenado

Nivel (ej. ansiedad)

Al seleccionar una respuesta, accede a:

```http
/therapist/forms/responses/[responseId]
```

### Vista incluye

Pregunta y respuesta

Fecha de llenado

Puntaje total (si aplica)

Nivel clínico (ej. MODERATE, SEVERE)

📄 8. Reportes Automatizados (Opcional)
Si el formulario está diseñado para análisis automático, se genera un Report asociado al FormResponse.

### Ejemplo de Reporte

```json
{
  "formResponseId": "UUID del FormResponse",
  "summary": "Paciente presenta indicios de ansiedad moderada.",
  "score": 3,
  "level": "MODERATE"
}
```

---

## 🔐 Seguridad y Permisos

Los terapeutas sólo pueden acceder a pacientes y formularios que ellos mismos han creado o asignado.

Los enlaces enviados a los pacientes usan tokens únicos y válidos por única vez.

El FormInvitation es la clave que vincula therapist, client, y formTemplate.

## 📦 Entidades involucradas

User (role = THERAPIST)

Client

FormTemplate

FormInvitation

FormResponse

Answer

Report (opcional)

## 🛠️ Consideraciones Técnicas

El sistema usa Prisma para gestionar relaciones.

Todas las operaciones están documentadas en Swagger.

El frontend está desarrollado en Next.js con arquitectura basada en Atomic Design.

## 📌 Próximos pasos

 Notificaciones automáticas vía correo o WhatsApp.

 Exportación de reportes en PDF.

 Visualización gráfica de resultados históricos del paciente.
