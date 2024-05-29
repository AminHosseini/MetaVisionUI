import { Component, Input } from '@angular/core';

@Component({
  selector: 'metavision-server-validation-alert',
  standalone: true,
  imports: [],
  templateUrl: './server-validation-alert.component.html',
  styleUrl: './server-validation-alert.component.css',
})
export class ServerValidationAlertComponent {
  @Input() errors: string[] = [];
}
