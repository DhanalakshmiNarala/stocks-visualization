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
    const chartWidth = 1000 - margins.top - margins.bottom;

    const xScale = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    xScale.domain(data.map((data) => data.date));
    yScale.domain([0, d3.max(data, (data) => data.volume) + 3]);

    const chartContainer = d3
      .select(svgRef.current)
      .attr("height", chartHeight + margins.top + margins.bottom)
      .attr("width", chartWidth)
      .style("background", "#DAF7A6");

    const chart = chartContainer.append("g");

    chart
      .append("g")
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .attr("transform", `translate(0, ${chartHeight})`);

    chart
      .selectAll("rect")
      .data(data, (data) => data.date)
      .enter()
      .append("rect")
      .attr("height", (data) => chartHeight - yScale(data.volume))
      .attr("width", xScale.bandwidth())
      .attr("x", (data) => xScale(data.date))
      .attr("y", (data) => yScale(data.volume))
      .attr("fill", (data) => (data.close > data.open ? "green" : "red"));

    const x = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
    const y = d3.scaleLinear().range([chartHeight, 0]);

    x.domain(data.map((data) => data.date));
    y.domain([0, d3.max(data, (data) => data.close) + 3]);

    const candles = chartContainer.append("g");
    candles
      .selectAll("rect")
      .data(data, (data) => data)
      .enter()
      .append("rect")
      .attr("height", (data) => Math.abs(y(data.close) - y(data.open)))
      .attr("width", xScale.bandwidth())
      .attr("x", (data) => xScale(data.date))
      .attr("y", (data) => y(data.close))
      .attr("fill", (data) => (data.close > data.open ? "green" : "red"));

    const barWidth = xScale.bandwidth();
    const sticks = chartContainer.append("g");
    sticks
      .selectAll("line")
      .data(data, (data) => data)
      .enter()
      .append("line")
      .attr("x1", (data) => Math.abs(xScale(data.date)) + barWidth / 2)
      .attr("y1", (data) => y(data.high))
      .attr("x2", (data) => Math.abs(xScale(data.date)) + barWidth / 2)
      .attr("y2", (data) => y(data.low))
      .style("stroke", (data) => (data.close > data.open ? "green" : "red"))
      .style("stroke-width", 1);
  }, [data]);
  return <svg ref={svgRef}></svg>;
}
