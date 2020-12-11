import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private newMessageSound = '';
  private newUserLoginSound = '';
  private newUserLogoutSound = '';
  private usernameChangedSound = '';

  // Sound Files
  // must match with /assets/sounds/*
  private newMessageSoundfiles = {
    // www.freesfx.co.uk / Fast Sci Fi Alarm / 16916_1461333028
    sciFiAlarm: '/assets/sounds/sciFiAlarm_freesfx.co.uk.mp3',
    // www.freesfx.co.uk / Very Quick Slide Down from Slide Whistle / 16242_1460569610
    veryQuickSlideDownFromSlideWhistle: '/assets/sounds/veryQuickSlideDownFromSlideWhistle_freesfx.co.uk.mp3',
    // www.freesfx.co.uk / Short Calling Whistle / 16217_1460569192
    shortCallingWhistle: '/assets/sounds/shortCallingWhistle_freesfx.co.uk.mp3',

    // OTHER unlicensed sounds!
    // sieHabenPostLouisDeFunes: '/assets/sounds/sieHabenPostLouisDeFunes.mp3',
    // sieHabenPostLilJon: '/assets/sounds/sieHabenPostLilJon.mp3',
    // sieHabenPostRanjid: '/assets/sounds/sieHabenPostRanjid.mp3',
    // sieHabenPostAOL: '/assets/sounds/sieHabenPostAOL.mp3'
  };

  private userLoginSoundfiles = {
    // www.freesfx.co.uk / Cuckoo Clock at 1 O'Clock / 13970_1459880753
    kuckucksuhr: '/assets/sounds/kuckucksuhr_freesfx.co.uk.mp3',
    // www.freesfx.co.uk / Up and Low Beep / 17037_1461336970
    upAndLowBeep: '/assets/sounds/upAndLowBeep_freesfx.co.uk.mp3',
    // www.freesfx.co.uk / Ascending Beep / 17024_1461336944
    ascendingBeep: '/assets/sounds/ascendingBeep_freesfx.co.uk.mp3',
  };

  private userLogoutSoundfiles = {
    // www.freesfx.co.uk / Three Down Beep / 17036_1461336968
    threeDownBeep: '/assets/sounds/threeDownBeep_freesfx.co.uk.mp3',
  };

  private usernameChangedfiles = {
  };

  constructor() {
    // Add CreditsComment to JSConsole
    console.log('Open Source Credit: Sound effects thankfully taken from http://www.freesfx.co.uk');

    this.newMessageSound = this.getRandomSound(SoundType.NewMessage);
    this.newUserLoginSound = this.getRandomSound(SoundType.UserLogin);
    this.newUserLogoutSound = this.getRandomSound(SoundType.UserLogout);
  }

  private playSound(fileName: string): void {
    if (fileName !== undefined || fileName === '') {
      const sound = new Howl({
        src: [fileName]
      });
      sound.play();
    }
  }

  private getRandomSound(type: SoundType): string {
    switch (type) {
      case SoundType.NewMessage:
        const newMessageKeys = Object.keys(this.newMessageSoundfiles);
        // tslint:disable-next-line: no-bitwise
        return this.newMessageSoundfiles[newMessageKeys[newMessageKeys.length * Math.random() << 0]];
        break;
      case SoundType.UserLogin:
        const userLoginKeys = Object.keys(this.userLoginSoundfiles);
        // tslint:disable-next-line: no-bitwise
        return this.userLoginSoundfiles[userLoginKeys[userLoginKeys.length * Math.random() << 0]];
        break;
      case SoundType.UserLogout:
        const userLogoutKeys = Object.keys(this.userLogoutSoundfiles);
        // tslint:disable-next-line: no-bitwise
        return this.userLogoutSoundfiles[userLogoutKeys[userLogoutKeys.length * Math.random() << 0]];
        break;
      case SoundType.UsernameChanged:
        const usernameChangedKeys = Object.keys(this.usernameChangedfiles);
        // tslint:disable-next-line: no-bitwise
        return this.usernameChangedfiles[usernameChangedKeys[usernameChangedKeys.length * Math.random() << 0]];
        break;
      default:
        break;
    }
  }

  public playNewMessage(): void {
    if (this.newMessageSound === undefined || this.newMessageSound === '') {
      this.newMessageSound = this.getRandomSound(SoundType.NewMessage);
    }

    this.playSound(this.newMessageSound);
  }

  public playUserLogin(): void {
    if (this.newUserLoginSound === undefined || this.newUserLoginSound === '') {
      this.newUserLoginSound = this.getRandomSound(SoundType.NewMessage);
    }

    this.playSound(this.newUserLoginSound);
  }

  public playUserLogout(): void {
    if (this.newUserLogoutSound === undefined || this.newUserLogoutSound === '') {
      this.newUserLogoutSound = this.getRandomSound(SoundType.NewMessage);
    }

    this.playSound(this.newUserLogoutSound);
  }

  public playUsernameChanged(): void {
    if (this.usernameChangedSound === undefined || this.usernameChangedSound === '') {
      this.usernameChangedSound = this.getRandomSound(SoundType.UsernameChanged);
    }

    this.playSound(this.usernameChangedSound);
  }
}

export enum SoundType {
  NewMessage,
  UserLogin,
  UserLogout,
  UsernameChanged
}
