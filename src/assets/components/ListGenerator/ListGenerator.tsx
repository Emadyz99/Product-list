// src/components/ListGenerator/ListGenerator.tsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./ListGenerator.module.scss"; // فایل CSS قدیمی را اینجا ایمپورت کن

interface ListGeneratorProps<T extends { id: number }> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  pageSize?: number;
  selectable?: boolean;
  multiSelect?: boolean;
  onSubmit?: (selectedItems: T[]) => void;
  searchKey?: keyof T;
}

export function ListGenerator<T extends { id: number }>(props: ListGeneratorProps<T>) {
  const { data, columns, pageSize = 10, selectable = true, multiSelect = true, onSubmit, searchKey } = props;

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!searchKey) return data;
    return data.filter(item => {
      const value = item[searchKey];
      return typeof value === "string" && value.toLowerCase().includes(debouncedSearch.toLowerCase());
    });
  }, [debouncedSearch, data, searchKey]);

  const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData, pageSize]);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPage = filteredData.slice(startIndex, endIndex);

  const toggleSelect = (id: number) => {
    if (!multiSelect) {
      setSelected(prev => (prev.includes(id) ? [] : [id]));
    } else {
      setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    }
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
    const selectedItems = data.filter(p => selected.includes(p.id));
    if (onSubmit) onSubmit(selectedItems);
  };

  return (
    <div className={styles.container}>
      {searchKey && (
        <input
          type="text"
          placeholder="جستجو..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      )}

      {selectable && (
        <button onClick={selectAll} className={styles.btn} style={{ marginBottom: "12px" }}>
          {currentPage.every(p => selected.includes(p.id)) ? "برداشتن تیک همه" : "انتخاب همه"}
        </button>
      )}

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {selectable && <th>انتخاب</th>}
            {columns.map(col => <th key={String(col.key)}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentPage.map(item => (
            <tr key={item.id} className={styles.rowHover}>
              {selectable && (
                <td>
                  <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                </td>
              )}
              {columns.map(col => <td key={String(col.key)}>{String(item[col.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button className={styles.btn} onClick={() => setPage(s => Math.max(1, s - 1))} disabled={page === 1}>قبل</button>
        <button className={styles.btn} onClick={() => setPage(s => Math.min(totalPages, s + 1))} disabled={page === totalPages}>بعد</button>
      </div>

      {selectable && <button className={styles.btn} onClick={submitSelected} style={{ marginTop: "12px" }}>ارسال آیتم‌های انتخاب شده</button>}
    </div>
  );
}
