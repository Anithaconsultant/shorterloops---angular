import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
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
  constructor(private logser: LoginserviceService) { }
  ngOnInit(): void {
    this.logser.getAllAssets()
      .subscribe((logs: any) => {
        for (let y = 0; y < logs.length; y++) {
          this.options.push(logs[y]['AssetId']);
          if(logs[y]['Tofacility']!='' && !this.users.includes(logs[y]['Tofacility']))
          this.users.push(logs[y]['Tofacility'])
        }
      });
  }
  onAssetSelectChange() {
    if (this.selectedAsset != '') {
      this.fetchAuditLogs(this.selectedAsset);
    }
    if (this.selectedUser != '') {
      this.fetchAuditLogsUsers(this.selectedUser);
    }

  }

  fetchAuditLogs(assetId: string) {
    this.logser.getAuditLogs(this.selectedAsset)
      .subscribe((logs: any) => {
        this.auditLogs = logs;
      });
  }
  fetchAuditLogsUsers(userId: string) {
    this.logser.getAuditLogsuser(this.selectedUser)
      .subscribe((logs: any) => {
        this.auditLogs = logs;
        console.log(this.auditLogs)
      });
  }

}
