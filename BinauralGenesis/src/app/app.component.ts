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
        this.leftOscillator.frequency.value = this.leftFrequency;

        this.rightOscillator = this.audioContext.createOscillator();
        this.rightOscillator.frequency.value = this.rightFrequency;

        this.merger = this.audioContext.createChannelMerger(2);

        //todo: figure this shit out.  Are these channel counts or indices?
        this.leftOscillator.connect(this.merger, 0, 0);
        this.rightOscillator.connect(this.merger, 0, 1);

        this.gain = this.audioContext.createGain();
        this.gain.gain.value = Math.min((this.volumeLevel / 100), 1); //Don't allow crazy fucking volumes.

        this.merger.connect(this.gain);

        this.gain.connect(this.audioContext.destination);
    }

    playPause() {
        this.isPlaying = !this.isPlaying;

        //if we need to play the audio
        if (this.isPlaying) {
            //todo: exponential rampdown/rampup instead of tolerating clicks.
            // come on, this is some rookie shit!
            //is there some better way to handle play/pause?
            this.hookUpAudio();
            this.leftOscillator.start();
            this.rightOscillator.start();
        }
        //if we need to pause the audio
        else {
            this.leftOscillator.stop();
            this.rightOscillator.stop();
        }
    }
}