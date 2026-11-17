# Momen Clone

Aplikasi upload foto acara. HTML, CSS, dan JavaScript murni, tanpa build step, **Rp0 tanpa kartu kredit**.

- **Firebase (paket gratis Spark)**: login Tamu dan Admin, Kuota Foto, daftar foto realtime.
- **Google Drive + Apps Script**: menyimpan file foto. Alasannya ada di [docs/adr/0001-foto-di-google-drive.md](docs/adr/0001-foto-di-google-drive.md).

| File | Fungsi |
|------|--------|
| `index.html` | Halaman Tamu (bagikan lewat link/QR). Login anonim, maks 10 foto per Tamu. |
| `live.html` | Live Screen untuk proyektor, khusus Admin. |
| `admin.html` | Dashboard Admin: 500 foto terbaru, Sembunyikan/Tampilkan, link ke folder Drive. |
| `firebase-config.js` | Config Firebase, `ADMIN_UID`, `EVENT_ID`, `APPS_SCRIPT_URL`. |
| `apps-script/Code.gs` | Penerima upload, menyimpan foto ke Drive. |
| `firestore.rules` | Aturan keamanan Firestore. |
| `GLOSSARY.md` | Istilah project. |

## 1. Setup Firebase (tanpa kartu)

1. **Buat project** di [Firebase Console](https://console.firebase.google.com) dan tetap di paket **Spark**. Tambahkan **Web app**, lalu salin config ke `firebase-config.js`.
2. **Authentication > Sign-in method**: aktifkan **Anonymous** dan **Email/Password**.
3. **Authentication > Users > Add user**: buat akun Admin. Salin **User UID**-nya ke `ADMIN_UID` di `firebase-config.js` dan ke `ADMIN_UID_PLACEHOLDER` di `firestore.rules` (2 tempat).
4. **Firestore Database > Create database**: pilih **production mode**.
5. **Firestore > Rules**: salin isi `firestore.rules`, lalu **Publish**. Bisa juga lewat CLI: `firebase deploy --only firestore:rules`.

Firebase Storage **tidak** diaktifkan.

## 2. Setup Google Drive + Apps Script

1. Di [Google Drive](https://drive.google.com), buat folder **Momen**. Buka foldernya, lalu salin ID dari URL (`drive.google.com/drive/folders/<ID>`).
   - Tulis ID itu ke `ROOT_FOLDER_ID` di `apps-script/Code.gs`. Jangan taruh ID atau URL folder ini di file situs mana pun: folder ini akan dibagikan lewat link, jadi siapa pun yang tahu ID-nya bisa melihat semua foto.
   - Klik kanan folder **Momen > Share > General access: Anyone with the link, Viewer**. Semua foto di dalamnya ikut bisa dibuka lewat link, sehingga tampil di Live Screen. (Google menolak skrip Web App membagikan file satu per satu.)
2. Buka [script.google.com](https://script.google.com), lalu **New project**. Ganti isi `Code.gs` dengan file `apps-script/Code.gs` dari repo ini.
3. Isi `FIREBASE_API_KEY` dengan `apiKey` dari config Firebase.
4. **Deploy > New deployment > Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Izinkan akses Drive saat diminta. Salin **Web app URL** (berakhiran `/exec`) ke `APPS_SCRIPT_URL` di `firebase-config.js`.
6. Setiap kali `Code.gs` diubah: **Deploy > Manage deployments > Edit > Version: New version**. Tanpa langkah ini, URL lama tetap menjalankan kode lama.

## 3. Hosting

Halaman harus dibuka lewat HTTP/HTTPS, bukan `file://`, karena ES modules tidak jalan dari file lokal.

Kamera di halaman Tamu hanya menyala di **HTTPS** atau `localhost`. Membuka `http://192.168.x.x:8000` dari HP lain akan gagal dengan pesan "Kamera hanya bisa dibuka lewat alamat https://". Untuk tes di HP, pakai GitHub Pages atau Firebase Hosting (keduanya HTTPS).

- **Tes lokal**: `npx serve` atau `python -m http.server 8000`, lalu buka `http://localhost:8000`.
- **GitHub Pages**: push folder ini ke repo GitHub, lalu buka **Settings > Pages** dan pilih branch `main`, folder `/ (root)`. Tambahkan `<username>.github.io` di **Firebase > Authentication > Settings > Authorized domains**.
- **Firebase Hosting** (gratis di Spark): `firebase deploy --only hosting`. Hasilnya `https://<project-id>.web.app`.

Bagikan URL `index.html` ke Tamu (misalnya sebagai QR). Buka `live.html` di proyektor, dan `admin.html` untuk moderasi.

## 4. Per Acara

1. Ganti `EVENT_ID` di `firebase-config.js` (hanya huruf, angka, `-`, `_`), lalu deploy ulang hosting.
2. Setelah Acara selesai, buka folder `Momen/<EVENT_ID>` di Drive, klik kanan, lalu **Download**. Drive membuat file ZIP.

## 5. Saat Drive penuh

Satu Acara dengan 500+ Tamu memakan sekitar 1,5 GB. Cek ruang kosong di [drive.google.com/settings/storage](https://drive.google.com/settings/storage). Ingat bahwa 15 GB dibagi dengan Gmail dan Google Photos.

Untuk memindahkan Acara lama ke disk:
1. Unduh folder `Momen/<EVENT_ID>` sebagai ZIP, lalu simpan di laptop atau HDD eksternal.
2. Hapus folder itu dari Drive, lalu kosongkan **Trash**. Ruang baru kembali setelah Trash dikosongkan.
3. Di **Firestore > Data**, hapus `events/<EVENT_ID>`. Kalau tidak dihapus, Admin akan menampilkan gambar yang rusak.

## Batasan

- **Kuota Foto**: Apps Script menghitung file di folder Drive tiap Tamu, jadi mereset `count` di Firestore tidak menambah kuota. Dua upload serentak dari Tamu yang sama bisa lolos 1 foto ekstra.
- **Kapasitas**: Apps Script menangani sekitar 30 upload bersamaan. Firestore Spark mengizinkan 20 ribu tulis per hari, cukup untuk sekitar 1.000 Tamu aktif per hari.
- **Privasi**: foto bisa dibuka siapa saja yang punya link-nya. ID file Drive panjang dan acak.
- **Tampilan**: gambar memakai endpoint thumbnail Drive yang tidak resmi. Endpoint ini bisa lambat atau dibatasi saat trafik sangat tinggi.
- **Catatan palsu**: Tamu yang paham teknis bisa membuat dokumen foto dengan `fileId` sembarang. Akibatnya hanya muncul gambar rusak atau gambar lain yang memang sudah publik, dan Admin bisa menyembunyikannya.
- **UID anonim**: menghapus data situs atau ganti browser menghasilkan UID anonim baru, sehingga kuota juga baru.
