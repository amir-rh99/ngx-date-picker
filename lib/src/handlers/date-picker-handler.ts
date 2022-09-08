import { ComponentFactoryResolver, ComponentRef, 
         Inject, Injectable, ViewContainerRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { GlobalConfig } from "../config/datePicker-config";
import { NgxDatePickerComponent } from "../datepicker";
import { DatePickerContainer } from "./date-picker-container";
import { DatePickerOverlay } from "./date-picker-overlay";

@Injectable({
    providedIn: 'root'
})

export class DatePickerHandler {
    
    private _componentInstance!: ComponentRef<any>;
    private _viewContainerRef!: ViewContainerRef;
    private _datePickerOverlay!: HTMLElement;
    private _datePickerContainer!: HTMLElement;

    private inputElement!: HTMLInputElement

    constructor(
        @Inject(DOCUMENT) protected _document: any,    
        private dpOverlay: DatePickerOverlay,
        private dpContainer: DatePickerContainer,
        private _componentFactoryResolver: ComponentFactoryResolver,
    ){}

    init(inputElement: HTMLInputElement, config: GlobalConfig, vcRef: ViewContainerRef): ComponentRef<any>{
        this._viewContainerRef = vcRef
        this.inputElement = inputElement

        return this.createAndResolveDatePicker(config)
    }

    createAndResolveDatePicker(config: GlobalConfig){
        const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(NgxDatePickerComponent)
        this._componentInstance = this._viewContainerRef.createComponent(_componentFactory);
        this._componentInstance.instance.config = config

        const datePikerOverlay = this.dpOverlay.getOverlayElement();
        const datePickerContainer = this.dpContainer.createDatePickerContainerElement()

        datePikerOverlay.classList.add("opened")
        this._datePickerOverlay = datePikerOverlay
        this._datePickerContainer = datePickerContainer

        this.setDatePickerContainerPositions()

        datePickerContainer.appendChild(this._componentInstance.location.nativeElement)
        datePikerOverlay.appendChild(datePickerContainer)

        return this._componentInstance
    }

    setDatePickerContainerPositions(){
        const { top, left, height } = this.inputElement.getBoundingClientRect()

        this._datePickerContainer.style.position = "absolute"
        this._datePickerContainer.style.left = left + "px"
        this._datePickerContainer.style.top = top + height + 2 + "px"
    }

    closeAndRemoveDatePicker(){
        this._componentInstance.destroy()
        this._datePickerOverlay.classList.remove("opened")
        this._datePickerOverlay.innerHTML = ""
    }
}