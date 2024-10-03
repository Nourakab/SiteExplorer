import React from 'react';

function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  validationMessage,
}) {
  return (
    <>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => setStartDate(e.target.value || null)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => setEndDate(e.target.value || null)}
          style={{ marginLeft: '7px' }}
        />
      </label>
      {validationMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{validationMessage}</p>
      )}
    </>
  );
}

export default DateFilter;
