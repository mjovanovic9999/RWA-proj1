export interface ILiveWeather {
  id: number;
  location: string;
  temperature: number;
  precipitationProbability: number;
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

export interface Settings{
  isCelsius: boolean;
  isMm: boolean;
}

// export interface IChartInfo {//vrv ne trabe
//   labels: string[];
//   datasets: [
//     {
//       label: string;
//       data: number[];
//       backgroundColor: string[];
//       borderColor: string[];
//       borderWidth: number;
//       tension: number;
//       yAxisID: string;
//     },
//     {
//       label: string;
//       data: number[];
//       backgroundColor: string[];
//       borderColor: string[];
//       borderWidth: number;
//       tension: number;
//       yAxisID: string;
//     }
//   ];
// }