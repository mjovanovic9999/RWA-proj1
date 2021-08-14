import "./style.css";
import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faThermometerHalf,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { FetchLiveWeather } from "../fetch";
import { ILiveWeather } from "../interface";
import { Subject } from "rxjs";

export class LiveWeatherCard {
  private precipitationSymbol: string;
  private temperatureSymbol: string;
  private valueContainerDiv: HTMLElement;
  private titleP: HTMLElement;

  constructor(
    host: HTMLElement,
    place: Subject<string>,
    temperatureUnit: Subject<boolean>,
    precipitationUnit: Subject<boolean>
  ) {
    this.InitializeHTML(host);
    this.SubscribePlace(this.titleP, place);
    this.SubscribeTemperature(temperatureUnit);
    this.SubscribePrecipitation(precipitationUnit);
  }

  InitializeHTML(host: HTMLElement) {
    const card = this.DrawCard(host);

    this.titleP = document.createElement("p");
    this.titleP.className = "CardTitle";
    card.append(this.titleP);

    this.valueContainerDiv = document.createElement("div");
    this.valueContainerDiv.className = "ValueContainerDiv";
    card.append(this.valueContainerDiv);
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

  SubscribePlace(titleP: HTMLElement, subject: Subject<string>) {
    subject.subscribe((x) => {
      titleP.innerHTML = x;
      FetchLiveWeather(x)
        .then((x: ILiveWeather[]) => {
          this.CreatePrecipitationDiv(
            this.valueContainerDiv,
            x[0].precipitationProbability.toString()
          );
          this.CreateTemperatureDiv(
            this.valueContainerDiv,
            x[0].temperature.toString()
          );
        })
        .catch(console.log);
    });
  }

  private SubscribeTemperature(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.temperatureSymbol = "°F";
        // (x * 9) / 5 + 32);
      } else {
        this.temperatureSymbol = "°C";
        //(x - 32) * 5) / 9);
      }
    });
  }

  private SubscribePrecipitation(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.precipitationSymbol = "ml";
        //(x) => x * 1000);
      } else {
        this.precipitationSymbol = "mm";
        // x / 1000);
      }
    });
  }
}
