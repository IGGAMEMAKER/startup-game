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
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
	        var children, lastSimple, child, simple, i;
	        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
	        if (attributes && attributes.children) {
	            if (!stack.length) stack.push(attributes.children);
	            delete attributes.children;
	        }
	        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
	            if ('number' == typeof child) child = String(child);
	            simple = 'string' == typeof child;
	            if (simple && lastSimple) children[children.length - 1] += child; else {
	                (children || (children = [])).push(child);
	                lastSimple = simple;
	            }
	        }
	        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
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
	        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else return;
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
	        } else if ('dangerouslySetInnerHTML' === name) {
	            if (value) node.innerHTML = value.__html || '';
	        } else if ('o' == name[0] && 'n' == name[1]) {
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
	            isSvgMode = parent && void 0 !== parent.ownerSVGElement;
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
	        var ref = vnode && vnode.attributes && vnode.attributes.ref;
	        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
	        if (null == vnode) vnode = '';
	        if (isString(vnode)) {
	            if (dom && dom instanceof Text && dom.parentNode) {
	                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
	            } else {
	                if (dom) recollectNodeTree(dom);
	                dom = document.createTextNode(vnode);
	            }
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
	        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
	            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
	        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
	        diffAttributes(out, vnode.attributes, props);
	        if (ref) (props.ref = ref)(out);
	        isSvgMode = prevSvgMode;
	        return out;
	    }
	    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
	        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
	        if (len) for (var i = 0; i < len; i++) {
	            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
	            if (null != key) {
	                keyedLen++;
	                keyed[key] = _child;
	            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
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
	        var name;
	        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
	        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
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
	        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
	        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
	        if (c && isOwner && (!mountAll || c._component)) {
	            setComponentProps(c, props, 3, context, mountAll);
	            dom = c.base;
	        } else {
	            if (originalComponent && !isDirectOwner) {
	                unmountComponent(originalComponent, !0);
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
	    var EMPTY_CHILDREN = [];
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _scheduleActions = __webpack_require__(106);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _stages = __webpack_require__(112);

	var _stages2 = _interopRequireDefault(_stages);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _Menu = __webpack_require__(113);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _productPanel = __webpack_require__(136);

	var _productPanel2 = _interopRequireDefault(_productPanel);

	var _UI = __webpack_require__(115);

	var _UI2 = _interopRequireDefault(_UI);

	var _sounds = __webpack_require__(179);

	var sounds = _interopRequireWildcard(_sounds);

	var _stats = __webpack_require__(102);

	var _stats2 = _interopRequireDefault(_stats);

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
	      mode: MODE_MARKETING
	    }, _this.initialize = function () {
	      _this.getProductsFromStore();
	      // this.pickDataFromScheduleStore();

	      _this.runGame();
	    }, _this.runGame = function () {
	      if (!_this.state.pause) {
	        // gameRunner.run();
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
	      if (messageStore.isDrawable()) {
	        _this.pauseGame();
	      }
	    }, _this.getProductsFromStore = function () {
	      var productId = _this.state.id;

	      var xp = 100; // productStore.getXP(productId);
	      var mp = 100; // productStore.getManagerPoints(productId);
	      var pp = 100; // productStore.getProgrammerPoints(productId);

	      var productionMP = 100; // productStore.getMPProduction(productId);
	      var productionPP = 100; // productStore.getPPProduction(productId);

	      var money = 10000; // productStore.getMoney(productId);
	      var products = []; // productStore.getOurProducts();

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

	      _store2.default.addChangeListener(this.getProductsFromStore);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var modalActive = false; // messageStore.isDrawable();

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

	      // <Menu
	      //   id={this.state.id}
	      //   pause={state.pause}
	      //   pauseGame={this.pauseGame}
	      //   setGameSpeed={this.setGameSpeed}
	      //   day={state.day}
	      //   resources={resources}
	      //   production={production}
	      // />
	      // {this.renderProductMenuNavbar()}
	      // {this.renderProductMenu(state)}
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
	              'HI GIRLS'
	            ),
	            (0, _preact.h)('hr', null),
	            (0, _preact.h)('br', null),
	            (0, _preact.h)('br', null),
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(12).Object.getPrototypeOf;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(6);
	var $getPrototypeOf = __webpack_require__(8);

	__webpack_require__(16)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(9);
	var toObject = __webpack_require__(6);
	var IE_PROTO = __webpack_require__(10)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(11)('keys');
	var uid = __webpack_require__(15);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var global = __webpack_require__(13);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(14) ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(17);
	var core = __webpack_require__(12);
	var fails = __webpack_require__(26);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13);
	var core = __webpack_require__(12);
	var ctx = __webpack_require__(18);
	var hide = __webpack_require__(20);
	var has = __webpack_require__(9);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
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
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(21);
	var createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(25) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(22);
	var IE8_DOM_DEFINE = __webpack_require__(24);
	var toPrimitive = __webpack_require__(28);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(25) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(25) && !__webpack_require__(26)(function () {
	  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(26)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23);
	var document = __webpack_require__(13).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(23);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(32);

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

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	var $Object = __webpack_require__(12).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(25), 'Object', { defineProperty: __webpack_require__(21).f });


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(36);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(37);

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

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(60);
	module.exports = __webpack_require__(64).f('iterator');


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(40)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(42)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(41);
	var defined = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(14);
	var $export = __webpack_require__(17);
	var redefine = __webpack_require__(43);
	var hide = __webpack_require__(20);
	var Iterators = __webpack_require__(44);
	var $iterCreate = __webpack_require__(45);
	var setToStringTag = __webpack_require__(58);
	var getPrototypeOf = __webpack_require__(8);
	var ITERATOR = __webpack_require__(59)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(46);
	var descriptor = __webpack_require__(29);
	var setToStringTag = __webpack_require__(58);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(20)(IteratorPrototype, __webpack_require__(59)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(22);
	var dPs = __webpack_require__(47);
	var enumBugKeys = __webpack_require__(56);
	var IE_PROTO = __webpack_require__(10)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(27)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
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
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(21);
	var anObject = __webpack_require__(22);
	var getKeys = __webpack_require__(48);

	module.exports = __webpack_require__(25) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(49);
	var enumBugKeys = __webpack_require__(56);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(9);
	var toIObject = __webpack_require__(50);
	var arrayIndexOf = __webpack_require__(53)(false);
	var IE_PROTO = __webpack_require__(10)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51);
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(52);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(50);
	var toLength = __webpack_require__(54);
	var toAbsoluteIndex = __webpack_require__(55);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(41);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(41);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(13).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(21).f;
	var has = __webpack_require__(9);
	var TAG = __webpack_require__(59)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(11)('wks');
	var uid = __webpack_require__(15);
	var Symbol = __webpack_require__(13).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var global = __webpack_require__(13);
	var hide = __webpack_require__(20);
	var Iterators = __webpack_require__(44);
	var TO_STRING_TAG = __webpack_require__(59)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(62);
	var step = __webpack_require__(63);
	var Iterators = __webpack_require__(44);
	var toIObject = __webpack_require__(50);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(42)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(59);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(12).Symbol;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(13);
	var has = __webpack_require__(9);
	var DESCRIPTORS = __webpack_require__(25);
	var $export = __webpack_require__(17);
	var redefine = __webpack_require__(43);
	var META = __webpack_require__(68).KEY;
	var $fails = __webpack_require__(26);
	var shared = __webpack_require__(11);
	var setToStringTag = __webpack_require__(58);
	var uid = __webpack_require__(15);
	var wks = __webpack_require__(59);
	var wksExt = __webpack_require__(64);
	var wksDefine = __webpack_require__(69);
	var enumKeys = __webpack_require__(70);
	var isArray = __webpack_require__(73);
	var anObject = __webpack_require__(22);
	var isObject = __webpack_require__(23);
	var toIObject = __webpack_require__(50);
	var toPrimitive = __webpack_require__(28);
	var createDesc = __webpack_require__(29);
	var _create = __webpack_require__(46);
	var gOPNExt = __webpack_require__(74);
	var $GOPD = __webpack_require__(76);
	var $DP = __webpack_require__(21);
	var $keys = __webpack_require__(48);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(14)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(20)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(15)('meta');
	var isObject = __webpack_require__(23);
	var has = __webpack_require__(9);
	var setDesc = __webpack_require__(21).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(26)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13);
	var core = __webpack_require__(12);
	var LIBRARY = __webpack_require__(14);
	var wksExt = __webpack_require__(64);
	var defineProperty = __webpack_require__(21).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(48);
	var gOPS = __webpack_require__(71);
	var pIE = __webpack_require__(72);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(52);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(50);
	var gOPN = __webpack_require__(75).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(49);
	var hiddenKeys = __webpack_require__(56).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(72);
	var createDesc = __webpack_require__(29);
	var toIObject = __webpack_require__(50);
	var toPrimitive = __webpack_require__(28);
	var has = __webpack_require__(9);
	var IE8_DOM_DEFINE = __webpack_require__(24);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(25) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

	

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(69)('asyncIterator');


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(69)('observable');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(81);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(85);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(36);

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

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	module.exports = __webpack_require__(12).Object.setPrototypeOf;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(17);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(84).set });


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(23);
	var anObject = __webpack_require__(22);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(18)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(12).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(46) });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(89);

	var _dispatcher = __webpack_require__(90);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _sessionManager = __webpack_require__(96);

	var _sessionManager2 = _interopRequireDefault(_sessionManager);

	var _productActions = __webpack_require__(97);

	var c = _interopRequireWildcard(_productActions);

	var _scheduleActions = __webpack_require__(98);

	var ACTIONS = _interopRequireWildcard(_scheduleActions);

	var _payloads = __webpack_require__(99);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _productDescription = __webpack_require__(101);

	var _stats = __webpack_require__(102);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'PRODUCT_EVENT_CHANGE';

	var companyId = 0;
	var companies = [];
	var projects = [];
	var channels = [];

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

	  var id = p.id;

	  var change = true;

	  switch (p.type) {
	    case c.WORLD_UPGRADE:
	      channels = p.data.channels;
	      projects = p.data.projects;
	      companies = p.data.companies;
	      break;
	  }

	  if (change) {
	    _stats2.default.saveAction(p.type, p);

	    // sessionManager.saveProductStorageData(ProductStore.getStoreData());

	    store.emitChange();
	  }
	});

	exports.default = store;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

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


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flux = __webpack_require__(91);

	exports.default = new _flux.Dispatcher();

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(92);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
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

	var invariant = __webpack_require__(94);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))

