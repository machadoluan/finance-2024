import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  entradas: { descricao: string, valor: string, tipo: string }[] = [];
  saidas: { descricao: string, valor: string, tipo: string }[] = [];
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

  atualizarUsuarios(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>('http://localhost:3001/perfis')
        .subscribe(data => {
          // Formatando os dados conforme necessário
          // Suponha que o formato dos dados seja semelhante aos das entradas e saídas
          // Se necessário, ajuste conforme o formato real dos dados
          // Exemplo:
          this.usuario = data.map(usuario => ({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            data: usuario.data,
            id: usuario.id
          }));
          resolve(); // Resolve a Promise quando os usuários são atualizados
        });
    });
  }

  excluirPerfil(perfilId: number): Promise<void> {
    return this.http.delete<void>(`http://localhost:3001/perfis/${perfilId}`)
      .toPromise()
      .then(() => {
        console.log('Perfil excluído com sucesso.');
        // Atualiza a lista de usuários após a exclusão
        return this.atualizarUsuarios();
      })
      .catch(error => {
        console.error('Erro ao excluir perfil:', error);
        throw error; // Lança o erro para tratamento no componente
      });
  }



}
