
// On écoute l'évènement install pour effectuer les actions de démarrage
self.addEventListener('install', (event) => {

    // Ici on utilise waitUntil qui attends une promesse pour valider l'installation
    
      event.waitUntil(
    
    /*
    caches : c'est un API, qui contient un ensemble de fonctionnalités
    V1 : c'est le nom de cache qui va contenir les ressources de notre site.
    */
    
    // then.(cache) : elle va me retourner un pointeur sur le cache.
    
    caches.open('v1').then((cache) => {
            
     // On met en cache une liste d'URLs (les ressources statiques de notre site) qui sont la fondation de notre application.
      return cache.delete([
              './index.html',
              './ajouter.html',
              './consulter.html',
              './cours.html',
              './ds.html',
              './examen.html',
              './revision.html',
              './td.html',
              './tp.html',
              './Images/icon/icon72.png',
              './Images/icon/icon384.png',
              './Css/bootstrap.min.css',
              './Css/style.css',
              './Css/bootstrap.min.css.map',
              './JS/bootstrap.bundle.min.js',
              './JS/app.js',
              './JS/main.js',
              './JS/script.js',
              './JS/bootstrap.bundle.min.js.map',
              './manifest.json',
              './sw.js'
            ]);
          })
        );
      });
    
    
    /*
    On indique que pour chaque requêtes, si cela match nos URLs de cache défini plus haut, 
    alors on servira le cache plutôt que d'effectuer la vrai requête par le réseau.
    */
    self.addEventListener('fetch', (event) => {
     // self: pour dire le service worker 
    
    
    // répondre par les données en cache si existe sinon récupérer la ressource.
      event.respondWith(
    
    
    //est-ce que dans mon cache j’ai une entrée qui correspond à la requête qui est en cours d’émission, qui va l’intercepter
        caches.match(event.request).then((resp) => {
    /*
    La réponse finale retournée: soit j’ai la réponse définie dans le cache soit je vais exécuter la requête http physiquement 
    sur le réseau grâce à l’API  pour récupérer la ressource demandée si c’est pas définie dans le cache : donc faire un appel 
    réseau pour les récupérer
    */
          return resp || fetch(event.request).then((response) => {
              return caches.open('v1').then((cache) => {
                cache.put(event.request, response.clone());
                return response;
              });
            });
          })
        );
      });


      self.addEventListener("activate", function(event) {
        /* Just like with the install event, event.waitUntil blocks activate on a promise.
           Activation will fail unless the promise is fulfilled.
        */
        console.log('WORKER: activate event in progress.');
      
        event.waitUntil(
          caches
          
            .keys()
            .then(function (keys) {
              // We return a promise that settles when all outdated caches are deleted.
              return Promise.all(
                keys
                  .filter(function (key) {
                    // Filter by keys that don't start with the latest version prefix.
                    return !key.startsWith(version);
                  })
                  .map(function (key) {
                    /* Return a promise that's fulfilled
                       when each outdated cache is deleted.
                    */
                    return caches.delete(key);
                  })
              );
            })
            .then(function() {
              console.log('WORKER: activate completed.');
            })
        );
      });
