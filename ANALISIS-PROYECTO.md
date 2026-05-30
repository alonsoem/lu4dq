# Análisis técnico del proyecto `lu4dq`

> Documento generado a partir de la lectura completa del código fuente del repositorio.
> No modifica el comportamiento del proyecto: es únicamente documentación.
> Fecha de análisis: 2026-05-26.

---

## 1. Resumen ejecutivo

`lu4dq` es una **aplicación web de página única (SPA)** escrita en **JavaScript (React)** que sirve de **frontend** para el sistema de gestión de contactos de radioaficionados (QSO/QSL) del **Radio Club Quilmes** (indicativo argentino **LU4DQ / LQ4D**).

La aplicación **no contiene lógica de servidor propia**: toda la persistencia, generación de imágenes (QSL y certificados) y procesamiento de archivos se delega en un **backend PHP externo** alojado en `https://lu4dq.qrits.com.ar/api/`. Esta SPA consume ese backend mediante peticiones HTTP con **axios**.

En términos de dominio, el sistema permite:

- **Cargar contactos** (QSO) de radioaficionado, de forma **manual** (un contacto por formulario) o **masiva** (importando archivos **ADIF**, el formato estándar de logs de radio).
- **Consultar contactos** por indicativo y **descargar las tarjetas QSL** (imágenes de confirmación) generadas por el servidor.
- Publicar y mostrar **actividades / concursos** (diplomas, certificados, QSL especiales) con sus rankings y reglas.
- Un **panel de administración** con estadísticas (gráficos), validación de contactos cruzados, ABM de actividades y gestión de plantillas de documentos.

---

## 2. Lenguaje y stack tecnológico

### Lenguaje principal
- **JavaScript (ES6+) con JSX** — es un proyecto **React** clásico. No usa TypeScript (no hay archivos `.ts`/`.tsx` ni `tsconfig.json`).
- Todo el código de aplicación vive en `src/` con extensión `.js`.

### Framework y herramientas de build
- **React `^17.0.2`** (versión 17; usa la API antigua `ReactDOM.render`, ver [`src/index.js`](src/index.js)).
- **Create React App** (`react-scripts ^5.0.1`) como toolchain de build, dev-server, test y bundling (webpack + Babel internos). El `README.md` es el README por defecto de CRA.
- **Babel** con el plugin `babel-plugin-macros` ([`babel.config.js`](babel.config.js)), necesario para la sintaxis de iconos de FontAwesome (`import.macro`).
- Node **16** en el pipeline de CI (ver workflows de GitHub Actions).
- El script de arranque usa `--openssl-legacy-provider` (`npm start`), un *workaround* habitual para compatibilidad de OpenSSL 3 con webpack de CRA en Node modernos.

### Librerías destacadas (de [`package.json`](package.json))

| Categoría | Paquete | Uso en el proyecto |
|---|---|---|
| Routing | `react-router-dom ^6.11.2` | Enrutamiento del SPA (ver [`src/rootPanel.js`](src/rootPanel.js)) |
| HTTP | `axios ^1.4.0` | Toda la comunicación con la API PHP ([`src/api/api.js`](src/api/api.js)) |
| UI / CSS | `bootstrap ^5.3.0`, `react-bootstrap ^1.6.8` | Layout, formularios, modales, navbar, tablas |
| Iconos | `@fortawesome/*`, `react-fontawesome` | Iconografía (info, ojo, libro, radio, ranking, etc.) |
| Gráficos | `chart.js ^4.4.0`, `react-chartjs-2 ^5.2.0` | Estadísticas del panel admin (Pie y Bar) |
| Editor de texto enriquecido | `react-draft-wysiwyg`, `draft-js`, `draftjs-to-html`, `html-to-draftjs` | Edición HTML de descripciones y bases de actividades |
| HTML seguro | `dompurify ^3.0.6`, `html-to-react`, `html-react-parser` | Sanitizar y renderizar el HTML almacenado de las actividades |
| Descarga de archivos | `file-saver ^2.0.5` | Descargar QSL/certificados como `.jpg` |
| Cookies | `react-cookie ^6.1.1` | Recordar el indicativo del usuario (`logCallsign`) |
| Notificaciones | `react-toastify ^9.1.3` | Mensajes de error tipo "toast" |
| Fechas | `date-fns` (vía `format`) | Formateo de fechas UTC |

