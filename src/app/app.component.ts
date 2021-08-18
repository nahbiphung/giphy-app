import { Component, HostListener, OnInit } from '@angular/core';
import { giphy } from 'src/shared/consts/giphy.const';
import { GifData } from 'src/shared/interfaces/giphy.interface';
import { GiphyService } from 'src/shared/services/giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'giphy app';
  searchTerm: string;
  isSearch: boolean;

  @HostListener('window:scroll')
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (this.isSearch) {
        this.giphyService.getGiphyImages(this.searchTerm, giphy.search);
      } else {
        this.giphyService.getGiphyImages();
      }
    }
  }

  constructor(public giphyService: GiphyService) { }

  ngOnInit() {
    this.giphyService.getGiphyImages();
  }

  onSearch() {
    this.isSearch = true;
    this.giphyService.reset();
    this.giphyService.getGiphyImages(this.searchTerm, giphy.search);
  }

  onShowInfo(gif: GifData) {
    window.alert(`
      Title: ${gif.title}\n
      Rating: ${gif.rating}\n
      Created By User: ${gif.user ? gif.user.display_name : 'Dont have username'}
      `);
  }
}
