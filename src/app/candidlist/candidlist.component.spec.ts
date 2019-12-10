import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidlistComponent } from './candidlist.component';

describe('CandidlistComponent', () => {
  let component: CandidlistComponent;
  let fixture: ComponentFixture<CandidlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidlistComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
