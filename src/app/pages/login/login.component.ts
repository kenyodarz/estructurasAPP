// Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
//Servicios
import { MessageService } from 'primeng/api';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { PersonaService } from 'src/app/core/services/persona.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm: UntypedFormGroup;
  constructor(
    private personaService: PersonaService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.personaService.validarPersona(this.loginForm.value).subscribe(
      (data) => {
        this.tokenStorage.guardarToken(data.cedulaPersona);
        this.tokenStorage.guardarUsuario(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.messageService.add({
          severity: 'success',
          summary: '¡¡¡Correcto!!!',
          detail: `Bienvenido ${data.nombrePersona} ${data.apellidoPersona}`,
        });
        this.router.navigate(['/resumen']);
      },
      (err) => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed:',
          detail: this.errorMessage,
        });
      }
    );
  }

  mostrarBtn() {
    const pass_field = document.querySelector('.pass__key');
    const showBtn = document.querySelector('.show');
    if (pass_field.getAttribute('type') === 'password') {
      pass_field.setAttribute('type', 'text');
      showBtn.textContent = 'Ocultar';
    } else {
      pass_field.setAttribute('type', 'password');
      showBtn.textContent = 'Mostrar';
    }
  }

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }
}
