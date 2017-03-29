import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../shared/services/game.service";
import {Game} from "../shared/models/game";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit {
  protected users: User[] = [];
  protected gameId: number;
  protected game: Game;

  constructor(protected userService: UserService,
              protected gameService: GameService,
              protected route: ActivatedRoute) { }

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });

    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      console.log(this.gameId);

      this.gameService.getGame(this.gameId).subscribe(game => {
        this.game = game;

        this.gameService.initBoard(game).subscribe(() => console.log(game));
      });
    });
  }
}
