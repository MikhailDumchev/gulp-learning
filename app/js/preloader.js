function Preloader() {
    "use strict";
    var container = new Object();
    var preloader = new Object();
    var background = new Object();
    var preloaderClassName = "preloader";
    var backgroudClassName = "preloader-background";
    var figureID = "figure-";
    var figuresAmount = 9;
    var duration = 400;
    this.setContainer = function(value) {
        container = value;
    };
    this.appendPreloader = function() {
        var counter = 0;
        var figure = new Object();
        background = document.createElement("div");
        background.className = backgroudClassName;
        preloader = document.createElement("div");
        preloader.className = preloaderClassName;
        for (counter; counter < figuresAmount; counter++) {
            figure = document.createElement("div");
            figure.id = figureID + (counter + 1);
            preloader.appendChild(figure);
        }
        container.appendChild(background);
        window.setTimeout(function () {
            try {
                opacityAnimationCall(background, duration / 2, 1);
                window.setTimeout(function () {
                    background.appendChild(preloader);
                    opacityAnimationCall(preloader, duration / 2, 1);
                }.bind(this), duration / 2 + 10);
            } catch (error) {
                if (error instanceof  ReferenceError) {
                    console.error("Не подключен скрипт 'opacity-animation.js';");
                }
            }
        }.bind(this, duration / 2 + 10));
    };
    this.removePreloader = function() {
        background.removeChild(preloader);
        container.removeChild(background);
    };
}