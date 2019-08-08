import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataExchangeService} from '../../Services/data-exchange.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpService} from '../../Services/http.service';
import {UtilService} from '../../Services/util.service';
import {trigger, state, style, animate, transition, animation} from '@angular/animations';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
  animations: [
    trigger('fullInfo', [
      state('open', style({})),
      state('closed', style({height: '0'})),

       transition('closed=>open', [animate('500ms')]),
      transition('open=>closed', [animate('300ms')])
    ])
  ]
})
export class PhoneBookComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['select', 'name', 'lastName', 'phone'];
  dataSource = new MatTableDataSource(DataExchangeService.getContacts());
  checkedContacts = [];
  expandedRow: null;

  constructor(private http: HttpService,
              private util: UtilService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cbListener(id) {
    if (this.checkedContacts.includes(id)) {
      this.checkedContacts.splice(this.checkedContacts.indexOf(id), 1);
    } else {
      this.checkedContacts.push(id);
    }
  }

  addContact() {
    DataExchangeService.setContactToCorrect({});
    DataExchangeService.setPage('contact');
  }

  correctContact() {
    DataExchangeService.setContactToCorrect(
    DataExchangeService.getContacts().find((c) => c.id === this.checkedContacts[0])
  );
    DataExchangeService.setPage('contact');

  }


  removeContacts() {
    if (this.checkedContacts.length === 0) {
      this.http.getAll().subscribe(
        (success) => { DataExchangeService.setContacts((success as any).contacts);
                       this.dataSource = new MatTableDataSource(DataExchangeService.getContacts());
                       this.ngAfterViewInit();
        }
      );
      return; }

    this.http.deleteContact(this.checkedContacts[0])
      .subscribe(() => {this.checkedContacts.shift(); this.removeContacts(); });
  }

  stopProp(event) {
    event.stopPropagation();
  }

  logOut() {
      localStorage.removeItem('contact');
      DataExchangeService.setPage('auth');
  }

  refreshData() {
    this.http.getAll().subscribe(
      (success) => {
        DataExchangeService.setContacts((success as any).contacts);
        this.dataSource = new MatTableDataSource(DataExchangeService.getContacts());
        this.ngAfterViewInit();
      });
  }
}
