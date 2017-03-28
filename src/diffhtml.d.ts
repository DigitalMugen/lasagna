declare module 'diffhtml' {
  export function html(markup: String): Object | Object[];
  export function release(node: Node): undefined;
  export function createElement(nodeName: String, attributes?: Object, childNodes?: Object | Object[]): Object;
  export function createAttribute(node: Node): Object;
  export function outerHTML(element: Node, markup: String | Object, options?: Object): undefined;
  export function innerHTML(element: Node, markup: String | Object, options?: Object): undefined;
  export function element(element: Node, newElement: String | Object, options?: Object): undefined;
  export function addTransitionState(state: String, callback: Function): undefined;
  export function removeTranstionState(state?: String, callback?: Function): undefined;
  export function use(middleware: Function): Function;
}
