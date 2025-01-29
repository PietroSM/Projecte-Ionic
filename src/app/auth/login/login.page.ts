import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastController, AlertController, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRouterLink, IonRow, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { UserLogin } from 'src/app/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon]
})
export class LoginPage {
  email = '';
  password = '';
  coords = signal<[number, number]>([0, 0]);

  #authService = inject(AuthService);
  #toastCtrl = inject(ToastController);
  #navCtrl = inject(NavController);


  constructor() {
    this.getLocation();
  }

  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    this.coords.set([
      coordinates.coords.longitude,
      coordinates.coords.latitude,
    ]);
  }


  login() {
    const newLogin : UserLogin ={
      email: this.email,
      password: this.password,
      lat: this.coords()[0],
      lng: this.coords()[1]
    }

    this.#authService
      .login(newLogin)
      .subscribe({
        next: () => this.#navCtrl.navigateRoot(['/posts/home']),
        error: async (error) => {
          (
            await this.#toastCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }


}
