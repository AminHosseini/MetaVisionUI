import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePictureComponent } from './create-picture.component';

describe('CreatePictureComponent', () => {
  let component: CreatePictureComponent;
  let fixture: ComponentFixture<CreatePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
