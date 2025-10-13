import { useState } from 'react'
import emadLogo from './assets/logom.png'
import './App.scss';
import React from 'react'
import { ProductsTable } from './assets/components/ProductsTable/ProductsTable';


export default function App() {
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={emadLogo} className="logo react" alt="React logo" />
        </a>
        <ProductsTable />
      </div>

    </>  )
}
