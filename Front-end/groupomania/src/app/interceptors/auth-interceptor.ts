import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  // TOKEN => REQ.HEADERS  \\
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();
    if (token === undefined) {
      const tokenLocal = this.userService.getTokenLocal();
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + tokenLocal)
      });
      return next.handle(newRequest);
    } else {
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(newRequest);
    }
  }
}