> **Nota:** `package.json` incluye varias dependencias que **no se usan** o son redundantes/heredadas: `react-native-datepicker`, `react-responsive-datepicker`, `sassy-datepicker`, `react-datepicker`, `flatlist-react`, `react-popover`, `react-html-parser`, `jsdom`, `parser`, `font-awesome` (v4) conviviendo con FontAwesome 6, etc. Esto sugiere acumulación de dependencias a lo largo del tiempo. (Ver §11 Deuda técnica.)

### Backend (externo, fuera de este repo)
- Implementado en **PHP** (todos los endpoints son `*.php`).
- Dominio: `https://lu4dq.qrits.com.ar`.
- Sirve además contenido estático/dinámico bajo `dinamic-content/` (subcarpetas `FRT/` portadas, `DOC/` documentos, `IMG/` imágenes) y genera imágenes on-the-fly (`qslCreator.php`, `certCreator.php`, `demoCreator.php`).

---

## 3. Arquitectura general

```
┌─────────────────────────────────────────────┐
│  Navegador del usuario                        │
│                                               │
│   React SPA (este repositorio)                │
│   - servido bajo la ruta /wp/logs             │
│   - BrowserRouter basename="/wp/logs"         │
│                                               │
│        │  axios (GET con params / POST FormData)
│        ▼                                       │
└────────┼──────────────────────────────────────┘
         │  HTTPS
         ▼
┌─────────────────────────────────────────────┐
│  Backend PHP  (lu4dq.qrits.com.ar/api/*.php)  │
│  - Base de datos (MySQL/MariaDB; se infiere   │
│    por el código de error 1062 = duplicado)   │
│  - Generación de imágenes QSL/certificados    │
│  - Procesamiento de archivos ADIF             │
│  - Sirve dinamic-content/{FRT,DOC,IMG}        │
└─────────────────────────────────────────────┘
```

Puntos clave de la arquitectura:

- **Despliegue bajo subruta:** `package.json` define `"homepage": "/wp/logs"` y `BrowserRouter` usa `basename="/wp/logs"`. Es decir, la app vive en `https://.../wp/logs` (probablemente embebida junto a un WordPress, de ahí el prefijo `/wp/`).
- **Frontend desacoplado del backend:** el frontend se compila a estáticos y se sube por **FTP** (ver §10 CI/CD); el backend PHP es un proyecto aparte (referido en `.gitignore` como `/lu4dq-qso`, excluido de este repo).
- **HTML base** ([`public/index.html`](public/index.html)): carga Bootstrap por CDN, hojas de estilo propias (`style/reset.css`, `style/template.css`), define `lang="es"`, título "LU4DQ - Radio Club Quilmes" y monta React en `<div id="root">`. Incluye un `<div class="footerLu4dq">` decorativo.

---

## 4. Estructura de directorios

