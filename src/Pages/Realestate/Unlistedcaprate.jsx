import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Unlistedcaprate = (props) => {
  const [jsonData, setJsonData] = useState(null);
  const [lagends, setLagends] = useState([]);
  const [XAxis, setXAxis] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

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

    const gettingData1 = applyTwoZeroes(jsonData.map(
      (e) => e["Auckland CBD office Prime Yield"]
    ));
    const gettingData2 = applyTwoZeroes(jsonData.map(
      (e) => e["Auckland Industrial Prime Yield"]
    ));
    const gettingData3 = jsonData.map((e) => e["Auckland Bulk Retail Yield"]);
    const gettingData4 = applyTwoZeroes(jsonData.map(
      (e) => e["Wellington CBD Office Prime Yield"]
    ));
    const gettingData5 = applyTwoZeroes(jsonData.map(
      (e) => e["Wellington Industrial Prime Yield"]
    ));

    const gettingLagends = Object.keys(jsonData[0]);

    setXAxis(xData);
    setLagends(gettingLagends);
    setData1(gettingData1);
    setData2(gettingData2);
    setData3(gettingData3);
    setData4(gettingData4);
    setData5(gettingData5);
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
        interval: Math.floor(XAxis.length /11),
        textStyle: {    
          fontSize: 10, 
         margin:20,
      },
    },
    },
    yAxis: {
      type: "value",
      interval: 2,
      name: "Unlisted Cap Rates ($)",
      nameGap: 80,
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
        "Auckland CBD office Prime Yield",
        "Auckland Industrial Prime Yield",
        "Auckland Bulk Retail Yield",
        "Wellington CBD Office Prime Yield",
        "Wellington Industrial Prime Yield",
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
        name: "Auckland CBD office Prime Yield",
        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "Auckland Industrial Prime Yield",
        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "Auckland Bulk Retail Yield",
        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "Wellington CBD Office Prime Yield",
        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "Wellington Industrial Prime Yield",
        data: data5,
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

export default Unlistedcaprate;
