export default function scopedDOM (DOM, scope) {
  return {
    select (selector) {
      return DOM.select(`${scope} ${selector}`);
    }
  };
}
