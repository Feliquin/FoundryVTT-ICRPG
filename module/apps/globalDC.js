export class IcrpgGlobalDC extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/icrpg/templates/globalDC/global-DC.html",
            id: "icrpg-globalDC",
        });
    }

    getData() {
        return {
            globalDC: game.settings.get("icrpg", "globalDC")
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
                    action: "positionGlobalDC",
                    position: {
                        left: position.left / (window.innerWidth - 128),
                        top: position.top / (window.innerHeight - 200)
                    }
                });
                game.settings.set("icrpg", "globalDCposition", position);
            };

            html[0].addEventListener("contextmenu", function (event) {
                const globalDCinput = Object.values(ui.windows).find(w => w.id === "icrpg-globalDCinput");
                if (globalDCinput) {
                    globalDCinput.setPosition({ top: game.icrpg.globalDC.position.top, left: game.icrpg.globalDC.position.left + 138 });
                    globalDCinput.bringToTop();
                }
                else new GlobalDCConfig().render(true);
            });
        }
    }

    async _render(force = false, options = {}) {
        await super._render(force, options);
        this.element.css({ "height": "200px", "width": "128px" });
        if (game.settings.get("icrpg", "globalDCvisible")) this.element.css("display", "");
        else this.element.css("display", "none");

        // Dodge escape-close
        delete ui.windows[this.appId];
    }

}

class GlobalDCConfig extends Application {
    constructor() {
        super();
        this._disable_popout_module = true;
    }
    static get defaultOptions() {
        const globalDCapp = game.icrpg.globalDC;
        return mergeObject(super.defaultOptions, {
            id: "icrpg-globalDCinput",
            template: "/systems/icrpg/templates/globalDC/global-DC-config.html",
            title: game.i18n.localize("ICRPG.GlobalDC"),
            width: "130px",
            left: globalDCapp.position.left + 138,
            top: globalDCapp.position.top
        });
    }

    getData() {
        return {
            globalDC: game.settings.get("icrpg", "globalDC")
        };
    }
 
    activateListeners(html) {
        super.activateListeners(html);

        html.find("button.submit").click(() => {
            const input = html.find("input");
            const val = input.val();
            const globalDC = parseInt(val);

            if (!globalDC) {
                globalDC = 10;
                input.val(10);
            }
            if (globalDC > 20) {
                globalDC = 20;
                input.val(20);
            }
            if (globalDC < 8) {
                globalDC = 8;
                input.val(8);
            }

            if (globalDC) game.settings.set("icrpg", "globalDC", globalDC);

            this.close();
        });

        html.find("button.target-10").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 10);
            input.val(10);
            this.close();            
        });        

        html.find("button.target-12").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 12);
            input.val(12);
            this.close();            
        });        

        html.find("button.target-14").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 14);
            input.val(14);
            this.close();            
        });        

        html.find("button.target-16").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 16);
            input.val(16);
            this.close();            
        });        

        html.find("button.target-18").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 18);
            input.val(18);
            this.close();            
        });        

        html.find("button.target-20").click(() => {
            const input = html.find("input");

            game.settings.set("icrpg", "globalDC", 20);
            input.val(20);
            this.close();            
        });        
    }

    async _render(force = false, options = {}) {
        await super._render(force, options);

        this.element.css("width", "135px");
    }

}