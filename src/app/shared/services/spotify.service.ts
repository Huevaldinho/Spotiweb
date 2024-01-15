import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of,throwError } from 'rxjs';
import { AlbumElement, AlbumSearchResponse, Artist, SpotiToken, TrackSearchResponse, TracksItem } from '../interfaces/spotify.interfaces';

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


  constructor(private httpClient: HttpClient) {
  }

  body = 'grant_type=client_credentials';
  options = {
    headers: new HttpHeaders({
      'Authorization': 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  getAccessToken_(): string {
    // if (this.token) {
    //   console.log("Token already exists:", this.token);
    //   return this.token;
    // }
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
  searchNewAlbumReleases(): Observable<AlbumElement[] | null> {
    const url = `${this.apiUrl}/browse/new-releases`;
    console.log("Requesting:", url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken_()}`,
    });
    return this.httpClient.get<AlbumSearchResponse|null>(url, { headers })
      .pipe(
        map((response) => response?.albums.items||null),
        catchError(() => of(null))
      );
  }

  oembeded():void{
    //https://open.spotify.com/embed/album/2ODvWsOgouMbaA5xf0RkJe?utm_source=oembed

  //<div style="left: 0; width: 100%; height: 352px; position: relative;"><iframe [src]="" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"></iframe></div>


  }

  artistInfo(id: string) : Observable<Artist | null> {
    const url = `${this.apiUrl}/artists/${id}`;
    console.log("Requesting:", url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken_()}`,
      // Add any other headers if needed
    });
    console.log("Header: ", headers);
    return this.httpClient.get<Artist | null>(url, { headers }).pipe(
      map((response) => response),
      catchError(() => of(null))
    );
  }

  // to obtain all the album info and tracks
  // albumInfo(id: string): Observable<AlbumElement> {
  //   const url = `${this.apiUrl}/albums/${id}`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.getAccessToken_()}`,
  //     // Agrega cualquier otro encabezado si es necesario
  //   });
  //   return this.httpClient.get<AlbumElement>(url, { headers }).pipe(
  //     catchError(() => of())
  //   );
  // }

}
