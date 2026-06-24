// Busca el elemento <canvas> del HTML y lo guarda en la variable canvas
const canvas = document.getElementById("canvas");

// Activa el modo de dibujo 2D del canvas
const ctx = canvas.getContext("2d");

// Hace que el canvas ocupe todo el ancho de la ventana
canvas.width = window.innerWidth;

// Hace que el canvas ocupe todo el alto de la ventana
canvas.height = window.innerHeight;

// Color con el que se dibujara el texto base
ctx.fillStyle = "white";

// Fuente del texto base
ctx.font = "bold 80px Arial";

// Centra el texto horizontalmente
ctx.textAlign = "center";

// Centra el texto verticalmente
ctx.textBaseline = "middle";

// Dibuja el texto base para poder leer sus pixeles
ctx.fillText(
    "Hola Mabelcita",
    canvas.width / 2,
    canvas.height / 2 + 190
);
ctx.fillText(
    "❤️",
    canvas.width / 2,
    canvas.height / 2 + 280

);

// Obtiene todos los pixeles del canvas
const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
);

// Array donde guardaremos todas las particulas
const particles = [];

//movimiento con el mouse
const mouse = {
    x: null,
    y: null,
    radius: 100
};
window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
//Funcion del corazon
function createHeartParticles() {
    for (let i = 0; i < 1800; i++) {

        const t = Math.random() * Math.PI * 2;
        const scale = Math.sqrt(Math.random());

        let heartX = 16 * Math.pow(Math.sin(t), 3);

        let heartY = -(
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t)
        );
        heartX *= 14 * scale;
        heartY *= 14 * scale;

            particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: canvas.width / 2 + heartX,
            baseY: canvas.height / 2 - 120 + heartY,
            targetX: canvas.width / 2 + heartX,
            targetY: canvas.height / 2 - 120 + heartY,
            type: "heart"
        });

        
    }
}
//Ejecuta la funcion
createHeartParticles();


// Recorre el canvas verticalmente
for (let y = 0; y < canvas.height; y += 6) {

    // Recorre el canvas horizontalmente
    for (let x = 0; x < canvas.width; x += 6) {

        // Calcula la posicion del pixel dentro del array imageData
        const index = (y * canvas.width + x) * 4;

        // Obtiene el valor alpha del pixel
        const alpha = imageData.data[index + 3];

        // Si el pixel pertenece al texto
        if (alpha > 128) {

            // Crea una particula con posicion inicial aleatoria
            // y con destino en la posicion del texto
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: x,
                targetY: y,
                type: "text"
            });
        }
    }
}

// Funcion que anima las particulas
function animate() {

    // Limpia el canvas en cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const beat = 1 + Math.sin(Date.now() * 0.006) * 0.08;

    // Recorre cada particula
    for (let particle of particles) {

        if (particle.type === "heart"){
            particle.targetX = canvas.width / 2 + (particle.baseX - canvas.width / 2) * beat;
            particle.targetY = canvas.height / 2 - 120 + (particle.baseY - (canvas.height / 2 - 120)) * beat;

        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius){
            particle.x += dx / 10;
            particle.y += dy / 10;
        }

        // Mueve la particula poco a poco hacia su destino
        particle.x += (particle.targetX - particle.x) * 0.12;
        particle.y += (particle.targetY - particle.y) * 0.12;

        // Empieza un nuevo dibujo
        ctx.beginPath();

        // Dibuja la particula como circulo
        ctx.arc(
            particle.x,
            particle.y,
            1.5,
            0,
            Math.PI * 2
        );

        // Color de la particula
        ctx.fillStyle = "#ff4da6";
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#ff4da6";

        // Rellena el circulo
        ctx.fill();
    }

    // Repite la animacion
    requestAnimationFrame(animate);
}

// Inicia la animacion
animate();




