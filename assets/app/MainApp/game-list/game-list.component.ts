import {Component, OnInit} from "@angular/core";
import {MainAppService} from "../mainApp.services";
import {ArenaUsers} from "../arenaUsers";




@Component({
    selector:'game-list',
    template: `HERE THE GAME LIST
                `,

})

export  class GameListcomponent implements OnInit{
/*    constructor(private mainAppService:MainAppService){}
    arena:ArenaUsers[];
    ngOnInit(): void {
        this.mainAppService.getArenas()
            .subscribe(
                (data)=> {
                    console.log(data)

                });
    }*/
}