import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictureModalComponent } from './edit-picture-modal.component';

describe('EditPictureModalComponent', () => {
  let component: EditPictureModalComponent;
  let fixture: ComponentFixture<EditPictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPictureModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
