import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
  }
}