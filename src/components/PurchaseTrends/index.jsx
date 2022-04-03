import React from "react";
import request from "request";
import { Roller } from "react-awesome-spinners";

import PurchaseTrendChart from "./PurchaseTrendBarChart";

class PurchaseTrendPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
    };
  }

  componentDidMount() {
    const options = {
      url: "http://localhost:5000/monthly-orders",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.state.data == null) {
      this.setState(() => ({
        loading: true,
      }));

      request(options, (error, response, body) => {
        if (error) {
          console.error(error);
          this.setState(() => ({
            loading: false,
          }));
        } else {
          this.setState(() => ({
            data: JSON.parse(body),
            loading: false,
          }));
        }
      });
    }
  }

  render() {
    const { data, loading } = this.state;

    return (
      <>
        <div className="Page-Header">
          <h1>Purchase Trend Report</h1>
        </div>

        <div className="Page-Content">
          <div className="Page-Content">
            <div className="Chart-Area" style={{ width: 740 }}>
              <h2>Orders by Month</h2>
              <p>Total number of orders made by month.</p>

              {loading && <Roller />}
              <PurchaseTrendChart graphData={data} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PurchaseTrendPage;
