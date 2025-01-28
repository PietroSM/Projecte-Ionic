import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const serverUrl = isDevMode()
    ? 'https://api.fullstackpro.es/svtickets'
    : 'https://api.fullstackpro.es/svtickets';
  const reqClone = req.clone({
    url: `${serverUrl}/${req.url}`,
  });
  return next(reqClone);
};
// http://localhost:3000