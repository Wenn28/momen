# Momen

Aplikasi untuk mengumpulkan foto dari tamu selama sebuah acara, lalu menampilkannya langsung dan mengarsipkannya.

## Language

### Orang

**Pemilik**:
Satu orang yang memiliki project Firebase, Drive, dan Apps Script Momen, tempat semua foto tersimpan.
_Avoid_: Admin, owner, superadmin

**Host**:
Orang yang masuk dengan email terverifikasi untuk membuat dan mengelola Room miliknya sendiri.
_Avoid_: Admin, tuan rumah (di teks teknis), panitia

**Tamu**:
Orang yang bergabung ke Room dengan Kode Room atau QR, lalu mengirim foto tanpa mendaftar.
_Avoid_: Guest, user, pengunjung

### Tempat foto

**Acara**:
Satu kegiatan nyata (misalnya pernikahan) yang foto-fotonya dikumpulkan bersama.
_Avoid_: Event, wedding

**Room**:
Wadah foto untuk satu Acara milik satu Host, dengan nama, tanggal, Kuota Foto, dan pengaturan tamunya sendiri.
_Avoid_: Album, event, ruang

**Kode Room**:
Enam huruf atau angka kapital yang mengenali satu Room dan dipakai Tamu untuk bergabung.
_Avoid_: ID room, PIN, kode acara

**Kuota Foto**:
Jumlah maksimum foto yang boleh dikirim satu Tamu dalam satu Room, ditentukan Host saat membuat Room.
_Avoid_: Limit, jatah

### Tampilan foto

**Live Screen**:
Tayangan foto terbaru satu Room di proyektor yang terus diperbarui tanpa muat ulang.
_Avoid_: Slideshow, proyektor

**Galeri Tamu**:
Halaman tempat Tamu melihat foto Room yang sedang tampil, bila Host membukanya.
_Avoid_: Album, arsip

**Foto Tersembunyi**:
Foto yang tidak ditampilkan di Live Screen maupun Galeri Tamu, tetapi tetap tersimpan dan tetap bagian dari Arsip.
_Avoid_: Foto dihapus, foto diblokir

**Foto Menunggu**:
Foto Tersembunyi di Room yang mewajibkan persetujuan, yang belum disetujui Host.
_Avoid_: Pending, draft

**Arsip**:
Kumpulan foto Room yang tetap disimpan setelah Acara selesai.
_Avoid_: Backup, galeri
