import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Nationalsaving = (props) => {
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
      if (value["Unnamed: 0"]) {
        let dateValue = new Date(value["Unnamed: 0"]);
        let time =
          `${Months[dateValue.getMonth()]} ` +
          `${dateValue.getFullYear()}`.slice(2);
        return time;
      }
    });

    const gettingData1 = jsonData.map((e) => e["Businesses"]);
    const gettingData2 = jsonData.map((e) => e["Financial intermediaries"]);
    const gettingData3 = jsonData.map((e) => e["General government"]);
    const gettingData4 = jsonData.map((e) => e["Household saving rate (%)"]);
    const gettingData5 = jsonData.map((e) => e["Households"]);
    const gettingData6 = jsonData.map((e) => e["National"]);
    const gettingData7 = jsonData.map(
      (e) => e["Non-profit institutions serving households"]
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
        let tooltipContent = `${jsonData[params[0].dataIndex]["Unnamed: 0"].split(/[ /]/)[0]}<br>`; 
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
    
        interval: Math.floor(XAxis.length /14),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 10000,
      name: "National Saving ($M)",
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
        restore: {},
        saveAsImage: {},
      },
      right: "0",
      top: "0",
      orient: "vertical",
    },

    legend: {
      data: [
        "Businesses",
        "Financial intermediaries",
        "General government",
        "Household saving rate (%)",
        "Households",
        "National",
        "Non-profit institutions serving households",
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
        name: "Businesses",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "Financial intermediaries",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "General government",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "Household saving rate (%)",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "Households",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "National",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "Non-profit institutions serving households",
        data: data7,
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

export default Nationalsaving;
