import React, { useEffect, useState } from "react";
import Btntitle from "../../Components/Btntitle/Btntitle";
import Gdpmeasure from "./Gdpmeasure";
import Govtnote from "./Govtnote";
import Nationalsaving from "./Nationalsaving";
import Labour from "./Labour";
import Residential from "./Residential";
import {
  economicPage,
  govt,
  gdp,
  national,
  labour,
  mortgage,
  rbnz,
  us_nz,
} from "../../helpers/request";
import Rbnz from "./Rbnz";
import Govtyield from "./Govtyield";
import { Spin } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
const Economic = () => {
  const [gov, setGov] = useState();
  const [govlod, setgovlod] = useState(true);

  const [gdpme, setGdpme] = useState();
  const [gdpod, setGdplod] = useState(true);

  const [nationalda, setNational] = useState();
  const [nationallod, setNationallod] = useState(true);

  const [labourda, setLabour] = useState();
  const [labourlod, setLabourlod] = useState(true);

  const [mortgagada, setMortgageda] = useState();
  const [mortgagelod, setMortgagelod] = useState(true);

  const [rbnzda, setRbnzda] = useState();
  const [rbnzlod, setRbnzlod] = useState(true);

  const [usnzda, setusnzda] = useState();
  const [usnzlod, setusnzlod] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await govt();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setGov(res.data.result);
        setgovlod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await gdp();

      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setGdpme(res.data.result);
        setGdplod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await national();

      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setNational(res.data.result);
        setNationallod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await labour();

      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setLabour(res.data.result);
        setLabourlod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await mortgage();

      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setMortgageda(res.data.result);
        setMortgagelod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await rbnz();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setRbnzda(res.data.result);
        setRbnzlod(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await us_nz();
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setusnzda(res.data.result);
        setusnzlod(false);
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
          <div className="chart_title">Government Bonds</div>
          <Spin spinning={govlod}>
            <Govtnote data={gov && gov} />
          </Spin>
          <Btntitle filelink={gov && gov} title={"Government Bonds"} />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">GDP Measures</div>
          <Spin spinning={gdpod}>
            <Gdpmeasure data={gdpme && gdpme} />
          </Spin>
          <Btntitle filelink={gdpme && gdpme} title={"GDP Measures"} />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">National Savings</div>
          <Spin spinning={nationallod}>
            <Nationalsaving data={nationalda && nationalda} />
          </Spin>
          <Btntitle
            filelink={nationalda && nationalda}
            title={"National Savings"}
          />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Labour Force</div>
          <Spin spinning={labourlod}>
            <Labour data={labourda && labourda} />
          </Spin>
          <Btntitle filelink={labourda && labourda} title={"Labour Force"} />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">Residential Mortgage Rates</div>
          <Spin spinning={mortgagelod}>
            <Residential data={mortgagada && mortgagada} />
          </Spin>
          <Btntitle
            filelink={mortgagada && mortgagada}
            title={"Residential Mortgage Rates"}
          />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">RBNZ Balance Sheet</div>
          <Spin spinning={rbnzlod}>
            <Rbnz data={rbnzda && rbnzda} />
          </Spin>
          <Btntitle filelink={rbnzda && rbnzda} title={"RBNZ Balance Sheet"} />
          <div className="test">Source: RBNZ</div>
        </div>
        <div className="median_container">
          <div className="chart_title">
            Government Bond Yield Curve - US and NZ
          </div>
          <Spin spinning={usnzlod}>
            <Govtyield data={usnzda && usnzda} />
          </Spin>
          <Btntitle
            filelink={usnzda && usnzda}
            title={"Government Bond Yield Curve - US and NZ"}
          />
          <div className="test">Source: RBNZ, FRED</div>
        </div>
      </div>
    </>
  );
};

export default Economic;
