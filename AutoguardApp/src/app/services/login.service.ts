import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8082/login', request);
  }

  verificar(): boolean {
    if (this.isBrowser()) {
      const token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  showRole(): string | null {
    if (this.isBrowser()) {
      const token = sessionStorage.getItem('token');
      if (!token) return null;
      const helper = new JwtHelperService();
      const decodedToken: any = helper.decodeToken(token);

      if (decodedToken?.rol) return decodedToken.rol;
      if (decodedToken?.role) return decodedToken.role;
      if (decodedToken?.authorities?.length > 0) return decodedToken.authorities[0];
    }
    return null;
  }

  getUsername(): string | null {
    if (this.isBrowser()) {
      const token = sessionStorage.getItem('token');
      if (!token) return null;
      const helper = new JwtHelperService();
      const decodedToken: any = helper.decodeToken(token);
      return decodedToken?.sub ?? null;
    }
    return null;
  }
}
