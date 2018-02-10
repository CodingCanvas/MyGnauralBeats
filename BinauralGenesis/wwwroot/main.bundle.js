webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Binaural Beat Generator</h1>\r\n<div mat-app-background>\r\n  <div id=\"leftEarDiv\">\r\n    <label>Left ear frequency</label>\r\n    <!-- TODO: make a separate binaural slider class to clean this shit up! -->\r\n    <md-slider class=\"leftEarFrequency\"\r\n               max=\"400\"\r\n               min=\"48\"\r\n               step=\"0.1\"\r\n               [(ngModel)]=\"leftFrequency\">\r\n    </md-slider>\r\n    <input type=\"number\" [(ngModel)]=\"leftFrequency\" min=\"1\" max=\"400\" placeholder=\"100\" step=\"0.1\" />\r\n    <label>{{leftFrequency}}hz</label>\r\n  </div>\r\n  <div id=\"rightEarDiv\">\r\n    <label>Right ear frequency</label>\r\n    <md-slider class=\"rightEarFrequency\"\r\n               max=\"400\"\r\n               min=\"48\"\r\n               step=\"0.1\"\r\n               [(ngModel)]=\"rightFrequency\">\r\n    </md-slider>\r\n    <input type=\"number\" [(ngModel)]=\"rightFrequency\" min=\"1\" max=\"400\" placeholder=\"100\" step=\".1\" />\r\n    <label>{{rightFrequency}}hz</label>\r\n  </div>\r\n  <!-- TODO: Bind it to some function that updates on-the-fly, turns sound 'off' at zero volume. -->\r\n  <div id=\"volumeDiv\">\r\n    <label>Volume Level</label>\r\n    <md-slider class=\"volumeSlider\"\r\n               max=\"100\"\r\n               min=\"0\"\r\n               title=\"Voluminous\"\r\n               step=\"1\"\r\n               [(ngModel)]=\"volumeLevel\">\r\n    </md-slider>\r\n    <input type=\"number\" [(ngModel)]=\"volumeLevel\" min=\"0\" max=\"100\" placeholder=\"0\" step=\"1\" />\r\n    <label>{{volumeLevel}}%</label>\r\n  </div>\r\n\r\n  <button md-button id=\"button_PlayPause\" (click)=\"playPause()\">{{isPlaying ? \"Pause\" : \"Play\"}}</button>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
        this.isPlaying = false;
        this.volumeLevel = 0;
        this.leftFrequency = 100.0;
        this.rightFrequency = 107.83;
    }
    AppComponent.prototype.ngOnInit = function () {
        //Wire-up the audio path!
        //merge two separate channels, merge them into stereo output,
        //apply the gain-level to manage volume,
        //and play!
        this.audioContext = new AudioContext();
    };
    AppComponent.prototype.hookUpAudio = function () {
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
    };
    AppComponent.prototype.playPause = function () {
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
        else {
            this.leftOscillator.stop();
            this.rightOscillator.stop();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_hammerjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MdButtonModule */], __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MdCardModule */], __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MdSliderModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map