import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl="http://localhost:3000/employee";
  constructor(private http:HttpClient) { }
  public getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);


  }
  public addEmployee(employee :Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.baseUrl}/add`,employee);


  }
  public updateEmployee(employee :Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.baseUrl}/update`,employee);


  }
  public deleteEmployee(id:number):Observable<Employee>{
    return this.http.delete<Employee>(`${this.baseUrl}/delete/${id}`);


  }
  public findEmployee(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}/find${id}`);


  }
}
