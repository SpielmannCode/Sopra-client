import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {LobbyComponent} from './lobby/lobby.component';
import {GameComponent} from './game/game.component';
import {InfoComponent} from './info/info.component';
import {PlayingfieldComponent} from './game/playingfield/playingfield.component';
import {LobbyService} from './shared/services/lobby.service';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuardService]},
    { path: 'lobby/:id', component: LobbyComponent, canActivate: [AuthGuardService, LobbyService]},
    { path: 'info', component: InfoComponent},
    { path: 'game/:id', component: GameComponent, canActivate: [AuthGuardService]},
    { path: '', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
