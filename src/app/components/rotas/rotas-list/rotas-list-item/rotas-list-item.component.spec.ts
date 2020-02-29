import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasListItemComponent } from './rotas-list-item.component';

describe('RotasListItemComponent', () => {
  let component: RotasListItemComponent;
  let fixture: ComponentFixture<RotasListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotasListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotasListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
