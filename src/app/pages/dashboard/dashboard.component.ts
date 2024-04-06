import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from '../../components/modal-add/modal-add.component';
import { AuthGuard } from '../../auth.guard';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  entradas: { descricao: string, valor: string, tipo: string }[] = [];
  saidas: { descricao: string, valor: string, tipo: string }[] = [];
  nome: string = ""
  totalEntradas: number = 0;
  totalSaidas: number = 0;
  total: number = 0
  userData: any;
  entradaFormatado: number = 0
  saidaFormatado: number = 0
  totalFromatado: number = 0

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authGuard: AuthGuard,
    public sharedDataService: SharedDataService,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.nome = this.authentication.getUserFromToken()?.nome;
    this.carregarDados()
  }

  carregarDados(): void {
    this.sharedDataService.atualizarEntradas().then(() => {
      this.entradas = this.sharedDataService.entradas;
      this.calcularTotalEntradas();
      this.calcularTotal();
    });

    this.sharedDataService.atualizarSaidas().then(() => {
      this.saidas = this.sharedDataService.saidas;
      this.calcularTotalSaidas()
      this.calcularTotal();
    });
  }

  formatarParaReal(numero) {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  calcularTotalEntradas(): void {
    this.totalEntradas = 0;
    this.entradas.forEach(entrada => {
      this.totalEntradas += parseFloat(entrada.valor);
    });
    this.entradaFormatado = this.formatarParaReal(this.totalEntradas);
  }

  calcularTotalSaidas(): void {
    this.totalSaidas = 0;
    this.saidas.forEach(saida => {
      this.totalSaidas += parseFloat(saida.valor);
    });
    this.saidaFormatado = this.formatarParaReal(this.totalSaidas);
  }

  calcularTotal(): void {
    this.total = this.totalEntradas - this.totalSaidas;
    this.totalFromatado = this.formatarParaReal(this.total)
  }

  button() {
    this.modalService.open(ModalAddComponent, { size: 'xl' })
  }

  config() {
    this.router.navigate(['/config']);
  }

  logout() {
    this.authGuard.logout()
  }
}
