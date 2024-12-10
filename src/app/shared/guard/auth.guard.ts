import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = next.data['role'] as 'admin' | 'user';

    return this.authService.getUserRole().pipe(
      map((role) => role === expectedRole),
      tap((isAuthorized) => {
        if (!isAuthorized) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}