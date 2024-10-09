const photoForm = document.getElementById('photo-form');
const photoPreview = document.getElementById('photo');
const cancelBtn = document.getElementById('cancel-btn');
const publishBtn = document.getElementById('publish-btn');

let photoData;

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

  
}

photoForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; 
});

startCamera();
