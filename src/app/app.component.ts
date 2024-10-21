import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCalComponent } from './component/user-cal/user-cal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserCalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sci-Calculator';
}
