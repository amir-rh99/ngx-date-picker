import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: "root"
})

export class DatePickerOverlay {

    protected overlayElement!: HTMLElement;

    constructor(
        @Inject(DOCUMENT) protected _document: any    
    ){}

    getOverlayElement(): HTMLElement {
        return this.overlayElement || this.createOverlay()
    }

    protected createOverlay(): HTMLElement {
        const overlay = this._document.createElement("div")
        overlay.classList.add("datepicker_overlay")
        this._document.body.appendChild(overlay)
        this.overlayElement = overlay

        return overlay
    }
}