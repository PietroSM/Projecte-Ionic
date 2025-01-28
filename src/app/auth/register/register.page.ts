import { ChangeDetectorRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ToastController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem, IonInput, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, NavController } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';
import { ValueEqualsDirective } from 'src/app/shared/directives/value-equals.directive';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonImg, IonButton, IonLabel, IonIcon, IonInput, 
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValueEqualsDirective,
    RouterLink,
  ],
})
export class RegisterPage {

  newUser : User = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    lng: 0,
    lat: 0
  };

  email2 = '';

  #authService = inject(AuthService);
  #nav = inject(NavController)
  #changeDetector = inject(ChangeDetectorRef);
  #toastCtrl = inject(ToastController);

  constructor() {
    this.getLocation();
  }

  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

      this.newUser.lat = coordinates.coords.latitude;
      this.newUser.lng = coordinates.coords.longitude;
  }


  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newUser.avatar = photo.dataUrl as string;
    this.#changeDetector.markForCheck();
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newUser.avatar = photo.dataUrl as string;
    this.#changeDetector.markForCheck();
  }


  addUser(){
    this.#authService.register(this.newUser)
      .subscribe(
        async () => {
          (await this.#toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: 'User registered!'
          })).present();
          this.#nav.navigateRoot(['/auth/login']);
        }
      )
  }

}