```
lu4dq/
├── .github/workflows/
│   ├── main.yaml          # Deploy a producción (push a main)
│   └── develop.yaml       # Deploy a entorno dev (push a develop)
├── public/
│   ├── index.html         # HTML raíz (carga Bootstrap CDN + estilos propios)
│   ├── manifest.json      # PWA manifest ("Manejo de certificados")
│   ├── robots.txt
│   └── style/             # CSS e imágenes estáticas (template.css, reset.css, timesup.jpg, …)
├── src/
│   ├── index.js           # Punto de entrada: ReactDOM.render(<RootPanel/>)
│   ├── rootPanel.js        # Definición de TODAS las rutas (react-router)
│   ├── nav.js             # Navbar público
│   ├── index.css
│   ├── api/
│   │   └── api.js         # Capa de acceso a la API PHP (axios) — todos los endpoints
│   ├── landing.js         # Pantalla inicial: elegir carga manual o masiva
│   ├── qsoUpload.js       # Contenedor de carga MANUAL (controla "actividad habilitada")
│   ├── formRequest.js     # Formulario de un QSO (el corazón de la carga manual)
│   ├── upload2.js         # Carga MASIVA por archivo ADIF
│   ├── qso.js             # Variante de consulta de QSL (formulario + preview)
│   ├── qsoList.js         # Listado público de contactos por indicativo + descarga QSL
│   ├── activities.js      # Grilla de actividades públicas (tarjetas)
│   ├── confirmedQso.js    # Detalle de UNA actividad (ranking, tablas, bases, estaciones)
│   ├── checker.js         # (admin) Buscador de contactos por indicativo
│   ├── timeUp.js          # Componente "no hay actividades disponibles"
│   └── admin/
│       ├── navAdmin.js    # Navbar del panel admin
│       ├── adminView.js   # Estadísticas con gráficos (Chart.js)
│       ├── checkerCompare.js  # Comparador/validador de QSO cruzados
│       ├── activity/
│       │   ├── admin.js        # Listado/ABM de actividades + habilitar/deshabilitar
│       │   ├── adminABM.js     # Alta de actividad (formulario completo)
│       │   └── activityEdit.js # Edición de actividad + alta de estaciones
│       └── document/
│           ├── docAdmin.js     # Listado de plantillas/documentos
│           ├── docAlta.js      # Alta de documento (imágenes QSL/certificado)
│           └── docEdit.js      # Edición de documento + parametría
├── package.json
├── babel.config.js
├── babel-plugin-macros.config.js
└── README.md              # README por defecto de Create React App
```

> Curiosidad: hay archivos `public/index copy.html` e `index copy 2.html` y `public/robots.zip`, restos de versiones anteriores que conviene limpiar.

---

## 5. Enrutamiento (mapa de rutas)

Definido en [`src/rootPanel.js`](src/rootPanel.js). Todas las rutas cuelgan del `basename="/wp/logs"`. El `<NavMenu/>` público se muestra siempre.

### Rutas públicas

| Ruta | Componente | Función |
|---|---|---|
| `/` y `/:stationCode` | `Landing` | Portada: elegir carga manual o masiva. `stationCode` es un código opcional de validación de estación. |
| `/cargaManual` y `/cargaManual/:stationCode` | `QsoUpload` | Carga de un QSO mediante formulario. |
| `/cargaMasiva` y `/cargaMasiva/:stationCode` | `UploadBis` (`upload2.js`) | Importación de archivo **ADIF**. |
| `/qsoList` y `/qsoList/:station` | `QsoList` | Consulta pública de contactos por indicativo + descarga de QSL. |
| `/activities` | `AllActivities` (`activities.js`) | Grilla de actividades habilitadas. |
| `/activities/:idAct` | `Activities` (`confirmedQso.js`) | Detalle de una actividad: bases, estaciones, ranking, certificados. |
| `/qsoTest` | `Qso` (`qso.js`) | Variante de consulta de QSL (parece de pruebas). |

### Rutas de administración (prefijo `/status`)

| Ruta | Componente | Función |
|---|---|---|
| `/status/blabla` | `AdminView` | Dashboard de estadísticas (gráficos por modo, banda y fecha). |
| `/status/checker`, `/status/checker/:station` | `Checker` | Buscar contactos cargados por una estación. |
| `/status/checker/:station/:toCallsign` | `CheckerCompare` | Cotejar un QSO contra los posibles QSO recíprocos del corresponsal. |
| `/status/admin` | `Admin` | Listado de actividades + habilitar/deshabilitar (ABM). |
| `/status/admin/ABM` | `AdminABM` | Alta de nueva actividad. |
| `/status/admin/editActivity/:id` | `ActivityEdit` | Edición de actividad y administración de estaciones. |
| `/status/admin/doc` | `AdminDoc` | Listado de plantillas de documentos. |
| `/status/admin/doc/new` | `NewDoc` (`docAlta.js`) | Alta de plantilla. |
| `/status/admin/doc/:id` | `EditDoc` (`docEdit.js`) | Edición de plantilla + parametría de posicionamiento de texto. |

