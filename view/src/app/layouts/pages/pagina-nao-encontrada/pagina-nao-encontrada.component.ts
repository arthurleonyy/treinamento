<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Location } from '@angular/common';
import { Component } from '@angular/core';
>>>>>>> origin/develop

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
>>>>>>> origin/develop
  }

}
