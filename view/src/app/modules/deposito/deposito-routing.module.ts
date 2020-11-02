import { from } from 'rxjs';
import { Routes, RouterModule } from "@angular/router";
import {DepositoComponent } from './deposito.component';
import { Component, NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: DepositoComponent,
    
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    
    ],
    exports: [RouterModule]
})
export class DepositoRoutingModule { }