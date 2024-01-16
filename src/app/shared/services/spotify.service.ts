import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of,throwError } from 'rxjs';
import { AlbumElement, AlbumSearchResponse, Artist, SpotiToken, TrackSearchResponse, TracksItem } from '../interfaces/spotify.interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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


  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
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

  artistInfo(id: string) : Observable<Artist> {
    const url = `${this.apiUrl}/artists/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer BQB5zN9rz6f2I5qzcXu1kNhMJ-QVanOCGxnW3daFSuQmAAMJuI5YkyFmN5DKOAgRLWYt5SejkEvDUwY52pgPN9Q8_C2aDoUwlMv0TRQNCteFBG1-g-w`,
      // Add any other headers if needed
    });
    return this.httpClient.get<Artist>(url, { headers }).pipe(
      map((response) => response),
      catchError(() => of())
    );
  }

  // to obtain all the album info and tracks
  albumInfo(id: string): Observable<AlbumElement> {
    const url = `${this.apiUrl}/albums/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer BQAeXLdQ6cu_I1ojf8n-kRt6lMoY1MXk-UII5_xQnN-7Sda9qynzhKtgyvR2oFw_l7ksHsZhImMVEgaWNLacu2gdtqojgmf3_NP5ITFG2nZeIeX-ThM`,
      // Agrega cualquier otro encabezado si es necesario
    });
    return this.httpClient.get<AlbumElement>(url, { headers }).pipe(
      map((response) => response),
      catchError(() => of())
    );
  }

   // to obtain all the top artist song in a specific market
   topSongsInfo(id: string): Observable<TracksItem[]> {
    //const url = `${this.apiUrl}/artist/${id}/top-tracks?market=ES`;
    const url = 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=ES'
    const headers = new HttpHeaders({
      'Authorization': `Bearer BQCB5zZqTo1hn672qR8XthO9kd44bAXBw84V0-ZguCYcefUSFB2A6TNc08ABgFW8zlGaDhgWz7uuOtyIvmf0WFxm4fRv0G74nfFsv9HD0adW2PW4xp0`,  // Reemplaza esto con tu token de Spotify
      // Agrega cualquier otro encabezado si es necesario
    });

    return this.httpClient.get<{tracks:TracksItem[]}>(url, { headers }).pipe(
      map(response => response.tracks),
      catchError(() => of([]))
    );
  }

  //*For tracks ONLY
  //id del cancion
  embedURL(id: string):SafeResourceUrl{
    const url = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
