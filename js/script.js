
const photoReel = document.getElementById('photo-reel');
const captureButton = document.getElementById('capture-button');

async function loadPhotos() {
    const response = await fetch('https://mockapi.io/photos'); 
    const photos = await response.json();

    photoReel.innerHTML = '';

    photos.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = photo.imageUrl; 
        img.alt = photo.title;

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = photo.title;

        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.textContent = new Date(photo.createdAt).toLocaleString(); 

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(footer);

        photoReel.appendChild(card);
    });
}

loadPhotos();

captureButton.addEventListener('click', () => {
    window.location.href = 'camara.html'; 
});
