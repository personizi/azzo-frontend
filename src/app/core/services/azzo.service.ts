import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin, AuthTokens } from '../../modules/auth/models/auth.model';
import { Cidade, UserUpdate, Usuario } from 'src/app/modules/account/models/user.model';


@Injectable()

export class AzzoService {
    private baseUrl: string;
  constructor( private readonly http: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/';
  }

  login(login: AuthLogin) {
    return this.http.post<AuthTokens>(`${this.baseUrl}auth/login`, login);
  }

  getUserById(id: number) {
    return this.http.get<Usuario>(`${this.baseUrl}users/${id}`);
  }

  UpdateUser(userId: number, user: UserUpdate) {
    return this.http.put<Usuario>(`${this.baseUrl}users/${userId}`, user);
  }

  getAllCities() {
    return this.http.get<Cidade[]>(`${this.baseUrl}shared/cities`);
  }

  getCitiesPartial(query: string) {
    return this.http.get<Cidade[]>(`${this.baseUrl}shared/cities/partial`, {
      params: { q: query },
    });
  }  
}