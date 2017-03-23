﻿import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from "./shared/services/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {LobbyComponent} from "./lobby/lobby.component";
import {GameComponent} from "./game/game.component";
import {InfoComponent} from "./info/info.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lobby', component: LobbyComponent},
    { path: 'info', component: InfoComponent},
    { path: 'game/:id', component: GameComponent, canActivate: [AuthGuardService] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
