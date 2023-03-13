import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "todo-lists-header",
  templateUrl: "./todo-lists-header.component.html",
  styleUrls: ["./todo-lists-header.component.scss"],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    RouterLinkActive,
    MatIconModule,
  ],
})
export class TodoListsHeaderComponent {
  constructor() {}
}
