import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private static page = 'auth';
  static contacts = [];
  static contactToCorrect = {};

  constructor() { }

  static getPage() {
    return this.page;
  }

  static setPage(value) {
    this.page = value;
  }

  static getContacts() {
    return this.contacts;
}
  static setContacts(value) {
    this.contacts = value;
  }

  static getContactToCorrect() {
    return this.contactToCorrect;
  }

  static setContactToCorrect(value) {
    this.contactToCorrect = value;
  }

}
