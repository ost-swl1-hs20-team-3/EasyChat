import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ec-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollable') private scrollContainerRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public scrollToBottom(): void {
    this.scrollContainerRef.nativeElement.scroll({
      top: this.scrollContainerRef.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

}
