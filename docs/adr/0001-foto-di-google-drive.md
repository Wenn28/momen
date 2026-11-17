# Foto disimpan di Google Drive lewat Apps Script, bukan Firebase Storage

Project harus berjalan Rp0 tanpa mendaftarkan kartu kredit, untuk 500+ Tamu per Acara (±1,5 GB), sekitar 10 Acara per tahun, dengan Arsip jangka panjang. Firebase Storage kini wajib paket Blaze, dan Blaze tidak punya batas biaya otomatis. Karena itu foto disimpan di Google Drive (15 GB gratis) melalui Web App Google Apps Script. Firebase Auth dan Firestore tetap dipakai di paket gratis Spark untuk login, Kuota Foto, dan realtime.

## Considered Options

- **Firestore base64**: batas 1 GiB, satu Acara pun tidak muat.
- **Supabase Storage**: batas 1 GB, satu Acara pun tidak muat.
- **Cloudinary**: kuota bulanan menghitung simpan dan transfer sekaligus, cukup untuk ±5–8 Acara saja, dan preset unsigned bisa dipakai siapa pun.
- **Cloudflare R2, Backblaze B2, ImageKit**: butuh kartu kredit atau signer di sisi server.

## Consequences

- Kuota Foto ditegakkan oleh Apps Script dengan menghitung file di folder Drive Tamu, bukan hanya oleh `count` di Firestore.
- Foto bisa dibuka siapa saja yang punya link-nya, agar Live Screen bisa menampilkannya langsung. Akses ini diwarisi dari folder Momen yang dibagikan manual "Anyone with the link", karena Google menolak skrip Web App membagikan atau mengubah file satu per satu. Akibatnya ID folder Momen harus dirahasiakan: siapa pun yang tahu ID-nya bisa melihat semua foto.
- Saat Drive penuh, Admin memindahkan Arsip Acara lama ke disk sendiri secara manual.
- Apps Script membatasi sekitar 30 upload bersamaan.
