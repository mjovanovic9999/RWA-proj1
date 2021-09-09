import { ILiveWeather, IPrecipitation, ITemperature } from "./interface";

const MYURL = "http://localhost:3000";

export function FetchLiveWeather(place: string): Promise<ILiveWeather[]> {
  return fetch(`${MYURL}/stations?location=${place}`)
    .then((response) => {
      if (response.ok) return response.json();
      else console.log(response.status.toString() + " " + response.statusText);
    })
    .catch((err) => console.log(err));
}

export function FetchMonthPrecipitations(
  place: string,
  month: number
): Promise<number[]> {
  return fetch(`${MYURL}/precipitation?location=${place}&month=${month}`)
    .then((response) => {
      if (response.ok) return response.json();
      else console.log(response.status.toString() + " " + response.statusText);
    })
    .then((x) => x.map((val: IPrecipitation) => val.mm))
    .catch((err) => console.log(err));
}

export function FetchMonthTemperatures(
  place: string,
  month: number
): Promise<number[]> {
  return fetch(`${MYURL}/temperature?location=${place}&month=${month}`)
    .then((response) => {
      if (response.ok) return response.json();
      else console.log(response.status.toString() + " " + response.statusText);
    })
    .then((x) =>
      x.map((val: ITemperature) => (val.degreeMax + val.degreeMin) / 2)
    )
    .catch((err) => console.log(err));
}

export function FetchLocations(value: string): Promise<string[]> {
  if (value === "") return Promise.resolve([]);
  const regex = new RegExp(`^${value.toUpperCase()}`);
  return FetchAllLocations().then((value: string[]) =>
    value.filter((x: string) => regex.test(x))
  );
}

export function FetchAllLocations(): Promise<string[]> {
  return fetch(`${MYURL}/locations`)
    .then((response) => {
      if (response.ok) return response.json();
      else console.log(response.status.toString() + " " + response.statusText);
    })
    .catch((err) => console.log(err));
}
