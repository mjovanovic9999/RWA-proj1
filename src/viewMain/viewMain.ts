import "./style.css";
import { RadioButton } from "../radioButton/radioButton";
import { Autocomplete } from "../autocomplete/autocomplete";
import { LiveWeatherCard } from "../liveWeatherCard/liveWeatherCard";
import MyChart from "../myChart/myChart";

export class ViewMain {
  private mainDiv: HTMLElement;

  constructor() {
    this.InitializeHTML();
    this.DrawTitle();
    const radio = new RadioButton(this.mainDiv);
    const autocomplete = new Autocomplete(this.mainDiv);
    new LiveWeatherCard(
      this.mainDiv,
      autocomplete.PlaceSubject,
      radio.TemperatureSubject,
      radio.PrecipitationSubject
    );

    new MyChart(
      this.mainDiv,
      autocomplete.PlaceSubject,
      radio.TemperatureSubject,
      radio.PrecipitationSubject
    );
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
  }
}
