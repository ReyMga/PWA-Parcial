# 🐾 Instagram Pets & Pals - Progressive Web Application (PWA) 🐾

## Descripción
**Instagram Pets & Pals** es una aplicación web progresiva (PWA) diseñada para que los amantes de las mascotas puedan compartir y visualizar fotos de sus **mejores amigos peludos**. 🐶🐱

Los usuarios pueden:
- Tomar fotos de sus mascotas 🐕‍🦺.
- Agregarles un título 📸.
- Publicarlas en la plataforma MockAPI para que todos puedan verlas 🎉.

## Funcionalidades 🌟
- **Reel de Fotos**: Al iniciar la aplicación, se muestra un **reel** con las fotos publicadas. Cada foto está presentada en una **card HTML** que incluye:
  - **Imagen de la mascota** 🐾.
  - **Título o descripción** ✏️.
  - **Fecha y hora de publicación** 🕒.

- **Captura de Fotos**: Los usuarios pueden capturar nuevas fotos usando la **cámara del dispositivo móvil** o cargar imágenes desde la computadora. Las imágenes se convierten a **formato Base64** antes de ser enviadas a MockAPI.

- **Interacción con MockAPI**: La aplicación interactúa con MockAPI mediante métodos **GET** y **POST** para **recuperar** y **almacenar** las fotos publicadas. 🔄

- **Manejo de Conectividad**: Si la aplicación detecta que se ha perdido la conexión, deshabilita el botón de publicación y lo habilita cuando la conectividad vuelva. 🔌📡

## Estructura del Proyecto 📂
- `index.html`: Página principal que muestra el reel de fotos publicadas. 🖼️
- `camara.html`: Página dedicada a capturar nuevas fotos y publicarlas.
- `styles.css`: Archivo de estilos CSS para asegurar una experiencia visual consistente en dispositivos móviles. 📱
- `manifest.json`: Archivo de configuración de la PWA, que permite la instalación de la aplicación en dispositivos y define los íconos y colores. 🎨
- `index.js`: Lógica de JavaScript para manejar las publicaciones, cargando dinámicamente las fotos del reel. 💻
- `camara.js`: Lógica de JavaScript para capturar fotos, previsualizarlas y subirlas a MockAPI en formato Base64.

## Instalación 🛠️
1. **Clona** el repositorio del proyecto.
2. Crea una cuenta en **MockAPI** para configurar los endpoints necesarios.
3. **Sube el proyecto a GitHub** y habilita **GitHub Pages** para hacer la aplicación accesible desde la web.
4. Configura el archivo `manifest.json` con la información de la aplicación.

## Requisitos ✅
- **Dispositivo móvil** con acceso a la cámara (o una computadora para cargar imágenes).
- **Navegadores recomendados**: Google Chrome, Microsoft Edge, o Safari (iOS versión 16 o superior para soporte de imágenes WebP).
- Tamaño máximo de imagen a subir: **200 KB**.

## Cómo usar 📸
1. Accede a `index.html` para ver las fotos publicadas en el **reel**.
2. Haz clic en el botón de cámara para **capturar** una nueva foto o **subir** una existente.
3. Completa el campo de **título**, ajusta la imagen si es necesario, y presiona **Aceptar** para publicar.

## API Utilizada 🌐
[MockAPI](https://mockapi.io/)

## Capturas de Pantalla 🖼️
Aquí puedes agregar capturas de pantalla de tu proyecto:

1. **Página principal (index.html)**:
   ![Página principal](./img/screenshot.png)

2. **Página de la cámara para cargar fotos (camara.html)**:
   ![Página de la cámara](./img/screenshot2.png)

3. **Previsualización de la imagen**:
   ![Previsualización](./img/screenshot-3.png)

## Autor ✍️
Proyecto realizado por **Raquel Muriega** para el parcial de PWA en **ISTEA**.
---

### 🎉 ¡Gracias por revisar *Instagram Pets & Pals*! 🎉
