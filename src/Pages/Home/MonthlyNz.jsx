import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const MonthlyNz = (props) => {
  const [legendsone, setLegendsone] = useState([]);
  const [legendstwo, setLegendstwo] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [firstobj, setFirstobj] = useState();
  const [secondtobj, setSecondobj] = useState();

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


  //   const data = {
  //     "April 2020": "",
  //     "April 2023": "",
  //     "April 2025": "5.33",
  //     "April 2027": "4.8",
  //     "April 2029": "4.65",
  //     "April 2033": "4.63",
  //     "April 2037": "4.77",
  //     "March 2019": "",
  //     "May 2021": "",
  //     "May 2024": "5.67",
  //     "May 2026": "4.93",
  //     "May 2028": "4.68",
  //     "May 2030": "4.64",
  //     "May 2031": "4.62",
  //     "May 2032": "4.63",
  //     "May 2034": "4.65",
  //     "May 2041": "4.86",
  //     "May 2051": "4.8",
  //     "Unnamed: 0": "2023-07-31 00:00:00"
  //   };
  //   const keysInOrder = [
  //     "March 2019",
  //     "April 2020",
  //     "May 2021",
  //     "April 2023",
  //     "May 2024",
  //     "April 2025",
  //     "May 2026",
  //     "April 2027",
  //     "May 2028",
  //     "April 2029",
  //     "May 2030",
  //     "May 2031",
  //     "May 2032",
  //     "April 2033",
  //     "May 2034",
  //     "April 2037",
  //     "May 2041",
  //     "May 2051",
  //   ];
  //   const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
  //     if (key !== "Unnamed: 0") {
  //       acc[key] = value;
  //     }
  //     return acc;
  //   }, {});
  //   const orderedValues = keysInOrder.map((key) => filteredData[key]);
  //   return orderedValues;
  // };

  const getOrderedList = (data) => {
    const sortedData = Object.entries(data)
      .filter(([key]) => key !== "Unnamed: 0")
      .sort(([a], [b]) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
      });

    const orderedKeys = sortedData.map(([key]) => key);
    const filteredKeys = orderedKeys.filter((key) => key !== "Unnamed: 0");
    const keysInOrder = sortedData.map(([key]) => key);
    const filteredData = sortedData.reduce((acc, [key, value]) => {
      if (key !== "Unnamed: 0") {
        acc[key] = value;
      }
      return acc;
    }, {});
    const orderedValues = keysInOrder.map((key) => filteredData[key]);
    const datePart = data["Unnamed: 0"].slice(0, 10);
    setLegendsone(datePart);
    setXAxis(formatMonthNamesToAbbreviation(filteredKeys));
    setFirstobj(applyTwoZeroes(orderedValues));
    return { orderedKeys: filteredKeys, orderedValues };
  };

  const getOrderedListTwoObj = (data) => {
    const sortedData = Object.entries(data)
      .filter(([key]) => key !== "Unnamed: 0")
      .sort(([a], [b]) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
      });
    const orderedKeys = sortedData.map(([key]) => key);
    const filteredKeys = orderedKeys.filter((key) => key !== "Unnamed: 0");
    const keysInOrder = sortedData.map(([key]) => key);
    const filteredData = sortedData.reduce((acc, [key, value]) => {
      if (key !== "Unnamed: 0") {
        acc[key] = value;
      }
      return acc;
    }, {});
    const orderedValues = keysInOrder.map((key) => filteredData[key]);
    const datePart = data["Unnamed: 0"].slice(0, 10);
    setLegendstwo(datePart);
    setSecondobj(applyTwoZeroes(orderedValues));

    return { orderedKeys: filteredKeys, orderedValues };
  };

  function formatMonthNamesToAbbreviation(xAxisData) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedXAxisData = xAxisData.map((dateString) => {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        const monthIndex = date.getMonth();
        const monthAbbreviation = months[monthIndex].substring(0, 3);
        const year = date.getFullYear().toString().slice(2); // Modified line
        return `${monthAbbreviation} ${year}`;
      } else {
        return dateString; // Return the original string if it's not a valid date
      }
    });

    return formattedXAxisData;
  }

  useEffect(() => {
    if (props?.data) {
      getOrderedList(props?.data[0]);
      getOrderedListTwoObj(props?.data[1]);
    }
  }, [props]);

  const option = {
    // tooltip: {
    //   trigger: "axis",
    //   formatter: function (params) {
    //     let tooltip = "";
    //     params.forEach(function (item) {
    //       // Customize the tooltip content as needed
    //       tooltip += `${item.seriesName}: ${item.value}<br>`;
    //     });
    //     return tooltip;
    //   },
    // },

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
      data: xAxis,
      name: "Date",
      nameGap: 80,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 15,
      },
  
    },
    yAxis: {
      type: "value",
      interval: 1,
      name: "Yield (%)",
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
      bottom: "30%",
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
      top: "20",
      orient: "vertical",
    },
    legend: {
      data: [legendsone, legendstwo],
      textStyle: {
        fontSize: 11,
      },
      left: "30",
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
        name: legendsone,
        data: firstobj,
        type: "line",
      },
      {
        name: legendstwo,
        data: secondtobj,
        type: "line",
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

export default MonthlyNz;
