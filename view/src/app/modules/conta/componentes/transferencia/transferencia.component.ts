import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuario = {id:1 , nome: "Paulo Henrique Roque da Silva" , email: "Paulo@gmail.com"}
}
