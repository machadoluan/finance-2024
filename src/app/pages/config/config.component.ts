import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from '../../components/modal-add/modal-add.component';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {
  entradas: { descricao: string, valor: string, tipo: string }[] = [];
  saidas: { descricao: string, valor: string, tipo: string }[] = [];
  usuario: { nome: string, email: string, senha: string, data: string, id: number }[] = [];


  perfilParaExcluir: any;

  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;

  expanded: string | null = null;

  constructor(
    private authGuard: AuthGuard,
    private modalService: NgbModal,
    private router: Router,
    public sharedDataService: SharedDataService,

  ) { }

  ngOnInit(): void {
    this.carregarDados()
    this.carregarUsuarios()
  }

  formatarParaReal(numero) {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  carregarUsuarios(): void {
    this.sharedDataService.atualizarUsuarios().then(() => {
      this.usuario = this.sharedDataService.usuario;
    });
  }
  carregarDados(): void {
    this.sharedDataService.atualizarEntradas().then(() => {
      this.entradas = this.sharedDataService.entradas;
    });

    this.sharedDataService.atualizarSaidas().then(() => {
      this.saidas = this.sharedDataService.saidas;
    });
  }

  excluirPerfil(perfilId: number): void {
    this.sharedDataService.excluirPerfil(perfilId)
      .then(() => {
        
      })
      .catch(error => {
        // Tratamento de erro, se necessário
      });
  }



  toggleExpansion(card: string): void {
    this.expanded = this.expanded === card ? null : card;
    console.log('Card clicado:', card);
    console.log('Estado expandido:', this.expanded);
  }

  button() {
    this.modalService.open(ModalAddComponent, { size: 'xl' })
  }

  home() {
    this.router.navigate(['/dashboard'])
  }

  logout() {
    this.authGuard.logout()
  }
}
