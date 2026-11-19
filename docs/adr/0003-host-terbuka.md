# Siapa pun dengan email terverifikasi boleh menjadi Host

Menggantikan [0002](0002-host-diizinkan-pemilik.md). Menambah Host lewat koleksi `hosts` di Firebase Console terlalu merepotkan dan sering gagal karena salah ketik ID dokumen. Karena itu, siapa pun yang masuk dengan Google atau email/kata sandi yang sudah diverifikasi boleh membuat Room. Tamu anonim tetap tidak bisa membuat Room.

## Consequences

- Orang asing bisa membuat Room, dan foto Tamu mereka tetap masuk ke Drive 15 GB milik Pemilik. Pemilik perlu memantau isi folder `Momen` di Drive.
- Koleksi `hosts` tidak dipakai lagi dan boleh dihapus dari Firestore.
- Kalau Drive mulai dipenuhi Room orang asing, kembalikan daftar izin seperti di 0002.
