// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, ModalController, NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { User } from "../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { UserDatabaseProvider } from '../../providers/database/userdatabase';

import { Users } from "../../shared/models/users";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: any;
  public backgroundImage = "assets/logos/dhouse7.png";
  public userAuth         : any     =[];
  user = {} as User;
  constructor(  private afAuth       : AngularFireAuth, 
                public navParams     : NavParams, 
                private navCtrl      : NavController, 
                public loadingCtrl   : LoadingController, 
                public alertCtrl     : AlertController, 
                public app           : App,
                private modalCtrl    : ModalController,
                private _LOADER      : PreloaderProvider,
                private _DB          : UserDatabaseProvider) { }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    console.log('chamou');
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading(message) {
    let loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
          this.navCtrl.setRoot('ProfilePage');
      }   
      else
      {
        let alert = this.alertCtrl.create({
            title: 'Try Again',
            buttons: ['Dismiss']
          });
          alert.present();
        
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  async signup(user: User) {
    if(user.password==user.compassword)
    {
      try
      {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        if (result) {
          let modal = this.modalCtrl.create('ProfileModalsPage');
              modal.onDidDismiss((data) =>
              {
                if(data)
                {
                    this.loadAndParseUser();
                }
              });
              modal.present();
        }
      } catch (e) {
        console.error(e);
      }
    }
    else
    {
      this.presentLoading('Your Password & Comfirm Password are NOT same!');
    }
  }

  loadAndParseUser()
   {
      this.userAuth = this._DB.renderUsers();
      this._LOADER.hidePreloader();
   }

  resetPassword(user: User)
  {
    this.afAuth.auth.sendPasswordResetEmail(user.email)
    .then(() => {
      this.sendEmailVerification();
    })
  }
  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          this.presentLoading('Your Email was sent!');
          }
        );
        });
  }

  logoutUser(): Promise<void> {
      return this.afAuth.auth.signOut();
  }
}
