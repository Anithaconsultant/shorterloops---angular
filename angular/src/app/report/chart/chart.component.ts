import { Component, Input } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  public chartData: any;
  public chartOptions: any;
  public chartType: any = 'bar';
  @Input() filteredData: any;
  constructor(private logser: LoginserviceService) {

  }
  ngOnInit(): void {
    console.log(this.filteredData);
    if (this.filteredData) {
      console.log(this.filteredData)
      this.loadChartData();
    }
  }
  assetdataset: any[] = [];
  counts: { [key: string]: number } = {};
  returncounts: { [key: string]: number } = {};
  // loadChartData() {
  //   this.assetdataset = [];
  //   this.counts = {};
  //   this.logser.getAllAssets().subscribe((data) => {
  //     // Store the fetched data in assetdataset
  //     for (let y = 0; y < data.length; y++) {
  //       this.assetdataset.push(data[y]);
  //     }
  //     console.log(this.assetdataset);
  //     // Define bottle codes
  //     const bottleCodes = [
  //       'B1.V', 'B1.R', 'B2.V', 'B2.R', 'B3.V', 'B3.R',
  //       'B4.V', 'B4.R', 'B5.V',
  //       'UB.V + B1', 'UB.R + B1',
  //       'UB.V + B3', 'UB.R + B3',
  //       'UB.V + B4', 'UB.R + B4',
  //       'UB.V + B5', 'UB.R + B5'
  //     ];

  //     // Initialize counts object
      
  //     bottleCodes.forEach(code => this.counts[code] = 0);

  //     // Iterate over assetdataset and update counts
  //     for (let r = 0; r < this.assetdataset.length; r++) {
  //       const record = this.assetdataset[r];
  //       const bottleCode = record['Bottle_Code'];
  //       const currentContentCode = record['Content_Code'].split(".")[0];

  //       if (bottleCodes.includes(bottleCode) && record['purchased'] === true && !bottleCode.startsWith('UB')) {
  //         this.counts[bottleCode]++;
  //       }

  //       else if (bottleCode.startsWith('UB.V')) {
  //         let currentbottlecode = 'UB.V ' + '+ ' + currentContentCode;
  //         if (bottleCodes.includes(currentbottlecode) && record['purchased'] === true) {
  //           this.counts[currentbottlecode]++;
  //         }
  //       }
  //       else if (bottleCode.startsWith('UB.R')) {
  //         let currentbottlecode = 'UB.R ' + '+ ' + currentContentCode;
  //         if (bottleCodes.includes(currentbottlecode) && record['purchased'] === true) {
  //           this.counts[currentbottlecode]++;
  //         }

  //       }
  //     }

  //       console.log('Counts:', this.counts);

  //       // Example: Access individual counts
  //       const B1Vcount = this.counts['B1.V'];
  //       console.log('B1.V Count:', B1Vcount);
  //       this.purchasedData = this.barChartLabels.map(label => this.counts[label] || 0);

  //       // Additional processing if needed...
  //       console.log('purchasedData:', this.purchasedData); 
  //       this.barChartData = [
  //       {
  //         data: this.purchasedData,
  //         label: 'Purchased',
  //         backgroundColor: '#42A5F5',
  //       },
  //       {
  //         data: [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 4, 0, 5], // Example static returned data
  //         label: 'Returned',
  //         backgroundColor: '#FF7043',
  //       },
  //     ];
  //     });
     

  // }
  loadChartData() {
    this.logser.getAllAssets().subscribe((data) => {
      // Clear the dataset to avoid duplicates
      this.assetdataset = [];
  
      // Store the fetched data
      for (let y = 0; y < data.length; y++) {
        this.assetdataset.push(data[y]);
      }
      console.log(this.assetdataset);
  
      // Define bottle codes
      this.barChartLabels = [
        'B1.V', 'B1.R', 'B2.V', 'B2.R', 'B3.V', 'B3.R',
        'B4.V', 'B4.R', 'B5.V',
        'UB.V + B1', 'UB.R + B1',
        'UB.V + B3', 'UB.R + B3',
        'UB.V + B4', 'UB.R + B4',
        'UB.V + B5', 'UB.R + B5'
      ];
  
      // Initialize counts object
      this.counts = {};
      this.returncounts = {};
      this.barChartLabels.forEach((code) => (this.counts[code] = 0));
      this.barChartLabels.forEach((code) => (this.returncounts[code] = 0));
  
      // Iterate over assetdataset and update counts
      for (let r = 0; r < this.assetdataset.length; r++) {
        const record = this.assetdataset[r];
        const bottleCode = record['Bottle_Code'];
        const currentContentCode = record['Content_Code'].split('.')[0];
  
        if (
          this.barChartLabels.includes(bottleCode) &&
          record['purchased'] === true &&
          !bottleCode.startsWith('UB')
        ) {
          this.counts[bottleCode]++;
        } else if (bottleCode.startsWith('UB.V')) {
          const currentbottlecode = 'UB.V + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && record['purchased'] === true) {
            this.counts[currentbottlecode]++;
          }
        } else if (bottleCode.startsWith('UB.R')) {
          const currentbottlecode = 'UB.R + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && record['purchased'] === true) {
            this.counts[currentbottlecode]++;
          }
        }


        if (
          this.barChartLabels.includes(bottleCode) &&
          (record['Tofacility'] === 'Return Conveyor'|| record['Tofacility'] === 'Bottle Reverse Vending Machine' || record['Tofacility'].includes('Plant') ) &&
          !bottleCode.startsWith('UB')
        ) {
          this.returncounts[bottleCode]++;
        } else if (bottleCode.startsWith('UB.V')) {
          const currentbottlecode = 'UB.V + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && (record['Tofacility'] === 'Return Conveyor'|| record['Tofacility'] === 'Bottle Reverse Vending Machine')) {
            this.returncounts[currentbottlecode]++;
          }
        } else if (bottleCode.startsWith('UB.R')) {
          const currentbottlecode = 'UB.R + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && (record['Tofacility'] === 'Return Conveyor'|| record['Tofacility'] === 'Bottle Reverse Vending Machine')) {
            this.returncounts[currentbottlecode]++;
          }
        }
      }
  
      console.log('Counts:', this.counts);
      console.log('returncounts:', this.returncounts);
  
      // Map counts to purchasedData array
      this.purchasedData = this.barChartLabels.map((label) => this.counts[label] || 0);
      this.returnedData = this.barChartLabels.map((label) => this.returncounts[label] || 0);
      console.log('purchasedData:', this.purchasedData);
      console.log('returnedData:', this.returnedData);
  
      // Update barChartData dynamically
      this.barChartData = [
        {
          data: this.purchasedData,
          label: 'Purchased',
          backgroundColor: '#42A5F5',
        },
        {
          data: this.returnedData, // Example static returned data
          label: 'Returned',
          backgroundColor: '#FF7043',
        },
      ];
  
      console.log('barChartData:', this.barChartData);
  
      // Refresh the chart (optional)
      //this.chart?.update(); // Uncomment if using ng2-charts
    });
  }
  
  purchasedData:any[]=[];
  returnedData:any[]=[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Enable stacking on the x-axis
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public barChartLabels: string[] = [
    'B1.V', 'B1.R', 'B2.V', 'B2.R', 'B3.V', 'B3.R',
    'B4.V', 'B4.R', 'B5.V', 'UB.V + B1', 'UB.R + B1',
    'UB.V + B3', 'UB.R + B3', 'UB.V + B4', 'UB.R + B4',
    'UB.V + B5', 'UB.R + B5',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

   public barChartData: ChartDataset[] = [];
  //   { data: this.purchasedData, label: 'Purchased', backgroundColor: '#42A5F5' },
  //   { data: [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 4, 0, 5], label: 'Returned', backgroundColor: '#FF7043' },
  // ];
}
