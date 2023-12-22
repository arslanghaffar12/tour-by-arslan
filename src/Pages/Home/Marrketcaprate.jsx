import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Marrketcaprate = (props) => {
  const [jsonData, setJsonData] = useState(null);
  const [XAxis, setXAxis] = useState([]);
  const [APL, setAPL] = useState([]);
  const [ARG, setARG] = useState([]);
  const [GMT, setGMT] = useState([]);
  const [IPL, setIPL] = useState([]);
  const [KPG, setKPG] = useState([]);
  const [PCT, setPCT] = useState([]);
  const [PFI, setPFI] = useState([]);
  const [SPG, setSPG] = useState([]);
  const [VHP, setVHP] = useState([]);
  const [averageExc, setAverageexcl] = useState([]);
  const [tenNz, setTenNz] = useState([]);
 

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

  function removePercentSymbol(stringsArray) {
    const modifiedStrings = stringsArray.map((string) => {
      if (string?.endsWith("%")) {
        const words = string.split(" ");
        const lastWord = words[words.length - 1];
        const modifiedLastWord = lastWord.slice(0, -1); // Remove the "%"
        words[words.length - 1] = modifiedLastWord;
        return words.join(" ");
      }
      return string;
    });

    return modifiedStrings;
  }


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
    let DrivedData = props.data.filter((v) => (v["10 Year"] ? true : false));
    setJsonData(DrivedData)
    const xData = DrivedData.map((value) => {
      if (value["Date"]) {
        let dateValue = new Date(value["Date"]);
        let time =
          `${Months[dateValue.getMonth()]} ` +
          `${dateValue.getFullYear()}`.slice(2);
        return time;
      }
    });

    const gettingData1 = DrivedData.map((e) => e["APL"]);
    const gettingData2 = DrivedData.map((e) => e["ARG"]);
    const gettingData3 = DrivedData.map((e) => e["GMT"]);
    const gettingData4 = DrivedData.map((e) => e["IPL"]);
    const gettingData5 = DrivedData.map((e) => e["KPG"]);
    const gettingData6 = DrivedData.map((e) => e["PCT"]);
    const gettingData7 = DrivedData.map((e) => e["PFI"]);
    const gettingData8 = DrivedData.map((e) => e["SPG"]);
    const gettingData9 = DrivedData.map((e) => e["VHP"]);
    const gettingData10 = DrivedData.map((e) => e["10 Year"]);

    let averageArray = [];
    for (let i = 0; i < gettingData2.length; i++) {
      const values = [
        gettingData2[i],
        gettingData3[i],
        gettingData4[i],
        gettingData5[i],
        gettingData6[i],
        gettingData7[i],
        gettingData8[i],
        gettingData9[i],
      ];

      const averageData =
        values.reduce((sum, value) => {
          if (value === "") {
            return sum;
          }
          const parsedValue = parseFloat(value);
          if (isNaN(parsedValue)) {
            return sum;
          }
          return sum + parsedValue;
        }, 0) / values.filter((value) => value !== "").length;

      averageArray.push(averageData || "");
    }

    const parsedNumbers = averageArray.map((stringValue) => {
      if (stringValue === "") {
        return stringValue;
      }
      return parseFloat(stringValue);
    });

    setAverageexcl(parsedNumbers);

    setXAxis(xData);
    setAPL(applyTwoZeroes(removePercentSymbol(gettingData1)));
    setARG(applyTwoZeroes(removePercentSymbol(gettingData2)));
    setGMT(applyTwoZeroes(removePercentSymbol(gettingData3)));
    setIPL(applyTwoZeroes(removePercentSymbol(gettingData4)));
    setKPG(applyTwoZeroes(removePercentSymbol(gettingData5)));
    setPCT(applyTwoZeroes(removePercentSymbol(gettingData6)));
    setPFI(applyTwoZeroes(removePercentSymbol(gettingData7)));
    setSPG(applyTwoZeroes(removePercentSymbol(gettingData8)));
    setVHP(applyTwoZeroes(removePercentSymbol(gettingData9)));
    setTenNz(applyTwoZeroes(removePercentSymbol(gettingData10)));
  };

  useEffect(() => {
    if (props?.data) {
      calculateData();
    }
  }, [props]);

  useEffect(() => {}, [jsonData]);

  const option = {
    // tooltip: {
    //   trigger: "axis",
    //   formatter: function (params) {
    //     let tooltipContent = params[0].name + "<br/>";

    //     params.forEach((param) => {
    //       tooltipContent +=
    //         param.marker +
    //         param.seriesName +
    //         ": " +
    //         param.value +
    //         "%" +
    //         "<br/>";
    //     });

    //     return tooltipContent;
    //   },
    // },
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
      
        interval: Math.floor(XAxis.length / 9),
        textStyle: {    
          fontSize: 10, 
         margin:20,
        },
      },
    },
    yAxis: 
      {
        type: "value",
  
        interval: 2.5,
        name: "Rate (%)",
        nameGap: 50,
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
      bottom: "25%",
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
      top: "10",
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
        "Average (excl. APL)",
        "10 Year NZ Government Bond Yield",
      ],

      textStyle: {
        fontSize: 11,
      },

      left: "-10",
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
        data: APL,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "ARG",
        data: ARG,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "GMT",
        data: GMT,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "IPL",
        data: IPL,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "KPG",
        data: KPG,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "PCT",
        data: PCT,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "PFI",
        data: PFI,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "SPG",
        data: SPG,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "VHP",
        data: VHP,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "Average (excl. APL)",
        data: averageExc,
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
      },
      {
        name: "10 Year NZ Government Bond Yield",
        data: tenNz,
        type: "line",
        symbol: "none",
        stack: "Total",
        yAxisIndex: 0,
        areaStyle: {},
        color: "#a9a9a9",
        emphasis: {
          focus: "series",
        },
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

export default Marrketcaprate;
