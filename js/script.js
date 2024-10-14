const maxChars = 18;

const asegurarLength = (title) => {
  if (title.length > maxChars) {
    return title.slice(0, maxChars) + "...";
  }
  return title;
};

async function cargarImagenes() {
  try {
    const response = await fetch(
      "https://67070a84a0e04071d228f87b.mockapi.io/todo"
    );
    const imagenes = await response.json();

    console.log(imagenes);

    const reel = document.getElementById("photo-reel");
    const carouselInner = reel.querySelector(".carousel-inner");
    carouselInner.innerHTML = "";

    imagenes.forEach((imagen) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
              <h2 class="card-title">${asegurarLength(imagen.titulo)}</h2>
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
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Eliminado", "La imagen ha sido eliminada correctamente.", "success");
          cargarImagenes();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema al eliminar la imagen. Por favor, inténtalo nuevamente.",
          });
        }
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al intentar eliminar la imagen. Verifica tu conexión o vuelve a intentarlo.",
        });
      }
    } else {
      Swal.fire("Cancelado", "La imagen no fue eliminada.", "info");
    }
  });
}

async function editarImagen(id) {
  const { value: nuevoTitulo } = await Swal.fire({
    title: "Editar título",
    input: "text",
    inputLabel: "Ingresa el nuevo título para la imagen:",
    inputPlaceholder: "Nuevo título",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar un título";
      }
    },
  });

  if (nuevoTitulo) {
    const tituloSecured = asegurarLength(nuevoTitulo);
    try {
      const response = await fetch(
        `https://67070a84a0e04071d228f87b.mockapi.io/todo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: tituloSecured,
            fecha: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        Swal.fire("Editado", "La imagen ha sido editada correctamente.", "success");
        cargarImagenes();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al editar la imagen. Por favor, inténtalo nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al editar la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al intentar editar la imagen. Verifica tu conexión o vuelve a intentarlo.",
      });
    }
  } else {
    Swal.fire("Cancelado", "La edición fue cancelada.", "info");
  }
}


document.addEventListener("DOMContentLoaded", cargarImagenes);
