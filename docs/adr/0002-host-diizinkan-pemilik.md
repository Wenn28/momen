# Host harus diizinkan Pemilik lewat koleksi `hosts`

**Status:** digantikan oleh [0003-host-terbuka.md](0003-host-terbuka.md).

Banyak Host bisa membuat Room, tetapi semua foto tersimpan di satu Drive milik Pemilik (15 GB, tanpa kartu kredit). Pendaftaran Host yang terbuka akan membiarkan orang asing memenuhi Drive itu. Karena itu, hanya email yang dicatat Pemilik di koleksi Firestore `hosts` (ID dokumen = email huruf kecil) yang boleh membuat Room, dan email itu harus terverifikasi. Akibatnya, menambah Host butuh langkah manual Pemilik di Firebase Console, tanpa halaman pengelolaan Host di aplikasi.
