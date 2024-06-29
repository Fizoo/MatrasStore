import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {MainComponent} from "./components/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MatrassStore';
}
