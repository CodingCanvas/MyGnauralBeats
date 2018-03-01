import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private _httpService: Http) {

  }

  isPlaying: boolean = false;
  volumeLevel: number = 0;
  leftFrequency: number = 100.0;
  rightFrequency: number = 107.83;

  volumeRampUp: number = 0.25;
  volumeRampDown: number = 0.1;

  audioContext: AudioContext;
  leftOscillator: OscillatorNode;
  rightOscillator: OscillatorNode;
  merger: ChannelMergerNode;
  gain: GainNode;

  ngOnInit() {
    //Wire-up the audio path!
    //merge two separate channels, merge them into stereo output,
    //apply the gain-level to manage volume,
    //and play!
    this.audioContext = new AudioContext();
  }

  hookUpAudio() {
    //todo: any way to reuse audioNodes between starts and pauses?
    this.leftOscillator = this.audioContext.createOscillator();
    this.leftOscillator.frequency.setTargetAtTime(this.leftFrequency, 0, 0);

    this.rightOscillator = this.audioContext.createOscillator();
    this.rightOscillator.frequency.setTargetAtTime(this.rightFrequency, 0, 0);

    this.merger = this.audioContext.createChannelMerger(2);

    //Put left-channel into left ear, right-channel into right ear.
    this.leftOscillator.connect(this.merger, 0, 0);
    this.rightOscillator.connect(this.merger, 0, 1);

    var safeVolume: number = Math.min((this.volumeLevel / 100), 1); //Don't allow crazy effin' volumes.

    this.gain = this.audioContext.createGain();
    this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gain.gain.setTargetAtTime(safeVolume, this.audioContext.currentTime + this.volumeRampUp, 0.5);
    //this.gain.gain.value = Math.min((this.volumeLevel / 100), 1); //Don't allow crazy fucking volumes.

    this.merger.connect(this.gain);

    this.gain.connect(this.audioContext.destination);
  }

  playPause() {
    this.isPlaying = !this.isPlaying;

    //if we need to play the audio
    if (this.isPlaying) {
      //Todo: see if you can reuse AudioNodes instead of bothering garbage collection.
      this.hookUpAudio();
      this.leftOscillator.start();
      this.rightOscillator.start();
    }
    //if we need to pause the audio
    else {
      var currentTime = this.audioContext.currentTime;
      var stopTime = currentTime + 1;

      this.gain.gain.setTargetAtTime(0, currentTime, this.volumeRampDown);
      this.leftOscillator.stop(stopTime)
      this.rightOscillator.stop(stopTime);
    }
  }
}
