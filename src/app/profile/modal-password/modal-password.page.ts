import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonItem, IonInput, IonIcon, IonButton, ModalController, IonButtons } from '@ionic/angular/standalone';
import { equalValues } from 'src/app/shared/validator/equals-values.validators';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.page.html',
  styleUrls: ['./modal-password.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    IonButton, IonIcon, IonInput, IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
],
})

export class ModalPasswordPage{

  #modalCtrl = inject(ModalController);
  #fb = inject(NonNullableFormBuilder);
  newPassword = this.#fb.group({
    password: '',
    password2: ''
  },
  {
    validators: equalValues('password', 'password2')
  });


  editPassword(){
    this.#modalCtrl.dismiss({ password: this.newPassword.getRawValue().password });
  }

  close(){
    this.#modalCtrl.dismiss();
  }

}
