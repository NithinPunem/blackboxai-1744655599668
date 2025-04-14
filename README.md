
Built by https://www.blackbox.ai

---

```markdown
# Investor Portfolio

## Project Overview

The Investor Portfolio is a React application that allows users to manage their investment portfolio and watchlist effectively. Users can view their investments, monitor returns, and manage their watchlist of campaigns. The application provides an intuitive UI along with features to sort and filter investments based on different criteria.

## Installation

To set up the project locally, follow these instructions:

1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/investor-portfolio.git
   ```
3. Navigate to the project directory:
   ```bash
   cd investor-portfolio
   ```
4. Install the dependencies using npm:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`. 

## Usage

After setting up the project, you can use the application to manage your investments and explore your watchlist.

- **View Portfolio:** Access the dashboard to see your total invested amount, active investments, total returns, and average return.
- **Investments Tab:** Manage your active investments by sorting and filtering them based on amount, return, or date.
- **Watchlist Tab:** Keep track of campaigns you're interested in and remove them from your watchlist if necessary.

## Features

- Dynamic loading of portfolio data.
- Real-time sorting and filtering capabilities.
- User-friendly interface with clear statistics display.
- Add and remove campaigns from watchlist.
- Responsive design for various screen sizes.

## Dependencies

The project utilizes the following key dependencies, as specified in the `package.json`:

- `axios`: For making HTTP requests.
- `react`: Core library for building the user interface.
- `react-hot-toast`: For displaying toast notifications.

Please refer to `package.json` for a complete list of dependencies.

## Project Structure

The project is structured as follows:

```
/investor-portfolio
│
├── src
│   ├── components
│   │   └── common
│   │       └── LoadingSpinner.jsx      # Loading spinner component
│   │
│   ├── pages
│   │   └── InvestorPortfolio.jsx        # Main portfolio management component
│   │
│   ├── App.js                           # Main application entry point
│   ├── index.js                         # Application renderer
│   └── styles.css                       # Global styles
│
├── package.json                         # Project dependencies and scripts
└── README.md                            # Project documentation
```

---

For any other questions regarding the project, contributions, or issues, please refer to the repository's issue tracker or contact the maintainer.
```