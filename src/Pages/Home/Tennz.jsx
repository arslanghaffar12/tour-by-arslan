import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const Tennz = (props) => {
  const [XAxis, setXAxis] = useState([]);
  const [chartdata, setChartdata] = useState([]);

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
    const XData = props.data.map((e) => {
      let dateValue = new Date(e.Date);
      let time =
        `${Months[dateValue.getMonth()]} ` +
        `${dateValue.getFullYear()}`.slice(2);
      return time;
    });
    const gettingData = props.data.map((e) => e["10 Year"]);
    setXAxis(XData);
    setChartdata(applyTwoZeroes(gettingData));
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
          props && props.data[params[0].dataIndex].Date.split(/[ /]/)[0]
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
      interval: 4,
      nameGap: 50,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 15,
      },
      axisLabel: {
        interval: Math.floor(XAxis.length / 11),
        textStyle: {
          fontSize: 10,
          margin: 20,
        },
      },
    },
    yAxis: {
      type: "value",
      name: "10 yr NZ Govt Bond Yield (%)",
      nameGap: 40,
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
      bottom: "40%",
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
        name: "10 Year NZ ",
        data: chartdata,
        type: "line",
        symbol: "none",
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

export default Tennz;
