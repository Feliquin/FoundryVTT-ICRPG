export class IcrpgChatMessage extends ChatMessage {
    async _preCreate(data, options, user) {
        console.log("_preCreate", data, options, user);

        if (!foundry.utils.hasProperty(this, "flags.icrpg.pass")) {
            console.log("this", this);
            if (this.rolls[0]?.terms[0].faces === 20) {
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

    
}