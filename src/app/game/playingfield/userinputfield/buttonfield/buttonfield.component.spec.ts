import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonfieldComponent } from './buttonfield.component';

describe('ButtonfieldComponent', () => {
  let component: ButtonfieldComponent;
  let fixture: ComponentFixture<ButtonfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
