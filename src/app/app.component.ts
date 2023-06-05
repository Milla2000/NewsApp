import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'NewsApp';

   //two properties
   public sources: any  = [];
   public articles: any  = [];
   public selectedNewsChannel: string = 'Top 10 Headlines!';

  @ViewChild (MatSidenav) sideNav!: MatSidenav;
  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsApi: NewsService,
    ) {  }
  ngOnInit(): void {
    this.newsApi.allArticles()
    .subscribe((res: any) => {
      console.log(res);
      this.articles = res.articles;
    });
    this.newsApi.getNewsSources()
    .subscribe((res: any) => {
      console.log(res);
      this.sources = res.sources;
    });
    // this.newsApi.allArticles()
    // .subscribe((res: any) => {
    //   console.log(res);
    //   this.articles = res.sources;
    // });
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width: 800px)'])
    .subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';  
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
  });
  this.cdr.detectChanges();
}
searchSource(source : any){
  console.log(source);
  this.newsApi.getNewsById(source.id)
  .subscribe((res: any) => {
    console.log(res);
    this.articles = res.articles;
    this.selectedNewsChannel = source.name;
  });
}
}
