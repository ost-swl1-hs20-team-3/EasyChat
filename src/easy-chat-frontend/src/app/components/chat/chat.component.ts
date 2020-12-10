import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'ec-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  private setBlurSubscription: Subscription;
  public blurToggle = true;

  @ViewChild('scrollable') scrollContainerRef: ElementRef;

  constructor(private eventService: EventService) {
    this.setBlurSubscription = this.eventService.blurNow$.subscribe((isBlur) => {
      this.changeBlur(isBlur);
    });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.setBlurSubscription.unsubscribe();
  }

  private changeBlur(isBlur: boolean): void {
    if (isBlur) {
      this.scrollContainerRef.nativeElement.classList.add('blurBackground');
    } else {
      this.scrollContainerRef.nativeElement.classList.remove('blurBackground');
    }
  }

}
