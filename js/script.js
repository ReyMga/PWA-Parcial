async function cargarImagenes() {
  try {
    const response = await fetch(
      "https://67070a84a0e04071d228f87b.mockapi.io/todo"
    );
    const imagenes = await response.json();

    console.log(imagenes); // Verifico la respuesta de la API

    const reel = document.getElementById("photo-reel");
    const carouselInner = reel.querySelector(".carousel-inner");
    carouselInner.innerHTML = ""; // Limpio el contenido existente

    imagenes.forEach((imagen) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
                <h2 class="card-title">${imagen.titulo}</h2>
                <img src="${imagen.url}" alt="${
        imagen.titulo
      }" class="card-img lazy">
                <div class="card-content">
                    <p class="card-date">Fecha: ${new Date(
                      imagen.fecha
                    ).toLocaleString()}</p>
                </div>
                <button onClick="eliminarImagen(${imagen.id})">Eliminar</button>
                <button onClick="editarImagen(${imagen.id})">Editar</button>
            `;
      carouselInner.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
}

async function eliminarImagen(id) {
  // Muestro un mensaje de confirmación antes de eliminar
  const confirmacion = confirm(
    "¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer."
  );

  // Si el usuario confirma la eliminación
  if (confirmacion) {
    try {
      // Realizo una solicitud DELETE a la API
      const response = await fetch(
        `https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Imagen con ID ${id} eliminada correctamente.`);
        // Vuelvo a cargar las imágenes después de la eliminación
        cargarImagenes();
        // Muestro un mensaje de confirmación al usuario
        alert("La imagen se ha eliminado correctamente.");
      } else {
        console.error("Error al eliminar la imagen:", response.status);
        alert(
          "Hubo un problema al eliminar la imagen. Por favor, inténtalo nuevamente."
        );
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert(
        "Ocurrió un error al intentar eliminar la imagen. Verifica tu conexión o vuelve a intentarlo."
      );
    }
  } else {
    console.log("La eliminación fue cancelada por el usuario.");
  }
}

async function editarImagen(id) {
    // Muestro un mensaje de confirmación antes de editar
    const confirmacion = confirm('¿Estás seguro de que deseas editar esta publicación?');

    // Si el usuario confirma la edición
    if (confirmacion) {
        const nuevoTitulo = prompt('Ingresa el nuevo título para la imagen:');

        // Si el usuario cancela o no ingresa un nuevo título, se cancela la edición
        if (nuevoTitulo === null || nuevoTitulo.trim() === '') {
            alert('La edición fue cancelada porque no se ingresó un título.');
            return;
        }

        try {
            // Realizo una solicitud PUT a la API con los datos nuevos
            const response = await fetch(`https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: nuevoTitulo, 
                    date: new Date().toISOString() 
                })
            });

            if (response.ok) {
                console.log(`Imagen con ID ${id} editada correctamente.`);
                alert('La imagen se ha editado correctamente.');

                // Vuelvo a cargar las imágenes después de la edición
                cargarImagenes(); 
            } else {
                console.error('Error al editar la imagen:', response.status);
                alert('Hubo un problema al editar la imagen. Por favor, inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error al editar la imagen:', error);
            alert('Ocurrió un error al intentar editar la imagen. Verifica tu conexión o vuelve a intentarlo.');
        }
    } else {
        console.log('La edición fue cancelada por el usuario.');
    }
}


document.addEventListener("DOMContentLoaded", cargarImagenes);