> **Importante sobre seguridad:** las rutas `/status/*` **no tienen ningún control de autenticación en el frontend**. Cualquiera que conozca la URL puede acceder al panel de administración. La protección (si existe) tendría que estar en el backend PHP. (Ver §11.)

---

## 6. Capa de acceso a datos (`src/api/api.js`)

Es el único punto que habla con el backend. Define dos helpers genéricos sobre axios:

- `foreignRequest(type, fullPath, params, config)` → para peticiones **GET** con query params.
- `foreignPost(fullPath, formData)` → para **POST** de `FormData` (subida de archivos).

Todas las URLs están **hardcodeadas** a `https://lu4dq.qrits.com.ar/api/...` (no hay variable de entorno / configuración de base URL).

### Catálogo de endpoints

| Función exportada | Endpoint PHP | Método | Propósito |
|---|---|---|---|
| `postOneQSO` | `uploadQSO.php` | GET | Cargar un QSO individual |
| `postStatistics` | `preQsoStatistics.php` | GET | Registrar estadística previa al envío del QSO |
| `getQsl` | `qslCreator.php` | GET | Generar imagen QSL |
| `getResumedActivities` | `activityLog.php` | GET | Resumen confirmado de una actividad |
| `getActivities` | `getActivities.php` | GET | Actividades habilitadas (público) |
| `getAllActivities` | `getAllActivities.php` | GET | Todas las actividades (admin) |
| `getActivity` | `getActivityProperties.php` | GET | Propiedades de una actividad |
| `getActivityStations` | `getActivityStations.php` | GET | Estaciones de una actividad |
| `getEnabledActivities` | `getEnabledActivities.php` | GET | ¿Hay actividad habilitada para cargar? |
| `postFile` | `postFile.php` | POST | Subir archivo ADIF (carga masiva) |
| `getName` | `getNames.php` | GET | Resolver nombre + email a partir del indicativo |
| `getQsoList` | `getQsos.php` | GET | Contactos de un indicativo |
| `getStatusRank` | `getStatusRank.php` | GET | Ranking de estaciones |
| `getStatsByMode` | `getStatsByMode.php` | GET | Estadísticas por modo |
| `getStatsByBand` | `getStatsByBand.php` | GET | Estadísticas por banda |
| `getStatsByDate` | `getStatsByDate.php` | GET | Estadísticas por fecha |
| `getQsoCheck` | `getQsoCheck.php` | GET | Cotejo de QSO recíprocos |
| `getBand` | `getBandsNew.php` | GET | (No usado en componentes actuales) |
| `setActivity` | `setActivity.php` | POST | Crear actividad |
| `updateActivity` | `updateActivity.php` | POST | Actualizar actividad |
| `setStatus` | `setEnabled.php` | GET | Habilitar/deshabilitar actividad |
| `getDocuments` | `getDocuments.php` | GET | Listar plantillas |
| `postDocument` | `postDocument.php` | POST | Crear plantilla |
| `putDocument` | `putDocument.php` | POST | Actualizar plantilla |
| `getDocumentById` | `getDocumentById.php` | GET | Obtener plantilla por id |
| `addNewStation` | `core/addNewStationToActivity.php` | GET | Agregar estación a una actividad |

Imágenes generadas dinámicamente que se referencian directamente por URL en los componentes (fuera de `api.js`):

- `qslCreator.php?qso=<doc>&chk=<chk>` → tarjeta QSL.
- `certCreator.php?qso=<doc>&chk=<chk>` → certificado/diploma.
- `demoCreator.php?image=<img>` → imagen de muestra del certificado de una actividad.
- `dinamic-content/DOC/<archivo>` → descarga de bases en PDF/DOC.
- `dinamic-content/FRT/<img>` → portada de actividad.

---

## 7. Flujos funcionales detallados

### 7.1. Carga manual de un contacto (QSO)

**Componentes:** [`landing.js`](src/landing.js) → [`qsoUpload.js`](src/qsoUpload.js) → [`formRequest.js`](src/formRequest.js).

