# ADA Project

A React-based web application for displaying and managing ADA (Area Development Analysis) data. The application features a responsive sidebar navigation and integrates with Google Sheets as a backend data source.

## Live Demo

The application is deployed and accessible at: [https://ada-iota-eight.vercel.app/](https://ada-iota-eight.vercel.app/)

## Features

- Responsive sidebar navigation with collapsible menu
- Integration with Google Sheets as a backend database
- Client-side routing with React Router
- Modern UI using Fluent UI components
- Multiple ADA sections (ADA 1-6)

## Technology Stack

- React
- React Router for navigation
- Fluent UI for components
- Google Sheets API for data management
- Vercel for deployment

## Data Source

The application pulls data from a Google Sheets document that serves as the backend:
[Google Sheets Backend](https://docs.google.com/spreadsheets/d/1xq7lVsfhWRA9wrYMdodpi4p93VuR8UCojyWAahzEwqU/edit?gid=0#gid=0)

## Project Structure

```
src/
├── App.jsx              # Main application component
├── components/
│   └── layout/
│       └── Sidebar.jsx  # Navigation sidebar component
├── features/
│   ├── ada1/
│   ├── ada2/
│   ├── ada3/
│   ├── ada4/
│   ├── ada5a/
│   └── ada6/
├── constants/
│   └── routes.js        # Route configurations
└── main.jsx            # Application entry point
```

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/ujji77/ada.git
cd ada
```

2. Install dependencies:
```bash
npm install
```

3. Create a `vercel.json` file in the root directory:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Fork or clone the repository
2. Connect your GitHub repository to Vercel
3. Configure the deployment settings
4. Deploy

Note: The `vercel.json` configuration file is essential for proper routing in production.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue in the GitHub repository: [https://github.com/ujji77/ada/issues](https://github.com/ujji77/ada/issues)