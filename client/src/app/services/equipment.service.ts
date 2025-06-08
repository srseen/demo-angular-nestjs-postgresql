import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Equipment {
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  purchaseDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private api = 'http://server:3000/equipment';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.api);
  }

  get(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.api}/${id}`);
  }

  create(data: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.api, data);
  }

  update(id: number, data: Equipment): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
