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

// UID akun admin (email/password). Isi dari Firebase Console: Authentication > Users > kolom User UID.
// UID yang sama juga harus ditulis di firestore.rules dan storage.rules (ganti ADMIN_UID_PLACEHOLDER).
export const ADMIN_UID = "2aSB3bThloO9mAAjG6VTjwrP9XD2";

// ID acara. Ganti per acara agar foto dan kuota tiap acara terpisah.
// Hanya huruf, angka, "-" dan "_" (dipakai sebagai nama folder Drive).
export const EVENT_ID = "acara-pertama";

// URL Web App Apps Script (berakhiran /exec). Isi setelah deploy apps-script/Code.gs.
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzDBjzOFX7lkY6EplDlVifLAHTySEslb9iRiyp_5uh_YGQEmNvMwxLhnCpSs4Uz-u9/exec";