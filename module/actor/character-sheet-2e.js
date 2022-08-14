import { IcrpgCharacterSheet } from "./character-sheet.js";

/**
 * Extend the IcrpgCharacterSheet with a 2E sheet
 * @extends {IcrpgCharacterSheet}
 */
export class IcrpgCharacterSheet2E extends IcrpgCharacterSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/icrpg/templates/actor/character-sheet-2e.html",
    });
  }
  
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".js-rage").on("click", this._onClickRageRoll.bind(this));
  }

  /**
   * Listen for click events on an attribute control to modify the composition of attributes in the sheet
   * @param {MouseEvent} event    The originating left click event
   * @private
   */
  async _onClickRageRoll(event) {
    let myData = this.getData();

    myData.data.data.rage = 0;
    html.find(".data-rage").val(0);

    console.log('_onClickRageRoll =-=-=-=-=-=-=-=-=-=-=-=-=-=-=', myData.data.data.rage);
  }  
}
