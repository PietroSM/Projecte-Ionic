import { Component, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  ActionSheetController, IonImg, NavController, IonTabButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { MyEvent } from 'src/app/interfaces/my-event';
import { IntlCurrencyPipe } from 'src/app/shared/pipes/intl-currency.pipe';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton,  
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonLabel,
    IonItem,
    IonCard,
    CommonModule,
    FormsModule,
    IntlCurrencyPipe,
  ],
})
export class EventCardPage {
  event = input.required<MyEvent>();
  deleted = output<void>();
  #alertCtrl = inject(AlertController);
  #eventService = inject(EventsService);

  #actionSheetController = inject(ActionSheetController);
  #nav = inject(NavController);


  async showAction() {
    const buttons = [
      {
        text: 'Detail Event',
        icon: 'share',
        handler: () => {
          this.#nav.navigateRoot(['/posts/' + this.event().id]);
        },
      },
      {
        text: 'Creator',
        icon: 'heart',
        handler: () => {
          this.#nav.navigateRoot(['/profile/' + this.event().creator.id]);
        },
      }
    ];
  
    if (this.event().mine) {
      buttons.push({
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.deleteEvent();
        },
      });
    }
  
    const actionSheet = await this.#actionSheetController.create({
      buttons: buttons,
    });
  
    await actionSheet.present();
  }

  async deleteEvent() {
    const alert = await this.#alertCtrl.create({
      header: 'Delete Event',
      message: 'Are you sure you want to delete this product',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.#eventService
              .deleteEvent(this.event()!.id)
              .subscribe({
                next: () => this.deleted.emit()
              });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ],
    });
    alert.present();
  }


}
