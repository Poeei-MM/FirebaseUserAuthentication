import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Users } from "../../shared/models/users";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  public user    : any=[]; 
  public users   = {} as Users;
  public uid     : string;
  placeholder_pic="../../assets/logos/dhouse6.jpg";
  userData : FirebaseObjectObservable<Users>
   constructor( private afAuth       : AngularFireAuth,
                private afDatabase   : AngularFireDatabase,
                public navCtrl       : NavController,
                private modalCtrl    : ModalController,
                private _LOADER      : PreloaderProvider)
   {
     
   }

  ionViewWillLoad()
  { 
     this._LOADER.displayPreloader();
     this.afAuth.authState.subscribe(auth=>{
        if(auth && auth.email && auth.uid){
        this.userData=this.afDatabase.object(`userProfile/${auth.uid}`);
        this.uid=auth.uid;
        alert(this.userData);
      }
      this._LOADER.hidePreloader();
     });
               
   }

   editProfile(users)
   {
      let params = { users :users, string: this.uid, isEdited : true },
          
          modal  = this.modalCtrl.create('ProfileModalsPage', params);
         
      modal.present();
   }

}