1. El usuario entra en `/` (o `/cargaManual`). `Landing` ofrece dos botones: carga manual o masiva. Si la URL trae `:stationCode`, lo arrastra a la siguiente pantalla (sirve como "permiso"/validación de estación oficial).
2. `QsoUpload` consulta `getEnabledActivities()` al montar:
   - Si **no hay actividad habilitada** → muestra `<TimeUp/>` ("NO HAY ACTIVIDADES DISPONIBLES").
   - Si **hay** → renderiza `<FormRequest/>`.
3. `FormRequest` es el formulario central. Lógica relevante:
   - **Fecha/hora por defecto en UTC**: usa `new Date()` y compone la fecha/hora con métodos `getUTC*` (la radioafición trabaja siempre en hora UTC/GMT, ver popover "Hora UTC").
   - **Cookie `logCallsign`**: al montar, si existe la cookie con el indicativo del usuario, autocompleta nombre y email vía `getName()`. Al enviar con éxito, **guarda la cookie** para futuras cargas.
   - **Autocompletado**: al escribir el indicativo (`signal`), llama a `getName({station})` y rellena nombre/email.
   - **Banda → frecuencia**: al elegir banda (160m, 80m, … VOIP) precarga una frecuencia típica en MHz (`preloadFrequency`).
   - **Modo**: combo amplio (CW, SSB, FT8, RTTY, SSTV, satélite, etc.).
   - **SWL (radioescucha)**: si se marca, el formulario cambia — pide un **segundo corresponsal** (`toCall2`) y oculta los reportes RST (señales entregadas/recibidas).
   - **Validaciones cliente** (`handleSubmit`): indicativo > 3 chars y sin espacios, modo y banda obligatorios, frecuencia numérica, fecha de 10 chars, nombre ≥ 3, corresponsal ≥ 3; si no es SWL exige RST enviado/recibido numéricos; si es SWL exige `toCall2`.
   - Antes de validar, dispara `postStatistics(...)` (telemetría del intento de carga).
   - Si pasa validación, `submit()` llama a `postOneQSO(...)` con todos los campos (fecha/hora normalizadas con `replace(/\D/g,"")`).
4. Respuesta: el backend devuelve un objeto `qsl` con un `status`:
   - `"RC Confirmed"` → confirmado con tarjeta descargable (botón "Descargar QSL!" que arma la URL de `qslCreator.php`).
   - `"Confirmed"` → confirmado sin tarjeta.
   - otro → "no confirmado aún".
   El resultado se muestra en `PreviewPanel`.
5. **Manejo de errores** (`handleAxiosErrorB`): traduce códigos a mensajes en español vía toast — p. ej. código `1062` (índice único MySQL) → "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS"; `status === "Station not validated"` → código de estación incorrecto; "Network Error" → error de red.

### 7.2. Carga masiva por archivo ADIF

**Componente:** [`upload2.js`](src/upload2.js) (exportado como `Upload` / ruta `UploadBis`).

1. Igual que la manual, primero comprueba `getEnabledActivities()`; si no hay actividad muestra `<TimeUp/>`.
2. El formulario pide **indicativo, nombre, email** y un **archivo** (ADIF). Recuerda el indicativo por cookie y autocompleta con `getName()`.
3. Al enviar (`onFileUpload`): construye un `FormData` con el archivo, `stationCode`, `station`, `name`, `email` y hace `postFile(formData)` (POST multipart).
4. La respuesta trae `rows` (un registro por QSO del archivo). Se renderiza una **tabla de resultados** con un *badge* por fila según `insert`:
   - `OK` → "Aceptado" (verde).
   - `duplicate` → "duplicate" (amarillo).
   - `No Match Station` / `Self Qso` → rojo con el mensaje.
   - Si el QSO quedó confirmado (`qsl.status === "RC Confirmed"`) ofrece botón para descargar la QSL.
5. **Errores de procesamiento** (`catch`): traduce `status` del backend — `ERROR_UPLOADING`, `ERROR_PROCESSING`, `Station not validated` → mensajes en español.

> **ADIF** (Amateur Data Interchange Format) es el formato estándar de intercambio de logs entre programas de radioafición; el parseo real lo hace el PHP.

