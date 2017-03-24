import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialchamberComponent } from './burialchamber.component';

describe('BurialchamberComponent', () => {
  let component: BurialchamberComponent;
  let fixture: ComponentFixture<BurialchamberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurialchamberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialchamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
