import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-mode',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-mode.component.html',
  styleUrl: './user-mode.component.scss'
})
export class UserModeComponent {
  // TODO: Implementar funcionalidades do modo usuário
  // - Ver fluxos existentes
  // - Importar documentos
  // - Acompanhar processos
}

