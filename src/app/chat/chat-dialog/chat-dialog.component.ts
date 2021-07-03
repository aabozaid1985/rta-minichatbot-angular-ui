import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import {scan} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  sessionId: string;

  constructor(public chat: ChatService, private http: HttpClient) { 
    this.messages = new Observable<Message[]>();
    this.formValue = "";
    this.sessionId = "";
  }

  ngOnInit() {
      this.http.post<any>('http://localhost:3000/api/session', {}).subscribe(data => {
            console.log(data.result.session_id);
            this.sessionId = data.result.session_id;
        });
      
      this.messages = this.chat.conversation.asObservable()
      .pipe(
        scan((acc, val) => acc.concat(val))
      );
  }

  sendMessage() {
    this.chat.converse(this.formValue, this.sessionId);
    this.formValue = '';
  }

}
