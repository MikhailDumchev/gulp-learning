function ModalWindow() {
    var modalWindowClassName = "modal-window";
    var callerClassName = "caller";
    var activeWindowClassName = "active";
    var hidingClassName = "hiding";
    var modalWindow = new Object();
    this.initilize = function() {
        "use strict";
        var counter = 0;
        var additoryVariable = selectElementByClassName(modalWindowClassName);
        if (additoryVariable.status) {
            modalWindow = additoryVariable.element;
            additoryVariable = document.getElementsByClassName(callerClassName);
            if (additoryVariable.length) {
                for (counter; counter < additoryVariable.length; counter++)
                    additoryVariable[counter].addEventListener("click", this, true);
                modalWindow.addEventListener("click", this, true);
            }
        }
    };
    this.handleEvent = function(event) {
        "use strict";
        event = event || window.event;
        var element = event.target;
        var indicator = false;
        //Поиск кнопки на основании делегации (целевой HTML-элемент находится не в конце HTML-ветки);
        var additoryVariable = searchContainer(element, "class", callerClassName);
        if (additoryVariable.status) element = additoryVariable.element;
        if (testClassName(element, callerClassName)) {
            addClassName(document.body, hidingClassName);
            addClassName(modalWindow, activeWindowClassName);
        } else {
            if (testClassName(modalWindow, activeWindowClassName)) {
                additoryVariable = element;
                while (!indicator && additoryVariable.nodeName !== "BODY") {
                    if (additoryVariable.nodeName === "FORM") indicator = true;
                    additoryVariable = additoryVariable.parentNode;
                }
                if (!indicator) {
                    clearClassName(document.body, hidingClassName);
                    clearClassName(modalWindow, activeWindowClassName);
                }
            }
        }
    };
}