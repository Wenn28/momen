# Momen

Aplikasi untuk mengumpulkan foto dari tamu selama sebuah acara, lalu menampilkannya langsung dan mengarsipkannya.

## Language

**Acara**:
Satu kegiatan (misalnya pernikahan) yang foto-fotonya dikumpulkan bersama. Setiap foto dan kuota selalu milik tepat satu Acara.
_Avoid_: Event, wedding

**Tamu**:
Orang yang membuka link atau QR Acara dan mengunggah foto tanpa mendaftar.
_Avoid_: Guest, user, pengunjung

**Admin**:
Satu orang pengelola yang boleh melihat, menayangkan, dan mengunduh semua foto Acara.
_Avoid_: Owner, panitia

**Kuota Foto**:
Jumlah maksimum foto yang boleh diunggah satu Tamu dalam satu Acara (10).
_Avoid_: Limit, jatah

**Live Screen**:
Tayangan foto terbaru Acara di proyektor yang terus diperbarui tanpa muat ulang.
_Avoid_: Slideshow, proyektor

**Foto Tersembunyi**:
Foto yang disembunyikan Admin dari Live Screen tetapi tetap tersimpan dan tetap bagian dari Arsip.
_Avoid_: Foto dihapus, foto diblokir

**Arsip**:
Kumpulan foto Acara yang tetap disimpan setelah Acara selesai.
_Avoid_: Backup, galeri
