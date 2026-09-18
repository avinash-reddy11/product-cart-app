# 🛒 Product Cart App

A full-featured e-commerce product listing and shopping cart app built with **React** and **Tailwind CSS**, consuming a live product API. Built as a portfolio project to demonstrate real-world React patterns: state management, persistence, filtering, and pagination.

🔗 **Live Demo:** [product-cart-app-one.vercel.app](https://product-cart-app-one.vercel.app/)

## Features

- 🛍️ **Product catalog** — 190+ products fetched live from [DummyJSON](https://dummyjson.com/) API
- 🔍 **Category filtering** — browse products by category via dropdown
- 📄 **Pagination** — 50 products per page, resets on category change
- ⏳ **Loading state** — clean loading indicator while fetching data
- 🛒 **Shopping cart**
  - Add to cart with automatic quantity merge for existing items
  - Increase/decrease quantity directly from the cart
  - Delete item with a confirmation modal (prevents accidental removal)
  - Live cart badge showing total item count
  - Cart dropdown accessible from the header
- 💾 **Persistent cart** — cart state saved to `localStorage`, survives page refresh
- ⭐ **Product cards** — star ratings, discount badges, hover animations

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **DummyJSON API** for product data
- **localStorage** for cart persistence
- Deployed on **Vercel**

## Getting Started

```bash
git clone https://github.com/avinash-reddy11/product-cart-app.git
cd product-cart-app
npm install
npm run dev
```

## What I Learned

Building this project helped me practice:
- Managing shared state across components (cart logic, filtering, pagination)
- Working with a real REST API (fetch, loading states, error boundaries)
- Persisting state with `localStorage`
- Building interactive UI patterns like dropdowns and confirmation modals
- Debugging real React errors (state bugs, JSX structure issues, prop drilling)

## Screenshots

*(Add 1–2 screenshots here — product grid and cart view)*
