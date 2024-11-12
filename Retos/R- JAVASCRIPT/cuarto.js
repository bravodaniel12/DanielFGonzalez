// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir controles de cámara para permitir la navegación
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Añadir una luz ambiental y una luz puntual
const ambientLight = new THREE.AmbientLight(0x404040, 8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Cargar modelos 3D
const loader = new THREE.GLTFLoader();

// Astronauta
loader.load('https://modelviewer.dev/shared-assets/models/Astronaut.glb', function(gltf) {
  const model = gltf.scene;
  model.scale.set(1, 1, 2);  // Ajusta la escala del astronauta
  model.position.set(0, 1, 0); // Posición del astronauta en el centro de la escena
  scene.add(model);
}, undefined, function(error) {
  console.error('Error al cargar el modelo 3D:', error);
});

// Crear el fondo de estrellas
const textureLoader = new THREE.TextureLoader();
const spaceTexture = textureLoader.load('https://images.pexels.com/photos/10064346/pexels-photo-10064346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'); // Fondo espacial

// Usamos una esfera grande para simular el espacio
const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshBasicMaterial({
  map: spaceTexture,
  side: THREE.BackSide  // Para que las estrellas sean visibles desde dentro
});
const spaceSphere = new THREE.Mesh(geometry, material);
scene.add(spaceSphere);

// Planeta (opcional)
const planetTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const planetGeometry = new THREE.SphereGeometry(12, 40, 47);
const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(15, -2, -20); // Posición del planeta
scene.add(planet);

// Configurar la cámara
camera.position.set(1, 2, 10); // Ajusta la posición inicial de la cámara

// Animación
const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

// Ajustar el tamaño del renderizador al tamaño de la ventana
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
