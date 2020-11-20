import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'ec-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  private setBlurSubscription: Subscription;
  public blurToggle: boolean = true;

  @ViewChild('scrollable') scrollContainerRef: ElementRef;

  constructor(private eventService: EventService) {
    this.setBlurSubscription = this.eventService.blurNow$.subscribe((isBlur) => {
      this.changeBlur(isBlur);
    });
  }

  public ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  public ngOnDestroy(): void {
    this.setBlurSubscription.unsubscribe();
  }

  private scrollToBottom(): void {
    this.scrollContainerRef.nativeElement.scroll({
      top: this.scrollContainerRef.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  private changeBlur(isBlur: boolean) {
    if(isBlur) {
      this.scrollContainerRef.nativeElement.classList.add("blurBackground");
    } else {
      this.scrollContainerRef.nativeElement.classList.remove("blurBackground");
    }
  }

}
