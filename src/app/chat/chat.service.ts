import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatService {
  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {

  }

  converse(msg: string, sessionId: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    this.http.post<any>('http://localhost:3000/api/message', {
        sessionId: sessionId,
        message: msg
    }).subscribe(data => {
        console.log(data);
        this.update(new Message(data.result.output.generic[0].text, "bot"));
    });
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }


}
