import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

class AdsSpendBarChart extends React.Component {
  render() {
    const { graphData } = this.props;

    if (!graphData || graphData.length === 0) {
      return <div></div>;
    }

    const chartData = [];

    graphData.map((item) => {
      chartData.push({
        month: item.month_date.value.split("-").slice(0, 2).join("-"),
        spend: Math.round(item.ads_spend_usd),
      });
      return chartData;
    });

    return (
      <BarChart
        width={700}
        height={500}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
        style={{ margin: "10px auto" }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" label={{ value: "Month", position: "bottom" }} />
        <YAxis
          label={{
            value: "Total Spend (USD $)",
            angle: -90,
            position: "left",
            viewBox: { x: 15, y: 140, width: 100, height: 20 },
          }}
          width={90}
          axisLine={false}
        />
        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
        <Bar dataKey="spend" name="Ad Spend" stackId="a" fill="#00abff" />
      </BarChart>
    );
  }
}

export default AdsSpendBarChart;
