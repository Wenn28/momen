// Modul bersama semua halaman: inisialisasi Firebase dan helper kecil.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const $ = (id) => document.getElementById(id);

// Pesan status di elemen .msg (type: "", "ok", "error")
export function showMsg(el, text, type = "") {
  el.textContent = text;
  el.dataset.type = type;
}

// Kode room: 6 karakter tanpa huruf/angka yang mirip (0/O, 1/I/L) agar mudah diketik tamu
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export function newRoomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
}
export const cleanCode = (s) => (s || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
export const roomParam = () => cleanCode(new URLSearchParams(location.search).get("r"));

// Ambil data room; null bila kode tidak ada
export async function loadRoom(code) {
  if (code.length !== 6) return null;
  const snap = await getDoc(doc(db, "rooms", code));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Tanggal "2026-12-12" → "Sabtu, 12 Desember 2026"
export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return isNaN(d) ? "" : d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// Room dianggap aktif sampai hari acaranya lewat
export const isActive = (room) => !room.date || room.date >= new Date().toISOString().slice(0, 10);

// URL gambar Google Drive (folder Momen dibagikan "siapa saja dengan link")
// shortcut: endpoint thumbnail Drive tidak resmi dan bisa dibatasi saat trafik tinggi; pindah ke CDN bila sering gagal
export const driveImg = (fileId, width) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${width}`;
export const driveDownload = (fileId) => `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;

// Link yang dibagikan ke Tamu untuk satu room
export const guestUrl = (code) => new URL(`tamu.html?r=${code}`, location.href).href;

// SVG kode QR (library qrcode-generator dimuat lewat <script> di halaman yang butuh)
export function qrSvg(text, cell = 6) {
  const qr = window.qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: cell, margin: 2, scalable: true });
}

// Halaman khusus Host: arahkan ke login bila belum masuk dengan akun (bukan anonim)
export function requireHost(onReady) {
  onAuthStateChanged(auth, (user) => {
    if (!user || user.isAnonymous) { location.replace("host.html"); return; }
    const who = $("who");
    if (who) who.textContent = user.email || "";
    const out = $("btnLogout");
    if (out) out.onclick = () => signOut(auth).then(() => location.replace("host.html"));
    onReady(user);
  });
}

// Warna pita kartu room, diturunkan dari kodenya: membantu membedakan room sekilas
const SWATCHES = ["#D9A58B", "#8FA9A0", "#E6C27A", "#A99BC0", "#C98F8F"];
export const swatch = (code) => SWATCHES[[...code].reduce((n, c) => n + c.charCodeAt(0), 0) % SWATCHES.length];
