import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin, AuthTokens } from '../../modules/auth/models/auth.model';
import { Cargo, Cidade, NewUser, UserUpdate, Usuario, CargoPermissao, Permissao } from '../../modules/account/models/user.model';
import { Produto, Cliente, Pedido } from '../../modules/commerce/models';
import { Credito } from '../../modules/financial/modal/credit.modal';
import { environment } from '../../../environments/environment';

@Injectable()
export class AzzoService {
  private baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Autenticação
  login(login: AuthLogin) {
    return this.http.post<AuthTokens>(`${this.baseUrl}auth/login`, login);
  }

  // Usuários
  getUserById(id: number) {
    return this.http.get<Usuario>(`${this.baseUrl}users/${id}`);
  }

  updateUser(userId: number, user: UserUpdate) {
    return this.http.put<Usuario>(`${this.baseUrl}users/${userId}`, user);
  }

  getAllUsers() {
    return this.http.get<Usuario[]>(`${this.baseUrl}users`);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.baseUrl}users/${userId}`);
  }

  // Cidades
  getAllCities() {
    return this.http.get<Cidade[]>(`${this.baseUrl}shared/cities`);
  }

  getCitiesPartial(query: string) {
    return this.http.get<Cidade[]>(`${this.baseUrl}shared/cities/partial`, {
      params: { q: query },
    });
  }

  // Registro de Usuários
  newUser(user: NewUser) {
    return this.http.post<Usuario>(`${this.baseUrl}auth/register`, user);
  }

  // Cargos e Permissões
  getRoles() {
    return this.http.get<Cargo[]>(`${this.baseUrl}roles`);
  }

  createRole(cargo: { nome: string; permissoes: CargoPermissao[] }) {
    return this.http.post<Cargo>(`${this.baseUrl}roles/create`, cargo);
  }

  updateRole(
    roleId: number,
    payload: {
      nome: string;
      permissoes: { permissao_id: number; ler: number; editar: number; criar: number }[];
    },
  ) {
    return this.http.put<Cargo>(`${this.baseUrl}roles/update/${roleId}`, payload);
  }

  getRoleById(roleId: number) {
    return this.http.get<Cargo>(`${this.baseUrl}roles/${roleId}`);
  }

  deleteRole(roleId: number) {
    return this.http.delete(`${this.baseUrl}roles/delete/${roleId}`);
  }

  getUsersByRole(roleId: number) {
    return this.http.get<Usuario[]>(`${this.baseUrl}roles/${roleId}/users`);
  }

  getPermissions() {
    return this.http.get<Permissao[]>(`${this.baseUrl}roles/permission`);
  }

  // Upload de Fotos
  uploadUserPhoto(userId: number, formData: FormData) {
    return this.http.post<{ message: string; fotoUrl: string }>(`${this.baseUrl}users/${userId}/foto`, formData);
  }

  // Produtos
  getProducts() {
    return this.http.get<Produto[]>(`${this.baseUrl}products`);
  }

  getProductByCode(id: number) {
    return this.http.get<Produto>(`${this.baseUrl}products/${id}`);
  }

  // Clientes
  getCustomers() {
    return this.http.get<Cliente[]>(`${this.baseUrl}customers`);
  }

  getCustomerByCode(codigo: number) {
    return this.http.get<Cliente>(`${this.baseUrl}customers/${codigo}`);
  }

  // Pedidos
  getAllOrders() {
    return this.http.get<Pedido[]>(`${this.baseUrl}sells`);
  }

  getOrderById(id: number) {
    return this.http.get<Pedido>(`${this.baseUrl}sells/${id}`);
  }

  getOrdersByDate(fromDate: string) {
    return this.http.get<Pedido[]>(`${this.baseUrl}sells?fromDate=${fromDate}`);
  }

  syncroAllOrders() {
    return this.http.get<{ message: string }>(`${this.baseUrl}sells/syncro`);
  }

  //Financeiro
  getFinancialCredits() {
    return this.http.get<Credito[]>(`${this.baseUrl}credits`);
  }

  getFinancialCreditsByDateRange(fromDate: string, toDate: string) {
    return this.http.get<Credito[]>(`${this.baseUrl}credits/date?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