### 7.3. Consulta de contactos y descarga de QSL

**Componente:** [`qsoList.js`](src/qsoList.js).

- Permite buscar por indicativo (input + botón "Buscar") o entrar directo a `/qsoList/:station`.
- Llama `getQsoList({station})` y muestra una tabla responsive (estación, corresponsal, fecha, hora, banda, modo, SWL, QSO/QSL).
- Si el QSO está `"RC Confirmed"`, ofrece un *badge* "Descargar QSL" que descarga la imagen (`file-saver`) con un nombre compuesto `estacion_corresponsal_fecha_hora.jpg`.
- Click en un corresponsal navega a su propio listado (`navigateToStationQso`).

`qso.js` es una variante (ruta `/qsoTest`) que reutiliza `FormRequest` para una "consulta de tarjetas de confirmación" con un panel de preview de imagen; tiene aspecto de pantalla de pruebas/legacy.

### 7.4. Actividades públicas

**Componentes:** [`activities.js`](src/activities.js) (grilla) y [`confirmedQso.js`](src/confirmedQso.js) (detalle).

- **Grilla** (`/activities`): `getActivities()` trae las actividades habilitadas y las pinta como tarjetas Bootstrap con imagen de portada (`/dinamic-content/FRT/...` o imagen por defecto), título, badge "FINALIZADA" si la fecha de fin ya pasó, y un extracto de la descripción **sanitizado con DOMPurify** y renderizado con `html-to-react`.
- **Detalle** (`/activities/:idAct`): hace 3 llamadas en paralelo — `getActivity` (propiedades), `getActivityStations` (estaciones que entregan contacto) y `getResumedActivities` (ranking confirmado). Según el **tipo de actividad** muestra una tabla distinta (`showTable()`):
  - **Tipo 0 — QSL ESPECIAL**: tabla de QSL descargables.
  - **Tipo 1 — CERTIFICADO**: ranking por cantidad de contactos + certificado descargable.
  - **Tipo 2 — CERTIFICADO POR LETRAS**: además muestra las "letras" conseguidas (mecánica de completar una palabra contactando estaciones, cada una aporta una letra).
  - Incluye modal con imagen de muestra del certificado (`demoCreator.php`), descarga de **bases** (PDF/DOC), y la lista de estaciones (marcando las requeridas y su letra).

### 7.5. Panel de administración

Navegación común: [`navAdmin.js`](src/admin/navAdmin.js) → Estadísticas / Validador / Actividades / Documentos.

- **Estadísticas** ([`adminView.js`](src/admin/adminView.js)): elige una actividad y carga ranking (`getStatusRank`) y tres datasets de Chart.js — torta por **modo** (`getStatsByMode`), torta por **banda** (`getStatsByBand`) y barras por **fecha** (`getStatsByDate`).
- **Validador** ([`checker.js`](src/checker.js) + [`checkerCompare.js`](src/admin/checkerCompare.js)): busca los QSO de una estación; al elegir un corresponsal, `CheckerCompare` muestra el QSO de la estación frente a los posibles QSO recíprocos cargados por el corresponsal (`getQsoCheck`), para detectar coincidencias/discrepancias (banda, modo, fecha, hora, RST).
- **ABM de actividades** ([`admin.js`](src/admin/activity/admin.js)): lista todas las actividades, permite alternar visibilidad (icono ojo / ojo tachado vía `setStatus`) y navegar a edición. Botón "Nueva actividad".
- **Alta** ([`adminABM.js`](src/admin/activity/adminABM.js)) y **Edición** ([`activityEdit.js`](src/admin/activity/activityEdit.js)): formularios extensos. Usan el **editor WYSIWYG** (`react-draft-wysiwyg` + Draft.js) para "Descripción" y "Bases", convirtiendo a HTML con `draftToHtml` al guardar y de HTML a Draft con `htmlToDraft` al cargar. Envían `FormData` con fechas (inicio/fin/extendida), tipo, contactos mínimos, palabra (tipo 2), documento/plantilla seleccionada, imagen de portada y PDF de bases. La edición incluye una pestaña para **agregar estaciones** (indicativo, letra, requerida) vía `addNewStation`.
- **Documentos/plantillas** ([`docAdmin.js`](src/admin/document/docAdmin.js), [`docAlta.js`](src/admin/document/docAlta.js), [`docEdit.js`](src/admin/document/docEdit.js)): gestionan las plantillas de imagen sobre las que el backend imprime los datos del QSO para generar QSL/certificados (incluyendo una variante FT8). `docEdit` muestra además la **parametría** (nombre del campo, fila, columna inicio/fin, tamaño de fuente) que define dónde se "estampa" cada dato sobre la imagen.

