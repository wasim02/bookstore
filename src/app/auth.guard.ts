import { PostService } from './services/post.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private postService: PostService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuth = this.postService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['login']);
      }
    return isAuth;
  }
}
