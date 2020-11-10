<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Location } from '@angular/common';
import { Component } from '@angular/core';
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
<<<<<<< HEAD
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
=======
export class PaginaNaoEncontradaComponent {

  constructor(private location: Location)  { }

  backClicked() {
    this.location.back();
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
  }

}
