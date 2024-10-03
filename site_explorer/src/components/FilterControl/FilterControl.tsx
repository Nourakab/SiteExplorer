import React, { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Modal from '../Modal';
import FilterSection from './FilterSection';
import FilterButtons from './FilterButtons';
import DateFilter from './DateFilter';
import TagFilter from './TagFilter';
import TypeFilter from './TypeFilter';
import CountryFilter from './CountryFilter';
import './FilterControl.css';

interface FilterControlProps {
  allTags: string[];
  allCountries: string[];
  onFilterChange: (filters: {
    startDate: string | null;
    endDate: string | null;
    tags: string[];
    type: string | null;
    country: string | null;
  }) => void;
}

const FilterControl = ({
  allTags,
  allCountries,
  onFilterChange,
}: FilterControlProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal state

  // Reset all filters and the toggled section state
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedTags([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
    setValidationMessage(null);
    setExpandedSection(null); // Reset all sections to unexpanded
  };

  const toggleModal = () => {
    if (isModalOpen) {
      // If the modal is closing, reset filters and sections
      resetFilters();
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleFilterApply = () => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValidationMessage('End Date should be later than Start Date.');
      return;
    }

    setValidationMessage(null);

    // Send the filters to the parent component (AllSitesPage)
    onFilterChange({
      startDate,
      endDate,
      tags: selectedTags,
      type: selectedTypes.length ? selectedTypes[0] : null,
      country: selectedCountries.length ? selectedCountries[0] : null,
    });

    setIsModalOpen(false); // This should close the modal
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type],
    );
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.includes(country)
        ? prevCountries.filter((c) => c !== country)
        : [...prevCountries, country],
    );
  };

  return (
    <>
      {/* Button to trigger modal */}
      <button onClick={toggleModal} className="filter-toggle-button">
        Filters <MdOutlineFilterAlt />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <FilterSection
          title="Date"
          expanded={expandedSection === 'date'}
          onToggle={() => toggleSection('date')}
        >
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            validationMessage={validationMessage}
          />
        </FilterSection>

        <FilterSection
          title="Tags"
          expanded={expandedSection === 'tags'}
          onToggle={() => toggleSection('tags')}
        >
          <TagFilter
            selectedTags={selectedTags}
            handleTagChange={handleTagChange}
          />
        </FilterSection>

        <FilterSection
          title="Type"
          expanded={expandedSection === 'type'}
          onToggle={() => toggleSection('type')}
        >
          <TypeFilter
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
          />
        </FilterSection>

        <FilterSection
          title="Country"
          expanded={expandedSection === 'country'}
          onToggle={() => toggleSection('country')}
        >
          <CountryFilter
            selectedCountries={selectedCountries}
            handleCountrySelect={handleCountrySelect}
            removeSelectedCountry={handleCountrySelect}
            allCountries={allCountries}
          />
        </FilterSection>

        {/* Pass the correct functions to handle apply and close */}
        <FilterButtons
          onCancel={toggleModal} // Close modal and reset filters
          onApply={handleFilterApply} // Apply filters and close modal
        />
      </Modal>
    </>
  );
};

export default FilterControl;
