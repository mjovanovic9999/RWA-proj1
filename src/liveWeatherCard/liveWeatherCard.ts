import "./style.css";
import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faThermometerHalf,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { FetchLiveWeather } from "../fetch";
import { ILiveWeather } from "../interface";

export class LiveWeatherCard {
  constructor(host: HTMLElement) {
    const card = this.DrawCard(host);

    const title = document.createElement("p");
    title.innerHTML = "Backa Palanka"; //u obj iz obs vrv
    title.className = "CardTitle";
    card.append(title);

    const valueContainerDiv = document.createElement("div");
    valueContainerDiv.className = "ValueContainerDiv";
    card.append(valueContainerDiv);

    FetchLiveWeather("Pirot")
      .then((x: ILiveWeather[]) => {
        console.log(x);
        this.CreatePrecipitationDiv(
          valueContainerDiv,
          x[0].precipitationProbability.toString()
        );
        this.CreateTemperatureDiv(
          valueContainerDiv,
          x[0].temperature.toString()
        );
      })
      .catch(console.log);
  }
  DrawCard(host: HTMLElement): HTMLElement {
    const card = document.createElement("div");
    card.className = "Card";
    host.append(card);
    return card;
  }

  AppendIcon(host: HTMLElement, myIcon: IconDefinition, cssClass: string) {
    const iconElement = icon(myIcon).node[0] as HTMLDivElement;
    iconElement.setAttribute("class", cssClass);
    host.append(iconElement);
  }

  CreateTemperatureDiv(host: HTMLElement, value: string) {
    const temperatureDiv = document.createElement("div");
    temperatureDiv.className = "CreateDiv";

    const temperatureIconDiv = document.createElement("div");
    this.AppendIcon(temperatureIconDiv, faThermometerHalf, "TemperatureIcon");

    const temperatureValueDiv = document.createElement("div");
    temperatureValueDiv.innerHTML = value + "°C";

    temperatureDiv.append(temperatureIconDiv);
    temperatureDiv.append(temperatureValueDiv);
    host.append(temperatureDiv);
  }

  CreatePrecipitationDiv(host: HTMLElement, value: string) {
    const precipitationDiv = document.createElement("div");
    precipitationDiv.className = "CreateDiv";

    const precipitationIconDiv = document.createElement("div");
    this.AppendIcon(precipitationIconDiv, faCloudRain, "PrecipitationIcon");

    const precipitationValueDiv = document.createElement("div");
    precipitationValueDiv.innerHTML = value + "mm";

    // precipitationDiv.append(precipitationIconDiv);
    precipitationDiv.append(precipitationIconDiv, precipitationValueDiv);
    host.append(precipitationDiv);
  }
}
