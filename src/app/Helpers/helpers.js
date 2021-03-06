import * as THREE from 'three';

export class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

export class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }

  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }

  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}

export class StringToNumberHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }

  get value() {
    return this.obj[this.prop];
  }

  set value(v) {
    this.obj[this.prop] = parseFloat(v);
  }
}

export class DimensionGUIHelper {
  constructor(obj, minProp, maxProp) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
  }

  get value() {
    return this.obj[this.maxProp] * 2;
  }

  set value(v) {
    this.obj[this.maxProp] = v / 2;
    this.obj[this.minProp] = v / -2;
  }
}

export class MinMaxGUIHelper {
  constructor(obj, minProp, maxProp, minDiff) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
    this.minDiff = minDiff;
  }

  get min() {
    return this.obj[this.minProp];
  }

  set min(v) {
    this.obj[this.minProp] = v;
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDiff);
  }

  get max() {
    return this.obj[this.maxProp];
  }

  set max(v) {
    this.obj[this.maxProp] = v;
    this.min = this.min; // this will call the min setter
  }
}

export class FogGUIHelper {
  constructor(fog, bgColor) {
    this.fog = fog;
    this.bgColor = bgColor;
  }

  get near() {
    return this.fog.near;
  }

  set near(v) {
    this.fog.near = v;
    this.fog.far = Math.max(this.fog.far, v);
  }

  get far() {
    return this.fog.far;
  }

  set far(v) {
    this.fog.far = v;
    this.fog.near = Math.min(this.fog.near, v);
  }

  get color() {
    return `#${this.fog.color.getHexString()}`;
  }

  set color(hexString) {
    this.fog.color.set(hexString);
    this.bgColor.set(hexString);
  }
}
