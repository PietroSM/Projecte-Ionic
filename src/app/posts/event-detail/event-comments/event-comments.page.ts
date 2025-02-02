import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonGrid, IonRow, IonCol, IonAvatar, IonFabButton, IonFab, IonIcon } from '@ionic/angular/standalone';
import { EventDetailPage } from '../event-detail.page';
import { CommentInput, Comments } from 'src/app/interfaces/my-event';
import { EventsService } from 'src/app/services/events.service';
import { Dialog } from '@capacitor/dialog';


@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.page.html',
  styleUrls: ['./event-comments.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFab, IonFabButton, IonAvatar, IonCol, IonRow, IonGrid, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventCommentsPage{

  event = inject(EventDetailPage).event;
  comments = signal<Comments[]>([]);
  #eventsService = inject(EventsService);


  constructor(){
    if(this.event()){
      this.#eventsService.getComments(this.event()!.id)
      .subscribe({
        next: (comments) => this.comments.set(comments),
        error: (error) => console.log(error)
      });
    }
  }


  async addCommment() {
    const result = await Dialog.prompt({
      title: 'New Comment',
      message: '',
    });

    if(!result.cancelled && result.value !== ""){
      const newComment : CommentInput = {
        comment: result.value
      };

      this.#eventsService.postComment(this.event()!.id, newComment)
      .subscribe({
        next: () => {
          this.#eventsService.getComments(this.event()!.id)
          .subscribe({
            next: (comments) => this.comments.set(comments),
            error: (error) => console.log(error),
          });
        },
        error: (error) => console.log(error)
      });

    }
  }

}
