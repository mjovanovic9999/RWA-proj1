// import { filter, from, map, of } from "../node_modules/rxjs/dist/types/index";
import {
  filter,
  from,
  fromEvent,
  interval,
  Observable,
  take,
  takeUntil,
} from "rxjs";
import { Autocomplete } from "./autocomplete/autocomplete";
import {
  FetchAllLocations,
  FetchLiveWeather,
  FetchLocations,
  FetchMonthPrecipitations,
  FetchMonthTemperatures,
} from "./fetch";
import MyChart from "./myChart/myChart";
import "./style.css";
import { ViewMain } from "./viewMain/viewMain";

// const chart = new MyChart(
//   document.body,
//   FetchMonthTemperatures("Pirot",8),
//   FetchMonthPrecipitations("Pirot",8)
// );

new ViewMain();

//const searchBox=new Autocomplete(document.body);
