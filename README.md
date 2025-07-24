# Quiz App - Preguntas y Respuestas

Una aplicación web profesional y responsive para crear quizzes interactivos cargando preguntas desde archivos Excel.

## 🚀 Características

- **Carga desde Excel**: Importa preguntas desde archivos .xlsx
- **Responsive**: Optimizado para móviles, tablets y desktop
- **Preguntas aleatorias**: Selecciona 10 preguntas al azar del archivo
- **Interfaz moderna**: Diseño minimalista con animaciones suaves
- **PWA Ready**: Puede instalarse como aplicación móvil
- **Resultados detallados**: Muestra puntuación y porcentaje final

## 📋 Formato del archivo Excel

El archivo Excel debe tener exactamente 5 columnas:

| Pregunta | Respuesta Verdadera | Respuesta Falsa 1 | Respuesta Falsa 2 | Respuesta Falsa 3 |
|----------|--------------------|--------------------|--------------------|--------------------|
| ¿Cuál es la capital de Francia? | París | Londres | Roma | Berlín |
| ¿Cuál es el planeta más cercano al Sol? | Mercurio | Venus | Marte | Júpiter |

## 🛠️ Instalación

1. **Clona o descarga** los archivos del proyecto
2. **Abre** `index.html` en tu navegador web
3. **Carga** tu archivo Excel o usa las preguntas de ejemplo

### Para crear el archivo Excel de ejemplo:

```bash
# Si tienes Node.js instalado
npm install xlsx
node create_excel.js
```

Esto creará un archivo `quiz.xlsx` con preguntas de ejemplo.

## 📱 Uso

1. **Cargar archivo**: Haz clic en "Seleccionar archivo Excel" y elige tu archivo .xlsx
2. **Alternativamente**: Usa "Usar preguntas de ejemplo" para probar la app
3. **Comenzar**: Haz clic en "Comenzar Quiz"
4. **Responder**: Selecciona una de las 4 opciones para cada pregunta
5. **Resultados**: Al final verás tu puntuación y porcentaje

## 🎨 Personalización

### Colores
Puedes cambiar los colores principales editando las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --error-color: #f56565;
}
```

### Número de preguntas
Para cambiar el número máximo de preguntas, edita en `script.js`:

```javascript
this.maxQuestions = 10; // Cambia este valor
```

## 📦 Archivos incluidos

- `index.html` - Estructura principal de la aplicación
- `styles.css` - Estilos y diseño responsive
- `script.js` - Lógica de la aplicación
- `manifest.json` - Configuración PWA
- `sw.js` - Service Worker para funcionalidad offline
- `create_excel.js` - Script para generar archivo Excel de ejemplo
- `README.md` - Este archivo de documentación

## 🌐 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Móviles, tablets, desktop
- **Formatos**: Archivos Excel .xlsx y .xls

## 🔧 Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsive con Flexbox y Grid
- **JavaScript ES6+**: Lógica de la aplicación
- **SheetJS**: Librería para leer archivos Excel
- **PWA**: Service Worker para funcionalidad offline

## 📱 Instalación como PWA

1. Abre la aplicación en Chrome (móvil o desktop)
2. Busca el ícono "Instalar" en la barra de direcciones
3. Haz clic en "Instalar" para añadirla a tu pantalla de inicio

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes sugerencias:

1. Verifica que tu archivo Excel tenga el formato correcto
2. Asegúrate de usar un navegador moderno
3. Revisa la consola del navegador para errores

## 🎯 Próximas características

- [ ] Temporizador por pregunta
- [ ] Diferentes tipos de pregunta
- [ ] Exportar resultados
- [ ] Modo multijugador
- [ ] Temas personalizables