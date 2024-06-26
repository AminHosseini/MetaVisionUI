import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductCategoryComponent } from './create-product-category.component';

describe('CreateProductCategoryComponent', () => {
  let component: CreateProductCategoryComponent;
  let fixture: ComponentFixture<CreateProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
