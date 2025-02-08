import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ToastController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem, IonInput, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, NavController } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { equalValues } from 'src/app/shared/validator/equals-values.validators';


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
    RouterLink,
  ],
})
export class RegisterPage {


  #authService = inject(AuthService);
  #nav = inject(NavController)
  #changeDetector = inject(ChangeDetectorRef);
  #toastCtrl = inject(ToastController);
  #fb = inject(NonNullableFormBuilder);


  newUser = this.#fb.group({
    name: ['', [Validators.required]],
    emailGroup: this.#fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]],
      },
      {
        validators: equalValues('email', 'emailConfirm'),
      }
    ),
    password: ['', [Validators.required, Validators.minLength(4)]],
    image: ['', [Validators.required]],
    lat: [0],
    lng: [0]
  });


  constructor() {
    this.getLocation();
  }


  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

      this.newUser.get('lat')?.setValue(coordinates.coords.latitude);
      this.newUser.get('lng')?.setValue( coordinates.coords.longitude);
  }


  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newUser.get('image')?.setValue(photo.dataUrl as string);
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

    this.newUser.get('image')?.setValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }


  addUser(){
    const newUser : User = {
      name: this.newUser.getRawValue().name,
      email: this.newUser.getRawValue().emailGroup.email,
      password: this.newUser.getRawValue().password,
      avatar: this.newUser.getRawValue().image,
      lat: this.newUser.getRawValue().lat,
      lng: this.newUser.getRawValue().lng
    }


    this.#authService.register(newUser)
      .subscribe({
        next:
          async () => {
            (await this.#toastCtrl.create({
              duration: 3000,
              position: 'bottom',
              message: 'User registered!'
            })).present();
            this.#nav.navigateRoot(['/auth/login']);
        },
        error: async (error) => {
          (
            await this.#toastCtrl.create({
              header: 'Register error',
              message: error.error.message,
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }




}



