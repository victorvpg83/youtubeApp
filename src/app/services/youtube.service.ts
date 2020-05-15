import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { YoutubeResponse } from '../models/youtube.models';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3'
  private apiKey = 'AIzaSyCqE0YRtQEukRAPlBOB4N6djquqUaUumGM'
  private playlist = 'UUgfyNqU6WIfxd9kfXe7M8LQ'
  private nextPageToken = ''


  constructor( private http: HttpClient ) {}

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`

    const params = new HttpParams()
      .set( 'part', 'snippet')
      .set( 'maxResults', '12')
      .set( 'playlistId', this.playlist)
      .set( 'key', this.apiKey)
      .set( 'pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>( url, { params } )
      .pipe(

        map( response => {
          this.nextPageToken = response.nextPageToken
          return response.items
        }),

        map( items => items.map( video => video.snippet))

      )
  }
}

