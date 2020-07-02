import * as d3 from "d3";
import stockdata from "./data/stockdata.csv";

export default async function getCompanyStockData(companyName) {
  const companiesData = await d3.csv(stockdata);
  return companiesData.filter((company) => company.Name === companyName);
}

export async function getCompanyNames() {
  console.log("Function called");
  const companiesData = await d3.csv(stockdata);
  const names = companiesData.reduce((result, company) => {
    const name = company.Name;
    if (!result[name]) {
      result[name] = [];
    }
    return result;
  }, {});

  console.log(names);
  return names;
}
