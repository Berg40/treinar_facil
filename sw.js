const CACHE_NAME = 'treinofacil-v1';
const ASSETS = [
  './',
  './index.html',
  './treino.html',
  './calculadora.html',
  './dieta.html',
  './style.css',
  './tmb.css',
  './script.js',
  './script_tmb.js',
  '.img/logo_treino_facil.png',
  '.style2.css',
  './muaythai.html', // <--- ADICIONE AQUI
         // <--- ADICIONE ESTA LINHA (não esqueça a vírgula na linha anterior)
  './manifest.json'    // <--- Importante salvar o manifesto também
  
  // Adicione aqui outras imagens ou arquivos que queira que funcionem offline
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
