import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http'
import { Range } from '@angular/core/src/profile/wtf_impl';
import { MatDialog, MatDialogRef } from '@angular/material';

import {MBDescriptionDialog} from './mb-description-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private _httpService: Http, public dialog: MatDialog) {

  }

  isPlaying: boolean = false;

  binauralFrequency: number = 7.83;
  audioTone: number = 140;
  volumeLevel: number = 0;

  //todo: update just to the binaural frequency
  beatPresets: Array<number> = [1.5, 7.83, 13.4, 28, 40];

  //[Name, inclusive lower bound, exclusive upper bound, description]
  beatDescriptions: Array<[string, number, number, string]> = [
    ["Delta", 0, 4,
      "Occurs especially during deep sleep."],
    ["Theta", 4, 8,
      "Occurs during states of deep relaxation."],
    ["Alpha", 8, 12,
      "Occurs during states of relaxed wakefulness."],
    ["Beta", 12, 40,
      "Occurs during states of wakefulness.  Associated states of alertness, problem-solving, or anxiety and stress."],
    ["Gamma", 40, 100,
      "Gamma is associated with states of intense focus, absorbing new information, fear, and hypervigilance."],
    ["Invalid", 100, 10000,
      "Don't put this into your brain."]
  ];

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

  openDescriptionDialog(): void {
    let dialogRef = this.dialog.open(MBDescriptionDialog, {
      maxWidth: '450px',
      minWidth: '300px',
      position: {top: '20px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  initializeAudioPipeline() {
    this.audioContext = new AudioContext();

    this.merger = this.audioContext.createChannelMerger(2);
    this.gain = this.audioContext.createGain();

    this.merger.connect(this.gain);
    this.gain.connect(this.audioContext.destination);
  }

  getFrequencyDescription(): [string, number, number, string] {
    //todo: expose these to the view, and use them instead of arbitrary, hardcoded integers?
    let iTitle: number = 0;
    let iLowerBound: number = 1;
    let iUpperBound: number = 2;
    let iDescription: number = 4;

    return this.beatDescriptions
      .find(bd =>
        (bd[iLowerBound] <= this.binauralFrequency) &&
        (bd[iUpperBound] > this.binauralFrequency));
  }

  updateOnDrag(binauralFrequency: number, audioTone: number, volume: number) {
    if (!(binauralFrequency === undefined))
      this.binauralFrequency = binauralFrequency;

    if (!(audioTone === undefined))
      this.audioTone = audioTone;

    if (!(volume === undefined))
      this.volumeLevel = volume;
  }

  updateFrequencyAndVolume() {
    //Used to reduce overall gain range from 0->1 to 0->N.  For hearing safety.
    const volumeScalingFactor: number = 0.22;

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
    this.leftOscillator.frequency.setTargetAtTime(this.audioTone, 0, 0);
    this.rightOscillator.frequency.setTargetAtTime(this.audioTone + this.binauralFrequency, 0, 0);
  }

  playPause() {
    //TODO: try allowing for on-the-fly frequency, volume, and pitch changes.
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