// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.
// "use strict";

namespace fabric {


  /**
   * Persona Card Plugin
   *
   * Adds basic demonstration functionality to .ms-PersonaCard components.
   *
   */
  export class PersonaCard {

    private _container: HTMLElement;
    private _activeAction: String;

    /**
     *
     * @param {HTMLElement} container - the target container for an instance of PersonaCard
     * @constructor
     */
    constructor(container: HTMLElement) {
      this._container = container;
      const actions: HTMLElement = <HTMLElement>this._container.querySelector(".ms-PersonaCard-actions");
      actions.addEventListener("click", this._onActionClick.bind(this), false);
      this._activeAction = (<HTMLElement>this._container.querySelector(".ms-PersonaCard-action.is-active")).getAttribute("data-action-id");
      this._setDetail();
    }

    public removeListeners(): void {
      this._container.removeEventListener("click", this._onActionClick.bind(this));
    }

    private _onActionClick(event: Event): void {
      const target: HTMLElement = <HTMLElement>event.target;
      const actionId: string = target.getAttribute("data-action-id");
      if (target.className.indexOf("ms-PersonaCard-action") > -1 && this._activeAction !== actionId) {
        this._activeAction = actionId;
        this._setAction(target);
        this._setDetail();
      }
    }

    private _setAction(target: HTMLElement): void {
      const activeElement: HTMLElement = <HTMLElement>this._container.querySelector(".ms-PersonaCard-action.is-active");
      activeElement.classList.remove("is-active");
      target.classList.add("is-active");
    }

    private _setDetail(): void {
      const lastDetail: HTMLElement = <HTMLElement>this._container.querySelector(".ms-PersonaCard-details.is-active");
      const activeDetail: HTMLElement = <HTMLElement>this._container.querySelector(".ms-PersonaCard-details[data-detail-id='" + this._activeAction + "']");
      if (lastDetail) {
        lastDetail.classList.remove("is-active");
      }
      activeDetail.classList.add("is-active");
    }
  }
}