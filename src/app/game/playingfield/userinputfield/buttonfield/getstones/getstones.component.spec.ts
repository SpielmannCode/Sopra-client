import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetstonesComponent } from './getstones.component';

describe('GetstonesComponent', () => {
  let component: GetstonesComponent;
  let fixture: ComponentFixture<GetstonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetstonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetstonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
