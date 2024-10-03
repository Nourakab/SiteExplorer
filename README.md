# Site Explorer Project

This project is a **Site Explorer** web application built using **React**, **TypeScript**, and **Vite**. It features filtering, pagination, and carousel functionalities, all designed to enhance the user experience when exploring a large number of sites.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Testing](#testing)
- [Challenges](#challenges)
- [Manual Testing](#manual-testing)

## Installation

To get started, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/site-explorer.git
cd site-explorer
npm install
```

Start the development server:
npm run dev

Here’s an example of how you can write a README.md file with markdown style that will be compatible in VS Code:

markdown
Copy code

# Site Explorer Project

This project is a **Site Explorer** web application built using **React**, **TypeScript**, and **Vite**. It features filtering, pagination, and carousel functionalities, all designed to enhance the user experience when exploring a large number of sites.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Testing](#testing)
- [Challenges](#challenges)
- [Manual Testing](#manual-testing)

## Installation

To get started, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/site-explorer.git
cd site-explorer
npm install
Start the development server:
npm run dev
Build the project for production:
npm run build
```

Technologies Used
React - Frontend library
TypeScript - Typed JavaScript
Vite - Development build tool
Jest / Vitest - For unit and integration testing
React Testing Library - For testing React components
CSS Modules - For scoped styling
Features
Filter by Date and Tags: Users can filter the displayed sites by date, renovation status (new, old, renovated), or type (individual, company, state).
Pagination: Efficient navigation through thousands of sites with dynamic pagination.
Image Carousel: A carousel that allows users to view multiple images per site.
Responsive Design: Optimized for both desktop and mobile devices.
Testing
Unit and integration tests were written using Jest and React Testing Library. Unfortunately, due to configuration issues, some tests failed to execute, and manual testing was included to validate the application's core functionalities.

To run the tests:
npm test

Tests are located in the src/**tests**/ folder.

Manual Testing
Due to technical difficulties with Jest/Vitest, the following manual tests were performed:

Filter Functionality: Tested by selecting different dates, tags, and client types to ensure correct filtering of sites.
Pagination: Verified that the pagination works correctly when navigating through multiple pages of sites.
Carousel: Checked that the image carousel displays and cycles through images correctly for each site.
Challenges
We encountered several challenges related to the configuration of Jest and Vitest, especially when dealing with TypeScript, Vite, and React. As a result, not all automated tests were executed successfully, but manual testing was used to ensure feature completeness.
