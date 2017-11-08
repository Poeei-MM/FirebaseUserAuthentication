import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { FilmDatabaseProvider } from '../providers/database/filmdatabase';
import { UserDatabaseProvider } from '../providers/database/userdatabase';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { ToastService } from '../providers/util/toast.service';
import { AlertService } from '../providers/util/alert.service';
import { CameraProvider } from '../providers/util/camera.provider';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase,AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';

export const firebaseConfig = {
  

    apiKey: "AIzaSyBMVKU6qmf2aRwSIu0flluc-nA6_kr7cB4",
    authDomain: "myionicapp-94d93.firebaseapp.com",
    databaseURL: "https://myionicapp-94d93.firebaseio.com",
    projectId: "myionicapp-94d93",
    storageBucket: "myionicapp-94d93.appspot.com",
    messagingSenderId: "141943983138"


};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AngularFireDatabaseModule,
    ImageProvider,
    PreloaderProvider,
    UserDatabaseProvider,
    FilmDatabaseProvider,
    ImageProvider,
    PreloaderProvider,
    ToastService,
    AlertService,
    CameraProvider   
  ]
})
export class AppModule {}
