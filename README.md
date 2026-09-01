# Navaja Suiza

Colección de calculadoras estáticas para arquitectura y construcción:

- **Escalímetro:** convierte longitudes reales y de plano para relaciones `1:n`.
- **Escaleras:** calcula escaleras rectas y helicoidales, distribuye tramos y presenta comprobaciones de geometría y normativa.
- **Rampas:** verifica una longitud disponible, calcula una longitud mínima o resuelve libremente longitud, desnivel y pendiente.

## Uso local

No hay compilación ni servidor de aplicación. Para conservar el mismo origen entre páginas, sirve el directorio con cualquier servidor HTTP estático:

```bash
python3 -m http.server 8000
```

Abre <http://localhost:8000>. Los datos se guardan exclusivamente en `localStorage` del navegador.

## Desarrollo y comprobaciones

Se requiere Node.js 20 o posterior. Las pruebas usan únicamente el runner incluido en Node, por lo que no es necesario instalar dependencias:

```bash
npm test
npm run check:js
npm run check:html
npm run check
```

`npm test` cubre las utilidades numéricas y casos básicos de conversión. `check:js` verifica la sintaxis de todos los scripts inline y `check:html` comprueba la estructura básica y los identificadores de las páginas.

## Criterios y alcance

Las páginas incluyen referencias de apoyo a NTC 2025, MNTA 2024 y, para Cablebús, SEMOVI 2026. El texto de cada resultado identifica el criterio aplicado. Las tolerancias de comparación usadas en los cálculos evitan que errores mínimos de coma flotante cambien una clasificación en una frontera.

La indicación **“cumple”** significa únicamente que los parámetros introducidos satisfacen los criterios que la pantalla evalúa. No constituye una validación integral del proyecto y no sustituye:

- la revisión de la normativa vigente y aplicable al inmueble;
- el cálculo estructural;
- la revisión de evacuación, protección civil, barandales, pasamanos y detalles constructivos;
- la validación y firma de un profesional responsable.

Antes de usar un resultado en obra debe confirmarse que las ediciones normativas citadas sigan vigentes y que no existan disposiciones locales o condiciones particulares adicionales.

## Seguridad de despliegue

Las páginas incluyen una política CSP básica mediante `<meta>`. Las directivas que controlan quién puede embeber el sitio deben enviarse como cabeceras HTTP. En producción se recomienda configurar, al menos:

```text
Content-Security-Policy: frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
```

El siguiente endurecimiento recomendado es mover estilos, scripts y manejadores inline a archivos externos para poder retirar `'unsafe-inline'` de la CSP.

## Estructura

```text
index.html                 portada interactiva
escalimetro.html           conversor de escalas
escaleras.html             calculadora de escaleras
pendientes.html            calculadora de rampas
assets/js/shared.js        validación y utilidades compartidas
scripts/                   comprobaciones para desarrollo
tests/                     pruebas automatizadas
```

## Limitaciones conocidas

- La aplicación funciona completamente en el navegador y no sincroniza datos entre dispositivos.
- La disponibilidad de exportación PNG depende del soporte de SVG, canvas y fuentes del navegador.
- Las referencias normativas deben revisarse periódicamente; el repositorio no descarga actualizaciones automáticamente.
