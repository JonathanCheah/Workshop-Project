import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data/data.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public firstCountryName: string = "";
  public barChartColors: Color[] = [];
  public barChartSecondColors: Color[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];
  public barChartSecondData: ChartDataSets[] = [];
  
  constructor(private oip:DataService) {
    // let btn = <HTMLInputElement>document.getElementById("checkBtn");
    // btn.addEventListener("click", (e:Event) => this.checkBtnOnClicked());
  }
  // checkBtnOnClicked(){
  //   var inputValue = (<HTMLInputElement>document.getElementById("txtBox")).value;
  //   this.getdata(inputValue);
  // }

  ngOnInit() {
    this.firstCountryName = "MY";
    this.getdata("");
    this.getdata(this.firstCountryName);
  }

  getdata(chartType: string) {
    this.oip.getCountryResult(chartType).then(data => {

      var jsonStr = JSON.stringify(data);
      var jsonObj = JSON.parse(jsonStr);

    this.barChartLabels = ['Deaths', 'Recovered', 'Active Cases'];
    // this.barChartLabels = [JSON.stringify(jsonObj[0]["created"])];

    var timeStamp = "";

    if (chartType == ""){
      this.barChartColors = [{ backgroundColor: 'cyan' }];

      timeStamp = 'Global Stats - Last Updated: ' + JSON.stringify(jsonObj["created"]).substring(1, 11);

      this.barChartData = [
        { data: [jsonObj["totalDeaths"], jsonObj["totalRecovered"], jsonObj["totalActiveCases"]], label: timeStamp }];
    }
    else{
      this.barChartSecondColors = [{ backgroundColor: 'teal' }];
      var countryStr = JSON.stringify(jsonObj[0]["country"]);
      timeStamp = countryStr.substring(1, countryStr.length - 1) + ' Stats - Last Updated: ' + JSON.stringify(jsonObj[0]["lastUpdated"]).substring(1, 11);

      this.barChartSecondData = [
      { data: [jsonObj[0]["totalDeaths"], jsonObj[0]["totalRecovered"], jsonObj[0]["activeCases"]], label: timeStamp }];
    }

    }).catch(error => {
      console.log(error);
    })
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  
  public checkBtnOnClicked(event:any):void
  {
    this.firstCountryName = ((<HTMLInputElement>document.getElementById("txtBox") as HTMLInputElement).value).toUpperCase().trim();
    if(this.firstCountryName != ""){
      this.getdata(this.firstCountryName);
    }
  }

}
