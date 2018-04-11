import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private _httpService: Http) {

  }

  isPlaying: boolean = false;
  volumeLevel: number = 0;
  leftFrequency: number = 100.0;
  rightFrequency: number = 107.83;

  private volumeRampUp: number = 0.25;
  private volumeRampDown: number = 0.1;

  private audioContext: AudioContext;
  private leftOscillator: OscillatorNode;
  private rightOscillator: OscillatorNode;
  private merger: ChannelMergerNode;
  private gain: GainNode;

  ngOnInit() {
    this.initializeAudioPipeline();
  }

  initializeAudioPipeline() {
    this.audioContext = new AudioContext();

    this.merger = this.audioContext.createChannelMerger(2);
    this.gain = this.audioContext.createGain();

    this.merger.connect(this.gain);
    this.gain.connect(this.audioContext.destination);
  }

  updateFrequencyAndVolume() {
    //Used to reduce overall gain range from 0->1 to 0->N.  For hearing safety.
    const volumeScalingFactor: number = 0.33;

    //note: oscillators can only be started once, so we need to re-create & recconnect them every time.  Lame.
    this.connectBinauralOscillators();

    this.leftOscillator.connect(this.merger, 0, 0);
    this.rightOscillator.connect(this.merger, 0, 1);


    var safeVolume: number = Math.min((this.volumeLevel / 100) * volumeScalingFactor, 1); //Don't allow crazy effin' volumes.

    this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gain.gain.setTargetAtTime(safeVolume, this.audioContext.currentTime + this.volumeRampUp, 0.5);
  }

  private disconnectFromMerger(node: OscillatorNode, ev: MediaStreamErrorEvent): any {
    node.disconnect(this.merger);
  }

  private connectBinauralOscillators() {
    //first, disconnect old oscillators
    if (typeof this.leftOscillator !== "undefined") {
      this.leftOscillator.disconnect(this.merger);
      this.rightOscillator.disconnect(this.merger);
    }

    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    this.leftOscillator.frequency.setTargetAtTime(this.leftFrequency, 0, 0);
    this.rightOscillator.frequency.setTargetAtTime(this.rightFrequency, 0, 0);
  }

  playPause() {
    //TODO: try keeping everything started at all times.
    //"Pausing" simply sets gain to 0, playing sets it to 'volumeLevel'... normalized for hearing safety, of course.
    this.isPlaying = !this.isPlaying;

    //if we need to play the audio
    if (this.isPlaying) {
      this.updateFrequencyAndVolume();
      this.leftOscillator.start();
      this.rightOscillator.start();
    }

    //if we need to pause the audio
    else {
      var currentTime = this.audioContext.currentTime;
      var stopTime = currentTime + 1;

      this.StopAudio(currentTime, stopTime);
    }
  }

  private StopAudio(currentTime: number, stopTime: number) {
    this.gain.gain.setTargetAtTime(0, currentTime, this.volumeRampDown);
    this.leftOscillator.stop(stopTime);
    this.rightOscillator.stop(stopTime);
  }
}
