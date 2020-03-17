import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCitiesComponent } from './favorite-cities.component';

describe('FavoriteCitiesComponent', () => {
  let component: FavoriteCitiesComponent;
  let fixture: ComponentFixture<FavoriteCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
