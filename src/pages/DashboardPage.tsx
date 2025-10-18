// src/pages/DashboardPage.tsx
import React from "react";
import { ListGenerator } from "../assets/components/ListGenerator/ListGenerator";
import { products, type Product } from "../data/products";
import { users, type User } from "../data/UsersData";

interface DashboardPageProps {
  listType: "products" | "users";
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ listType }) => {

  const handleProductSubmit = (selectedProducts: Product[]) => {
    console.log("محصولات انتخاب شده:", selectedProducts);
  };

  const handleUserSubmit = (selectedUsers: User[]) => {
    console.log("کاربران انتخاب شده:", selectedUsers);
  };

  return (
    <div style={{ padding: 20 }}>
      {listType === "products" && (
        <>
          <h2>لیست محصولات</h2>
          <ListGenerator
            data={products}
            columns={[
              { key: 'id', label: '#' },
              { key: 'name', label: 'نام محصول' },
              { key: 'price', label: 'قیمت' },
              { key: 'manufacturer', label: 'سازنده' },
            ]}
            pageSize={10}
            selectable
            multiSelect
            searchKey="name"
            onSubmit={handleProductSubmit}
          />
        </>
      )}

      {listType === "users" && (
        <>
          <h2>لیست کاربران</h2>
          <ListGenerator
            data={users}
            columns={[
              { key: 'id', label: '#' },
              { key: 'name', label: 'نام' },
              { key: 'email', label: 'ایمیل' },
              { key: 'company', label: 'شرکت' },
            ]}
            pageSize={5}
            selectable
            multiSelect
            searchKey="name"
            onSubmit={handleUserSubmit}
          />
        </>
      )}
    </div>
  );
};
