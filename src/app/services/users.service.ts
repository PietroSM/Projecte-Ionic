import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SingleUserResponse } from '../interfaces/responses';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #usersURL = 'users';
  #http = inject(HttpClient);

  getProfile(id?: number): Observable<User> {
    return id === undefined?
      this.#http.get<SingleUserResponse>(`${this.#usersURL}/me`)
      .pipe(map((resp) => resp.user)) :
      this.#http.get<SingleUserResponse>(`${this.#usersURL}/${id}`)
      .pipe(map((resp) => resp.user));
  }
}
