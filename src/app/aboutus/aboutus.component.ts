import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comment-service';
import { Comments } from '../model/comments';
import { AuthService } from '../services/auth-service';
import { UserProfile } from '../model/user-profile-model';
import { Comment } from '../model/comment';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  public comments: Comments[] = [];

  constructor(private commentsService: CommentsService, public auth: AuthService) { }

  ngOnInit() {
    this.commentsService.getAllComments(this.comments);
  }

  post(e) {
    let comment = new Comment();
    comment.text = e.target.elements[0].value;
    let dateFormat = require('dateformat');
    let now = new Date();
    comment.date = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    let profile: UserProfile = this.auth.getProfile();
    let commentS = new Comments(profile.nickname.toString() + "@gmail.com", profile.name.toString(), profile.name.toString(), comment);
    this.commentsService.saveComment(commentS);
    e.target.elements[0].value = "";
    this.comments.push(commentS);
  }


}
