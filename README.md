# GVA-Lang
- Beta

GVA Programming Language

## Version

0.1.0

## Run

```bash
npm start
```
Tentu. Berdasarkan kondisi proyek GVA-Lang saat ini, berikut README yang sesuai dengan fitur yang sudah berhasil kita bangun.

# GVA-Lang

GVA-Lang adalah bahasa pemrograman yang sedang dikembangkan dari nol menggunakan JavaScript (Node.js). Proyek ini bertujuan mempelajari dan membangun seluruh komponen bahasa pemrograman modern, mulai dari scanner, lexer, parser, AST, interpreter, hingga compiler.

> **Status Proyek:** Aktif Dikembangkan

---

# Fitur yang Sudah Tersedia

## Frontend

* ✅ Scanner
* ✅ Lexer
* ✅ Parser
* ✅ Abstract Syntax Tree (AST)

## Runtime

* ✅ Interpreter
* ✅ Environment (Variable Scope)

## Statement

* ✅ `let`
* ✅ `print()`

## Tipe Data

* ✅ Number
* ✅ String

## Operator

* ✅ Penjumlahan (`+`)
* ✅ Pengurangan (`-`)
* ✅ Perkalian (`*`)
* ✅ Pembagian (`/`)
* ✅ Modulo (`%`)

## Expression

* ✅ Identifier
* ✅ Prioritas operator
* ✅ Tanda kurung `()`

---

# Contoh Program

```gva
let x = 10;
let y = 5;

print(x + y);

print((10 + 5) * 2);

let nama = "Didit";
print("Halo " + nama);
```

Output:

```text
15
30
Halo Didit
```

---

# Struktur Proyek

```text
gva-lang/
├── examples/
├── src/
│   ├── ast/
│   ├── interpreter/
│   ├── lexer/
│   │   └── reader/
│   ├── parser/
│   └── token/
├── main.js
├── package.json
└── README.md
```

---

# Menjalankan Proyek

Clone repository:

```bash
git clone git@github.com:devgrava/gva-lang.git
```

Masuk ke direktori proyek:

```bash
cd gva-lang
```

Install dependensi:

```bash
npm install
```

Jalankan interpreter:

```bash
npm start
```

---

# Roadmap

## v0.5.0

* ✅ String Literal

## v0.6.0

* ⏳ Boolean
* ⏳ Operator Perbandingan
* ⏳ Logical Operator

## v0.7.0

* ⏳ if
* ⏳ else

## v0.8.0

* ⏳ while
* ⏳ break
* ⏳ continue

## v0.9.0

* ⏳ Function
* ⏳ Return
* ⏳ Scope

## v1.0.0

* ⏳ Standard Library
* ⏳ Command Line Interface (`gva`)
* ⏳ Compiler ke JavaScript
* ⏳ Dokumentasi Lengkap

---

# Tujuan Proyek

GVA-Lang dikembangkan sebagai proyek pembelajaran sekaligus eksperimen untuk memahami cara kerja bahasa pemrograman dari tingkat rendah hingga tingkat tinggi.

Target akhir proyek meliputi:

* Membangun interpreter yang lengkap.
* Membangun compiler ke JavaScript.
* Menyediakan Command Line Interface (CLI).
* Memiliki dokumentasi dan pengujian otomatis.
* Menjadi bahasa pemrograman yang mudah dipelajari dan dikembangkan.

---

# Kontribusi

Kontribusi, saran, dan laporan bug sangat diterima.

Jika menemukan masalah atau memiliki ide pengembangan, silakan buat **Issue** atau **Pull Request** di repository GitHub.

---

# Lisensi

Proyek ini menggunakan lisensi **MIT License**. Lihat file `LICENSE` untuk informasi lebih lanjut.

---

# Author

**Didit (devgrava)**

GitHub: [https://github.com/devgrava](https://github.com/devgrava)

---

**GVA-Lang** — *Building a programming language from scratch with JavaScript.*

