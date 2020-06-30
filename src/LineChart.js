import React, { useRef, useState, useEffect } from "react";
import getCompanyStockData from "./inputData";
import * as d3 from "d3";

export default function LineChart() {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCompanyStockData("AAL").then((data) => setData(data));
  }, []);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const chartHeight = 500;
    const chartWidth = 500;
    const chartContainer = d3
      .select(svgRef.current)
      .attr("height", chartHeight)
      .attr("width", chartWidth)
      .style("background", "lightblue");

    const xScale = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    xScale.domain(data.map((data) => data.date));
    yScale.domain([0, d3.max(data, (data) => data.volume) + 3]);

    const chart = chartContainer.append("g");

    chart
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr(
        "d",
        d3.line().x((d) => xScale(d.date).y(d.volume))
      )
      .style("stroke", "purple")
      .style("stroke-width", 1.5);
  }, [data]);
  return <svg ref={svgRef}></svg>;
}
