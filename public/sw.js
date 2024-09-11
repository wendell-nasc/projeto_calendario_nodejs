// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( [{"revision":"da84913bf34405cdcf82272e9a6026e1","url":"assets/index.9ce47bf7.css"},{"revision":"985f2114b3d468496c7adbe1c5579ff3","url":"assets/index.fc19b8f1.js"},{"revision":"edd52901062496d730f798529c367629","url":"index.html"}] );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',    
]

registerRoute(
    ({ request, url }) => {

        // console.log({request, url})
        if ( cacheNetworkFirst.includes( url.pathname ) ) return true
        
        return false;
    },
    new NetworkFirst()
)

// Referencia
// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )


const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {
        console.log({url})

        if ( cacheFirstNetwork.includes( url.href ) ) return true        

        return false;
    },
    new CacheFirst()
)



// Posteos Offline 
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)







//Producao

// https://wendell-calendario-cristino.up.railway.app/api/auth


registerRoute(
    new RegExp('https://wendell-calendario-cristino.up.railway.app/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('https://wendell-calendario-cristino.up.railway.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('https://wendell-calendario-cristino.up.railway.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)