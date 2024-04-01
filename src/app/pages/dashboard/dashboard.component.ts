import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from '../../components/modal-add/modal-add.component';
import { AuthGuard } from '../../auth.guard';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authGuard: AuthGuard,
    public sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.atualizarEntradas();
    this.sharedDataService.atualizarSaidas();
    this.entradas = this.sharedDataService.entradas;
    this.saidas = this.sharedDataService.saidas;

    console.log("Entradas:", this.entradas);
    console.log("Saídas:", this.saidas);
  }

  button() {
    this.modalService.open(ModalAddComponent, { size: 'xl' })
  }

  logout() {
    this.authGuard.logout()
  }
}
