import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteslistComponent } from './favouriteslist.component';

describe('FavouriteslistComponent', () => {
  let component: FavouriteslistComponent;
  let fixture: ComponentFixture<FavouriteslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
