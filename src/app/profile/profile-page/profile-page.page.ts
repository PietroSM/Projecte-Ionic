import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonLabel,
  ModalController, IonItem, IonIcon } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';
import { ModalNamePage } from '../modal-name/modal-name.page';
import { UsersService } from 'src/app/services/users.service';
import { ModalPasswordPage } from '../modal-password/modal-password.page';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, 
    IonLabel,
    IonText,
    IonButton,
    IonCol,
    IonRow,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePagePage {
  user = input.required<User>();
  #modalCtrl = inject(ModalController);
  #userService = inject(UsersService);
  email = signal('');
  name = signal('');

  constructor() {
    effect(() => {
      this.email.set(this.user().email);
      this.name.set(this.user().name);
    });
  }

  async openModalProfile() {
    const modal = await this.#modalCtrl.create({
      component: ModalNamePage,
      componentProps: { user: this.user },
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if(result.data){
      this.#userService
      .saveProfile(result.data.userEdit)
      .subscribe({
        next: () => {
          this.email.set(result.data.userEdit.email);
          this.name.set(result.data.userEdit.name);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  async openModalPassword(){
    const modal = await this.#modalCtrl.create({
       component: ModalPasswordPage,
    });
    await modal.present();
    const result = await modal.onDidDismiss();


    if(result.data){
      this.#userService
      .savePassword(result.data.password)
      .subscribe({
        error: (error) => {
          console.log(error);
        }
      });
    }

  }

  async takePhoto(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 768,
      width: 1024,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    // this.newEvent.get('image')?.setValue(photo.dataUrl as string);
    // this.#changeDetector.markForCheck();
  }

  async pickFromGallery(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    // this.newEvent.get('image')?.setValue(photo.dataUrl as string);
    // this.#changeDetector.markForCheck();
  
  }

}
