import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {UserService} from './shared/services/user.service';
import {routing} from './app.routing';
import {AuthenticationService} from './shared/services/authentication.service';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { InfoComponent } from './info/info.component';
import {GameService} from './shared/services/game.service';
import {ApiService} from './shared/services/api.service';
import { PlayingfieldComponent } from './game/playingfield/playingfield.component';
import { StatsboardComponent } from './game/statsboard/statsboard.component';
import { HeaderComponent } from './game/header/header.component';
import { PlayerstatsComponent } from './game/statsboard/playerstats/playerstats.component';
import { CardstackComponent } from './game/statsboard/cardstack/cardstack.component';
import { CardComponent } from './game/statsboard/cardstack/card/card.component';
import { StoneComponent } from './game/playingfield/stone/stone.component';
import { ShipComponent } from './game/playingfield/ship/ship.component';
import { UserinputfieldComponent } from './game/playingfield/userinputfield/userinputfield.component';
import { SiteComponent } from './game/playingfield/site/site.component';
import { MarketComponent } from './game/playingfield/site/market/market.component';
import { TempleComponent } from './game/playingfield/site/temple/temple.component';
import { ObeliskComponent } from './game/playingfield/site/obelisk/obelisk.component';
import { BurialchamberComponent } from './game/playingfield/site/burialchamber/burialchamber.component';
import { SledComponent } from './game/playingfield/userinputfield/sled/sled.component';
import { ButtonfieldComponent } from './game/playingfield/userinputfield/buttonfield/buttonfield.component';
import { GetstonesComponent } from './game/playingfield/userinputfield/buttonfield/getstones/getstones.component';
import {LobbyService} from './shared/services/lobby.service';
import {ModalModule} from 'ng2-modal';
import { PyramidComponent } from './game/playingfield/site/pyramid/pyramid.component';
import {DragulaModule} from 'ng2-dragula';
import { LobbyHeaderComponent } from './lobby/lobby-header/lobby-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    LobbyComponent,
    InfoComponent,
    PlayingfieldComponent,
    StatsboardComponent,
    HeaderComponent,
    PlayerstatsComponent,
    CardstackComponent,
    CardComponent,
    StoneComponent,
    ShipComponent,
    UserinputfieldComponent,
    SiteComponent,
    MarketComponent,
    TempleComponent,
    ObeliskComponent,
    BurialchamberComponent,
    SledComponent,
    ButtonfieldComponent,
    GetstonesComponent,
    PyramidComponent,
    LobbyHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    ModalModule,
    DragulaModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    UserService,
    GameService,
    ApiService,
    LobbyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
