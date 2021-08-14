import "./style.css";
import { RadioButton } from "../radioButton/radioButton";
import { Autocomplete } from "../autocomplete/autocomplete";
import { LiveWeatherCard } from "../liveWeatherCard/liveWeatherCard";
import { FetchMonthPrecipitations, FetchMonthTemperatures } from "../fetch";
import MyChart from "../myChart/myChart";

export class ViewMain {
  private mainDiv: HTMLElement; //mozda ne treba da je atribut

  constructor() {
    this.InitializeHTML();
    this.DrawTitle();
    const pom = new RadioButton(this.mainDiv);//ne treba pom
    new Autocomplete(this.mainDiv);
    new LiveWeatherCard(this.mainDiv);

    Promise.all([
      FetchMonthTemperatures("Pirot", 8),
      FetchMonthPrecipitations("Pirot", 8),
    ]).then((x: number[][]) => new MyChart(document.body, x[0], x[1]));
  }

  InitializeHTML() {
    this.mainDiv = document.createElement("div");
    document.body.append(this.mainDiv);
    
    const header = document.createElement("title");
    header.innerHTML = "MyWeather";
    document.head.append(header);
  }

  DrawTitle() {
    const titleDiv = document.createElement("div");
    titleDiv.className = "TitleDiv";
    this.mainDiv.append(titleDiv);

    const title = document.createElement("p");
    title.innerHTML = "Welcome to MyWeather";
    title.className = "Title";
    titleDiv.append(title);

    alert("sta")

  }
}
