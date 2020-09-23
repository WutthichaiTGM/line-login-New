import { Component, VERSION, OnInit } from "@angular/core";
import liff from "@line/liff";
import axios from "axios";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;

  ngOnInit(): void {
    this.main();
  }

  async getUserProfile() {
    const profile = await liff.getProfile();
    console.log("profile:", profile);
  }

  LineGetToken() {
    const accessToken = liff.getAccessToken();
    const IDToken = liff.getIDToken();
    const instance = axios.create({
      baseURL:
        "https://asia-northeast1-incubate-internship-2020.cloudfunctions.net/createCustomToken",
      headers: { "Access-Control-Allow-Origin": "*" }
    });
    instance
      .post("body", {
        access_token: accessToken,
        id_token: IDToken
      })
      .then(async response => {
        console.log('response:',response);
      })
      .catch(err => {
        console.error('err:',err);
      });
  }

  async main() {
    await liff.init({ liffId: "1654905366-pdX7j1KM" });
    if (liff.isLoggedIn()) {
      this.getUserProfile();
    } else {
      liff.login();
    }
  }
}
