const CACHE_NAME = 'v1.cache.awp';
var urlToCache = [
    './', 
    './css/style.css',
    './index.html',
    'https://yardis.com.mx/wp-content/uploads/2020/07/Hamburguesa-Cowboy.jpg',
    'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/648EE69A-8E8C-437D-B4A2-EA22737D32E3/Derivates/A0CD10C9-5CE1-4A4F-93DE-24E2E65B7711.jpg',
    'https://www.nestleprofessional.com.mx/sites/default/files/styles/recipe/public/media/pastel_chocolate_principe_carlos_v_nestle_professional.png?itok=L2g4AmSG',
    'https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/4e4293857c03d819e4ae51de1e86d66a.jpg',
    'https://www.grupolantana.com/wp-content/uploads/10-datos-curiosos-sobre-los-helados.jpg',
    'https://t2.rg.ltmcdn.com/es/posts/6/3/4/pastel_de_moka_envinado_12436_600.jpg',
    'https://www.youtube.com/embed/iJ-CNJnTVHY',
    'https://www.youtube.com/embed/Jqr_H1GzNwE',
    'https://www.youtube.com/embed/Lv53tRWLYxI'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlToCache)
            .then(() => {
                self.skipWaiting();
            })
        })
        .catch(err => {
            console.log("NO SE HA RESGUARDADO EL CACHE", err)
        })
    )
})

// event activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === - 1){
                        // borrar los elementos que no necesita
                        return caches.delete(cacheName);
                    }
                })
            )
        })
        .then(() => {
            // activar la cache
            self.clients.claim();
        })
    )
})

// evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    )
})