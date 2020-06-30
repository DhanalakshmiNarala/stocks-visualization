const data = Object.assign(
  d3
    .csvParse(await FileAttachment("./stockdata.csv").text(), d3.autoType)
    .map(({ date, close }) => ({ date, value: close })),
  { y: "$ Close" }
);

const line = d3
  .line()
  .defined((d) => !isNaN(d.value))
  .x((d) => x(d.date))
  .y((d) => y(d.value));

const x = d3
  .scaleUtc()
  .domain(d3.extent(data, (d) => d.date))
  .range([margin.left, width - margin.right]);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = (g) =>
  g.attr("transform", `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
  );

const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y)
    );

const margin = { top: 20, right: 30, bottom: 30, left: 40 };

const height = 500;
