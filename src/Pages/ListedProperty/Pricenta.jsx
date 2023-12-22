import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Pricenta = (props) => {
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
    const xData = jsonData.map((value) => {
      if (value?.Date) {
        let dateParts = value.Date.split("/"); // Split the date string by '/'
        let day = dateParts[0];
        let month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
        let year = dateParts[2];
        let time = `${Months[month]} ${year.slice(-2)}`;
        return time;
      }
    });

    const gettingData1 = applyTwoZeroes(jsonData.map((measure) => measure["APL"]));
    const gettingData2 = applyTwoZeroes(jsonData.map((measure) => measure["ARG"]));
    const gettingData3 = applyTwoZeroes(jsonData.map((measure) => measure["GMT"]));
    const gettingData4 = applyTwoZeroes(jsonData.map((measure) => measure["IPL"]));
    const gettingData5 = applyTwoZeroes(jsonData.map((measure) => measure["KPG"]));
    const gettingData6 = applyTwoZeroes(jsonData.map((measure) => measure["PCT"]));
    const gettingData7 = applyTwoZeroes(jsonData.map((measure) => measure["PFI"]));
    const gettingData8 = applyTwoZeroes(jsonData.map((measure) => measure["SPG"]));
    const gettingData9 = applyTwoZeroes(jsonData.map((measure) => measure["VHP"]));
    const gettingData10 = applyTwoZeroes(jsonData.map((measure) => measure["Average"]));
    const gettingLagends = Object.keys(jsonData[0]);

    setXAxis(xData);
    setLagends(gettingLagends);
    setData1(gettingData1);
    setData2(gettingData2);
    setData3(gettingData3);
    setData4(gettingData4);
    setData5(gettingData5);
    setData6(gettingData6);
    setData7(gettingData7);
    setData8(gettingData8);
    setData9(gettingData9);
    setData10(gettingData10);
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
        let tooltipContent = `${jsonData[params[0].dataIndex].Date}<br>`;
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
        interval: Math.floor(XAxis.length /9),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 0.2,
      name: "Price/NTA ($)",
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
        "APL",
        "ARG",
        "GMT",
        "IPL",
        "KPG",
        "PCT",
        "PFI",
        "SPG",
        "VHP",
        "Average",
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
        name: "APL",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "ARG",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "GMT",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "IPL",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "KPG",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "PCT",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "PFI",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "SPG",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "VHP",

        data: data9,
        type: "line",
        symbol: "none",
      },
      {
        name: "Average",
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

export default Pricenta;
