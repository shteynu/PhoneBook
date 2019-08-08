import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpService} from './http.service';
import {DataExchangeService} from './data-exchange.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private matSnackBar: MatSnackBar,
              private http: HttpService) { }

  getRequiredPatternError(fc: FormControl, requiredMsq: string, patternMsq: string): string {
      if (fc.hasError('required')) {
        return requiredMsq;
      }
      if (fc.hasError('pattern')) {
          return patternMsq;
      }
      return '';
  }

  snack(msg) {
          this.matSnackBar.open(msg, null, {duration: 3000, panelClass: 'snack'});
  }

  refresh(target: string) {
    this.http.getAll().subscribe(
      (success) => { DataExchangeService.setContacts((success as any).contacts);
                     DataExchangeService.setPage(target);
                     }
    );
  }


}
