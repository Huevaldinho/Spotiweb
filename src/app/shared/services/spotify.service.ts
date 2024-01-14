import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Search, SpotiToken } from '../interfaces/spotify.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = '6cb0905e835c4b25be3a750520743a5e';
  private clientSecret: string = 'c2e235b40f2847a2a510ec5fe97aea88';
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  idAndSecret: string = btoa(this.clientId + ":" + this.clientSecret);
  private token: string = '';
  http: any;
  private apiUrl: string = 'https://api.spotify.com/v1';


  constructor(private httpClient: HttpClient) { }

  // body = {
  //     'grant_type': "client_credentials",
  // };
  body = 'grant_type=client_credentials';

  options = {
    headers: new HttpHeaders({
      'Authorization': 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };


  getAccessToken_(): string {
    if (this.token) {
      console.log("Token already exists:", this.token);
      return this.token;
    }
    const url = this.tokenUrl;
    this.httpClient.post<SpotiToken>(url, this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(() => of(''))
      )
      .subscribe(token => { this.token = token; });

    return this.token;
  }

  getAccessToken(): Observable<SpotiToken | null> {
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url, this.body, this.options)
      .pipe(
        catchError(() => of(null))
      )
  }


  // search(term: string): Observable<Search | null> {
  //   return of(null);
  // }
  search(query: string) : Observable<Search | null> {
    const url = `${this.apiUrl}/search/?q=${query}&type=album,track`;
    console.log("Requesting:", url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken_()}`,
      // Add any other headers if needed
    });
    console.log("Header: ", headers);


    return this.httpClient.get<Search|null>(url, { headers }).pipe(
      map((response) => response),
      catchError(() => of(null))
    );

  }

}
