import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../Services/util.service';
import {PatternsService} from '../../Services/patterns.service';
import {DataExchangeService} from '../../Services/data-exchange.service';
import {HttpService} from '../../Services/http.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  submitSubscription: Subscription;

  initial: any = DataExchangeService.getContactToCorrect();

  nameFC = new FormControl(this.initial.name, [ Validators.required, Validators.pattern(PatternsService.namePattern)]);
  lastNameFC = new FormControl(this.initial.lastName, [ Validators.required, Validators.pattern(PatternsService.namePattern)]);
  phoneFC = new FormControl(this.initial.phone, [Validators.required,
    Validators.pattern(PatternsService.phonePattern)]);
  emailFC = new FormControl(this.initial.email, [ Validators.required, Validators.pattern(PatternsService.emailPattern)]);
  descriptionFC = new FormControl(this.initial.description);
  addressFC = new FormControl(this.initial.address);

  contactFG = new FormGroup(
    { name: this.nameFC,
      lastName: this.lastNameFC,
      phone: this.phoneFC,
      email: this.emailFC,
      address: this.addressFC,
      description: this.descriptionFC
    }
  );


  constructor(private util: UtilService,
              private http: HttpService) { }

  ngOnInit() {
  }

  contactSubmit() {
    if (this.initial.id) {
      this.contactFG.value.id = this.initial.id;
      this.submitSubscription = this.http.correctContact(this.contactFG.value).subscribe(() =>
        this.util.refresh('phonebook'));
    } else {
      this.submitSubscription = this.http.sendContact(this.contactFG.value).subscribe(() =>
        this.util.refresh('phonebook')); }
  }


  getNameError() {
    return this.util.getRequiredPatternError(this.nameFC, 'empty name', 'empty name'); }

  getLastNameError() {
    return this.util.getRequiredPatternError(this.lastNameFC, 'empty name', 'empty name'); }

  getPhoneError() {
    return this.util.getRequiredPatternError(this.phoneFC, 'empty phone', 'empty phone');
  }

  getEmailError() {
    return this.util.getRequiredPatternError(this.emailFC, 'empty e-mail', 'empty e-mail');
  }

  getDescriptionError() {
    return this.util.getRequiredPatternError(this.descriptionFC, 'empty description', 'empty description');
  }

  getAddressError() {
    return this.util.getRequiredPatternError(this.addressFC, 'empty address', 'empty address');
  }

  cancel() {
    DataExchangeService.setPage('phonebook');
  }

  ngOnDestroy(): void {
    if (this.submitSubscription) { this.submitSubscription.unsubscribe(); }
  }
}

