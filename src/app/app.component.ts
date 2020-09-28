import { Component, VERSION, OnInit } from "@angular/core";
import liff from "@line/liff";
import axios from "axios";
import * as firebase from 'firebase/app';


export interface LINEUSERDATA {
  displayName: string;
  email: string;
  pictureUrl: string;
  // statusMessage: string;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;
  userData: LINEUSERDATA;
  ngOnInit(): void {
    this.main();
  }

  async getUserProfile() {
    // const profile = await liff.getProfile();
    // console.log("profile:", profile);
  }
  res;
  LineGetToken() {
    const accessToken = liff.getAccessToken();
    const IDToken = liff.getIDToken();
    // console.log('accessToken:',accessToken);
    // console.log('IDToken:',IDToken);
    const instance = axios.create({
      baseURL:
        "https://asia-northeast1-incubate-internship-2020.cloudfunctions.net/TestToken",
      headers: { "Access-Control-Allow-Origin": "*" }
    });
    instance
      .post("body", {
        access_token: accessToken,
        id_token: IDToken
      })
      .then(response => {
        firebase
          .auth()
          .signInWithCustomToken(response.data)
          .then((res) => {
            console.log('response:', res);
            if (res.operationType == 'signIn') {
              this.userData = {
                pictureUrl: res.user.photoURL,
                displayName: res.user.displayName,
                email: res.user.email,
              };
            }
            console.log('userData:',this.userData);
            
            // return true;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode:', errorCode);
            console.log('errorMessage:', errorMessage);
            // return false;
          });
      })
      .catch((err) => {
        console.error('err:', err);
      });
  }

  async main() {
    await liff.init({ liffId: "1654905366-pdX7j1KM" });
    if (liff.isLoggedIn()) {
      // this.getUserProfile();
      this.LineGetToken();
    } else {
      liff.login();
    }
  }
}
