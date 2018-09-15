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

  constructor(private commentsService: CommentsService, private auth: AuthService) { }

  ngOnInit() {
    this.commentsService.getAllComments(this.comments);
  }

  post(e) {
    console.log(e.target.elements[0].value);
    let comment = new Comment();
    comment.text = e.target.elements[0].value;
    comment.date = "13/12/1980";
    let profile: UserProfile = this.auth.getProfile();
    let comments = new Comments(profile.name.toString(), profile.name.toString(), profile.name.toString(), comment);
    this.commentsService.saveComment(comments);
  }


}
