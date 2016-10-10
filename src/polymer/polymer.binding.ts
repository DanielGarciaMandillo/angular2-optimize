import {
    Injector,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Renderer,
    NgZone,
    KeyValueDiffers,
    IterableDiffers,
    DefaultIterableDiffer
} from '@angular/core';
import { FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';

import { __platform_browser_private__ } from '@angular/platform-browser';

const Polymer: any = (<any>window).Polymer;

class PolymerDomAdapter extends __platform_browser_private__.BrowserDomAdapter {
    createStyleElement(css: any, doc: Document = document) {
        var style: any = doc.createElement.call(doc, 'style', 'custom-style');
        this.appendChild(style, this.createTextNode(css));
        return style;
    }
}

class PolymerShadyDomAdapter extends PolymerDomAdapter {
    parentElement(el) { return Polymer.dom(el).parentNode; }

    appendChild(el, node) { Polymer.dom(el).appendChild(node); }
    insertBefore(el, node) { Polymer.dom(this.parentElement(el)).insertBefore(node, el); }
    insertAllBefore(el, nodes) { var elParentDom = Polymer.dom(this.parentElement(el)); nodes.forEach(n => elParentDom.insertBefore(n, el)); }
    insertAfter(el, node) { this.insertBefore(this.nextSibling(el), node); }
    removeChild(el, node) { Polymer.dom(el).removeChild(node); }
    childNodes(el) { return Polymer.dom(el).childNodes; }
    remove(node) { if (this.parentElement(node)) { this.removeChild(this.parentElement(node), node); } return node; }
    clearNodes(el) { while (Polymer.dom(el).firstChild) { Polymer.dom(el).removeChild(Polymer.dom(el).firstChild); } }

    firstChild(el) { return Polymer.dom(el).firstChild; }
    lastChild(el) { return Polymer.dom(el).lastChild; }
    previousSibling(el) { return Polymer.dom(el).previousSibling; }
    nextSibling(el) { return Polymer.dom(el).nextSibling; }

    getInnerHTML(el) { return Polymer.dom(el).innerHTML; }
    setInnerHTML(el, value) { Polymer.dom(el).innerHTML = value; }

    querySelector(el, selector) { return Polymer.dom(el).querySelector(selector); }
    querySelectorAll(el, selector) { return Polymer.dom(el).querySelectorAll(selector); }

    getDistributedNodes(el) { return Polymer.dom(el).getDistributedNodes(); }

    classList(el) { return Polymer.dom(el).classList; }
    addClass(el, className) { this.classList(el).add(className); }
    removeClass(el, className) { this.classList(el).remove(className); }
    hasClass(el, className) { return this.classList(el).contains(className); }

    setAttribute(el, name, value) { Polymer.dom(el).setAttribute(name, value); }
    removeAttribute(el, name) { Polymer.dom(el).removeAttribute(name); }
}

if (Polymer.Settings.useShadow) {
    __platform_browser_private__.setRootDomAdapter(new PolymerDomAdapter());
} else {
    __platform_browser_private__.setRootDomAdapter(new PolymerShadyDomAdapter());
}


export function PolymerElement(name: string): any[] {
    const propertiesWithNotify: Array<any> = [];
    const arrayAndObjectProperties: Array<any> = [];

    const proto: any = Object.getPrototypeOf(document.createElement(name));
    if (proto.is !== name) {
        throw new Error(`The Polymer element "${name}" has not been registered. Please check that the element is imported correctly.`);
    }
    const isFormElement: boolean = Polymer && Polymer.IronFormElementBehavior && proto.behaviors.indexOf(Polymer.IronFormElementBehavior) > -1;
    const isCheckedElement: boolean = Polymer && Polymer.IronCheckedElementBehaviorImpl && proto.behaviors.indexOf(Polymer.IronCheckedElementBehaviorImpl) > -1;
    proto.behaviors.forEach((behavior: any) => configureProperties(behavior.properties));
    configureProperties(proto.properties);

    function configureProperties(properties: any) {
        if (properties) {
            Object.getOwnPropertyNames(properties)
                .filter(name => name.indexOf('_') !== 0)
                .forEach(name => configureProperty(name, properties))
        }
    }

    function configureProperty(name: string, properties: any) {
        var info = properties[name];
        if (typeof info === 'function') {
            info = {
                type: info
            };
        }

        if (info.type && !info.readOnly && (info.type === Object || info.type === Array)) {
            arrayAndObjectProperties.push(name);
        }

        if (info && info.notify) {
            propertiesWithNotify.push(name);
        }
    }

    const eventNameForProperty = (property: string) => `${property}Change`;

    const changeEventsAdapterDirective = Directive({
        selector: name,
        outputs: propertiesWithNotify.map(eventNameForProperty),
        host: propertiesWithNotify.reduce((hostBindings, property) => {
            hostBindings[`(${Polymer.CaseMap.camelToDashCase(property)}-changed)`] = `_emitChangeEvent('${property}', $event);`;
            return hostBindings;
        }, {})
    }).Class({
        constructor: function() {
            propertiesWithNotify
                .forEach(property => this[eventNameForProperty(property)] = new EventEmitter<any>(false));
        },

        _emitChangeEvent(property: string, event: any) {
            // Event is a notification for a sub-property when `path` exists and the
            // event.detail.value holds a value for a sub-property.

            // For sub-property changes we don't need to explicitly emit events,
            // since all interested parties are bound to the same object and Angular
            // takes care of updating sub-property bindings on changes.
            if (!event.detail.path) {
                this[eventNameForProperty(property)].emit(event.detail.value);
            }
        }
    });

    const validationDirective = Directive({
        selector: name
    }).Class({
        constructor: [ElementRef, Injector, function(el: ElementRef, injector: Injector) {
            this._element = el.nativeElement;
            this._injector = injector;
        }],

        ngDoCheck: function() {
            const control = this._injector.get(FormControlName, null);

            if (control) {
                this._element.invalid = !control.pristine && !control.valid;
            }
        }
    });

    const formElementDirective: any = Directive({
        selector: name,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => formElementDirective),
                multi: true
            }
        ],
        host: (isCheckedElement ? { '(checkedChange)': 'onValueChanged($event)' } : { '(valueChange)': 'onValueChanged($event)' })
    }).Class({
        constructor: [Renderer, ElementRef, function(renderer: Renderer, el: ElementRef) {
            this._renderer = renderer;
            this._element = el.nativeElement;
            this._element.addEventListener('blur', () => this.onTouched(), true);
        }],

        onChange: (_: any) => { },
        onTouched: () => { },

        writeValue: function(value: any): void {
            this._renderer.setElementProperty(this._element, (isCheckedElement ? 'checked' : 'value'), value);
        },

        registerOnChange: function(fn: (_: any) => void): void { this.onChange = fn; },
        registerOnTouched: function(fn: () => void): void { this.onTouched = fn; },

        onValueChanged: function(value: any) {
            this.onChange(value);
        }
    });

    const reloadConfigurationDirective = Directive({
        selector: name
    }).Class({
        constructor: [ElementRef, NgZone, function(el: ElementRef, zone: NgZone) {
            if (!Polymer.Settings.useShadow) {
                el.nativeElement.async(() => {
                    if (el.nativeElement.isInitialized()) {
                        // Reload outside of Angular to prevent unnecessary ngDoCheck calls
                        zone.runOutsideAngular(() => {
                            el.nativeElement.reloadConfiguration();
                        });
                    }
                });
            }
        }],
    });

    var directives = [changeEventsAdapterDirective];

    // If the element has isInitialized and reloadConfiguration methods (e.g., Charts)
    if (typeof proto.isInitialized === 'function' &&
        typeof proto.reloadConfiguration === 'function') {
        directives.push(reloadConfigurationDirective);
    }

    return directives;
}

export var PolymerBinding: Array<Array<Directive>> = [
  PolymerElement("pl-input"),
  PolymerElement("pl-select")
];
