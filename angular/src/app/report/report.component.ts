import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
import { ExcelExportService } from '../services/excel-export.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  options: string[] = [];
  users: string[] = [];
  selectedAsset = '';
  selectedUser = '';
  auditLogs: any[] = [];
  constructor(private router: Router, private logser: LoginserviceService, private modalService: NgbModal, private ExcelExportService: ExcelExportService) { }
  ngOnInit(): void {

    if (this.logser.currentuser.Username != '') {
      this.loadFilterOptions();
      // this.logser.getAllAssets()
      //   .subscribe((logs: any) => {
      //     console.log("Report :")
      //     console.log(logs)
      //     for (let y = 0; y < logs.length; y++) {
      //       this.options.push(logs[y]['AssetId']);
      //       if (logs[y]['Tofacility'] != '' && !this.users.includes(logs[y]['Tofacility']))
      //         this.users.push(logs[y]['Tofacility'])
      //     }
      //   });
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  // onAssetSelectChange() {
  //   if (this.selectedAsset != '') {
  //     this.fetchAuditLogs(this.selectedAsset);
  //   }
  //   if (this.selectedUser != '') {
  //     this.fetchAuditLogsUsers(this.selectedUser);
  //   }

  // }

  // fetchAuditLogs(assetId: string) {
  //   this.logser.getAuditLogs(this.selectedAsset)
  //     .subscribe((logs: any) => {
  //       this.auditLogs = logs;
  //     });
  // }
  // fetchAuditLogsUsers(userId: string) {
  //   this.logser.getAuditLogsuser(this.selectedUser)
  //     .subscribe((logs: any) => {
  //       this.auditLogs = logs;
  //       console.log("audit Logs")
  //       console.log(this.auditLogs)
  //     });
  // }
  gotocity() {
    this.router.navigate(["maincity"]);
  }


  showsample(report: any) {
    this.modalService.open(report, { windowClass: "reportclass" });
  }

  cityOptions: string[] = [];
  brandOptions: string[] = [];
  current_locationOptions: string[] = [];
  exit_locationOptions: string[] = [];
  entry_locationOptions: string[] = [];
  statusOptions: string[] = [];
  roleOptions: string[] = [];
  BottleTypeOptions: string[] = [];
  currentRefillOptions: string[] = [];
  TransactionIdOptions: string[] = [];
  assetIdOptions: string[] = [];
  dayOptions: string[] = [];
  startDay: string | null = null;
  endDay: string | null = null;


  filters = {
    city: [],
    brand: [],
    current_location: [],
    exit_location: [],
    entry_location: [],
    status: [],
    role_user: [],
    bottle_type: [],
    current_refill: [],
    TransactionId: [],
    assetID: [],
    day: [],
    startDay: '',
    endDay: ''

  };

  filteredData: any[] = [];


  loadFilterOptions() {
    this.logser.getFilterOptions().subscribe(data => {
      this.cityOptions = data.cityOptions;
      this.brandOptions = data.brandOptions;
      this.current_locationOptions = data.current_locationOptions;
      this.exit_locationOptions = data.exit_locationOptions;
      this.entry_locationOptions = data.entry_locationOptions;
      this.statusOptions = data.statusOptions;
      this.roleOptions = data.roleOptions;
      this.BottleTypeOptions = data.BottleTypeOptions;
      this.currentRefillOptions = data.currentRefillOptions;
      this.TransactionIdOptions = data.TransactionIdOptions;
      this.assetIdOptions = data.assetIdOptions;
      this.dayOptions = data.dayOptions;
      this.startDay = data.dayOptions;
      this.endDay = data.dayOptions;
    });
  }

  applyFilters() {
   //alert("Calling")
    this.auditLogs = [];
    console.log("Filters", this.filters)
    this.logser.getFilteredLogs(this.filters).subscribe(data => {
      this.auditLogs = data;  // Store filtered data in auditLogs for table display
      console.log(this.auditLogs)

    });
  }
  exportToExcel(): void {
    this.ExcelExportService.exportAsExcelFile(this.auditLogs, 'AuditLogs');
  }

}
