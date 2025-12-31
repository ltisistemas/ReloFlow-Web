import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface VersionInfo {
    version: string;
    buildDate: string;
    branch: string;
    buildType: string;
}

@Injectable({
    providedIn: 'root'
})
export class VersionService {
    private readonly http = inject(HttpClient);
    private versionCache: VersionInfo | null = null;

    getVersion(): Observable<VersionInfo | null> {
        if (this.versionCache) {
            return of(this.versionCache);
        }

        return this.http.get<VersionInfo>('/version.json', { responseType: 'json' }).pipe(
            map(version => {
                this.versionCache = version;
                return version;
            }),
            catchError(() => {
                // Se não encontrar o arquivo, retorna versão padrão
                const defaultVersion: VersionInfo = {
                    version: '0.0.0',
                    buildDate: new Date().toISOString(),
                    branch: 'unknown',
                    buildType: 'development'
                };
                this.versionCache = defaultVersion;
                return of(defaultVersion);
            })
        );
    }

    getVersionString(): Observable<string> {
        return this.getVersion().pipe(
            map(version => version?.version || '0.0.0')
        );
    }
}

