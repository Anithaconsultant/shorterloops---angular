import { Component, Input } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { data } from 'jquery';



interface BottleData {
  Bottle_Code: string;
  Bottle_loc: string;
  Quantity: number;
}

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

  assetdataset: any[] = [];
  counts: { [key: string]: number } = {};
  returncounts: { [key: string]: number } = {};

  loadChartData() {
    alert(this.filteredData['city'][0])
    this.logser.getFilteredCityAssets(this.filteredData['city'][0]).subscribe((data) => {
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
          data:  this.purchasedData.map((count, index) => count - this.returnedData[index]),
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

      this.aggregatedData = this.aggregateBottleCodesByLocation(this.assetdataset);
      console.log(this.aggregatedData);
      this.drawlocchart();
    });
  }
  aggregatedData:any={};
  datasets:any = [];
  locationLabels: any[] = [];
  displayLegend = true;
  secondchartOptions = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Bottle Quantities by Location'
      }
    }
  };
  bottleCodes:any=[];
  seconddisplayLegend = true;
  drawlocchart(){
    const allLocations = new Set();
    Object.values(this.aggregatedData).forEach((locations: any) => {
      Object.keys(locations).forEach((loc:any) => allLocations.add(loc));
    });
    this.locationLabels = Array.from(allLocations);
    this.bottleCodes = Object.keys(this.aggregatedData);
    // Prepare datasets for Chart.js
    this.datasets = Object.entries(this.aggregatedData).map(([bottleCode, locations]) => {
      return {
        label: bottleCode,
       // data:   this.locationLabels.map((location) => locations[location] || 0), // Ensure loc is a string// Fill 0 for missing locations
        data:   this.locationLabels, // Ensure loc is a string// Fill 0 for missing locations
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        borderWidth: 1,
      };
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

  aggregateBottleCodesByLocation(data: BottleData[]): Record<string, Record<string, number>> {
    const result: Record<string, Record<string, number>> = {};
  
    data.forEach((item) => {
      const { Bottle_Code, Bottle_loc, Quantity } = item;
  
      // Initialize the bottle code in the result if not present
      if (!result[Bottle_Code]) {
        result[Bottle_Code] = {};
      }
  
      // Initialize the location for the bottle code if not present
      if (!result[Bottle_Code][Bottle_loc]) {
        result[Bottle_Code][Bottle_loc] = 0;
      }
  
      // Aggregate the quantity
      result[Bottle_Code][Bottle_loc] ++;
    });
  
    return result;
  }
  


}
