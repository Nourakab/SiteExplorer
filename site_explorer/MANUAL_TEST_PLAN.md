## Feature: Client Dropdown Selection

- **Component Tested**: ClientDropdown.tsx
- **Scenario**: User selects a client from the dropdown.
- **Steps**:
  1. Render the `ClientDropdown` component with mock client data.
  2. Simulate user selecting "Client One" from the dropdown.
- **Expected Result**: `handleClientChange` function should be called with "Client One" as the argument.
- **Actual Result**: Function was called as expected.

## Feature: Image Carousel (Carousel Component)

- **Component Tested**: Carousel.tsx
- **Scenario**: User navigates through images using the next and previous buttons.
- **Steps**:
  1. Render the `Carousel` component with mock images.
  2. Click "Next" button.
- **Expected Result**: Image changes to the next one.
- **Actual Result**: Image changed as expected.
