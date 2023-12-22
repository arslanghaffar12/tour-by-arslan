import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const Primeyeilds = (props) => {
  const [XAxis, setXAxis] = useState([]);
  const [AucklandBDPrime, setAucklandBDPrime] = useState([]);
  const [AucklandIndustrial, setAucklandIndustrial] = useState([]);
  const [AucklandRetail, setAucklandRetail] = useState([]);
  const [tenyrNZ, setTenyrNZ] = useState([]);
  const [jsonData, setJsondata] = useState([]);
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const applyTwoZeroes = (numbers) => {
    return numbers.map((number) => {
      const parsedNumber = parseFloat(number);
      if (number === "") {
        return number;
      }
      if (Number.isNaN(parsedNumber)) {
        return parsedNumber;
      }
      if (Number.isInteger(parsedNumber)) {
        return parsedNumber.toFixed(2);
      } else {
        return parsedNumber;
      }
    });
  };

  const calculateData = async () => {
    let DrivedData = props.data.filter((v) => (v["10 Year"] ? true : false));
    setJsondata(DrivedData);
    const xData = DrivedData.map((value) => {
      if (value["Date"]) {
        let dateValue = new Date(value["Date"]);
        let time =
          `${Months[dateValue.getMonth()]} ` +
          `${dateValue.getFullYear()}`.slice(2);
        return time;
      }
    });
    const gettingData1 = DrivedData.map((e) => e["Auckland CBD Prime Yield"]);
    const gettingData2 = DrivedData.map(
      (e) => e["Auckland Industrial Prime Yield"]
    );
    const gettingData3 = DrivedData.map((e) => e["Auckland Retail Yield"]);
    const gettingData4 = DrivedData.map((e) => e["10 Year"]);

    setXAxis(xData);
    setAucklandBDPrime(applyTwoZeroes(gettingData1));
    setAucklandIndustrial(applyTwoZeroes(gettingData2));
    setAucklandRetail(applyTwoZeroes(gettingData3));
    setTenyrNZ(applyTwoZeroes(gettingData4));
  };

  useEffect(() => {
    if (props?.data) {
      calculateData();
    }
  }, [props]);

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const time = params[0].axisValue;
        let tooltipContent = `${
          jsonData[params[0].dataIndex].Date.split(/[ /]/)[0]
        }<br>`;
        params.forEach((param) => {
          const seriesName = param.seriesName;
          const value = param.value;
          let formattedValue = value;
          const color = param.color;
          if (!isNaN(value)) {
            formattedValue = parseFloat(value).toFixed(2);
          }
          tooltipContent += `<span style="display:inline-block; width: 10px; height: 10px; background-color: ${color};"></span> ${seriesName}: ${formattedValue}<br>`;
        });
        return tooltipContent;
      },
    },
    xAxis: {
      type: "category",
      data: XAxis,
      name: "Date",
      nameGap: 25,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 15,
      },
      axisLabel: {
        interval: Math.floor(XAxis.length / 9),
        textStyle: {
          fontSize: 10,
          margin: 20,
        },
      },
    },
    yAxis: {
      type: "value",
      interval: 2.5,
      name: "Yield (%)",
      nameGap: 50,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 15,
      },
      axisLabel: {
        formatter: function (value) {
          if (value % 1 !== 0) {
            return value.toFixed(2);
          } else {
            return value.toFixed(0) + ".00";
          }
        },
      },
    },

    grid: {
      bottom: "25%",
      top: "20%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        propstore: {},
        saveAsImage: {},
      },
      right: "0",
      top: "0",
      orient: "vertical",
    },

    legend: {
      data: [
        "Auckland CBD Prime Yield",
        "Auckland Industrial Prime Yield",
        "Auckland Retail Yield",
        "10yr NZ Government Bond Yield",
      ],

      textStyle: {
        fontSize: 11,
      },

      left: "0",
      top: "0",
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },

      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Auckland CBD Prime Yield",
        data: AucklandBDPrime,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "Auckland Industrial Prime Yield",

        data: AucklandIndustrial,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "Auckland Retail Yield",
        data: AucklandRetail,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "10yr NZ Government Bond Yield",
        data: tenyrNZ,
        type: "line",
        symbol: "none",
        stack: "Total",
        yAxisIndex: 0,
        areaStyle: {},
        color: "#a9a9a9",
        emphasis: {
          focus: "series",
        },
      },
    ],
  };

  return (
    <div className="main_line">
      <div className="line_content_one">
        <ReactECharts option={option} />
      </div>
    </div>
  );
};

export default Primeyeilds;
