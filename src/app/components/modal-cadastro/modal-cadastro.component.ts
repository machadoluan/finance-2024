import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal-cadastro',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './modal-cadastro.component.html',
  styleUrl: './modal-cadastro.component.scss'
})
export class ModalCadastroComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    
  }

  nome: string = "";
  email: string = "";
  senha: string = "";

  cadastrar(){
    this.authService.cadastro(this.nome, this.email, this.senha).subscribe(
      (resposta) => {
        alert("Usuario cadastrado!")
      },
      (erro) => {
        alert("Não foi possivel cadastrar o usuario!")
        console.log(erro)
      }
    )
  }

}
