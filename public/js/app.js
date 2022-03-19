importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');
window.onload=()=>{

    'use strict';
    if ("serviceWorker" in navigator) {
        // S'il le supporte alors on passe à l'enregistrement du service worker
            navigator.serviceWorker.register("sw.js");
            messaging.useServiceWorker(registration);
        } else {
            console.warn('Not supported')
        }
}
