import React, { useRef, useState, useEffect } from "react";
import getCompanyStockData from "./inputData";
import * as d3 from "d3";

export default function LineChart() {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCompanyStockData("AAL").then((data) => setData(data));
    // setData([25, 30, 45, 60, 20]);
  }, []);

  useEffect(() => {
    // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
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

    const svg = d3.select(svgRef.current);
    const myLine = d3
      .line()
      .x((data) => Math.round(xScale(data.date)))
      .y((data) => Math.round(yScale(data.volume)));

    svg
      .selectAll("path")
      .data([data])
      .join("svg")
      .attr("d", (data) => myLine(data))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <svg ref={svgRef}>
      <path d="M0,150 100,100 150,120" stroke="blue" fill="none" />
    </svg>
  );
}
