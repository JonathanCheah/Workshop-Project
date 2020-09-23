import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url: string = "https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/coronatracker/1.0.0/worldometer";
  url: string = "";
  token: string = "Bearer cc4bcce0-145e-3ed8-bed3-10153d3a073a";
  constructor(private http: HttpClient) { }

  getCountryResult(chartType: string) {
    this.url = "https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/coronatracker/1.0.0/worldometer";

    if(chartType == ""){
      return this.http.get(`${this.url}/global`, { headers: { Authorization: this.token } }).toPromise();
    }
    else{
      let params = new HttpParams().set("countryCode", chartType);
      return this.http.get(`${this.url}/country` , { headers: { Authorization: this.token }, params: params }).toPromise();
    }
  }

  getGlobalDeathsAndRecovered(getType: number) {
    this.url = "https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/covid19/1.0.0";

    if(getType == 0){
      return this.http.get(`${this.url}/death`, { headers: { Authorization: this.token } }).toPromise();
    }
    else if(getType == 1){
      return this.http.get(`${this.url}/recover`, { headers: { Authorization: this.token } }).toPromise();
    }
    
  }
}
