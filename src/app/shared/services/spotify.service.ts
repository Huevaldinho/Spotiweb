import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AlbumElement, AlbumSearchResponse, SpotiToken, TrackSearchResponse, TracksItem } from '../interfaces/spotify.interfaces';

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
    console.log("Generated token: ", this.token);
    return this.token;
  }

  getAccessToken(): Observable<SpotiToken | null> {
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url, this.body, this.options)
      .pipe(
        catchError(() => of(null))
      )
  }

  // searchAlbumsAndTracks(query: string): Observable<Search | null> {
  //   const url = `${this.apiUrl}/search/?q=${query}&type=album,track`;
  //   console.log("Requesting:", url);
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.getAccessToken_()}`,
  //   });
  //   return this.httpClient.get<Search | null>(url, { headers }).
  //     pipe(
  //       map((response) => response),
  //       catchError(() => of(null))
  //     );
  // }
  searchAlbums(query: string): Observable<AlbumElement[] | null> {
    const url = `${this.apiUrl}/search/?q=${query}&type=album`;
    console.log("Requesting:", url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken_()}`,
    });
    return this.httpClient.get<AlbumSearchResponse|null>(url, { headers }).
      pipe(
        map((response) => response?.albums.items||null),
        catchError(() => of(null))
      );
  }

  searchTracks(query: string): Observable<TracksItem[] | null> {
    const url = `${this.apiUrl}/search/?q=${query}&type=track`;
    console.log("Requesting:", url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken_()}`,
    });
    return this.httpClient.get<TrackSearchResponse|null>(url, { headers })
      .pipe(
        map((response) => response?.tracks.items||null),
        catchError(() => of(null))
      );
  }
}
