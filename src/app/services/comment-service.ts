import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comments } from '../model/comments';
import { Comment } from '../model/comment';

@Injectable()
export class CommentsService {

    private comments = environment.serviceURL + '/rs/comments/';
    private URL: string;
    constructor(private http: Http) {
    }

    public getAllComments(commentsAll: Comments[]) {
        this.http.get(this.comments).subscribe(
            (response) => {
                let JSONdata = response.json();
                JSONdata.forEach(element => {
                    let comment = new Comment();
                    comment.text = element.comment.text;
                    comment.date = element.comment.date;
                    let comments = new Comments(element.customerMail, element.customerMobile, element.customerName, comment);
                    commentsAll.push(comments);
                });
            },
            (error) => { console.log(error) });
    }

    public saveComment(comment: Comments) {

        this.http.post(this.comments, comment).subscribe(
            res => {
                //console.log(res);
            },
            err => {
                console.log("Error occured");
            }
        );
    }


}