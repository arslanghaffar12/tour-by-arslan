import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Residential = (props) => {
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
    return numbers.map(number => {
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

    const gettingData1 = jsonData.map((e) => e["1 Year"]);
    const gettingData2 = jsonData.map((e) => e["18 Months"]);
    const gettingData3 = jsonData.map((e) => e["2 Years"]);
    const gettingData4 = jsonData.map((e) => e["3 Years"]);
    const gettingData5 = jsonData.map((e) => e["4 Years"]);
    const gettingData6 = jsonData.map((e) => e["5 Years"]);
    const gettingData7 = jsonData.map((e) => e["6 Months"]);
    const gettingData8 = jsonData.map((e) => e["Capped"]);
    const gettingData9 = jsonData.map((e) => e["Floating"]);

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
        let tooltipContent = `${jsonData[params[0].dataIndex].Date.split(/[ /]/)[0]}<br>`;
        params.forEach(param => {
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
        interval: Math.floor(XAxis.length /10),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 2,
      name: "Mortgage Rates (%)",
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
        "1 Year",
        "18 Months",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years",
        "6 Months",
        "Capped",
        "Floating",
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
        name: "1 Year",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "18 Months",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "2 Years",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "3 Years",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "4 Years",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "5 Years",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "6 Months",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "Capped",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "Floating",
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

export default Residential;
