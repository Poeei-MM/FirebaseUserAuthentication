import { ProfileModalsPage } from './profile-modals';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ProfileModalsPage,
    ],
    imports: [
        IonicPageModule.forChild(ProfileModalsPage),
    ],
    exports: [
        ProfileModalsPage
    ]
})

export class ProfileModalsPageModule { };