---

## 8. Manejo de estado y patrones de React

- **Mezcla de estilos**: hay componentes de **clase** (`rootPanel.js`, `qso.js`, `qsoUpload.js`) y componentes **funcionales con hooks** (la mayoría). Es un código que evolucionó en el tiempo.
- **Estado local con `useState`/`this.state`**; no hay Redux ni Context global. El "estado compartido" mínimo (el indicativo del usuario) se persiste vía **cookie** `logCallsign`.
- **Efectos** (`useEffect`) para cargar datos al montar y reaccionar a cambios de parámetros de ruta (`:station`, `:idAct`, `:id`).
- **Patrón repetido de `handleAxiosError`**: casi todos los componentes duplican una función de manejo de errores que inspecciona `response.response.data.code` (1062), `status` ("Station not validated") y `message` ("Network Error"). Está copiada/pegada con pequeñas variantes.
- **Comunicación padre↔hijo** por props y callbacks (p. ej. `qslHook`, `setQsl`, `resetForm`).

---

## 9. Estilos y UI

- **Bootstrap 5** (vía CDN en `index.html` y vía `react-bootstrap`/`bootstrap` en npm).
- Clases de marca propias: `headerLu4dq`, `navLu4dq`, `cardActivity`, `even-larger-badge`, `letters`, etc., definidas en `public/style/template.css` e `index.css`.
- Iconos con **FontAwesome 6** (requiere `babel-plugin-macros` + `import.macro`).
- Notificaciones con **react-toastify** (toasts rojos centrados arriba).
- Idioma de la interfaz: **español** (textos en los componentes, `lang="es"`).
- Se observan en el JSX atributos `class=` (HTML) mezclados con `className=` (React) — React ignora `class`, por lo que muchas clases podrían no aplicarse correctamente. (Ver §11.)

---

## 10. CI/CD y despliegue

Dos workflows de **GitHub Actions** prácticamente idénticos:

- [`.github/workflows/main.yaml`](.github/workflows/main.yaml) — se dispara con `push` a **`main`** → "Deploy on Main" (producción).
- [`.github/workflows/develop.yaml`](.github/workflows/develop.yaml) — se dispara con `push` a **`develop`** → "Deploy on Dev".

Pasos de cada uno:
1. `actions/checkout@v2`.
2. `actions/setup-node@v2` con **Node 16**.
3. `npm install --legacy-peer-deps` + `npm run build` (genera `./build/`).
4. **`SamKirkland/FTP-Deploy-Action@4.2.0`**: sube `./build/` por **FTP** al servidor, usando *secrets* (`host_prod`/`ftp_user_prod`/`ftp_password_prod` en main; `host`/`ftp_user`/`ftp_password` en develop).

> Conclusión de despliegue: el frontend se compila a HTML/JS/CSS estático y se publica por FTP en el hosting que también sirve el backend PHP. El `--legacy-peer-deps` es necesario porque el árbol de dependencias tiene conflictos de *peer dependencies* (React 17 vs librerías que esperan 18, etc.).

---

## 11. Observaciones técnicas y deuda detectada

> Solo a título informativo; este documento no modifica nada.

