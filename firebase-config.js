// Konfigurasi project Firebase.
// Isi dari Firebase Console: Project settings > General > Your apps > Web app > SDK setup (Config).
export const firebaseConfig = {
  apiKey: "AIzaSyDVB5fzUuse6gkbKoUFTROx41VNBJVGru8",
  authDomain: "momen-4f310.firebaseapp.com",
  projectId: "momen-4f310",
  storageBucket: "momen-4f310.firebasestorage.app",
  messagingSenderId: "347072594212",
  appId: "1:347072594212:web:c8e86bdd3b26ff2a9073b1"
};

// Host tidak lagi diatur di sini: email Host yang diizinkan dicatat di Firestore, koleksi "hosts" (lihat README).
// Room dan kodenya dibuat Host dari halaman host.html.

// URL Web App Apps Script (berakhiran /exec). Isi setelah deploy apps-script/Code.gs.
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzDBjzOFX7lkY6EplDlVifLAHTySEslb9iRiyp_5uh_YGQEmNvMwxLhnCpSs4Uz-u9/exec";