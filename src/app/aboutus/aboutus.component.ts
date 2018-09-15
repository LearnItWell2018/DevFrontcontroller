import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comment-service';
import { Comments } from '../model/comments';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  public comments:Comments[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.getAllComments(this.comments);
  }

}
