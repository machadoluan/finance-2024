import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SharedDataService } from '../../services/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {
  descricao: string = '';
  valor: number

  ;
  tipo: string = 'Entrada';

  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit(): void { }


  cancelar() {
    this.dialog.closeAll()
    window.location.reload()

  }

  saida(): void {
    this.tipo = "Saida"
    this.http.post('http://localhost:3001/adicionar-saida', { descricao: this.descricao, valor: this.valor, tipo: this.tipo })
      .subscribe(response => {
        // Atualiza a lista de saídas no serviço compartilhado
        this.sharedDataService.atualizarSaidas();
      });

  }

  entrada(): void {
    this.tipo = "Entrada"
    this.http.post('http://localhost:3001/adicionar-entrada', { descricao: this.descricao, valor: this.valor, tipo: this.tipo })
      .subscribe(response => {
        // Atualiza a lista de entradas no serviço compartilhado
        this.sharedDataService.atualizarEntradas();
      });

  }
}
