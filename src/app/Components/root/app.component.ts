import { Component } from '@angular/core';
import {DataExchangeService} from '../../Services/data-exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  getPage() {
    return DataExchangeService.getPage();
  }
}
