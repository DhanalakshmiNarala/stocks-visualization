import * as d3 from "d3";
import React, { useRef, useState, useEffect } from "react";
import getCompanyStockData from "./inputData";

export default function CandleStickChart() {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCompanyStockData("AAL").then((stockdata) => {
      stockdata = stockdata.slice(0, 50);
      setData(stockdata);
    });
  }, []);

  useEffect(() => {
    const margins = { top: 20, bottom: 10 };
    const chartHeight = 500;
    const chartWidth = 500 - margins.top - margins.bottom;

    const xScale = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    xScale.domain(data.map((data) => data.date));
    yScale.domain([0, d3.max(data, (data) => data.volume) + 3]);

    const svg = d3
      .select(svgRef.current)
      .attr("height", chartHeight + margins.top + margins.bottom)
      .attr("width", chartWidth)
      .style("background", "lightblue");

    svg
      .selectAll("rect")
      .data(data, (data) => data.date)
      .enter()
      .append("rect")
      .attr("height", (data) => chartHeight - yScale(data.volume))
      .attr("width", xScale.bandwidth())
      .attr("x", (data) => xScale(data.date))
      .attr("y", (data) => yScale(data.volume))
      .style("fill", "darkgreen");
  }, [data]);
  return <svg ref={svgRef}></svg>;
}
