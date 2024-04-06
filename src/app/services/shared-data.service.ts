import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  entradas: { descricao: string, valor: string, tipo: string }[] = [];
  saidas: { descricao: string, valor: string, tipo: string }[] = [];

  constructor(private http: HttpClient,  ) { }
  
  atualizarEntradas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>('http://localhost:3001/entradas')
        .subscribe(data => {
          // Formatando os valores para o formato de moeda brasileiro (R$)
          this.entradas = data.map(entrada => ({
            descricao: entrada.descricao,
            valor: entrada.valor,
            tipo: entrada.tipo
          }));
          resolve(); // Resolve a Promise quando as entradas são atualizadas
        });
    });
  }

  atualizarSaidas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>('http://localhost:3001/saidas')
        .subscribe(data => {
          // Formatando os valores para o formato de moeda brasileiro (R$)
          this.saidas = data.map(saida => ({
            descricao: saida.descricao,
            valor: saida.valor,
            tipo: saida.tipo
          }));
          resolve(); // Resolve a Promise quando as saídas são atualizadas
        });
    });
  }
}
