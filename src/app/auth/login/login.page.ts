import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon
  ],
})
export class LoginPage {
  email = '';
  password = '';
  coords = signal<[number, number]>([0, 0]);

  #authService = inject(AuthService);

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
    console.log(this.coords());
  }

  login() {
    console.log(this.email);
  }
}
