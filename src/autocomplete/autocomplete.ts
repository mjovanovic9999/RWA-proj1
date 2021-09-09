import "./style.css";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  skip,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from "rxjs";
import { FetchLocations } from "../fetch";

export class Autocomplete {
  private searchBox: HTMLInputElement;
  private hasSelectedValue = false;
  private sugestionsList: HTMLElement;
  private currentText: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );
  private placeSubject: Subject<string> = new Subject<string>();
  public get PlaceSubject(): Subject<string> {
    return this.placeSubject;
  }

  private subscription: Subscription;

  constructor(host: HTMLElement) {
    this.InitializeHTML(host);
    this.SubscribeAutocomplete();
    this.SubscribeSelect();
    this.StartOutClickUnfocus();
    this.StartNextValueFocus();
  }

  InitializeHTML(host: HTMLElement) {
    const elementParent = document.createElement("div");
    elementParent.className = "AutocompleteParent";
    host.appendChild(elementParent);

    this.searchBox = document.createElement("input");
    this.searchBox.className = "Autocomplete";
    this.searchBox.setAttribute("type", "text");
    this.searchBox.setAttribute("placeholder", "Place");
    elementParent.appendChild(this.searchBox);

    this.sugestionsList = document.createElement("ul");
    this.sugestionsList.className = "AutocompleteListResult";
    elementParent.appendChild(this.sugestionsList);
  }

  SubscribeAutocomplete() {
    this.subscription = fromEvent(this.searchBox, "input")
      .pipe(map((e: Event) => (<HTMLInputElement>e.target).value))
      .subscribe(this.currentText);

    this.currentText.pipe(debounceTime(300)).subscribe(() => {
      this.RemoveSugestions();
    });

    this.subscription.add(
      this.currentText
        .pipe(this.AutocompleteFetchOperator)
        .subscribe((data: string[]) => {
          this.hasSelectedValue = false;
          data.map((user) => {
            let newResult = document.createElement("li");
            newResult.className = "AutocompleteOneResult";
            newResult.textContent = user;
            this.sugestionsList.appendChild(newResult);
            newResult.tabIndex = 1;
          });
        })
    );
  }

  AutocompleteFetchOperator(ob$: Observable<string>): Observable<string[]> {
    return ob$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) =>
        from(FetchLocations(value)).pipe(takeUntil(ob$.pipe(skip(1))))
      ),
      filter((x) => x.length !== 0)
    );
  }

  SubscribeSelect() {
    fromEvent(this.sugestionsList, "mousedown")
      .pipe(map((e: Event) => (<HTMLElement>e.target).textContent))
      .subscribe((x: string) => {
        this.RemoveSugestions();
        this.searchBox.value = x;
        this.hasSelectedValue = true;
        this.placeSubject.next(this.searchBox.value);
      });

    fromEvent(this.sugestionsList, "keydown")
      .pipe(filter((e: KeyboardEvent) => e.code === "Enter"))
      .subscribe(() => {
        console.log(document.activeElement.textContent);

        this.searchBox.value = document.activeElement.textContent;
        this.hasSelectedValue = true;
        this.RemoveSugestions();
        this.placeSubject.next(this.searchBox.value);
      });
  }

  RemoveSugestions() {
    while (this.sugestionsList.firstChild) {
      this.sugestionsList.removeChild(this.sugestionsList.firstChild);
    }
  }

  StartOutClickUnfocus() {
    this.StopClickPropagation(this.sugestionsList);
    this.StopClickPropagation(this.searchBox);
    fromEvent(document, "click").subscribe(() => {
      this.RemoveSugestions();
      if (!this.hasSelectedValue) this.searchBox.value = "";
    });
  }

  StopClickPropagation(host: HTMLElement) {
    fromEvent(host, "click").subscribe((e: Event) => {
      e.stopImmediatePropagation();
    });
  }

  StartNextValueFocus() {
    fromEvent(document, "keydown")
      .pipe(
        filter(
          (e: KeyboardEvent) =>
            this.sugestionsList.children.length !== 0 &&
            (e.code === "ArrowUp" || e.code === "ArrowDown")
        ),
        map((x: KeyboardEvent) => (x.code === "ArrowUp" ? -1 : 1))
      )
      .subscribe((value: number) => this.HandleNextFocusValue(value));
  }

  HandleNextFocusValue(value: number) {
    let focusedIndex: number = Array.from(
      this.sugestionsList.children
    ).findIndex((el) => el === document.activeElement);
    focusedIndex =
      focusedIndex === -1 ? (value === 1 ? 0 : -1) : focusedIndex + value;
    focusedIndex =
      focusedIndex === -1
        ? this.sugestionsList.childElementCount - 1
        : focusedIndex === this.sugestionsList.childElementCount
        ? 0
        : focusedIndex;

    (<HTMLElement>this.sugestionsList.children.item(focusedIndex)).focus();
  }
}
