import React, { useRef, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./Home.scss";
import Marrketcaprate from "./Marrketcaprate";
import Primeyeilds from "./Primeyeilds";
import Tennz from "./Tennz";
import MonthlyNz from "./MonthlyNz";
import {
  tenNZData,
  twomonthData,
  table_Data,
  primeData,
  homecard,
  table_extra,
} from "../../helpers/request";
import { Spin } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [dataResponse, setDataResponse] = useState();
  const [tabledata, setTabledata] = useState();
  const [tablelod, setTablelod] = useState();
  const [tenloading, setTenLoading] = useState(true);
  const [monthloading, setMonthLoading] = useState(true);
  const [tenData, sethomeData] = useState();
  const [monthData, setTwomonthData] = useState();
  const [topcard, setTopcard] = useState();
  const [primedata, setPrimedata] = useState();
  const [primelod, setPrimelod] = useState();
  const [marketdata, setMarketdata] = useState();
  const [marketlod, setMarketlod] = useState();
  const [carData, setCardata] = useState();
  const [carlod, setcarlod] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await tenNZData();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        sethomeData(res.data.result);
        setMonthLoading(false);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await twomonthData();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setTwomonthData(res.data.result);
        setTenLoading(false);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await table_extra();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setTopcard(res.data.result);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await homecard();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setCardata(res.data.result);
        setcarlod(false);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await table_Data();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setTabledata(res.data.result);
        setTablelod(false);
      }
    };

    fetchdata();
  }, []);

  function calculateAverageWithFourDecimalPlaces(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return null;
    }

    const sum = numbers.reduce((total, num) => total + num, 0);

    const average = sum /8;
    const formattedAverage = parseFloat(average).toFixed(4);
    return formattedAverage;
  }

  function twoDecimalPlaces(numbers) {
    const formattednum = parseFloat(numbers).toFixed(2);
    return formattednum;
  }
  function oneDecimalPlaces(numbers) {
    const formattednum = parseFloat(numbers).toFixed(1);
    return formattednum;
  }

  useEffect(() => {
    const fetchdata = async () => {
      const res = await primeData();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setPrimedata(res.data.result.AucklandYields);
        setMarketdata(res.data.result.MarketCapRates);
        setMarketlod(false);
        setPrimelod(false);
      }
    };

    fetchdata();
  }, []);
  function formatNumberToFourDecimalPlaces(number) {
    if (Number.isInteger(number)) {
      return number.toFixed(4);
    } else {
      return parseFloat(number).toFixed(4);
    }
  }
  function formatNumberToTwoDecimalPlaces(number) {
    if (number === "" || isNaN(parseFloat(number))) {
      return "";
    } else {
      return parseFloat(number).toFixed(2) + "%";
    }
  }

  const calculateAverage = (numbers) => {
    const total = numbers.reduce((acc, number) => {
      try {
        return acc + parseFloat(number.replace("%", ""));
      } catch (e) {
        return acc.toFixed(2);
      }
    }, 0);
    return total / numbers.length.toFixed(2);
  };

  console.log("ofiawe9pfuiwe0f", carData && carData["GDP"]);

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="main_home">
        <div className="top_home">
          <div className="left_card">
            <div className="card_title">10 Year NZ Govt Bond Yield</div>
            <Spin spinning={tenloading}>
              <div className="card_content">
                <div className="test_sec">Source: RBNZ</div>
                <div className="card_top">
                  <div className="card_text">
                    <div className="subTitle">10 Year NZ Govt Bond Yield</div>
                    <div className="cardTitle">
                      {topcard && twoDecimalPlaces(topcard["10YearNZ"])}
                    </div>
                    {/* <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={time[5]}
                  name="color"
                  options={time}
                /> */}
                  </div>
                  <div className="card_text">
                    <div className="subTitle">2 Year NZ Govt Bond Yield</div>
                    <div className="cardTitle">
                      {topcard && twoDecimalPlaces(topcard["TwoYearNZ"])}
                    </div>

                    {/* <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={time[9]}
                  name="color"
                  options={time}
                /> */}
                  </div>
                  <div className="card_text">
                    <div className="subTitle">Spread (10yrs-2yrs)</div>
                    <div className="cardTitle">
                      {(
                        parseFloat(topcard && topcard["10YearNZ"]) -
                        parseFloat(topcard && topcard["TwoYearNZ"])
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
                <Tennz data={tenData && tenData} />
                <div className="card_top">
                  <div className="card_text">
                    <div className="subTitle">10 Year US Govt Bond Yield</div>
                    <div className="cardTitle">
                      {topcard && twoDecimalPlaces(topcard["10YearUS"])}
                    </div>

                    {/* <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={time[5]}
                  name="color"
                  options={time}
                /> */}
                  </div>
                  <div className="card_text">
                    <div className="subTitle">2 Year US Govt Bond Yield</div>
                    <div className="cardTitle">
                      {topcard && twoDecimalPlaces(topcard["TwoYearUS"])}
                    </div>
                    {/* <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={time[9]}
                  name="color"
                  options={time}
                /> */}
                  </div>
                  <div className="card_text">
                    <div className="subTitle">Spread (10yrs-2yrs)</div>
                    <div className="cardTitle">
                      {(
                        parseFloat(topcard && topcard["10YearUS"]) -
                        parseFloat(topcard && topcard["TwoYearUS"])
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </Spin>
          </div>

          <div className="right_card">
            <div className="card_title">
              Monthly NZ Govt Yield Curve
              <span>(updated at end of month)</span>
            </div>
            <Spin spinning={monthloading}>
              <div className="card_content">
                <div className="test_sec">Source: RBNZ</div>
                <MonthlyNz data={monthData && monthData} />
              </div>
            </Spin>
          </div>
        </div>
        <Spin spinning={carlod}>
          <div className="main_percentCard">
            <div className="num_card">
              <div className="bold_title">
                {carData && oneDecimalPlaces(carData["GDP"])}%
              </div>
              <div className="subHead">GDP Growth</div>
            </div>
            <div className="num_card">
              <div className="bold_title">
                {carData && oneDecimalPlaces(carData["InflationRate"])}%
              </div>
              <div className="subHead">Inflation Rate</div>
            </div>
            <div className="num_card">
              <div className="bold_title">
                {carData && oneDecimalPlaces(carData["UnEmploymentRate"])}%
              </div>
              <div className="subHead">Unemployment Rate</div>
            </div>
          </div>
        </Spin>
        <Spin spinning={tablelod}>
          <div className="main_table">
            <div className="table_content">
              <div className="table_title">LPV Sector Overview</div>
              <Table striped>
                <thead>
                  <tr>
                    <th className="w-15">Company</th>
                    <th className="w-15">Ticker</th>
                    <th className="w-15">P/NTA</th>
                    <th className="w-15">Dividend Yield %</th>
                    <th className="w-15">Market Cap Rate %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Asset Plus</td>
                    <td>APL</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.APL)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.APL
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.APL
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>Argosy Property</td>
                    <td>ARG</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.ARG)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.ARG
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.ARG
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>Goodman Property</td>
                    <td>GMT</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.GMT)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.GMT
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.GMT
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>Investore</td>
                    <td>IPL</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.IPL)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.IPL
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.IPL
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>Kiwi Property Group</td>
                    <td>KPG</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.KPG)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.KPG
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.KPG
                        )}
                    </td>
                  </tr>

                  <tr>
                    <td>Precinct Properties</td>
                    <td>PCT</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.PCT)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.PCT
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.PCT
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>Property for Industry</td>
                    <td>PFI</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.PFI)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.PFI
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.PFI
                        )}
                    </td>
                  </tr>

                  <tr>
                    <td>Stride Property</td>
                    <td>SPG</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.SPG)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.SPG
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.SPG
                        )}
                    </td>
                  </tr>

                  <tr>
                    <td>Vital Healthcare</td>
                    <td>VHP</td>
                    <td>
                      {tabledata &&
                        formatNumberToFourDecimalPlaces(tabledata.PNTA.VHP)}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.DividendYield.VHP
                        )}
                    </td>
                    <td>
                      {tabledata &&
                        formatNumberToTwoDecimalPlaces(
                          tabledata.MarketCapRates.VHP
                        )}
                    </td>
                  </tr>
                  <tr>
                    <th>Sector average (excl. APL)</th>
                    <th>Average (excl. APL)</th>
                    <th>
                      {calculateAverageWithFourDecimalPlaces([
                        tabledata &&
                          tabledata.PNTA.ARG +
                            tabledata.PNTA.GMT +
                            tabledata.PNTA.IPL +
                            tabledata.PNTA.KPG +
                            tabledata.PNTA.PCT +
                            tabledata.PNTA.PFI +
                            tabledata.PNTA.SPG +
                            tabledata.PNTA.VHP,
                      ])}
                    </th>
                    <th>
                      {calculateAverage([
                        tabledata &&
                          tabledata.DividendYield.ARG +
                            tabledata.DividendYield.GMT +
                            tabledata.DividendYield.IPL +
                            tabledata.DividendYield.KPG +
                            tabledata.DividendYield.PCT +
                            tabledata.DividendYield.PFI +
                            tabledata.DividendYield.SPG +
                            tabledata.DividendYield.VHP,
                      ]).toFixed(2)}
                      %
                    </th>

                    <th>
                      {calculateAverage([
                        tabledata &&
                          tabledata.MarketCapRates.ARG +
                            tabledata.MarketCapRates.GMT +
                            tabledata.MarketCapRates.IPL +
                            tabledata.MarketCapRates.KPG +
                            tabledata.MarketCapRates.PCT +
                            tabledata.MarketCapRates.PFI +
                            tabledata.MarketCapRates.SPG +
                            tabledata.MarketCapRates.VHP,
                      ]).toFixed(2)}
                      %
                    </th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Spin>

        <div className="bottom_home">
          <div className="right_card">
            <div className="card_title">Prime Yields</div>
            <Spin spinning={primelod}>
              <div className="card_content">
                <div className="test_sec">Source: CBRE, RBNZ</div>
                <Primeyeilds data={primedata && primedata} />
              </div>
            </Spin>
          </div>

          <div className="right_card">
            <div className="card_title">Market Cap Rate</div>
            <Spin spinning={marketlod}>
              <div className="card_content">
                <div className="test_sec">
                  Source: RBNZ, Willis Bond Analysis
                </div>
                <Marrketcaprate data={marketdata && marketdata} />
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
