import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs/internal/Observable";
import { trigger,style,transition,animate,keyframes,query,stagger } from "@angular/animations";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('listStagger',[
      transition('* <=> *',[
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)'}),
            stagger('100ms',
              animate('550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)'})
              )
            )
          ],
          { optional: true}
        ),
        query(':leave', animate('100ms', style({ opacity: 0})),{
          optional: true
        })
      ])
    ])
  ],
})
export class PostsComponent implements OnInit {
  post$: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPosts().subscribe(
      data => this.post$ = data
    );
  }

}
