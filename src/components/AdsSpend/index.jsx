import React from "react";
import request from "request";
import { Roller } from "react-awesome-spinners";

import AdSpendsBarChart from "./AdSpendsBarChart.jsx";

class AdsSpendPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
    };
  }

  componentDidMount() {
    const options = {
      url: "http://localhost:5000/ads-spend-data",
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
          <h1>Ad Spend Report</h1>
        </div>

        <div className="Page-Content">
          <div className="Chart-Area" style={{ width: 740 }}>
            <h2>Total Ad-Spend by Month</h2>
            <p>Total amount spent on advertising in USD ($) per month.</p>

            {loading && <Roller />}
            <AdSpendsBarChart graphData={data} />
          </div>
        </div>
      </>
    );
  }
}

export default AdsSpendPage;
