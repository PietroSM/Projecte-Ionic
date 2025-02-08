import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { EventsService } from 'src/app/services/events.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonBackButton, IonButtons, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class EventDetailPage{

  #eventService = inject(EventsService);


  id = input.required({ transform: numberAttribute });
  eventResource = rxResource({
    request: () => this.id(),
    loader: ({request: id}) => this.#eventService.getEvent(id)
  });

  event = computed(() => this.eventResource.value());
}
