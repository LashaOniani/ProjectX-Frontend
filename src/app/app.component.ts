import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { MatrixComponent } from "./Components/matrix/matrix.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProjectX';
}
