import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ButtonHelperDirective } from '../../directives/button-helper.directive';
import { FontHelperDirective } from '../../directives/font-helper.directive';
import { CreatePictureComponent } from './create-picture/create-picture.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'metavision-pictures',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    ButtonHelperDirective,
    FontHelperDirective,
    CreatePictureComponent,
  ],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.css',
})
export class PicturesComponent {
  constructor() {}
}