1. **Sin autenticación en el panel admin (`/status/*`)**: el frontend no protege esas rutas. Si el backend tampoco lo hace, sería un riesgo de seguridad serio (cualquiera podría crear/editar/borrar actividades, habilitarlas, ver estadísticas).
2. **URLs del backend hardcodeadas** en `api.js` y en varios componentes (`qslCreator.php`, `dinamic-content/...`). No hay `.env` ni configuración por entorno; cambiar de dominio exige tocar código.
3. **Cabeceras HTTP raras**: en `api.js` se envían valores como `'Content-Type':'Content-Type: text/html'` (el valor incluye el nombre de la cabecera repetido) — probablemente un error que el backend ignora.
4. **`class` vs `className`** en el JSX: uso masivo de `class=` que React no aplica; muchas clases de estilo podrían perderse silenciosamente.
5. **Comparaciones laxas** (`==`) y `// eslint-disable-next-line` por todo el código para silenciar warnings, en lugar de corregir las comparaciones (`===`).
6. **Código duplicado**: `handleAxiosError`, helpers de tamaño de archivo, `Imageconditional`, manejo de modales, etc., están copiados entre componentes.
7. **Dependencias muertas/duplicadas** en `package.json** (múltiples datepickers, FontAwesome 4 y 6 a la vez, `jsdom`, `parser`, `react-html-parser`, etc.).
8. **`index.html`** carga el **JS de Bootstrap desde una versión inexistente** (`bootstrap@6.4.2`, que no existe — Bootstrap va por la 5.x) con un `integrity` que no casará: ese `<script>` probablemente falla en silencio. El CSS sí apunta a `bootstrap@5.3.0`.
9. **Archivos residuales**: `public/index copy.html`, `index copy 2.html`, `robots.zip`, `src/logo.svg`, `reportWebVitals` comentado.
10. **React 17 + `ReactDOM.render`**: API legada; migrar a React 18 (`createRoot`) requeriría ajustar varias dependencias.
11. **Validaciones de fecha sospechosas** en `adminABM.js`/`activityEdit.js`: comparan `dateFrom.getUTCDate < actual.getUTCDate` (referencias a la **función**, no a su resultado `()`), por lo que esa validación nunca hace lo que aparenta.

---

## 12. Glosario de radioafición (para contexto del dominio)

| Término | Significado |
|---|---|
| **QSO** | Un contacto/comunicado de radio entre dos estaciones. |
| **QSL** | Tarjeta/confirmación de que un QSO ocurrió. Aquí se generan como imágenes. |
| **Indicativo / señal distintiva (callsign)** | Identificador único de una estación (p. ej. `LU4DQ`). |
| **Corresponsal** | La otra estación con la que se hace el contacto. |
| **Banda** | Rango de frecuencias (160m, 80m, 40m, 20m, 2m, 70cm, etc.). |
| **Modo** | Tipo de modulación/transmisión (CW, SSB, FM, FT8, RTTY, SSTV…). |
| **RST** | Reporte de señal (Readability, Strength, Tone) entregado/recibido. |
| **SWL** | *Short Wave Listener*, radioescucha (solo escucha, no transmite). |
| **UTC/GMT** | Hora universal; en radioafición todos los logs van en UTC. |
| **ADIF** | Formato estándar de archivo para intercambiar logs entre programas. |
| **Diploma / certificado** | Reconocimiento por completar los requisitos de una actividad/concurso. |

---

## 13. Conclusión

`lu4dq` es el **cliente web React** (JavaScript/JSX, Create React App) del sistema de logs y diplomas del **Radio Club Quilmes**. Su responsabilidad es presentar formularios y listados, y orquestar llamadas a una **API PHP externa** que hace el trabajo pesado (persistencia en base de datos, parseo de ADIF y generación de imágenes de QSL/certificados). Se despliega como estáticos vía FTP mediante GitHub Actions, bajo la subruta `/wp/logs`. Funcionalmente cubre: carga manual y masiva de contactos, consulta y descarga de QSL, publicación de actividades con sus rankings, y un panel de administración (estadísticas, validación cruzada de QSO, ABM de actividades y plantillas de documentos).

El código es funcional y está orientado al dominio, pero arrastra **deuda técnica** típica de un proyecto que creció en el tiempo: dependencias sin usar, código duplicado, mezcla de componentes de clase y funcionales, `class` vs `className`, y ausencia de control de acceso en el frontend para las rutas administrativas.
