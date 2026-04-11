# Offset

Offset is a minimal, modern content-driven web application built using React and Sanity CMS. It follows a clean, scalable architecture with a focus on performance, readability, and maintainability.

---

## 🚀 Tech Stack

* React (Vite)
* React Router
* Sass (CSS Modules)
* Sanity CMS (Headless CMS)

---

## 📁 Project Structure

```
offset-engineering-hub/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Card, Article)
│   ├── pages/           # Route-based pages (Home, Article, Category)
│   ├── services/        # API layer (Sanity client + queries)
│   ├── styles/          # Global styles and variables
│   ├── routes/          # Routing configuration
│   ├── App.jsx
│   └── main.jsx

offset-cms/
├── schemaTypes/         # Sanity schemas (Article, Category)
├── sanity.config.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd offset-engineering-hub
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Run Development Server

```
npm run dev
```

---

### 4. Setup Environment Variables

Create a `.env` file:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

---

## 🧠 Features

* Dark-themed modern UI
* Dynamic content from Sanity CMS
* Article-based content structure
* Clean component architecture
* Responsive layout

---

## 📡 Sanity CMS Setup

```
cd offset-cms
npm install
npm run dev
```

To deploy CMS:

```
npx sanity deploy
```

---

## 🔄 Data Flow

```
Sanity CMS → GROQ Queries → API Layer → React Components → UI
```

---

## 📌 Future Improvements

* Rich text rendering (Portable Text)
* SEO optimization
* Category filtering
* Pagination / infinite scroll
* Performance optimization

---

## 📝 License

MIT License
