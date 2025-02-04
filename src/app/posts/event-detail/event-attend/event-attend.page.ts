import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonButton, IonIcon, IonLabel, IonTabButton } from '@ionic/angular/standalone';
import { EventDetailPage } from '../event-detail.page';
import { EventsService } from 'src/app/services/events.service';
import { User } from 'src/app/interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-attend',
  templateUrl: './event-attend.page.html',
  styleUrls: ['./event-attend.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonLabel, IonIcon, IonButton, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class EventAttendPage{

  event = inject(EventDetailPage).event;
  #eventsService = inject(EventsService);
  attendees = signal<User[]>([]);


  constructor() {
    if(this.event()){
      this.#eventsService.getAttendees(this.event()!.id)
      .subscribe({
        next: (users) => this.attendees.set(users),
        error: (error) => console.log(error)
      });
    }

  }

  actualitzarAttendees(){
    this.#eventsService.getAttendees(this.event()!.id)
    .subscribe({
      next: (users) => this.attendees.set(users),
      error: (error) => console.log(error)
    });
  }

  canviarAttend() {
    if (this.event()!.attend) {
      this.#eventsService.deleteAttend(this.event()!.id).subscribe({
        next: () => this.actualitzarAttendees(),
        error: (error) => console.log(error),
      });

      this.event()!.attend = false;
      this.event()!.numAttend = this.event()!.numAttend - 1;

    } else if (!this.event()!.attend) {
      this.#eventsService.postAttend(this.event()!.id).subscribe({
        next: () => this.actualitzarAttendees(),
        error: (error) => console.log(error),
      });

      this.event()!.attend = true;
      this.event()!.numAttend = this.event()!.numAttend + 1;
    }
  }
  
}
