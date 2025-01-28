import { Component, Input } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

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
  @Input() filteredData: any;
  public chartData: any;
  public chartOptions: any;
  public chartType: any = 'bar';
  assetdataset: any[] = [];
  counts: { [key: string]: number } = {};
  returncounts: { [key: string]: number } = {};
  aggregatedData: any = {};
  datasets: any = [];
  locationLabels: any[] = [];
  displayLegend = true;
  bottleCodes: any = [];
  seconddisplayLegend = true;
  purchasedData: any[] = [];
  returnedData: any[] = [];
  public barChartLabels: string[] = [
    'B1.V', 'B1.R', 'B2.V', 'B2.R', 'B3.V', 'B3.R',
    'B4.V', 'B4.R', 'B5.V', 'UB.V + B1', 'UB.R + B1',
    'UB.V + B3', 'UB.R + B3', 'UB.V + B4', 'UB.R + B4',
    'UB.V + B5', 'UB.R + B5',
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Enable stacking on the x-axis
        title: {
          display: true,
          text: 'Bottle Brands Type', // Y-axis label
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
        title: {
          display: true,
          text: 'No. of Shampoo Bottles', // Y-axis label
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recycling Enthusiasm Across Brands and Package Types',
        font: {
          size: 24,
          weight: 'bold',
        },
      }
    },
  };
  public secondchartOptions = {
    responsive: true,
    scales: {
      x: { stacked: true,
        title: {
          display: true,
          text: 'Bottle and Brand Types', // Y-axis label
          font: {
            size: 16,
            weight: 'bold',
          },
        },
       },
      y: { stacked: true, beginAtZero: true ,
        title: {
          display: true,
          text: 'No. of Shampoo Bottles', // Y-axis label
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Asset Track Record',
        font: {
          size: 24,
          weight: 'bold',
        },
      }
    }
  };

  constructor(private logser: LoginserviceService) { }

  loadChartData() {
    this.logser.getFilteredCityAssets(this.filteredData['city'][0]).subscribe((data) => {
      this.assetdataset = [];
      for (let y = 0; y < data.length; y++) {
        this.assetdataset.push(data[y]);
      }
      console.log(this.assetdataset);

      this.barChartLabels = [
        'B1.V', 'B1.R', 'B2.V', 'B2.R', 'B3.V', 'B3.R',
        'B4.V', 'B4.R', 'B5.V',
        'UB.V + B1', 'UB.R + B1',
        'UB.V + B3', 'UB.R + B3',
        'UB.V + B4', 'UB.R + B4',
        'UB.V + B5', 'UB.R + B5'
      ];

      this.counts = {};
      this.returncounts = {};
      this.barChartLabels.forEach((code) => (this.counts[code] = 0));
      this.barChartLabels.forEach((code) => (this.returncounts[code] = 0));

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
          (record['Tofacility'] === 'Return Conveyor' || record['Tofacility'] === 'Bottle Reverse Vending Machine' || record['Tofacility'].includes('Plant')) &&
          !bottleCode.startsWith('UB')
        ) {
          this.returncounts[bottleCode]++;
        } else if (bottleCode.startsWith('UB.V')) {
          const currentbottlecode = 'UB.V + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && (record['Tofacility'] === 'Return Conveyor' || record['Tofacility'] === 'Bottle Reverse Vending Machine')) {
            this.returncounts[currentbottlecode]++;
          }
        } else if (bottleCode.startsWith('UB.R')) {
          const currentbottlecode = 'UB.R + ' + currentContentCode;
          if (this.barChartLabels.includes(currentbottlecode) && (record['Tofacility'] === 'Return Conveyor' || record['Tofacility'] === 'Bottle Reverse Vending Machine')) {
            this.returncounts[currentbottlecode]++;
          }
        }
      }

      this.purchasedData = this.barChartLabels.map((label) => this.counts[label] || 0);
      this.returnedData = this.barChartLabels.map((label) => this.returncounts[label] || 0);
      this.barChartData = [
        {
          data: this.purchasedData.map((count, index) => count - this.returnedData[index]),
          label: 'Purchased',
          backgroundColor: '#42A5F5',
        },
        {
          data: this.returnedData,
          label: 'Returned',
          backgroundColor: '#FF7043',
        },
      ];

      this.aggregatedData = this.aggregateBottleCodesByLocation(this.assetdataset);
      this.drawLocationChart();
      this.roleBasedOperations = this.generateRoleBasedObject(this.roles, this.operationTypes);
      console.log(this.roleBasedOperations);
      this.aggregateBasedonOperations();
      console.log(this.roleBasedOperations);
    });
  }
  roleBasedOperations: any = {};
  drawLocationChart(): void {
    const bottleCodes = Object.keys(this.aggregatedData);
    const allLocations = new Set<string>();
    Object.values(this.aggregatedData).forEach((locationData) => {
      if (typeof locationData === 'object' && locationData !== null) {
        Object.keys(locationData).forEach((loc) => allLocations.add(loc));
      }
    });
    const locationLabels = Array.from(allLocations);

    const datasets = locationLabels.map((location) => {
      return {
        label: location,
        data: bottleCodes.map((bottleCode) => {
          const locationData = this.aggregatedData[bottleCode] as Record<string, number>;
          return locationData[location] || 0;
        }),
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.9)`,
        // borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.9)`,
        // borderWidth: 0.9,
      };
    });

    this.locationLabels = bottleCodes;
    this.datasets = datasets;
  }

  aggregateBottleCodesByLocation(data: BottleData[]): Record<string, Record<string, number>> {
    const result: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      const { Bottle_Code, Bottle_loc, Quantity } = item;

      if (!result[Bottle_Code]) {
        result[Bottle_Code] = {};
      }

      if (!result[Bottle_Code][Bottle_loc]) {
        result[Bottle_Code][Bottle_loc] = 0;
      }

      result[Bottle_Code][Bottle_loc]++;
    });

    return result;
  }

  roles = [
    'B1 Shampoo Producer', 'B2 Shampoo Producer', 'B3 Shampoo Producer',
    'B4 Shampoo Producer', 'B5 Shampoo Producer', 'Supermarket Owner', 'Universal Bottle Manufacturing Plant owner',
    'Bottle Reverse Vending Machine Owner', 'Plastic Recycling Plant Owner', 'Shampoo Refilling Station Owner',
    'Universal Bottle Cleaning Plant Owner', 'Rag picker', 'House1 Owner', 'House2 Owner', 'House3 Owner',
    'House4 Owner', 'House5 Owner', 'House6 Owner', 'House7 Owner', 'House8 Owner', 'House9 Owner', 'House10 Owner', 'Mayor'
  ];
  operationTypes = [
    'purchased', 'returned', 'throwedOnTheStreet', 'throwedOnTheDustbin',
    'throwedOnTheTruck', 'using', 'refilled'
  ];

  generateRoleBasedObject(roles: string[], operationTypes: string[]) {
    const result: { [key: string]: { [key: string]: number } } = {};

    // Loop through each role
    roles.forEach(role => {
      result[role] = {};

      // Loop through each operation type and set initial count to 0
      operationTypes.forEach(operationType => {
        result[role][operationType] = 0;
      });
    });

    return result;
  }

  aggregateBasedonOperations() {

    this.assetdataset.forEach((operation) => {
      console.log(operation);
      const { Fromfacility, Tofacility } = operation;
      console.log(Fromfacility, Tofacility);
      if (Fromfacility === 'Supermarket Owner' && this.isValidToFacility(Tofacility)) {
        this.incrementCategory(this.roleBasedOperations[Tofacility], 'purchased');
      } else if (
        (Fromfacility.includes("Owner") || Fromfacility === 'Mayor') &&
        (Tofacility === 'ReverseVending' || Tofacility === 'Return Conveyor' || Tofacility === 'Reverse Vending' || Tofacility === 'ReturnConveyor')
      ) {
        this.incrementCategory(this.roleBasedOperations[Fromfacility], 'returned');
      } else if (Fromfacility.includes('Refilling Station') && this.isValidToFacility(Tofacility)) {
        this.incrementCategory(this.roleBasedOperations[Tofacility], 'refilled');
      }
      else if (this.isValidToFacility(Fromfacility) && (Tofacility === 'Street')) {
        this.incrementCategory(this.roleBasedOperations[Fromfacility], 'throwedOnTheStreet');
      }
      else if (this.isValidToFacility(Fromfacility) && (Tofacility === 'Garbage Truck')) {
        this.incrementCategory(this.roleBasedOperations[Fromfacility], 'throwedOnTheTruck');
      }
      else if (this.isValidToFacility(Fromfacility) && (Tofacility === 'City Dustbin')) {
        this.incrementCategory(this.roleBasedOperations[Fromfacility], 'throwedOnTheDustbin');
      }
    });


    this.oprlabel = Object.keys(this.roleBasedOperations);

    // Extract datasets (values of the object grouped by property)
    const properties = Object.keys(this.roleBasedOperations[this.oprlabel[0]]);
    this.oprChartdata = properties.map((property) => ({
      label: property.replace(/([A-Z])/g, ' $1').trim(), // Add spaces to camelCase keys
      data: this.oprlabel.map((label: string | number) => this.roleBasedOperations[label][property]),
      backgroundColor: this.getBackgroundColor(property),
    }));



    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Consumer Roles', // Y-axis label
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'No. of Shampoo Bottles', // Y-axis label
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
   
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Consumer Civic Sense Index',
          font: {
            size: 24,
            weight: 'bold',
          },
        }
      },
    };
  }

oprChartdata:any;
oprlabel:any;
  private incrementCategory(category: any, operationType: string) {
    console.log(category, operationType)
    if (category.hasOwnProperty(operationType)) {
      category[operationType]++;
    }
  }
  private isValidToFacility(toFacility: string): boolean {
    return this.roles.includes(toFacility);
  }


  // Helper to assign colors dynamically
  getBackgroundColor(property: string): string {
    const colors: { [key: string]: string } = {
      purchased: 'rgba(54, 162, 235, 0.6)',
      returned: 'rgba(255, 99, 132, 0.6)',
      throwedOnTheStreet: 'rgba(255, 159, 64, 0.6)',
      throwedOnTheDustbin: 'rgba(75, 192, 192, 0.6)',
      throwedOnTheTruck: 'rgba(153, 102, 255, 0.6)',
      using: 'rgba(255, 206, 86, 0.6)',
      refilled: 'rgba(75, 192, 75, 0.6)',
    };
    return colors[property] || 'rgba(0, 0, 0, 0.6)';
  }
}
