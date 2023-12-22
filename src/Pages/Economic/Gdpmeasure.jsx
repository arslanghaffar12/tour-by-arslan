import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const Gdpmeasure = (props) => {
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
  const [data10, setData10] = useState([]);

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
      if (value?.Date) {
        let dateValue = new Date(value?.Date);
        let time =
          `${Months[dateValue.getMonth()]} ` +
          `${dateValue.getFullYear()}`.slice(2);
        return time;
      }
    });

    const gettingData1 = jsonData.map(
      (measure) => measure["Change In Inventories"]
    );

    const gettingData2 = jsonData.map((measure) => measure["Exports"]);
    const gettingData3 = jsonData.map(
      (measure) => measure["GDP-Expenditure Based"]
    );
    const gettingData4 = jsonData.map(
      (measure) => measure["GDP-Production Based"]
    );
    const gettingData5 = jsonData.map(
      (measure) => measure["General Government Final Consumption Expenditure"]
    );
    const gettingData6 = jsonData.map(
      (measure) => measure["Gross Fixed Capital Formation - Other"]
    );
    const gettingData7 = jsonData.map(
      (measure) =>
        measure["Gross Fixed Capital Formation - Residential Buildings"]
    );
    const gettingData8 = jsonData.map(
      (measure) => measure["Gross National Expenditure"]
    );
    const gettingData9 = jsonData.map((measure) => measure["Imports"]);
    const gettingData10 = jsonData.map(
      (measure) => measure["Private Final Consumption Expenditure"]
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
    setData10(applyTwoZeroes(gettingData10));
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
    
        interval: Math.floor(XAxis.length /13),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 10000,
      name: "GDP Measure ($)",
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
      right: "0",
      top: "0",
      orient: "vertical",
    },

    legend: {
      data: [
        "Change in inventories",
        "Exports",
        "GDP-Expenditure Based",
        "GDP - Production Based",
        "Gneral Government Final Consumption Expenditure",
        "Gross Fixed Capital Formation - Other",
        "Gross Fixed Capital Formation - Residential Buildings",
        "Gross National Expenditure",
        "Imports",
        "Private Final Consumption Expenditure",
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
        name: "Change in inventories",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "Exports",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "GDP-Expenditure Based",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "GDP - Production Based",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "Gneral Government Final Consumption Expenditure",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "Gross Fixed Capital Formation - Other",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "Gross Fixed Capital Formation - Residential Buildings",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "Gross National Expenditure",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "Imports",

        data: data9,
        type: "line",
        symbol: "none",
      },
      {
        name: "Private Final Consumption Expenditure",
        data: data10,
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

export default Gdpmeasure;
