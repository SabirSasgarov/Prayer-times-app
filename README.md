# Prayer Times Frontend

A simple frontend app that fetches and displays daily Islamic prayer times for a selected date range.

## Features

- Select start and end dates
- Fetch prayer times for each day in the selected range
- Display prayer times in a responsive table
- Clean UI with Bootstrap and custom CSS

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- Ummah API (`/api/prayer-times/month`)

## Project Structure

```text
.
├── index.html
└── assets
    ├── css
    │   └── style.css
    └── js
        └── script.js
```

## How It Works

1. The app initializes date inputs with:
   - Start date: today
   - End date: end of current month
2. On **Fetch Prayer Times**, it loops through each selected date.
3. For each date, it calls the monthly prayer times endpoint and matches the exact day.
4. Matching times are rendered into the table.

## Run Locally

No build tools are required.

1. Clone or download the project.
2. Open `index.html` in your browser.

You can also use VS Code Live Server for easier development.

## API Details

Current API request format:

```text
https://ummahapi.com/api/prayer-times/month?lat=40.7128&lng=-74.006&month={MM}&year={YYYY}
```

Current location is hardcoded to:

- Latitude: `40.7128`
- Longitude: `-74.0060`

## Notes

- The app currently uses two date inputs in `index.html` with IDs containing spaces (`dateInput dt-1` and `dateInput dt-2`). The JavaScript is written to match those exact IDs.
- Prayer times are displayed as `HH:MM`.
- Errors during fetch are logged to the browser console.

## Possible Improvements

- Add city/location selector (dynamic latitude/longitude)
- Cache monthly API responses to avoid repeated requests
- Add loading and error states in the UI
- Validate date range (start <= end)
- Reduce API calls by grouping requests per month

## License

No license file is currently included.
