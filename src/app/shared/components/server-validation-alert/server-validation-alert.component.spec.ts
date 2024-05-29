import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerValidationAlertComponent } from './server-validation-alert.component';

describe('ServerValidationAlertComponent', () => {
  let component: ServerValidationAlertComponent;
  let fixture: ComponentFixture<ServerValidationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerValidationAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerValidationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
