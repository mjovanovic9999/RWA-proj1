import "./style.css";
import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faThermometerHalf,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { FetchLiveWeather } from "../fetch";
import { ILiveWeather } from "../interface";
import {
  combineLatest,
  filter,
  interval,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  Subject,
  takeUntil,
  zip,
} from "rxjs";

export class LiveWeatherCard {
  private temperature: string;
  private precipitation: string;
  private precipitationSymbol: string = "mm";
  private temperatureSymbol: string = "°C";
  private valueContainerDiv: HTMLElement;
  private titleP: HTMLElement;
  private temperatureValueDiv: HTMLElement;
  private precipitationValueDiv: HTMLElement;
  private stopMeasuringSubject: Subject<number> = new Subject();

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

  CreateTemperatureDiv(value: string) {
    const temperatureDiv = document.createElement("div");
    temperatureDiv.className = "CreateDiv";

    const temperatureIconDiv = document.createElement("div");
    this.AppendIcon(temperatureIconDiv, faThermometerHalf, "TemperatureIcon");

    this.temperatureValueDiv = document.createElement("div");
    this.TemperatureDivInnerHTML(value);

    temperatureDiv.append(temperatureIconDiv, this.temperatureValueDiv);
    this.valueContainerDiv.append(temperatureDiv);
  }

  CreatePrecipitationDiv(value: string) {
    const precipitationDiv = document.createElement("div");
    precipitationDiv.className = "CreateDiv";

    const precipitationIconDiv = document.createElement("div");
    this.AppendIcon(precipitationIconDiv, faCloudRain, "PrecipitationIcon");

    this.precipitationValueDiv = document.createElement("div");
    this.PrecipitationDivInnerHTML(value);

    precipitationDiv.append(precipitationIconDiv, this.precipitationValueDiv);
    this.valueContainerDiv.append(precipitationDiv);
  }

  SubscribePlace(titleP: HTMLElement, subject: Subject<string>) {
    subject.subscribe((x) => {
      titleP.innerHTML = x;
      FetchLiveWeather(x)
        .then((x: ILiveWeather[]) => {
          while (this.valueContainerDiv.firstChild) {
            this.valueContainerDiv.removeChild(
              this.valueContainerDiv.firstChild
            );
          }
          this.CreateTemperatureDiv(
            this.temperatureSymbol === "°C"
              ? x[0].temperature.toString()
              : ((x[0].temperature * 9) / 5 + 32).toString()
          );
          this.CreatePrecipitationDiv(
            this.precipitationSymbol === "mm"
              ? x[0].precipitation.toString()
              : (x[0].precipitation * 1000).toString()
          );
          this.stopMeasuringSubject.next(0);
          this.UpdateLiveWeather(
            this.MeasureTemperature(),
            this.MeasurePrecipitation()
          );
        })
        .catch(console.log);
    });
  }

  private SubscribeTemperature(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.temperatureSymbol = "°F";
        this.TemperatureDivInnerHTML(
          ((Number(this.temperature) * 9) / 5 + 32).toFixed(3)
        );
      } else {
        this.temperatureSymbol = "°C";
        this.TemperatureDivInnerHTML(
          (((Number(this.temperature) - 32) * 5) / 9).toFixed(3)
        );
      }
      this.stopMeasuringSubject.next(0);
      this.UpdateLiveWeather(
        this.MeasureTemperature(),
        this.MeasurePrecipitation()
      );
    });
  }

  private SubscribePrecipitation(subject: Subject<boolean>) {
    subject.subscribe((x) => {
      if (x === false) {
        this.precipitationSymbol = "ml";
        this.PrecipitationDivInnerHTML(
          (Number(this.precipitation) * 1000).toFixed(3)
        );
      } else {
        this.precipitationSymbol = "mm";
        this.PrecipitationDivInnerHTML(
          (Number(this.precipitation) / 1000).toFixed(3)
        );
      }
    });
  }

  private TemperatureDivInnerHTML(value: string) {
    this.temperature = value;
    this.temperatureValueDiv.innerHTML = value + " " + this.temperatureSymbol;
  }

  private PrecipitationDivInnerHTML(value: string) {
    this.precipitation = value;
    this.precipitationValueDiv.innerHTML =
      value + " " + this.precipitationSymbol;
  }

  private MeasureTemperature(): Observable<string> {
    return interval(2000).pipe(
      takeUntil(this.stopMeasuringSubject),
      mergeMap(() =>
        of(Number(this.temperature) + Math.random() / 10 - 0.049999).pipe(
          map((value: number) => value.toFixed(3))
        )
      )
    );
  }

  private MeasurePrecipitation(): Observable<string> {
    return merge(
      interval(3000).pipe(
        takeUntil(this.stopMeasuringSubject),
        mergeMap(() =>
          of(Number(this.precipitation) + Math.random() / 10 - 0.049999).pipe(
            filter((value) => value >= 0),
            map((value: number) => value.toFixed(3))
          )
        )
      ),
      interval(20000).pipe(
        takeUntil(this.stopMeasuringSubject),
        mergeMap(() =>
          of(Number(this.precipitation) + Math.random() / 10 - 0.049999).pipe(
            filter((value) => value >= 0),
            map((value: number) => value.toFixed(3))
          )
        )
      )
    );
  }

  private UpdateLiveWeather(
    temperature: Observable<string>,
    precipitation: Observable<string>
  ) {
    zip(temperature, precipitation).subscribe((values: string[]) => {
      this.TemperatureDivInnerHTML(values[0]);
      this.PrecipitationDivInnerHTML(values[1]);
    });
    // combineLatest([temperature, precipitation]).subscribe(([temp, prec]) => {
    //   console.log([temp, prec]);
    //   this.TemperatureDivInnerHTML(temp);
    //   this.PrecipitationDivInnerHTML(prec);
    // });
  }
}
