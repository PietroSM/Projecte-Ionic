import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EventDetailPage } from '../event-detail.page';
import { EventsService } from 'src/app/services/events.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-event-attend',
  templateUrl: './event-attend.page.html',
  styleUrls: ['./event-attend.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventAttendPage{

  event = inject(EventDetailPage).event;
  #eventService = inject(EventsService);
  attendees = signal<User[]>([]);


  constructor() {
      
  }
  
}
