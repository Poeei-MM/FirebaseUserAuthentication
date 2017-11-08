import { FilmPage } from './film';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        FilmPage,
    ],
    imports: [
        IonicPageModule.forChild(FilmPage),
    ],
    exports: [
        FilmPage
    ]
})

export class FilmPageModule { };
