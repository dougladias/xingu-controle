import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateToProductCreate(): void {
    console.log('Navegando...');
}

}
