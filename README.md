# Marketflow Frontend

## Deskripsi

**Marketflow** adalah aplikasi e-commerce sederhana yang memungkinkan pengguna untuk menjelajahi produk, menambahkannya ke wishlist atau keranjang belanja, serta membuat transaksi. Aplikasi ini dikembangkan menggunakan **React**, **TypeScript**, dan **Vite**, dengan antarmuka yang responsif dan modern.

> **Catatan:**
>
> - Beberapa fitur **belum tersedia**: halaman admin, halaman profil pengguna, fitur review produk, fitur pencarian produk, pagination di halaman produk, dan integrasi dengan payment gateway.
> - Integrasi payment gateway direncanakan menggunakan **Midtrans**.
> - Backend API menggunakan **Hono**, **Prisma**, dan **PostgreSQL**.

---

## Stack Teknologi

- **Build Tool**: Vite
- **Bahasa**: TypeScript
- **UI Framework**: React
- **Routing**: React Router
- **State Management & Data Fetching**: React Query + Axios
- **Form Handling & Validation**: React Hook Form + Zod
- **UI Styling**: Tailwind CSS + Shadcn
- **Notifications**: React Hot Toast

---

## Fitur Utama

- **Authentication & Authorization**: User dapat login, register, dan logout.
- **Cart Management**: Menambahkan dan mengelola item dalam keranjang belanja.
- **Wishlist**: Menyimpan produk favorit pengguna.
- **Transaction Management**: Membuat transaksi dan melacak status transaksi.
- **Responsiveness**: Desain mendukung berbagai perangkat (mobile, tablet, dan desktop).
- **Notification System**: Memberikan feedback kepada pengguna dengan notifikasi.

---

## Fitur yang Sedang Dikembangkan

- **Halaman Admin**: Pengelolaan produk, transaksi, dan pengguna.
- **Halaman Profil Pengguna**: Melihat dan mengedit informasi akun serta riwayat transaksi.
- **Fitur Review Produk**: Menambahkan dan melihat ulasan produk.
- **Fitur Pencarian Produk**: Mencari produk berdasarkan nama atau kategori.
- **Pagination**: Menampilkan produk dengan pagination di halaman produk.
- **Integrasi Payment Gateway**: Menggunakan **Midtrans** untuk pembayaran online.

---

## Struktur Project

```
src
 ├── assets          # File ikon, font, dll
 ├── components      # Komponen reusable
 ├── context         # Context
 ├── hooks           # Custom hooks
 ├── lib             # Helper functions
 ├── pages           # Halaman utama aplikasi
 ├── routes          # Konfigurasi routing
 ├── schema          # Konfigurasi validasi form
 ├── services        # API services (Axios)
 └── App.tsx         # Entry point aplikasi
```

---

## Integrasi Backend

Marketflow Frontend terhubung dengan [**Marketflow API**](https://github.com/fathurrahman20/marketflow-api/) yang dibangun menggunakan Hono, Prisma, dan PostgreSQL. Pastikan backend sudah berjalan sebelum menjalankan frontend.

---
