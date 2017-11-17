import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

    // posts: FirebaseListObservable<any>;

  constructor(public http: HttpClient) {
      // this.posts = afDatabase.list('/posts').valueChanges();

  }

}
