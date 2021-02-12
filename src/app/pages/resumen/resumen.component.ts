import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  isAdmin: boolean = false;
  items: MenuItem[];
  usuario: string = '';

  constructor(private token: TokenStorageService) {}

  loginOut() {
    this.token.signOut();
  }

  ngOnInit(): void {
    this.isAdmin = this.token.obtenerUsuario().esAdministrador;
    this.usuario = `${this.token.obtenerUsuario().nombrePersona} ${
      this.token.obtenerUsuario().apellidoPersona
    }`;
    this.items = [
      {
        label: this.token.obtenerUsuario().usuario,
      },
      {
        label: this.token.obtenerUsuario().cedulaPersona,
      },
      { label: this.token.obtenerUsuario().telefonoPersona },
      { separator: true },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        routerLink: ['/login'],
        command: () => this.loginOut(),
      },
    ];
  }
}
