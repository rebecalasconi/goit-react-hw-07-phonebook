// src/components/Filter.jsx
import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value || ""}  // Fallback la un string gol dacă value este undefined
        onChange={onChange}
      />
    </div>
  );
};

export default Filter;