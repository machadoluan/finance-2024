import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { ModalAddComponent } from '../../components/modal-add/modal-add.component';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../../components/add-modal/add-modal.component';


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {
  entradas: {  descricao: string, valor: string, tipo: string, id: number}[] = [];
  saidas: { descricao: string, valor: string, tipo: string, id: number }[] = [];
  usuario: { nome: string, email: string, senha: string, data: string, id: number }[] = [];


  perfilParaExcluir: any;

  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;

  expanded: string | null = null;

  constructor(
    private authGuard: AuthGuard,
    private dialog: MatDialog,
    private router: Router,
    public sharedDataService: SharedDataService,
    

  ) { }

  ngOnInit(): void {
    this.carregarDados()
  }

  formatarParaReal(numero) {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  carregarDados(): void {
    this.sharedDataService.atualizarEntradas().then(() => {
      this.entradas = this.sharedDataService.entradas;
    });

    this.sharedDataService.atualizarSaidas().then(() => {
      this.saidas = this.sharedDataService.saidas;
    });
  }

  excluirEntrada(entradaId: number): void {
    this.sharedDataService.excluirEntrada(entradaId)
      .then(() => {
        alert("Entrada N°: " + entradaId + " foi excluida!")
      })
      .catch(error => {
        alert("Erro ao excluir a entrada N°: " + entradaId)

      });
  }

  excluirSaida(saidaId: number): void {
    this.sharedDataService.excluirSaida(saidaId)
      .then(() => {
        alert("Saida N°: " + saidaId + " foi excluida!")
      })
      .catch(error => {
        alert("Erro ao excluir a saida N°: " + saidaId)
      });
  }



  toggleExpansion(card: string): void {
    this.expanded = this.expanded === card ? null : card;
    console.log('Card clicado:', card);
    console.log('Estado expandido:', this.expanded);
  }

  button() {
    this.dialog.open(AddModalComponent)
  }

  home() {
    this.router.navigate(['/dashboard'])
  }

  logout() {
    this.authGuard.logout()
  }
}
