# Momen

Aplikasi foto acara. Host membuat **room**, tamu bergabung dengan kode room atau scan QR, lalu foto tamu tampil di Live Screen. HTML, CSS, dan JavaScript murni, tanpa build step, **Rp0 tanpa kartu kredit**.

- **Firebase (paket Spark gratis):** login Host (Google atau email), login anonim Tamu, data room, kuota, dan daftar foto realtime.
- **Google Drive + Apps Script:** menyimpan file foto. Alasannya ada di [docs/adr/0001-foto-di-google-drive.md](docs/adr/0001-foto-di-google-drive.md).

## Halaman

| File | Untuk | Isi |
|------|-------|-----|
| `index.html` | Tamu | Masukkan kode room. |
| `tamu.html?r=KODE` | Tamu | Foto sekarang atau pilih dari galeri HP, dengan sisa kuota dan progres kirim. |
| `galeri.html?r=KODE` | Tamu | Foto yang sudah tampil (bila Host membuka galeri). |
| `host.html` | Host | Masuk, daftar, lupa kata sandi, lalu daftar room. |
| `buat.html` | Host | Buat room: nama, tanggal, lokasi, kuota, pengaturan tamu. |
| `kelola.html?r=KODE` | Host | Statistik, setujui atau sembunyikan foto, unduh per foto, QR dan link room. |
| `live.html?r=KODE` | Host | Layar proyektor 16:9: foto terbaru, strip foto, QR untuk tamu. |
| `qr.html?r=KODE` | Host | Kartu QR 16:9 siap cetak (A5 mendatar). |

`style.css` dan `app.js` dipakai semua halaman. `apps-script/Code.gs` hanya ada di laptop dan di editor Apps Script, tidak di GitHub.

## Peran

- **Pemilik** (Anda): pemilik project Firebase, Drive, dan Apps Script. Menentukan siapa yang boleh menjadi Host.
- **Host:** orang yang emailnya Anda izinkan. Membuat dan mengelola room miliknya sendiri.
- **Tamu:** siapa saja yang tahu kode room. Tanpa akun.

## 1. Setup Firebase

1. **Authentication > Sign-in method:** aktifkan **Anonymous**, **Email/Password**, dan **Google**. Untuk Google, isi "Project support email", lalu **Save**.
2. **Authentication > Settings > Authorized domains:** pastikan domain situs ada, misalnya `wenn28.github.io`.
3. **Firestore > Rules:** ganti isinya dengan `firestore.rules`, lalu **Publish**.
4. **Izinkan Host:** di **Firestore > Data**, klik **Start collection**:
   - Collection ID: `hosts`
   - Document ID: email Host dalam **huruf kecil**, misalnya `nama@gmail.com`
   - Field: `nama` (string) berisi nama Host, cukup sebagai catatan
   - Ulangi **Add document** untuk setiap Host.
5. **Indeks galeri Tamu:** buka `galeri.html` sebuah room satu kali. Kalau muncul error "The query requires an index", klik link di pesan itu, lalu **Create index**. Bisa juga dibuat manual di **Firestore > Indexes > Composite**: collection `photos`, field `hidden` Ascending lalu `createdAt` Descending, query scope Collection. Tunggu statusnya **Enabled** (beberapa menit).

Host yang mendaftar dengan email dan kata sandi harus memverifikasi email lebih dulu. Login Google tidak perlu, karena emailnya sudah terverifikasi.

## 2. Setup Google Drive + Apps Script

1. Di Drive, buat folder **Momen**. Salin ID dari URL folder (`drive.google.com/drive/folders/<ID>`) ke `ROOT_FOLDER_ID` di `apps-script/Code.gs`.
   - Klik kanan folder **Momen > Share > General access: Anyone with the link, Viewer**. Semua foto di dalamnya ikut bisa dibuka lewat link, sehingga tampil di Live Screen.
   - **Jangan** taruh ID folder ini di file situs mana pun. Siapa pun yang tahu ID-nya bisa melihat foto semua room.
2. Di `Code.gs`, isi juga `FIREBASE_API_KEY` (apiKey dari config Firebase) dan `FIREBASE_PROJECT_ID` (misalnya `momen-4f310`).
3. Di [script.google.com](https://script.google.com), tempel seluruh `Code.gs`, lalu **Save**.
4. **Deploy:** pertama kali, pakai **Deploy > New deployment > Web app** (Execute as: **Me**, Who has access: **Anyone**). Salin URL `/exec` ke `APPS_SCRIPT_URL` di `firebase-config.js`.
5. Setiap kali `Code.gs` berubah: **Deploy > Manage deployments > pensil > Version: New version > Deploy**. URL tetap sama.

## 3. Hosting (GitHub Pages)

```
git add -A
git commit -m "pesan perubahan"
git push
```

Situs ter-update sekitar 1 menit setelah push. Kamera HP butuh HTTPS, dan GitHub Pages sudah HTTPS. Untuk tes lokal, pakai `npx serve` lalu buka `http://localhost:3000`.

## Alur pemakaian

1. Host masuk di `host.html`, lalu **Buat room**. Kode room 6 karakter dibuat otomatis.
2. Di halaman kelola room, Host mencetak kartu QR atau menyalin link untuk tamu.
3. Tamu scan QR (atau membuka situs dan mengetik kode), lalu memotret atau memilih foto dari galeri.
4. Host membuka **Live Screen** di laptop yang tersambung ke proyektor. Kalau room memakai persetujuan, foto baru tampil setelah Host menekan **Setujui**.
5. Setelah acara, Host mengunduh foto satu per satu dari halaman kelola. Pemilik bisa mengunduh semua foto room dari folder `Momen/<KODE>` di Drive (klik kanan, **Download** jadi ZIP).

## Saat Drive penuh

15 GB dibagi dengan Gmail dan Google Photos akun pemilik. Satu room dengan 500+ tamu bisa memakan sekitar 1,5 GB.
1. Unduh folder `Momen/<KODE>` room lama sebagai ZIP, lalu simpan di disk sendiri.
2. Hapus folder itu dari Drive, lalu kosongkan **Trash**.
3. Di **Firestore > Data**, hapus dokumen `rooms/<KODE>` beserta subkoleksinya. Kalau tidak, halaman kelola room itu akan menampilkan gambar rusak.

## Batasan

- **Pengaturan room tidak bisa diubah** setelah dibuat (nama, kuota, persetujuan, galeri). Buat room baru bila perlu.
- **Hapus foto** tidak ada. Host hanya bisa menyembunyikan. File tetap ada di Drive pemilik.
- **Unduh semua (ZIP)** hanya bisa oleh pemilik lewat Drive. Host mengunduh per foto.
- **Kuota Foto** dijaga dua kali: oleh Firestore, dan oleh Apps Script yang menghitung file di folder Drive tiap tamu. Dua upload serentak dari tamu yang sama bisa lolos 1 foto ekstra.
- **Kapasitas Spark:** sekitar 20 ribu tulis dan 50 ribu baca per hari. Setiap tamu yang membuka galeri membaca hingga 60 foto. Acara sangat besar bisa mencapai batas baca harian.
- **Gambar** memakai endpoint thumbnail Google Drive yang tidak resmi, jadi bisa lambat saat trafik sangat tinggi.
- **Privasi:** foto bisa dibuka siapa saja yang punya link foto itu.
