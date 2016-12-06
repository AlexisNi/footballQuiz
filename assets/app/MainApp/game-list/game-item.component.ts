/**
 * Created by alex on 15/11/2016.
 */
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MainAppService} from "../mainApp.services";
import {ArenaUsers} from "../models/arenaUsers";
import {AuthService} from "../../auth/auth.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {Data} from "@angular/router";
import {ArenaUserId} from "../models/arenaUserId";
import {GameListServices} from "./game-list.services";


@Component({
    selector:'game-item',
    template: `
<!--
If user hasnt played
-->
<div class="row" *ngIf="arena.userId==userId && arena.user_played==false||arena.inviteId==userId&& arena.invite_played==false">
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



<div class="row" *ngIf="arena.userId==userId && arena.user_played==true||arena.inviteId==userId&& arena.invite_played==true">
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

<div *ngIf=" arena.user_played==true&&arena.invite_played==true">
<button type="button" class="btn btn-primary" (click)="showResult(arena.arenaId)">Show results</button>
</div>
    <modal #myModal [keyboard]="false" [backdrop]="'static'">
        <modal-header [show-close]="false">
            <h4 class="modal-title">You played against {{ arena.lastName }}</h4>
        </modal-header>
        <modal-body>
        Click ok to accept the prize!!
        </modal-body>
        <modal-footer [show-default-buttons]="true"></modal-footer>
    </modal>
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
    @ViewChild('myModal')
    modal: ModalComponent;
    ngOnInit(): void {
        this.userId=this.userIdService.getUserId();
    }
    @Input() arena:ArenaUsers;
    private userId;
    private result;

    constructor(private userIdService:AuthService,private gameListService:GameListServices){}


    showResult(arenaId)
    {

        var arenaUserId=new ArenaUserId(this.userId,arenaId)
        this.gameListService.getResult(arenaUserId)
            .subscribe(
                (data:Data)=> {


                    console.log(data);
                });
        this.modal.open();



    }

/*    endSub(arenaId){
        var sub= this.mainAppService.getResult(this.userId,arenaId)
            .subscribe(
                (data:Data)=> {


                    console.log(data);
                });
        sub.unsubscribe();


    }*/




}