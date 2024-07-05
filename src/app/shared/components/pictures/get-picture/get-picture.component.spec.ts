import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPictureComponent } from './get-picture.component';

describe('GetPictureComponent', () => {
  let component: GetPictureComponent;
  let fixture: ComponentFixture<GetPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
