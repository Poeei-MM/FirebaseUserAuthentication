import { Component } from '@angular/core';
import { NavController, AlertController,ActionSheetController, IonicPage } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  folds: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.folds = af.list('/home&fold');
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Owner Name',
      message: "Enter a name for this new owner you're so keen on adding",
      inputs: [
        {
          name: 'owner',
          placeholder: 'Owner Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.folds.push({
              owner: data.owner
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(foldId, foldowner) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(foldId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(foldId, foldowner);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(foldId: string){
    this.folds.remove(foldId);
  }

  updateSong(foldId, foldowner){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'owner',
          placeholder: 'Owner',
          value: foldowner
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.folds.update(foldId, {
              title: data.owner
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
