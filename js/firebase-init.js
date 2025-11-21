import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase, ref, push, serverTimestamp as rtdbTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC9VKgQhcHp5DCSiaHszyGWcXnTt7Acv7w",
    authDomain: "barbershop-16efc.firebaseapp.com",
    databaseURL: "https://barbershop-16efc-default-rtdb.firebaseio.com",
    projectId: "barbershop-16efc",
    storageBucket: "barbershop-16efc.firebasestorage.app",
    messagingSenderId: "1000347604610",
    appId: "1:1000347604610:web:ceb2c4f200efd2fddb869b",
    measurementId: "G-3JC9LKGCBQ"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

window.firebaseServices = {
    app,
    rtdb,
    ref,
    push,
    serverTimestamp: rtdbTimestamp
};

(async () => {
    try {
        if (typeof window !== "undefined" && (await isSupported())) {
            getAnalytics(app);
        }
    } catch (error) {
        console.warn("Firebase analytics was not initialized:", error);
    }
})();
