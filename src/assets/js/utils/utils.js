// ブレイクポイント
const isSP = 768;
const BREAKPOINT = window.innerWidth < isSP;

// タッチデバイスでは touchstart をトリガーにする
const CLICK_EVENT = "ontouchstart" in window ? "touchstart" : "click";

export { isSP, BREAKPOINT, CLICK_EVENT, textSplit };
