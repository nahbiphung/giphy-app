import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GifData, GiphyResult } from '../interfaces/giphy.interface';
import { giphy } from '../consts/giphy.const';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private imageResults: GifData[] = [];
  private currentOffset = 0;

  private giphyImages$ = new Subject<GifData[]>();
  public _giphyImages$ = this.giphyImages$.asObservable();

  constructor(private http: HttpClient) { }

  getGiphyImages(searchTerm: string = '', giphyType: string = giphy.trending) {
    const params = {
      api_key: environment.giphyApiKey,
      q: searchTerm,
      offset: this.currentOffset.toString(),
    };

    this.http.get<GiphyResult>(environment.giphyUrl + giphyType, { params })
      .subscribe((giphyResult) => {
        console.log(giphyResult);
        this.imageResults = this.imageResults.concat(giphyResult.data);
        this.currentOffset = giphyResult.pagination.offset + giphyResult.pagination.count;


        this.giphyImages$.next(this.imageResults);
      });
  }

  reset() {
    this.currentOffset = 0;
    this.imageResults = [];
  }
}
