import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNamePage } from './modal-name.page';

describe('ModalNamePage', () => {
  let component: ModalNamePage;
  let fixture: ComponentFixture<ModalNamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
