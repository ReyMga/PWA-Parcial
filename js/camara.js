const archivoEntrada = document.getElementById('archivo-subido');
const previsualizacion = document.querySelector('.imagen-previa'); 
const botonPublicar = document.getElementById('boton-publicar');
const tituloImagen = document.getElementById('titulo-imagen');

// Creo función para redimensionar la imagen usando un canvas
const redimensionarImagen = (imgBase64, maxWidth = 600, maxHeight = 600) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imgBase64;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

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

            resolve(canvas.toDataURL('image/jpeg', 0.6)); 
        };
    });
};

const previsualizarImagen = (archivo) => {
    if (archivo) {
        const lectorArchivo = new FileReader();
        lectorArchivo.onload = (evento) => {
            previsualizacion.src = evento.target.result; 
        };
        lectorArchivo.readAsDataURL(archivo);
    }
};

const validarCampos = () => {
    if (!tituloImagen.value.trim() || !previsualizacion.src) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos antes de publicar.',
        });
        return false;
    }
    return true;
};

// Creo función para enviar la imagen a MockAPI
const enviarImagen = async () => {
    const titulo = tituloImagen.value.trim();
    const imagenBase64 = previsualizacion.src;

    // Acá redimensiono la imagen antes de enviarla
    const imagenRedimensionada = await redimensionarImagen(imagenBase64);

    const datosImagen = {
        titulo: titulo,
        url: imagenRedimensionada,
        fecha: new Date().toISOString()
    };

    try {
        Swal.fire({
            title: 'Publicando imagen...',
            html: '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const respuesta = await fetch('https://67070a84a0e04071d228f87b.mockapi.io/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosImagen)
        });

        if (respuesta.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Imagen publicada con éxito.',
            }).then(() => {
                window.location.href = 'index.html'; 
            });
        } else {
            const errorTexto = await respuesta.text();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al publicar la imagen: ${errorTexto}`,
            });
        }
    } catch (error) {
        console.error('Error al enviar la imagen:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al enviar la imagen. Revisa la consola para más detalles.',
        });
    }
};

// Función para verificar el estado de la conexión
const updateOnlineStatus = () => {
    if (navigator.onLine) {
        botonPublicar.disabled = false;
        botonPublicar.textContent = "Publicar";
    } else {
        botonPublicar.disabled = true;
        botonPublicar.textContent = "Sin conexión";
        Swal.fire({
            icon: 'info',
            title: 'Sin conexión',
            text: 'Actualmente estás sin conexión. No podrás publicar imágenes hasta que se restablezca.',
        });
    }
};

// Acá se detectan los cambios en el estado de conectividad
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Llamo a la función al cargar la página para configurar el estado inicial
updateOnlineStatus();

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
