import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonList, IonItem, IonInput, IonIcon, IonLabel, IonButton, IonImg, IonCol, IonRow, IonGrid, ModalController, IonButtons } from '@ionic/angular/standalone';
import { User, UserProfileEdit } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-name',
  templateUrl: './modal-name.page.html',
  styleUrls: ['./modal-name.page.scss'],
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
export class ModalNamePage {
  user = input.required<User>();
  #modalCtrl = inject(ModalController);
  #userService = inject(UsersService);


  #fb = inject(NonNullableFormBuilder);
  newEdit = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      this.newEdit.get('email')?.setValue(this.user().email);
      this.newEdit.get('name')?.setValue(this.user().name);
      console.log(this.user());
    });
  }

  editNameEmail() {
    const userEdit : UserProfileEdit = {
      name: this.newEdit.getRawValue().name,
      email: this.newEdit.getRawValue().email
    };

    this.#modalCtrl.dismiss({ userEdit: userEdit});
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
