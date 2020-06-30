import * as d3 from "d3";
import stockdata from "./data/stockdata.csv";

export default async function getCompanyStockData(companyName) {
  const companiesData = await d3.csv(stockdata);
  return companiesData.filter(company => company.Name === companyName)
}
