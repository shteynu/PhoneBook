import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../Services/util.service';
import {PatternsService} from '../../Services/patterns.service';
import {HttpService} from '../../Services/http.service';
import {DataExchangeService} from '../../Services/data-exchange.service';
import {observable, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  signIn = true;


  loginSubscription: Subscription;
  registerSubscription: Subscription;

  loginFC = new FormControl('',
    [Validators.required, Validators.pattern(PatternsService.emailPattern)]);
  passwordFC = new FormControl('',
    [Validators.required, Validators.pattern(PatternsService.passwordPattern)]);

  authFG = new FormGroup({
    email: this.loginFC,
    password: this.passwordFC
});

  constructor(private util: UtilService,
              private http: HttpService) { }

  ngOnInit() {
  }

  authSubmit() {
    if (this.authFG.invalid) {
      return;
    } else {
      this.sendAuthInfo (this.authFG.value);
    }
  }

  sendAuthInfo(info) {
    if (this.signIn) {
      this.loginSubscription = this.http.login(info).subscribe(
        (result) => {
          localStorage.setItem('contact', (result as any).token);
          /*         console.log(localStorage.getItem('contact'));*/
          this.util.refresh('phonebook');
        },
        (error) => {
          console.log(error);
          this.util.snack(error.error.message);
        }
      );
    }
    // console.log(info);
  }

  getLoginError() {
  /*  if (this.loginFC.hasError('required')) {
      return 'empty login';
    }
    if (this.loginFC.hasError('pattern')) {
      return 'not valid email';
    }*/
  return this.util.getRequiredPatternError(this.loginFC, 'empty login', 'not valid email');
  }

  getPasswordError() {
  /*  if (this.passwordFC.hasError('required')) {
      return 'empty password';
    }
    if (this.passwordFC.hasError('pattern')) {
      return 'not valid password';
    }*/
    return this.util.getRequiredPatternError(this.passwordFC, 'empty password', 'not valid password');
  }

  toggleSignin() {
    this.signIn = !this.signIn;
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
