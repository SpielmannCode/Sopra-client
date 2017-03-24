import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinputfieldComponent } from './userinputfield.component';

describe('UserinputfieldComponent', () => {
  let component: UserinputfieldComponent;
  let fixture: ComponentFixture<UserinputfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinputfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinputfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
