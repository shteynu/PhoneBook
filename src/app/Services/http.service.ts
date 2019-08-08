import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLsService} from './urls.service';
import {until} from 'selenium-webdriver';
import urlIs = until.urlIs;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(authInfo) {
    return this.http.post(URLsService.url + URLsService.urlLogin, authInfo);
  }

  register(authInfo) {
    return this.http.post(URLsService.url + URLsService.urlRegister, authInfo);
  }

  getAll() {
    return this.http.get(URLsService.url + URLsService.urlContacts,
      {headers: {Authorization: localStorage.getItem('contact')}});
  }

  sendContact(data) {
    return this.http.post(URLsService.url + URLsService.urlAdd, data,
      {headers: {Authorization: localStorage.getItem('contact')}});

  }
  correctContact(data) {
    return this.http.put(URLsService.url + URLsService.urlCorrect, data,
      {headers: {Authorization: localStorage.getItem('contact')}});
  }
  deleteContact(id) {
    return this.http.delete(URLsService.url + URLsService.urlCorrect + '/' + id,
      {headers: {Authorization: localStorage.getItem('contact')}});
  }
}
