import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs/observable';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'key=AIzaSyDiyw2MVTGxV0tVIiUkn0DP_Q39sFwskxA')
    });
    return next.handle(authReq);
  }
}
