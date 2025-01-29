import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonFabButton,
  IonFab,
  IonIcon,
  IonList,
  IonCard,
  IonItem,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MyEvent } from 'src/app/interfaces/my-event';
import { EventsService } from 'src/app/services/events.service';
import { IntlCurrencyPipe } from 'src/app/shared/pipes/intl-currency.pipe';
import { EventCardPage } from '../event-card/event-card.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonCardSubtitle,
    IonLabel,
    IonCardTitle,
    IonCardHeader,
    IonButton,
    IonItem,
    IonCard,
    IonIcon,
    IonFab,
    IonFabButton,
    IonRefresherContent,
    IonRefresher,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    RouterLink,
    IonCardContent,
    IntlCurrencyPipe,
    IonSearchbar,
    EventCardPage
  ],
})
export class HomePage {
  events = signal<MyEvent[]>([]);
  #eventsService = inject(EventsService);
  finished = false;
  contador = 2;
  search = '';

  constructor() {
    this.#eventsService.getEvents(1, '', this.search).subscribe((events) => {
      this.events.set(events.events);
    });
  }

  filterItems(){
    this.#eventsService.getEvents(1, '', this.search).subscribe((events) => {
      this.events.set(events.events);
    });
  }


  loadMoreItems(infinite?: IonInfiniteScroll) {
    this.#eventsService.getEvents(this.contador, '', this.search).subscribe({
      next: (events) => {
        this.events.set(this.events().concat(events.events));
        this.contador++;
        infinite?.complete();
        if (!events.more) {
          this.finished = true;
        }
        console.log(events.more);
      },
      error: (error) => console.log(error),
    });
  }

  reloadEvents(refresher?: IonRefresher) {
    this.#eventsService.getEvents(1,'',this.search).subscribe({
      next: (events) => {
        this.events.set(events.events);
        refresher?.complete();
      } 
    });
  }



}
