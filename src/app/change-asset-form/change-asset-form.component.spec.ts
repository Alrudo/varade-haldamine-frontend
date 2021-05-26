import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAssetFormComponent } from './change-asset-form.component';

describe('ChangeAssetFormComponent', () => {
  let component: ChangeAssetFormComponent;
  let fixture: ComponentFixture<ChangeAssetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeAssetFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAssetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
