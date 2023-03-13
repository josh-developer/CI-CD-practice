import { Component } from "@angular/core";
import { WeekChartComponent } from "./week-chart/week-chart.component";
import { TodosChartComponent } from "./todos-chart/todos-chart.component";

@Component({
  selector: "analytics",
  template: `
    <todos-chart></todos-chart>
    <hr />
    <week-chart> </week-chart>
  `,
  standalone: true,
  imports: [TodosChartComponent, WeekChartComponent],
})
export class AnalyticsComponent {
  constructor() {}
}
