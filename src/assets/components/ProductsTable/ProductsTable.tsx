import React, { useMemo, useState, useEffect } from "react";
import styles from "./ProductsTable.module.scss";
import { products } from "../../../data/products";
import type { Product } from "../../../data/products";

interface Props {
pageSize?: number; // default 10
setQuery?: (query: string) => void;
}


export const ProductsTable: React.FC<Props> = ({ pageSize = 10, setQuery }) => {
const [page, setPage] = useState(1);
const [selected, setSelected] = useState<number[]>([]);
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");


//  برای ارسال جستجو
useEffect(() => {
const handler = setTimeout(() => {
setDebouncedSearch(search);
if (setQuery) setQuery(search);
}, 500);


return () => clearTimeout(handler);
}, [search, setQuery]);


const filteredProducts = useMemo(
() => products.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase())),
[debouncedSearch]
);


const totalPages = useMemo(() => Math.ceil(filteredProducts.length / pageSize), [filteredProducts, pageSize]);


const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentPage = filteredProducts.slice(startIndex, endIndex);


const toggleSelect = (id: number) => {
setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
};


const selectAll = () => {
const currentIds = currentPage.map(p => p.id);
const allSelected = currentIds.every(id => selected.includes(id));
if (allSelected) {
setSelected(prev => prev.filter(id => !currentIds.includes(id)));
} else {
setSelected(prev => [...new Set([...prev, ...currentIds])]);
}
};


const submitSelected = () => {
const selectedProducts = products.filter(p => selected.includes(p.id));
console.log("Selected products:", selectedProducts);
};


return (
<div className={styles.container}>
<input
type="text"
placeholder="جستجو..."
value={search}
onChange={e => setSearch(e.target.value)}
className={styles.searchInput}
style={{ marginBottom: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }}
/>


<button className={styles.btn} onClick={selectAll} style={{ marginBottom: '12px' }}>
{currentPage.every(p => selected.includes(p.id)) ? "برداشتن تیک همه" : "انتخاب همه"}
</button>


<table className={styles.table}>
<thead className={styles.thead}>
<tr>
<th>انتخاب</th>
<th>#</th>
<th>نام محصول</th>
<th>قیمت (تومان)</th>
<th>سازنده</th>
</tr>
</thead>
<tbody className={styles.tbody}>
{currentPage.map((p: Product) => (
<tr key={p.id} className={styles.rowHover}>
<td>
<input
type="checkbox"
checked={selected.includes(p.id)}
onChange={() => toggleSelect(p.id)}
/>
</td>
<td>{p.id}</td>
<td>{p.name}</td>
<td>{p.price.toLocaleString()}</td>
<td>{p.manufacturer}</td>
</tr>
))}
</tbody>
</table>


<div className={styles.pagination}>
<div>
صفحه {page} از {totalPages} — کل محصولات: {filteredProducts.length}
</div>
<div style={{ display: "flex", gap: 8 }}>
<button className={styles.btn} onClick={() => setPage(s => Math.max(1, s - 1))} disabled={page === 1}>قبل</button>
<button className={styles.btn} onClick={() => setPage(s => Math.min(totalPages, s + 1))} disabled={page === totalPages}>بعد</button>
</div>
</div>


<button className={styles.btn} onClick={submitSelected} style={{ marginTop: '12px' }}>
ارسال محصولات انتخاب شده
</button>
</div>
);
};