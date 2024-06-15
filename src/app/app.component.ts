import { Component } from '@angular/core';
import { NavbarComponent } from "./Task/navbar/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [NavbarComponent]
})
export class AppComponent {
  title = 'taks-manager';
}
