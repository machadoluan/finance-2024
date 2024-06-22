import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  entradas: { descricao: string, valor: string, tipo: string, id: number}[] = [];
  saidas: { descricao: string, valor: string, tipo: string, id: number }[] = [];
  usuario: { nome: string, email: string, senha: string, data: string, id: number }[] = [];

  constructor(private http: HttpClient,) { }

  atualizarEntradas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>('http://localhost:3001/entradas')
        .subscribe(data => {
          // Formatando os valores para o formato de moeda brasileiro (R$)
          this.entradas = data.map(entrada => ({
            descricao: entrada.descricao,
            valor: entrada.valor,
            tipo: entrada.tipo,
            id: entrada.id
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
            tipo: saida.tipo,
            id: saida.id
          }));
          resolve(); // Resolve a Promise quando as saídas são atualizadas
        });
    });
  }

  excluirEntrada(entradaId: number): Promise<void> {
    return this.http.delete<void>(`http://localhost:3001/entradas/${entradaId}`)
      .toPromise()
      .then(() => {
        console.log('Entrada excluida com sucesso.');
        // Atualiza a lista de usuários após a exclusão
        return this.atualizarEntradas();
      })
      .catch(error => {
        console.error('Erro ao excluir perfil:', error);
        throw error; // Lança o erro para tratamento no componente
      });
  }

  excluirSaida(saidaId: number): Promise<void> {
    return this.http.delete<void>(`http://localhost:3001/saidas/${saidaId}`)
      .toPromise()
      .then(() => {
        console.log('Saida excluida com sucesso.');
        // Atualiza a lista de usuários após a exclusão
        return this.atualizarSaidas();
      })
      .catch(error => {
        console.error('Erro ao excluir perfil:', error);
        throw error; // Lança o erro para tratamento no componente
      });
  }



}
