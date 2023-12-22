import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Govtyield = (props) => {
  const [jsonData, setJsonData] = useState(null);
  const [lagends, setLagends] = useState([]);
  const [XAxis, setXAxis] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);

  useEffect(() => {
    if (props?.data) {
      setJsonData(props.data);
    }
  }, [props]);

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
  const calculateData = () => {
    const gettingData1 = jsonData.map((e) => e["NZ - A year ago"]);
    const gettingData2 = jsonData.map((e) => e["NZ - One month ago"]);
    const gettingData3 = jsonData.map((e) => e["NZ - Today"]);
    const gettingData4 = jsonData.map((e) => e["US - A year ago"]);
    const gettingData5 = jsonData.map((e) => e["US - One month ago"]);
    const gettingData6 = jsonData.map((e) => e["US - Today"]);
    const gettingData7 = jsonData.map((e) => e["Unnamed: 0"]);

    const gettingLagends = Object.keys(jsonData[0]);

    setXAxis(gettingData7);
    setLagends(gettingLagends);
    setData1(applyTwoZeroes(gettingData1));
    setData2(applyTwoZeroes(gettingData2));
    setData3(applyTwoZeroes(gettingData3));
    setData4(applyTwoZeroes(gettingData4));
    setData5(applyTwoZeroes(gettingData5));
    setData6(applyTwoZeroes(gettingData6));
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
        let tooltipContent = `${time}<br>`;
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
      top: "10%",
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
      right: "0",
      top: "0",
      orient: "vertical",
    },

    legend: {
      data: [
        "NZ - A year ago",
        "NZ - One month ago",
        "NZ - Today",
        "US - A year ago",
        "US - One month ago",
        "US - Today",
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
        name: "NZ - A year ago",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "NZ - One month ago",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "NZ - Today",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "US - A year ago",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "US - One month ago",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "US - Today",
        data: data6,
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

export default Govtyield;
