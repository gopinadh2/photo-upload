import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSideBarComponent } from './bottom-side-bar.component';

describe('BottomSideBarComponent', () => {
  let component: BottomSideBarComponent;
  let fixture: ComponentFixture<BottomSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
