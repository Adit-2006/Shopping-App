# SwiftCart E-Commerce Platform

SwiftCart is a modern, high-performance e-commerce frontend built with React, Tailwind CSS, and Framer Motion. It provides a seamless shopping experience with real-time state management, persistent storage, and responsive design.

## 🚀 Features

- **Live Search with Debounce**: Efficiently search for products without unnecessary API calls.
- **Dynamic Filtering**: Filter products by category and price range using a sticky sidebar.
- **Advanced Sorting**: Reorder products by price (Low to High / High to Low) and rating.
- **Global State Management**:
  - **Shopping Cart**: Add/remove items, update quantities, and track totals across the app.
  - **Wishlist**: Save favorite items to a dedicated list.
- **Persistent Storage**: Cart and wishlist items are saved to localStorage, so your data survives page refreshes.
- **Product Details Page**: Dedicated view for each product with detailed descriptions and image highlights.
- **Professional Checkout Flow**: Breakdown of subtotal, shipping costs, and taxes with a simulated payment gateway.
- **Sleek UI/UX**: Built with Tailwind CSS for styling and Framer Motion for smooth layout transitions and hover effects.

## 🛠️ Tech Stack

| Tool              | Purpose                                      |
|-------------------|----------------------------------------------|
| React             | Component-based UI Library                   |
| React Router      | Client-side routing and dynamic URL parameters |
| Context API       | Global state for Cart and Wishlist           |
| Tailwind CSS      | Utility-first styling and responsive design |
| Framer Motion     | Micro-interactions and animations            |
| React Icons       | Premium vector icon sets                     |
| React Toastify    | Interactive non-intrusive notifications      |
| FakeStoreAPI      | Mock REST API for product data               |

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/swiftcart.git
cd swiftcart
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app: Navigate to http://localhost:5173 (or the port specified by Vite).

## 📂 Project Structure

```
src/
├── components/      # Reusable UI (ProductCard, Filter, SearchBar, etc.)
├── context/         # Global State (CartContext, WishlistContext)
├── hooks/           # Custom Logic (useFetch, useDebounce)
├── pages/           # Full views (Home, Shop, Cart, Details, Checkout)
├── App.jsx          # Main Routing logic
└── main.jsx         # Context Providers & Entry point
```

## 💡 Key Logic Implemented

### The "Boomerang" Fix
Implemented useRef and useLocation inside the SearchBar to prevent the debounce timer from yanking the user back to the search page when navigating to other sections of the site.

### Derived State Filtering
Instead of mutating API data, the app uses Derived State to filter and sort products instantly in the browser, providing a "no-refresh" experience for the user.

### Safety Nets
The ProductCard and ProductDetailsPage include safety checks to prevent crashes if API data is undefined, ensuring a robust user experience even under slow network conditions.

## 📝 License

This project is open-source and available under the MIT License. Feel free to use it to build your own amazing e-commerce experiences!
