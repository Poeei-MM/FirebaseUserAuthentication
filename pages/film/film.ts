import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { FilmDatabaseProvider } from '../../providers/database/filmdatabase';

import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {

   public movies    : any;
   
   constructor( public navCtrl       : NavController,
                private modalCtrl    : ModalController,
                private _LOADER      : PreloaderProvider,
                private _DB          : FilmDatabaseProvider)
   {
   }


   ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.loadAndParseMovies();
      
   }


   loadAndParseMovies()
   {
      this.movies = this._DB.renderMovies();
      this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.modalCtrl.create('Modals');
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }


   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create('Modals', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }



   deleteMovie(movie)
   {
      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
         this.loadAndParseMovies();
      });
   }


}