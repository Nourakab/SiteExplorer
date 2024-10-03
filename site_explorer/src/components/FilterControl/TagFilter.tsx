import React from 'react';

function TagFilter({ selectedTags, handleTagChange }) {
  const tags = ['Old', 'New', 'Renovated'];

  return (
    <>
      {tags.map((tag) => (
        <label key={tag}>
          <input
            type="checkbox"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          />
          {tag}
        </label>
      ))}
    </>
  );
}

export default TagFilter;
