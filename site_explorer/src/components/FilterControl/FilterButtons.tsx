import React from 'react';

function FilterButtons({ onCancel, onApply }) {
  return (
    <div className="filter-buttons">
      <button onClick={onCancel} className="cancel-button">
        Cancel
      </button>
      <button onClick={onApply} className="apply-button">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterButtons;
