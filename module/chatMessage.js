export class IcrpgChatMessage extends ChatMessage {
    async _preCreate(data, options, user) {
        console.log("_preCreate", data, options, user);

        if (!foundry.utils.hasProperty(this, "flags.icrpg.pass")) {
            if (this.rolls[0].terms[0].faces === 20) {
                const globalDC = game.settings.get("icrpg", "globalDC");

                const pass = (this.rolls[0].total >= globalDC) && (this.rolls[0].terms[0].results[0].result !== 1);
                this.updateSource({ "flags.icrpg": { pass } });

                const critical = this.rolls[0].terms[0].results[0].result === 20;
                this.updateSource({ "flags.icrpg": { critical } });

                const fail = this.rolls[0].terms[0].results[0].result === 1;
                this.updateSource({ "flags.icrpg": { fail } });
            }
        }

        await super._preCreate(data, options, user)
    }

    async getHTML() {
        console.log('============> TEST');
        const html = await super.getHTML();
        console.log('HTML', html);
        
        const icrpgFlags = this.flags.icrpg || {};
        const passInFlags = "pass" in icrpgFlags;
        const failInFlag = "fail" in icrpgFlags;
        const criticalInFlag = "critical" in icrpgFlags;

        if (!passInFlags) return html;

        if (this.flags.icrpg.fail) {
            html.find(".flavor-text").addClass("icrpg-totalfail-text");
            html.find("h4.dice-total").addClass("icrpg-totalfail");
        } else if (this.flags.icrpg.critical) {
            html.find(".flavor-text").addClass("icrpg-critical-text");
            html.find("h4.dice-total").addClass("icrpg-critical");
        } else if (this.flags.icrpg.pass) {
            html.find(".flavor-text").addClass("icrpg-pass-text");
            html.find("h4.dice-total").addClass("icrpg-pass");
        } else {
            html.find(".flavor-text").addClass("icrpg-fail-text");
            html.find("h4.dice-total").addClass("icrpg-fail");
        }

        return html;
    }
}