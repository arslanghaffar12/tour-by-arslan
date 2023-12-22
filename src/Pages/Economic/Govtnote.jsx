import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { format } from "date-fns";

const Govtnote = (props) => {
  const [jsonData, setJsonData] = useState(null);
  const [lagends, setLagends] = useState([]);
  const [XAxis, setXAxis] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);

  useEffect(() => {
    if (props?.data) {
      setJsonData(props.data);
    }
  }, [props]);

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

  const calculateData = () => {
    const xData = jsonData.map((value) => {
      if (value["Unnamed: 0"]) {
        let dateValue = new Date(value["Unnamed: 0"]);
        let time =
          `${Months[dateValue.getMonth()]} ` +
          `${dateValue.getFullYear()}`.slice(2);
        return time;
      }
    });

    const gettingData2 = jsonData.map((e) => e["1 year"]);
    const gettingData5 = jsonData.map((e) => e["2 year"]);
    const gettingData7 = jsonData.map((e) => e["5 year"]);
    const gettingData3 = jsonData.map((e) => e["10 year"]);
    const gettingData1 = jsonData.map((e) => e["30 days"]);
    const gettingData4 = jsonData.map((e) => e["60 days"]);
    const gettingData6 = jsonData.map((e) => e["90 days"]);
    const gettingData8 = jsonData.map((e) => e["Official Cash Rate (OCR)"]);
    const gettingData9 = jsonData.map(
      (e) => e["Overnight interbank cash rate"]
    );

    const gettingLagends = Object.keys(jsonData[0]);
    setXAxis(xData);
    setLagends(gettingLagends);

    setData1(applyTwoZeroes(gettingData1));
    setData2(applyTwoZeroes(gettingData2));
    setData3(applyTwoZeroes(gettingData3));
    setData4(applyTwoZeroes(gettingData4));
    setData5(applyTwoZeroes(gettingData5));
    setData6(applyTwoZeroes(gettingData6));
    setData7(applyTwoZeroes(gettingData7));
    setData8(applyTwoZeroes(gettingData8));
    setData9(applyTwoZeroes(gettingData9));
  };

  useEffect(() => {
    if (jsonData != null && jsonData.length >= 1) {
      calculateData();
    }
  }, [jsonData]);

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const time = params[0].axisValue;
        // Format time (x-axis data) to "dd-mm-yyyy" format
        const formattedTime = format(new Date(time), "dd-MM-yyyy");

        let tooltipContent = `${
          jsonData[params[0].dataIndex]["Unnamed: 0"].split(/[ /]/)[0]
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
    
          interval: Math.floor(XAxis.length /11),
          textStyle: {    
            fontSize: 10, 
           margin:20,
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Bond Yield (%)",
      nameGap: 70,
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
      bottom: "20%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },

    legend: {
      data: [
        "1 year",
        "2 year",
        "5 year",
        "10 year",
        "30 days",
        "60 days",
        "90 days",
        "Official Cash Rate (OCR)",
        "Overnight interbank cash rate",
      ],
      textStyle: {
        fontSize: 11,
      },

      left: "0",
      top: "10",
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
        name: "1 year",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "2 year",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "5 year",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "10 year",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "30 days",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "60 days",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "90 days",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "Official Cash Rate (OCR)",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "Overnight interbank cash rate",
        data: data9,
        type: "line",
        symbol: "none",
      },
    ],
  };

  return (
    <div className="main_line">
      <div className="line_content">
        <ReactECharts option={option} />
      </div>
    </div>
  );
};

export default Govtnote;
