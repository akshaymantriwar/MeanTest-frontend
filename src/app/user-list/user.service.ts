import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/users');
  }

  getUser(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/users/' + id);
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users', user);
  }

  editUser(id: string, user: User): Observable<any> {
    return this.httpClient.put('http://localhost:3000/api/users/' + id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/api/users/' + id);
  }

  uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post('http://localhost:3000/api/upload/', formData);
  }
}
