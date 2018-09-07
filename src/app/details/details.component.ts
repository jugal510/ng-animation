import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute } from "@angular/router";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
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
export class DetailsComponent implements OnInit {
  user$: Object;
  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.user$ = params.id);
  }

  ngOnInit() {
    this.data.getUser(this.user$).subscribe(
      data => this.user$ = data
    );
  }

}
