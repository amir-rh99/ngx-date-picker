import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ThemeConfig } from "../config/datePicker-config";

@Injectable({
    providedIn: "root"
})

export class DatePickerContainer {

    constructor(
        @Inject(DOCUMENT) protected _document: any    
    ){}

    createDatePickerContainerElement(themeConfig: Partial<ThemeConfig>): HTMLElement {
        const container: HTMLElement = this._document.createElement("div")

        this.setThemeVariables(container, themeConfig)
        container.classList.add("datepicker_container")
        container.style.position = "absolute"
        container.style.width = "300px"
        container.style.minHeight = "300px"

        return container
    }

    private setThemeVariables(element: HTMLElement, config: Partial<ThemeConfig>){

        let [p, s, b] = [
            this.hexToRgb(config.light!.primaryColor || ""),
            this.hexToRgb(config.light!.secondaryColor || ""),
            this.hexToRgb(config.light!.backgroudColor || ""),
        ]
                
        element.style.setProperty("--primaryColor", [p?.r, p?.g, p?.b].join(","))
        element.style.setProperty("--secondaryColor", [s?.r, s?.g, s?.b].join(","))
        element.style.setProperty("--backgroudColor", [b?.r, b?.g, b?.b].join(","))
        
        let rounded: string;

        if(config.rounded == "full"){
            rounded = "999rem"
        } else if (config.rounded == "medium"){
            rounded = "0.75rem"
        } else {
            rounded = "0.1rem"
        }

        element.style.setProperty("--borderRounded", rounded)
    }

    private hexToRgb(hex: string) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
}