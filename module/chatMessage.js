export class IcrpgChatMessage extends ChatMessage {
    async _preCreate(data, options, user) {

        if (!foundry.utils.hasProperty(this.data, "flags.icrpg.pass")) {
            /*
            Unfinished: Can't figure out how to access actor data
            Goal: When rolling for power show if successful; update power value
            ---
            console.log('=-= IcrpgChatMessage', this);
            
            if (this.data?.flavor.includes("Hard Suit Power")) {
                console.log('-> power');
                const globalDC = game.settings.get("icrpg", "globalDC");
                const pass = this.roll.total >= globalDC;
                this.data.update({ "flags.icrpg": { pass } });
            }
            */
            if (this.roll?.terms[0].faces === 20) {
                const globalDC = game.settings.get("icrpg", "globalDC");
                const pass = this.roll.total >= globalDC;
                this.data.update({ "flags.icrpg": { pass } });
            }
        }

        await super._preCreate(data, options, user)
    }

    async getHTML() {
        const html = await super.getHTML();
        
        const icrpgFlags = this.data.flags.icrpg || {};
        const passInFlags = "pass" in icrpgFlags;
        if (!passInFlags) return html;

        if (this.data.flags.icrpg.pass) html.find("h4.dice-total").addClass("icrpg-pass");
        else html.find("h4.dice-total").addClass("icrpg-fail");

        return html;
    }
}