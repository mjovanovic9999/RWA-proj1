import { fromEvent, map, Observable, Subject } from "rxjs";
import "./style.css";

export class RadioButton {
  private host: HTMLElement;
  private radioTemperature: HTMLElement;
  private radioPrecipitation: HTMLElement;

  private temperatureSubject: Subject<boolean> = new Subject<boolean>();
  public get TemperatureSubject(): Subject<boolean> {
    return this.temperatureSubject;
  }

  private precipitationSubject: Subject<boolean> = new Subject<boolean>();
  public get PrecipitationSubject(): Subject<boolean> {
    return this.precipitationSubject;
  }

  constructor(host: HTMLElement) {
    this.host = host;
    this.DrawDoubleRadioGroups();
  }

  private DrawDoubleRadioGroups() {
    this.DrawRadio("temp", "Celsius", "Fahrenheit", "DivParentFirst", true);
    this.DrawRadio("preci", "mm", "ml", "DivParentSecond", false);

    this.RadioTemperatureUnitObservable();
    this.RadioPrecipitationUnitObservable();
  }

  private DrawRadio(
    groupName: string,
    firstName: string,
    secondName: string,
    className: string,
    isFirstGroup: boolean
  ) {
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", className);
    this.host.append(parentDiv);

    if (isFirstGroup) {
      this.radioTemperature = parentDiv;
    } else {
      this.radioPrecipitation = parentDiv;
    }

    const firstParent = document.createElement("div");
    firstParent.setAttribute("class", "RadioParent");

    parentDiv.append(firstParent);

    const firstRadio = document.createElement("input");
    firstRadio.setAttribute("type", "radio");
    firstRadio.name = groupName;
    firstRadio.value = "true";
    firstRadio.checked = true;

    const firstLabel = document.createElement("p");
    firstLabel.setAttribute("class", "RadioLabel");
    firstLabel.innerHTML = firstName;

    firstParent.append(firstRadio, firstLabel);

    const secondParent = document.createElement("div");
    secondParent.setAttribute("class", "RadioParent");
    parentDiv.append(secondParent);

    const secondRadio = document.createElement("input");
    secondRadio.setAttribute("type", "radio");
    secondRadio.name = groupName;
    secondRadio.value = "false";

    const secondLabel = document.createElement("p");
    secondLabel.setAttribute("class", "RadioLabel");
    secondLabel.innerHTML = secondName;

    secondParent.append(secondRadio, secondLabel);
  }

  private RadioTemperatureUnitObservable() {
    fromEvent(this.radioTemperature, "change")
      .pipe(map((e: Event) => (e.target as HTMLInputElement).value === "true"))
      .subscribe(this.temperatureSubject);
  }

  private RadioPrecipitationUnitObservable() {
    fromEvent(this.radioPrecipitation, "change")
      .pipe(map((e: Event) => (e.target as HTMLInputElement).value === "true"))
      .subscribe(this.PrecipitationSubject);
  }
}