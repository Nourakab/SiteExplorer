import React from 'react';

function TypeFilter({ selectedTypes, handleTypeChange }) {
  const types = ['individual', 'company', 'state'];

  return (
    <>
      {types.map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </>
  );
}

export default TypeFilter;
