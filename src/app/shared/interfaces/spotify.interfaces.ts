export interface SpotiToken {
  access_token: string;
  token_type:   string;
  expires_in:   number;
}

export interface AlbumSearchResponse{
  albums: Albums;
}
export interface TrackSearchResponse{
  tracks: Tracks;
}

export interface Albums {
  href:     string;
  items:    AlbumElement[];
  limit:    number;
  next:     string;
  offset:   number;
  previous: null;
  total:    number;
}

export interface AlbumElement {
  album_type:             AlbumTypeEnum;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks:           number;
  type:                   AlbumTypeEnum;
  uri:                    string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface Artist {
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  name:          string;
  type:          ArtistType;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface Tracks {
  href:     string;
  items:    TracksItem[];
  limit:    number;
  next:     string;
  offset:   number;
  previous: null;
  total:    number;
}

export interface TracksItem {
  album:             AlbumElement;
  artists:           Artist[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_ids:      ExternalIDS;
  external_urls:     ExternalUrls;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  popularity:        number;
  preview_url:       string;
  track_number:      number;
  type:              PurpleType;
  uri:               string;
}

export interface ExternalIDS {
  isrc: string;
}

export enum PurpleType {
  Track = "track",
}
