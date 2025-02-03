import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

export const profileResolver: ResolveFn<User> = (route) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  if(+route.params['id']){
    return userService.getProfile(+route.params['id'])
      .pipe(
        catchError(() => {
          // router.navigate(['/events']);
          console.log("hola");
          return EMPTY;
        })
      );
  } else {
    return userService.getProfile()
      .pipe(
        catchError(() => {
          // router.navigate(['/events']);
          console.log("hola2");
          return EMPTY;
        })
      );
  }
};
