import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from '../../modules/company/domain/interface/company.interface';

export type ViewMode = 'company' | 'user';

const MODE_KEY = 'view_mode';
const SELECTED_COMPANY_KEY = 'selected_company';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly modeSubject = new BehaviorSubject<ViewMode>(this.getStoredMode());
  private readonly selectedCompanySubject = new BehaviorSubject<Company | null>(this.getStoredCompany());

  public readonly mode$ = this.modeSubject.asObservable();
  public readonly selectedCompany$ = this.selectedCompanySubject.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMode();
    }
  }

  private initializeMode(): void {
    const mode = this.getStoredMode();
    const company = this.getStoredCompany();
    this.modeSubject.next(mode);
    this.selectedCompanySubject.next(company);
  }

  getCurrentMode(): ViewMode {
    return this.modeSubject.value;
  }

  setMode(mode: ViewMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.modeSubject.next(mode);
    localStorage.setItem(MODE_KEY, mode);
  }

  getSelectedCompany(): Company | null {
    return this.selectedCompanySubject.value;
  }

  setSelectedCompany(company: Company | null): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.selectedCompanySubject.next(company);
    if (company) {
      localStorage.setItem(SELECTED_COMPANY_KEY, JSON.stringify(company));
    } else {
      localStorage.removeItem(SELECTED_COMPANY_KEY);
    }
  }

  private getStoredMode(): ViewMode {
    if (!isPlatformBrowser(this.platformId) || !window.localStorage) {
      return 'user';
    }
    const stored = localStorage.getItem(MODE_KEY);
    return (stored === 'company' || stored === 'user') ? stored : 'user';
  }

  private getStoredCompany(): Company | null {
    if (!isPlatformBrowser(this.platformId) || !window.localStorage) {
      return null;
    }
    const stored = localStorage.getItem(SELECTED_COMPANY_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Company;
      } catch {
        return null;
      }
    }
    return null;
  }
}

