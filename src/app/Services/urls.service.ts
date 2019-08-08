import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLsService {

  static url = 'https://contacts-telran.herokuapp.com/api';

  static urlLogin = '/login';
  static urlRegister = '/registration';
  static urlContacts = '/contact';
  static urlAdd = '/contact';
  static urlCorrect = '/contact';

  constructor() { }


}
