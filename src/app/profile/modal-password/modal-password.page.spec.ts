import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPasswordPage } from './modal-password.page';

describe('ModalPasswordPage', () => {
  let component: ModalPasswordPage;
  let fixture: ComponentFixture<ModalPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
