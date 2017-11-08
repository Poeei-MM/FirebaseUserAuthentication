import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { UserDatabaseProvider } from '../../providers/database/userdatabase';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile-modals',
  templateUrl: 'profile-modals.html'
})

export class ProfileModalsPage {
    
  public profile_picture: string;
  public form             : any;
  public user  	          : any     = [];
  public users  	        : any;
  public userImage  	    : any     = '';
  public img    	        : any     = '';
  public userName         : any     = '';
  public gender           : any     = [];
  public dateofbirth      : any     = '';
  public contact          : any     = '';
  public userId           : string  = '';
  public isEditable       : boolean = false;
  public myDate           : String = new Date().toISOString();
  public event = {
    month: this.myDate,
  };
  placeholder_picture = "assets/logos/dhouse6.jpg";
  
  constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : UserDatabaseProvider
   )
   {
      this.form 		      = _FB.group({
         'userName' 		  : ['', Validators.required],
         'gender'	        : ['', Validators.required],
         'userImage'		  : ['', Validators.required],
         'contact'	      : ['', Validators.required],
         'dateofbirth' 	  : ['', Validators.required]
      });

    this.users = firebase.database().ref('userProfile/');


      if(params.get('isEdited'))
      {
          this.user 		    = params.get('users');
          this.userName	    = this.user.userName;
          this.userImage    = this.user.userImage;
          this.gender       = this.user.gender;
          this.dateofbirth  = this.user.dateofbirth;
          this.gender       = this.user.gender;
          this.img          = this.user.userImage;
          this.isEditable   = true;
          alert(this.user);
      }
   }

   saveProfile(val)
   {
      this._LOADER.displayPreloader();

   let  userName	      : string		= this.form.controls["userName"].value,
  		  gender        	: any		    = this.form.controls["gender"].value,
  		  contact       	: any		    = this.form.controls["contact"].value,
  		  dateofbirth    	: any		    = this.form.controls["dateofbirth"].value,
  		  userImage       : string    = this.userImage;

      if(this.isEditable)
      {

         if(userImage !== this.userImage)
         {
            this._DB.uploadImage(userImage)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.userId,
               {
	              userName      : name,
	              userImage     : uploadedImage,
	              gender        : gender,
	              dateofbirth   : dateofbirth,
	              contact       : contact
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.userId,
           {
	            userName      : name,
              gender        : gender,
              dateofbirth   : dateofbirth,
              contact       : contact
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(userImage)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	            userName      : name,
              userImage     : uploadedImage,
              gender        : gender,
              dateofbirth   : dateofbirth,
              contact       : contact
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }

  closeModal(val = null){
      this.viewCtrl.dismiss(val);
   }


  selectImage()
   {
   this._IMG.selectImage()
      .then((data) =>
      {
         this.userImage = data;
      });
   }

}
