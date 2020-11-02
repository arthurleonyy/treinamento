import { from } from 'rxjs';
import { Routes, RouterModule } from "@angular/router";
import {ContaComponent } from './conta.component';
import { Component, NgModule } from '@angular/core';
import { DepositoComponent } from '../deposito/deposito.component';

const routes: Routes = [
    {
        path: '',
        component: ContaComponent,
        
    },
{  
    path: 'deposito',
    component: DepositoComponent
}  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContaRoutingModule { }