import {
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ToastController,
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
  ModalController, IonItem, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { User, UserPhotoEdit } from 'src/app/interfaces/user';
import { ModalNamePage } from '../modal-name/modal-name.page';
import { UsersService } from 'src/app/services/users.service';
import { ModalPasswordPage } from '../modal-password/modal-password.page';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { OlMapDirective } from 'src/app/shared/directives/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/shared/directives/ol-maps/ol-marker.directive';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonIcon, IonItem,
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
    OlMapDirective,
    OlMapDirective, OlMarkerDirective],
})
export class ProfilePagePage {
  user = input.required<User>();
  #modalCtrl = inject(ModalController);
  #userService = inject(UsersService);
  #toastCtrl = inject(ToastController);
  email = signal('');
  name = signal('');
  avatar = signal('');
  coordinates = signal<[number, number]>([0, 0]);


  constructor() {
    effect(() => {
      this.email.set(this.user().email);
      this.name.set(this.user().name);
      this.avatar.set(this.user().avatar);

      this.coordinates.set([this.user().lat, this.user().lng]);
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
        error: async (error) => {
          (
            await this.#toastCtrl.create({
              header: 'Update error',
              message: error.error.message,
              buttons: ['Ok'],
            })
          ).present();
        },
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
        error: async (error) => {
          (
            await this.#toastCtrl.create({
              header: 'Update error',
              message: error.error.message,
              buttons: ['Ok'],
            })
          ).present();
        },
      });
    }

  }

  async takePhoto(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 200,
      width: 200,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    if(photo.dataUrl){
      const newphoto : UserPhotoEdit = {
        avatar: photo.dataUrl as string
      }

      this.#userService
      .saveAvatar(newphoto)
      .subscribe({
        next: () => this.avatar.set(photo.dataUrl as string)
      });
    }
  }

  async pickFromGallery(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });


    if(photo.dataUrl){

      const newphoto : UserPhotoEdit = {
        avatar: photo.dataUrl as string
      }

      this.#userService
      .saveAvatar(newphoto)
      .subscribe({
        next: () => this.avatar.set(photo.dataUrl as string),
        error: (error) => console.log(error) 
      });
    }
  }

}
