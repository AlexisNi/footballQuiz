/**
 * Created by alex on 15/11/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {MainAppService} from "../mainApp.services";
import {ArenaUsers} from "../arenaUsers";
import {AuthService} from "../../auth/auth.service";


@Component({
    selector:'game-item',
    template: `
<!--
If user hasnt played
-->
<div *ngIf="arena.userId==userId && arena.user_played==false||arena.inviteId==userId&& arena.invite_played==false">
<a  [routerLink]="arena.arenaId" class="list-group-item clearfix" routerLinkActive="active"> 
    <article class="panel panel-default" [ngStyle]="{backgroundColor: color}">
    <div class="panel-body">
        {{arena?.lastName}} 
    </div>
    <footer class="panel-footer">
        <div class="author">
            {{arena?.status_accept}}
        </div>
    </footer>
    </article>
</a>
</div>


<div *ngIf="arena.userId==userId && arena.user_played==true||arena.inviteId==userId&& arena.invite_played==true">
<a [class.disabled]="true"  [routerLink]="arena.arenaId" class="list-group-item clearfix" routerLinkActive="active"> 
    <article class="panel panel-default" [ngStyle]="{backgroundColor: color}">
    <div class="panel-body">
        {{arena?.lastName}} 
    </div>
    <footer class="panel-footer">
        <div class="author">
            {{arena?.status_accept}}
        </div>
    </footer>
    </article>
</a>
</div>





`,
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
        a.disabled{
            pointer-events: none;
            cursor: default;
        }
        

        `]

})

export class GameItemComponent implements OnInit{
    ngOnInit(): void {
        this.userId=this.userIdService.getUserId();
    }
    @Input() arena:ArenaUsers;
    private userId;

    constructor(private userIdService:AuthService){}




}