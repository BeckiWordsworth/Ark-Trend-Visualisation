const express = require("express");
const app = express();
const port = 5000;

const {
  getAdsSpend,
  getPurchaseData,
  getReducedPurchaseData,
} = require("./BigQueryClient");

// Very simple pair of functions to cache results from Google (or any promise)
// to save on bandwidth and API costs.

let createCache = () => {
  return {
    data: null,
    lastUpdated: 0,
    timeToLive: 3600,
  };
};

let getCachedData = (cache, fetchData) => {
  if (
    cache.data === null ||
    cache.lastUpdated < Date.now() - 1000 * cache.timeToLive
  ) {
    return fetchData().then((data) => {
      cache.data = data;
      cache.lastUpdated = Date.now();
      return Promise.resolve(data);
    });
  }

  return Promise.resolve(cache.data);
};

let adsSpendCache = createCache();
let purchaseDataCache = createCache();
let reducedPurchaseDataCache = createCache();

// Transform an array of purchase data into 'buckets' by month
// where each bucket stores the total number of orders
let ordersByMonth = (data) => {
  let counts = {};

  data.forEach((element) => {
    if ("datetime" in element && "quantity" in element) {
      let date = element.datetime.split(" ")[0];
      let month = date.split("-").slice(0, 2).join("-");

      if (!(month in counts)) {
        counts[month] = 0;
      }

      counts[month] += parseInt(element.quantity, 10);
    }
  });

  let sortableCounts = Object.keys(counts).map((key) => {
    return { month: key, count: counts[key] };
  });

  let sortedCounts = sortableCounts.sort((a, b) => {
    return a.month.localeCompare(b.month);
  });

  return sortedCounts;
};

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});

app.get("/ads-spend-data", (req, res) => {
  const resultPromise = getCachedData(adsSpendCache, getAdsSpend);
  resultPromise
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.send({ error });
    });
});

app.get("/all-purchase-data", (req, res) => {
  const resultPromise = getCachedData(purchaseDataCache, getPurchaseData);
  resultPromise
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.send({ error });
    });
});

// New endpoint with specific data from bigQuery

app.get("/monthly-orders", (req, res) => {
  const resultPromise = getCachedData(
    reducedPurchaseDataCache,
    getReducedPurchaseData
  );
  resultPromise
    .then((result) => {
      let newResult = ordersByMonth(result);
      res.send(newResult);
    })
    .catch((error) => {
      console.log(error);
      res.send({ error });
    });
});
