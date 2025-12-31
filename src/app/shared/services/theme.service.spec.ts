import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let platformId: any;

  beforeEach(() => {
    platformId = 'browser';
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: PLATFORM_ID, useValue: platformId }
      ]
    });
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should toggle theme', () => {
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('dark');
    
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should set theme', () => {
    service.setTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');
    
    service.setTheme('light');
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should persist theme in localStorage', () => {
    service.setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});


