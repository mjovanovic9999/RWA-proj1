import { fromEvent } from "rxjs";
import "./style.css";
//celsius u farenhait x*9/5 +32
//mm u 1000* ml
//fahrenheit
export class RadioButton {
  private isCelsius = true;
  private isMm = true;
  private host: HTMLElement;
  private radioTemperature: HTMLElement;
  private radioFahrenheit: HTMLElement;

  constructor(host: HTMLElement) {
    this.host = host;
    this.isCelsius = true;
    this.DrawDoubleRadioGroups();
    this.RadioTemperatureUnitObservable();
  }

  private DrawDoubleRadioGroups() {
    this.isMm = true;
    this.DrawRadio("temp", "Celsius", "Fahrenheit", "DivParentFirst", true);
    this.DrawRadio("preci", "mm", "ml", "DivParentSecond", false);
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
      this.radioFahrenheit = parentDiv;
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
    // firstParent.append(firstRadio);

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
    // secondParent.append(secondRadio);
  }

  RadioTemperatureUnitObservable() {
    fromEvent(this.radioTemperature, "change").subscribe(console.log);
  }

  RadioFahrenheitUnitObservable() {
    fromEvent(this.radioTemperature, "change").subscribe(console.log);
  }
}
