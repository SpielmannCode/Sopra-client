import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SledComponent } from './sled.component';

describe('SledComponent', () => {
  let component: SledComponent;
  let fixture: ComponentFixture<SledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
