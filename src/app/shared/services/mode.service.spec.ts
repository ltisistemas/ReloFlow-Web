import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        ModeService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ModeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with user mode', (done) => {
    // Criar novo service após limpar localStorage
    localStorage.removeItem('view_mode');
    const newService = TestBed.inject(ModeService);
    newService.mode$.subscribe(mode => {
      expect(mode).toBe('user');
      done();
    });
  });

  it('should toggle mode', (done) => {
    const currentMode = service.getCurrentMode();
    const newMode = currentMode === 'user' ? 'company' : 'user';
    service.setMode(newMode);
    service.mode$.subscribe(mode => {
      expect(mode).toBe(newMode);
      done();
    });
  });

  it('should set mode', (done) => {
    service.setMode('company');
    service.mode$.subscribe(mode => {
      expect(mode).toBe('company');
      done();
    });
  });

  it('should persist mode in localStorage', () => {
    service.setMode('company');
    expect(localStorage.getItem('view_mode')).toBe('company');
  });
});


