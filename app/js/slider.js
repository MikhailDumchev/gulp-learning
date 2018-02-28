function Slider() {
    var previewModuleClassName = "module-with-preview";
    var containerClassName = "slider";
    var controlPanelClassName = "control-panel";
    var activeElementClassName = "active";
    var referenceAttribute = "data-reference";
    var plugAttribute = "data-indicator";
    var container = new Object();
    this.Container = function(value) {
        "use strict";
        if (!arguments.length) return container;
        else container = value;
    };
    var previewModule = new Object();
    var controlPanel = new Object();
    var targetsArray = new Array();
    var currentImage = 0;
    var duration = 200;
    this.initilize = function() {
        "use strict";
        var additoryVariable = new Object();
        var counter = 0;
        if (container.toString() === "[object Object]") {
            additoryVariable = selectElementByClassName(containerClassName);
            if (additoryVariable.status) {
                container = additoryVariable.element;
            } else notify(containerClassName, 2);
        } else notify("Не указан DOM-элемент, который выполняет роль контейнера для слайдера;");
        if (container.toString() !== "[object Object]") {
            additoryVariable = selectElementByClassName(controlPanelClassName, container);
            if (additoryVariable.status && additoryVariable.element.nodeName === "UL") {
                controlPanel = additoryVariable.element;
                additoryVariable = selectElementByClassName(previewModuleClassName, container);
                if (additoryVariable.status) {
                    previewModule = additoryVariable.element;
                    //Поиск
                    additoryVariable = controlPanel.getElementsByTagName("li");
                    if (additoryVariable.length) {
                        for (counter; counter < additoryVariable.length; counter++) {
                            additoryVariable[counter].setAttribute("data-reference", counter);
                            additoryVariable[counter].addEventListener("mouseenter", this, true);
                            additoryVariable[counter].addEventListener("mousemove", this, true);
                        }
                    }
                    //Сохранение ссылок на изображения;
                    additoryVariable = previewModule.getElementsByTagName("img");
                    if (additoryVariable.length) {
                        for (counter = 0; counter < additoryVariable.length; counter++) {
                            targetsArray[counter] = additoryVariable[counter];
                        }
                    }
                } else notify(previewModuleClassName, 2);
            } else notify(controlPanelClassName, 2);
        }
    };
    var deactivateItems = function() {
        "use strict";
        var additoryVariable = selectElementByClassName(activeElementClassName, controlPanel);
        if (additoryVariable.status) clearClassName(additoryVariable.element, activeElementClassName);
    };
    var activateItem = function(element) {
        "use strict";
        addClassName(element, activeElementClassName);
    };
    var startAnimation = function(element) {
        "use strict";
        var additoryVariable = new Object();
        additoryVariable = targetsArray[parseInt(element.getAttribute(referenceAttribute))];
        if (additoryVariable) {
            document.body.setAttribute(plugAttribute, true);
            deactivateItems();
            activateItem(element);
            opacityAnimationCall(targetsArray[currentImage], duration, 0);
            window.setTimeout(function() {
                clearStyleAttribute(targetsArray[currentImage], ["opacity"]);
                clearClassName(targetsArray[currentImage], activeElementClassName);
                opacityAnimationCall(additoryVariable, duration, 1);
                window.setTimeout(function() {
                    addClassName(additoryVariable, activeElementClassName);
                    clearStyleAttribute(additoryVariable, ["opacity", "display"]);
                    currentImage = parseInt(element.getAttribute(referenceAttribute));
                    document.body.removeAttribute(plugAttribute);
                }.bind(this), duration + 10);
            }.bind(this), duration + 10);
        }
    };
    this.handleEvent = function(event) {
        "use strict";
        event = event || window.event;
        var element = event.target;
        if (event.type === "mouseenter") {
            if (element.hasAttribute(referenceAttribute) && !document.body.hasAttribute(plugAttribute)) {
                startAnimation(element);
            }
        }
        if (event.type === "mousemove") {
            if (!testClassName(element, activeElementClassName) && !document.body.hasAttribute(plugAttribute)) {
                startAnimation(element);
            }
        }
    };
}