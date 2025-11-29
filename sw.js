const CACHE_NAME = 'treinofacil-v3'; // Mudei para v3
const ASSETS = [
  './',
  './index.html',
  './treino.html',
  './calculadora.html',
  './dieta.html',
  './muaythai.html',
  './style.css',
  './tmb.css',
  './script.js',
  './script_tmb.js',
  './img/logo_treinoFacil.png',       // <--- CAMINHO CORRETO AQUI
  './manifest.json',
  './audio/gong-sound2.mp3'
];




// Instalação: Salva os arquivos no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se houver atualização
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptação: Serve o arquivo do cache se estiver offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
