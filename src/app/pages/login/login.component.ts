import { Component, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalCadastroComponent } from '../../components/modal-cadastro/modal-cadastro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userEmail: string = "";
  senha: string = '';
  emailInvalid: boolean = false;
  credenciasInvalidas: boolean = false;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
    ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  get dadosForm() {
    return this.loginForm.controls;
  }


  loginUser() {

    this.emailInvalid = !this.validateEmail(this.userEmail)

    if (!this.emailInvalid){
      this.authService.login(this.userEmail, this.senha).subscribe(
      (resposta) => {
        this.router.navigate(['/dashboard']);
      },
      (erro) => {
        // Manipular erros de autenticação aqui
        console.error('Erro de autenticação:', erro);
        this.credenciasInvalidas = true
      }
    );
    }
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  openDialog() {
    const senhaAdmin = prompt("Digite a senha de administrador")

    if(senhaAdmin === "SistemaFinance"){
      this.dialog.open(ModalCadastroComponent);
    } else {
      window.alert("Senha Invalida!")
    }
  }

  toggleHide() {
    this.hide = !this.hide;
  }
}
