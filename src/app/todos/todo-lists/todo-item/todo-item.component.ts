import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UntilDestroy } from "@ngneat/until-destroy";
import { Store } from "@ngrx/store";
import { ITodo } from "src/app/shared/interfaces/todo";
import { editTodo, removeTodo } from "src/app/todos/todo-store/todo.actions";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgClass, DatePipe } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

@UntilDestroy()
@Component({
  selector: "todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
  standalone: true,
  imports: [
    MatExpansionModule,
    NgClass,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    DatePipe,
  ],
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @Input() index!: number;

  @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<HTMLElement>;

  constructor(private store: Store, public dialog: MatDialog) {}

  deleteTodo(): void {
    this.dialog
      .open(this.dialogTemplate, {
        width: "350px",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.store.dispatch(
            removeTodo({ index: this.index, todo: this.todo })
          );
      });
  }

  completeBtn(): void {
    const newTodo = JSON.parse(JSON.stringify(this.todo)) || {};
    newTodo.completed = !newTodo?.completed;
    this.store.dispatch(editTodo({ index: this.index, todo: newTodo }));
  }
}
