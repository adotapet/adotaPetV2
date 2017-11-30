import {Facebook} from "@ionic-native/facebook";
// import { GooglePlus } from '@ionic-native/google-plus'; //falta o reverse client id
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
    constructor(public afAuth: AngularFireAuth,
                // public googlePlus: GooglePlus, //falta o reverse client id
                public facebook: Facebook) {
    }

    getUser(){
        return this.afAuth.auth.currentUser;
    }

    //falta o reverse client id

    // googleLogin(): Promise<any> {
    //   return this.googlePlus
    //     .login({
    //       webClientId:
    //         '809778044945-roi5n89efs8k7h96i766i1ev0jfsdmlp.apps.googleusercontent.com',
    //       offline: true
    //     })
    //     .then(res => {
    //       const credential = firebase.auth.GoogleAuthProvider.credential(
    //         res.idToken
    //       );
    //
    //       this.afAuth.auth
    //         .signInWithCredential(credential)
    //         .then(success => {
    //           console.log('Firebase success: ' + JSON.stringify(success));
    //         })
    //         .catch(error =>
    //           console.log('Firebase failure: ' + JSON.stringify(error))
    //         );
    //     })
    //     .catch(err => console.error('Error: ', err));
    // }

    facebookLogin(): Promise<any> {
        return this.facebook
            .login(['email'])
            .then(response => {
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
                    response.authResponse.accessToken
                );

                this.afAuth.auth
                    .signInWithCredential(facebookCredential)
                    .then(success => {
                        console.log('Firebase success: ' + JSON.stringify(success));
                    })
                    .catch(error => {
                        console.log('Firebase failure: ' + JSON.stringify(error));
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

