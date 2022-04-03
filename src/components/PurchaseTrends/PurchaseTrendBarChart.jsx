import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class PurchaseTrendChart extends React.Component {
  render() {
    const { graphData } = this.props;

    if (!graphData || graphData.length === 0) {
      return <div></div>;
    }

    return (
      <LineChart
        width={700}
        height={500}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ margin: "10px auto" }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return value.toLocaleString();
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          name="Total Unique Orders"
          stroke="#00abff"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default PurchaseTrendChart;
