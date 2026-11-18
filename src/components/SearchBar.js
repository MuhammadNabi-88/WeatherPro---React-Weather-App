import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };
  return (
    <form className="search-bar" onSubmit={submit}>
      <span>🔍</span>
      <input
        placeholder="Search city... e.g. Berlin, London"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}