import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOGIN_API } from "../constant/api.constant";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param data user credentials
   * @returns response from login api.
   */
  login(data: any) {
    return this.http.post(LOGIN_API, data);
  }
}
