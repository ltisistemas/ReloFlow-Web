import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { ModeService } from '../../../../../shared/services/mode.service';
import { CompanyService } from '../../../../company/domain/services/company.service';
import { LeadService } from '../../../../lead/domain/services/lead.service';
import { Company } from '../../../../company/domain/interface/company.interface';
import { Lead } from '../../../../lead/domain/interface/lead.interface';

interface DashboardMetrics {
  totalLeads: number;
  leadsByPosition: { [positionName: string]: number };
  pendingLeads: number;
  cancelledLeads: number;
  recentLeads: Lead[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly modeService = inject(ModeService);
  private readonly companyService = inject(CompanyService);
  private readonly leadService = inject(LeadService);
  private readonly destroy$ = new Subject<void>();

  selectedCompany: Company | null = null;
  metrics: DashboardMetrics = {
    totalLeads: 0,
    leadsByPosition: {},
    pendingLeads: 0,
    cancelledLeads: 0,
    recentLeads: []
  };
  isLoading = false;

  ngOnInit(): void {
    this.modeService.selectedCompany$
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company | null) => {
        this.selectedCompany = company;
        if (company) {
          this.loadDashboardData(company);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(company: Company): void {
    this.isLoading = true;

    this.leadService.getLeadsByCompany(company.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const leads = response.data;
          this.calculateMetrics(leads, company);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados do dashboard:', error);
        this.isLoading = false;
      }
    });
  }

  calculateMetrics(leads: Lead[], company: Company): void {
    this.metrics.totalLeads = leads.length;
    this.metrics.leadsByPosition = {};
    this.metrics.pendingLeads = 0;
    this.metrics.cancelledLeads = 0;

    leads.forEach(lead => {
      const position = company.positions.find(p => p.id === lead.companyPositionId);
      if (position) {
        this.metrics.leadsByPosition[position.name] = (this.metrics.leadsByPosition[position.name] || 0) + 1;
      }

      if (position?.name === 'Pendências') {
        this.metrics.pendingLeads++;
      } else if (position?.name === 'Cancelados') {
        this.metrics.cancelledLeads++;
      }
    });

    // Ordenar leads recentes (últimos 5)
    this.metrics.recentLeads = [...leads]
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      .slice(0, 5);
  }

  getPositionKeys(): string[] {
    return Object.keys(this.metrics.leadsByPosition);
  }
}


