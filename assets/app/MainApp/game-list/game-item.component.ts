/**
 * Created by alex on 15/11/2016.
 */
import {Component, Input} from '@angular/core';
import {MainAppService} from "../mainApp.services";
import {ArenaUsers} from "../arenaUsers";


@Component({
    selector:'game-item',
    template: `
    <article class="panel panel-default" [ngStyle]="{backgroundColor: color}">
    <div class="panel-body">
        {{arena?.lastName}}
    </div>
    <footer class="panel-footer">
        <div class="author">
            {{arena?.status_accept}}
        </div>
    </footer>
</article>`,
    styles:[`
        .author{
        display:inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
        }
        .config{
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
        }
        

        `]

})

export class GameItemComponent{
    @Input() arena:ArenaUsers;

    constructor(private mainAppService:MainAppService){}




}