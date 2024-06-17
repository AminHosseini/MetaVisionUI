import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductCategoriesComponent } from './get-product-categories.component';

describe('GetProductCategoriesComponent', () => {
  let component: GetProductCategoriesComponent;
  let fixture: ComponentFixture<GetProductCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetProductCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
