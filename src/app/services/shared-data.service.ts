import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  entradas: { descricao: string, valor: string, tipo: string }[] = [];
  saidas: { descricao: string, valor: string, tipo: string }[] = [];

  constructor(private http: HttpClient) { }

  atualizarEntradas(): void {
    this.http.get<any[]>('https://backend-api-orpin.vercel.app/entradas')
      .subscribe(data => {
        // Formatando os valores para o formato de moeda brasileiro (R$)
        this.entradas = data.map(entrada => ({
          descricao: entrada.descricao,
          valor: this.formatarValorMonetario(entrada.valor),
          tipo: entrada.tipo
        }));
      });
  }

  atualizarSaidas(): void {
    this.http.get<any[]>('https://backend-api-orpin.vercel.app/saidas')
      .subscribe(data => {
        // Formatando os valores para o formato de moeda brasileiro (R$)
        this.saidas = data.map(saida => ({
          descricao: saida.descricao,
          valor: this.formatarValorMonetario(saida.valor),
          tipo: saida.tipo
        }));
      });
  }

  // Função para formatar o valor monetário para o formato brasileiro (R$)
  private formatarValorMonetario(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
