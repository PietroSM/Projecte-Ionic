import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  Platform,
  IonAvatar,
  IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  logIn,
  documentText,
  checkmarkCircle,
  images,
  arrowUndoCircle,
  camera,
} from 'ionicons/icons';
import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonAvatar,
    IonImg
  ],
})
export class AppComponent {
  user = signal<User | null>(null);

  #authService = inject(AuthService);
  #userService = inject(UsersService);
  #platform = inject(Platform);

  public appPages = [{ title: 'Home', url: '/events', icon: 'home' }];

  constructor() {
    addIcons({
      home,
      logIn,
      documentText,
      checkmarkCircle,
      images,
      camera,
      arrowUndoCircle,
    });

    effect(() => {
      if (this.#authService.getLogged()) {
        this.#userService.getProfile().subscribe((user) => this.user.set(user));
      } else {
        this.user.set(null);
      }
    });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
    }
  }
}
