import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ec-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollable') private myScrollContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.scrollToElement();
  }

  scrollToElement(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

}
