import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NavController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonList, IonItem, IonInput, IonIcon, IonLabel, IonButton, IonImg, IonTabButton, IonCol, IonRow, IonGrid, IonSearchbar } from '@ionic/angular/standalone';
import { minDateValidator } from 'src/app/shared/validator/min-date.validator';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { RouterLink } from '@angular/router';
import { OlMapDirective } from 'src/app/shared/directives/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/shared/directives/ol-maps/ol-marker.directive';
import { SearchResult } from 'src/app/interfaces/search-result';
import { GaAutocompleteDirective } from 'src/app/shared/directives/ol-maps/ga-autocomplete.directive';
import { MyEventInsert } from 'src/app/interfaces/my-event';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonImg, IonButton, IonLabel, IonIcon, IonInput, IonItem, IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    OlMapDirective,
    OlMarkerDirective,
    GaAutocompleteDirective],
})
export class NewEventPage {
  #fb = inject(NonNullableFormBuilder);
  #changeDetector = inject(ChangeDetectorRef);
  #eventsService = inject(EventsService);
  #nav = inject(NavController);

  minDate = new Intl.DateTimeFormat('en-CA').format(new Date());


  newEvent = this.#fb.group({
    title: ['', [ Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]],
    date: ['', [Validators.required, minDateValidator(this.minDate)]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.1)]],
    image: ['', [Validators.required]],
  });


  coordinates = signal<[number, number]>([-0.5, 38.5]);
  address = signal<string>("");


  changePlace(result: SearchResult) {
    this.coordinates.set(result.coordinates);
    this.address.set(result.address);
  }

  async takePhoto(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 768,
      width: 1024,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newEvent.get('image')?.setValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }

  async pickFromGallery(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newEvent.get('image')?.setValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  
  }

  addEvent() {
    const myEventInsert : MyEventInsert = {
      title: this.newEvent.getRawValue().title,
      description: this.newEvent.getRawValue().description,
      price: this.newEvent.getRawValue().price,
      lat: this.coordinates()[0],
      lng: this.coordinates()[1],
      address: this.address(),
      image: this.newEvent.getRawValue().image,
      date: this.newEvent.getRawValue().date
    };

    this.#eventsService
    .addEvent(myEventInsert)
    .subscribe({
      next: () => this.#nav.navigateRoot(['/posts/home']),
      error: (error) => console.log(error)

    });

  }



}
