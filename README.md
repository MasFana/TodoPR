# Todo API – Dokumentasi & Panduan

## 📖 Deskripsi
Todo API ini adalah implementasi CRUD sederhana menggunakan **Node.js + Express**, menyimpan data **di memori (in-memory)**.  
API ini cocok untuk belajar membuat REST API dan menghubungkannya dengan frontend menggunakan `fetch`.

---

## 🚀 Instalasi & Menjalankan Server

### 1️⃣ Clone & Install
```bash
git clone https://github.com/MasFana/TodoPR
cd TodoPR
npm install
````

### 2️⃣ Jalankan Server

```bash
node index.js
```

Server akan berjalan di:

```
http://localhost:11111
```

---

## 📚 Dokumentasi Endpoint

### 1. Tambah Todo

**Endpoint:**
`POST /todos`

**Request Body:**

```json
{
  "title": "Belajar Node.js"
}
```

**Contoh Fetch:**

```js
await fetch("http://localhost:11111/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Belajar Node.js" })
});
```

**Contoh Response (201):**

```json
{
  "id": 1695123456789,
  "title": "Belajar Node.js",
  "completed": false
}
```

---

### 2. Ambil Semua Todo

**Endpoint:**
`GET /todos`

**Contoh Fetch:**

```js
const res = await fetch("http://localhost:11111/todos");
const data = await res.json();
console.log(data);
```

**Contoh Response (200):**

```json
[
  {
    "id": 1695123456789,
    "title": "Belajar Node.js",
    "completed": false
  }
]
```

---

### 3. Ambil Todo Berdasarkan ID

**Endpoint:**
`GET /todos/:id`

**Contoh Fetch:**

```js
const res = await fetch("http://localhost:11111/todos/1695123456789");
const todo = await res.json();
console.log(todo);
```

**Contoh Response (200):**

```json
{
  "id": 1695123456789,
  "title": "Belajar Node.js",
  "completed": false
}
```

**Jika tidak ditemukan (404):**

```json
{
  "message": "Todo not found"
}
```

---

### 4. Update Todo

**Endpoint:**
`PUT /todos/:id`

**Request Body (opsional):**

```json
{
  "title": "Belajar Express.js",
  "completed": true
}
```

**Contoh Fetch:**

```js
await fetch("http://localhost:11111/todos/1695123456789", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ completed: true })
});
```

**Contoh Response (200):**

```json
{
  "id": 1695123456789,
  "title": "Belajar Express.js",
  "completed": true
}
```

---

### 5. Hapus Todo

**Endpoint:**
`DELETE /todos/:id`

**Contoh Fetch:**

```js
await fetch("http://localhost:11111/todos/1695123456789", {
  method: "DELETE"
});
```

**Contoh Response (200):**

```json
{
  "id": 1695123456789,
  "title": "Belajar Express.js",
  "completed": true
}
```

---

### 6. Hapus Semua Todo

**Endpoint:**
`DELETE /todos`

**Contoh Fetch:**

```js
await fetch("http://localhost:11111/todos", {
  method: "DELETE"
});
```

**Contoh Response (200):**

```json
{
  "message": "All todos deleted"
}
```

---

## 🧪 Catatan

* Data **tidak persisten**, server restart akan menghapus semua todo.
* Setelah 5000 todo, semua data otomatis dihapus.
* Bisa langsung dicoba dengan frontend (`jquery.html` dan `native.html`).
