import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counts: any;
  Price_counts: any;
  rows: any = [{ type: "Dog", name: "dog1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" },
  { type: "Cat", name: "cat1" }];
  searchQR: any;
  doctor_list: any;
  sp_list: any;
  Vendor_list: any;

  constructor(
    private _api: ApiService,  @Inject(SESSION_STORAGE) private storage: StorageService, private router:Router
  ) {
    // login_status
if(this.getFromLocal("login_status") === false)
{
  this.router.navigate(['login']);
}

   }

  ngOnInit(): void {
    this._api.dashboard_count().subscribe((res: any) => {
      console.log("fgfd",res)
      this.counts = res.Data;
    });

    this._api.prices_count().subscribe((res: any) => {
      console.log("fgfd",)
      this.Price_counts = res.Data;
    });


    this._api.doctor_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.doctor_list = response.Data;
        console.log(this.doctor_list);
      }
    );
    this._api.service_provider_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.sp_list = response.Data;
      }
    );
    this._api.vendor_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.Vendor_list = response.Data;
      }
    );

  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}
