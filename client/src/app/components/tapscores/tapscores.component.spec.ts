/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TapscoresComponent } from './tapscores.component';

describe('TapscoresComponent', () => {
  let component: TapscoresComponent;
  let fixture: ComponentFixture<TapscoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapscoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
