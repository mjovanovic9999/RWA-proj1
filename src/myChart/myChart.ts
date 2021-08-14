import './style.css'


import * as Chart from "chart.js";

//import { Chart,LinearScale  } from "chart.js";

interface IChartInfo {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      tension: number;
      yAxisID: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      tension: number;
      yAxisID: string;
    }
  ];
}
export default class MyChart {
  private canvas: HTMLCanvasElement;
  private chartInstance: any; //Chart
  //private labels: string[];
  private pointsLeft: number[];
  private pointsRight: number[];

  constructor(
    host: HTMLElement,
    //labels: string[],
    pointsLeft: number[],
    pointsRight: number[]
  ) {
    //this.labels = labels;
    this.pointsLeft = pointsLeft;
    this.pointsRight = pointsRight;

    const canvasParentDiv: HTMLElement = document.createElement("div");
    canvasParentDiv.className = "Canvas";

    host.appendChild(canvasParentDiv);

    this.canvas = document.createElement("canvas");
    canvasParentDiv.appendChild(this.canvas);
    this.draw();
  }

  private draw(): void {
    const pom: Chart.ChartConfiguration = {
      type: "bar",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        datasets: [
          {
            data: this.pointsLeft,
            label: "Temperature",
            fill: false,
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            lineTension: 0.1,
            yAxisID: "y1",
            type: "line",
          },
          {
            label: "Precipitation",
            data: this.pointsRight,

            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
            lineTension: 0.1,
            yAxisID: "y2",
            type: "bar",
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart - Multi Axis",
          },
        },
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: { drawOnChartArea: false },
              display: true,
              id: "y1",
              type: "linear",
              position: "left",
              scaleLabel: { display: true, labelString: "Temperature" },
              ticks: {
                beginAtZero: true,
              },
            },
            {
              stacked: false,
              display: true,
              id: "y2",
              type: "linear",
              position: "right",
              scaleLabel: { display: true, labelString: "Precipitation" },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Day",
              },
            },
          ],
        },

        tooltips: {
          intersect: true,
          mode: "nearest",
        },
      },
    };

    this.chartInstance = new Chart(this.canvas, pom);
    //btn
    //   let btn = document.createElement("button");
    //   document.body.appendChild(btn);
    //   btn.onclick = () => {
    //       actions[0].handler(myChart);
    //   };
    //   btn.innerHTML = "dugme";

    return;
  }

  addPointLeft(newPoint: number): void {
    //test
    const data = this.chartInstance.data;
    if (data.datasets.length > 0) {
      data.labels = [...data.labels, "jukuku"];

      data.datasets[0].data.push(newPoint);
      this.chartInstance.update();
    }
  }
  addPointRight(newPoint: number): void {
    //test
    const data = this.chartInstance.data;
    if (data.datasets.length > 0) {
      data.labels = [...data.labels, "jukuku"];

      data.datasets[1].data.push(newPoint);
      this.chartInstance.update();
    }
  }
}
