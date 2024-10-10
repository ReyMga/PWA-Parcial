const archivoEntrada = document.getElementById('archivo-subido');
const previsualizacion = document.getElementById('imagen-previa');
const botonPublicar = document.getElementById('boton-publicar');
const tituloImagen = document.getElementById('titulo-imagen');

// Función para redimensionar la imagen usando un canvas
const redimensionarImagen = (imgBase64, maxWidth = 600, maxHeight = 600) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imgBase64;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Redimensionar manteniendo la proporción
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            // Dibujar la imagen redimensionada en el canvas
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convertir de nuevo a base64 con menor calidad
            resolve(canvas.toDataURL('image/jpeg', 0.6)); // Calidad 60%
        };
    });
};

// Función para previsualizar la imagen seleccionada
const previsualizarImagen = (archivo) => {
    if (archivo) {
        const lectorArchivo = new FileReader();
        lectorArchivo.onload = (evento) => {
            previsualizacion.src = evento.target.result;
        };
        lectorArchivo.readAsDataURL(archivo);
    }
};

// Función para validar los campos del formulario
const validarCampos = () => {
    if (!tituloImagen.value.trim() || !previsualizacion.src) {
        alert('Por favor, completa todos los campos.');
        return false;
    }
    return true;
};

// Función para enviar la imagen a MockAPI
const enviarImagen = async () => {
    const titulo = tituloImagen.value.trim();
    const imagenBase64 = previsualizacion.src;

    // Redimensionar la imagen antes de enviarla
    const imagenRedimensionada = await redimensionarImagen(imagenBase64);

    const datosImagen = {
        titulo: titulo,
        url: imagenRedimensionada,
        fecha: new Date().toISOString()
    };

    try {
        const respuesta = await fetch('https://67070a84a0e04071d228f87b.mockapi.io/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosImagen)
        });

        if (respuesta.ok) {
            alert('Imagen publicada con éxito');
            window.location.href = 'index.html';
        } else {
            const errorTexto = await respuesta.text();
            alert(`Error al publicar la imagen: ${errorTexto}`);
        }
    } catch (error) {
        console.error('Error al enviar la imagen:', error);
        alert('Error al enviar la imagen. Revisa la consola para más detalles.');
    }
};

// Eventos
archivoEntrada.addEventListener('change', (evento) => {
    const archivoSeleccionado = evento.target.files[0];
    previsualizarImagen(archivoSeleccionado);
});

botonPublicar.addEventListener('click', () => {
    if (validarCampos()) {
        enviarImagen();
    }
});
