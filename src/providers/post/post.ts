import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PostProvider {

  constructor(
    private http: HttpClient
  ) {
  }


  shorUrl(longUrl:string): Observable<any> {
    let data = {
      "dynamicLinkInfo": {
        "domainUriPrefix": "https://adotapetgo.page.link",
        "link": longUrl,
      }
    };
    return this.http.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAYje10phGzysUfgu6V8jqcTiraa3COSLM', data).map(res => res);
  }
}
