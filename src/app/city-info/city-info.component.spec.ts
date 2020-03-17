import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityInfoComponent } from './city-info.component';

describe('CityInfoComponent', () => {
  let component: CityInfoComponent;
  let fixture: ComponentFixture<CityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
