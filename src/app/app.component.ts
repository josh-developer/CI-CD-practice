import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "./shared/interfaces/appState";
import { TODOS_LOCAL_NAME } from "./todos/todo-store/todo.reducers";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertService } from "./shared/alert/alert.service";
import { RouterOutlet } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import {
  Chart,
  ArcElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  CategoryScale,
} from "chart.js";

Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@UntilDestroy()
@Component({
  selector: "app-root",
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [RouterOutlet, SharedModule],
})
export class AppComponent implements OnInit {
  progress = 0;

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select((state) => state.todos),
        untilDestroyed(this)
      )
      .subscribe((todos) => {
        localStorage.removeItem(TODOS_LOCAL_NAME);
        localStorage.setItem(TODOS_LOCAL_NAME, JSON.stringify(todos));
      });

    this.alertService.alerts.pipe(untilDestroyed(this)).subscribe((alert) => {
      this.openSnackBar(alert.msg, alert.type || "success");
    });
  }

  openSnackBar(msg: string, type: "success" | "error" | "info"): void {
    this._snackBar.open(msg, "Okay", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "alert-" + type,
    });
  }

  holdHandler(e: number) {
    this.progress = e / 10;
  }
}
