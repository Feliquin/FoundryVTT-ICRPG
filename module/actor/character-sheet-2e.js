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
    html.find(".js-gritroll").on("click", this._onClickGritRoll.bind(this));
    html.find(".js-surgeroll").on("click", this._onClickSurgeRoll.bind(this));
    html.find(".js-rage-plus").on("click", this._onClickRagePlus.bind(this));
    html.find(".js-fury-plus").on("click", this._onClickFuryPlus.bind(this));
    html.find(".js-fury-zero").on("click", this._onClickFuryReset.bind(this));
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickFuryReset(event) {
    this._element.find(".data-fury").val(0).trigger('change');
  }  

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickRagePlus(event) {
    let myData = this.getData();
    let myVal = myData.system.rage +1;

    if (myVal > 10) {
      myVal = 10;
    }

    this._element.find(".data-rage").val(myVal).trigger('change');
  }  

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickFuryPlus(event) {
    let myData = this.getData();
    let myVal = myData.data.data.fury +1;

    if (myVal > 6) {
      myVal = 6;
    }

    this._element.find(".data-fury").val(myVal).trigger('change');
  }  

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickRageRoll(event) {
    this._element.find(".data-rage").val(0).trigger('change');
  }  

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickGritRoll(event) {
    let myData = this.getData();
    let myVal = myData.data.data.grit.value - 1;

    if (myVal < 0) {
      myVal = 0;
    }

    this._element.find(".data-grit").val(myVal).trigger('change');
  }  

  /**
   * @param {MouseEvent} event
   * @private
   */
  async _onClickSurgeRoll(event) {
    let myData = this.getData();
    let myVal = myData.data.data.surge.value - 1;

    if (myVal < 0) {
      myVal = 0;
    }

    this._element.find(".data-surge").val(myVal).trigger('change');
  }  
}
