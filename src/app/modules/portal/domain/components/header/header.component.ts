import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../../../auth/domain/services/auth.service';
import { User } from '../../../../auth/domain/interface/auth.interface';
import { ThemeService } from '../../../../../shared/services/theme.service';
import { ModeService, ViewMode } from '../../../../../shared/services/mode.service';
import { CompanyService } from '../../../../company/domain/services/company.service';
import { Company } from '../../../../company/domain/interface/company.interface';
import { VersionService } from '../../../../../shared/services/version.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly modeService = inject(ModeService);
  private readonly companyService = inject(CompanyService);
  private readonly versionService = inject(VersionService);

  @Output() menuToggle = new EventEmitter<void>();

  currentUser: User | null = null;
  isDarkMode = false;
  currentMode: ViewMode = 'user';
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  isLoadingCompanies = false;
  version$: Observable<string> = this.versionService.getVersionString();

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
    
    this.modeService.mode$.subscribe(mode => {
      this.currentMode = mode;
    });

    this.modeService.selectedCompany$.subscribe(company => {
      this.selectedCompany = company;
    });

    this.loadCompanies();
  }

  loadCompanies(): void {
    this.isLoadingCompanies = true;
    this.companyService.getAllCompanies().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.companies = response.data;
          // Se não há empresa selecionada e há empresas disponíveis, seleciona a primeira
          if (!this.selectedCompany && this.companies.length > 0) {
            this.onCompanyChange(this.companies[0].id);
          } else if (this.selectedCompany) {
            // Atualizar empresa selecionada com dados atualizados
            const updatedCompany = this.companies.find(c => c.id === this.selectedCompany?.id);
            if (updatedCompany) {
              this.modeService.setSelectedCompany(updatedCompany);
            }
          }
        }
        this.isLoadingCompanies = false;
      },
      error: (error) => {
        console.error('Erro ao carregar empresas:', error);
        this.isLoadingCompanies = false;
      }
    });
  }

  toggleDrawer(): void {
    this.menuToggle.emit();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }

  toggleMode(): void {
    const newMode: ViewMode = this.currentMode === 'company' ? 'user' : 'company';
    this.modeService.setMode(newMode);
  }

  onCompanyChange(companyId: string): void {
    const company = this.companies.find(c => c.id === companyId);
    if (company) {
      this.modeService.setSelectedCompany(company);
    }
  }

  getUserDisplayName(): string {
    if (!this.currentUser) {
      return 'Usuário';
    }
    const firstName = this.currentUser.firstName || '';
    const lastName = this.currentUser.lastName || '';
    return `${firstName} ${lastName}`.trim() || this.currentUser.email || 'Usuário';
  }

  logout(): void {
    this.authService.signOut();
  }

  openNotifications(): void {
    // TODO: Implementar notificações
    console.log('Abrir notificações');
  }
}

