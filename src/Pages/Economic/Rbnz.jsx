import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";


const Rbnz = (props) => {
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
  const [data11, setData11] = useState([]);
  const [data12, setData12] = useState([]);
  const [data13, setData13] = useState([]);
  const [data14, setData14] = useState([]);
  const [data15, setData15] = useState([]);
  const [data16, setData16] = useState([]);
  const [data17, setData17] = useState([]);
  const [data18, setData18] = useState([]);
  const [data19, setData19] = useState([]);
  const [data20, setData20] = useState([]);
  const [data21, setData21] = useState([]);
  const [data22, setData22] = useState([]);
  const [data23, setData23] = useState([]);

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
      (e) => e["Assets - Securities Purchased under Agreements to Resell"]
    );
    const gettingData2 = jsonData.map((e) => e["Assets - Cash Balances"]);

    const gettingData3 = jsonData.map(
      (e) => e["Assets - Crown indemnity for LSAP programme"]
    );
    const gettingData4 = jsonData.map((e) => e["Assets - Derivative Assets"]);
    const gettingData5 = jsonData.map(
      (e) => e["Assets - Investments - Foreign Currency"]
    );
    const gettingData6 = jsonData.map(
      (e) => e["Assets - Investments - New Zealand Government Securities"]
    );
    const gettingData7 = jsonData.map((e) => e["Assets - Other Assets"]);
    const gettingData8 = jsonData.map(
      (e) => e["Assets - Other Financial Assets"]
    );
    const gettingData9 = jsonData.map(
      (e) => e["Assets - Securities - LSAP Programme"]
    );
    const gettingData10 = jsonData.map((e) => e["Assets - Total Assets"]);
    const gettingData11 = jsonData.map(
      (e) => e["Assets Memo Item - New Zealand Government Securities"]
    );
    const gettingData12 = jsonData.map(
      (e) => e["Liabilities - Crown Indemnity for LSAP Programme"]
    );
    const gettingData13 = jsonData.map(
      (e) => e["Liabilities - Currency in Circulation"]
    );
    const gettingData14 = jsonData.map((e) => e["Liabilities - Deposits"]);
    const gettingData15 = jsonData.map(
      (e) => e["Liabilities - Derivative Liabilities"]
    );
    const gettingData16 = jsonData.map(
      (e) => e["Liabilities - Other Financial Liabilities"]
    );
    const gettingData17 = jsonData.map(
      (e) => e["Liabilities - Other Liabilities"]
    );
    const gettingData18 = jsonData.map(
      (e) => e["Liabilities - Reserve Bank Bills"]
    );
    const gettingData19 = jsonData.map(
      (e) => e["Liabilities - Securities Sold under Agreements to Repurchase"]
    );
    const gettingData20 = jsonData.map(
      (e) => e["Liabilities - Term Liabilities"]
    );
    const gettingData21 = jsonData.map(
      (e) => e["Liabilities - Total Liabilities"]
    );
    const gettingData22 = jsonData.map((e) => e["Net Assets/Equity"]);
    const gettingData23 = jsonData.map(
      (e) => e["Total Liabilities and Net Assets/Equity"]
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
    setData11(applyTwoZeroes(gettingData11));
    setData12(applyTwoZeroes(gettingData12));
    setData13(applyTwoZeroes(gettingData13));
    setData14(applyTwoZeroes(gettingData14));
    setData15(applyTwoZeroes(gettingData15));
    setData16(applyTwoZeroes(gettingData16));
    setData17(applyTwoZeroes(gettingData17));
    setData18(applyTwoZeroes(gettingData18));
    setData19(applyTwoZeroes(gettingData19));
    setData20(applyTwoZeroes(gettingData20));
    setData21(applyTwoZeroes(gettingData21));
    setData22(applyTwoZeroes(gettingData22));
    setData23(applyTwoZeroes(gettingData23));
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
      interval: 20000,
      name: "RBNZ Balance ($M)",
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
      top: "30%",
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
        "Assets - Securities Purchased under Agreements to Resell",
        "Assets - Cash Balances",
        "Assets - Crown indemnity for LSAP programme",
        "Assets - Derivative Assets",
        "Assets - Investments - Foreign Currency",
        "Assets - Investments - New Zealand Government Securities",
        "Assets - Other Assets",
        "Assets - Other Financial Assets",
        "Assets - Securities - LSAP Programme",
        "Assets - Total Assets",
        "Assets Memo Item - New Zealand Government Securities",
        "Liabilities - Crown Indemnity for LSAP Programme",
        "Liabilities - Currency in Circulation",
        "Liabilities - Deposits",
        "Liabilities - Derivative Liabilities",
        "Liabilities - Other Financial Liabilities",
        "Liabilities - Other Liabilities",
        "Liabilities - Reserve Bank Bills",
        "Liabilities - Securities Sold under Agreements to Repurchase",
        "Liabilities - Term Liabilities",
        "Liabilities - Total Liabilities",
        "Net Assets/Equity",
        "Total Liabilities and Net Assets/Equity",
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
        name: "Assets - Securities Purchased under Agreements to Resell",

        data: data1,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Cash Balances",

        data: data2,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Crown indemnity for LSAP programme",

        data: data3,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Derivative Assets",

        data: data4,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Investments - Foreign Currency",

        data: data5,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Investments - New Zealand Government Securities",

        data: data6,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Other Assets",

        data: data7,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Other Financial Assets",

        data: data8,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets - Securities - LSAP Programme",

        data: data9,
        type: "line",
        symbol: "none",
      },

      {
        name: "Assets - Total Assets",

        data: data10,
        type: "line",
        symbol: "none",
      },
      {
        name: "Assets Memo Item - New Zealand Government Securities",

        data: data11,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Crown Indemnity for LSAP Programme",

        data: data12,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Currency in Circulation",

        data: data13,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Deposits",

        data: data14,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Derivative Liabilities",

        data: data15,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Other Financial Liabilities",

        data: data16,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Other Liabilities",

        data: data17,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Reserve Bank Bills",

        data: data18,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Securities Sold under Agreements to Repurchase",

        data: data19,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Term Liabilities",

        data: data20,
        type: "line",
        symbol: "none",
      },
      {
        name: "Liabilities - Total Liabilities",

        data: data21,
        type: "line",
        symbol: "none",
      },
      {
        name: "Net Assets/Equity",

        data: data22,
        type: "line",
        symbol: "none",
      },
      {
        name: "Total Liabilities and Net Assets/Equity",
        data: data23,
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

export default Rbnz;
