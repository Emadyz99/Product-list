// src/App.tsx
import React, { useState } from "react";
import emadLogo from "./assets/logom.png";
import './App.scss';
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  const [selectedList, setSelectedList] = useState<"products" | "users" | null>(null);

  if (!selectedList) {
    return (
      <div style={{ padding: 20 }}>
        <a href="#" target="_blank">
          <img src={emadLogo} className="logo react" alt="React logo" />
        </a>
        <h2>کدام لیست را می‌خواهید مشاهده کنید؟</h2>
        <button onClick={() => setSelectedList("products")} style={{ marginRight: 10 }}>لیست محصولات</button>
        <button onClick={() => setSelectedList("users")}>لیست کاربران</button>
      </div>
    );
  }

  return (
    <>
      <DashboardPage listType={selectedList} />
      <button onClick={() => setSelectedList(null)} style={{ marginTop: 20, marginLeft: 20 }}>
        بازگشت به صفحه انتخاب
      </button>
    </>
  );
}
