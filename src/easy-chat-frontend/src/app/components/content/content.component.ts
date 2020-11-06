import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ec-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewChecked {

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
