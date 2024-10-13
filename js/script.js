const maxChars=18;

const asegurarLength= (title) =>{
  if (title.length > maxChars) {
    return title.slice(0, maxChars) + '...'; 
  }
  return title; 
}

async function cargarImagenes() {
  try {
      const response = await fetch("https://67070a84a0e04071d228f87b.mockapi.io/todo");
      const imagenes = await response.json();

      console.log(imagenes); // Verifico la respuesta de la API

      const reel = document.getElementById("photo-reel");
      const carouselInner = reel.querySelector(".carousel-inner");
      carouselInner.innerHTML = ""; // Limpio el contenido existente

      imagenes.forEach((imagen) => {
          const card = document.createElement("article");
          card.classList.add("card");

          card.innerHTML = `
              <h2 class="card-title">${asegurarLength(imagen.titulo)}</h2>
              <img src="${imagen.url}" alt="${imagen.titulo}" class="card-img lazy">
              <div class="card-content">
                  <p class="card-date">Fecha: ${new Date(imagen.fecha).toLocaleString()}</p>
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
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer.");

  if (confirmacion) {
      try {
          const response = await fetch(`https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`, {
              method: "DELETE",
          });

          if (response.ok) {
              console.log(`Imagen con ID ${id} eliminada correctamente.`);
              cargarImagenes(); // Recarga las imágenes
              alert("La imagen se ha eliminado correctamente.");
          } else {
              console.error("Error al eliminar la imagen:", response.status);
              alert("Hubo un problema al eliminar la imagen. Por favor, inténtalo nuevamente.");
          }
      } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          alert("Ocurrió un error al intentar eliminar la imagen. Verifica tu conexión o vuelve a intentarlo.");
      }
  } else {
      console.log("La eliminación fue cancelada por el usuario.");
  }
}

async function editarImagen(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas editar esta publicación?');

  if (confirmacion) {
      const nuevoTitulo = prompt('Ingresa el nuevo título para la imagen:');

      if (nuevoTitulo === null || nuevoTitulo.trim() === '') {
          alert('La edición fue cancelada porque no se ingresó un título.');
          return;
      }
      const tituloSecured = asegurarLength(nuevoTitulo);
      try {
          const response = await fetch(`https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  titulo: tituloSecured, 
                  fecha: new Date().toISOString() // Cambié 'date' por 'fecha' para que coincida con el modelo
              })
          });

          if (response.ok) {
              console.log(`Imagen con ID ${id} editada correctamente.`);
              alert('La imagen se ha editado correctamente.');
              cargarImagenes(); // Recarga las imágenes
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

// Al cargar el documento, se invoca la función para cargar las imágenes
document.addEventListener("DOMContentLoaded", cargarImagenes);
