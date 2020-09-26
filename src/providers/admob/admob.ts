import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from "@ionic-native/admob-free";

@Injectable()
export class AdmobProvider {

  private idTestgoogle = 'ca-app-pub-3940256099942544/2247696110';
  private idAdvancedNative = 'ca-app-pub-1957003967974734/9037637876';
  private idBanner = 'ca-app-pub-1957003967974734/8801989683';
  private idReward = '';
  private idInter = 'ca-app-pub-1957003967974734/3455838822';

  constructor(private admob: AdMobFree, private platform: Platform) { }

  public async showBanner() {
    if (this.platform.is("cordova")) {

      let bannerConfig: AdMobFreeBannerConfig = {
         id: this.idBanner, // Descomentar para produçao
         autoShow: true,
        //  isTesting: true, // Comentar para produçao

      };
      this.admob.banner.config(bannerConfig);
      await this.admob.banner.prepare().then((res) => {
      }).catch((error) => {  console.log(error)      });

    }
  }
  public hiddenBanner() {
    if (this.platform.is("cordova")) {
      return this.admob.banner.remove();
    }
  }

  public interstitial() {
    if (this.platform.is('cordova')) {
      let interstitialConfig: AdMobFreeInterstitialConfig = {
        id:  this.idInter, // Descomentar para produçao
        autoShow: true,
        // isTesting: true, // Comentar para produçao
      }
      this.admob.interstitial.config(interstitialConfig);
      this.admob.interstitial.prepare().then((res) => {
        console.log("Anucio ", res)
      }).catch(e => console.log(e))
    }
  }


  public rewardVideo() {
    if (this.platform.is('cordova')) {
      let rewardVideoConfig: AdMobFreeRewardVideoConfig = {
        id: this.idReward,
        autoShow: true,
        // isTesting: true,
      }

      this.admob.rewardVideo.config(rewardVideoConfig);
      this.admob.rewardVideo.prepare().then((res) => {
        this.admob.rewardVideo.isReady().then((res) => console.log(res)).catch(e => console.log(e))
      }).catch(e => console.log(e))
    }
  }

}
