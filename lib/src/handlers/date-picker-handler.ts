import { ComponentFactoryResolver, ComponentRef, 
         Inject, Injectable, Renderer2, ViewContainerRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { GlobalConfig } from "../config/datePicker-config";
import { NgxDatePickerComponent } from "../datepicker";
import { DatePickerContainer } from "./date-picker-container";
import { DatePickerOverlay } from "./date-picker-overlay";

@Injectable({
    providedIn: 'root'
})

export class DatePickerHandler {

    private _listeners: any[] = [];
    datePickerIsOpened: boolean = false;

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
        private _renderer: Renderer2
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
        const datePickerContainer = this.dpContainer.createDatePickerContainerElement(config.themeConfig)

        this._datePickerOverlay = datePikerOverlay
        this._datePickerContainer = datePickerContainer
        
        datePickerContainer.appendChild(this._componentInstance.location.nativeElement)
        datePikerOverlay.appendChild(datePickerContainer)
        
        setTimeout(()=>{
            datePikerOverlay.classList.add("opened")
            this.datePickerIsOpened = true
            this.setDatePickerContainerPositions()
            this._listeners.push(
                this._renderer.listen("window", "resize", this.setDatePickerContainerPositions.bind(this))
            )
        }, 1)

        return this._componentInstance
    }

    setDatePickerContainerPositions(){
        const datepicker = this._componentInstance.location.nativeElement
        
        const { top, left, height, bottom, right } = this.inputElement.getBoundingClientRect()
        const { width: dpWidth, height: dpHeight } = datepicker.getBoundingClientRect()
        const { width: windowWidth, height: windowHeight } = this.getWidnowSizes()

        let leftStart: number = left
        let topStart: number = top + height
        let padding: number = 5

        let leftPos: number = Math.min(leftStart, (windowWidth - dpWidth) - padding)
        let topPos: number = Math.min(topStart + padding, (windowHeight - dpHeight) - padding)

        this._datePickerContainer.style.position = "absolute"
        this._datePickerContainer.style.left = leftPos + "px"
        this._datePickerContainer.style.top = topPos + "px"
    }

    closeAndRemoveDatePicker(){
        this._componentInstance.destroy()
        this._datePickerOverlay.classList.remove("opened")
        this._datePickerOverlay.innerHTML = ""
        this.datePickerIsOpened = false
        this._listeners.forEach(fn => fn())
    }

    private getWidnowSizes(): {width: number, height: number} {
        const width  = window.innerWidth || document.documentElement.clientWidth || 
        document.body.clientWidth;
        const height = window.innerHeight|| document.documentElement.clientHeight|| 
        document.body.clientHeight;

        return {width, height}
    }

    // getCoords(elem) { // crossbrowser version
    //     var box = elem.getBoundingClientRect();
    
    //     var body = document.body;
    //     var docEl = document.documentElement;
    
    //     var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    //     var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
    //     var clientTop = docEl.clientTop || body.clientTop || 0;
    //     var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
    //     var top  = box.top +  scrollTop - clientTop;
    //     var left = box.left + scrollLeft - clientLeft;
    
    //     return { top: Math.round(top), left: Math.round(left) };
    // }
}