/***/ }),
/* 93 */
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))

/***/ }),
/* 95 */
/***/ (function(module, exports) {

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

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getScheduleStorageData = exports.getScheduleStorageData = function getScheduleStorageData() {
	  return {
	    tasks: [], day: 1
	  };
	};

/***/ }),
/* 97 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WORLD_UPGRADE = exports.WORLD_UPGRADE = 'WORLD_UPGRADE';

	var ACTIONS_UPGRADE_CORE = exports.ACTIONS_UPGRADE_CORE = 'ACTIONS_UPGRADE_CORE';
	var ACTIONS_EXPLORE_CORE = exports.ACTIONS_EXPLORE_CORE = 'ACTIONS_EXPLORE_CORE';

	var ACTIONS_UPGRADE_OFFER = exports.ACTIONS_UPGRADE_OFFER = 'ACTIONS_UPGRADE_OFFER';
	var ACTIONS_EXPLORE_OFFER = exports.ACTIONS_EXPLORE_OFFER = 'ACTIONS_EXPLORE_OFFER';

/***/ }),
/* 98 */
/***/ (function(module, exports) {

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

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(100);

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

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(32);

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

/***/ }),
/* 101 */
/***/ (function(module, exports) {

	"use strict";

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.saveAction = saveAction;
	exports.achievement = achievement;

	var _sessionStorage = __webpack_require__(103);

	var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

	var _logger = __webpack_require__(95);

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

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(104);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(36);

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

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(90);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(98);

	var ACTIONS = _interopRequireWildcard(_scheduleActions);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _scheduleStore = __webpack_require__(107);

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

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(108);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(89);

	var _dispatcher = __webpack_require__(90);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(98);

	var c = _interopRequireWildcard(_scheduleActions);

	var _payloads = __webpack_require__(99);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _sessionManager = __webpack_require__(96);

	var _sessionManager2 = _interopRequireDefault(_sessionManager);

	var _stats = __webpack_require__(102);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'MAIN_EVENT_CHANGE';

	var _tasks = [];

	var _day = 1;

	var initialize = function initialize(_ref) {
	  var tasks = _ref.tasks,
	      day = _ref.day;

	  _tasks = tasks;
	  _day = day;
	};

	// initialize(sessionManager.getScheduleStorageData());

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
	  }], [{
	    key: 'getStoreData',
	    value: function getStoreData() {
	      return {
	        tasks: _tasks,
	        day: _day
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
	    timecost: days,
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

	    default:
	      break;
	  }

	  if (change) {
	    _stats2.default.saveAction(p.type, p);

	    store.emitChange();
	  }
	});

	exports.default = store;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(110);
	module.exports = __webpack_require__(12).Object.assign;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(17);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(111) });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(48);
	var gOPS = __webpack_require__(71);
	var pIE = __webpack_require__(72);
	var toObject = __webpack_require__(6);
	var IObject = __webpack_require__(51);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(26)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

	// import flux from '../../flux';
	//
	// import c from '../../constants';
	//
	// import logger from '../logger/logger';
	// import * as gameStages from '../../constants/game-stages';
	//
	// const getStage = () => {
	//   return flux.scheduleStore.getGamePhase();
	// };
	//
	// const setStage = (stage) => {
	//   flux.scheduleActions.setGamePhase(stage);
	// };
	//
	// const isTestMode = true;
	//
	// logger.shit('need to send stats on game phase change');
	//
	// const isTest = (target, property, descriptor) => {
	//   // logger.debug('isTest ?11', property);
	//   if (isTestMode) {
	//     // descriptor.get = function () {
	//     //   return true;
	//     // };
	//
	//     descriptor.value = () => true;
	//     descriptor.enumerable = false;
	//     descriptor.configurable = true;
	//     descriptor.writable = true;
	//
	//     // descriptor.value = () => true;
	//   }
	// };
	//
	// const proceed = (stage) => (target, property, descriptor) => {
	//   if (getStage() >= stage || isTestMode) {
	//     // descriptor.value = () => true;
	//     descriptor.value = () => true;
	//     descriptor.enumerable = false;
	//     descriptor.configurable = true;
	//     descriptor.writable = true;
	//   }
	// };
	//
	//
	// export default {
	//   // on mission completed
	//   onFirstWorkerMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_HIRED_FIRST_WORKER);
	//   },
	//
	//   onInstallPrimitiveAnalyticsMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_IMPROVED_ANALYTICS)
	//   },
	//
	//   onFirstHypothesisMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS);
	//   },
	//
	//   onFirstAdCampaignMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS);
	//   },
	//
	//   onFirstFeatureUpgradeMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE);
	//   },
	//
	//   onPaymentRatingMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS);
	//   },
	//
	//   onInstallPaymentModuleMissionCompleted() {
	//     setStage(gameStages.GAME_STAGE_PAYMENTS_INSTALLED);
	//   },
	//
	//
	//   // mission checker
	//   isFirstWorkerMission() {
	//     return getStage() === gameStages.GAME_STAGE_GAME_STARTED;
	//   },
	//
	//   isInstallPrimitiveAnalyticsMission() {
	//     return getStage() === gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
	//   },
	//
	//   isFirstHypothesisMission() {
	//     return getStage() === gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
	//     // return getStage() === gameStages.GAME_STAGE_LEARNED_SPEEDER;
	//   },
	//
	//   isFirstAdCampaignMission() {
	//     return getStage() === gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
	//   },
	//
	//   isFirstFeatureMission() {
	//     return getStage() === gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	//   },
	//
	//   isPaymentRatingMission() {
	//     return getStage() === gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE;
	//   },
	//
	//   isInstallPaymentModuleMission() {
	//     return getStage() === gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	//   },
	//
	//   // can show some tabs region
	//
	//   @isTest
	//   canShowHypothesisTab() {
	//     return getStage() >= gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
	//   },
	//   @isTest
	//   canShowUpperTabInMenu() {
	//     return getStage() >= gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
	//   },
	//   @isTest
	//   canShowMetricsTab() {
	//     return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	//   },
	//   @isTest
	//   canShowMainFeatureTab() {
	//     return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
	//   },
	//
	//   @isTest
	//   canShowPaymentsTab() {
	//     return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	//   },
	//
	//   @isTest
	//   canShowCompetitorsTab() {
	//     return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	//   },
	//
	//   @isTest
	//   canShowClientsTab() {
	//     return false;
	//     // return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
	//   },
	//
	//   @isTest
	//   @proceed(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS)
	//   canShowBonusesTab() {
	//     return false;
	//   },
	//
	//   @isTest
	//   canShowTeamTabs() {
	//     const s = getStage();
	//
	//     if (s === gameStages.GAME_STAGE_GAME_STARTED) return true;
	//
	//     if (s > gameStages.GAME_STAGE_GAME_STARTED && s < gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE) return false;
	//
	//     return true;
	//   },
	//
	//   @isTest
	//   canShowAdTab() {
	//     return getStage() >= gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
	//   },
	//
	//   @isTest
	//   canShowSegments() {
	//     return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS
	//   },
	//
	//   @isTest
	//   canShowChurnFeatures() {
	//     return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS
	//   }
	// };
	"use strict";

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _moneyDifference = __webpack_require__(114);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _stages = __webpack_require__(112);

	var _stages2 = _interopRequireDefault(_stages);

	var _UI = __webpack_require__(115);

	var _UI2 = _interopRequireDefault(_UI);

	var _shortenValue = __webpack_require__(135);

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

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var calculate = function calculate(id) {
	  var ourCompanyId = id ? id : 0;
	  var products = _store2.default.getOurProducts();

	  // check income
	  var income = products.map(function (p, i) {
	    return _store2.default.getProductIncome(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  }, 0);

	  var productExpenses = products.map(function (p, i) {
	    return _store2.default.getProductExpenses(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  }, 0);

	  var teamExpenses = _store2.default.getTeamExpenses();

	  var expenses = productExpenses + teamExpenses;

	  var byProductIncome = products.map(function (p, i) {
	    return { name: p.name, income: _store2.default.getProductIncome(i) };
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

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(116);

	var _Button2 = _interopRequireDefault(_Button);

	var _Modal = __webpack_require__(118);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Notification = __webpack_require__(122);

	var _Notification2 = _interopRequireDefault(_Notification);

	var _Range = __webpack_require__(123);

	var _Range2 = _interopRequireDefault(_Range);

	var _Select = __webpack_require__(124);

	var _Select2 = _interopRequireDefault(_Select);

	var _arrows = __webpack_require__(125);

	var _arrows2 = _interopRequireDefault(_arrows);

	var _Info = __webpack_require__(126);

	var _Info2 = _interopRequireDefault(_Info);

	var _Bar = __webpack_require__(128);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _Changeable = __webpack_require__(129);

	var _Changeable2 = _interopRequireDefault(_Changeable);

	var _ColoredValue = __webpack_require__(130);

	var _ColoredValue2 = _interopRequireDefault(_ColoredValue);

	var _SmallIcon = __webpack_require__(132);

	var _SmallIcon2 = _interopRequireDefault(_SmallIcon);

	var _MeduimIcon = __webpack_require__(133);

	var _MeduimIcon2 = _interopRequireDefault(_MeduimIcon);

	var _BigIcon = __webpack_require__(134);

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

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends2 = __webpack_require__(117);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(108);

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

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _messageStore = __webpack_require__(119);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _messageActions = __webpack_require__(120);

	var c = _interopRequireWildcard(_messageActions);

	var _eventRenderer = __webpack_require__(121);

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

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(89);

	var _dispatcher = __webpack_require__(90);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _messageActions = __webpack_require__(120);

	var c = _interopRequireWildcard(_messageActions);

	var _payloads = __webpack_require__(99);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'MAIN_EVENT_CHANGE';

	var _messages = [];
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

/***/ }),
/* 120 */
/***/ (function(module, exports) {

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

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(104);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _preact = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	exports.default = function (message, id, onClose) {
	  // switch (message.data.type) {
	  // }

	  return (0, _preact.h)(
	    'div',
	    null,
	    'render modal body ',
	    (0, _stringify2.default)(message)
	  );
	};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _stringify = __webpack_require__(104);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _messageStore = __webpack_require__(119);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _eventRenderer = __webpack_require__(121);

	var _eventRenderer2 = _interopRequireDefault(_eventRenderer);

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

	      // switch (message.type) {
	      //   case NOTIFICATIONS.NOTIFICATION_FEATURE_UPGRADED:
	      //     body = <span>Компания "{data.companyName}" улучшает технологию "{data.featureName}"</span>;
	      //     break;
	      //   case NOTIFICATIONS.NOTIFICATION_FEATURE_TECH_LEADER:
	      //     body = <span>Компания "{data.companyName}" становится лидером в технологии "{data.featureName}"!</span>;
	      //     break;
	      //   case NOTIFICATIONS.NOTIFICATION_MARKETS_INFLUENCE_INCREASED:
	      //     body = <span>Компания "{data.companyName}" усиливает влияние на рынке "{data.marketName}"! Наши доходы снизились</span>;
	      //     break;
	      //   case NOTIFICATIONS.NOTIFICATION_RENT_EXPIRED:
	      //     body = <span>Окончание срока аренды: Компания "{JSON.stringify(data)}"</span>;
	      //     break;
	      //   case NOTIFICATIONS.NOTIFICATION_PAYMENTS_UPGRADED:
	      //     body = <span>Компания "{data.companyName}" повышает свои доходы за счёт улучшения блока монетизации</span>;
	      //     break;
	      //   case NOTIFICATIONS.NOTIFICATION_COMPETITORS_ADD:
	      //     body = <span>У нас появился новый конкурент: компания "{data.name}"!</span>;
	      //     break;
	      //   default:
	      //     body = JSON.stringify(message);
	      //     break;
	      // }

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

	// import * as NOTIFICATIONS from '../../../shared/constants';

	// import * as c from '../../../shared/constants/actions/message-actions';


	exports.default = Modal;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 125 */
/***/ (function(module, exports) {

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

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _objectDestructuringEmpty2 = __webpack_require__(127);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(115);

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

/***/ }),
/* 127 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _coloringRange = __webpack_require__(131);

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

/***/ }),
/* 131 */
/***/ (function(module, exports) {

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

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

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

/***/ }),
/* 135 */
/***/ (function(module, exports) {

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

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _DeveloperTab = __webpack_require__(137);

	var _DeveloperTab2 = _interopRequireDefault(_DeveloperTab);

	var _ImprovementTab = __webpack_require__(167);

	var _ImprovementTab2 = _interopRequireDefault(_ImprovementTab);

	var _metrics = __webpack_require__(169);

	var _metrics2 = _interopRequireDefault(_metrics);

	var _competitors = __webpack_require__(171);

	var _competitors2 = _interopRequireDefault(_competitors);

	var _BugPanel = __webpack_require__(173);

	var _BugPanel2 = _interopRequireDefault(_BugPanel);

	var _Marketing = __webpack_require__(174);

	var _Marketing2 = _interopRequireDefault(_Marketing);

	var _shortenValue = __webpack_require__(135);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	var _stages = __webpack_require__(112);

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
	            _store2.default.getDescriptionOfProduct(id)
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

	      var ourCompanyCost = _store2.default.getCompanyCostStructured(id);

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

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _list = __webpack_require__(138);

	var _list2 = _interopRequireDefault(_list);

	var _stages = __webpack_require__(112);

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

	      var XP = _store2.default.getXP(id);

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

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productActions = __webpack_require__(139);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _UI = __webpack_require__(115);

	var _UI2 = _interopRequireDefault(_UI);

	var _stages = __webpack_require__(112);

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

	        var upgradeCost = _store2.default.getFeatureIncreaseXPCost(id);
	        var upgradeable = _store2.default.getXP(id) >= upgradeCost;

	        var leaderInTech = _store2.default.getLeaderInTech(featureId);
	        var isWeAreLeaders = leaderInTech.id === 0;

	        var profitPhrase = void 0,
	            text = void 0,
	            current = void 0;

	        current = product.features.offer[featureId];

	        if (isWeAreLeaders) {
	          profitPhrase = (0, _preact.h)(
	            'div',
	            null,
	            '\u0421\u043E\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u043F\u0440\u043E\u0440\u044B\u0432!'
	          );
	          text = 'Улучшить';
	        } else {
	          var benefit = _store2.default.getBenefitOnFeatureImprove(id, featureId);

	          profitPhrase = '+' + benefit + '$';
	          text = '\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C';
	        }

	        return (0, _preact.h)(
	          'tr',
	          { key: 'feature-' + featureId },
	          (0, _preact.h)(
	            'td',
	            null,
	            (0, _preact.h)(
	              'div',
	              null,
	              current
	            )
	          ),
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

	      var product = _store2.default.getProduct(id);
	      var defaults = _store2.default.getDefaults(id);

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
	              null,
	              '\u0423\u0440\u043E\u0432\u0435\u043D\u044C'
	            ),
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

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(90);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _productActions = __webpack_require__(97);

	var ACTIONS = _interopRequireWildcard(_productActions);

	var _logger = __webpack_require__(95);

	var _logger2 = _interopRequireDefault(_logger);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _sendData = __webpack_require__(140);

	var transport = _interopRequireWildcard(_sendData);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sessionId = 'asd1-9jd-asjdaswqiwje';

	var upgradeWorld = function upgradeWorld(result) {
	  _dispatcher2.default.dispatch({
	    type: ACTIONS.WORLD_UPGRADE,
	    data: result
	  });
	};

	var sendData = function sendData(url, data) {
	  return axios.post(url, data).then(upgradeWorld);
	};

	exports.default = {
	  improveFeature: function improveFeature(projectId, problemId) {
	    sendData('/solutions/upgrade', {
	      projectId: projectId,
	      problemId: problemId
	    });
	  }
	};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(141);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (dispatchType, data) {}; //
	// // import WebSocket from 'ws';
	// const ws = new WebSocket('ws://localhost:8080', {
	//   perMessageDeflate: false
	// });
	//
	// ws.on('open', function open() {
	//   ws.send('something');
	// });
	//
	// ws.on('message', function incoming(data) {
	//   console.log(data);
	// });
	//

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(142);

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);
	var bind = __webpack_require__(144);
	var Axios = __webpack_require__(146);
	var defaults = __webpack_require__(147);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(164);
	axios.CancelToken = __webpack_require__(165);
	axios.isCancel = __webpack_require__(161);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(166);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(144);
	var isBuffer = __webpack_require__(145);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 145 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(147);
	var utils = __webpack_require__(143);
	var InterceptorManager = __webpack_require__(158);
	var dispatchRequest = __webpack_require__(159);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
	  config.method = config.method.toLowerCase();

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(143);
	var normalizeHeaderName = __webpack_require__(148);

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(149);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(149);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(143);
	var settle = __webpack_require__(150);
	var buildURL = __webpack_require__(153);
	var parseHeaders = __webpack_require__(154);
	var isURLSameOrigin = __webpack_require__(155);
	var createError = __webpack_require__(151);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(156);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(157);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(151);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(152);

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 152 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 156 */
/***/ (function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);
	var transformData = __webpack_require__(160);
	var isCancel = __webpack_require__(161);
	var defaults = __webpack_require__(147);
	var isAbsoluteURL = __webpack_require__(162);
	var combineURLs = __webpack_require__(163);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(143);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ }),
/* 161 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 162 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 163 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 164 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(164);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ }),
/* 166 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _Exploration = __webpack_require__(168);

	var _Exploration2 = _interopRequireDefault(_Exploration);

	var _stages = __webpack_require__(112);

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

	      var XP = _store2.default.getXP(id);

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

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _stringify = __webpack_require__(104);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _UI = __webpack_require__(115);

	var _UI2 = _interopRequireDefault(_UI);

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

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Exploration.__proto__ || (0, _getPrototypeOf2.default)(Exploration)).call.apply(_ref, [this].concat(args))), _this), _this.pickData = function () {
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      return function () {
	        _this.setState({
	          info: _store2.default.getExplorationData(id)
	        });
	      };
	    }, _this.renderClientTab = function (state) {
	      var list = state.info.clients.map(function (c, i) {
	        if (c.explored) {
	          return (0, _preact.h)(
	            'div',
	            null,
	            'Explored: ',
	            c.name
	          );
	        }

	        if (c.explorable) {
	          return (0, _preact.h)(
	            'div',
	            null,
	            'Explorable: ',
	            c.name,
	            ' for ',
	            c.explorationCost,
	            _UI2.default.icons.xp
	          );
	        }
	      });

	      return (0, _preact.h)(
	        'div',
	        null,
	        list
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Exploration, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.pickData();

	      _store2.default.addChangeListener(this.pickData);
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref2, state) {
	      var id = _ref2.id;

	      if (!state.info) return (0, _preact.h)('div', null);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h2',
	          { className: 'center' },
	          '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'
	        ),
	        this.renderClientTab(state),
	        (0, _stringify2.default)(state.clients),
	        (0, _preact.h)('br', null),
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

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _round = __webpack_require__(170);

	var _round2 = _interopRequireDefault(_round);

	var _moneyDifference = __webpack_require__(114);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _shortenValue = __webpack_require__(135);

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

	      var income = (0, _round2.default)(_store2.default.getProductIncome(id));

	      var data = _moneyDifference2.default.structured(id);

	      var productIncome = _store2.default.getMarketIncomeList(id).map(function (item) {
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

/***/ }),
/* 170 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  return Math.ceil(value * 100) / 100;
	};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _competitor = __webpack_require__(172);

	var _competitor2 = _interopRequireDefault(_competitor);

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
	      var competitors = _store2.default.getCompetitorsList();

	      var competitorList = competitors.map(function (c) {
	        return c.companyId;
	      }).sort(function (c1, c2) {
	        var cost1 = _store2.default.getCompanyCost(c1);
	        var cost2 = _store2.default.getCompanyCost(c2);

	        return cost2 - cost1;
	      }).map(function (companyId) {
	        return (0, _preact.h)(_competitor2.default, {
	          name: _store2.default.getName(companyId),
	          cost: _store2.default.getCompanyCost(companyId),
	          income: _store2.default.getProductIncome(companyId),
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

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _shortenValue = __webpack_require__(135);

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

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _productActions = __webpack_require__(139);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _UI = __webpack_require__(115);

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
	        var isFixable = _store2.default.isBugFixable(productId, bug.id);

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


	      var list = _store2.default.getBugs(props.id);
	      // const loyaltyLoss = productStore.getBugLoyaltyLoss(props.id);
	      var loyaltyLoss = Math.ceil(_store2.default.getBugLoyaltyLoss(props.id) * 100);

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

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _ClientRetention = __webpack_require__(175);

	var _ClientRetention2 = _interopRequireDefault(_ClientRetention);

	var _ClientAcquisition = __webpack_require__(177);

	var _ClientAcquisition2 = _interopRequireDefault(_ClientAcquisition);

	var _SegmentExplorer = __webpack_require__(178);

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
	        markets: _store2.default.getMarketsWithExplorationStatuses(_this.props.id),
	        exploredMarkets: _store2.default.getExploredMarkets(_this.props.id),
	        explorableMarkets: _store2.default.getExplorableMarkets(_this.props.id)
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

	      _store2.default.addChangeListener(this.pickMarketData);
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

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _productActions = __webpack_require__(139);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _shortenValue = __webpack_require__(135);

	var _shortenValue2 = _interopRequireDefault(_shortenValue);

	var _coloredRating = __webpack_require__(176);

	var _coloredRating2 = _interopRequireDefault(_coloredRating);

	var _UI = __webpack_require__(115);

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

	      var upgrade = _store2.default.getBestFeatureUpgradeVariantOnMarket(id, marketId);

	      if (!upgrade.loyaltyChange) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439 :('
	        );
	      }

	      var loyaltyChange = Math.ceil(upgrade.loyaltyChange * 1000) / 10;
	      var ratingChange = Math.ceil(upgrade.ratingChange * 100) / 100;

	      var XP = _store2.default.getXP(id);

	      var cost = _store2.default.getFeatureIncreaseXPCost(id);

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
	      var loyalty = _store2.default.getSegmentLoyalty(id, marketId);

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
	      var loyaltyStructured = _store2.default.getSegmentLoyaltyStructured(id, marketId);

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
	      var loyalty = _store2.default.getSegmentLoyalty(id, marketId);
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


	      var rating = _store2.default.getRating(id, marketId);

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

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _coloringRange = __webpack_require__(131);

	var _coloringRange2 = _interopRequireDefault(_coloringRange);

	var _round = __webpack_require__(170);

	var _round2 = _interopRequireDefault(_round);

	var _UI = __webpack_require__(115);

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

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _store = __webpack_require__(88);

	var _store2 = _interopRequireDefault(_store);

	var _productActions = __webpack_require__(139);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _UI = __webpack_require__(115);

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

	      var expertise = _store2.default.getMarketingKnowledge(id, marketId);

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

	      var isCanGrabMoreClients = _store2.default.isCanGrabMoreClients(id, marketId, amountOfClients, price);

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

	      var clients = _store2.default.getClientsOnMarket(id, marketId);

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

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(3);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(30);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(31);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(35);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(115);

	var _UI2 = _interopRequireDefault(_UI);

	var _productActions = __webpack_require__(139);

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

/***/ }),
/* 179 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var moneySound = exports.moneySound = function moneySound() {
	  var audio = new Audio('./sounds/Metal Cling - Hit.mp3');
	  // audio.play();
	};

/***/ })
/******/ ]);