import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelListaComponent } from './tabel-lista.component';

describe('TabelListaComponent', () => {
  let component: TabelListaComponent;
  let fixture: ComponentFixture<TabelListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
