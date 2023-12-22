import React, { useEffect, useState } from "react";
import Btntitle from "../../Components/Btntitle/Btntitle";
import Stockprice from "./Stockprice";
import {
  stockpriice,
  pricandenta,
  pricperenta,
  marketpercapRate,
  dividen,
} from "../../helpers/request";
import Averageprice from "./Averageprice";
import Pricenta from "./Pricenta";
import Listedmarket from "./Listedmarket";
import Dividened from "./Dividened";
import { Spin } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const ListedProperty = () => {
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(true);

  const [stockprice, setStockprice] = useState();
  const [stocklod, setStocklod] = useState(true);
  const [averageprice, setAverageprice] = useState();
  const [avergelod, setAveragelod] = useState(true);
  const [pricenta, setPricenta] = useState();
  const [pricelod, setPricelod] = useState(true);
  const [listedmarket, setListedmarket] = useState();
  const [marketlod, setMarketlod] = useState(true);
  const [divdend, setDividend] = useState();
  const [divlod, setDivlod] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await stockpriice();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setStockprice(res.data.result);
        setStocklod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await pricandenta();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setAverageprice(res.data.result);
        setAveragelod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await pricperenta();

      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setPricenta(res.data.result);
        setPricelod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await marketpercapRate();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setListedmarket(res.data.result);
        setMarketlod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await dividen();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setDividend(res.data.result);
        setDivlod(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="main_realstate">
        <div className="median_container">
          <div className="chart_title">Stock Prices - Adjusted Close</div>
          <Spin spinning={stocklod}>
            <Stockprice data={stockprice && stockprice} />
          </Spin>
          <Btntitle
            filelink={stockprice && stockprice}
            title={"Stock Prices - Adjusted Close"}
          />
              <div className="test">Source: Yahoo Finance</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Average Price and NTA</div>
          <Spin spinning={avergelod}>
            <Averageprice data={averageprice && averageprice} />
          </Spin>
          <Btntitle
            filelink={averageprice && averageprice}
            title={"Average Price and NTA"}
          />
          <div className="test">Source: Forsyth Barr</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Price/NTA</div>
          <Spin spinning={pricelod}>
            <Pricenta data={pricenta && pricenta} />
          </Spin>
          <Btntitle filelink={pricenta && pricenta} title={"Price/NTA"} />
          <div className="test">Source: Yahoo Finance, Willis Bond Analysis</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Listed Market Cap Rates</div>
          <Spin spinning={marketlod}>
            <Listedmarket data={listedmarket && listedmarket} />
          </Spin>
          <Btntitle
            filelink={listedmarket && listedmarket}
            title={"Listed Market Cap Rates"}
          />
          <div className="test">Source: Yahoo Finance, Willis Bond Analysis</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Dividend Yield</div>
          <Spin spinning={divlod}>
            <Dividened data={divdend && divdend} />
          </Spin>
          <Btntitle filelink={divdend && divdend} title={"Dividend Yield"} />
          <div className="test">Source: Yahoo Finance</div>
        </div>
      </div>
    </>
  );
};

export default ListedProperty;
