import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/shared/interfaces/appState";
import { ITodo } from "src/app/shared/interfaces/todo";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: "todo-lists",
  templateUrl: "./todo-lists.component.html",
  styleUrls: ["./todo-lists.component.scss"],
  standalone: true,
  imports: [MatExpansionModule, NgIf, NgFor, TodoItemComponent, AsyncPipe],
})
export class TodoListsComponent implements OnInit {
  todos!: Observable<ITodo[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos = this.store.pipe(select((state) => state.todos));
  }
}
