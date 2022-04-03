# Ark-Trend-Visualisation

## The challenge

The `server.js` file includes two endpoints `/ads-spend-data` and `purchase-data` which queries BigQuery and returns some stats.

Create React components that fetches the data and visualizes it. One of the endpoints returns a bigger data set - (optional) feel free to optimize the data fetching and visualization.

The `AdsSpendGraph.jsx` file includes a shell of an example React component which fetches data from the server.

You're allowed to install any node packages you want.

## Pre-requisites

A `bigquery_service_account.json` file in the root directory (you should have gotten access to download this file together with the case).

Latest Node version (e.g. by running `nvm install --lts`).

## Getting Started

Open two terminal windows and run one command in each:

```bash
node server
```

```bash
npm run start
```

## Future improvements

* More graphs with more specific endpoints
* Make responsive
* Further refinement of data to make loading time even shorter
* Break out the backend into separate files
* Add testing for the backend

