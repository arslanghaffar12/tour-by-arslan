import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Stockprice = (props) => {
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

    const gettingData1 = applyTwoZeroes(jsonData.map((measure) => measure["APL.NZ"]));
    const gettingData2 = applyTwoZeroes(jsonData.map((measure) => measure["ARG.NZ"]));
    const gettingData3 = applyTwoZeroes(jsonData.map((measure) => measure["GMT.NZ"]));
    const gettingData4 = applyTwoZeroes(jsonData.map((measure) => measure["IPL.NZ"]));
    const gettingData5 = applyTwoZeroes(jsonData.map((measure) => measure["KPG.NZ"]));
    const gettingData6 = applyTwoZeroes(jsonData.map((measure) => measure["PCT.NZ"]));
    const gettingData7 = applyTwoZeroes(jsonData.map((measure) => measure["PFI.NZ"]));
    const gettingData8 = applyTwoZeroes(jsonData.map((measure) => measure["SPG.NZ"]));
    const gettingData9 = applyTwoZeroes(jsonData.map((measure) => measure["VHP.NZ"]));
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
        interval: Math.floor(XAxis.length /12),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 0.5,
      name: "Stock Prices ($)",
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
        "APL.NZ",
        "ARG.NZ",
        "GMT.NZ",
        "IPL.NZ",
        "KPG.NZ",
        "PCT.NZ",
        "PFI.NZ",
        "SPG.NZ",
        "VHP.NZ",
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
        name: "APL.NZ",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "ARG.NZ",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "GMT.NZ",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "IPL.NZ",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "KPG.NZ",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "PCT.NZ",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "PFI.NZ",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "SPG.NZ",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "VHP.NZ",

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

export default Stockprice;
