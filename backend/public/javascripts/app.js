/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _preact = __webpack_require__(1);

	var _Game = __webpack_require__(2);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appElement = document.getElementById('app');

	(0, _preact.render)(
	// <Routing />,
	(0, _preact.h)(_Game2.default, null),
	// <div >asdasd</div>,
	appElement.parentNode, appElement);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(global, factory) {
	     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
	}(this, function(exports) {
	    function VNode(nodeName, attributes, children) {
	        this.nodeName = nodeName;
	        this.attributes = attributes;
	        this.children = children;
	        this.key = attributes && attributes.key;
	    }
	    function h(nodeName, attributes) {
	        var lastSimple, child, simple, i, children = [];
	        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
	        if (attributes && attributes.children) {
	            if (!stack.length) stack.push(attributes.children);
	            delete attributes.children;
	        }
	        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !1) {
	            if ('number' == typeof child || child === !0) child = String(child);
	            simple = 'string' == typeof child;
	            if (simple && lastSimple) children[children.length - 1] += child; else {
	                children.push(child);
	                lastSimple = simple;
	            }
	        }
	        var p = new VNode(nodeName, attributes || void 0, children);
	        if (options.vnode) options.vnode(p);
	        return p;
	    }
	    function extend(obj, props) {
	        if (props) for (var i in props) obj[i] = props[i];
	        return obj;
	    }
	    function clone(obj) {
	        return extend({}, obj);
	    }
	    function delve(obj, key) {
	        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
	        return obj;
	    }
	    function isFunction(obj) {
	        return 'function' == typeof obj;
	    }
	    function isString(obj) {
	        return 'string' == typeof obj;
	    }
	    function hashToClassName(c) {
	        var str = '';
	        for (var prop in c) if (c[prop]) {
	            if (str) str += ' ';
	            str += prop;
	        }
	        return str;
	    }
	    function cloneElement(vnode, props) {
	        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
	    }
	    function createLinkedState(component, key, eventPath) {
	        var path = key.split('.');
	        return function(e) {
	            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
	            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
	            obj[path[i]] = v;
	            component.setState(state);
	        };
	    }
	    function enqueueRender(component) {
	        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
	    }
	    function rerender() {
	        var p, list = items;
	        items = [];
	        while (p = list.pop()) if (p._dirty) renderComponent(p);
	    }
	    function isFunctionalComponent(vnode) {
	        var nodeName = vnode && vnode.nodeName;
	        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	    }
	    function buildFunctionalComponent(vnode, context) {
	        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
	    }
	    function isSameNodeType(node, vnode) {
	        if (isString(vnode)) return node instanceof Text;
	        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
	    }
	    function isNamedNode(node, nodeName) {
	        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
	    }
	    function getNodeProps(vnode) {
	        var props = clone(vnode.attributes);
	        props.children = vnode.children;
	        var defaultProps = vnode.nodeName.defaultProps;
	        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
	        return props;
	    }
	    function removeNode(node) {
	        var p = node.parentNode;
	        if (p) p.removeChild(node);
	    }
	    function setAccessor(node, name, old, value, isSvg) {
	        if ('className' === name) name = 'class';
	        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
	        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
	            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
	            if (value && 'object' == typeof value) {
	                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
	                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
	            }
	        } else if ('dangerouslySetInnerHTML' === name) node.innerHTML = value && value.__html || ''; else if ('o' == name[0] && 'n' == name[1]) {
	            var l = node._listeners || (node._listeners = {});
	            name = toLowerCase(name.substring(2));
	            if (value) {
	                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            l[name] = value;
	        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
	            setProperty(node, name, null == value ? '' : value);
	            if (null == value || value === !1) node.removeAttribute(name);
	        } else {
	            var ns = isSvg && name.match(/^xlink\:?(.+)/);
	            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
	        }
	    }
	    function setProperty(node, name, value) {
	        try {
	            node[name] = value;
	        } catch (e) {}
	    }
	    function eventProxy(e) {
	        return this._listeners[e.type](options.event && options.event(e) || e);
	    }
	    function collectNode(node) {
	        removeNode(node);
	        if (node instanceof Element) {
	            node._component = node._componentConstructor = null;
	            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
	            (nodes[_name] || (nodes[_name] = [])).push(node);
	        }
	    }
	    function createNode(nodeName, isSvg) {
	        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
	        node.normalizedNodeName = name;
	        return node;
	    }
	    function flushMounts() {
	        var c;
	        while (c = mounts.pop()) {
	            if (options.afterMount) options.afterMount(c);
	            if (c.componentDidMount) c.componentDidMount();
	        }
	    }
	    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	        if (!diffLevel++) {
	            isSvgMode = parent instanceof SVGElement;
	            hydrating = dom && !(ATTR_KEY in dom);
	        }
	        var ret = idiff(dom, vnode, context, mountAll);
	        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
	        if (!--diffLevel) {
	            hydrating = !1;
	            if (!componentRoot) flushMounts();
	        }
	        return ret;
	    }
	    function idiff(dom, vnode, context, mountAll) {
	        var originalAttributes = vnode && vnode.attributes;
	        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
	        if (null == vnode) vnode = '';
	        if (isString(vnode)) {
	            if (dom && dom instanceof Text) {
	                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
	            } else {
	                if (dom) recollectNodeTree(dom);
	                dom = document.createTextNode(vnode);
	            }
	            dom[ATTR_KEY] = !0;
	            return dom;
	        }
	        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
	        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
	        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
	        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
	            out = createNode(nodeName, isSvgMode);
	            while (dom.firstChild) out.appendChild(dom.firstChild);
	            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
	            recollectNodeTree(dom);
	        }
	        var fc = out.firstChild, props = out[ATTR_KEY];
	        if (!props) {
	            out[ATTR_KEY] = props = {};
	            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
	        }
	        diffAttributes(out, vnode.attributes, props);
	        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
	            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
	        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll);
	        if (originalAttributes && 'function' == typeof originalAttributes.ref) (props.ref = originalAttributes.ref)(out);
	        isSvgMode = prevSvgMode;
	        return out;
	    }
	    function innerDiffNode(dom, vchildren, context, mountAll) {
	        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
	        if (len) for (var i = 0; i < len; i++) {
	            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
	            if (null != key) {
	                keyedLen++;
	                keyed[key] = _child;
	            } else if (hydrating || props) children[childrenLen++] = _child;
	        }
	        if (vlen) for (var i = 0; i < vlen; i++) {
	            vchild = vchildren[i];
	            child = null;
	            var key = vchild.key;
	            if (null != key) {
	                if (keyedLen && key in keyed) {
	                    child = keyed[key];
	                    keyed[key] = void 0;
	                    keyedLen--;
	                }
	            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
	                c = children[j];
	                if (c && isSameNodeType(c, vchild)) {
	                    child = c;
	                    children[j] = void 0;
	                    if (j === childrenLen - 1) childrenLen--;
	                    if (j === min) min++;
	                    break;
	                }
	            }
	            child = idiff(child, vchild, context, mountAll);
	            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
	                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
	                dom.insertBefore(child, originalChildren[i] || null);
	            }
	        }
	        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
	        while (min <= childrenLen) {
	            child = children[childrenLen--];
	            if (child) recollectNodeTree(child);
	        }
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var component = node._component;
	        if (component) unmountComponent(component, !unmountOnly); else {
	            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
	            if (!unmountOnly) collectNode(node);
	            var c;
	            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
	        }
	    }
	    function diffAttributes(dom, attrs, old) {
	        for (var _name in old) if (!(attrs && _name in attrs) && null != old[_name]) setAccessor(dom, _name, old[_name], old[_name] = void 0, isSvgMode);
	        if (attrs) for (var _name2 in attrs) if (!('children' === _name2 || 'innerHTML' === _name2 || _name2 in old && attrs[_name2] === ('value' === _name2 || 'checked' === _name2 ? dom[_name2] : old[_name2]))) setAccessor(dom, _name2, old[_name2], old[_name2] = attrs[_name2], isSvgMode);
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name, list = components[name];
	        if (list) list.push(component); else components[name] = [ component ];
	    }
	    function createComponent(Ctor, props, context) {
	        var inst = new Ctor(props, context), list = components[Ctor.name];
	        Component.call(inst, props, context);
	        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
	            inst.nextBase = list[i].nextBase;
	            list.splice(i, 1);
	            break;
	        }
	        return inst;
	    }
	    function setComponentProps(component, props, opts, context, mountAll) {
	        if (!component._disable) {
	            component._disable = !0;
	            if (component.__ref = props.ref) delete props.ref;
	            if (component.__key = props.key) delete props.key;
	            if (!component.base || mountAll) {
	                if (component.componentWillMount) component.componentWillMount();
	            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
	            if (context && context !== component.context) {
	                if (!component.prevContext) component.prevContext = component.context;
	                component.context = context;
	            }
	            if (!component.prevProps) component.prevProps = component.props;
	            component.props = props;
	            component._disable = !1;
	            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
	            if (component.__ref) component.__ref(component);
	        }
	    }
	    function renderComponent(component, opts, mountAll, isChild) {
	        if (!component._disable) {
	            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	            component._dirty = !1;
	            if (!skip) {
	                if (component.render) rendered = component.render(props, state, context);
	                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
	                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
	                var toUnmount, base, childComponent = rendered && rendered.nodeName;
	                if (isFunction(childComponent)) {
	                    var childProps = getNodeProps(rendered);
	                    inst = initialChildComponent;
	                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
	                        toUnmount = inst;
	                        inst = createComponent(childComponent, childProps, context);
	                        inst.nextBase = inst.nextBase || nextBase;
	                        inst._parentComponent = component;
	                        component._component = inst;
	                        setComponentProps(inst, childProps, 0, context);
	                        renderComponent(inst, 1, mountAll, !0);
	                    }
	                    base = inst.base;
	                } else {
	                    cbase = initialBase;
	                    toUnmount = initialChildComponent;
	                    if (toUnmount) cbase = component._component = null;
	                    if (initialBase || 1 === opts) {
	                        if (cbase) cbase._component = null;
	                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
	                    }
	                }
	                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
	                    var baseParent = initialBase.parentNode;
	                    if (baseParent && base !== baseParent) {
	                        baseParent.replaceChild(base, initialBase);
	                        if (!toUnmount) {
	                            initialBase._component = null;
	                            recollectNodeTree(initialBase);
	                        }
	                    }
	                }
	                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
	                component.base = base;
	                if (base && !isChild) {
	                    var componentRef = component, t = component;
	                    while (t = t._parentComponent) (componentRef = t).base = base;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	            }
	            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
	                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
	                if (options.afterUpdate) options.afterUpdate(component);
	            }
	            var fn, cb = component._renderCallbacks;
	            if (cb) while (fn = cb.pop()) fn.call(component);
	            if (!diffLevel && !isChild) flushMounts();
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context, mountAll) {
	        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
	        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
	        if (c && isOwner && (!mountAll || c._component)) {
	            setComponentProps(c, props, 3, context, mountAll);
	            dom = c.base;
	        } else {
	            if (c && !isDirectOwner) {
	                unmountComponent(c, !0);
	                dom = oldDom = null;
	            }
	            c = createComponent(vnode.nodeName, props, context);
	            if (dom && !c.nextBase) {
	                c.nextBase = dom;
	                oldDom = null;
	            }
	            setComponentProps(c, props, 1, context, mountAll);
	            dom = c.base;
	            if (oldDom && dom !== oldDom) {
	                oldDom._component = null;
	                recollectNodeTree(oldDom);
	            }
	        }
	        return dom;
	    }
	    function unmountComponent(component, remove) {
	        if (options.beforeUnmount) options.beforeUnmount(component);
	        var base = component.base;
	        component._disable = !0;
	        if (component.componentWillUnmount) component.componentWillUnmount();
	        component.base = null;
	        var inner = component._component;
	        if (inner) unmountComponent(inner, remove); else if (base) {
	            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
	            component.nextBase = base;
	            if (remove) {
	                removeNode(base);
	                collectComponent(component);
	            }
	            var c;
	            while (c = base.lastChild) recollectNodeTree(c, !remove);
	        }
	        if (component.__ref) component.__ref(null);
	        if (component.componentDidUnmount) component.componentDidUnmount();
	    }
	    function Component(props, context) {
	        this._dirty = !0;
	        this.context = context;
	        this.props = props;
	        if (!this.state) this.state = {};
	    }
	    function render(vnode, parent, merge) {
	        return diff(merge, vnode, {}, !1, parent);
	    }
	    var options = {};
	    var stack = [];
	    var lcCache = {};
	    var toLowerCase = function(s) {
	        return lcCache[s] || (lcCache[s] = s.toLowerCase());
	    };
	    var resolved = 'undefined' != typeof Promise && Promise.resolve();
	    var defer = resolved ? function(f) {
	        resolved.then(f);
	    } : setTimeout;
	    var EMPTY = {};
	    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
	    var NON_DIMENSION_PROPS = {
	        boxFlex: 1,
	        boxFlexGroup: 1,
	        columnCount: 1,
	        fillOpacity: 1,
	        flex: 1,
	        flexGrow: 1,
	        flexPositive: 1,
	        flexShrink: 1,
	        flexNegative: 1,
	        fontWeight: 1,
	        lineClamp: 1,
	        lineHeight: 1,
	        opacity: 1,
	        order: 1,
	        orphans: 1,
	        strokeOpacity: 1,
	        widows: 1,
	        zIndex: 1,
	        zoom: 1
	    };
	    var NON_BUBBLING_EVENTS = {
	        blur: 1,
	        error: 1,
	        focus: 1,
	        load: 1,
	        resize: 1,
	        scroll: 1
	    };
	    var items = [];
	    var nodes = {};
	    var mounts = [];
	    var diffLevel = 0;
	    var isSvgMode = !1;
	    var hydrating = !1;
	    var components = {};
	    extend(Component.prototype, {
	        linkState: function(key, eventPath) {
	            var c = this._linkedStates || (this._linkedStates = {});
	            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
	        },
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.prevState) this.prevState = clone(s);
	            extend(s, isFunction(state) ? state(s, this.props) : state);
	            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
	            enqueueRender(this);
	        },
	        forceUpdate: function() {
	            renderComponent(this, 2);
	        },
	        render: function() {}
	    });
	    exports.h = h;
	    exports.cloneElement = cloneElement;
	    exports.Component = Component;
	    exports.render = render;
	    exports.rerender = rerender;
	    exports.options = options;
	});
	//# sourceMappingURL=preact.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _messageStore = __webpack_require__(140);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _scheduleStore = __webpack_require__(143);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _scheduleActions = __webpack_require__(149);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _Menu = __webpack_require__(160);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _productPanel = __webpack_require__(188);

	var _productPanel2 = _interopRequireDefault(_productPanel);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	var _game = __webpack_require__(202);

	var _game2 = _interopRequireDefault(_game);

	var _sounds = __webpack_require__(209);

	var sounds = _interopRequireWildcard(_sounds);

	var _stats = __webpack_require__(130);

	var _stats2 = _interopRequireDefault(_stats);

	var _gameStages = __webpack_require__(127);

	var GAME_STAGES = _interopRequireWildcard(_gameStages);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MODE_MARKETING = 'MODE_MARKETING';
	// import React, { Component, PropTypes } from 'react';

	var MODE_RESEARCH = 'MODE_RESEARCH';
	var MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
	var MODE_COMPETITORS = 'MODE_COMPETITORS';
	var MODE_STATS = 'MODE_STATS';

	var Game = function (_Component) {
	  (0, _inherits3.default)(Game, _Component);

	  function Game() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Game);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Game.__proto__ || (0, _getPrototypeOf2.default)(Game)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      products: [],
	      team: [],
	      day: 0,
	      tasks: [],

	      pause: false,
	      gameSpeed: 1.5,
	      timerId: null,
	      counter: 0,

	      id: 0, // productID
	      gamePhase: GAME_STAGES.GAME_STAGE_INIT,
	      mode: MODE_MARKETING
	    }, _this.initialize = function () {
	      _this.getProductsFromStore();
	      _this.pickDataFromScheduleStore();

	      _this.runGame();
	    }, _this.runGame = function () {
	      if (!_this.state.pause) {
	        _game2.default.run();
	      }

	      setTimeout(function () {
	        _this.runGame();
	        // sounds.moneySound();
	      }, 1000 / _this.state.gameSpeed);
	    }, _this.setGameSpeed = function (speed) {
	      return function () {
	        _this.setState({
	          pause: false,
	          gameSpeed: speed
	        });
	      };
	    }, _this.pauseGame = function () {
	      _this.setState({
	        pause: true,
	        timerId: null
	      });
	    }, _this.resumeGame = function () {
	      _this.setState({
	        pause: false
	      });
	    }, _this.getMessages = function () {
	      if (_messageStore2.default.isDrawable()) {
	        _this.pauseGame();
	      }
	    }, _this.pickDataFromScheduleStore = function () {
	      _this.setState({
	        day: _scheduleStore2.default.getDay(),
	        tasks: _scheduleStore2.default.getTasks(),
	        gamePhase: _scheduleStore2.default.getGamePhase()
	      });
	    }, _this.getProductsFromStore = function () {
	      var productId = _this.state.id;

	      var xp = _productStore2.default.getXP(productId);
	      var mp = _productStore2.default.getManagerPoints(productId);
	      var pp = _productStore2.default.getProgrammerPoints(productId);

	      var productionMP = _productStore2.default.getMPProduction(productId);
	      var productionPP = _productStore2.default.getPPProduction(productId);

	      var money = _productStore2.default.getMoney(productId);
	      var products = _productStore2.default.getOurProducts();

	      _this.setState({
	        products: products,
	        xp: xp,
	        money: money,
	        mp: mp,
	        pp: pp,
	        productionMP: productionMP,
	        productionPP: productionPP
	      });
	    }, _this.setMode = function (mode) {
	      _stats2.default.saveAction('navigation', { mode: mode });

	      _this.setState({ mode: mode });
	    }, _this.renderProductMenu = function (state) {
	      if (!state.products.length) return (0, _preact.h)('div', null);

	      var id = state.id;
	      var product = state.products[id];

	      return (0, _preact.h)(_productPanel2.default, { product: product, id: id, mode: state.mode });
	    }, _this.renderNavbar = function (mode, name) {
	      var selected = _this.state.mode === mode ? 'active' : '';

	      return (0, _preact.h)(
	        'li',
	        {
	          className: 'product-menu-toggler ' + selected,
	          onClick: function onClick() {
	            return _this.setMode(mode);
	          }
	        },
	        (0, _preact.h)(
	          'span',
	          null,
	          name
	        )
	      );
	    }, _this.renderProductMenuNavbar = function () {
	      var improvements = void 0;
	      if (_stages2.default.canShowMainFeatureTab()) {
	        improvements = _this.renderNavbar(MODE_MAIN_FEATURES, 'Разработка');
	      }

	      var clients = void 0;
	      clients = _this.renderNavbar(MODE_MARKETING, 'Маркетинг');

	      var metrics = void 0;
	      // if (stageHelper.canShowMetricsTab()) {
	      //   metrics = this.renderNavbar(MODE_STATS, 'Статистика');
	      // }

	      var research = void 0;
	      if (true) {
	        research = _this.renderNavbar(MODE_RESEARCH, 'Исследования');
	      }

	      return (0, _preact.h)(
	        'div',
	        { className: 'nav nav-tabs' },
	        improvements,
	        clients,
	        research,
	        metrics
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Game, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.initialize();

	      _productStore2.default.addChangeListener(this.getProductsFromStore);
	      _scheduleStore2.default.addChangeListener(this.pickDataFromScheduleStore);
	      _messageStore2.default.addChangeListener(this.getMessages);

	      _scheduleActions2.default.startGame();
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var modalActive = _messageStore2.default.isDrawable();

	      var resources = {
	        mp: state.mp,
	        pp: state.pp,
	        xp: state.xp,
	        money: state.money
	      };

	      var production = {
	        mp: state.productionMP,
	        pp: state.productionPP
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(_UI2.default.Modal, { onclose: this.resumeGame }),
	        (0, _preact.h)(
	          'div',
	          { className: 'body-background ' + (modalActive ? 'blurred' : '') },
	          (0, _preact.h)(
	            'div',
	            { className: 'body-wrapper' },
	            (0, _preact.h)(
	              'div',
	              { className: 'menu-fixed' },
	              (0, _preact.h)(_Menu2.default, {
	                id: this.state.id,
	                pause: state.pause,
	                pauseGame: this.pauseGame,
	                setGameSpeed: this.setGameSpeed,
	                day: state.day,
	                resources: resources,
	                production: production
	              }),
	              this.renderProductMenuNavbar()
	            ),
	            (0, _preact.h)('hr', null),
	            (0, _preact.h)('br', null),
	            (0, _preact.h)('br', null),
	            this.renderProductMenu(state),
	            (0, _preact.h)('br', null)
	          )
	        )
	      );

	      // <UI.Button link onClick={sessionManager.restartGame} text="Рестарт игры" />
	      //   <h3>Два вопроса бизнеса</h3>
	      //   <div>Готовы ли люди этим пользоваться</div>
	      //   <div>Сколько они готовы заплатить за это</div>
	    }
	  }]);
	  return Game;
	}(_preact.Component);

	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(16).Object.getPrototypeOf;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(6)
	  , $getPrototypeOf = __webpack_require__(8);

	__webpack_require__(14)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(9)
	  , toObject    = __webpack_require__(6)
	  , IE_PROTO    = __webpack_require__(10)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(11)('keys')
	  , uid    = __webpack_require__(13);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(15)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(12).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(31);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(35);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(36);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(65);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(60);
	module.exports = __webpack_require__(64).f('iterator');

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(39)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(41)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(42)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(43)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(9)
	  , Iterators      = __webpack_require__(44)
	  , $iterCreate    = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(58)
	  , getPrototypeOf = __webpack_require__(8)
	  , ITERATOR       = __webpack_require__(59)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(46)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(58)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(59)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(10)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(57).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(48);

	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(56);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(9)
	  , toIObject    = __webpack_require__(50)
	  , arrayIndexOf = __webpack_require__(53)(false)
	  , IE_PROTO     = __webpack_require__(10)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(52);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(50)
	  , toLength  = __webpack_require__(54)
	  , toIndex   = __webpack_require__(55);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(40)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(9)
	  , TAG = __webpack_require__(59)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(11)('wks')
	  , uid        = __webpack_require__(13)
	  , Symbol     = __webpack_require__(12).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var global        = __webpack_require__(12)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(44)
	  , TO_STRING_TAG = __webpack_require__(59)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(62)
	  , step             = __webpack_require__(63)
	  , Iterators        = __webpack_require__(44)
	  , toIObject        = __webpack_require__(50);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(41)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(59);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(12)
	  , has            = __webpack_require__(9)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(43)
	  , META           = __webpack_require__(68).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(11)
	  , setToStringTag = __webpack_require__(58)
	  , uid            = __webpack_require__(13)
	  , wks            = __webpack_require__(59)
	  , wksExt         = __webpack_require__(64)
	  , wksDefine      = __webpack_require__(69)
	  , keyOf          = __webpack_require__(70)
	  , enumKeys       = __webpack_require__(71)
	  , isArray        = __webpack_require__(74)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(50)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(75)
	  , $GOPD          = __webpack_require__(77)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(48)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(76).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(73).f  = $propertyIsEnumerable;
	  __webpack_require__(72).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(42)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(13)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(9)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(12)
	  , core           = __webpack_require__(16)
	  , LIBRARY        = __webpack_require__(42)
	  , wksExt         = __webpack_require__(64)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(48)
	  , toIObject = __webpack_require__(50);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(48)
	  , gOPS    = __webpack_require__(72)
	  , pIE     = __webpack_require__(73);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 73 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(52);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(50)
	  , gOPN      = __webpack_require__(76).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(49)
	  , hiddenKeys = __webpack_require__(56).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(73)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(50)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(9)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69)('asyncIterator');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69)('observable');

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(82);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(86);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(35);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(15);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(85).set});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(22)
	  , anObject = __webpack_require__(21);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, __webpack_require__(77).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	var $Object = __webpack_require__(16).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(90);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(93);

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _computeCompanyCost = __webpack_require__(100);

	var _computeCompanyCost2 = _interopRequireDefault(_computeCompanyCost);

	var _sessionManager = __webpack_require__(105);

	var _sessionManager2 = _interopRequireDefault(_sessionManager);

	var _productDescriptions = __webpack_require__(101);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _computeRating = __webpack_require__(131);

	var _computeRating2 = _interopRequireDefault(_computeRating);

	var _round = __webpack_require__(132);

	var _round2 = _interopRequireDefault(_round);

	var _bugGenerator = __webpack_require__(133);

	var _bugGenerator2 = _interopRequireDefault(_bugGenerator);

	var _productActions = __webpack_require__(134);

	var c = _interopRequireWildcard(_productActions);

	var _scheduleActions = __webpack_require__(135);

	var ACTIONS = _interopRequireWildcard(_scheduleActions);

	var _payloads = __webpack_require__(136);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _productDescription = __webpack_require__(103);

	var _Product = __webpack_require__(121);

	var _Product2 = _interopRequireDefault(_Product);

	var _MarketManager = __webpack_require__(138);

	var _MarketManager2 = _interopRequireDefault(_MarketManager);

	var _stats = __webpack_require__(130);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'PRODUCT_EVENT_CHANGE';

	var _products = void 0;

	var marketManager = void 0;

	var _markets = void 0;

	var initialize = function initialize(_ref) {
	  var markets = _ref.markets,
	      products = _ref.products;

	  _logger2.default.log('trying to initialize productStore.js', products);

	  _products = products.map(function (p) {
	    return new _Product2.default().loadFromObject(p);
	  });

	  _markets = markets;

	  var idea = _products[0].getIdea();
	  markets = (0, _productDescriptions2.default)(idea).markets.map(function (m, i) {
	    return {
	      idea: idea,
	      id: m.id
	    };
	  });

	  marketManager = new _MarketManager2.default(idea);
	  marketManager.load(markets, (0, _productDescriptions2.default)(idea));

	  _products.forEach(function (p) {
	    markets.forEach(function (m) {
	      if (p.companyId !== 0) {
	        marketManager.joinProduct(m.id, p.companyId);
	      }
	    });
	  });

	  marketManager.joinProduct(0, 0);
	};

	initialize(_sessionManager2.default.getProductStorageData());

	var sum = function sum(arr) {
	  return arr.reduce(function (p, c) {
	    return p + c;
	  }, 0);
	};

	var ProductStore = function (_EventEmitter) {
	  (0, _inherits3.default)(ProductStore, _EventEmitter);

	  function ProductStore() {
	    (0, _classCallCheck3.default)(this, ProductStore);
	    return (0, _possibleConstructorReturn3.default)(this, (ProductStore.__proto__ || (0, _getPrototypeOf2.default)(ProductStore)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ProductStore, [{
	    key: 'addChangeListener',
	    value: function addChangeListener(cb) {
	      this.addListener(EC, cb);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(cb) {
	      this.removeListener(EC, cb);
	    }
	  }, {
	    key: 'emitChange',
	    value: function emitChange() {
	      this.emit(EC);
	    }
	  }, {
	    key: 'getMoney',
	    value: function getMoney(id) {
	      return Math.floor(_products[id]._money);
	    }
	  }, {
	    key: 'getProductSupportCost',
	    value: function getProductSupportCost(id) {
	      return 0;
	    }
	  }, {
	    key: 'getProducts',
	    value: function getProducts() {
	      return _products;
	    }
	  }, {
	    key: 'getOurProducts',
	    value: function getOurProducts() {
	      return _products.filter(this.isOurProduct);
	    }
	  }, {
	    key: 'isOurProduct',
	    value: function isOurProduct(p) {
	      return p.owner;
	    }
	  }, {
	    key: 'getProduct',
	    value: function getProduct(id) {
	      return _products[id];
	    }
	  }, {
	    key: 'getCompanyCost',
	    value: function getCompanyCost(id) {
	      return _computeCompanyCost2.default.compute(_products[id], this.getProductIncome(id), 0);
	    }
	  }, {
	    key: 'getCompanyCostStructured',
	    value: function getCompanyCostStructured(id) {
	      return _computeCompanyCost2.default.structured(_products[id], this.getProductIncome(id), 0);
	    }
	  }, {
	    key: 'getMainFeatureQualityByFeatureId',
	    value: function getMainFeatureQualityByFeatureId(id, featureId) {
	      return _products[id].getMainFeatureQualityByFeatureId(featureId);
	    }
	  }, {
	    key: 'getPrettyFeatureNameByFeatureId',
	    value: function getPrettyFeatureNameByFeatureId(id, featureId) {
	      return _products[id].getPrettyFeatureNameByFeatureId(featureId);
	    }
	  }, {
	    key: 'getDefaults',
	    value: function getDefaults(id) {
	      return _products[id].getDefaults();
	    }
	  }, {
	    key: 'getPaymentModifier',
	    value: function getPaymentModifier(id) {
	      return _products[id].getPaymentModifier();
	    }
	  }, {
	    key: 'getFeatures',
	    value: function getFeatures(id, featureGroup) {
	      return _products[id].getFeatures(featureGroup);
	    }
	  }, {
	    key: 'getBaseFeatureDevelopmentCost',
	    value: function getBaseFeatureDevelopmentCost(id, featureId) {
	      return _products[id].getBaseFeatureDevelopmentCost(featureId);
	    }
	  }, {
	    key: 'isShareableFeature',
	    value: function isShareableFeature(id, featureId) {
	      return _products[id].isShareableFeature(featureId);
	    }
	  }, {
	    key: 'getIdea',
	    value: function getIdea(id) {
	      return _products[id].getIdea();
	    }
	  }, {
	    key: 'getBugs',
	    value: function getBugs(id) {
	      return _products[id].getBugs();
	    }
	  }, {
	    key: 'getBugLoyaltyLoss',
	    value: function getBugLoyaltyLoss(id) {
	      var list = this.getBugs(id);

	      return list.map(function (i) {
	        return i.penalty;
	      }).reduce(function (p, c) {
	        return p + c;
	      }, 0);
	    }
	  }, {
	    key: 'getRatingBasedLoyaltyOnMarket',
	    value: function getRatingBasedLoyaltyOnMarket(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var rating = this.getRating(id, marketId, improvement);

	      var loyalty = void 0;

	      if (rating <= 6) {
	        loyalty = -0.1 * (6 - rating);
	      } else {
	        loyalty = 0.15 * (rating - 6);
	      }

	      return loyalty;
	    }
	  }, {
	    key: 'isSegmentingOpened',
	    value: function isSegmentingOpened(id) {
	      return false;
	    }
	  }, {
	    key: 'isBugFixable',
	    value: function isBugFixable(productId, bugId) {
	      var bug = this.getBugs(productId).find(function (b) {
	        return b.id === bugId;
	      });

	      if (bug && bug.cost) {
	        return this.getProgrammerPoints(productId) >= bug.cost;
	      }

	      return false;
	    }
	  }, {
	    key: 'getMaxAmountOfClientsOnMarket',
	    value: function getMaxAmountOfClientsOnMarket(id, marketId) {
	      return this.getMarkets(id)[marketId].clients;
	    }
	  }, {
	    key: 'isCanGrabMoreClients',
	    value: function isCanGrabMoreClients(id, marketId, amountOfClients, price) {
	      var enoughMoney = this.getMoney(id) >= price;
	      var noClientOverflow = this.getClientsOnMarket(id, marketId) + amountOfClients < this.getMaxAmountOfClientsOnMarket(id, marketId);

	      return enoughMoney && noClientOverflow;
	    }
	  }, {
	    key: 'getManagerPoints',
	    value: function getManagerPoints(id) {
	      return this.getProduct(id).getMP();
	    }
	  }, {
	    key: 'getProgrammerPoints',
	    value: function getProgrammerPoints(id) {
	      return this.getProduct(id).getPP();
	    }
	  }, {
	    key: 'getPPProduction',
	    value: function getPPProduction(id) {
	      return this.getProduct(id).getPPProduction();
	    }
	  }, {
	    key: 'getMPProduction',
	    value: function getMPProduction(id) {
	      return this.getProduct(id).getMPProduction();
	    }
	  }, {
	    key: 'getProductExpenses',
	    value: function getProductExpenses(id) {
	      return this.getProductSupportCost(id);
	      return _products[id].getProductExpenses();
	    }
	  }, {
	    key: 'getName',
	    value: function getName(id) {
	      return _products[id].getName();
	      return _products.find(function (p) {
	        return p.companyId === id;
	      }).getName();
	    }
	  }, {
	    key: 'getStage',
	    value: function getStage(id) {
	      return _products[id].getStage();
	    }
	  }, {
	    key: 'getFeatureStatus',
	    value: function getFeatureStatus(id, featureGroup, featureName) {
	      return _products[id].getFeatureStatus(featureGroup, featureName);
	    }
	  }, {
	    key: 'getBonusStatus',
	    value: function getBonusStatus(id, bonusName) {
	      return _products[id].getFeatureStatus('bonuses', bonusName);
	    }
	  }, {
	    key: 'getAvailableBonuses',
	    value: function getAvailableBonuses(id) {
	      return _products[id].getAvailableBonuses();
	    }
	  }, {
	    key: 'getBonuses',
	    value: function getBonuses(id) {
	      return (0, _keys2.default)(_products[id].features.bonuses);
	    }
	  }, {
	    key: 'getBonusesList',
	    value: function getBonusesList(id) {
	      return _products[id].getBonusesList();
	    }
	  }, {
	    key: 'getMarketingFeatureList',
	    value: function getMarketingFeatureList(id) {
	      return _products[id].getMarketingFeatureList();
	    }
	  }, {
	    key: 'getPaymentFeatures',
	    value: function getPaymentFeatures(id) {
	      return _products[id].getPaymentFeatures();
	    }
	  }, {
	    key: 'getImprovementChances',
	    value: function getImprovementChances(id) {
	      return _products[id].getImprovementChances();
	    }
	  }, {
	    key: 'getXP',
	    value: function getXP(id) {
	      return _products[id].getXP();
	    }
	  }, {
	    key: 'getDescriptionOfProduct',
	    value: function getDescriptionOfProduct(id) {
	      return _products[id].getDescriptionOfProduct();
	    }
	  }, {
	    key: 'getBonusModifiers',
	    value: function getBonusModifiers(id) {
	      return _products[id].getBonusModifiers();
	    }
	  }, {
	    key: 'getTestsAmount',
	    value: function getTestsAmount(id) {
	      return _products[id].getTestsAmount();
	    }
	  }, {
	    key: 'getImprovementsAmount',
	    value: function getImprovementsAmount(id) {
	      return _products[id].getImprovementsAmount();
	    }
	  }, {
	    key: 'getBonusesAmount',
	    value: function getBonusesAmount(id) {
	      return _products[id].bonuses;
	    }
	  }, {
	    key: 'getMainFeatureUpgradeCost',
	    value: function getMainFeatureUpgradeCost(id, featureId) {
	      return this.getBaseFeatureDevelopmentCost(id, featureId);
	    }
	  }, {
	    key: 'getBenefitOnFeatureImprove',
	    value: function getBenefitOnFeatureImprove(id, featureId) {
	      return Math.floor(this.getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, 1));
	    }
	  }, {
	    key: 'getTeamExpenses',
	    value: function getTeamExpenses() {
	      return 0;
	    }
	  }, {
	    key: 'getMarketRatingComputationList',
	    value: function getMarketRatingComputationList(id, marketId) {
	      return this.getDefaults(id).markets[marketId].rating;
	    }
	  }, {
	    key: 'getMainFeatureIterator',
	    value: function getMainFeatureIterator(id) {
	      return this.getDefaults(id).features;
	    }
	  }, {
	    key: 'getLeaderValues',
	    value: function getLeaderValues(id) {
	      var _this2 = this;

	      return this.getMainFeatureIterator(id).map(function (f, i) {
	        return _this2.getLeaderInTech(i);
	      });
	    }
	  }, {
	    key: 'getCompetitorsList',
	    value: function getCompetitorsList() {
	      return _products;
	    }
	  }, {
	    key: 'isMainMarket',
	    value: function isMainMarket(id, marketId) {
	      return marketManager.isMainMarket(id, marketId);
	    }
	  }, {
	    key: 'getClientsOnMarket',
	    value: function getClientsOnMarket(id, marketId) {
	      return marketManager.getClients(marketId, id);
	    }
	  }, {
	    key: 'getMarketSize',
	    value: function getMarketSize(marketId) {
	      return marketManager.getMarketSize(marketId);
	    }
	  }, {
	    key: 'getHypeOnMarket',
	    value: function getHypeOnMarket(id, marketId) {
	      return marketManager.getHype(marketId, id);
	    }
	  }, {
	    key: 'getCurrentMarketInfo',
	    value: function getCurrentMarketInfo(id, marketId) {
	      return {
	        min: 0,
	        max: 100,
	        value: this.getHypeOnMarket(id, marketId)
	      };
	    }
	  }, {
	    key: 'isExploredMarket',
	    value: function isExploredMarket(id, mId) {
	      return marketManager.isExploredMarket(id, mId);
	    }
	  }, {
	    key: 'getLeaderInTech',
	    value: function getLeaderInTech(featureId) {
	      var leaders = _products.map(function (p) {
	        return {
	          id: p.companyId,
	          value: p.features.offer[featureId],
	          name: p.name
	        };
	      }).sort(function (p1, p2) {
	        return p2.value - p1.value;
	      });

	      return leaders[0];
	    }
	  }, {
	    key: 'getMarketingKnowledge',
	    value: function getMarketingKnowledge(id, marketId) {
	      return marketManager.getMarketingKnowledge(marketId, id);
	    }
	  }, {
	    key: 'getRating',
	    value: function getRating(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var features = _products[id].features.offer.slice();

	      var maxValues = this.getLeaderValues(id).map(function (l) {
	        return l.value;
	      });

	      if (improvement) {
	        var featureId = improvement.featureId;
	        var value = features[featureId];

	        var leader = this.getLeaderInTech(featureId);
	        var maxValue = leader.value;

	        features[featureId] += 1;
	        if (value + 1 > maxValue) {
	          maxValues[featureId] += 1;
	        }
	      }

	      var marketInfluences = marketManager.getRatingFormula(marketId);

	      return Math.min((0, _round2.default)((0, _computeRating2.default)(features, maxValues, marketInfluences)), 10);
	    }
	  }, {
	    key: 'getSegmentLoyalty',
	    value: function getSegmentLoyalty(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      return this.getSegmentLoyaltyStructured(id, marketId, improvement).result;
	    }
	  }, {
	    key: 'getSegmentLoyaltyStructured',
	    value: function getSegmentLoyaltyStructured(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var ratingBasedLoyalty = this.getRatingBasedLoyaltyOnMarket(id, marketId, improvement);
	      var bugPenalty = this.getBugLoyaltyLoss(id);
	      var isNewApp = 0.15;
	      var isBestApp = 0.15;

	      var result = Math.ceil(100 * (ratingBasedLoyalty + isNewApp - bugPenalty + isBestApp));

	      return {
	        ratingBasedLoyalty: ratingBasedLoyalty,
	        bugPenalty: bugPenalty,
	        isNewApp: isNewApp,
	        isBestApp: isBestApp,
	        result: result
	      };
	    }
	  }, {
	    key: 'getMarketExplorationCost',
	    value: function getMarketExplorationCost(id, marketId) {
	      return this.getDefaults(id).markets[marketId].explorationCost;
	    }
	  }, {
	    key: 'getExploredMarkets',
	    value: function getExploredMarkets(id) {
	      var _this3 = this;

	      return this.getMarkets(id).filter(function (m, mId) {
	        return _this3.isExploredMarket(id, m.id);
	      });
	    }
	  }, {
	    key: 'getMarketsWithExplorationStatuses',
	    value: function getMarketsWithExplorationStatuses(id) {
	      var _this4 = this;

	      return this.getMarkets(id).map(function (m, i) {
	        return {
	          id: m.id,
	          info: m,
	          explored: _this4.isExploredMarket(id, m.id),
	          enoughXPsToExplore: m.explorationCost <= _this4.getXP(id)
	        };
	      });
	    }
	  }, {
	    key: 'getExplorableMarkets',
	    value: function getExplorableMarkets(id) {
	      var _this5 = this;

	      var markets = this.getMarkets(id).filter(function (m, mId) {
	        return !_this5.isExploredMarket(id, m.id);
	      });

	      if (markets.length) {
	        return markets[0];
	      }

	      return [];
	    }
	  }, {
	    key: 'calculateMarketIncome',
	    value: function calculateMarketIncome(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      // const rating = this.getRating(id, marketId, improvement);
	      var loyalty = this.getSegmentLoyalty(id, marketId, improvement);

	      var modifier = this.getPaymentModifier(id);

	      var efficiency = (loyalty < 0 ? 0 : loyalty / 10) * modifier / 10;

	      var possible = marketManager.getPossibleIncome(marketId, id);

	      return Math.floor(possible * efficiency);
	    }
	  }, {
	    key: 'getFeatureIncreaseXPCost',
	    value: function getFeatureIncreaseXPCost(id) {
	      return 1;
	    }
	  }, {
	    key: 'getMarkets',
	    value: function getMarkets(id) {
	      return this.getDefaults(id).markets; // marketManager.markets;
	    }
	  }, {
	    key: 'getIncomeIncreaseForMarketIfWeUpgradeFeature',
	    value: function getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, value) {
	      var income = this.getMarketIncome(id, marketId);

	      var currRating = this.getRating(id, marketId);
	      var nextRating = this.getRating(id, marketId, { featureId: featureId, value: value });

	      var willBe = Math.floor(income * (nextRating / currRating));

	      return willBe - income;
	    }
	  }, {
	    key: 'getProductIncomeIncreaseIfWeUpgradeFeature',
	    value: function getProductIncomeIncreaseIfWeUpgradeFeature(id, featureId, value) {
	      var _this6 = this;

	      return sum(this.getMarkets(id).map(function (m) {
	        return _this6.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, m.id, featureId, value);
	      }));
	    }
	  }, {
	    key: 'getBestFeatureUpgradeVariantOnMarket',
	    value: function getBestFeatureUpgradeVariantOnMarket(id, marketId) {
	      var _this7 = this;

	      var incomes = this.getMainFeatureIterator(id).map(function (f, featureId) {
	        var improvementSize = 1;
	        var improvement = {
	          featureId: featureId,
	          value: improvementSize
	        };

	        var value = _this7.getMainFeatureQualityByFeatureId(id, featureId);
	        var income = _this7.getIncomeIncreaseForMarketIfWeUpgradeFeature(id, marketId, featureId, improvementSize);
	        var loyaltyChange = _this7.getRatingBasedLoyaltyOnMarket(id, marketId, improvement) - _this7.getRatingBasedLoyaltyOnMarket(id, marketId);
	        var ratingChange = _this7.getRating(id, marketId, improvement) - _this7.getRating(id, marketId);

	        return {
	          income: income,
	          loyaltyChange: loyaltyChange,
	          ratingChange: ratingChange,
	          featureId: featureId,
	          featureName: _this7.getPrettyFeatureNameByFeatureId(id, featureId),
	          level: value + 1
	        };
	      });

	      return incomes.sort(function (a, b) {
	        return b.income - a.income;
	      })[0];
	    }
	  }, {
	    key: 'getMarketIncome',
	    value: function getMarketIncome(id, marketId) {
	      var improvement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      return this.calculateMarketIncome(id, marketId, improvement);
	    }
	  }, {
	    key: 'getProductIncome',
	    value: function getProductIncome(id) {
	      var _this8 = this;

	      return sum(marketManager.iterate(function (m, i) {
	        return _this8.getMarketIncome(id, i);
	      }));
	    }
	  }, {
	    key: 'getMarketIncomeList',
	    value: function getMarketIncomeList(id) {
	      var _this9 = this;

	      return marketManager.iterate(function (m) {
	        return {
	          income: _this9.getMarketIncome(id, m.id),
	          marketId: m.id
	        };
	      });
	    }
	  }], [{
	    key: 'getStoreData',
	    value: function getStoreData() {
	      return {
	        products: _products,
	        markets: _markets
	      };
	    }
	  }]);
	  return ProductStore;
	}(_events.EventEmitter);

	var store = new ProductStore();

	var payload = _payloads2.default.productStorePayload;


	_dispatcher2.default.register(function (p) {
	  if (!p.type) {
	    _logger2.default.error('empty type prop in payload ' + payload.name, p);
	    return;
	  }

	  if (p.type !== ACTIONS.SCHEDULE_ACTIONS_DAY_TICK) {
	    _logger2.default.log('product store', p);
	  }

	  var id = p.id;

	  var change = true;
	  switch (p.type) {
	    case c.PRODUCT_ACTIONS_TEST_HYPOTHESIS:
	      _products[id].testHypothesis(p);
	      break;

	    case c.PRODUCT_PRODUCE_RESOURCES:
	      _products[id].produceResources();
	      break;

	    case c.PRODUCT_ACTIONS_FIX_BUG:
	      _products[id].fixBug(p.bugId);
	      break;

	    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
	      _products[id].switchStage(p.stage);
	      break;

	    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
	      _products[id].improveFeature(p);

	      _products[id].addBug((0, _bugGenerator2.default)());
	      _products[id].addBug((0, _bugGenerator2.default)());
	      _products[id].addBug((0, _bugGenerator2.default)());
	      break;

	    case c.PRODUCT_ACTIONS_EXPLORE_MARKET:
	      marketManager.exploreMarket(p.marketId, id);

	      _products[id].decreaseXP(p.explorationCost);
	      break;

	    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
	      _products[id].improveFeatureByPoints(p);
	      break;

	    case c.PRODUCT_ACTIONS_HYPE_ADD:
	      marketManager.addHype(p.marketId, id, p.hype);

	      _products[id]._money -= p.cost;
	      break;

	    case c.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE:
	      marketManager.loseMonthlyHype(id);
	      break;

	    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
	      marketManager.addClients(p.marketId, p.id, p.clients);

	      _products[id]._money -= p.price;
	      break;

	    case c.PRODUCT_ACTIONS_MARKETS_JOIN:
	      marketManager.joinProduct(p.marketId, id);

	      _products[p.id].decreaseXP(p.xp);
	      break;

	    case c.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN:
	      marketManager.setMainMarket(id, p.marketId);
	      break;

	    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE:
	      marketManager.breakPartnership(p.c1, p.c2, p.marketId);
	      break;

	    case c.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER:
	      marketManager.breakPartnership(p.c1, p.c2, p.marketId);
	      break;

	    case c.PRODUCT_ACTIONS_CREATE_COMPANY:
	      _products.push(new _Product2.default(p.p));
	      break;

	    case c.PLAYER_ACTIONS_INCREASE_MONEY:
	      _products[id]._money += p.amount;
	      break;

	    case c.PRODUCT_ACTIONS_BONUSES_ADD:
	      _products[id].bonuses++;
	      break;

	    default:
	      change = false;
	      break;
	  }

	  if (change) {
	    _stats2.default.saveAction(p.type, p);

	    _sessionManager2.default.saveProductStorageData(ProductStore.getStoreData());

	    store.emitChange();
	  }
	});

	exports.default = store;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(6)
	  , $keys    = __webpack_require__(48);

	__webpack_require__(14)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 93 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flux = __webpack_require__(95);

	exports.default = new _flux.Dispatcher();

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(96);


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(98);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 97 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _arguments = arguments;
	var messages = [];

	exports.default = {
	  log: console.log,
	  debug: function debug() {
	    console.log(_arguments);
	  },
	  error: console.error,
	  shit: function shit(text) {
	    // console.log(`GOVNOKOD: ${text}`);
	    // console.trace();
	    // console.log('-----------');
	  },
	  actions: function actions(sessionId, userId, action) {}

	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productDescriptions = __webpack_require__(101);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var structured = function structured(c, income, expense) {
	  // logger.debug('compute cost of company', c);
	  var defaults = (0, _productDescriptions2.default)(c.idea);
	  var defaultFeatures = defaults.features;

	  // sum technology part
	  _logger2.default.shit('each feature has it\'s own cost. Servers are more expensive');

	  var totalXP = 0;

	  var featureSum = 0;
	  defaultFeatures.forEach(function (f, featureId) {
	    var xp = c.features.offer[featureId];

	    totalXP += xp;
	    featureSum += xp * f.development;
	  });

	  featureSum *= 50; // 1 PP costs 50$ + 30% for working product

	  // complexity modifier
	  var complexityModifier = Math.pow(1.01, totalXP / 1000);

	  var technologyValue = Math.ceil(featureSum * complexityModifier / 1000);

	  // customers also influence cost
	  var clientValue = 0;
	  var economicValue = Math.ceil(income * 24);

	  var cost = 10000 + technologyValue + clientValue + economicValue;

	  var technologyPart = Math.floor(technologyValue * 100 / cost);
	  var clientPart = Math.floor(clientValue * 100 / cost);
	  var economicPart = Math.floor(economicValue * 100 / cost);

	  return {
	    cost: cost,
	    complexityModifier: complexityModifier,

	    clientPart: clientPart,
	    technologyPart: technologyPart,
	    economicPart: economicPart,
	    clientValue: clientValue,
	    technologyValue: technologyValue,
	    economicValue: economicValue
	  };
	};

	var compute = function compute(c, income, expense) {
	  return structured(c, income, expense).cost;
	};

	exports.default = {
	  compute: compute,
	  structured: structured
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (idea) {
	  switch (idea) {
	    case IDEAS.IDEA_WEB_HOSTING:
	      return _WEBHOSTING2.default;
	      break;
	  }
	};

	var _ideas = __webpack_require__(102);

	var IDEAS = _interopRequireWildcard(_ideas);

	var _productDescription = __webpack_require__(103);

	var _WEBHOSTING = __webpack_require__(104);

	var _WEBHOSTING2 = _interopRequireDefault(_WEBHOSTING);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	;

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IDEA_WEB_STUDIO = exports.IDEA_WEB_STUDIO = 'IDEA_WEB_STUDIO';
	var IDEA_WEB_HOSTING = exports.IDEA_WEB_HOSTING = 'IDEA_WEB_HOSTING';

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var AD_TG_POST = 0;
	var AD_OWN_BLOG = 1;
	var AD_SOCIAL_NETWORK = 2;
	var AD_TARGETING = 3;
	var AD_SEO = 4;

	var tgPost = {
	  id: AD_TG_POST,
	  name: 'Пост в телеграме',
	  cost: { money: 0, mp: 2 },
	  hype: 5,
	  openedOn: 0
	};

	var ownBlogPost = {
	  id: AD_OWN_BLOG,
	  name: 'Пост в собственном блоге',
	  cost: { money: 0, mp: 2 },
	  hype: 11,
	  openedOn: 10
	};

	var socialNetworks = {
	  id: AD_SOCIAL_NETWORK,
	  name: 'Пост в соцсетях',
	  cost: { money: 50, mp: 3 },
	  hype: 22,
	  openedOn: 30
	};

	var targeting = {
	  id: AD_TARGETING,
	  name: 'Таргетинг в соцсетях',
	  cost: { money: 150, mp: 4 },
	  hype: 50,
	  openedOn: 30
	};

	var SEO = {
	  id: AD_SEO,
	  name: 'SEO-траффик',
	  cost: { money: 150, mp: 4 },
	  hype: 50,
	  openedOn: 30
	};

	var SEGMENT_PROGRAMMER = 'Программисты';
	var SEGMENT_STARTUP = 'Стартапы';
	var SEGMENT_SMALL_BUSINESS = 'Малый бизнес';
	var SEGMENT_CORPORATIONS = 'Корпорации';

	exports.default = {
	  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
	  features: [{
	    name: 'VPS',
	    description: '',
	    shortDescription: 'Виртуальная машина',
	    shareable: true,
	    development: 75,
	    id: 0
	  }, {
	    name: 'website',
	    description: '',
	    shortDescription: 'Веб-сайт',
	    development: 30,
	    id: 1
	  }, {
	    name: 'support',
	    description: '',
	    shortDescription: 'Техподдержка',
	    development: 100,
	    id: 2
	  }, {
	    name: 'VDS',
	    description: '',
	    shortDescription: 'Выделенный сервер',
	    shareable: true,
	    development: 135,
	    id: 3
	  }, {
	    name: 'scalability',
	    description: '',
	    shortDescription: 'Масштабируемость',
	    development: 70,
	    id: 4
	  }],
	  ads: [tgPost, ownBlogPost, socialNetworks, targeting],
	  markets: [{
	    id: 0,
	    clientType: SEGMENT_PROGRAMMER,
	    rating: [6, 2.5, 1.5, 0, 0],
	    explorationCost: 0,
	    price: 5,
	    clients: 38000
	  }, {
	    id: 1,
	    clientType: SEGMENT_STARTUP,
	    rating: [6.5, 1.5, 1.5, 0.5, 0],
	    explorationCost: 50,
	    price: 15,
	    clients: 10000
	  }, {
	    id: 2,
	    clientType: SEGMENT_SMALL_BUSINESS,
	    rating: [0, 1.5, 1, 7, 0.5],
	    explorationCost: 100,
	    price: 100,
	    clients: 1000
	  }, {
	    id: 3,
	    rating: [0, 0, 3, 5, 2],
	    clientType: SEGMENT_CORPORATIONS,
	    explorationCost: 150,
	    price: 1500,
	    clients: 500
	  }]
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _parseInt = __webpack_require__(106);

	var _parseInt2 = _interopRequireDefault(_parseInt);

	var _from = __webpack_require__(112);

	var _from2 = _interopRequireDefault(_from);

	var _Product = __webpack_require__(121);

	var _Product2 = _interopRequireDefault(_Product);

	var _sessionStorage = __webpack_require__(124);

	var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

	var _gameStages = __webpack_require__(127);

	var GAME_STAGES = _interopRequireWildcard(_gameStages);

	var _job = __webpack_require__(128);

	var JOB = _interopRequireWildcard(_job);

	var _ideas = __webpack_require__(102);

	var IDEAS = _interopRequireWildcard(_ideas);

	var _productStages = __webpack_require__(129);

	var PRODUCT_STAGES = _interopRequireWildcard(_productStages);

	var _stats = __webpack_require__(130);

	var _stats2 = _interopRequireDefault(_stats);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function saveToStorage(name, value) {
	  _sessionStorage2.default.saveInStorage(name, value);
	}

	function setDefaultValues() {
	  console.log('setDefaultValues in session-manager');

	  // schedule
	  _sessionStorage2.default.saveInStorage('day', 1);
	  _sessionStorage2.default.saveInStorage('tasks', []);
	  _sessionStorage2.default.saveInStorage('gamePhase', GAME_STAGES.GAME_STAGE_INIT);

	  // player
	  _sessionStorage2.default.saveInStorage('money', 1000);
	  _sessionStorage2.default.saveInStorage('points', {
	    programming: 5300,
	    marketing: 5200,
	    analyst: 300
	  });

	  _sessionStorage2.default.saveInStorage('employees', [{
	    name: 'Lynda',
	    skills: {
	      programming: 0,
	      marketing: 500,
	      analyst: 150
	    },
	    task: JOB.JOB_TASK_MARKETING_POINTS,
	    jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
	    salary: {
	      money: 500,
	      percent: 0,
	      pricingType: 1
	    }
	  }, {
	    name: 'Xavier',
	    skills: {
	      programming: 600,
	      marketing: 100,
	      analyst: 150
	    },
	    task: JOB.JOB_TASK_PROGRAMMER_POINTS,
	    jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
	    salary: {
	      money: 700,
	      percent: 0,
	      pricingType: 1
	    }
	  }]);
	  _sessionStorage2.default.saveInStorage('team', [{
	    name: 'James',
	    skills: {
	      programming: 1000,
	      marketing: 150,
	      analyst: 300
	    },
	    task: JOB.JOB_TASK_PROGRAMMER_POINTS,
	    jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
	    salary: {
	      percent: 100,
	      money: 100,
	      pricingType: 0
	    },
	    isPlayer: true
	  }]);

	  // products
	  _sessionStorage2.default.saveInStorage('markets', []);

	  var idea = IDEAS.IDEA_WEB_HOSTING;
	  var stage = PRODUCT_STAGES.PRODUCT_STAGE_IDEA;

	  var products = [new _Product2.default().createCompany({
	    idea: idea,
	    stage: stage,
	    name: 'WWWEB HOSTING',
	    companyId: 0
	  }), new _Product2.default().createCompany({
	    idea: idea,
	    stage: stage,
	    isCompetitor: true,
	    companyId: 1
	  }), new _Product2.default().createCompany({
	    idea: idea,
	    stage: stage,
	    isCompetitor: true,
	    companyId: 2
	  }), new _Product2.default().createCompany({
	    idea: idea,
	    stage: stage,
	    isCompetitor: true,
	    companyId: 3
	  })];

	  _sessionStorage2.default.saveInStorage('products', products);
	}

	function getFromStorage(name) {
	  return _sessionStorage2.default.getFromStorage(name);
	}

	function restartGame() {
	  setDefaultValues();

	  _stats2.default.saveAction('restartGame', {});
	}

	function saveProductStorageData(_ref) {
	  var markets = _ref.markets,
	      products = _ref.products,
	      money = _ref.money,
	      points = _ref.points,
	      employees = _ref.employees,
	      team = _ref.team;

	  saveToStorage('markets', markets);
	  saveToStorage('products', products);
	  saveToStorage('money', money);
	  saveToStorage('points', points);
	  saveToStorage('employees', employees);
	  saveToStorage('team', team);
	}

	function getProductStorageData() {
	  var employees = void 0;
	  var team = void 0;

	  var products = void 0;
	  var markets = void 0;

	  try {
	    employees = (0, _from2.default)(JSON.parse(getFromStorage('employees')));
	    team = (0, _from2.default)(JSON.parse(getFromStorage('team')));
	    products = (0, _from2.default)(JSON.parse(getFromStorage('products')));
	    markets = (0, _from2.default)(JSON.parse(getFromStorage('markets')));
	  } catch (ex) {
	    _logger2.default.error('error in getProductStorageData', ex);
	  }

	  return {
	    employees: employees,
	    team: team,
	    products: products,
	    markets: markets
	  };
	}

	function getScheduleStorageData() {
	  return {
	    tasks: (0, _from2.default)(JSON.parse(getFromStorage('tasks'))),
	    day: (0, _parseInt2.default)(getFromStorage('day')),
	    gamePhase: (0, _parseInt2.default)(getFromStorage('gamePhase'))
	  };
	}

	function saveScheduleStorageData(_ref2) {
	  var tasks = _ref2.tasks,
	      day = _ref2.day,
	      gamePhase = _ref2.gamePhase;

	  return {
	    tasks: saveToStorage('tasks', tasks),
	    day: saveToStorage('day', day),
	    gamePhase: saveToStorage('gamePhase', gamePhase)
	  };
	}

	function getMessageStorageData() {
	  return getFromStorage('messages');
	}

	setDefaultValues();
	if (!_sessionStorage2.default.getFromStorage('sessionId')) {
	  _sessionStorage2.default.saveInStorage('sessionId', 'asd');

	  setDefaultValues();
	}
	// restartGame();


	exports.default = {
	  getProductStorageData: getProductStorageData,
	  getScheduleStorageData: getScheduleStorageData,
	  getMessageStorageData: getMessageStorageData,

	  saveScheduleStorageData: saveScheduleStorageData,
	  saveProductStorageData: saveProductStorageData,

	  restartGame: restartGame
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	module.exports = parseInt;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(15)
	  , $parseInt = __webpack_require__(109);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(12).parseInt
	  , $trim     = __webpack_require__(110).trim
	  , ws        = __webpack_require__(111)
	  , hex       = /^[\-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15)
	  , defined = __webpack_require__(7)
	  , fails   = __webpack_require__(25)
	  , spaces  = __webpack_require__(111)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(114);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(17)
	  , $export        = __webpack_require__(15)
	  , toObject       = __webpack_require__(6)
	  , call           = __webpack_require__(115)
	  , isArrayIter    = __webpack_require__(116)
	  , toLength       = __webpack_require__(54)
	  , createProperty = __webpack_require__(117)
	  , getIterFn      = __webpack_require__(118);

	$export($export.S + $export.F * !__webpack_require__(120)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(44)
	  , ITERATOR   = __webpack_require__(59)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(20)
	  , createDesc      = __webpack_require__(28);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(119)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(44);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(52)
	  , TAG = __webpack_require__(59)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(59)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _productDescriptions = __webpack_require__(101);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _random = __webpack_require__(122);

	var _random2 = _interopRequireDefault(_random);

	var _productDescription = __webpack_require__(103);

	var _balance = __webpack_require__(123);

	var balance = _interopRequireWildcard(_balance);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var names = ['Alpha', 'Proxima', 'Sun', 'Magenta', 'Grapes', 'Best Hosting', 'Tech Labs', 'Ginger bird', 'Mercury', 'Phantom', 'Modern', 'Future Labs', 'Pineaple', 'Storm Technologies', 'Unnamed'];

	var Product = function () {
	  function Product(data, createFromObject) {
	    var _this = this;

	    (0, _classCallCheck3.default)(this, Product);

	    this.picked = function (value) {
	      return _this.features.bonuses[value];
	    };
	  }

	  (0, _createClass3.default)(Product, [{
	    key: 'createCompany',
	    value: function createCompany(data) {
	      var idea = data.idea,
	          name = data.name,
	          isCompetitor = data.isCompetitor,
	          companyId = data.companyId;
	      // logger.log('product constructor', data);

	      if (!idea) throw 'no idea in classes/Product.js';

	      if (companyId === null || companyId === undefined) throw 'no companyId in classes/Product.js';

	      var defaultFeatures = (0, _productDescriptions2.default)(idea).features;

	      if (!name) {
	        var index = Math.floor((0, _random2.default)(0, names.length - 1));

	        name = names[index];
	      }

	      var minRating = 1;
	      var maxRating = 6;

	      if (isCompetitor) {
	        minRating = 4;
	        maxRating = 10;
	      }

	      var offer = defaultFeatures.map(function (f, i) {
	        return Math.floor((0, _random2.default)(minRating, maxRating));
	      });

	      var features = {
	        offer: offer, // features, that are attached to main idea
	        development: {}, // backups, more dev servers, e.t.c.

	        marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
	        analytics: {}, // simple analytics (main KPIs),
	        // middle (segments analytics), mid+ (segments + versions),

	        // not only chat with users, but also localisations, content updates
	        // and all sort of things, that you need doing constantly
	        support: {},
	        payment: {},

	        bonuses: {}
	      };

	      this.bugs = [];
	      // this.bugs = [
	      //   { id: 0, cost: 15, penalty: 0.1, platform: 'web' },
	      //   { id: 1, cost: 25, penalty: 0.2, platform: 'web' },
	      //   { id: 2, cost: 35, penalty: 1, platform: 'back' }
	      // ];

	      this.companyId = companyId;
	      this.features = features;
	      this.idea = idea;
	      this.name = name;

	      this.bonuses = 1;

	      this._points = {
	        programming: 500,
	        management: 100
	      };

	      this._money = 45000;

	      this.team = {
	        programmers: [0, 0, 0, 0, 0] // intern, junior, middle, senior, architect
	      };
	      this.managers = [];
	      this.managerBonus = null;
	      this.corporativeCulture = {};
	      this.appBonuses = {};
	      this.exploration = [];

	      this.XP = 10;
	      this.totalXP = 0;
	      this.spendedXP = 0;

	      this.tests = 1;
	      this.improvements = 1;

	      this.owner = !isCompetitor;

	      return this;
	    }
	  }, {
	    key: 'loadFromObject',
	    value: function loadFromObject(obj) {
	      for (var index in obj) {
	        this[index] = obj[index];
	      }

	      return this;
	    }
	  }, {
	    key: 'isOurProduct',
	    value: function isOurProduct() {
	      return this.owner;
	    }
	  }, {
	    key: 'getIdea',
	    value: function getIdea() {
	      return this.idea;
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return this.name;
	    }
	  }, {
	    key: 'getStage',
	    value: function getStage() {
	      return this.stage;
	    }
	  }, {
	    key: 'getPP',
	    value: function getPP() {
	      return this._points.programming;
	    }
	  }, {
	    key: 'getMP',
	    value: function getMP() {
	      return this._points.management;
	    }
	  }, {
	    key: 'getPPProduction',
	    value: function getPPProduction() {
	      var value = 50; // managerial

	      var coders = this.team.programmers;

	      value += coders[0] * balance.PROGRAMMER_EFFICIENCY_INTERN;
	      value += coders[1] * balance.PROGRAMMER_EFFICIENCY_JUNIOR;
	      value += coders[2] * balance.PROGRAMMER_EFFICIENCY_MIDDLE;
	      value += coders[3] * balance.PROGRAMMER_EFFICIENCY_SENIOR;

	      return value;
	    }
	  }, {
	    key: 'getMPProduction',
	    value: function getMPProduction() {
	      return 100;
	    }
	  }, {
	    key: 'getXP',
	    value: function getXP() {
	      return this.XP;
	    }
	  }, {
	    key: 'getTestsAmount',
	    value: function getTestsAmount() {
	      return this.tests;
	    }
	  }, {
	    key: 'getSpendedXP',
	    value: function getSpendedXP() {
	      return this.spendedXP;
	    }
	  }, {
	    key: 'getTotalXP',
	    value: function getTotalXP() {
	      return this.totalXP;
	    }
	  }, {
	    key: 'getImprovementsAmount',
	    value: function getImprovementsAmount() {
	      return this.improvements;
	    }
	  }, {
	    key: 'getBugs',
	    value: function getBugs() {
	      return this.bugs;
	    }
	  }, {
	    key: 'getFeatures',
	    value: function getFeatures(featureGroup) {
	      return this.features[featureGroup];
	    }
	  }, {
	    key: 'getMainFeatureQualityByFeatureId',
	    value: function getMainFeatureQualityByFeatureId(featureId) {
	      return this.features.offer[featureId];
	    }
	  }, {
	    key: 'getMarketingFeatures',
	    value: function getMarketingFeatures() {
	      return this.features.marketing;
	    }
	  }, {
	    key: 'getFeatureStatus',
	    value: function getFeatureStatus(featureGroup, featureName) {
	      return this.features[featureGroup][featureName] > 0;
	    }
	  }, {
	    key: 'getDefaults',
	    value: function getDefaults() {
	      return (0, _productDescriptions2.default)(this.idea);
	    }
	  }, {
	    key: 'getMainFeatures',
	    value: function getMainFeatures() {
	      return this.getDefaults().features;
	    }
	  }, {
	    key: 'getMaxMainFeatureQuality',
	    value: function getMaxMainFeatureQuality(featureId) {
	      return this.getDefaults().features[featureId].data;
	    }
	  }, {
	    key: 'getBaseFeatureDevelopmentCost',
	    value: function getBaseFeatureDevelopmentCost(featureId) {
	      return this.getDefaults().features[featureId].development;
	    }
	  }, {
	    key: 'isShareableFeature',
	    value: function isShareableFeature(featureId) {
	      return this.getDefaults().features[featureId].shareable;
	    }

	    //

	  }, {
	    key: 'getPrettyFeatureNameByFeatureId',
	    value: function getPrettyFeatureNameByFeatureId(featureId) {
	      return this.getDefaults().features[featureId].shortDescription;
	    }
	  }, {
	    key: 'getDescriptionOfProduct',
	    value: function getDescriptionOfProduct() {
	      return this.getDefaults().description;
	    }
	  }, {
	    key: 'getImprovementChances',
	    value: function getImprovementChances() {
	      return 5;
	    }
	  }, {
	    key: 'getPaymentModifier',
	    value: function getPaymentModifier() {
	      return 1;
	    }
	  }, {
	    key: 'getProductExpenses',
	    value: function getProductExpenses() {
	      return this.getProductSupportCost();
	    }
	  }, {
	    key: 'getProductSupportCost',
	    value: function getProductSupportCost() {
	      var base = this.getDefaults().support.pp;

	      var modifier = Math.pow(this.getImprovementsAmount(), balance.SUPPORT_COST_MODIFIER);

	      return Math.ceil(base * modifier);
	    }

	    // bonuses

	  }, {
	    key: 'getAvailableBonuses',
	    value: function getAvailableBonuses() {
	      var _this2 = this;

	      var list = this.getBonusesList();

	      var newList = [];

	      var checkBonus = function checkBonus(b) {
	        if (_this2.picked(b.name)) {
	          if (b.childs) {
	            b.childs.forEach(checkBonus);
	          }

	          return;
	        }

	        newList.push(b);
	      };

	      list.forEach(checkBonus);

	      return newList;
	    }
	  }, {
	    key: 'getBonusesList',
	    value: function getBonusesList() {
	      // constants/products/bonuses-list
	      return null;
	    }
	  }, {
	    key: 'getMarketingFeatureList',
	    value: function getMarketingFeatureList() {
	      // constants/products/marketing-feature-list
	      return null;
	    }
	  }, {
	    key: 'getHypothesisAnalyticsFeatures',
	    value: function getHypothesisAnalyticsFeatures() {
	      return null;
	    }
	  }, {
	    key: 'getPaymentFeatures',
	    value: function getPaymentFeatures() {
	      return null;
	    }
	  }, {
	    key: 'switchStage',


	    // modify
	    value: function switchStage(stage) {
	      this.stage = stage;
	    }
	  }, {
	    key: 'setProductDefaults',
	    value: function setProductDefaults(stage, features, XP) {
	      throw 'setProductDefaults';

	      this.stage = stage;
	      this.features = features;
	      this.XP = XP;
	    }
	  }, {
	    key: 'addPPs',
	    value: function addPPs(pp) {
	      this._points.programming += pp;
	    }
	  }, {
	    key: 'addMPs',
	    value: function addMPs(mp) {
	      this._points.management += mp;
	    }
	  }, {
	    key: 'spendPPs',
	    value: function spendPPs(pp) {
	      this._points.programming -= pp;
	    }
	  }, {
	    key: 'spendMPs',
	    value: function spendMPs(mp) {
	      this._points.management -= mp;
	    }
	  }, {
	    key: 'addBug',
	    value: function addBug(p) {
	      this.bugs.push({
	        cost: p.cost,
	        platform: p.platform,
	        penalty: p.penalty,
	        id: this.bugs.length
	      });
	    }
	  }, {
	    key: 'fixBug',
	    value: function fixBug(bugId) {
	      var index = this.bugs.findIndex(function (b) {
	        return b.id === bugId;
	      });

	      this.spendPPs(this.bugs[index].cost);

	      this.bugs.splice(index, 1);
	    }
	  }, {
	    key: 'produceResources',
	    value: function produceResources() {
	      this.testHypothesis({ value: this.getImprovementChances() });
	      this.addPPs(this.getPPProduction());
	      this.addMPs(this.getMPProduction());
	    }
	  }, {
	    key: 'testHypothesis',
	    value: function testHypothesis(p) {
	      this.XP += p.value;
	      this.totalXP += p.value;

	      if (this.tests) {
	        this.tests++;
	      } else {
	        this.tests = 1;
	      }
	    }
	  }, {
	    key: 'decreaseXP',
	    value: function decreaseXP(xp) {
	      this.XP -= xp;
	      this.spendedXP -= xp;
	    }
	  }, {
	    key: 'improveFeature',
	    value: function improveFeature(p) {
	      var previous = this.features[p.featureGroup][p.featureName] || 0;

	      this.features[p.featureGroup][p.featureName] = previous + p.value;

	      if (this.improvements) {
	        this.improvements++;
	      } else {
	        this.improvements = 1;
	      }

	      this.XP -= p.XP;
	    }
	  }, {
	    key: 'improveFeatureByPoints',
	    value: function improveFeatureByPoints(p) {
	      this.features[p.featureGroup][p.featureName] = 1;

	      if (p.featureGroup === 'bonuses') {
	        this.bonuses--;
	      }
	    }
	  }]);
	  return Product;
	}();

	exports.default = Product;

/***/ },
/* 122 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (min, max) {
	  return Math.random() * (max - min) + min;
	};

	;

/***/ },
/* 123 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TECHNICAL_DEBT_MODIFIER = exports.TECHNICAL_DEBT_MODIFIER = 1.03;
	var TECHNOLOGY_COST_MODIFIER = exports.TECHNOLOGY_COST_MODIFIER = 1.045;
	var SUPPORT_COST_MODIFIER = exports.SUPPORT_COST_MODIFIER = 1.08; // 0.65;


	var PROGRAMMER_EFFICIENCY_INTERN = exports.PROGRAMMER_EFFICIENCY_INTERN = 1;
	var PROGRAMMER_EFFICIENCY_JUNIOR = exports.PROGRAMMER_EFFICIENCY_JUNIOR = 3;
	var PROGRAMMER_EFFICIENCY_MIDDLE = exports.PROGRAMMER_EFFICIENCY_MIDDLE = 6;
	var PROGRAMMER_EFFICIENCY_SENIOR = exports.PROGRAMMER_EFFICIENCY_SENIOR = 8;

	var PROGRAMMER_SALARY_INTERN = exports.PROGRAMMER_SALARY_INTERN = 1;
	var PROGRAMMER_SALARY_JUNIOR = exports.PROGRAMMER_SALARY_JUNIOR = 3;
	var PROGRAMMER_SALARY_MIDDLE = exports.PROGRAMMER_SALARY_MIDDLE = 6;
	var PROGRAMMER_SALARY_SENIOR = exports.PROGRAMMER_SALARY_SENIOR = 8;

	var PROGRAMMER_CODE_QUALITY_INTERN = exports.PROGRAMMER_CODE_QUALITY_INTERN = 1;
	var PROGRAMMER_CODE_QUALITY_JUNIOR = exports.PROGRAMMER_CODE_QUALITY_JUNIOR = 3;
	var PROGRAMMER_CODE_QUALITY_MIDDLE = exports.PROGRAMMER_CODE_QUALITY_MIDDLE = 6;
	var PROGRAMMER_CODE_QUALITY_SENIOR = exports.PROGRAMMER_CODE_QUALITY_SENIOR = 8;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(125);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(35);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function saveInStorage(field, data) {
	  var item = data;
	  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) == 'object') {
	    //console.log('object');
	    item = (0, _stringify2.default)(data);
	  }
	  localStorage.setItem(field, item);
	  //storage[field] = item;
	}
	function getFromStorage(field) {
	  return localStorage.getItem(field);
	}

	function getObject(arrName) {
	  return JSON.parse(getFromStorage(arrName));
	}

	function setInObject(arrName, id, value) {
	  var array = getObject(arrName);

	  array[id] = value;
	  saveInStorage(arrName, array);
	}

	function unsetFromObject(arrName, id) {
	  var array = getObject(arrName);

	  delete array[id];

	  saveInStorage(arrName, array);
	}

	function clearStorage() {
	  localStorage.clear();
	}

	//clearStorage();

	// cookies
	// возвращает cookie если есть или undefined
	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// уcтанавливает cookie
	function setCookie(name, value, props) {
	  props = props || {};
	  var exp = props.expires;
	  if (typeof exp == "number" && exp) {
	    var d = new Date();
	    d.setTime(d.getTime() + exp * 1000);
	    exp = props.expires = d;
	  }
	  if (exp && exp.toUTCString) {
	    props.expires = exp.toUTCString();
	  }

	  value = encodeURIComponent(value);
	  var updatedCookie = name + "=" + value;
	  for (var propName in props) {
	    updatedCookie += "; " + propName;
	    var propValue = props[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }
	  document.cookie = updatedCookie;
	}

	// удаляет cookie
	function deleteCookie(name) {
	  setCookie(name, null, { expires: -1 });
	}

	exports.default = {
	  deleteCookie: deleteCookie,
	  saveInStorage: saveInStorage,
	  getFromStorage: getFromStorage,
	  getObject: getObject,
	  setInObject: setInObject,
	  unsetFromObject: unsetFromObject,
	  clearStorage: clearStorage,
	  getCookie: getCookie,
	  setCookie: setCookie
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(16)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GAME_STAGE_INIT = exports.GAME_STAGE_INIT = 0;
	var GAME_STAGE_GAME_STARTED = exports.GAME_STAGE_GAME_STARTED = 1;
	var GAME_STAGE_HIRED_FIRST_WORKER = exports.GAME_STAGE_HIRED_FIRST_WORKER = 2;
	var GAME_STAGE_INVITED_FIRST_CLIENTS = exports.GAME_STAGE_INVITED_FIRST_CLIENTS = 3;
	var GAME_STAGE_IMPROVED_ANALYTICS = exports.GAME_STAGE_IMPROVED_ANALYTICS = 4;
	var GAME_STAGE_STARTED_FIRST_HYPOTHESIS = exports.GAME_STAGE_STARTED_FIRST_HYPOTHESIS = 4.1;
	var GAME_STAGE_LEARNED_SPEEDER = exports.GAME_STAGE_LEARNED_SPEEDER = 5; // month passed
	var GAME_STAGE_TESTED_FIRST_HYPOTHESIS = exports.GAME_STAGE_TESTED_FIRST_HYPOTHESIS = 6;
	var GAME_STAGE_IMPROVED_FIRST_FEATURE = exports.GAME_STAGE_IMPROVED_FIRST_FEATURE = 7;
	var GAME_STAGE_GOT_RATING_SEVEN_PLUS = exports.GAME_STAGE_GOT_RATING_SEVEN_PLUS = 8; // MONETISATION
	var GAME_STAGE_PAYMENTS_INSTALLED = exports.GAME_STAGE_PAYMENTS_INSTALLED = 9; // MONETISATION

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var JOB_MOTIVATION_BUSINESS_OWNER = exports.JOB_MOTIVATION_BUSINESS_OWNER = 'JOB_MOTIVATION_BUSINESS_OWNER';
	var JOB_MOTIVATION_IDEA_FAN = exports.JOB_MOTIVATION_IDEA_FAN = 'JOB_MOTIVATION_IDEA_FAN';
	var JOB_MOTIVATION_SALARY = exports.JOB_MOTIVATION_SALARY = 'JOB_MOTIVATION_SALARY';
	var JOB_MOTIVATION_PERCENTAGE = exports.JOB_MOTIVATION_PERCENTAGE = 'JOB_MOTIVATION_PERCENTAGE';

	var JOB_TASK_PROGRAMMER_POINTS = exports.JOB_TASK_PROGRAMMER_POINTS = 'JOB_TASK_PROGRAMMER_POINTS';
	var JOB_TASK_MARKETING_POINTS = exports.JOB_TASK_MARKETING_POINTS = 'JOB_TASK_MARKETING_POINTS';

	var PROFESSION_PROGRAMMER = exports.PROFESSION_PROGRAMMER = 'PROFESSION_PROGRAMMER';
	var PROFESSION_MARKETER = exports.PROFESSION_MARKETER = 'PROFESSION_MARKETER';
	var PROFESSION_DESIGNER = exports.PROFESSION_DESIGNER = 'PROFESSION_DESIGNER';
	var PROFESSION_ANALYST = exports.PROFESSION_ANALYST = 'PROFESSION_ANALYST';

	var PRICE_OF_ONE_MP = exports.PRICE_OF_ONE_MP = 30;
	var PRICE_OF_ONE_PP = exports.PRICE_OF_ONE_PP = 30;

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PRODUCT_STAGE_IDEA = exports.PRODUCT_STAGE_IDEA = 'PRODUCT_STAGE_IDEA';
	var PRODUCT_STAGE_MVP = exports.PRODUCT_STAGE_MVP = 'PRODUCT_STAGE_MVP';
	var PRODUCT_STAGE_NORMAL = exports.PRODUCT_STAGE_NORMAL = 'PRODUCT_STAGE_NORMAL';

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.saveAction = saveAction;
	exports.achievement = achievement;

	var _sessionStorage = __webpack_require__(124);

	var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function saveAction(actionType, data) {}
	// logger.debug('saveAction', actionType, data);

	//
	function achievement(name) {}

	exports.default = {
	  saveAction: saveAction,
	  achievement: achievement
	};

	// export default function () {
	//
	// }

/***/ },
/* 131 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (features, maxValues, influenceValuesOnRating) {
	  var rating = 0;

	  features.forEach(function (current, i) {
	    var quality = features[i] / maxValues[i];

	    var influence = influenceValuesOnRating[i];

	    rating += quality * influence;
	  });

	  return rating;
	};

/***/ },
/* 132 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  return Math.ceil(value * 100) / 100;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _random = __webpack_require__(122);

	var _random2 = _interopRequireDefault(_random);

	var _round = __webpack_require__(132);

	var _round2 = _interopRequireDefault(_round);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (platforms) {
	  var featureCost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	  var tests = arguments[2];
	  var bonuses = arguments[3];

	  var complexity = (0, _random2.default)(0.1, 1.5);
	  var importance = Math.ceil((0, _random2.default)(0, 1000));

	  var penalty = void 0;

	  if (importance < 10) {
	    penalty = 0.5;
	  } else if (importance < 10 + 40) {
	    penalty = 0.25;
	  } else if (importance < 10 + 40 + 150) {
	    penalty = 0.1;
	  } else if (importance < 10 + 40 + 150 + 300) {
	    penalty = 0.03;
	  } else {
	    penalty = 0.01;
	  }

	  // const cost = Math.ceil(penalty * 100 * Math.pow(2, complexity));
	  var cost = Math.ceil((1 + penalty) * Math.pow(featureCost, complexity));

	  return {
	    cost: cost,
	    platform: 'web',
	    penalty: penalty
	  };
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PRODUCT_ACTIONS_IMPROVE_FEATURE = exports.PRODUCT_ACTIONS_IMPROVE_FEATURE = 'PRODUCT_ACTIONS_IMPROVE_FEATURE';
	var PRODUCT_ACTIONS_IMPROVE_MAIN_FEATURE = exports.PRODUCT_ACTIONS_IMPROVE_MAIN_FEATURE = 'PRODUCT_ACTIONS_IMPROVE_MAIN_FEATURE';
	var PRODUCT_ACTIONS_CLIENTS_ADD = exports.PRODUCT_ACTIONS_CLIENTS_ADD = 'PRODUCT_ACTIONS_CLIENTS_ADD';
	var PRODUCT_ACTIONS_CLIENTS_REMOVE = exports.PRODUCT_ACTIONS_CLIENTS_REMOVE = 'PRODUCT_ACTIONS_CLIENTS_REMOVE';
	var PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD = exports.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD = 'PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD';
	var PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS = exports.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS = 'PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS';
	var PRODUCT_ACTIONS_SWITCH_STAGE = exports.PRODUCT_ACTIONS_SWITCH_STAGE = 'PRODUCT_ACTIONS_SWITCH_STAGE';
	var PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS = exports.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS = 'PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS';
	var PRODUCT_ACTIONS_TEST_HYPOTHESIS = exports.PRODUCT_ACTIONS_TEST_HYPOTHESIS = 'PRODUCT_ACTIONS_TEST_HYPOTHESIS';
	var PRODUCT_ACTIONS_CREATE_PLAYER_COMPANY = exports.PRODUCT_ACTIONS_CREATE_PLAYER_COMPANY = 'PRODUCT_ACTIONS_CREATE_PLAYER_COMPANY';
	var PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY = exports.PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY = 'PRODUCT_ACTIONS_CREATE_COMPETITOR_COMPANY';
	var PRODUCT_ACTIONS_CREATE_COMPANY = exports.PRODUCT_ACTIONS_CREATE_COMPANY = 'PRODUCT_ACTIONS_CREATE_COMPANY';
	var PRODUCT_ACTIONS_COMPANY_BUY = exports.PRODUCT_ACTIONS_COMPANY_BUY = 'PRODUCT_ACTIONS_COMPANY_BUY';
	var PRODUCT_ACTIONS_HYPE_ADD = exports.PRODUCT_ACTIONS_HYPE_ADD = 'PRODUCT_ACTIONS_HYPE_ADD';
	var PRODUCT_ACTIONS_FIX_BUG = exports.PRODUCT_ACTIONS_FIX_BUG = 'PRODUCT_ACTIONS_FIX_BUG';
	var PRODUCT_ACTIONS_ADD_BUG = exports.PRODUCT_ACTIONS_ADD_BUG = 'PRODUCT_ACTIONS_ADD_BUG';

	var PRODUCT_ACTIONS_EXPLORE_MARKET = exports.PRODUCT_ACTIONS_EXPLORE_MARKET = 'PRODUCT_ACTIONS_EXPLORE_MARKET';

	var PRODUCT_PRODUCE_RESOURCES = exports.PRODUCT_PRODUCE_RESOURCES = 'PRODUCT_PRODUCE_RESOURCES';

	var PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE = exports.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE = 'PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE';
	var PRODUCT_ACTIONS_TECHNOLOGY_RENT = exports.PRODUCT_ACTIONS_TECHNOLOGY_RENT = 'PRODUCT_ACTIONS_TECHNOLOGY_RENT';
	var PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH = exports.PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH = 'PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH';
	var PRODUCT_ACTIONS_BONUSES_ADD = exports.PRODUCT_ACTIONS_BONUSES_ADD = 'PRODUCT_ACTIONS_BONUSES_ADD';
	var PRODUCT_ACTIONS_MARKETS_INFLUENCE_INCREASE = exports.PRODUCT_ACTIONS_MARKETS_INFLUENCE_INCREASE = 'PRODUCT_ACTIONS_MARKETS_INFLUENCE_INCREASE';
	var PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE = exports.PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE = 'PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE';
	var PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN = exports.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN = 'PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN';
	var PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER = exports.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER = 'PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER';
	var PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE = exports.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE = 'PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE';
	var PRODUCT_ACTIONS_MARKETS_JOIN = exports.PRODUCT_ACTIONS_MARKETS_JOIN = 'PRODUCT_ACTIONS_MARKETS_JOIN';

	var PLAYER_ACTIONS_INCREASE_MONEY = exports.PLAYER_ACTIONS_INCREASE_MONEY = 'PLAYER_ACTIONS_INCREASE_MONEY';
	var PLAYER_ACTIONS_IMPROVE_SKILL = exports.PLAYER_ACTIONS_IMPROVE_SKILL = 'PLAYER_ACTIONS_IMPROVE_SKILL';
	var PLAYER_ACTIONS_EXPENSES_ADD = exports.PLAYER_ACTIONS_EXPENSES_ADD = 'PLAYER_ACTIONS_EXPENSES_ADD';
	var PLAYER_ACTIONS_EXPENSES_REMOVE = exports.PLAYER_ACTIONS_EXPENSES_REMOVE = 'PLAYER_ACTIONS_EXPENSES_REMOVE';
	var PLAYER_ACTIONS_LOANS_TAKE = exports.PLAYER_ACTIONS_LOANS_TAKE = 'PLAYER_ACTIONS_LOANS_TAKE';
	var PLAYER_ACTIONS_LOANS_REPAY = exports.PLAYER_ACTIONS_LOANS_REPAY = 'PLAYER_ACTIONS_LOANS_REPAY';
	var PLAYER_ACTIONS_SET_TASK = exports.PLAYER_ACTIONS_SET_TASK = 'PLAYER_ACTIONS_SET_TASK';
	var PLAYER_ACTIONS_INCREASE_POINTS = exports.PLAYER_ACTIONS_INCREASE_POINTS = 'PLAYER_ACTIONS_INCREASE_POINTS';
	var PLAYER_ACTIONS_BUY_PP = exports.PLAYER_ACTIONS_BUY_PP = 'PLAYER_ACTIONS_BUY_PP';
	var PLAYER_ACTIONS_BUY_MP = exports.PLAYER_ACTIONS_BUY_MP = 'PLAYER_ACTIONS_BUY_MP';
	var PLAYER_ACTIONS_DECREASE_POINTS = exports.PLAYER_ACTIONS_DECREASE_POINTS = 'PLAYER_ACTIONS_DECREASE_POINTS';
	var PLAYER_ACTIONS_HIRE_WORKER = exports.PLAYER_ACTIONS_HIRE_WORKER = 'PLAYER_ACTIONS_HIRE_WORKER';
	var PLAYER_ACTIONS_FIRE_WORKER = exports.PLAYER_ACTIONS_FIRE_WORKER = 'PLAYER_ACTIONS_FIRE_WORKER';
	var PLAYER_ACTIONS_EMPLOYEE_ADD = exports.PLAYER_ACTIONS_EMPLOYEE_ADD = 'PLAYER_ACTIONS_EMPLOYEE_ADD';
	var PLAYER_ACTIONS_EMPLOYEE_REMOVE = exports.PLAYER_ACTIONS_EMPLOYEE_REMOVE = 'PLAYER_ACTIONS_EMPLOYEE_REMOVE';
	var PLAYER_ACTIONS_UPDATE_EMPLOYEES = exports.PLAYER_ACTIONS_UPDATE_EMPLOYEES = 'PLAYER_ACTIONS_UPDATE_EMPLOYEES';

/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SCHEDULE_ACTIONS_DAY_TICK = exports.SCHEDULE_ACTIONS_DAY_TICK = 'SCHEDULE_ACTIONS_DAY_TICK';
	var SCHEDULE_ACTIONS_TASKS_ADD = exports.SCHEDULE_ACTIONS_TASKS_ADD = 'SCHEDULE_ACTIONS_TASKS_ADD';
	var SCHEDULE_ACTIONS_TASKS_REMOVE = exports.SCHEDULE_ACTIONS_TASKS_REMOVE = 'SCHEDULE_ACTIONS_TASKS_REMOVE';
	var SCHEDULE_ACTIONS_GAME_START = exports.SCHEDULE_ACTIONS_GAME_START = 'SCHEDULE_ACTIONS_GAME_START';
	var SCHEDULE_ACTIONS_SET_GAME_PHASE = exports.SCHEDULE_ACTIONS_SET_GAME_PHASE = 'SCHEDULE_ACTIONS_SET_GAME_PHASE';
	var SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS = exports.SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS = 'SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS';

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(137);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _productStorePayload$;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (_productStorePayload$ = {
	  productStorePayload: {
	    name: 'productStorePayload',
	    type: {
	      type: String,
	      id: Number, // product id
	      featureGroup: String,
	      featureName: String,
	      value: Number
	    }
	  },
	  scheduleStorePayload: {
	    name: 'scheduleStorePayload',
	    type: {
	      type: String,
	      task: Object,
	      id: Number
	    }
	  }

	}, (0, _defineProperty3.default)(_productStorePayload$, 'productStorePayload', {
	  name: 'productStorePayload',
	  type: {
	    type: String,
	    amount: Number
	  }
	}), (0, _defineProperty3.default)(_productStorePayload$, 'messageStorePayload', {
	  name: 'messageStorePayload',
	  type: {
	    type: String,
	    amount: Number
	  }
	}), _productStorePayload$);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(31);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Market = __webpack_require__(139);

	var _Market2 = _interopRequireDefault(_Market);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MarketManager = function () {
	  function MarketManager(idea) {
	    (0, _classCallCheck3.default)(this, MarketManager);

	    this.idea = idea;
	    this.markets = [];
	  }

	  (0, _createClass3.default)(MarketManager, [{
	    key: 'load',
	    value: function load(markets, info) {
	      this.info = info;
	      this.markets = markets.map(function (m) {
	        _logger2.default.log('load markets', m);

	        return new _Market2.default(m);
	      });
	    }
	  }, {
	    key: 'getPossibleIncome',
	    value: function getPossibleIncome(marketId, productId) {
	      return this.getInfo(marketId).price * this.getClients(marketId, productId);
	    }
	  }, {
	    key: 'getMarket',
	    value: function getMarket(marketId) {
	      return this.markets.find(function (m) {
	        return m.id === marketId;
	      });
	    }
	  }, {
	    key: 'getClients',
	    value: function getClients(marketId, productId) {
	      return this.getMarket(marketId).getClients(productId);
	    }
	  }, {
	    key: 'getMarketLoyalty',
	    value: function getMarketLoyalty(marketId, productId) {
	      return this.getMarket(marketId).getLoyalty(productId);
	    }
	  }, {
	    key: 'getHype',
	    value: function getHype(marketId, productId) {
	      return this.getMarket(marketId).getHype(productId);
	    }

	    // getPowerListOnMarket(marketId) {
	    //   return this.getMarket(marketId).getPowerList()
	    // }

	    // getPowerOfCompanyOnMarket(productId, marketId) {
	    //   return this.getMarket(marketId).getPowerOnMarket(productId);
	    // }

	  }, {
	    key: 'getMarketShare',
	    value: function getMarketShare(marketId, productId) {
	      return this.getMarket(marketId).getShareOnMarket(productId);
	    }
	  }, {
	    key: 'getMarketingKnowledge',
	    value: function getMarketingKnowledge(marketId, productId) {
	      return this.getMarket(marketId).getMarketingKnowledge(productId);
	    }
	  }, {
	    key: 'getIncomesForCompany',
	    value: function getIncomesForCompany(productId) {
	      var _this = this;

	      return this.markets.map(function (m) {
	        return _this.getMarketSize(m.id) * m.getShareOnMarket(productId);
	      });
	    }
	  }, {
	    key: 'isMainMarket',
	    value: function isMainMarket(productId, marketId) {
	      return false;
	    }
	  }, {
	    key: 'markets',
	    value: function markets() {
	      return this.markets;
	    }
	  }, {
	    key: 'getInfo',
	    value: function getInfo(marketId) {
	      return this.info.markets[marketId];
	    }
	  }, {
	    key: 'getMarketSize',
	    value: function getMarketSize(marketId) {
	      var info = this.getInfo(marketId);

	      return info.price * info.clients;
	    }
	  }, {
	    key: 'getRatingFormula',
	    value: function getRatingFormula(marketId) {
	      return this.getInfo(marketId).rating;
	    }
	  }, {
	    key: 'iterate',
	    value: function iterate(cb) {
	      return this.markets.map(cb);
	    }
	  }, {
	    key: 'isExploredMarket',
	    value: function isExploredMarket(productId, marketId) {
	      // return true;
	      return this.getMarket(marketId).isExploredMarket(productId);
	    }
	  }, {
	    key: 'iterateByCompanyMarkets',
	    value: function iterateByCompanyMarkets(productId, cb) {
	      return this.markets.filter(function (m) {
	        return m.isExploredMarket(productId);
	      }).forEach(cb);
	    }

	    // setters

	  }, {
	    key: 'joinProduct',
	    value: function joinProduct(marketId, productId) {
	      this.getMarket(marketId).join(productId);

	      return this;
	    }
	  }, {
	    key: 'exploreMarket',
	    value: function exploreMarket(marketId, productId) {
	      this.joinProduct(marketId, productId);
	    }
	  }, {
	    key: 'addHype',
	    value: function addHype(marketId, productId, hype) {
	      this.getMarket(marketId).addHype(productId, hype);

	      return this;
	    }
	  }, {
	    key: 'addClients',
	    value: function addClients(marketId, productId, clients) {
	      this.getMarket(marketId).addClients(productId, clients);
	    }
	  }, {
	    key: 'loseMonthlyHype',
	    value: function loseMonthlyHype(id) {
	      this.iterate(function (m) {
	        m.loseMonthlyHype(id);
	      });
	    }
	  }, {
	    key: 'setMainMarket',
	    value: function setMainMarket(productId, marketId) {
	      this.getMarket(marketId).setAsMain(productId);

	      return this;
	    }
	  }, {
	    key: 'makePartnership',
	    value: function makePartnership(p1, p2, marketId) {
	      this.getMarket(marketId).makePartnership(p1, p2);

	      return this;
	    }
	  }, {
	    key: 'breakPartnership',
	    value: function breakPartnership(p1, p2, marketId) {
	      this.getMarket(marketId).breakPartnership(p1, p2);

	      return this;
	    }
	  }]);
	  return MarketManager;
	}();

	exports.default = MarketManager;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var proceed = function proceed(target, property, descriptor) {
	  // if (getStage() >= stage || isTestMode) {
	  // descriptor.value = () => true;
	  descriptor.value = function () {
	    return true;
	  };
	  descriptor.enumerable = false;
	  descriptor.configurable = true;
	  descriptor.writable = true;

	  _logger2.default.log(target, property, descriptor);
	  // }
	};

	var Market = function () {
	  function Market(data) {
	    (0, _classCallCheck3.default)(this, Market);

	    this.id = data.id;
	    this.records = data.records || [];
	    this.partnerships = data.partnerships || [];
	  }

	  (0, _createClass3.default)(Market, [{
	    key: 'isExploredMarket',
	    value: function isExploredMarket(companyId) {
	      return this.getRecordByProductId(companyId);
	    }
	  }, {
	    key: 'getMainMarketModifier',
	    value: function getMainMarketModifier(companyId) {
	      var record = this.getRecordByProductId(companyId);

	      return record.isMain ? 1.2 : 1;
	    }
	  }, {
	    key: 'getMarketingKnowledge',
	    value: function getMarketingKnowledge(productId) {
	      var record = this.getRecordByProductId(productId);

	      if (!record) return 0;

	      return record.knowledgeOfMarket || 0;
	    }
	  }, {
	    key: 'getClients',
	    value: function getClients(companyId) {
	      var record = this.getRecordByProductId(companyId);

	      if (!record) return 0;

	      return record.clients || 0;
	    }
	  }, {
	    key: 'getLoyalty',
	    value: function getLoyalty(companyId) {
	      var record = this.getRecordByProductId(companyId);

	      if (!record) return 0;

	      return record.loyalty || 0;
	    }
	  }, {
	    key: 'getRecordByProductId',
	    value: function getRecordByProductId(companyId) {
	      return this.records.find(function (r) {
	        return r.companyId === companyId;
	      });
	    }
	  }, {
	    key: 'getRecordIdByProductId',
	    value: function getRecordIdByProductId(companyId) {
	      return this.records.findIndex(function (r) {
	        return r.companyId === companyId;
	      });
	    }

	    // setters

	  }, {
	    key: 'join',
	    value: function join(companyId) {
	      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      this.records.push({
	        companyId: companyId,
	        hype: 1 + Math.floor(Math.random() * 10),
	        active: true,
	        isMain: false,
	        level: level,
	        clients: 0,
	        knowledgeOfMarket: 0,
	        loyalty: 0
	      });

	      return this;
	    }
	  }, {
	    key: 'addClients',
	    value: function addClients(companyId, newUsers) {
	      var index = this.getRecordIdByProductId(companyId);

	      if (index < 0) return this;

	      var previousAmountOfClients = this.records[index].clients;
	      var previousLoyalty = this.records[index].loyalty;
	      this.records[index].knowledgeOfMarket += 1;

	      this.records[index].clients += newUsers;

	      var baseAmountOfLoyaltyForNewUsers = 10;

	      var newLoyalty = void 0;
	      if (previousAmountOfClients + newUsers === 0) {
	        newLoyalty = baseAmountOfLoyaltyForNewUsers;
	      } else {
	        newLoyalty = Math.floor((previousAmountOfClients * previousLoyalty + newUsers * baseAmountOfLoyaltyForNewUsers) / (previousAmountOfClients + newUsers));
	      }

	      this.records[index].loyalty = newLoyalty;
	    }
	  }, {
	    key: 'levelUp',
	    value: function levelUp(companyId) {
	      var maxLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      var index = this.getRecordIdByProductId(companyId);

	      if (index < 0) return this;

	      var lvl = this.records[index].level;

	      if (lvl < maxLevel) {
	        this.records[index].level = lvl + 1;
	      }

	      return this;
	    }
	  }, {
	    key: 'addHype',
	    value: function addHype(companyId, hype) {
	      var index = this.getRecordIdByProductId(companyId);

	      if (index < 0) return this;

	      var was = this.records[index].hype;

	      this.records[index].hype = Math.min(100, was + hype);

	      return this;
	    }
	  }, {
	    key: 'setAsMain',
	    value: function setAsMain(companyId) {
	      this.records.find(function (r) {
	        return r.companyId === companyId;
	      }).isMain = true;

	      return true;
	    }
	  }]);
	  return Market;
	}();

	exports.default = Market;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(93);

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _messageActions = __webpack_require__(141);

	var c = _interopRequireWildcard(_messageActions);

	var _events2 = __webpack_require__(142);

	var t = _interopRequireWildcard(_events2);

	var _payloads = __webpack_require__(136);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _job = __webpack_require__(128);

	var JOB = _interopRequireWildcard(_job);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'MAIN_EVENT_CHANGE';

	var _messages = [
	  // {
	  //   type: c.MESSAGE_TYPE_GAME_EVENT,
	  //   data: {
	  //     type: t.GAME_EVENT_HIRE_ENTHUSIAST,
	  //     player: {
	  //       name: 'Jessie',
	  //       skills: {
	  //         programming: 0,
	  //         marketing: 800,
	  //         analyst: 50
	  //       },
	  //       task: JOB.JOB_TASK_MARKETING_POINTS,
	  //       jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
	  //       salary: {}
	  //     }
	  //   }
	  // },

	  // {
	  //   type: c.MESSAGE_TYPE_GAME_EVENT,
	  //   data: {
	  //     type: t.GAME_EVENT_FREE_POINTS,
	  //     points: 100,
	  //   }
	  // },
	  // {
	  //   type: c.MESSAGE_TYPE_GAME_EVENT,
	  //   data: {
	  //     type: t.GAME_EVENT_FREE_MONEY,
	  //     money: 32000,
	  //   }
	  // }
	];

	var _notifications = [];

	var ScheduleStore = function (_EventEmitter) {
	  (0, _inherits3.default)(ScheduleStore, _EventEmitter);

	  function ScheduleStore() {
	    (0, _classCallCheck3.default)(this, ScheduleStore);
	    return (0, _possibleConstructorReturn3.default)(this, (ScheduleStore.__proto__ || (0, _getPrototypeOf2.default)(ScheduleStore)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ScheduleStore, [{
	    key: 'addChangeListener',
	    value: function addChangeListener(cb) {
	      this.addListener(EC, cb);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(cb) {
	      this.removeListener(EC, cb);
	    }
	  }, {
	    key: 'emitChange',
	    value: function emitChange() {
	      this.emit(EC);
	    }
	  }, {
	    key: 'getMessages',
	    value: function getMessages() {
	      return _messages;
	    }
	  }, {
	    key: 'isDrawable',
	    value: function isDrawable() {
	      return _messages.filter(function (m) {
	        return m.isModal;
	      }).length;
	    }
	  }, {
	    key: 'getPlainMessages',
	    value: function getPlainMessages() {
	      return _notifications;
	    }
	  }, {
	    key: 'getNotifications',
	    value: function getNotifications() {
	      return this.getPlainMessages().reverse();
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize(messages) {
	      _messages = messages;
	    }
	  }, {
	    key: 'getStoreData',
	    value: function getStoreData() {
	      return {
	        messages: _messages
	      };
	    }
	  }]);
	  return ScheduleStore;
	}(_events.EventEmitter);

	var add = function add(message) {
	  _messages.push(message);
	};

	var respond = function respond(i, message) {
	  _messages.cb(message);
	  _messages.splice(i, 1);
	};

	var close = function close(i) {
	  // logger.debug('close ', i, 'message');
	  _messages.splice(i, 1);
	};

	var store = new ScheduleStore();

	var payload = _payloads2.default.messageStorePayload;


	_dispatcher2.default.register(function (p) {
	  if (!p.type) {
	    _logger2.default.error('empty type prop in payload ' + payload.name, p);
	    return;
	  }

	  var change = true;
	  switch (p.type) {
	    case c.GAME_EVENT_ADD:
	      add(p.message);
	      break;
	    case c.GAME_EVENT_CHOOSE_ANSWER:
	      respond(p.message);
	      break;
	    case c.GAME_EVENT_CLOSE_TAB:
	      close(p.id);
	      break;
	    case c.NOTIFICATION_ADD:
	      _notifications.push(p.message);
	      break;
	    default:
	      break;
	  }

	  if (change) store.emitChange();
	});

	exports.default = store;

/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GAME_EVENT_ADD = exports.GAME_EVENT_ADD = 'GAME_EVENT_ADD';
	var MODAL_EVENT_ADD = exports.MODAL_EVENT_ADD = 'MODAL_EVENT_ADD';
	var GAME_EVENT_CHOOSE_ANSWER = exports.GAME_EVENT_CHOOSE_ANSWER = 'GAME_EVENT_CHOOSE_ANSWER';
	var GAME_EVENT_CLOSE_TAB = exports.GAME_EVENT_CLOSE_TAB = 'GAME_EVENT_CLOSE_TAB';

	var MESSAGE_TYPE_GAME_EVENT = exports.MESSAGE_TYPE_GAME_EVENT = 'MESSAGE_TYPE_GAME_EVENT';
	var MESSAGE_TYPE_INFO = exports.MESSAGE_TYPE_INFO = 'MESSAGE_TYPE_INFO';
	var MESSAGE_TYPE_POLL = exports.MESSAGE_TYPE_POLL = 'MESSAGE_TYPE_POLL';

	var NOTIFICATION_ADD = exports.NOTIFICATION_ADD = 'NOTIFICATION_ADD';

/***/ },
/* 142 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GAME_EVENT_HIRE_ENTHUSIAST = exports.GAME_EVENT_HIRE_ENTHUSIAST = 1;
	var GAME_EVENT_HIRE_RELATIVE = exports.GAME_EVENT_HIRE_RELATIVE = 2;
	var GAME_EVENT_FREE_MONEY = exports.GAME_EVENT_FREE_MONEY = 3;
	var GAME_EVENT_FREE_POINTS = exports.GAME_EVENT_FREE_POINTS = 4;
	var GAME_EVENT_BANKRUPT = exports.GAME_EVENT_BANKRUPT = 5;
	var GAME_EVENT_COMPETITOR_CREATE = exports.GAME_EVENT_COMPETITOR_CREATE = 6;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(144);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(93);

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(135);

	var c = _interopRequireWildcard(_scheduleActions);

	var _payloads = __webpack_require__(136);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _gameStages = __webpack_require__(127);

	var GAME_STAGES = _interopRequireWildcard(_gameStages);

	var _workSpeed = __webpack_require__(148);

	var _sessionManager = __webpack_require__(105);

	var _sessionManager2 = _interopRequireDefault(_sessionManager);

	var _stats = __webpack_require__(130);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'MAIN_EVENT_CHANGE';

	var _tasks = [];

	var _day = 1;

	var _gamePhase = GAME_STAGES.GAME_STAGE_INIT;

	var initialize = function initialize(_ref) {
	  var tasks = _ref.tasks,
	      day = _ref.day,
	      gamePhase = _ref.gamePhase;

	  _tasks = tasks;
	  _day = day;
	  _gamePhase = gamePhase;
	};

	initialize(_sessionManager2.default.getScheduleStorageData());

	var ScheduleStore = function (_EventEmitter) {
	  (0, _inherits3.default)(ScheduleStore, _EventEmitter);

	  function ScheduleStore() {
	    (0, _classCallCheck3.default)(this, ScheduleStore);
	    return (0, _possibleConstructorReturn3.default)(this, (ScheduleStore.__proto__ || (0, _getPrototypeOf2.default)(ScheduleStore)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ScheduleStore, [{
	    key: 'addChangeListener',
	    value: function addChangeListener(cb) {
	      this.addListener(EC, cb);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(cb) {
	      this.removeListener(EC, cb);
	    }
	  }, {
	    key: 'emitChange',
	    value: function emitChange() {
	      this.emit(EC);
	    }
	  }, {
	    key: 'getTasks',
	    value: function getTasks() {
	      return _tasks;
	    }
	  }, {
	    key: 'getDay',
	    value: function getDay() {
	      return _day;
	    }
	  }, {
	    key: 'getGameFormattedDay',
	    value: function getGameFormattedDay() {
	      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _day;

	      // let input =
	      var year = Math.floor(input / 360);
	      var month = Math.floor((input - year * 360) / 30);
	      var day = input - year * 360 - month * 30;

	      return day + 1 + '.' + (month + 1) + '.' + (year + 2016);
	    }
	  }, {
	    key: 'getOffsetFormattedDay',
	    value: function getOffsetFormattedDay(offset) {
	      return this.getGameFormattedDay(_day + offset);
	    }
	  }, {
	    key: 'getNextYearFormatted',
	    value: function getNextYearFormatted() {
	      return this.getOffsetFormattedDay(360);
	    }
	  }, {
	    key: 'getNextYear',
	    value: function getNextYear() {
	      return _day + 360;
	    }
	  }, {
	    key: 'getGamePhase',
	    value: function getGamePhase() {
	      return _gamePhase;
	    }
	  }], [{
	    key: 'getStoreData',
	    value: function getStoreData() {
	      return {
	        tasks: _tasks,
	        day: _day,
	        gamePhase: _gamePhase
	      };
	    }
	  }]);
	  return ScheduleStore;
	}(_events.EventEmitter);

	var addTask = function addTask(task) {
	  var queue = task.queue,
	      days = task.days,
	      description = task.description,
	      cb = task.cb,
	      performance = task.performance;


	  var start = _day;
	  var finish = _day + days;
	  var inProgress = true;

	  if (queue) {
	    _tasks.filter(function (t) {
	      return t.isSynchronous;
	    }).forEach(function (t, i) {
	      if (t.inProgress) {
	        inProgress = false;
	      }
	    });
	  }

	  var object = {
	    added: _day,
	    days: days, cb: cb, description: description,
	    isSynchronous: queue,
	    start: start, finish: finish,
	    progress: 0, inProgress: inProgress,
	    timecost: days * _workSpeed.WORK_SPEED_NORMAL,
	    speed: performance
	  };

	  _tasks.push(object);
	};

	var store = new ScheduleStore();

	var payload = _payloads2.default.scheduleStorePayload;


	_dispatcher2.default.register(function (p) {
	  if (!p.type) {
	    _logger2.default.error('empty type prop in payload ' + payload.name, p);
	    return;
	  }

	  var change = true;
	  switch (p.type) {
	    case c.SCHEDULE_ACTIONS_DAY_TICK:
	      _day++;
	      break;

	    case c.SCHEDULE_ACTIONS_TASKS_ADD:
	      var task = p.task;
	      addTask(task);
	      break;

	    case c.SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS:
	      // it's considered, that this increase will not complete task and there is at least one day left
	      var taskId = p.taskId;
	      var speed = _tasks[taskId].speed;

	      _tasks[taskId].progress += speed;
	      break;

	    case c.SCHEDULE_ACTIONS_TASKS_REMOVE:
	      // let tasks = [10, 1, 3, 2]; // p.tasks.sort((a, b) => a - b);
	      var tasks = p.tasks.sort(function (a, b) {
	        return b - a;
	      });

	      tasks.forEach(function (taskId) {
	        // const callback = _tasks[taskId].cb;

	        // if (callback) {
	        //   callback();
	        // }

	        _tasks.splice(taskId, 1);
	      });

	      var synchronous = _tasks.map(function (t, taskId) {
	        return (0, _assign2.default)(t, { taskId: taskId });
	      }).filter(function (t) {
	        return t.isSynchronous;
	      });

	      if (synchronous.length) {
	        if (!synchronous.filter(function (t) {
	          return t.inProgress;
	        }).length) {
	          // we HAVE synchronous tasks, but we didn't set any of them in progress

	          var newSynchronousTaskId = synchronous[0].taskId;
	          _tasks[newSynchronousTaskId].inProgress = true;
	        }
	      }
	      break;

	    case c.SCHEDULE_ACTIONS_GAME_START:
	      _gamePhase = GAME_STAGES.GAME_STAGE_GAME_STARTED;
	      break;

	    case c.SCHEDULE_ACTIONS_SET_GAME_PHASE:
	      _gamePhase = p.phase;
	      break;

	    default:
	      break;
	  }

	  if (change) {
	    _stats2.default.saveAction(p.type, p);
	    _sessionManager2.default.saveScheduleStorageData(ScheduleStore.getStoreData());

	    store.emitChange();
	  }
	});

	exports.default = store;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(146);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(15);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(147)});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(48)
	  , gOPS     = __webpack_require__(72)
	  , pIE      = __webpack_require__(73)
	  , toObject = __webpack_require__(6)
	  , IObject  = __webpack_require__(51)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(25)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 148 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// export const HOURS_A_DAY = 8;
	var WORK_SPEED_NORMAL = exports.WORK_SPEED_NORMAL = 8;
	var WORK_SPEED_HAS_MAIN_JOB = exports.WORK_SPEED_HAS_MAIN_JOB = 3;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(135);

	var ACTIONS = _interopRequireWildcard(_scheduleActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _scheduleStore = __webpack_require__(143);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  increaseDay: function increaseDay() {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_DAY_TICK
	    });
	  },
	  nextMonth: function nextMonth() {
	    // Dispatcher.dispatch({
	    //   type: ACTIONS.SCHEDULE_ACTIONS_MONTH_TICK
	    // })
	  },
	  startGame: function startGame() {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_GAME_START
	    });
	  },
	  setGamePhase: function setGamePhase(phase) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_SET_GAME_PHASE,
	      phase: phase
	    });
	  },

	  increaseProgress: function increaseProgress(taskId, speed) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS,
	      speed: speed,
	      taskId: taskId
	    });
	  },

	  addTask: function addTask(days, queue, performance, description, cb) {
	    // days: amount of days, that you need to complete the task. While working fulltime
	    // if you have a job/freelance, you need more days to complete it.
	    // it's considered, that you can work 8 h/day

	    // queue - if true (it means, that you run task synchronously) start date of task won't be today
	    // it will start, when the last task will be done and this task will be pending
	    // if false (it means, that you run task in parallel)
	    // you paid someone to do it and it doesn't block your work)
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_TASKS_ADD,
	      task: {
	        days: days,
	        queue: queue,
	        cb: cb,
	        description: description,
	        performance: performance
	      }
	    });
	  },

	  removeTasks: function removeTasks(taskIdList) {
	    if (taskIdList.length) {
	      _dispatcher2.default.dispatch({
	        type: ACTIONS.SCHEDULE_ACTIONS_TASKS_REMOVE,
	        tasks: taskIdList
	      });
	    }
	  }
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getOwnPropertyDescriptor = __webpack_require__(151);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _dec, _desc, _value, _obj;

	var _flux = __webpack_require__(154);

	var _flux2 = _interopRequireDefault(_flux);

	var _constants = __webpack_require__(157);

	var _constants2 = _interopRequireDefault(_constants);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _gameStages = __webpack_require__(127);

	var gameStages = _interopRequireWildcard(_gameStages);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var getStage = function getStage() {
	  return _flux2.default.scheduleStore.getGamePhase();
	};

	var setStage = function setStage(stage) {
	  _flux2.default.scheduleActions.setGamePhase(stage);
	};

	var isTestMode = true;

	_logger2.default.shit('need to send stats on game phase change');

	var isTest = function isTest(target, property, descriptor) {
	  // logger.debug('isTest ?11', property);
	  if (isTestMode) {
	    // descriptor.get = function () {
	    //   return true;
	    // };

	    descriptor.value = function () {
	      return true;
	    };
	    descriptor.enumerable = false;
	    descriptor.configurable = true;
	    descriptor.writable = true;

	    // descriptor.value = () => true;
	  }
	};

	var proceed = function proceed(stage) {
	  return function (target, property, descriptor) {
	    if (getStage() >= stage || isTestMode) {
	      // descriptor.value = () => true;
	      descriptor.value = function () {
	        return true;
	      };
	      descriptor.enumerable = false;
	      descriptor.configurable = true;
	      descriptor.writable = true;
	    }
	  };
	};

	exports.default = (_dec = proceed(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS), (_obj = {
	  // on mission completed
	  onFirstWorkerMissionCompleted: function onFirstWorkerMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_HIRED_FIRST_WORKER);
	  },
	  onInstallPrimitiveAnalyticsMissionCompleted: function onInstallPrimitiveAnalyticsMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_IMPROVED_ANALYTICS);
	  },
	  onFirstHypothesisMissionCompleted: function onFirstHypothesisMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS);
	  },
	  onFirstAdCampaignMissionCompleted: function onFirstAdCampaignMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS);
	  },
	  onFirstFeatureUpgradeMissionCompleted: function onFirstFeatureUpgradeMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE);
	  },
	  onPaymentRatingMissionCompleted: function onPaymentRatingMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS);
	  },
	  onInstallPaymentModuleMissionCompleted: function onInstallPaymentModuleMissionCompleted() {
	    setStage(gameStages.GAME_STAGE_PAYMENTS_INSTALLED);
	  },


	  // mission checker
	  isFirstWorkerMission: function isFirstWorkerMission() {
	    return getStage() === gameStages.GAME_STAGE_GAME_STARTED;
	  },
	  isInstallPrimitiveAnalyticsMission: function isInstallPrimitiveAnalyticsMission() {
	    return getStage() === gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
	  },
	  isFirstHypothesisMission: function isFirstHypothesisMission() {
	    return getStage() === gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
	    // return getStage() === gameStages.GAME_STAGE_LEARNED_SPEEDER;
	  },
	  isFirstAdCampaignMission: function isFirstAdCampaignMission() {
	    return getStage() === gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
	  },
	  isFirstFeatureMission: function isFirstFeatureMission() {
	    return getStage() === gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	  },
	  isPaymentRatingMission: function isPaymentRatingMission() {
	    return getStage() === gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE;
	  },
	  isInstallPaymentModuleMission: function isInstallPaymentModuleMission() {
	    return getStage() === gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  },
	  canShowHypothesisTab: function canShowHypothesisTab() {
	    return getStage() >= gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
	  },
	  canShowUpperTabInMenu: function canShowUpperTabInMenu() {
	    return getStage() >= gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
	  },
	  canShowMetricsTab: function canShowMetricsTab() {
	    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	  },
	  canShowMainFeatureTab: function canShowMainFeatureTab() {
	    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	  },
	  canShowPaymentsTab: function canShowPaymentsTab() {
	    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  },
	  canShowCompetitorsTab: function canShowCompetitorsTab() {
	    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  },
	  canShowClientsTab: function canShowClientsTab() {
	    return false;
	    // return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  },
	  canShowBonusesTab: function canShowBonusesTab() {
	    return false;
	  },
	  canShowTeamTabs: function canShowTeamTabs() {
	    var s = getStage();

	    if (s === gameStages.GAME_STAGE_GAME_STARTED) return true;

	    if (s > gameStages.GAME_STAGE_GAME_STARTED && s < gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE) return false;

	    return true;
	  },
	  canShowAdTab: function canShowAdTab() {
	    return getStage() >= gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
	  },
	  canShowSegments: function canShowSegments() {
	    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  },
	  canShowChurnFeatures: function canShowChurnFeatures() {
	    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	  }
	}, (_applyDecoratedDescriptor(_obj, 'canShowHypothesisTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowHypothesisTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowUpperTabInMenu', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowUpperTabInMenu'), _obj), _applyDecoratedDescriptor(_obj, 'canShowMetricsTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowMetricsTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowMainFeatureTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowMainFeatureTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowPaymentsTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowPaymentsTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowCompetitorsTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowCompetitorsTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowClientsTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowClientsTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowBonusesTab', [isTest, _dec], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowBonusesTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowTeamTabs', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowTeamTabs'), _obj), _applyDecoratedDescriptor(_obj, 'canShowAdTab', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowAdTab'), _obj), _applyDecoratedDescriptor(_obj, 'canShowSegments', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowSegments'), _obj), _applyDecoratedDescriptor(_obj, 'canShowChurnFeatures', [isTest], (0, _getOwnPropertyDescriptor2.default)(_obj, 'canShowChurnFeatures'), _obj)), _obj));

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(153);
	var $Object = __webpack_require__(16).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(50)
	  , $getOwnPropertyDescriptor = __webpack_require__(77).f;

	__webpack_require__(14)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _scheduleStore = __webpack_require__(143);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _messageStore = __webpack_require__(140);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _scheduleActions = __webpack_require__(149);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  productStore: _productStore2.default,
	  scheduleStore: _scheduleStore2.default,
	  messageStore: _messageStore2.default,
	  productActions: _productActions2.default,
	  scheduleActions: _scheduleActions2.default,
	  messageActions: _messageActions2.default
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _productActions = __webpack_require__(134);

	var ACTIONS = _interopRequireWildcard(_productActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  improveFeature: function improveFeature(id, featureGroup, featureName, value, XP) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
	      id: id,
	      featureGroup: featureGroup,
	      featureName: featureName,
	      value: value,
	      XP: XP
	    });
	  },
	  refreshRents: function refreshRents(ids) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_TECHNOLOGY_RENT_REFRESH,
	      list: ids.reverse()
	    });
	  },
	  setAsMainMarket: function setAsMainMarket(id, marketId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_SET_AS_MAIN,
	      id: id, marketId: marketId
	    });
	  },
	  joinMarket: function joinMarket(id, marketId, explorationCost) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_JOIN,
	      id: id,
	      marketId: marketId,
	      xp: explorationCost
	    });
	  },
	  offerPartnership: function offerPartnership(c1, c2, marketId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_OFFER,
	      c1: c1, c2: c2, marketId: marketId
	    });
	  },
	  revokePartnership: function revokePartnership(c1, c2, marketId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_PARTNERSHIP_REVOKE,
	      c1: c1, c2: c2, marketId: marketId
	    });
	  },
	  exploreMarket: function exploreMarket(id, marketId, explorationCost) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_EXPLORE_MARKET,
	      id: id, marketId: marketId, explorationCost: explorationCost
	    });
	  },
	  decreaseInfluenceOnMarket: function decreaseInfluenceOnMarket(id, marketId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_MARKETS_INFLUENCE_DECREASE,
	      id: id, marketId: marketId
	    });
	  },
	  buyCompany: function buyCompany(buyerId, sellerId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_COMPANY_BUY,
	      buyerId: buyerId, sellerId: sellerId
	    });
	  },
	  rentTech: function rentTech(sender, acceptor, featureId, price, until) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_TECHNOLOGY_RENT,
	      sender: sender, acceptor: acceptor, featureId: featureId, price: price, until: until
	    });
	  },
	  addBug: function addBug(id, cost, platform, penalty) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_ADD_BUG,
	      id: id,
	      cost: cost,
	      platform: platform,
	      penalty: penalty
	    });
	  },
	  fixBug: function fixBug(id, bugId) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_FIX_BUG,
	      id: id,
	      bugId: bugId
	    });
	  },
	  testHypothesis: function testHypothesis(id) {
	    var xp = _productStore2.default.getImprovementChances(id);

	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_TEST_HYPOTHESIS,
	      id: id,
	      value: xp
	    });
	  },
	  improveFeatureByPoints: function improveFeatureByPoints(id, featureGroup, featureName) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
	      id: id,
	      featureGroup: featureGroup,
	      featureName: featureName
	    });
	  },
	  addBonus: function addBonus(id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_BONUSES_ADD,
	      id: id
	    });
	  },
	  pickBonus: function pickBonus(id, bonusName) {
	    _logger2.default.shit('this function is same to improveFeatureByPoints()');

	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
	      id: id,
	      featureGroup: 'bonuses',
	      featureName: bonusName
	    });
	  },
	  addClients: function addClients(id, marketId, clients, price) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_ADD,
	      id: id,
	      marketId: marketId,
	      clients: clients,
	      price: price
	    });
	  },
	  addHype: function addHype(id, marketId, hype, cost) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_HYPE_ADD,
	      id: id,
	      marketId: marketId,
	      hype: hype,
	      cost: cost
	    });
	  },
	  viralClients: function viralClients(id, clients) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD,
	      id: id,
	      clients: clients
	    });
	  },
	  removeClients: function removeClients(id, clients) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_REMOVE,
	      id: id,
	      clients: clients
	    });
	  },
	  loseMonthlyHype: function loseMonthlyHype(id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_HYPE_MONTHLY_DECREASE,
	      id: id
	    });
	  },
	  createCompany: function createCompany(p) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_CREATE_COMPANY,
	      p: p
	    });
	  },


	  increaseMoney: function increaseMoney(amount, id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
	      amount: amount, id: id
	    });
	  },
	  decreaseMoney: function decreaseMoney(amount, id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
	      amount: -amount, id: id
	    });
	  },
	  hireWorker: function hireWorker(player, i) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_HIRE_WORKER,
	      player: player,
	      i: i
	    });
	  },
	  fireWorker: function fireWorker(i) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_FIRE_WORKER,
	      i: i
	    });
	  },
	  addEmployee: function addEmployee(player) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_EMPLOYEE_ADD,
	      player: player
	    });
	  },
	  updateEmployees: function updateEmployees() {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_UPDATE_EMPLOYEES
	    });
	  },
	  rejectEmployee: function rejectEmployee(i) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_EMPLOYEE_REMOVE,
	      i: i
	    });
	  },
	  produceResources: function produceResources(id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_PRODUCE_RESOURCES,
	      id: id
	    });
	  },
	  increasePoints: function increasePoints(points, id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_INCREASE_POINTS,
	      points: points,
	      id: id
	    });
	  },
	  spendPoints: function spendPoints(pp, mp, id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_DECREASE_POINTS,
	      pp: pp,
	      mp: mp,
	      id: id
	    });
	  },

	  buyProgrammingPoints: function buyProgrammingPoints(pp) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_BUY_PP,
	      pp: pp
	    });
	  },
	  buyMarketingPoints: function buyMarketingPoints(mp) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_BUY_MP,
	      mp: mp
	    });
	  },

	  setTaskForPerson: function setTaskForPerson(task, index) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_SET_TASK,
	      task: task,
	      index: index
	    });
	  },

	  loans: {
	    take: function take(amount) {
	      _dispatcher2.default.dispatch({
	        type: ACTIONS.PLAYER_ACTIONS_LOANS_TAKE,
	        amount: amount
	      });
	    },
	    repay: function repay(id) {
	      _dispatcher2.default.dispatch({
	        type: ACTIONS.PLAYER_ACTIONS_LOANS_REPAY,
	        id: id
	      });
	    }
	  }
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(144);

	var _assign2 = _interopRequireDefault(_assign);

	var _dispatcher = __webpack_require__(94);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _messageActions = __webpack_require__(141);

	var ACTIONS = _interopRequireWildcard(_messageActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _messageStore = __webpack_require__(140);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  addGameEvent: function addGameEvent(eventType, data, isModal) {
	    var obj = (0, _assign2.default)({}, data, { type: eventType });
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.GAME_EVENT_ADD,
	      message: {
	        type: eventType,
	        data: obj,
	        isModal: isModal
	      }
	    });
	  },

	  closeEvent: function closeEvent(id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.GAME_EVENT_CLOSE_TAB,
	      id: id
	    });
	  },

	  addNotification: function addNotification(eventType, data) {
	    // return;
	    var obj = (0, _assign2.default)({}, data, { type: eventType });
	    _logger2.default.debug('notification', eventType, data);

	    _dispatcher2.default.dispatch({
	      type: ACTIONS.NOTIFICATION_ADD,
	      message: {
	        type: eventType,
	        data: obj,
	        isModal: false
	      }
	    });
	  }
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _job = __webpack_require__(128);

	var jobConstants = _interopRequireWildcard(_job);

	var _professions = __webpack_require__(158);

	var professionsConstants = _interopRequireWildcard(_professions);

	var _workSpeed = __webpack_require__(148);

	var workSpeedConstants = _interopRequireWildcard(_workSpeed);

	var _gameStages = __webpack_require__(127);

	var gameStagesConstants = _interopRequireWildcard(_gameStages);

	var _expenses = __webpack_require__(159);

	var expensesConstants = _interopRequireWildcard(_expenses);

	var _ideas = __webpack_require__(102);

	var ideasConstants = _interopRequireWildcard(_ideas);

	var _productStages = __webpack_require__(129);

	var productStagesConstants = _interopRequireWildcard(_productStages);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  job: jobConstants,
	  professions: professionsConstants,
	  workSpeed: workSpeedConstants,
	  gameStages: gameStagesConstants,
	  expenses: expensesConstants,
	  ideas: ideasConstants,
	  productStages: productStagesConstants
	};

/***/ },
/* 158 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 159 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EXPENSES_FOOD = exports.EXPENSES_FOOD = 'EXPENSES_FOOD';
	var EXPENSES_LOAN = exports.EXPENSES_LOAN = 'EXPENSES_LOAN';

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _moneyDifference = __webpack_require__(161);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	var _shortenValue = __webpack_require__(187);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = function (_Component) {
	  (0, _inherits3.default)(Menu, _Component);

	  function Menu() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Menu);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.negativeOrPositiveClass = function (value) {
	      return value >= 0 ? 'moneyPositive' : 'moneyNegative';
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Menu, [{
	    key: 'renderSpeedIcons',
	    value: function renderSpeedIcons(setGameSpeed) {
	      var icons = [{ speed: 1, icon: '>' }, { speed: 10, icon: '>>>' }];

	      return icons.map(function (s) {
	        return (0, _preact.h)(
	          'div',
	          { className: 'navigation' },
	          (0, _preact.h)(_UI2.default.Button, {
	            text: s.icon,
	            onClick: setGameSpeed(s.speed)
	          })
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      if (!_stages2.default.canShowUpperTabInMenu()) return (0, _preact.h)('div', null);

	      var pause = props.pause,
	          pauseGame = props.pauseGame,
	          resources = props.resources,
	          production = props.production,
	          setGameSpeed = props.setGameSpeed,
	          id = props.id;
	      var money = resources.money,
	          mp = resources.mp,
	          pp = resources.pp,
	          xp = resources.xp;

	      // time and date

	      var action = void 0;

	      if (!pause) {
	        action = pauseGame;
	      } else {
	        action = setGameSpeed(10);
	      }

	      var year = Math.floor(props.day / 360);
	      var month = Math.floor((props.day - year * 360) / 30);
	      var day = props.day - year * 360 - month * 30;

	      month++;
	      day++;

	      var monthModified = month < 10 ? '0' + month : month;
	      var dayModified = day < 10 ? '0' + day : day;

	      var time = dayModified + '.' + monthModified + '.' + (year + 2016);

	      // money and XP

	      var saldo = _moneyDifference2.default.saldo();

	      var moneyDifferenceIndication = this.negativeOrPositiveClass(saldo);

	      var moneyDiffSign = saldo >= 0 ? '+' : '';

	      // <div className="navigation">
	      //   <span className="menu-money-indicator-icon">HYPE</span>
	      //   <span className="moneyPositive"> <UI.Changeable value={hype} /></span>
	      // </div>

	      // <div className="navigation">
	      //   <UI.Button
	      //     text={time}
	      //     secondary={pause}
	      //     alert={!pause}
	      //     onClick={action}
	      //   />
	      // </div>

	      var moneySaldoText = '' + moneyDiffSign + (0, _shortenValue2.default)(saldo) + '$ \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E';
	      var managementSaldoText = '+' + production.mp + ' \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E';
	      var programmingSaldoText = '+' + production.pp + ' \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E';
	      var xpSaldoText = '+' + 5 + ' \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E';
	      // <span className={moneyDifferenceIndication}>   ({moneyDiffSign}<UI.Changeable value={shortenValue(saldo)} />$/мес)</span>


	      return (0, _preact.h)(
	        'div',
	        { className: 'menu-point-container' },
	        (0, _preact.h)(
	          'div',
	          { className: 'navigation' },
	          _UI2.default.icons.money,
	          (0, _preact.h)(
	            'span',
	            { title: moneySaldoText, className: moneyDifferenceIndication },
	            ' ',
	            (0, _preact.h)(_UI2.default.Changeable, { value: (0, _shortenValue2.default)(money) })
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'navigation' },
	          _UI2.default.icons.MP,
	          (0, _preact.h)(
	            'span',
	            { title: managementSaldoText, className: 'moneyPositive' },
	            ' ',
	            (0, _preact.h)(_UI2.default.Changeable, { value: mp })
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'navigation' },
	          _UI2.default.icons.PP,
	          (0, _preact.h)(
	            'span',
	            { title: programmingSaldoText, className: 'moneyPositive' },
	            ' ',
	            (0, _preact.h)(_UI2.default.Changeable, { value: pp })
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'navigation' },
	          _UI2.default.icons.XP,
	          (0, _preact.h)(
	            'span',
	            { title: xpSaldoText, className: 'moneyPositive' },
	            ' ',
	            (0, _preact.h)(_UI2.default.Changeable, { value: xp })
	          )
	        )
	      );
	      // <div className="navigation">
	      //   <UI.Button
	      //     text={time}
	      //     disabled
	      //   />
	      // </div>
	    }
	  }]);
	  return Menu;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = Menu;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var calculate = function calculate(id) {
	  var ourCompanyId = id ? id : 0;
	  var products = _productStore2.default.getOurProducts();

	  // check income
	  var income = products.map(function (p, i) {
	    return _productStore2.default.getProductIncome(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  }, 0);

	  var productExpenses = products.map(function (p, i) {
	    return _productStore2.default.getProductExpenses(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  }, 0);

	  var teamExpenses = _productStore2.default.getTeamExpenses();

	  var expenses = productExpenses + teamExpenses;

	  var byProductIncome = products.map(function (p, i) {
	    return { name: p.name, income: _productStore2.default.getProductIncome(i) };
	  });

	  return {
	    productExpenses: productExpenses,
	    teamExpenses: teamExpenses,

	    expenses: expenses,
	    income: income,
	    byProductIncome: byProductIncome,

	    saldo: income - expenses
	  };
	};

	exports.default = {
	  structured: calculate,

	  saldo: function saldo(id) {
	    return Math.floor(calculate(id).saldo);
	  }
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(163);

	var _Button2 = _interopRequireDefault(_Button);

	var _Modal = __webpack_require__(165);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Notification = __webpack_require__(173);

	var _Notification2 = _interopRequireDefault(_Notification);

	var _Range = __webpack_require__(175);

	var _Range2 = _interopRequireDefault(_Range);

	var _Select = __webpack_require__(176);

	var _Select2 = _interopRequireDefault(_Select);

	var _arrows = __webpack_require__(177);

	var _arrows2 = _interopRequireDefault(_arrows);

	var _Info = __webpack_require__(178);

	var _Info2 = _interopRequireDefault(_Info);

	var _Bar = __webpack_require__(180);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _Changeable = __webpack_require__(181);

	var _Changeable2 = _interopRequireDefault(_Changeable);

	var _ColoredValue = __webpack_require__(182);

	var _ColoredValue2 = _interopRequireDefault(_ColoredValue);

	var _SmallIcon = __webpack_require__(184);

	var _SmallIcon2 = _interopRequireDefault(_SmallIcon);

	var _MeduimIcon = __webpack_require__(185);

	var _MeduimIcon2 = _interopRequireDefault(_MeduimIcon);

	var _BigIcon = __webpack_require__(186);

	var _BigIcon2 = _interopRequireDefault(_BigIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var icons = {
	  rating: 'R',
	  // XP: 'XP',
	  MP: (0, _preact.h)(
	    'span',
	    { className: 'menu-money-indicator-icon', title: '\u041E\u0447\u043A\u0438 \u041C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442\u0430' },
	    'MP'
	  ),
	  PP: (0, _preact.h)(
	    'span',
	    { className: 'menu-money-indicator-icon', title: '\u041E\u0447\u043A\u0438 \u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F' },
	    'PP'
	  ),
	  XP: (0, _preact.h)(
	    'span',
	    { className: 'menu-money-indicator-icon', title: '\u041E\u0447\u043A\u0438 \u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439' },
	    'XP'
	  ),
	  money: (0, _preact.h)(
	    'span',
	    { className: 'menu-money-indicator-icon', title: '\u0414\u0435\u043D\u044C\u0433\u0438' },
	    '$'
	  ),

	  // platforms
	  web: (0, _preact.h)(
	    'span',
	    { title: 'WEB' },
	    'WEB'
	  ),
	  and: (0, _preact.h)(
	    'span',
	    { title: 'Android' },
	    'Android'
	  ),
	  ios: (0, _preact.h)(
	    'span',
	    { title: 'Ios' },
	    'Ios'
	  ),
	  mac: (0, _preact.h)(
	    'span',
	    { title: 'Mac' },
	    'Mac'
	  ),
	  win: (0, _preact.h)(
	    'span',
	    { title: 'Windows' },
	    'Windows'
	  ),
	  lin: (0, _preact.h)(
	    'span',
	    { title: 'Linux' },
	    'Linux'
	  ),
	  back: (0, _preact.h)(
	    'span',
	    { title: '\u0421\u0435\u0440\u0432\u0435\u0440' },
	    '\u0421\u0435\u0440\u0432\u0435\u0440'
	  )
	};

	exports.default = {
	  Button: _Button2.default,
	  Modal: _Modal2.default,
	  Notification: _Notification2.default,
	  Select: _Select2.default,
	  Range: _Range2.default,
	  symbols: _arrows2.default,

	  icons: icons,
	  SmallIcon: _SmallIcon2.default,
	  MeduimIcon: _MeduimIcon2.default,
	  BigIcon: _BigIcon2.default,

	  Info: _Info2.default,
	  Bar: _Bar2.default,
	  Changeable: _Changeable2.default,
	  ColoredValue: _ColoredValue2.default
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends2 = __webpack_require__(164);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var Button = function (_Component) {
	  (0, _inherits3.default)(Button, _Component);

	  function Button() {
	    (0, _classCallCheck3.default)(this, Button);
	    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Button, [{
	    key: 'render',
	    value: function render() {
	      // props: PropsType, state: StateType
	      var props = this.props;

	      // send info to server, that user pressed the button with some id
	      var item = props.item;

	      if (!item) item = 'unknownButton';

	      var className = '';

	      if (props.primary) {
	        className = 'btn-success';
	      }

	      if (props.secondary) {
	        className = 'btn-primary';
	      }

	      if (props.link) {
	        className = 'btn-link';
	      }

	      if (props.cancel) {
	        className = 'btn-danger';
	      }

	      if (props.gray) {
	        className = 'btn-danger';
	      }

	      if (props.alert) {
	        className = 'btn-danger';
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'button',
	          (0, _extends3.default)({}, props, { className: 'btn ' + className }),
	          props.text
	        )
	      );
	    }
	  }]);
	  return Button;
	}(_preact.Component);

	exports.default = Button;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(144);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _messageStore = __webpack_require__(140);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _messageActions = __webpack_require__(141);

	var c = _interopRequireWildcard(_messageActions);

	var _eventRenderer = __webpack_require__(166);

	var _eventRenderer2 = _interopRequireDefault(_eventRenderer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Modal = function (_Component) {
	  (0, _inherits3.default)(Modal, _Component);

	  function Modal() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Modal);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.getMessages = function () {
	      _this.setState({
	        messages: _messageStore2.default.getMessages(),
	        drawable: _messageStore2.default.isDrawable()
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Modal, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.getMessages();

	      _messageStore2.default.addChangeListener(this.getMessages);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      if (!state.drawable) return (0, _preact.h)('div', null);

	      var message = state.messages[0];

	      var body = (0, _eventRenderer2.default)(message, 0, props.onclose);

	      if (!body) return (0, _preact.h)('div', null);

	      return (0, _preact.h)(
	        'div',
	        { className: 'messageTab' },
	        body
	      );
	    }
	  }]);
	  return Modal;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = Modal;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(125);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _preact = __webpack_require__(1);

	var _FREEMONEYEVENT = __webpack_require__(167);

	var _FREEMONEYEVENT2 = _interopRequireDefault(_FREEMONEYEVENT);

	var _FREEPOINTSEVENT = __webpack_require__(168);

	var _FREEPOINTSEVENT2 = _interopRequireDefault(_FREEPOINTSEVENT);

	var _HIREENTHUSIASTEVENT = __webpack_require__(169);

	var _HIREENTHUSIASTEVENT2 = _interopRequireDefault(_HIREENTHUSIASTEVENT);

	var _COMPETITORCREATE = __webpack_require__(172);

	var _COMPETITORCREATE2 = _interopRequireDefault(_COMPETITORCREATE);

	var _events = __webpack_require__(142);

	var t = _interopRequireWildcard(_events);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	exports.default = function (message, id, onClose) {
	  switch (message.data.type) {
	    case t.GAME_EVENT_FREE_MONEY:
	      return (0, _preact.h)(_FREEMONEYEVENT2.default, { message: message, id: id, onclose: onClose });
	      break;

	    case t.GAME_EVENT_FREE_POINTS:
	      return (0, _preact.h)(_FREEPOINTSEVENT2.default, { message: message, id: id, onclose: onClose });
	      break;

	    case t.GAME_EVENT_COMPETITOR_CREATE:
	      return (0, _preact.h)(_COMPETITORCREATE2.default, { message: message, id: id, onclose: onClose });
	      break;

	    case t.GAME_EVENT_HIRE_ENTHUSIAST:
	      return (0, _preact.h)(_HIREENTHUSIASTEVENT2.default, { message: message, id: id, onclose: onClose });
	      break;
	  }

	  // return '';

	  return (0, _preact.h)(
	    'div',
	    null,
	    'render modal body ',
	    (0, _stringify2.default)(message)
	  );
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(163);

	var _Button2 = _interopRequireDefault(_Button);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var FreeMoneyEvent = function (_Component) {
	  (0, _inherits3.default)(FreeMoneyEvent, _Component);

	  function FreeMoneyEvent() {
	    (0, _classCallCheck3.default)(this, FreeMoneyEvent);
	    return (0, _possibleConstructorReturn3.default)(this, (FreeMoneyEvent.__proto__ || (0, _getPrototypeOf2.default)(FreeMoneyEvent)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(FreeMoneyEvent, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      var id = props.id;
	      var data = props.message.data;

	      var money = data.money;

	      var onClick = function onClick() {
	        _logger2.default.shit('FREE-MONEY-EVENT.js Id=0');

	        _productActions2.default.increaseMoney(money, 0);
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'modal-head' },
	          '\u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u0435'
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'modal-description' },
	          '\u041D\u0435\u043A\u0442\u043E, \u043F\u043E\u0436\u0435\u043B\u0430\u0432\u0448\u0438\u0439 \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u043C, \u043F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u043D\u0430\u0448 \u043F\u0440\u043E\u0435\u043A\u0442 $',
	          money
	        ),
	        (0, _preact.h)(_Button2.default, { onClick: onClick, text: '\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0445\u0430\u043B\u044F\u0432\u043D\u044B\u0435 $' + money + '!', primary: true })
	      );
	    }
	  }]);
	  return FreeMoneyEvent;
	}(_preact.Component);

	exports.default = FreeMoneyEvent;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(163);

	var _Button2 = _interopRequireDefault(_Button);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FreePointsEvent = function (_Component) {
	  (0, _inherits3.default)(FreePointsEvent, _Component);

	  function FreePointsEvent() {
	    (0, _classCallCheck3.default)(this, FreePointsEvent);
	    return (0, _possibleConstructorReturn3.default)(this, (FreePointsEvent.__proto__ || (0, _getPrototypeOf2.default)(FreePointsEvent)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(FreePointsEvent, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      var id = props.id;
	      var data = props.message.data;

	      var points = data.points;

	      var pickProgrammingPoints = function pickProgrammingPoints() {
	        _productActions2.default.increasePoints({ marketing: 0, programming: points * 2 });
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      var pickMarketingPoints = function pickMarketingPoints() {
	        _productActions2.default.increasePoints({ marketing: points * 2, programming: 0 });
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      var pickBoth = function pickBoth() {
	        _productActions2.default.increasePoints({ marketing: points, programming: points });
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'modal-head' },
	          '\u0412 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043E\u0442 \u0440\u0430\u0431\u043E\u0442\u044B \u0432\u0440\u0435\u043C\u044F \u0432\u044B \u043C\u043D\u043E\u0433\u043E \u0447\u0438\u0442\u0430\u0435\u0442\u0435 \u0438 \u044D\u0442\u043E \u043F\u0440\u0438\u043D\u043E\u0441\u0438\u0442 \u043F\u043B\u043E\u0434\u044B! \u041D\u0430 \u0447\u0442\u043E \u0441\u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0441\u0442\u0430\u0432\u043A\u0443?'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: pickMarketingPoints, text: '\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u043D\u0430\u0448\u0435 \u0432\u0441\u0451! (+' + points * 2 + 'MP)', primary: true }),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: pickProgrammingPoints, text: '\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0440\u0443\u043B\u044F\u0442! (+' + points * 2 + 'PP)', primary: true }),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: pickBoth, text: '\u0411\u0430\u043B\u0430\u043D\u0441 \u0432\u043E \u0432\u0441\u0451\u043C! (+' + points + 'PP \u0438 +' + points + 'MP)', primary: true })
	      );
	    }
	  }]);
	  return FreePointsEvent;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = FreePointsEvent;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(163);

	var _Button2 = _interopRequireDefault(_Button);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _skills = __webpack_require__(170);

	var _skills2 = _interopRequireDefault(_skills);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var HireEnthusiastEvent = function (_Component) {
	  (0, _inherits3.default)(HireEnthusiastEvent, _Component);

	  function HireEnthusiastEvent() {
	    (0, _classCallCheck3.default)(this, HireEnthusiastEvent);
	    return (0, _possibleConstructorReturn3.default)(this, (HireEnthusiastEvent.__proto__ || (0, _getPrototypeOf2.default)(HireEnthusiastEvent)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(HireEnthusiastEvent, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      var id = props.id;
	      var data = props.message.data;

	      var player = data.player;

	      var hireEnthusiast = function hireEnthusiast() {
	        _productActions2.default.hireWorker(player);
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      var cancel = function cancel() {
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      var specialization = _skills2.default.getTranslatedSpecialization(player);
	      var hireText = '\u041D\u0430\u043D\u044F\u0442\u044C ' + player.name + ', ' + specialization + ', (' + _skills2.default.plain(player) + ')';

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'text' },
	          '\u041E\u043E! \u041E\u0434\u0438\u043D \u0438\u0437 \u043D\u0430\u0448\u0438\u0445 \u0444\u0430\u043D\u0430\u0442\u043E\u0432 \u043D\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0445\u043E\u0447\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0411\u0415\u0421\u041F\u041B\u0410\u0422\u041D\u041E!'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: hireEnthusiast, text: hireText, primary: true }),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: cancel, text: '\u0423\u0432\u044B, \u043D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0443\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u043E\u0432\u0430\u043D\u0430', primary: true })
	      );
	    }
	  }]);
	  return HireEnthusiastEvent;
	}(_preact.Component);

	exports.default = HireEnthusiastEvent;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _specialization = __webpack_require__(171);

	var _specialization2 = _interopRequireDefault(_specialization);

	var _job = __webpack_require__(128);

	var JOB = _interopRequireWildcard(_job);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getSkill = function getSkill(skill) {
	  return Math.floor(skill / 100);
	};
	exports.default = {
	  plain: function plain(p) {
	    return getSkill(p.skills.programming) + '/' + getSkill(p.skills.marketing) + '/' + getSkill(p.skills.analyst);
	  },

	  getSkill: getSkill,
	  getBestSkill: function getBestSkill(p) {
	    var _p$skills = p.skills,
	        programming = _p$skills.programming,
	        marketing = _p$skills.marketing,
	        analyst = _p$skills.analyst;

	    switch ((0, _specialization2.default)(p)) {
	      case JOB.PROFESSION_PROGRAMMER:
	        return getSkill(programming);break;
	      case JOB.PROFESSION_MARKETER:
	        return getSkill(marketing);break;
	      case JOB.PROFESSION_ANALYST:
	        return getSkill(analyst);break;
	        return 0;
	    }
	  },
	  getTranslatedSpecialization: function getTranslatedSpecialization(p) {
	    switch ((0, _specialization2.default)(p)) {
	      case JOB.PROFESSION_PROGRAMMER:
	        return 'программист';break;
	      case JOB.PROFESSION_MARKETER:
	        return 'маркетолог';break;
	      case JOB.PROFESSION_ANALYST:
	        return 'аналитик';break;
	        return 'бездельник';
	    }
	  },
	  isProgrammer: function isProgrammer(p) {
	    return (0, _specialization2.default)(p) === JOB.PROFESSION_PROGRAMMER;
	  },
	  isMarketer: function isMarketer(p) {
	    return (0, _specialization2.default)(p) === JOB.PROFESSION_MARKETER;
	  },
	  isAnalyst: function isAnalyst(p) {
	    return (0, _specialization2.default)(p) === JOB.PROFESSION_ANALYST;
	  },
	  getMaxEfficiencyPhrase: function getMaxEfficiencyPhrase(p) {
	    switch ((0, _specialization2.default)(p)) {
	      case JOB.PROFESSION_PROGRAMMER:
	        return this.getProgrammingPointsProducedBy(p) + ' PP';
	        break;

	      case JOB.PROFESSION_MARKETER:
	        return this.getMarketingPointsProducedBy(p) + ' MP';
	        break;

	      case JOB.PROFESSION_ANALYST:
	        return 'аналитик';
	        break;

	      default:
	        return 'бездельник';
	        break;
	    }
	  },
	  getMarketingPointsProducedBy: function getMarketingPointsProducedBy(p) {
	    var marketingEfficiency = 5;
	    var modifier = Math.floor(Math.pow(getSkill(p.skills.marketing), 1.43));

	    return modifier * marketingEfficiency;
	  },
	  getProgrammingPointsProducedBy: function getProgrammingPointsProducedBy(p) {
	    var programmingEfficiency = 5;
	    var modifier = Math.floor(Math.pow(getSkill(p.skills.programming), 1.43));

	    return modifier * programmingEfficiency;
	  },

	  overall: function overall(p) {
	    return getSkill(p.skills.programming) + getSkill(p.skills.marketing) + getSkill(p.skills.analyst);
	  }
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _job = __webpack_require__(128);

	var JOB = _interopRequireWildcard(_job);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = function (p) {
	  var skills = [{ s: 'programming', value: p.skills.programming }, { s: 'analytics', value: p.skills.analyst }, { s: 'marketing', value: p.skills.marketing }];

	  var specialisation = skills.sort(function (a, b) {
	    return a.value < b.value;
	  })[0].s;
	  if (specialisation === 'programming') return JOB.PROFESSION_PROGRAMMER;
	  if (specialisation === 'analytics') return JOB.PROFESSION_ANALYST;
	  if (specialisation === 'marketing') return JOB.PROFESSION_MARKETER;

	  return '';
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(163);

	var _Button2 = _interopRequireDefault(_Button);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CompetitorCreateEvent = function (_Component) {
	  (0, _inherits3.default)(CompetitorCreateEvent, _Component);

	  function CompetitorCreateEvent() {
	    (0, _classCallCheck3.default)(this, CompetitorCreateEvent);
	    return (0, _possibleConstructorReturn3.default)(this, (CompetitorCreateEvent.__proto__ || (0, _getPrototypeOf2.default)(CompetitorCreateEvent)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(CompetitorCreateEvent, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      var id = props.id;
	      var data = props.message.data;

	      var p = data.p;

	      var close = function close() {
	        // productActions.increasePoints({ marketing: 0, programming: points * 2 });
	        _messageActions2.default.closeEvent(id);
	        props.onclose();
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'modal-head' },
	          '\u041F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442 ',
	          p.name
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { className: 'button1', onClick: close, text: '\u042F\u0441\u043D\u043E', primary: true })
	      );
	    }
	  }]);
	  return CompetitorCreateEvent;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = CompetitorCreateEvent;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _stringify = __webpack_require__(125);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _messageStore = __webpack_require__(140);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _notifications = __webpack_require__(174);

	var NOTIFICATIONS = _interopRequireWildcard(_notifications);

	var _messageActions = __webpack_require__(141);

	var c = _interopRequireWildcard(_messageActions);

	var _eventRenderer = __webpack_require__(166);

	var _eventRenderer2 = _interopRequireDefault(_eventRenderer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var Modal = function (_Component) {
	  (0, _inherits3.default)(Modal, _Component);

	  function Modal() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Modal);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.getMessages = function () {
	      _this.setState({
	        messages: _messageStore2.default.getNotifications()
	      });
	    }, _this.renderModalBody = _eventRenderer2.default, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Modal, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.getMessages();

	      _messageStore2.default.addChangeListener(this.getMessages);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var message = state.messages[0];
	      if (!message) return '';

	      // let body = this.renderModalBody(message, 0, props.onclose);
	      var body = (0, _stringify2.default)(message);

	      var data = message.data;


	      var companyName = '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "' + data.companyName + '"';

	      var bold = '';

	      if (data.id === 0) {
	        bold = 'bold';
	      }

	      switch (message.type) {
	        case NOTIFICATIONS.NOTIFICATION_FEATURE_UPGRADED:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            data.companyName,
	            '" \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u0442 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044E "',
	            data.featureName,
	            '"'
	          );
	          break;
	        case NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            data.companyName,
	            '" \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043B\u0438\u0434\u0435\u0440\u043E\u043C \u0432 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 "',
	            data.featureName,
	            '"!'
	          );
	          break;
	        case NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            data.companyName,
	            '" \u0443\u0441\u0438\u043B\u0438\u0432\u0430\u0435\u0442 \u0432\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0440\u044B\u043D\u043A\u0435 "',
	            data.marketName,
	            '"! \u041D\u0430\u0448\u0438 \u0434\u043E\u0445\u043E\u0434\u044B \u0441\u043D\u0438\u0437\u0438\u043B\u0438\u0441\u044C'
	          );
	          break;
	        case NOTIFICATIONS.NOTIFICATION_RENT_EXPIRED:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0441\u0440\u043E\u043A\u0430 \u0430\u0440\u0435\u043D\u0434\u044B: \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            (0, _stringify2.default)(data),
	            '"'
	          );
	          break;
	        case NOTIFICATIONS.NOTIFICATION_PAYMENTS_UPGRADED:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            data.companyName,
	            '" \u043F\u043E\u0432\u044B\u0448\u0430\u0435\u0442 \u0441\u0432\u043E\u0438 \u0434\u043E\u0445\u043E\u0434\u044B \u0437\u0430 \u0441\u0447\u0451\u0442 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0431\u043B\u043E\u043A\u0430 \u043C\u043E\u043D\u0435\u0442\u0438\u0437\u0430\u0446\u0438\u0438'
	          );
	          break;
	        case NOTIFICATIONS.NOTIFICATION_COMPETITORS_ADD:
	          body = (0, _preact.h)(
	            'span',
	            null,
	            '\u0423 \u043D\u0430\u0441 \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442: \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F "',
	            data.name,
	            '"!'
	          );
	          break;
	        default:
	          body = (0, _stringify2.default)(message);
	          break;
	      }

	      // сообщений: {state.messages.length}

	      return (0, _preact.h)(
	        'div',
	        { className: bold },
	        (0, _preact.h)(
	          'span',
	          { className: '' },
	          '\u041D\u043E\u0432\u043E\u0441\u0442\u0438 : '
	        ),
	        body
	      );
	    }
	  }]);
	  return Modal;
	}(_preact.Component);

	exports.default = Modal;

/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NOTIFICATION_FEATURE_UPGRADED = exports.NOTIFICATION_FEATURE_UPGRADED = 'NOTIFICATION_FEATURE_UPGRADED';
	var NOTIFICATION_FEATURE_TECH_LEADER = exports.NOTIFICATION_FEATURE_TECH_LEADER = 'NOTIFICATION_FEATURE_TECH_LEADER';
	var NOTIFICATION_MARKETS_INFLUENCE_INCREASED = exports.NOTIFICATION_MARKETS_INFLUENCE_INCREASED = 'NOTIFICATION_MARKETS_INFLUENCE_INCREASED';
	var NOTIFICATION_MARKETS_INFLUENCE_DECREASED = exports.NOTIFICATION_MARKETS_INFLUENCE_DECREASED = 'NOTIFICATION_MARKETS_INFLUENCE_DECREASED';
	var NOTIFICATION_PAYMENTS_UPGRADED = exports.NOTIFICATION_PAYMENTS_UPGRADED = 'NOTIFICATION_PAYMENTS_UPGRADED';

	var NOTIFICATION_RENT_EXPIRED = exports.NOTIFICATION_RENT_EXPIRED = 'NOTIFICATION_RENT_EXPIRED';
	var NOTIFICATION_COMPETITORS_ADD = exports.NOTIFICATION_COMPETITORS_ADD = 'NOTIFICATION_COMPETITORS_ADD';

	// export const NOTIFICATION_MARKETS_INFLUENCE_DECREASED = 'NOTIFICATION_MARKETS_INFLUENCE_DECREASED';

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';
	var Range = function (_Component) {
	  (0, _inherits3.default)(Range, _Component);

	  function Range() {
	    (0, _classCallCheck3.default)(this, Range);
	    return (0, _possibleConstructorReturn3.default)(this, (Range.__proto__ || (0, _getPrototypeOf2.default)(Range)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Range, [{
	    key: "render",
	    value: function render() {
	      var props = this.props;

	      return (0, _preact.h)("input", {
	        type: "range",
	        min: props.min,
	        max: props.max,
	        onInput: function onInput(event) {
	          props.onDrag(parseInt(event.target.value));
	        }
	      });
	    }
	  }]);
	  return Range;
	}(_preact.Component);

	exports.default = Range;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var Select = function (_Component) {
	  (0, _inherits3.default)(Select, _Component);

	  function Select() {
	    (0, _classCallCheck3.default)(this, Select);
	    return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Select, [{
	    key: 'render',
	    value: function render() {
	      // props: PropsType, state: StateType
	      var props = this.props;

	      // send info to server, that user pressed the button with some id
	      var options = props.options;


	      var optionList = options.map(function (o, i) {
	        return (0, _preact.h)(
	          'option',
	          { value: o.value },
	          o.text
	        );
	      });

	      var onchange = props.onChange ? function (e) {
	        return props.onChange(e.target.value);
	      } : function () {};
	      return (0, _preact.h)(
	        'select',
	        { value: props.value, onChange: onchange },
	        optionList
	      );
	    }
	  }]);
	  return Select;
	}(_preact.Component);

	exports.default = Select;

/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  up: '\u2191',
	  upRight: '\u2197',
	  downRight: '\u2198',
	  down: '\u2193',
	  ok: '\u2713',
	  dot: '\xB7',

	  triangle: {
	    up: '\u25B2',
	    down: '\u25BC'
	  }
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _objectDestructuringEmpty2 = __webpack_require__(179);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Info = function (_Component) {
	  (0, _inherits3.default)(Info, _Component);

	  function Info() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Info);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Info.__proto__ || (0, _getPrototypeOf2.default)(Info)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Info, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'render',
	    value: function render(_ref2, _ref3) {
	      var content = _ref2.content;
	      (0, _objectDestructuringEmpty3.default)(_ref3);

	      return (0, _preact.h)(
	        'span',
	        { className: 'info' },
	        '?'
	      );
	    }
	  }]);
	  return Info;
	}(_preact.Component);

	exports.default = Info;

/***/ },
/* 179 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Bar = function (_Component) {
	  (0, _inherits3.default)(Bar, _Component);

	  function Bar() {
	    (0, _classCallCheck3.default)(this, Bar);
	    return (0, _possibleConstructorReturn3.default)(this, (Bar.__proto__ || (0, _getPrototypeOf2.default)(Bar)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Bar, [{
	    key: 'renderBar',
	    value: function renderBar(min, max, value, style, renderValues, real, height) {
	      var width = value * 100 / (min + max);
	      var current = real ? value : width;

	      return (0, _preact.h)(
	        'div',
	        {
	          className: 'progress-bar ' + style,
	          role: 'progressbar',
	          style: { width: width + '%' },
	          'aria-valuenow': current,
	          'aria-valuemin': min,
	          'aria-valuemax': max
	        },
	        renderValues ? current : ''
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(props) {
	      var _this2 = this;

	      var data = void 0;

	      if (Array.isArray(props.data)) {
	        data = props.data.map(function (d) {
	          return _this2.renderBar(props.min, props.max, d.value, d.style, props.renderValues, props.real, props.height);
	        });
	      } else {
	        data = this.renderBar(props.min, props.max, props.data, '', props.renderValues, props.real);
	      }

	      return (0, _preact.h)(
	        'div',
	        { className: 'progress' },
	        data
	      );
	    }
	  }]);
	  return Bar;
	}(_preact.Component);

	exports.default = Bar;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Changeable = function (_Component) {
	  (0, _inherits3.default)(Changeable, _Component);

	  function Changeable() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Changeable);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Changeable.__proto__ || (0, _getPrototypeOf2.default)(Changeable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      mode: ''
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Changeable, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      // You don't have to do this check first, but it can help prevent an unneeded render

	      if (nextProps.value !== this.props.value) {
	        this.setState({
	          mode: 'grow-on-change'
	        });

	        setTimeout(function () {
	          _this2.setState({ mode: '' });
	        }, 500);
	      }

	      // if (nextProps.startTime !== this.state.startTime) {
	      //   this.setState({ startTime: nextProps.startTime });
	      // }
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      return (0, _preact.h)(
	        'span',
	        { className: this.state.mode },
	        props.value
	      );
	    }
	  }]);
	  return Changeable;
	}(_preact.Component);

	exports.default = Changeable;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _coloringRange = __webpack_require__(183);

	var _coloringRange2 = _interopRequireDefault(_coloringRange);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColoredValue = function (_Component) {
	  (0, _inherits3.default)(ColoredValue, _Component);

	  function ColoredValue() {
	    (0, _classCallCheck3.default)(this, ColoredValue);
	    return (0, _possibleConstructorReturn3.default)(this, (ColoredValue.__proto__ || (0, _getPrototypeOf2.default)(ColoredValue)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ColoredValue, [{
	    key: 'render',
	    value: function render(_ref) {
	      var value = _ref.value,
	          text = _ref.text;

	      var positive = _coloringRange2.default.standard(10, 10);
	      var negative = _coloringRange2.default.standard(0, 10);

	      var ratingColor = value < 0 ? negative : positive;

	      return (0, _preact.h)(
	        'span',
	        { style: { color: ratingColor } },
	        value > 0 ? '+' + value : value,
	        text
	      );
	    }
	  }]);
	  return ColoredValue;
	}(_preact.Component);

	exports.default = ColoredValue;

/***/ },
/* 183 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var standard = function standard(value, range) {
	  var green = Math.floor(value * 160 / range);
	  var red = 255 - Math.floor(value * 255 / range);

	  return "rgba(" + red + ", " + green + ", 0, 1)"; //`rgba(${red}, ${green}, 0, 1)`;
	};

	var ranged = function ranged(value, min, max) {
	  return standard(value - min, max - min);
	};

	exports.default = {
	  standard: standard,
	  ranged: ranged
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SmallIcon = function (_Component) {
	  (0, _inherits3.default)(SmallIcon, _Component);

	  function SmallIcon() {
	    (0, _classCallCheck3.default)(this, SmallIcon);
	    return (0, _possibleConstructorReturn3.default)(this, (SmallIcon.__proto__ || (0, _getPrototypeOf2.default)(SmallIcon)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(SmallIcon, [{
	    key: "render",
	    value: function render(_ref) {
	      var src = _ref.src,
	          title = _ref.title;

	      return (0, _preact.h)(
	        "span",
	        null,
	        (0, _preact.h)("img", { src: src, title: title, width: "48", height: "48" })
	      );
	    }
	  }]);
	  return SmallIcon;
	}(_preact.Component);

	exports.default = SmallIcon;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MeduimIcon = function (_Component) {
	  (0, _inherits3.default)(MeduimIcon, _Component);

	  function MeduimIcon() {
	    (0, _classCallCheck3.default)(this, MeduimIcon);
	    return (0, _possibleConstructorReturn3.default)(this, (MeduimIcon.__proto__ || (0, _getPrototypeOf2.default)(MeduimIcon)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(MeduimIcon, [{
	    key: "render",
	    value: function render(_ref) {
	      var src = _ref.src,
	          title = _ref.title;

	      return (0, _preact.h)(
	        "span",
	        null,
	        (0, _preact.h)("img", { src: src, title: title, width: "72", height: "72" })
	      );
	    }
	  }]);
	  return MeduimIcon;
	}(_preact.Component);

	exports.default = MeduimIcon;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BigIcon = function (_Component) {
	  (0, _inherits3.default)(BigIcon, _Component);

	  function BigIcon() {
	    (0, _classCallCheck3.default)(this, BigIcon);
	    return (0, _possibleConstructorReturn3.default)(this, (BigIcon.__proto__ || (0, _getPrototypeOf2.default)(BigIcon)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(BigIcon, [{
	    key: "render",
	    value: function render(_ref) {
	      var src = _ref.src,
	          title = _ref.title;

	      return (0, _preact.h)(
	        "span",
	        null,
	        (0, _preact.h)("img", { src: src, title: title, width: "96", height: "96" })
	      );
	    }
	  }]);
	  return BigIcon;
	}(_preact.Component);

	exports.default = BigIcon;

/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var shortenValue = function shortenValue(value) {
	  return value;
	  var abs = Math.abs(value);

	  if (abs < 10000) return value;

	  if (abs < 1000000) return Math.floor(value / 1000) + "K";

	  if (abs < 1000000000) return Math.floor(value / 100000) / 10 + "M";

	  return Math.floor(value / 100000000) / 10 + "B";
	};

	exports.default = shortenValue;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _DeveloperTab = __webpack_require__(189);

	var _DeveloperTab2 = _interopRequireDefault(_DeveloperTab);

	var _ImprovementTab = __webpack_require__(191);

	var _ImprovementTab2 = _interopRequireDefault(_ImprovementTab);

	var _metrics = __webpack_require__(193);

	var _metrics2 = _interopRequireDefault(_metrics);

	var _competitors = __webpack_require__(194);

	var _competitors2 = _interopRequireDefault(_competitors);

	var _BugPanel = __webpack_require__(196);

	var _BugPanel2 = _interopRequireDefault(_BugPanel);

	var _Marketing = __webpack_require__(197);

	var _Marketing2 = _interopRequireDefault(_Marketing);

	var _shortenValue = __webpack_require__(187);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MODE_MARKETING = 'MODE_MARKETING';
	// import React, { Component, PropTypes } from 'react';

	var MODE_MAIN_FEATURES = 'MODE_MAIN_FEATURES';
	var MODE_STATS = 'MODE_STATS';
	var MODE_RESEARCH = 'MODE_RESEARCH';

	var ProductPanel = function (_Component) {
	  (0, _inherits3.default)(ProductPanel, _Component);

	  function ProductPanel() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, ProductPanel);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ProductPanel.__proto__ || (0, _getPrototypeOf2.default)(ProductPanel)).call.apply(_ref, [this].concat(args))), _this), _this.renderMetrics = function (id, product) {
	      if (!_stages2.default.canShowMetricsTab()) return '';

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u0420\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 "',
	            product.name,
	            '"'
	          ),
	          (0, _preact.h)(
	            'div',
	            null,
	            '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430: ',
	            _productStore2.default.getDescriptionOfProduct(id)
	          )
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 (\u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E)'
	          ),
	          (0, _preact.h)(_metrics2.default, { id: id })
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          _this.renderOurCostStructured(id)
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          (0, _preact.h)(_competitors2.default, null)
	        )
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(ProductPanel, [{
	    key: 'renderOurCostStructured',
	    value: function renderOurCostStructured(id) {
	      if (!_stages2.default.canShowCompetitorsTab()) return '';

	      var ourCompanyCost = _productStore2.default.getCompanyCostStructured(id);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0430\u0448\u0430 \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: ',
	          (0, _shortenValue2.default)(ourCompanyCost.cost),
	          '$'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0430 \u043D\u0430\u0448\u0443 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043B\u0438\u044F\u0435\u0442 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 \u0438 \u043D\u0430\u0448\u0438 \u0434\u043E\u0445\u043E\u0434\u044B'
	        ),
	        (0, _preact.h)(
	          'ul',
	          null,
	          (0, _preact.h)(
	            'li',
	            null,
	            '\u041E\u0442 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 (',
	            ourCompanyCost.technologyPart,
	            '%): ',
	            (0, _shortenValue2.default)(ourCompanyCost.technologyValue),
	            '$'
	          ),
	          (0, _preact.h)(
	            'li',
	            null,
	            '\u041E\u0442 \u0434\u043E\u0445\u043E\u0434\u043E\u0432 (',
	            ourCompanyCost.economicPart,
	            '%): ',
	            (0, _shortenValue2.default)(ourCompanyCost.economicValue),
	            '$'
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderDevTab',
	    value: function renderDevTab(id, product) {
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(_DeveloperTab2.default, { id: id, product: product }),
	        (0, _preact.h)(_BugPanel2.default, { id: id })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref2, state) {
	      var product = _ref2.product,
	          gamePhase = _ref2.gamePhase,
	          mode = _ref2.mode;

	      var id = 0;

	      var body = '';
	      switch (mode) {
	        case MODE_MARKETING:
	          body = (0, _preact.h)(_Marketing2.default, { id: id });break;

	        case MODE_MAIN_FEATURES:
	          body = this.renderDevTab(id, product);break;

	        case MODE_STATS:
	          body = this.renderMetrics(id, product);break;

	        case MODE_RESEARCH:
	          body = (0, _preact.h)(_ImprovementTab2.default, { id: id });break;
	      }

	      return (0, _preact.h)(
	        'div',
	        { className: 'product-panel-body' },
	        body
	      );
	    }
	  }]);
	  return ProductPanel;
	}(_preact.Component);

	exports.default = ProductPanel;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _list = __webpack_require__(190);

	var _list2 = _interopRequireDefault(_list);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DeveloperTab = function (_Component) {
	  (0, _inherits3.default)(DeveloperTab, _Component);

	  function DeveloperTab() {
	    (0, _classCallCheck3.default)(this, DeveloperTab);
	    return (0, _possibleConstructorReturn3.default)(this, (DeveloperTab.__proto__ || (0, _getPrototypeOf2.default)(DeveloperTab)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(DeveloperTab, [{
	    key: 'render',
	    value: function render(_ref) {
	      var id = _ref.id;

	      if (!_stages2.default.canShowMainFeatureTab()) return '';

	      var XP = _productStore2.default.getXP(id);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'featureGroupDescription' },
	          '\u0423\u043B\u0443\u0447\u0448\u0430\u044F \u0433\u043B\u0430\u0432\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430, \u0432\u044B \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0432\u0430\u0435\u0442\u0435 \u0434\u043E\u0445\u043E\u0434 \u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041E\u0447\u043A\u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439: ',
	          XP
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_list2.default, { id: id })
	      );
	    }
	  }]);
	  return DeveloperTab;
	}(_preact.Component);

	exports.default = DeveloperTab;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MainFeatures = function (_Component) {
	  (0, _inherits3.default)(MainFeatures, _Component);

	  function MainFeatures() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, MainFeatures);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MainFeatures.__proto__ || (0, _getPrototypeOf2.default)(MainFeatures)).call.apply(_ref, [this].concat(args))), _this), _this.renderMainFeature = function (product, id) {
	      return function (defaultFeature, featureId) {
	        var featureName = defaultFeature.shortDescription;

	        var upgradeCost = _productStore2.default.getFeatureIncreaseXPCost(id);
	        var upgradeable = _productStore2.default.getXP(id) >= upgradeCost;

	        var leaderInTech = _productStore2.default.getLeaderInTech(featureId);
	        var isWeAreLeaders = leaderInTech.id === 0;

	        var profitPhrase = void 0,
	            text = void 0;

	        if (isWeAreLeaders) {
	          profitPhrase = (0, _preact.h)(
	            'div',
	            null,
	            '+5 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432'
	          );
	          text = 'Совершить прорыв!';
	        } else {
	          var current = product.features.offer[featureId];
	          var benefit = _productStore2.default.getBenefitOnFeatureImprove(id, featureId);

	          profitPhrase = '+' + benefit + '$';
	          text = '\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0434\u043E ' + (current + 1) + ' lvl';
	        }

	        return (0, _preact.h)(
	          'tr',
	          { key: 'feature-' + featureId },
	          (0, _preact.h)(
	            'td',
	            { style: { textAlign: 'left' } },
	            (0, _preact.h)(
	              'div',
	              null,
	              featureName
	            )
	          ),
	          (0, _preact.h)(
	            'td',
	            null,
	            (0, _preact.h)(
	              'div',
	              null,
	              profitPhrase
	            )
	          ),
	          (0, _preact.h)(
	            'td',
	            null,
	            (0, _preact.h)(_UI2.default.Button, {
	              text: text,
	              onClick: function onClick() {
	                _this.improveFeature(id, featureId, upgradeCost);
	              },
	              disabled: !upgradeable,
	              secondary: upgradeable,
	              gray: !upgradeable
	            })
	          )
	        );
	      };
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(MainFeatures, [{
	    key: 'render',
	    value: function render(_ref2) {
	      var id = _ref2.id;

	      if (!_stages2.default.canShowMainFeatureTab()) return '';

	      var product = _productStore2.default.getProduct(id);
	      var defaults = _productStore2.default.getDefaults(id);

	      var featureListTableView = defaults.features.map(this.renderMainFeature(product, id));

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'table',
	          { className: 'table table-striped', style: { textAlign: 'center' } },
	          (0, _preact.h)(
	            'thead',
	            null,
	            (0, _preact.h)(
	              'th',
	              { style: { textAlign: 'left' } },
	              '\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F'
	            ),
	            (0, _preact.h)(
	              'th',
	              null,
	              '\u041F\u043E\u043B\u044C\u0437\u0430'
	            ),
	            (0, _preact.h)(
	              'th',
	              null,
	              '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435'
	            )
	          ),
	          (0, _preact.h)(
	            'tbody',
	            null,
	            featureListTableView
	          )
	        )
	      );
	    }
	  }, {
	    key: 'improveFeature',
	    value: function improveFeature(id, featureId, xp) {
	      _productActions2.default.improveFeature(id, 'offer', featureId, 1, xp);
	    }
	  }]);
	  return MainFeatures;
	}(_preact.Component);

	exports.default = MainFeatures;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _Exploration = __webpack_require__(192);

	var _Exploration2 = _interopRequireDefault(_Exploration);

	var _stages = __webpack_require__(150);

	var _stages2 = _interopRequireDefault(_stages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImprovementTab = function (_Component) {
	  (0, _inherits3.default)(ImprovementTab, _Component);

	  function ImprovementTab() {
	    (0, _classCallCheck3.default)(this, ImprovementTab);
	    return (0, _possibleConstructorReturn3.default)(this, (ImprovementTab.__proto__ || (0, _getPrototypeOf2.default)(ImprovementTab)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ImprovementTab, [{
	    key: 'render',
	    value: function render(_ref) {
	      var id = _ref.id;

	      if (!_stages2.default.canShowMainFeatureTab()) return '';

	      var XP = _productStore2.default.getXP(id);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'featureGroupDescription' },
	          '\u0423\u043B\u0443\u0447\u0448\u0430\u044F \u0433\u043B\u0430\u0432\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430, \u0432\u044B \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0432\u0430\u0435\u0442\u0435 \u0434\u043E\u0445\u043E\u0434 \u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041E\u0447\u043A\u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439: ',
	          XP
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Exploration2.default, null)
	      );
	    }
	  }]);
	  return ImprovementTab;
	}(_preact.Component);

	exports.default = ImprovementTab;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _stringify = __webpack_require__(125);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Exploration = function (_Component) {
	  (0, _inherits3.default)(Exploration, _Component);

	  function Exploration() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Exploration);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Exploration.__proto__ || (0, _getPrototypeOf2.default)(Exploration)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.pickData = function () {
	      _this.setState({
	        backend: [],
	        frontend: [],
	        testing: [],
	        team: [],
	        research: [],
	        blog: [],
	        support: [],

	        segments: []
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Exploration, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.pickData();

	      _productStore2.default.addChangeListener(this.pickData);
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref2, state) {
	      var id = _ref2.id;

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u0421\u0435\u0440\u0432\u0435\u0440\u0430'
	        ),
	        (0, _stringify2.default)(state.backend),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F'
	        ),
	        (0, _stringify2.default)(state.frontend),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435'
	        ),
	        (0, _stringify2.default)(state.testing),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u041A\u043E\u043C\u0430\u043D\u0434\u0430'
	        ),
	        (0, _stringify2.default)(state.team),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u0411\u043B\u043E\u0433'
	        ),
	        (0, _stringify2.default)(state.blog),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u0422\u0435\u0445\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430'
	        ),
	        (0, _stringify2.default)(state.support),
	        (0, _preact.h)('br', null)
	      );
	    }
	  }]);
	  return Exploration;
	}(_preact.Component);

	exports.default = Exploration;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _round = __webpack_require__(132);

	var _round2 = _interopRequireDefault(_round);

	var _moneyDifference = __webpack_require__(161);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _shortenValue = __webpack_require__(187);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var Metrics = function (_Component) {
	  (0, _inherits3.default)(Metrics, _Component);

	  function Metrics() {
	    (0, _classCallCheck3.default)(this, Metrics);
	    return (0, _possibleConstructorReturn3.default)(this, (Metrics.__proto__ || (0, _getPrototypeOf2.default)(Metrics)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Metrics, [{
	    key: 'render',
	    value: function render(_ref) {
	      var id = _ref.id;

	      var income = (0, _round2.default)(_productStore2.default.getProductIncome(id));

	      var data = _moneyDifference2.default.structured(id);

	      var productIncome = _productStore2.default.getMarketIncomeList(id).map(function (item) {
	        return (0, _preact.h)(
	          'li',
	          null,
	          'market #$',
	          item.marketId,
	          ': +',
	          (0, _shortenValue2.default)(item.income),
	          '$'
	        );
	      });

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'ul',
	            null,
	            (0, _preact.h)(
	              'li',
	              null,
	              (0, _preact.h)(
	                'b',
	                null,
	                '\u0414\u043E\u0445\u043E\u0434\u044B: ',
	                (0, _shortenValue2.default)(income),
	                '$'
	              )
	            ),
	            (0, _preact.h)(
	              'ul',
	              null,
	              productIncome
	            ),
	            (0, _preact.h)(
	              'li',
	              null,
	              (0, _preact.h)(
	                'b',
	                null,
	                '\u0420\u0430\u0441\u0445\u043E\u0434\u044B: ',
	                (0, _shortenValue2.default)(data.expenses),
	                '$'
	              )
	            ),
	            (0, _preact.h)(
	              'ul',
	              null,
	              (0, _preact.h)(
	                'li',
	                null,
	                '\u041A\u043E\u043C\u0430\u043D\u0434\u0430: ',
	                (0, _shortenValue2.default)(data.teamExpenses),
	                '$'
	              ),
	              (0, _preact.h)(
	                'li',
	                null,
	                '\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430: ',
	                (0, _shortenValue2.default)(data.productExpenses),
	                '$'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return Metrics;
	}(_preact.Component);

	exports.default = Metrics;
	;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _competitor = __webpack_require__(195);

	var _competitor2 = _interopRequireDefault(_competitor);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Competitors = function (_Component) {
	  (0, _inherits3.default)(Competitors, _Component);

	  function Competitors() {
	    (0, _classCallCheck3.default)(this, Competitors);
	    return (0, _possibleConstructorReturn3.default)(this, (Competitors.__proto__ || (0, _getPrototypeOf2.default)(Competitors)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Competitors, [{
	    key: 'render',
	    value: function render() {
	      var competitors = _productStore2.default.getCompetitorsList();

	      var competitorList = competitors.map(function (c) {
	        return c.companyId;
	      }).sort(function (c1, c2) {
	        var cost1 = _productStore2.default.getCompanyCost(c1);
	        var cost2 = _productStore2.default.getCompanyCost(c2);

	        _logger2.default.log(c1, c2, cost1, cost2);

	        return cost2 - cost1;
	      }).map(function (companyId) {
	        return (0, _preact.h)(_competitor2.default, {
	          name: _productStore2.default.getName(companyId),
	          cost: _productStore2.default.getCompanyCost(companyId),
	          income: _productStore2.default.getProductIncome(companyId),
	          isCompetitor: companyId != 0
	        });
	      });

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'content-title' },
	          '\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439'
	        ),
	        (0, _preact.h)(
	          'table',
	          { className: 'table' },
	          (0, _preact.h)(
	            'thead',
	            null,
	            (0, _preact.h)(
	              'th',
	              null,
	              '\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F'
	            ),
	            (0, _preact.h)(
	              'th',
	              null,
	              '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C'
	            ),
	            (0, _preact.h)(
	              'th',
	              null,
	              '\u0414\u043E\u0445\u043E\u0434\u044B'
	            )
	          ),
	          (0, _preact.h)(
	            'tbody',
	            null,
	            competitorList
	          )
	        )
	      );
	    }
	  }]);
	  return Competitors;
	}(_preact.Component);

	exports.default = Competitors;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _shortenValue = __webpack_require__(187);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Competitor = function (_Component) {
	  (0, _inherits3.default)(Competitor, _Component);

	  function Competitor() {
	    (0, _classCallCheck3.default)(this, Competitor);
	    return (0, _possibleConstructorReturn3.default)(this, (Competitor.__proto__ || (0, _getPrototypeOf2.default)(Competitor)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Competitor, [{
	    key: 'render',
	    value: function render(_ref) {
	      var name = _ref.name,
	          isCompetitor = _ref.isCompetitor,
	          cost = _ref.cost,
	          income = _ref.income;

	      var background = 'competitor competeable';
	      var companyTitle = name + ' (\u042D\u0442\u043E \u043C\u044B)';

	      if (isCompetitor) {
	        background = 'competitor uncompeteable';
	        companyTitle = name;
	      }

	      var companyCost = (0, _shortenValue2.default)(cost);
	      var companyIncome = (0, _shortenValue2.default)(income);

	      return (0, _preact.h)(
	        'tr',
	        { className: background },
	        (0, _preact.h)(
	          'td',
	          null,
	          (0, _preact.h)(
	            'div',
	            null,
	            companyTitle
	          )
	        ),
	        (0, _preact.h)(
	          'td',
	          null,
	          companyCost,
	          '$'
	        ),
	        (0, _preact.h)(
	          'td',
	          null,
	          companyIncome,
	          '$ / \u043C\u0435\u0441'
	        )
	      );
	    }
	  }]);
	  return Competitor;
	}(_preact.Component);

	exports.default = Competitor;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BugPanel = function (_Component) {
	  (0, _inherits3.default)(BugPanel, _Component);

	  function BugPanel() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, BugPanel);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BugPanel.__proto__ || (0, _getPrototypeOf2.default)(BugPanel)).call.apply(_ref, [this].concat(args))), _this), _this.renderBug = function (productId) {
	      return function (bug) {
	        var isFixable = _productStore2.default.isBugFixable(productId, bug.id);

	        var action = function action() {
	          return _productActions2.default.fixBug(productId, bug.id);
	        };

	        var button = (0, _preact.h)(_UI2.default.Button, {
	          text: '\u0418\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C',
	          primary: isFixable,
	          disabled: !isFixable,
	          onClick: action
	        });

	        return (0, _preact.h)(
	          'tr',
	          null,
	          (0, _preact.h)(
	            'td',
	            null,
	            _UI2.default.icons[bug.platform]
	          ),
	          (0, _preact.h)(
	            'td',
	            null,
	            bug.cost
	          ),
	          (0, _preact.h)(
	            'td',
	            null,
	            Math.ceil(bug.penalty * 100)
	          ),
	          (0, _preact.h)(
	            'td',
	            null,
	            button
	          )
	        );
	      };
	    }, _this.sortByLoyalty = function (b1, b2) {
	      if (b2.penalty > b1.penalty) {
	        return 1;
	      }

	      if (b2.penalty < b1.penalty) {
	        return -1;
	      }

	      if (b2.cost > b1.cost) {
	        return -1;
	      }

	      if (b2.cost < b1.cost) {
	        return 1;
	      }

	      return 0;
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(BugPanel, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;


	      var list = _productStore2.default.getBugs(props.id);
	      // const loyaltyLoss = productStore.getBugLoyaltyLoss(props.id);
	      var loyaltyLoss = Math.ceil(_productStore2.default.getBugLoyaltyLoss(props.id) * 100);

	      var bugs = list.sort(this.sortByLoyalty).map(this.renderBug(props.id));

	      if (!list.length) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'h2',
	            null,
	            '\u041E\u0448\u0438\u0431\u043A\u0438'
	          ),
	          (0, _preact.h)(
	            'div',
	            null,
	            '\u041E\u0448\u0438\u0431\u043E\u043A \u043D\u0435\u0442! \u041A\u043B\u0438\u0435\u043D\u0442\u044B \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B :)'
	          )
	        );
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h2',
	          null,
	          '\u041E\u0448\u0438\u0431\u043A\u0438'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0418\u0437-\u0437\u0430 \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0430\u0434\u0430\u0435\u0442 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432!'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0418\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0438\u0445 \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u043E\u0440\u0435\u0435!'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041F\u0430\u0434\u0435\u043D\u0438\u0435 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432: ',
	          loyaltyLoss,
	          '%'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'table',
	            { className: 'table table-striped', style: { textAlign: 'center' } },
	            (0, _preact.h)(
	              'thead',
	              null,
	              (0, _preact.h)(
	                'th',
	                null,
	                '\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430'
	              ),
	              (0, _preact.h)(
	                'th',
	                null,
	                '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C, ',
	                _UI2.default.icons.PP
	              ),
	              (0, _preact.h)(
	                'th',
	                null,
	                '\u041B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C, %'
	              ),
	              (0, _preact.h)(
	                'th',
	                null,
	                '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435'
	              )
	            ),
	            (0, _preact.h)(
	              'tbody',
	              null,
	              bugs
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return BugPanel;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = BugPanel;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _ClientRetention = __webpack_require__(198);

	var _ClientRetention2 = _interopRequireDefault(_ClientRetention);

	var _ClientAcquisition = __webpack_require__(200);

	var _ClientAcquisition2 = _interopRequireDefault(_ClientAcquisition);

	var _SegmentExplorer = __webpack_require__(201);

	var _SegmentExplorer2 = _interopRequireDefault(_SegmentExplorer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Marketing = function (_Component) {
	  (0, _inherits3.default)(Marketing, _Component);

	  function Marketing() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Marketing);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Marketing.__proto__ || (0, _getPrototypeOf2.default)(Marketing)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      exploredMarkets: [],
	      explorableMarkets: [],
	      markets: []
	    }, _this.pickMarketData = function () {
	      var state = {
	        markets: _productStore2.default.getMarketsWithExplorationStatuses(_this.props.id),
	        exploredMarkets: _productStore2.default.getExploredMarkets(_this.props.id),
	        explorableMarkets: _productStore2.default.getExplorableMarkets(_this.props.id)
	      };

	      _this.setState(state);
	    }, _this.renderMarketingTab = function (id) {
	      var marketsTab = _this.state.exploredMarkets.map(function (m, i) {
	        return (0, _preact.h)(_ClientRetention2.default, { id: id, marketId: m.id, market: m });
	      });

	      return (0, _preact.h)(
	        'div',
	        { className: 'market-list-container' },
	        marketsTab
	      );
	    }, _this.renderClientAcquisition = function (id) {
	      var marketsTab = _this.state.exploredMarkets.map(function (m, i) {
	        return (0, _preact.h)(_ClientAcquisition2.default, { id: id, marketId: m.id, market: m });
	      });

	      return (0, _preact.h)(
	        'div',
	        { className: 'market-list-container' },
	        marketsTab
	      );
	    }, _this.renderExplorableMarkets = function (id) {
	      var nextId = -1;

	      _this.state.markets.forEach(function (m, i) {
	        if (nextId === -1 && !m.explored) {
	          nextId = m.id;
	        }
	      });

	      var marketsTab = _this.state.markets.map(function (m) {
	        return (0, _preact.h)(_SegmentExplorer2.default, {
	          id: id,
	          market: m.info,
	          explored: m.explored,
	          explorable: m.id === nextId,
	          enoughXPsToExplore: m.enoughXPsToExplore
	        });
	      });

	      return (0, _preact.h)(
	        'div',
	        { className: 'market-list-container' },
	        marketsTab
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Marketing, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.pickMarketData();

	      _productStore2.default.addChangeListener(this.pickMarketData);
	    }
	  }, {
	    key: 'render',

	    // <br />
	    // <h2 className="center">Исследование клиентов</h2>
	    // {this.renderExplorableMarkets(id)}
	    // <br />

	    value: function render(_ref2) {
	      var id = _ref2.id;

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u041F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432'
	        ),
	        this.renderClientAcquisition(id),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u0423\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432'
	        ),
	        this.renderMarketingTab(id)
	      );
	    }
	  }]);
	  return Marketing;
	}(_preact.Component);

	exports.default = Marketing;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _shortenValue = __webpack_require__(187);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	var _coloredRating = __webpack_require__(199);

	var _coloredRating2 = _interopRequireDefault(_coloredRating);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SegmentUpgrader = function (_Component) {
	  (0, _inherits3.default)(SegmentUpgrader, _Component);

	  function SegmentUpgrader() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, SegmentUpgrader);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SegmentUpgrader.__proto__ || (0, _getPrototypeOf2.default)(SegmentUpgrader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      toggle: false
	    }, _this.toggle = function () {
	      _this.setState({ toggle: !_this.state.toggle });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(SegmentUpgrader, [{
	    key: 'improveFeature',
	    value: function improveFeature(id, featureId, xp) {
	      _productActions2.default.improveFeature(id, 'offer', featureId, 1, xp);
	    }
	  }, {
	    key: 'renderImprovementVariants',
	    value: function renderImprovementVariants(id, marketId) {
	      var _this2 = this;

	      var upgrade = _productStore2.default.getBestFeatureUpgradeVariantOnMarket(id, marketId);

	      if (!upgrade.loyaltyChange) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439 :('
	        );
	      }

	      var loyaltyChange = Math.ceil(upgrade.loyaltyChange * 1000) / 10;
	      var ratingChange = Math.ceil(upgrade.ratingChange * 100) / 100;

	      var XP = _productStore2.default.getXP(id);

	      var cost = _productStore2.default.getFeatureIncreaseXPCost(id);

	      // <div className="segment-value">{JSON.stringify(upgrade)}</div>
	      // <div className="segment-value">Лояльность: +{loyaltyChange}%</div>
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'segment-attribute' },
	          (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            '\u0423\u043B\u0443\u0447\u0448\u0430\u0435\u043C\u0430\u044F \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F '
	          ),
	          (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            upgrade.featureName
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'segment-value' },
	          '\u0420\u0435\u0439\u0442\u0438\u043D\u0433: +',
	          ratingChange
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(_UI2.default.Button, {
	            onClick: function onClick() {
	              return _this2.improveFeature(id, upgrade.featureId, cost);
	            },
	            text: '\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044E',
	            primary: true,
	            disabled: XP < cost
	          })
	        )
	      );
	    }
	  }, {
	    key: 'renderLoyaltyToggle',
	    value: function renderLoyaltyToggle() {
	      return (0, _preact.h)(
	        'span',
	        null,
	        '(',
	        (0, _preact.h)(
	          'span',
	          { className: 'toggle', onClick: this.toggle },
	          '\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0442\u0447\u0451\u0442'
	        ),
	        ')'
	      );
	    }
	  }, {
	    key: 'renderBugFixLink',
	    value: function renderBugFixLink(errors) {
	      if (!errors) return '';

	      return (0, _preact.h)(
	        'span',
	        null,
	        '(',
	        (0, _preact.h)(
	          'span',
	          { className: 'toggle' },
	          '\u0418\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C'
	        ),
	        ')'
	      );
	    }
	  }, {
	    key: 'renderLoyaltyIndicator',
	    value: function renderLoyaltyIndicator(id, marketId) {
	      var loyalty = _productStore2.default.getSegmentLoyalty(id, marketId);

	      if (loyalty < 20) {
	        return (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/face-sad.png' });
	      } else if (loyalty < 60) {
	        return (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/face-neutral.png' });
	      }

	      return (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/face-happy.png' });
	    }
	  }, {
	    key: 'renderLoyaltyDescription',
	    value: function renderLoyaltyDescription(id, marketId) {
	      var loyaltyStructured = _productStore2.default.getSegmentLoyaltyStructured(id, marketId);

	      var rating = Math.ceil(loyaltyStructured.ratingBasedLoyalty * 100);
	      var errors = Math.ceil(loyaltyStructured.bugPenalty * 100);
	      var newApp = Math.ceil(loyaltyStructured.isNewApp * 100);
	      var isBestApp = Math.ceil(loyaltyStructured.isBestApp * 100);

	      if (this.state.toggle) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)('br', null),
	          (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            '\u041E\u0442 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430: ',
	            (0, _preact.h)(_UI2.default.ColoredValue, { value: rating, text: '%' })
	          ),
	          (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            '\u041E\u0448\u0438\u0431\u043A\u0438: ',
	            (0, _preact.h)(_UI2.default.ColoredValue, { value: -errors, text: '%' }),
	            ' ',
	            this.renderBugFixLink(errors)
	          ),
	          (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            '\u041D\u043E\u0432\u0438\u043D\u043A\u0430: ',
	            (0, _preact.h)(_UI2.default.ColoredValue, { value: newApp, text: '%' })
	          ),
	          isBestApp > 0 ? (0, _preact.h)(
	            'div',
	            { className: 'segment-value' },
	            '\u041B\u0438\u0434\u0435\u0440\u0441\u0442\u0432\u043E \u043F\u043E \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0443: ',
	            (0, _preact.h)(_UI2.default.ColoredValue, { value: isBestApp, text: '%' })
	          ) : ''
	        );
	      }

	      return '';
	    }
	  }, {
	    key: 'renderLoyalty',
	    value: function renderLoyalty(id, marketId) {
	      var loyalty = _productStore2.default.getSegmentLoyalty(id, marketId);
	      var loyaltyIndicator = this.renderLoyaltyIndicator(id, marketId);

	      var description = this.renderLoyaltyDescription(id, marketId);
	      var toggle = this.renderLoyaltyToggle(id, marketId);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'segment-value' },
	          '\u041B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432: ',
	          loyalty,
	          '% ',
	          toggle
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: 'segment-value' },
	          loyaltyIndicator
	        ),
	        description
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref2) {
	      var marketId = _ref2.marketId,
	          market = _ref2.market,
	          id = _ref2.id;
	      var clientType = market.clientType;


	      var rating = _productStore2.default.getRating(id, marketId);

	      return (0, _preact.h)(
	        'div',
	        { className: 'segment-block' },
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          (0, _preact.h)(
	            'div',
	            { className: 'client-market-item' },
	            (0, _preact.h)(
	              'div',
	              null,
	              (0, _preact.h)(
	                'div',
	                { className: 'center segment-client-type' },
	                clientType
	              ),
	              (0, _preact.h)(
	                'div',
	                { className: 'segment-attribute' },
	                (0, _preact.h)(
	                  'div',
	                  { className: 'segment-value' },
	                  '\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ',
	                  (0, _preact.h)(_coloredRating2.default, { rating: rating })
	                ),
	                (0, _preact.h)('br', null),
	                (0, _preact.h)(
	                  'div',
	                  { className: 'segment-value' },
	                  this.renderImprovementVariants(id, marketId)
	                ),
	                (0, _preact.h)('br', null),
	                (0, _preact.h)('hr', { className: 'horizontal-separator' }),
	                (0, _preact.h)('br', null),
	                (0, _preact.h)(
	                  'div',
	                  { className: 'segment-value' },
	                  this.renderLoyalty(id, marketId)
	                )
	              ),
	              (0, _preact.h)('div', { className: 'segment-attribute' })
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return SegmentUpgrader;
	}(_preact.Component);

	exports.default = SegmentUpgrader;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _coloringRange = __webpack_require__(183);

	var _coloringRange2 = _interopRequireDefault(_coloringRange);

	var _round = __webpack_require__(132);

	var _round2 = _interopRequireDefault(_round);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColoredRating = function (_Component) {
	  (0, _inherits3.default)(ColoredRating, _Component);

	  function ColoredRating() {
	    (0, _classCallCheck3.default)(this, ColoredRating);
	    return (0, _possibleConstructorReturn3.default)(this, (ColoredRating.__proto__ || (0, _getPrototypeOf2.default)(ColoredRating)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ColoredRating, [{
	    key: 'render',
	    value: function render(_ref) {
	      var rating = _ref.rating;

	      var ratingColor = _coloringRange2.default.standard(rating, 10);

	      var rounded = (0, _round2.default)(rating);
	      return (0, _preact.h)(
	        'span',
	        null,
	        (0, _preact.h)(
	          'span',
	          { style: { color: ratingColor } },
	          (0, _preact.h)(_UI2.default.Changeable, { value: rounded })
	        )
	      );
	    }
	  }]);
	  return ColoredRating;
	}(_preact.Component);

	exports.default = ColoredRating;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ClientAcquisition = function (_Component) {
	  (0, _inherits3.default)(ClientAcquisition, _Component);

	  function ClientAcquisition() {
	    (0, _classCallCheck3.default)(this, ClientAcquisition);
	    return (0, _possibleConstructorReturn3.default)(this, (ClientAcquisition.__proto__ || (0, _getPrototypeOf2.default)(ClientAcquisition)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ClientAcquisition, [{
	    key: 'renderAcquisitionButtons',
	    value: function renderAcquisitionButtons(id, marketId) {
	      var _this2 = this;

	      var expertise = _productStore2.default.getMarketingKnowledge(id, marketId);

	      var buttons = [{ clients: 50 }];

	      if (expertise >= 10) {
	        buttons.push({ clients: 125 });
	      }

	      if (expertise >= 30) {
	        buttons.push({ clients: 225 });
	      }

	      if (expertise >= 55) {
	        buttons.push({ clients: 500 });
	      }

	      if (expertise >= 75) {
	        buttons.push({ clients: 1500 });
	      }

	      return buttons.reverse().map(function (b) {
	        return _this2.renderGetMoreClientsButton(id, marketId, b.clients, b.clients * 10);
	      });
	    }
	  }, {
	    key: 'renderGetMoreClientsButton',
	    value: function renderGetMoreClientsButton(id, marketId) {
	      var amountOfClients = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	      var price = arguments[3];

	      var isCanGrabMoreClients = _productStore2.default.isCanGrabMoreClients(id, marketId, amountOfClients, price);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(_UI2.default.Button, {
	          onClick: function onClick() {
	            return _productActions2.default.addClients(id, marketId, amountOfClients, price);
	          },
	          text: '\u041F\u0440\u0438\u0432\u043B\u0435\u0447\u044C ' + amountOfClients + ' \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432',
	          primary: true,
	          disabled: !isCanGrabMoreClients
	        }),
	        (0, _preact.h)('br', null)
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref) {
	      var marketId = _ref.marketId,
	          market = _ref.market,
	          id = _ref.id,
	          explored = _ref.explored;

	      var clients = _productStore2.default.getClientsOnMarket(id, marketId);

	      return (0, _preact.h)(
	        'div',
	        { className: 'segment-block' },
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          (0, _preact.h)(
	            'div',
	            { className: 'client-market-item' },
	            (0, _preact.h)(
	              'div',
	              null,
	              (0, _preact.h)(
	                'div',
	                { className: 'center segment-client-type' },
	                market.clientType
	              ),
	              (0, _preact.h)(
	                'div',
	                { className: 'segment-attribute flexbox' },
	                (0, _preact.h)(
	                  'div',
	                  { className: 'flex-splitter' },
	                  (0, _preact.h)(
	                    'div',
	                    { className: 'segment-value' },
	                    (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/clients.png' }),
	                    clients
	                  )
	                ),
	                (0, _preact.h)(
	                  'div',
	                  { className: 'flex-splitter' },
	                  (0, _preact.h)(
	                    'div',
	                    { className: 'segment-value' },
	                    (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/clients.png' }),
	                    'Max: ',
	                    market.clients
	                  )
	                )
	              ),
	              (0, _preact.h)('br', null),
	              (0, _preact.h)(
	                'div',
	                { className: 'segment-attribute' },
	                (0, _preact.h)(
	                  'div',
	                  { className: 'segment-value' },
	                  this.renderAcquisitionButtons(id, marketId)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return ClientAcquisition;
	}(_preact.Component);

	exports.default = ClientAcquisition;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(34);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(81);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(162);

	var _UI2 = _interopRequireDefault(_UI);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SegmentExplorer = function (_Component) {
	  (0, _inherits3.default)(SegmentExplorer, _Component);

	  function SegmentExplorer() {
	    (0, _classCallCheck3.default)(this, SegmentExplorer);
	    return (0, _possibleConstructorReturn3.default)(this, (SegmentExplorer.__proto__ || (0, _getPrototypeOf2.default)(SegmentExplorer)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(SegmentExplorer, [{
	    key: 'renderResearchButton',
	    value: function renderResearchButton(id, marketId, explored, needsToBeExplored, enoughXPsToExplore) {
	      var explorationCost = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;

	      if (explored) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          '\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u043E ',
	          (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/ok.png' })
	        );
	      }

	      if (!needsToBeExplored) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          '???'
	        );
	      }

	      if (!enoughXPsToExplore) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0443\u0436\u043D\u043E ',
	          explorationCost,
	          _UI2.default.icons.XP,
	          ' \u0434\u043B\u044F \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F :('
	        );
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F: ',
	          explorationCost,
	          _UI2.default.icons.XP
	        ),
	        (0, _preact.h)(_UI2.default.Button, {
	          onClick: function onClick() {
	            return _productActions2.default.exploreMarket(id, marketId, explorationCost);
	          },
	          text: '\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0440\u044B\u043D\u043E\u043A!',
	          primary: true
	        }),
	        (0, _preact.h)('br', null)
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref) {
	      var id = _ref.id,
	          market = _ref.market,
	          explored = _ref.explored,
	          explorable = _ref.explorable,
	          enoughXPsToExplore = _ref.enoughXPsToExplore;
	      var clientType = market.clientType,
	          explorationCost = market.explorationCost;


	      var marketSize = market.clients * market.price;

	      var fade = !explorable ? 'darken' : '';

	      return (0, _preact.h)(
	        'div',
	        { className: 'segment-block ' + fade },
	        (0, _preact.h)(
	          'div',
	          { className: 'content-block' },
	          (0, _preact.h)(
	            'div',
	            { className: 'client-market-item' },
	            (0, _preact.h)(
	              'div',
	              null,
	              (0, _preact.h)(
	                'div',
	                { className: 'center segment-client-type' },
	                clientType
	              ),
	              (0, _preact.h)(
	                'div',
	                { className: 'segment-attribute flexbox' },
	                (0, _preact.h)(
	                  'div',
	                  { className: 'flex-splitter' },
	                  (0, _preact.h)(
	                    'div',
	                    { className: 'segment-value' },
	                    (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/coins.png' }),
	                    '\u041E\u0431\u044A\u0451\u043C \u0440\u044B\u043D\u043A\u0430: ',
	                    marketSize,
	                    '$'
	                  )
	                ),
	                (0, _preact.h)(
	                  'div',
	                  { className: 'flex-splitter' },
	                  (0, _preact.h)(
	                    'div',
	                    { className: 'segment-value' },
	                    (0, _preact.h)(_UI2.default.SmallIcon, { src: '/images/clients.png' }),
	                    '\u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432: ',
	                    market.clients
	                  )
	                )
	              ),
	              (0, _preact.h)('br', null),
	              (0, _preact.h)(
	                'div',
	                { className: 'segment-attribute' },
	                (0, _preact.h)(
	                  'div',
	                  { className: 'segment-value' },
	                  this.renderResearchButton(id, market.id, explored, explorable, enoughXPsToExplore, explorationCost)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return SegmentExplorer;
	}(_preact.Component);

	exports.default = SegmentExplorer;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _scheduleStore = __webpack_require__(143);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _scheduleActions = __webpack_require__(149);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _moneyDifference = __webpack_require__(161);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _eventGenerator = __webpack_require__(203);

	var _eventGenerator2 = _interopRequireDefault(_eventGenerator);

	var _ai = __webpack_require__(205);

	var _ai2 = _interopRequireDefault(_ai);

	var _Product = __webpack_require__(121);

	var _Product2 = _interopRequireDefault(_Product);

	var _date = __webpack_require__(208);

	var _notifications = __webpack_require__(174);

	var NOTIFICATIONS = _interopRequireWildcard(_notifications);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var computeTasks = function computeTasks() {
	  var tasks = _scheduleStore2.default.getTasks();

	  var finishing = [];

	  tasks.forEach(function (t, taskId) {
	    var speed = t.speed;

	    if (t.inProgress) {
	      if (t.progress + speed >= t.timecost) {
	        // this task will complete today
	        finishing.push(taskId);

	        if (t.cb) {
	          t.cb();
	        }
	      } else {
	        _scheduleActions2.default.increaseProgress(taskId, speed);
	      }
	    }
	  });

	  _scheduleActions2.default.removeTasks(finishing); // and we need to set new inProgress task
	};

	var checkRents = function checkRents(day) {
	  // const refreshRents = [];
	  // const rents = productStore.getRents();
	  //
	  // rents
	  //   .forEach((r, i) => {
	  //     if (r.until <= day) {
	  //       refreshRents.push(i);
	  //       messageActions.addNotification(NOTIFICATIONS.NOTIFICATION_RENT_EXPIRED, { r, i });
	  //     }
	  //   });
	  //
	  // if (refreshRents.length) {
	  //   productActions.refreshRents(refreshRents);
	  // }
	};

	var run = function run() {
	  _scheduleActions2.default.increaseDay();

	  var day = _scheduleStore2.default.getDay();

	  var products = _productStore2.default.getProducts();

	  // check tasks for finishing
	  computeTasks();

	  // check if it is last day of month (pay day)
	  if ((0, _date.isLastDayOfMonth)(day)) {
	    products.forEach(function (p, i) {
	      var moneyBefore = _productStore2.default.getMoney(i);

	      var difference = _moneyDifference2.default.saldo(i);

	      _productActions2.default.increaseMoney(difference, i);

	      var money = _productStore2.default.getMoney(i);

	      if (money < 0 && moneyBefore < 0) {
	        _logger2.default.log('money below zero companyId=', i);
	      }

	      // productActions.testHypothesis(i);
	      _productActions2.default.produceResources(i);

	      // productActions.loseMonthlyHype(i);
	    });

	    // clean expired rents
	    checkRents(day);

	    _productActions2.default.updateEmployees();
	  }

	  if ((0, _date.isLastDayOfYear)(day)) {
	    products.forEach(function (p, i) {
	      _productActions2.default.addBonus(i);
	    });
	  }

	  if ((0, _date.isUsualDay)(day)) {
	    products.forEach(function (p, i) {
	      if (i !== 0) {
	        // bot.run(i);
	      }
	    });
	  }

	  // try to make an event
	  _eventGenerator2.default.emit(day);
	};

	exports.default = {
	  run: run
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _random = __webpack_require__(122);

	var _random2 = _interopRequireDefault(_random);

	var _events = __webpack_require__(142);

	var GAME_EVENTS = _interopRequireWildcard(_events);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _createRandomWorker = __webpack_require__(204);

	var _createRandomWorker2 = _interopRequireDefault(_createRandomWorker);

	var _notifications = __webpack_require__(174);

	var NOTIFICATION = _interopRequireWildcard(_notifications);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var emit = function emit(day) {
	  return;

	  if (day === 45) {
	    var money = Math.ceil((0, _random2.default)(2000, 15000));

	    _messageActions2.default.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_MONEY, { money: money }, true);
	    return;
	  }

	  if (day === 100) {
	    var points = Math.ceil((0, _random2.default)(50, 275));
	    _messageActions2.default.addGameEvent(GAME_EVENTS.GAME_EVENT_FREE_POINTS, { points: points });
	    return;
	  }

	  var rnd = Math.floor((0, _random2.default)(0, 50));
	  switch (rnd) {
	    // case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
	    //   let money = Math.ceil(random(2000, 15000));
	    //   messageActions.addGameEvent(rnd, { money });
	    //   break;

	    // case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
	    //   let points = Math.ceil(random(50, 275));
	    //   messageActions.addGameEvent(rnd, { points });
	    //   break;
	    case GAME_EVENTS.GAME_EVENT_COMPETITOR_CREATE:
	      if (day % 2 === 0 && _productStore2.default.getProducts().length < 16 && day > 100) {
	        // const p = mvpCreator.createCompetitorCompany(productStore.getIdea(0));
	        //
	        // messageActions.addNotification(NOTIFICATION.NOTIFICATION_COMPETITORS_ADD, p);
	      }
	      break;
	    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
	      // const teamCount = productStore.getTeam().length;
	      // // if (teamCount < 4) {
	      //   let player = workerGenerator.create();
	      //   productActions.addEmployee(player);
	      // // }
	      break;
	  }
	};

	exports.default = {
	  emit: emit
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _job = __webpack_require__(128);

	var JOB = _interopRequireWildcard(_job);

	var _skills = __webpack_require__(170);

	var _skills2 = _interopRequireDefault(_skills);

	var _random = __webpack_require__(122);

	var _random2 = _interopRequireDefault(_random);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  create: function create() {
	    var names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella', 'Lee', 'Manolo', 'James', 'Luka', 'George'];
	    var index = Math.floor((0, _random2.default)(0, names.length));
	    var name = names[index];

	    var programming = Math.floor((0, _random2.default)(101, 1000));
	    var marketing = Math.floor((0, _random2.default)(102, 1000));
	    var analyst = 0; // Math.floor(random(0, 1000));

	    var rating = void 0;
	    var task = void 0;

	    var obj = { skills: { marketing: marketing, programming: programming, analyst: analyst } };
	    if (_skills2.default.isMarketer(obj)) {
	      task = JOB.JOB_TASK_MARKETING_POINTS;
	      rating = marketing;
	    } else if (_skills2.default.isProgrammer(obj)) {
	      task = JOB.JOB_TASK_PROGRAMMER_POINTS;
	      rating = programming;
	    } else {
	      // by default - go to marketing
	      task = JOB.JOB_TASK_MARKETING_POINTS;
	      rating = marketing;
	    }

	    var baseSalary = rating * 6;

	    var salary = void 0;
	    var pricingType = 1; // Math.floor(random(0, 2));
	    switch (pricingType) {
	      case 0:
	        // only percents
	        salary = {
	          money: 0,
	          percent: Math.floor((0, _random2.default)(rating / 100, 50) / teamCount)
	        };
	        break;
	      case 1:
	        // only money
	        salary = {
	          money: Math.floor((0, _random2.default)(baseSalary * 0.75, baseSalary * 1.25)),
	          percent: 0
	        };
	        break;
	    }
	    salary.pricingType = pricingType;

	    var player = {
	      name: name,
	      skills: {
	        programming: programming,
	        marketing: marketing,
	        analyst: analyst
	      },
	      jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
	      salary: salary
	    };

	    player.task = task;

	    return player;
	  }
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(29);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(30);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Product = __webpack_require__(121);

	var _Product2 = _interopRequireDefault(_Product);

	var _productStore = __webpack_require__(89);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _productActions = __webpack_require__(155);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _logger = __webpack_require__(99);

	var _logger2 = _interopRequireDefault(_logger);

	var _companyStyles = __webpack_require__(206);

	var MANAGEMENT_STYLES = _interopRequireWildcard(_companyStyles);

	var _notifications = __webpack_require__(174);

	var NOTIFICATIONS = _interopRequireWildcard(_notifications);

	var _bonuses = __webpack_require__(207);

	var BONUSES = _interopRequireWildcard(_bonuses);

	var _messageActions = __webpack_require__(156);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var upgradeFeature = function upgradeFeature(id, fId) {
	  if (fId < 0) return;

	  var companyName = _productStore2.default.getName(id);
	  var featureName = _productStore2.default.getPrettyFeatureNameByFeatureId(id, fId);
	  var cost = _productStore2.default.getMainFeatureUpgradeCost(id, fId);

	  var hasEnoughPoints = _productStore2.default.enoughProgrammingPoints(cost, id);

	  if (hasEnoughPoints) {
	    var upgradeWillResultLeadership = _productStore2.default.isUpgradeWillResultTechBreakthrough(id, fId);

	    _productActions2.default.spendPoints(cost, 0, id);
	    _productActions2.default.improveFeature(id, 'offer', fId);

	    if (upgradeWillResultLeadership) {
	      var message = { id: id, fId: fId, companyName: companyName, featureName: featureName };
	      _messageActions2.default.addNotification(NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER, message);
	    }
	  }
	};

	var upgradeMarket = function upgradeMarket(id, mId) {};

	var _pickBonus = function _pickBonus(id, name) {
	  _productActions2.default.pickBonus(id, name);

	  _logger2.default.debug('pickBonus', id, name);
	};

	var Bot = function () {
	  function Bot(id) {
	    (0, _classCallCheck3.default)(this, Bot);

	    this.id = id;
	    var product = _productStore2.default.getProduct(id);

	    this.isBalancedCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_BALANCED;
	    this.isTechnologicalCompany = product.style === MANAGEMENT_STYLES.COMPANY_STYLE_FEATURE_ORIENTED;
	  }

	  (0, _createClass3.default)(Bot, [{
	    key: 'upgradeFeatureIfPossible',
	    value: function upgradeFeatureIfPossible() {
	      var _this = this;

	      var id = this.id;

	      var sumOfProbabilities = 0;
	      var featureProbabilities = [];

	      var features = _productStore2.default.getDefaults(id).features;
	      features.forEach(function (f) {
	        var probability = 10;

	        if (f.shareable && _this.isTechnologicalCompany) {
	          probability = 100;
	        }

	        if (!f.shareable && _this.isBalancedCompany) {
	          probability = 100;
	        }

	        featureProbabilities.push({
	          fId: f.id,
	          probability: probability,
	          min: sumOfProbabilities,
	          max: sumOfProbabilities + probability
	        });

	        sumOfProbabilities += probability;
	      });

	      var value = Math.floor(Math.random(0, 1) * sumOfProbabilities);

	      var willUpgradeId = featureProbabilities.findIndex(function (f) {
	        return f.min < value && f.max >= value;
	      });

	      upgradeFeature(id, willUpgradeId);
	    }
	  }, {
	    key: 'increaseInfluenceOnMarket',
	    value: function increaseInfluenceOnMarket() {
	      var id = this.id;

	      var analysedMarkets = _productStore2.default.getMarketingAnalysis(id);

	      var upgradeableMarkets = analysedMarkets.sort(function (a, b) {
	        return b.ROI - a.ROI;
	      }).filter(function (m) {
	        return m.canIncreaseInfluence;
	      });

	      if (upgradeableMarkets.length) {
	        // there are markets, where we can improve influence
	        upgradeMarket(id, upgradeableMarkets[0].marketId);
	      }
	    }
	  }, {
	    key: 'pickBonus',
	    value: function pickBonus() {
	      var _this2 = this;

	      return;

	      var id = this.id;

	      var bonuses = _productStore2.default.getAvailableBonuses(id);

	      var sumOfProbabilities = 0;
	      var value = void 0;

	      var probabilities = bonuses.map(function (b) {
	        var probability = 10;

	        if (_this2.isTechnologicalCompany) {
	          switch (b.name) {
	            case BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER:
	            case BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II:
	            case BONUSES.BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER:
	            case BONUSES.BONUSES_TECHNOLOGY_LEADER_MODIFIER:
	              probability = 100;
	              break;
	            default:
	              if (b.type === 'lowerDevelopmentCostOfFeature' && _productStore2.default.isShareableFeature(id, b.featureId)) {
	                probability = 100;
	              }
	              break;
	          }
	        }

	        if (_this2.isBalancedCompany) {
	          switch (b.name) {
	            case BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER:
	            case BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II:
	            case BONUSES.BONUSES_MARKETER_SUPPORT_COST_MODIFIER:
	            case BONUSES.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER:
	              probability = 100;
	              break;
	            default:
	              if (b.type === 'lowerDevelopmentCostOfFeature' && !_productStore2.default.isShareableFeature(id, b.featureId)) {
	                probability = 100;
	              }
	              break;
	          }
	        }

	        var obj = {
	          name: b.name,
	          probability: probability,
	          min: sumOfProbabilities,
	          max: sumOfProbabilities + probability
	        };

	        sumOfProbabilities += probability;

	        return obj;
	      });

	      value = Math.floor(Math.random(0, 1) * sumOfProbabilities);

	      var willPickBonusId = probabilities.findIndex(function (f) {
	        return f.min < value && f.max >= value;
	      });

	      _pickBonus(id, probabilities[willPickBonusId].name);
	    }
	  }]);
	  return Bot;
	}();

	function run(id) {
	  // upgrade features
	  // if (Math.random() > 10 / 30) return;
	  return;

	  var bot = new Bot(id);

	  bot.upgradeFeatureIfPossible();

	  // get more influence on markets
	  bot.increaseInfluenceOnMarket();

	  // pick bonuses
	  if (_productStore2.default.getBonusesAmount(id)) {
	    bot.pickBonus();
	  }

	  // improve main features
	  // improve payments
	  // improve marketing block
	  // ad campaign
	  // pick bonus
	  // rent techs
	}

	exports.default = {
	  run: run
	};

/***/ },
/* 206 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var COMPANY_STYLE_FEATURE_ORIENTED = exports.COMPANY_STYLE_FEATURE_ORIENTED = 'COMPANY_STYLE_FEATURE_ORIENTED';
	var COMPANY_STYLE_BALANCED = exports.COMPANY_STYLE_BALANCED = 'COMPANY_STYLE_BALANCED';

/***/ },
/* 207 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER = exports.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER = 'BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER';
	var BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II = exports.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II = 'BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II';

	var BONUSES_MARKETER_PERFORMANCE_MODIFIER = exports.BONUSES_MARKETER_PERFORMANCE_MODIFIER = 'BONUSES_MARKETER_PERFORMANCE_MODIFIER';
	var BONUSES_MARKETER_PERFORMANCE_MODIFIER_II = exports.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II = 'BONUSES_MARKETER_PERFORMANCE_MODIFIER_II';

	var BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER = exports.BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER = 'BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER';
	var BONUSES_MARKETER_SUPPORT_COST_MODIFIER = exports.BONUSES_MARKETER_SUPPORT_COST_MODIFIER = 'BONUSES_MARKETER_SUPPORT_COST_MODIFIER';

	var BONUSES_TECHNOLOGY_LEADER_MODIFIER = exports.BONUSES_TECHNOLOGY_LEADER_MODIFIER = 'BONUSES_TECHNOLOGY_LEADER_MODIFIER';
	var BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER = exports.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER = 'BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER';

/***/ },
/* 208 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isLastDayOfMonth = exports.isLastDayOfMonth = function isLastDayOfMonth(day) {
	  return day % 30 === 0;
	};

	var isLastDayOfYear = exports.isLastDayOfYear = function isLastDayOfYear(day) {
	  return day % 360 === 0;
	};

	var isUsualDay = exports.isUsualDay = function isUsualDay(day) {
	  return !isLastDayOfMonth(day) && !isLastDayOfYear(day);
	};

/***/ },
/* 209 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var moneySound = exports.moneySound = function moneySound() {
	  var audio = new Audio('./sounds/Metal Cling - Hit.mp3');
	  // audio.play();
	};

/***/ }
/******/ ]);