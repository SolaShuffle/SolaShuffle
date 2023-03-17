import React, { ReactNode, useEffect, useMemo, useState } from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";

HighchartsMore(Highcharts);

const SimpleChart = (props: { color?: string, title: ReactNode, data: [] }) => {

  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
      backgroundColor: "transparent",
      height: 100,
      className: "mt-10"
    },
    legend: {
      enabled: false
    },
    title: {
      floating: false,
      text: ""
    },
    subTitle: {
      floating: false,
      text: ""
    },
    credits: {
      enabled: false
    },
    caption: {
      floating: false,
      text: ""
    },
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    tooltip: {
      useHTML: true,
      className: "high-chart-tooltip",
      backgroundColor: "#0a0221",
      borderColor: "#1e153c",
      xDateFormat: "%A, %b %e",
      formatter: function (): any {
        const header = `
        <div class="text-white text-[14px] font-semibold">
          ${(this as any).y} h
        </div>`
        return header
      }
    },
    series: [
      {
        type: "spline",
        data: props.data,
        color: props.color,

        lineWidth: 6,
        marker: {
          fillColor: "transparent",
          lineColor: "transparent",
          lineWidth: 2,
          fillOpacity: 0.8,
          states: {
            hover: {
              fillColor: "#fff",
              lineWidthPlus: 2,
              lineColor: "#fff"
            }
          }
        },
        minSize: 0,
        maxSize: 30,
        className: "h-25"
      }
    ]
  };

  return (
    <div className="bg-[#201F48] mt-4 rounded-2xl relative">
      {props.title}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default SimpleChart;
