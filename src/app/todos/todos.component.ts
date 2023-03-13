import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TodoListsHeaderComponent } from "./todo-lists-header/todo-lists-header.component";

@Component({
  selector: "todos",
  template: `
    <div id="todos-wrapper">
      <todo-lists-header></todo-lists-header>
      <!-- <mat-spinner [diameter]="55" *ngIf="loader"></mat-spinner> -->
      <!-- *ngIf="loader" -->
      <div id="lists-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      @use "../../styles/variables/sizes";

      $spinnerSize: var(--spinnerSize);

      #lists-wrapper {
        padding: 15px 10px;
        overflow: auto;
        height: calc(sizes.$mainContentHeight - sizes.$headerHeight - 30px);
      }
      mat-spinner {
        position: absolute;
        top: calc(50% - 27.5px);
        left: calc(50% - 27.5px);
      }
    `,
  ],
  standalone: true,
  imports: [TodoListsHeaderComponent, RouterOutlet],
})
export class TodosComponent {}
