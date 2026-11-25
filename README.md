# Sruput. — UTS Nopal
Prototipe akademik Kedai NESCAFÉ, Jl. Bukit Barisan. Tidak berafiliasi dengan NESCAFÉ. Menu berdasarkan foto referensi; verifikasi harga di outlet. Stok, resep sederhana, akun dan transaksi adalah simulasi. Bukti izin dan temuan observasi belum tersedia.

## Menjalankan
1. Instal Node.js 22 LTS dan VS Code.
2. Ekstrak ZIP, buka folder sruput di VS Code.
3. Terminal > New Terminal: `npm install` lalu `npm run dev`.
4. Buka alamat Local yang tercetak, biasanya http://localhost:5173.
5. `npm run build` untuk mengecek build produksi.

Akun demo (semua sandi `demo123`): nopal (admin), raka (cashier), dinda (barista), farel (customer).

## Demo
Login raka, tambah menu, pilih Farel, bayar tunai atau QRIS simulasi. Stok dikurangi saat pembayaran (reservasi stok); pembatalan sebelum diproses mengembalikannya. Login dinda untuk mulai proses dan siap diambil; login raka untuk menyelesaikan. Login farel untuk melihat pesanan sendiri. Login nopal untuk laporan, menu dan stok. Refresh untuk memeriksa persistensi. Data hanya tersimpan di browser/origin yang sama. Autentikasi lokal bukan keamanan produksi.

## Catatan implementasi
CSS biasa, tanpa Tailwind/Chart.js. Modul kategori dan varian berada di form menu; belum ada manajemen pegawai, cetak nota, editor resep atau API HTTP. Store mengimplementasikan operasi lokal; kontrak API HTTP masih perlu didokumentasikan. Pengurangan stok saat checkout adalah perubahan dari rancangan awal agar pesanan yang sudah dibayar mempunyai persediaan teralokasi. Resep menggunakan satu cup dan satu porsi generik, bukan resep resmi. Build belum diverifikasi karena dependensi npm tidak tersedia di lingkungan pembuatan.

## Uji manual (belum dijalankan)
- Login valid, sandi salah, akses URL admin oleh kasir.
- Menu: tambah harga positif, kosong, harga nol; ubah dan hapus; refresh.
- Stok: tambah, ubah, hapus bahan bebas; tolak negatif dan hapus bahan resep.
- POS: bayar tepat, kurang, keranjang kosong, stok tidak cukup, jumlah 99.
- Antrean: maju sesuai urutan, tolak akses role salah, pembatalan sebelum proses.
- Persistensi: refresh setelah transaksi dan perubahan menu/stok; cek DevTools > Application > Local Storage > sruput-v1.
- Laporan: filter tanggal dengan/ tanpa transaksi dan unduh CSV.
Catat hasil aktual setelah pengujian, jangan menandai berhasil sebelum dijalankan.

## Versi 2 — Katalog dan POS
- Katalog pelanggan dan POS memakai komponen OrderWorkspace dan ProductCard bersama. Keranjang berada di Pinia; transaksi, stok, master, dan status tetap disimpan di localStorage sruput-v1. Data lama dipertahankan; atribut image ditambahkan bila belum tersedia.
- Foto adalah potongan referensi gambar yang diberikan pengguna, bukan dokumentasi produk aktual outlet. Dua foto berasal dari papan menu, sehingga kualitasnya lebih rendah. Semua disimpan lokal di public/products.
- Pelanggan login farel / demo123 untuk memesan melalui QRIS simulasi. Kasir raka / demo123 mendukung tunai dan QRIS simulasi. Barista dinda / demo123 mengubah status hingga siap diambil, kasir menyelesaikan. Pengelola nopal / demo123 memantau laporan.
- Tidak ada pembayaran sungguhan atau autentikasi produksi. Data tidak disinkronkan antar perangkat. Persediaan menggunakan unit simulasi cup dan drink, bukan resep rahasia outlet.
- Pengujian manual: cek pencarian cocok/tidak cocok/kosong; tambah item, kurangi sampai nol, batas 99; checkout kosong, tunai kurang, tunai tepat, stok kurang; pelanggan checkout QRIS dan hanya melihat pesanan sendiri; barista tidak dapat menyelesaikan pesanan; refresh setelah checkout dan status; CRUD menu/stok dan refresh. Catat hasil aktual setelah menjalankan browser.
- Kontrak layanan lokal: checkout(cart, method, cash, customerId) menyimpan pesanan dan mengalokasikan stok; advance(id) mengubah status; cancel(id) mengembalikan stok pesanan menunggu. Kontrak HTTP formal untuk laporan masih perlu dilengkapi.
