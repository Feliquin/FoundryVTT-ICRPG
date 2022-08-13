export class IcrpgGlobalTimer extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/icrpg/templates/globalTimer/global-Timer.html",
            id: "icrpg-globalTimer",
        });
    }

    getData() {
        return {
            globalTimer: game.settings.get("icrpg", "globalTimer")
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (game.user.isGM) {
            const draggable = new Draggable(this, html, this.element[0], false);
            draggable._onDragMouseUp = event => {
                Draggable.prototype._onDragMouseUp.call(draggable, event);

                const position = {
                    left: this.position.left,
                    top: this.position.top
                };
                socket.emit("system.icrpg", {
                    action: "positionGlobalTimer",
                    position: {
                        left: position.left / (window.innerWidth - 100),
                        top: position.top / (window.innerHeight - 250)
                    }
                });
                game.settings.set("icrpg", "globalTimerposition", position);
            };

            html[0].addEventListener("contextmenu", function (event) {
                const globalTimerinput = Object.values(ui.windows).find(w => w.id === "icrpg-globalTimerinput");
                if (globalTimerinput) {
                    globalTimerinput.setPosition({ top: game.icrpg.globalTimer.position.top, left: game.icrpg.globalTimer.position.left + 110 });
                    globalTimerinput.bringToTop();
                }
                else new GlobalTimerConfig().render(true);
            });
        }
    }

    async _render(force = false, options = {}) {
        await super._render(force, options);
        this.element.css({ "height": "100px", "width": "100px" });
        if (game.settings.get("icrpg", "globalTimervisible")) this.element.css("display", "");
        else this.element.css("display", "none");

        // Dodge escape-close
        delete ui.windows[this.appId];
    }

}

class GlobalTimerConfig extends Application {
    constructor() {
        super();
        this._disable_popout_module = true;
    }
    static get defaultOptions() {
        const globalTimerapp = game.icrpg.globalTimer;
        return mergeObject(super.defaultOptions, {
            id: "icrpg-globalTimerinput",
            template: "/systems/icrpg/templates/globalTimer/global-Timer-config.html",
            title: game.i18n.localize("ICRPG.GlobalTimer"),
            width: "130px",
            left: globalTimerapp.position.left + 110,
            top: globalTimerapp.position.top
        });
    }

    getData() {
        return {
            globalTimer: game.settings.get("icrpg", "globalTimer")
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find("button.submit").click(() => {
            const input = html.find("input");
            const val = input.val();
            const globalTimer = parseInt(val);
            if (globalTimer) game.settings.set("icrpg", "globalTimer", globalTimer);

            this.close();
        });


        html.find("button.reduce").click(() => {
            const input = html.find("input");
            const val = input.val();
            let globalTimer = parseInt(val);

            globalTimer = ((globalTime - 1) > 0) ? (globalTime - 1) : 0;
            input.val(globalTimer);
            game.settings.set("icrpg", "globalTimer", globalTimer);

            this.close();
        });
    }

    async _render(force = false, options = {}) {
        await super._render(force, options);

        this.element.css("width", "135px");
    }

}