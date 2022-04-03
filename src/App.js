import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "./components/Sidebar";
import AdsSpendPage from "./components/AdsSpend";
import PurchaseTrendPage from "./components/PurchaseTrends";

function App() {
  return (
    <BrowserRouter className="App">
      <main class="App-Main">
        <Sidebar></Sidebar>
        <div className="App-Content flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="Page-Header">
                    <h1>Welcome!</h1>
                  </div>

                  <div className="Page-Content">
                    <p>Select a visualisation from the links of the left.</p>
                  </div>
                </>
              }
            ></Route>
            <Route path="/adspend" element={<AdsSpendPage />} />
            <Route path="/purchases" element={<PurchaseTrendPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
