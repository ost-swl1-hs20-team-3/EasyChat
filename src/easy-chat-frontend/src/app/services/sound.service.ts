import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  // must match with /assets/sounds/*
  private files = {
    sieHabenPostLouisDeFunes: '/assets/sounds/sieHabenPostLouisDeFunes.mp3',
    sieHabenPostLilJon: '/assets/sounds/sieHabenPostLilJon.mp3',
    sieHabenPostRanjid: '/assets/sounds/sieHabenPostRanjid.mp3',
    sieHabenPostAOL: '/assets/sounds/sieHabenPostAOL.mp3'
  };

  constructor() { }

  private playSound(fileName: string): void {
    if (fileName !== undefined) {
      const sound = new Howl({
        src: [fileName]
      });
      sound.play();
    }
  }

  public playNotification(): void {
    this.playSound(this.files.sieHabenPostRanjid);
  }
}
