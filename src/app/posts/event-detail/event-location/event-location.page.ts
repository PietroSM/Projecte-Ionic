import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { EventDetailPage } from '../event-detail.page';
import { OlMapDirective } from 'src/app/shared/directives/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/shared/directives/ol-maps/ol-marker.directive';
import { RouterLink } from '@angular/router';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator';

@Component({
  selector: 'app-event-location',
  templateUrl: './event-location.page.html',
  styleUrls: ['./event-location.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, OlMapDirective, OlMarkerDirective, RouterLink]
})
export class EventLocationPage{

  event = inject(EventDetailPage).event;
  coordinates = signal<[number, number]>([0, 0]);
  adress = signal<string>("");

  validInputId = false;

  constructor() {
    effect(() => {
      this.coordinates.set([this.event()!.lat, this.event()!.lng]);
      this.adress.set(this.event()!.address);
    });
  }

  startNavigation() {
    LaunchNavigator.navigate(this.coordinates().reverse());
  }


}
