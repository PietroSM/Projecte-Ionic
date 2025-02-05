import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastController, AlertController, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRouterLink, IonRow, IonTitle, IonToolbar, NavController, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleUser, UserFacebookLogin, UserGoogleLogin, UserLogin } from 'src/app/interfaces/user';
import { SocialLogin } from '@capgo/capacitor-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel, FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon]
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



  user = signal<GoogleUser | null>(null);

  async loginGoogle() {
    try {
      const resp = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile'],
        },
      });
      if(resp.result.responseType === 'online') {
        this.user.set(resp.result.profile);

        const newlogin: UserGoogleLogin = {
          token: resp.result.idToken!,
          lat: this.coords()[0],
          lng: this.coords()[1]
        };

        this.#authService.loginGoogle(newlogin).subscribe({
          next: () => this.#navCtrl.navigateRoot(['/posts/home']),
          error: (error) => {
            alert(error);
          },
        });

      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }


  async loginFacebook(){
    const resp = await SocialLogin.login({
      provider: 'facebook',
      options: {
        permissions: ['email'],
      },
    });
    if (resp.result.accessToken) {
      const newlogin: UserFacebookLogin = {
        token: resp.result.accessToken.token!,
        lat: this.coords()[0],
        lng: this.coords()[1]
      };

      this.#authService.loginFacebook(newlogin).subscribe({
        next: () => this.#navCtrl.navigateRoot(['/posts/home']),
        error: (error) => {
          alert(error);
        },
      });
      // this.accessToken.set(resp.result.accessToken.token);
      // console.log(resp.result.accessToken.token);
    }
  }


}
