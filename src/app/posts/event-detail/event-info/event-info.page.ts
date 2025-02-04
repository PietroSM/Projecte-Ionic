import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonLabel, IonItem, IonIcon, AlertController, NavController } from '@ionic/angular/standalone';
import { EventDetailPage } from '../event-detail.page';
import { EventCardPage } from '../../event-card/event-card.page';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.page.html',
  styleUrls: ['./event-info.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonTabButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, EventCardPage]
})
export class EventInfoPage{

  event = inject(EventDetailPage).event;
  #alertCtrl = inject(AlertController);
  #nav = inject(NavController);


  async deleteEvent(){
    this.#nav.navigateBack(['/posts/home'])
  }


}
