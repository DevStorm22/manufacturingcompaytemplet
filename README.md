# Admin Dashboard – MERN + Next.js Project

## 📌 Project Overview

This project is a **full‑stack Admin Dashboard** built using **Next.js (App Router)**, **MongoDB**, and **Mongoose**, following modern industry‑level patterns. It provides complete **CRUD (Create, Read, Update, Delete)** functionality for multiple business models such as **Services, Case Studies and Blogs**.

The primary goal of this project is to demonstrate **real‑world backend–frontend integration**, proper API design, and scalable folder architecture using Next.js 13+.

---

## 🎯 Key Objectives

* Build a real‑world admin panel using **Next.js App Router**
* Implement RESTful APIs with **server‑side validation**
* Handle dynamic routes correctly (`[id]`) in Next.js
* Maintain clean separation between **UI, API, and database layers**
* Follow professional Git and project structuring practices

---

## 🧱 Tech Stack

### Frontend

* **Next.js 13+ (App Router)**
* **React (Client Components)**
* **Tailwind CSS** for UI styling

### Backend

* **Next.js API Routes (Route Handlers)**
* **MongoDB**
* **Mongoose ODM**

### Utilities

* Custom **slug generator**
* Centralized **database connection handler**

---

## 📂 Project Structure (Simplified)

```
app/
 ├─ admin/
 │   ├─ services/
 │   │   ├─ page.tsx        # List services
 │   │   ├─ new/page.tsx    # Create service
 │   │   ├─ [id]/edit/page.tsx
 │   │   ├─ [id]/delete/page.tsx
 │   ├─ case-study/
 │   ├─ blog/

 ├─ api/
 │   ├─ admin/
 │   │   ├─ services/
 │   │   │   ├─ route.ts
 │   │   │   ├─ [id]/route.ts
 │   │   ├─ case-study/
 │   │   ├─ blog/

lib/
 ├─ db.ts
 ├─ slugify.ts

models/
 ├─ Service.ts
 ├─ CaseStudy.ts
 ├─ Blog.ts
```

---

## 🔑 Core Concepts Implemented

### 1️⃣ CRUD Operations (End‑to‑End)

Each model supports:

* **Create** – Form‑based UI with validation
* **Read** – Table/list views with status indication
* **Update** – Edit pages with pre‑filled data
* **Delete** – Safe delete flow with confirmation UI

---

### 2️⃣ Dynamic API Routes (`[id]`)

Correct handling of dynamic route parameters in **Next.js App Router**:

```ts
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}
```

> This avoids common runtime errors related to async params handling.

---

### 3️⃣ Backend Validation & Error Handling

* Required field checks
* Duplicate slug prevention
* Meaningful HTTP status codes (`400`, `404`, `409`, `500`)
* Clean JSON responses for frontend consumption

---

### 4️⃣ Slug‑Based Architecture

* Human‑readable URLs
* Automatic slug generation on create/update
* Enforced uniqueness at database level

---

### 5️⃣ UI‑First but Logic‑Driven Approach

* UI kept **simple but professional**
* Core focus on **functionality and correctness**
* UI polish intentionally deferred until logic stability

---

## 🧪 Error Scenarios Handled

* Invalid or missing IDs
* Empty update payloads
* Failed fetch requests
* API 404 due to incorrect route structure

---

## 🚀 Features by Module

### Services

* Active/Inactive state management
* Editable slug on title change

### Case Studies

* Structured content handling
* Admin‑controlled visibility

### Blogs

* SEO‑friendly slug usage
* Publish‑ready content flow


---

## 🧠 Learning Outcomes

This project demonstrates:

* Deep understanding of **Next.js App Router**
* Correct usage of **server & client components**
* Professional **API and DB design**
* Debugging real‑world issues (params, 404s, 500s)
* Writing scalable and maintainable code

---

## 🧑‍💻 Author Note

This project was built as part of an **internship‑level assignment**, with emphasis on **industry‑ready practices** rather than tutorial shortcuts. Every feature reflects real‑world development constraints and solutions.

---

## 📌 Future Improvements

* Role‑based authentication
* Pagination & search
* Rich text editor for blogs
* Image uploads (Cloudinary/S3)
* Public‑facing pages for content

---

## ✅ Status

**Completed – Core functionality implemented and stable**

---

If you are a reviewer, recruiter, or developer:

> This repository showcases strong fundamentals in full‑stack development using Next.js and MongoDB.
