import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, IonicPage } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { UserDatabaseProvider } from '../../providers/database/userdatabase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Users } from "../../shared/models/users";

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html'
})

export class ProfileSettingsPage {
  public user    : any; 
  public uid     : string;
  placeholder_pic="../../assets/logos/dhouse6.jpg";
  userData : FirebaseObjectObservable<Users>
   constructor( private afAuth       : AngularFireAuth,
                private afDatabase   : AngularFireDatabase,
                public navCtrl       : NavController,
                private modalCtrl    : ModalController,
                private alertCtrl    : AlertController,
                private _LOADER      : PreloaderProvider,
                private _DB          : UserDatabaseProvider)
   {
   }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(auth=>{
              if(auth && auth.email && auth.uid){
                this.userData=this.afDatabase.object(`userProfile/${auth.uid}`);
                this.uid=auth.uid;
                alert(this.userData);  
            }
     });
    
   }


   loadAndParseUsers()
   {
      this.user = this._DB.renderUsers();
      this._LOADER.hidePreloader();
   }

   editProfile(user)
   {
      let auth   = this.uid,
          params = { user :user, string : auth ,isEdited: true },
          
          modal  = this.modalCtrl.create('ProfileModalsPage', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseUsers();
         }
      });
      modal.present();
   }

    logout(): Promise<void> {
      return this.afAuth.auth.signOut();
  }

}
