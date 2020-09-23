import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data/data.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public firstCountryCode: string = "";
  public CountryName: string = "";
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartSecondLabels: Label[] = [];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartSecondData: SingleDataSet = [0, 0];
  public pieChartColors: Color[] = [{ backgroundColor: ['pink', 'teal'], hoverBackgroundColor:'cyan' }];
  public pieChartSecondColors: Color[] = [{ backgroundColor: ['pink', 'cyan'], hoverBackgroundColor:'teal' }];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private oip:DataService) {
    let btn = <HTMLInputElement>document.getElementById("checkBtn");
    btn.addEventListener("click", (e:Event) => this.checkBtnOnClick());
  }
  checkBtnOnClick(): any {
    this.firstCountryCode = ((<HTMLInputElement>document.getElementById("txtBox") as HTMLInputElement).value).toUpperCase().trim();
    if(this.firstCountryCode != ""){
      // this.pieChartLabels = [this.firstCountryCode];
      this.getdata();
    }
  }

  ngOnInit() {
    this.firstCountryCode = "MY";
    this.CountryName = "Malaysia";
    this.getdata();
  }

  getdata(){
    var deathsAmount = 0;
    var recoveredAmount = 0;

    this.oip.getGlobalDeathsAndRecovered(0).then(data =>{
      var jsonStr = JSON.stringify(data);
      var jsonObj = JSON.parse(jsonStr);

      deathsAmount = parseInt(JSON.stringify(jsonObj["global death"]));

      this.oip.getGlobalDeathsAndRecovered(1).then(data =>{
        var jsonStr = JSON.stringify(data);
        var jsonObj = JSON.parse(jsonStr);

        recoveredAmount = parseInt(JSON.stringify(jsonObj["global recover"]));

        this.pieChartSecondLabels=["Global Death to Recovery ratio - " + Math.floor((deathsAmount*100)/(deathsAmount+recoveredAmount)) + ":" + Math.floor((recoveredAmount*100)/(deathsAmount+recoveredAmount))];
        this.pieChartSecondData=[recoveredAmount, deathsAmount];
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })


    var countryDeaths = 0;
    var countryRecovers = 0;

    //getting country data
    this.oip.getCountryResult(this.firstCountryCode).then(data => {

      var jsonStr = JSON.stringify(data);
      var jsonObj = JSON.parse(jsonStr);

      countryDeaths = parseInt(JSON.stringify(jsonObj[0]["totalDeaths"]));
      countryRecovers = parseInt(JSON.stringify(jsonObj[0]["totalRecovered"]));
      this.CountryName = JSON.stringify(jsonObj[0]["country"]);
      this.CountryName = this.CountryName.substring(1, this.CountryName.length - 1);

      //generate charts
      this.pieChartLabels=[this.CountryName  + " Death to Recovery ratio - " + Math.floor((countryDeaths*100)/(countryDeaths+countryRecovers)) + ":" + Math.floor((countryRecovers*100)/(countryDeaths+countryRecovers))];
      this.pieChartData=[countryRecovers, countryDeaths];



    }).catch(error => {
      console.log(error);
    })

  }

}
