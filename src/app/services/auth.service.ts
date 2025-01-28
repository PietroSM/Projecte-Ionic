import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { SingleUserResponse, TokenResponse } from '../interfaces/responses';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #eventsURL = 'auth';
  #logged = signal(false);
  #http = inject(HttpClient);


  getLogged(): WritableSignal<boolean> {
    return this.#logged;
  }

  register(user: User): Observable<void> {
    return this.#http
      .post<SingleUserResponse>(`${this.#eventsURL}/register`, user)
      .pipe(
        switchMap(async (r) => {
          r.user
        })
      );
  }


  login(data: UserLogin): Observable<void> {
    return this.#http
      .post<TokenResponse>(`${this.#eventsURL}/login`, data)
      .pipe(
        switchMap(async (r) => {
          try{
            await Preferences.set({key: 'fs-token', value: r.accessToken});
            this.#logged.set(true);
          }catch(error) {
            throw new Error('Can\'t save authentication token in storage!');
          }

        })
      );
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) { 
      return of(true);
    }

    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          return of(false);
        }

        return this.#http.get(`${this.#eventsURL}/validate`).pipe(
          map(() => {
            this.#logged.set(true);
            return true;
          }),
          catchError(() => of(false))
        );
      }),
    );
  }



  


}
