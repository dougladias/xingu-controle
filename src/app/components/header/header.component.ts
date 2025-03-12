import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd, Event, RouterEvent } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface RouteInfo {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentTitle: string = 'Controle de Estoque';
  currentIcon: string = 'fa-solid fa-chart-line';
  
  // Mapeamento de rotas para títulos e ícones
  private routeMap: { [key: string]: RouteInfo } = {
    'home': { title: 'Dashboard', icon: 'fa-solid fa-landmark-dome' },
    'products': { title: 'Produtos', icon: 'fa-solid fa-warehouse' },
    'product-create': { title: 'Cadastro de Produto', icon: 'fa-solid fa-plus' },
    // Adicione mais rotas conforme necessário
  };

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHeaderContent(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    // Define o título inicial com base na URL atual
    this.updateHeaderContent(this.router.url);
  }

  private updateHeaderContent(url: string): void {
    // Remove a barra inicial e pega a primeira parte da rota
    const route = url.split('/')[1] || 'home';
    
    if (this.routeMap[route]) {
      this.currentTitle = this.routeMap[route].title;
      this.currentIcon = this.routeMap[route].icon;
    } else {
      // Valor padrão caso a rota não esteja mapeada
      this.currentTitle = 'Controle de Estoque';
      this.currentIcon = 'fa-solid fa-chart-line';
    }
  }
}