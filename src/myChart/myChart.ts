import "./style.css";

import * as Chart from "chart.js";
import { Subject } from "rxjs";
import { FetchMonthPrecipitations, FetchMonthTemperatures } from "../fetch";

//import { Chart,LinearScale  } from "chart.js";

export default class MyChart {
  private canvas: HTMLCanvasElement;
  private canvasParentDiv: HTMLElement;
  private chartInstance: any; //Chart
  //private labels: string[];
  private pointsLeft: number[];
  private pointsRight: number[];
  private leftUnit = "°C";
  private rightUnit = "mm";

  constructor(
    host: HTMLElement,
    place: Subject<string>,
    temperatureUnit: Subject<boolean>,
    precipitationUnit: Subject<boolean>
  ) {

    this.SubscribePlace(place);

    this.canvasParentDiv = document.createElement("div");
    this.canvasParentDiv.className = "Canvas";

    host.appendChild(this.canvasParentDiv);

    this.AppendCanvas();
    this.draw();

    this.SubscribeTemperature(temperatureUnit);
    this.SubscribePrecipitation(precipitationUnit);
  }

  private draw(): void {
    if (this.chartInstance) {
      delete this.chartInstance;
      this.chartInstance = null;

      this.canvasParentDiv.removeChild(this.canvas);
      this.AppendCanvas();
    }

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
        title: {
          display: true,
          text: "August",
          fontSize: 20,
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
              scaleLabel: { display: true, labelString: this.leftUnit },
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
              scaleLabel: { display: true, labelString: this.rightUnit },
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

  private AppendCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvasParentDiv.appendChild(this.canvas);
  }

  private SubscribeTemperature(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.leftUnit = "°F";
        this.pointsLeft = this.pointsLeft.map((x) => (x * 9) / 5 + 32);
      } else {
        this.leftUnit = "°C";
        this.pointsLeft = this.pointsLeft.map((x) => ((x - 32) * 5) / 9);
      }
      this.draw();
    });
  }

  private SubscribePrecipitation(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.rightUnit = "ml";
        this.pointsRight = this.pointsRight.map((x) => x * 1000);
      } else {
        this.rightUnit = "mm";
        this.pointsRight = this.pointsRight.map((x) => x / 1000);
      }
      this.draw();
    });
  }

  private SubscribePlace(subject: Subject<string>) {
    subject.subscribe((x) => {
      Promise.all([
        FetchMonthTemperatures(x, 8),
        FetchMonthPrecipitations(x, 8),
      ]).then((x: number[][]) => {
        this.pointsLeft = x[0];
        this.pointsRight = x[1];
        this.draw();
      });
    });
  }
}
