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
  ActionSheetController, IonImg, NavController } from '@ionic/angular/standalone';
import { MyEvent } from 'src/app/interfaces/my-event';
import { IntlCurrencyPipe } from 'src/app/shared/pipes/intl-currency.pipe';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
  standalone: true,
  imports: [ 
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

  #actionSheetController = inject(ActionSheetController);
  #nav = inject(NavController);


  async showAction(){
    const actionSheet = await this.#actionSheetController.create({
      buttons: [
        {
          text: 'Detail Event',
          icon: 'share',
          handler: () => {
            this.#nav.navigateRoot(['/posts/'+this.event().id]);
          }
        },
        {
          text: 'Creator',
          icon: 'heart',
          handler: () => {

          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            
          },
        },         
      ],
    });
    await actionSheet.present();
  }


}
