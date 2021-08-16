export interface ILiveWeather {
  id: number;
  location: string;
  temperature: number;
  precipitation: number;
}

export interface IPrecipitation {
  id: number;
  location: string;
  mm: number;
  day: number;
  month: number;
}

export interface ITemperature {
  id: number;
  location: string;
  degreeMin: number;
  degreeMax: number;
  day: number;
  month: number;
}
