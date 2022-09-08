import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: "root"
})

export class DatePickerContainer {

    constructor(
        @Inject(DOCUMENT) protected _document: any    
    ){}

    createDatePickerContainerElement(): HTMLElement {
        const container: HTMLElement = this._document.createElement("div")

        container.classList.add("datepicker_container")
        container.style.position = "absolute"
        container.style.width = "300px"
        container.style.minHeight = "300px"

        return container
    }
}