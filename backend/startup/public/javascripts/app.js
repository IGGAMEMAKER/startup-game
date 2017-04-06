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

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _ProductMenu = __webpack_require__(93);

	var _ProductMenu2 = _interopRequireDefault(_ProductMenu);

	var _Schedule = __webpack_require__(97);

	var _Schedule2 = _interopRequireDefault(_Schedule);

	var _Staff = __webpack_require__(110);

	var _Staff2 = _interopRequireDefault(_Staff);

	var _Menu = __webpack_require__(119);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Economics = __webpack_require__(143);

	var _Economics2 = _interopRequireDefault(_Economics);

	var _Product = __webpack_require__(145);

	var _Product2 = _interopRequireDefault(_Product);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _messageStore = __webpack_require__(132);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _game = __webpack_require__(157);

	var _game2 = _interopRequireDefault(_game);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _UI = __webpack_require__(129);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var GAME_MODE_PRODUCTS = 'GAME_MODE_PRODUCTS';
	var GAME_MODE_PRODUCT = 'GAME_MODE_PRODUCT';
	var GAME_MODE_ECONOMICS = 'GAME_MODE_ECONOMICS';
	var GAME_MODE_PLAYER = 'GAME_MODE_PLAYER';
	var GAME_MODE_ADS = 'GAME_MODE_ADS';
	var GAME_MODE_STAFF = 'GAME_MODE_STAFF';

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

	      pause: true,
	      gameSpeed: 3,
	      timerId: null,

	      id: 0, // productID
	      mode: GAME_MODE_PRODUCT
	    }, _this.initialize = function () {
	      _this.getProductsFromStore();
	      _this.pickDataFromScheduleStore();
	    }, _this.runTimer = function () {
	      var timerId = _this.state.timerId;
	      var speed = _this.state.gameSpeed;

	      if (timerId) {
	        clearInterval(timerId);
	      }

	      timerId = setInterval(_game2.default.run, 1000 / speed);
	      return timerId;
	    }, _this.setGameSpeed = function (speed) {
	      return function () {
	        var timerId = _this.runTimer();
	        // const object = { gameSpeed: speed };

	        // object.timerId = timerId;
	        // object.pause = false;
	        // this.setState(object);
	        _this.setState({
	          timerId: timerId,
	          pause: false,
	          gameSpeed: speed
	        });
	      };
	    }, _this.pauseGame = function () {
	      var timerId = _this.state.timerId;
	      clearInterval(timerId);
	      _this.setState({ pause: true, timerId: null });
	    }, _this.resumeGame = function () {
	      var timerId = _this.runTimer();
	      _this.setState({
	        pause: false,
	        timerId: timerId
	      });
	    }, _this.getMessages = function () {
	      _logger2.default.debug('MessageStore callback pausing');
	      if (_messageStore2.default.isDrawable()) {
	        _this.pauseGame();
	      }
	    }, _this.pickDataFromScheduleStore = function () {
	      _this.setState({
	        day: _scheduleStore2.default.getDay(),
	        tasks: _scheduleStore2.default.getTasks()
	      });
	    }, _this.getProductsFromStore = function () {
	      _this.setState({
	        products: _productStore2.default.getProducts()
	      });
	    }, _this.renderProducts = function (state) {
	      return state.products.map(function (p, i) {
	        return (0, _assign2.default)(p, { rating: _productStore2.default.getRating(i) });
	      }).map(function (p, i) {
	        return (0, _preact.h)(
	          'div',
	          { key: 'product' + i },
	          (0, _preact.h)(_ProductMenu2.default, { product: p, i: i, onChooseProject: function onChooseProject(event) {
	              return _this.onRenderProjectMenu(i);
	            } })
	        );
	      });
	    }, _this.renderProductMenu = function (state) {
	      if (!state.products.length) return (0, _preact.h)('div', null);

	      var id = state.id;
	      var product = state.products[id];

	      return (0, _preact.h)(_Product2.default, { product: product, id: id });
	    }, _this.onRenderProjectMenu = function (i) {
	      _this.setState({ mode: GAME_MODE_PRODUCT, id: i });
	    }, _this.onRenderProjectsMenu = function () {
	      if (_this.state.products.length === 1) {
	        _this.onRenderProjectMenu(0);
	        return;
	      }

	      _this.setState({ mode: GAME_MODE_PRODUCTS });
	    }, _this.onRenderEconomicsMenu = function () {
	      _this.setState({ mode: GAME_MODE_ECONOMICS });
	    }, _this.onRenderStaffMenu = function () {
	      _this.setState({ mode: GAME_MODE_STAFF });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  // increaseGameSpeed = () => {
	  //   const speed = this.state.gameSpeed + 1;
	  //   const object = { gameSpeed: speed };
	  //
	  //   let timerId = this.state.timerId;
	  //
	  //   if (timerId) {
	  //     clearInterval(timerId);
	  //   }
	  //
	  //   timerId = setInterval(gameRunner.run, 1000 / speed);
	  //   object.timerId = timerId;
	  //   this.setState(object);
	  // };

	  (0, _createClass3.default)(Game, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.initialize();

	      _productStore2.default.addChangeListener(this.getProductsFromStore);

	      _scheduleStore2.default.addChangeListener(this.pickDataFromScheduleStore);

	      _messageStore2.default.addChangeListener(this.getMessages);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var body = '';

	      switch (state.mode) {
	        case GAME_MODE_ECONOMICS:
	          body = (0, _preact.h)(_Economics2.default, null);
	          break;
	        case GAME_MODE_PRODUCTS:
	          body = this.renderProducts(state);
	          break;
	        case GAME_MODE_STAFF:
	          body = (0, _preact.h)(_Staff2.default, null);
	          break;
	        case GAME_MODE_PRODUCT:
	          body = this.renderProductMenu(state);
	          break;
	      }

	      // <div>
	      //   <h3>Два вопроса бизнеса</h3>
	      //   <div>Готовы ли люди этим пользоваться</div>
	      //   <div>Сколько они готовы заплатить за это</div>
	      // </div>
	      return (0, _preact.h)(
	        'div',
	        { className: 'body-background' },
	        (0, _preact.h)(_UI2.default.Modal, null),
	        (0, _preact.h)(
	          'div',
	          { className: 'body-wrapper' },
	          (0, _preact.h)(_Menu2.default, {
	            pauseGame: this.pauseGame,
	            resumeGame: this.resumeGame,
	            setGameSpeed: this.setGameSpeed,
	            onRenderProjectsMenu: this.onRenderProjectsMenu,
	            onRenderEconomicsMenu: this.onRenderEconomicsMenu,
	            onRenderStaffMenu: this.onRenderStaffMenu,
	            pause: state.pause,
	            day: state.day
	          }),
	          (0, _preact.h)('br', null),
	          (0, _preact.h)('hr', null),
	          (0, _preact.h)(_Schedule2.default, null),
	          body,
	          (0, _preact.h)('br', null),
	          (0, _preact.h)('hr', null)
	        )
	      );
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
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(21)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
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
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
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
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(22)
	  , gOPS     = __webpack_require__(37)
	  , pIE      = __webpack_require__(38)
	  , toObject = __webpack_require__(39)
	  , IObject  = __webpack_require__(26)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function(){
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(23)
	  , enumBugKeys = __webpack_require__(36);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(24)
	  , toIObject    = __webpack_require__(25)
	  , arrayIndexOf = __webpack_require__(29)(false)
	  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

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
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(26)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(27);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(25)
	  , toLength  = __webpack_require__(30)
	  , toIndex   = __webpack_require__(32);
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(31)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys')
	  , uid    = __webpack_require__(35);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 37 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 38 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	module.exports = __webpack_require__(8).Object.getPrototypeOf;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(39)
	  , $getPrototypeOf = __webpack_require__(43);

	__webpack_require__(44)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(24)
	  , toObject    = __webpack_require__(39)
	  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(6)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(47);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(51);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(52);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(71);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(66);
	module.exports = __webpack_require__(70).f('iterator');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(55)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(56)(String, 'String', function(iterated){
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31)
	  , defined   = __webpack_require__(28);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(57)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(58)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(24)
	  , Iterators      = __webpack_require__(59)
	  , $iterCreate    = __webpack_require__(60)
	  , setToStringTag = __webpack_require__(64)
	  , getPrototypeOf = __webpack_require__(43)
	  , ITERATOR       = __webpack_require__(65)('iterator')
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
/* 57 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(61)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(64)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(65)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(62)
	  , enumBugKeys = __webpack_require__(36)
	  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(63).appendChild(iframe);
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(22);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(24)
	  , TAG = __webpack_require__(65)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(34)('wks')
	  , uid        = __webpack_require__(35)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(59)
	  , TO_STRING_TAG = __webpack_require__(65)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(68)
	  , step             = __webpack_require__(69)
	  , Iterators        = __webpack_require__(59)
	  , toIObject        = __webpack_require__(25);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(56)(Array, 'Array', function(iterated, kind){
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
/* 68 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(65);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(84);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(24)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(58)
	  , META           = __webpack_require__(74).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(64)
	  , uid            = __webpack_require__(35)
	  , wks            = __webpack_require__(65)
	  , wksExt         = __webpack_require__(70)
	  , wksDefine      = __webpack_require__(75)
	  , keyOf          = __webpack_require__(76)
	  , enumKeys       = __webpack_require__(77)
	  , isArray        = __webpack_require__(78)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(61)
	  , gOPNExt        = __webpack_require__(79)
	  , $GOPD          = __webpack_require__(81)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(22)
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
	  __webpack_require__(80).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(38).f  = $propertyIsEnumerable;
	  __webpack_require__(37).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(57)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(35)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(24)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(57)
	  , wksExt         = __webpack_require__(70)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(22)
	  , toIObject = __webpack_require__(25);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(22)
	  , gOPS    = __webpack_require__(37)
	  , pIE     = __webpack_require__(38);
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(27);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(25)
	  , gOPN      = __webpack_require__(80).f
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(23)
	  , hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(38)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(24)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75)('asyncIterator');

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75)('observable');

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(86);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(90);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(51);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(89).set});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(14)
	  , anObject = __webpack_require__(13);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(9)(Function.call, __webpack_require__(81).f(Object.prototype, '__proto__').set, 2);
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	var $Object = __webpack_require__(8).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(61)});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(94);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _ProductShortTab = __webpack_require__(95);

	var _ProductShortTab2 = _interopRequireDefault(_ProductShortTab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ProductMenu = function (_Component) {
	  (0, _inherits3.default)(ProductMenu, _Component);

	  function ProductMenu() {
	    (0, _classCallCheck3.default)(this, ProductMenu);
	    return (0, _possibleConstructorReturn3.default)(this, (ProductMenu.__proto__ || (0, _getPrototypeOf2.default)(ProductMenu)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ProductMenu, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props,
	          state = this.state;
	      // console.log('ProductMenu', props, state);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(_ProductShortTab2.default, (0, _extends3.default)({}, props, { onChooseProject: props.onChooseProject }))
	      );
	    }
	  }]);
	  return ProductMenu;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = ProductMenu;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(3);

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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	var ProductShortTab = function (_Component) {
	  (0, _inherits3.default)(ProductShortTab, _Component);

	  function ProductShortTab() {
	    (0, _classCallCheck3.default)(this, ProductShortTab);
	    return (0, _possibleConstructorReturn3.default)(this, (ProductShortTab.__proto__ || (0, _getPrototypeOf2.default)(ProductShortTab)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ProductShortTab, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;


	      var p = props.product;
	      var i = props.i;

	      var text = (0, _preact.h)(
	        'div',
	        { style: { padding: 15 }, onClick: props.onChooseProject },
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u2116 ',
	          i + 1
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          p.name
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0422\u0438\u043F: ',
	          p.idea
	        ),
	        (0, _preact.h)(
	          'i',
	          null,
	          '\u0420\u0435\u0439\u0442\u0438\u043D\u0433 ',
	          (0, _round2.default)(p.rating),
	          '/10'
	        ),
	        (0, _preact.h)('br', null)
	      );
	      // <a href="#" style={{cursor: 'pointer'}}>Улучшения</a>
	      // <div>Технический долг: {p.KPI.debt}</div>
	      // {JSON.stringify(p)}

	      return (0, _preact.h)(
	        'div',
	        null,
	        text
	      );
	    }
	  }]);
	  return ProductShortTab;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';


	exports.default = ProductShortTab;

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  return Math.ceil(value * 100) / 100;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _workSpeed = __webpack_require__(99);

	var _percentify = __webpack_require__(100);

	var _percentify2 = _interopRequireDefault(_percentify);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schedule = function (_Component) {
	  (0, _inherits3.default)(Schedule, _Component);

	  function Schedule() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Schedule);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Schedule.__proto__ || (0, _getPrototypeOf2.default)(Schedule)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      tasks: [],
	      collapse: false
	    }, _this.getTasks = function () {
	      _this.setState({
	        tasks: _scheduleStore2.default.getTasks()
	      });
	    }, _this.toggleTasks = function () {
	      _this.setState({ collapse: !_this.state.collapse });
	    }, _this.renderTask = function (task, i) {
	      var description = task.description;
	      var progress = task.progress + '/' + task.timecost;

	      var percentage = Math.floor(task.progress * 100 / task.timecost) + ' %';

	      var days = Math.ceil((task.timecost - task.progress) / task.speed);

	      var result = void 0;
	      if (task.inProgress) {
	        result = (0, _preact.h)(
	          'b',
	          null,
	          description,
	          ' (\u0415\u0449\u0451 ',
	          days,
	          ' \u0434\u043D\u0435\u0439, ',
	          progress,
	          ', ',
	          percentage,
	          ')'
	        );
	      } else {
	        result = (0, _preact.h)(
	          'div',
	          null,
	          description,
	          ' (\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F: ',
	          progress,
	          ', ',
	          percentage,
	          ')'
	        );
	      }

	      return (0, _preact.h)(
	        'div',
	        { key: 'task' + i },
	        result
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Schedule, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      this.getTasks();

	      _scheduleStore2.default.addChangeListener(function () {
	        _this2.getTasks();
	      });
	    }
	  }, {
	    key: 'render',


	    // render(props: PropsType, state: StateType) {
	    value: function render() {
	      var tasks = this.state.tasks;

	      var collapse = this.state.collapse;

	      if (!tasks.length) return (0, _preact.h)('div', null);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h4',
	          { onClick: this.toggleTasks },
	          '\u0422\u0435\u043A\u0443\u0449\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 (',
	          collapse ? tasks.length : '-',
	          ')'
	        ),
	        tasks.length && !collapse ? tasks.map(this.renderTask) : '',
	        (0, _preact.h)('br', null),
	        (0, _preact.h)('hr', null)
	      );
	    }
	  }]);
	  return Schedule;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';


	exports.default = Schedule;
	;

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  log: console.log,
	  debug: console.log,
	  error: console.error,
	  shit: function shit(text) {
	    // console.log(`GOVNOKOD ${text}`);
	  },
	  actions: function actions(sessionId, userId, action) {}

	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// export const HOURS_A_DAY = 8;
	var WORK_SPEED_NORMAL = exports.WORK_SPEED_NORMAL = 8;
	var WORK_SPEED_HAS_MAIN_JOB = exports.WORK_SPEED_HAS_MAIN_JOB = 3;

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  return Math.ceil(value * 10000) / 100;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(102);

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(108);

	var c = _interopRequireWildcard(_scheduleActions);

	var _payloads = __webpack_require__(109);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _workSpeed = __webpack_require__(99);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'MAIN_EVENT_CHANGE';

	var _tasks = [];
	// let _tasks = [{
	//   description: 'improve main feature',
	//   inProgress: true,
	//   isSynchronous: true,
	//   progress: 1,
	//   timecost: 15 * WORK_SPEED_HAS_MAIN_JOB,
	//   speed: WORK_SPEED_HAS_MAIN_JOB,
	// }, {
	//   description: 'improve secondary feature',
	//   inProgress: true,
	//   isSynchronous: false,
	//   progress: 8,
	//   timecost: 2 * WORK_SPEED_NORMAL,
	//   speed: WORK_SPEED_NORMAL
	// }, {
	//   description: 'improve analytics',
	//   inProgress: false,
	//   isSynchronous: true,
	//   progress: 1,
	//   timecost: 2 * WORK_SPEED_NORMAL,
	//   speed: WORK_SPEED_NORMAL
	// }];
	var _day = 0;
	var _workHours = 4;

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

	      tasks.forEach(function (taskId, i) {
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

	  if (change) store.emitChange();
	});

	exports.default = store;

/***/ },
/* 102 */
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flux = __webpack_require__(104);

	exports.default = new _flux.Dispatcher();

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(105);


/***/ },
/* 105 */
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

	var invariant = __webpack_require__(107);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106)))

/***/ },
/* 106 */
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
/* 107 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106)))

/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SCHEDULE_ACTIONS_DAY_TICK = exports.SCHEDULE_ACTIONS_DAY_TICK = 'SCHEDULE_ACTIONS_DAY_TICK';
	var SCHEDULE_ACTIONS_TASKS_ADD = exports.SCHEDULE_ACTIONS_TASKS_ADD = 'SCHEDULE_ACTIONS_TASKS_ADD';
	var SCHEDULE_ACTIONS_TASKS_REMOVE = exports.SCHEDULE_ACTIONS_TASKS_REMOVE = 'SCHEDULE_ACTIONS_TASKS_REMOVE';
	var SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS = exports.SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS = 'SCHEDULE_ACTIONS_TASKS_INCREASE_PROGRESS';

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
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
	  },

	  playerStorePayload: {
	    name: 'playerStorePayload',
	    type: {
	      type: String,
	      amount: Number
	    }
	  },
	  messageStorePayload: {
	    name: 'messageStorePayload',
	    type: {
	      type: String,
	      amount: Number
	    }
	  }
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _job = __webpack_require__(111);

	var JOB = _interopRequireWildcard(_job);

	var _percentify = __webpack_require__(100);

	var _percentify2 = _interopRequireDefault(_percentify);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

	var _specialization = __webpack_require__(112);

	var _specialization2 = _interopRequireDefault(_specialization);

	var _skills = __webpack_require__(113);

	var _skills2 = _interopRequireDefault(_skills);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _Select = __webpack_require__(118);

	var _Select2 = _interopRequireDefault(_Select);

	var _coloringRange = __webpack_require__(159);

	var _coloringRange2 = _interopRequireDefault(_coloringRange);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';
	var Staff = function (_Component) {
	  (0, _inherits3.default)(Staff, _Component);

	  function Staff() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Staff);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Staff.__proto__ || (0, _getPrototypeOf2.default)(Staff)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      staff: [],
	      collapse: false
	    }, _this.getStaff = function () {
	      _this.setState({
	        staff: _playerStore2.default.getTeam()
	      });
	    }, _this.toggleStaff = function () {
	      _this.setState({ collapse: !_this.state.collapse });
	    }, _this.getSkill = function (skill) {
	      var value = Math.floor(skill / 100);
	      return (0, _preact.h)(
	        'span',
	        { style: { color: _coloringRange2.default.standard(value, 10) } },
	        value
	      );
	    }, _this.renderPerson = function (p, i) {
	      var specialization = _skills2.default.getTranslatedSpecialization(p);

	      var motivation = '';
	      switch (p.jobMotivation) {
	        case JOB.JOB_MOTIVATION_BUSINESS_OWNER:
	          motivation = 'Владелец бизнеса';break;
	        case JOB.JOB_MOTIVATION_IDEA_FAN:
	          motivation = 'Фанат проекта';break;
	        case JOB.JOB_MOTIVATION_SALARY:
	          motivation = 'За зарплату';break;
	        case JOB.JOB_MOTIVATION_PERCENTAGE:
	          motivation = 'За долю';break;
	      }

	      var work = '';
	      var value = '';

	      switch (p.task) {
	        case JOB.JOB_TASK_MARKETING_POINTS:
	          value = _playerStore2.default.getMarketingPointsProducedBy(p);
	          work = '\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442 ' + value + 'MP (Marketing Points) / month';
	          break;
	        case JOB.JOB_TASK_PROGRAMMER_POINTS:
	          value = _playerStore2.default.getProgrammingPointsProducedBy(p);
	          work = '\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442 ' + value + 'PP (Programming Points) / month';
	          break;
	      }

	      var tasks = [{ text: 'Программирование', value: JOB.JOB_TASK_PROGRAMMER_POINTS }, { text: 'Маркетинг', value: JOB.JOB_TASK_MARKETING_POINTS }];

	      return (0, _preact.h)(
	        'div',
	        { key: 'person' + i },
	        (0, _preact.h)(
	          'div',
	          null,
	          p.isPlayer ? 'Вы' : p.name,
	          '\xA0 (',
	          _this.getSkill(p.skills.programming),
	          '/',
	          _this.getSkill(p.skills.marketing),
	          '/',
	          _this.getSkill(p.skills.analyst),
	          ')'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ',
	          specialization
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'span',
	            null,
	            '\u0417\u0430\u0434\u0430\u0447\u0430: '
	          ),
	          (0, _preact.h)(
	            'span',
	            null,
	            (0, _preact.h)(_Select2.default, {
	              onChange: function onChange(value) {
	                _playerActions2.default.setTaskForPerson(value, i);
	              },
	              options: tasks,
	              value: p.task
	            })
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          work
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u044F: ',
	          motivation
	        ),
	        (0, _preact.h)('br', null)
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Staff, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      this.getStaff();

	      _playerStore2.default.addChangeListener(function () {
	        _this2.getStaff();
	      });
	    }
	  }, {
	    key: 'render',


	    // render(props: PropsType, state: StateType) {
	    value: function render() {
	      // return <div>MOCK</div>;
	      var staff = this.state.staff;

	      var collapse = this.state.collapse;
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h4',
	          { onClick: this.toggleStaff },
	          '\u041A\u043E\u043C\u0430\u043D\u0434\u0430 (',
	          collapse ? staff.length : '-',
	          ')'
	        ),
	        staff.length && !collapse ? staff.map(this.renderPerson) : ''
	      );
	    }
	  }]);
	  return Staff;
	}(_preact.Component);

	exports.default = Staff;
	;

/***/ },
/* 111 */
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _job = __webpack_require__(111);

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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _specialization = __webpack_require__(112);

	var _specialization2 = _interopRequireDefault(_specialization);

	var _job = __webpack_require__(111);

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
	  overall: function overall(p) {
	    return getSkill(p.skills.programming) + getSkill(p.skills.marketing) + getSkill(p.skills.analyst);
	  }
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _playerActions = __webpack_require__(115);

	var ACTIONS = _interopRequireWildcard(_playerActions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRandomRange(min, max) {
	  return Math.random() * (max - min) + min;
	}

	exports.default = {
	  increaseMoney: function increaseMoney(amount) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_INCREASE_MONEY,
	      amount: amount
	    });
	  },
	  hireWorker: function hireWorker(player) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_HIRE_WORKER,
	      player: player
	    });
	  },

	  increasePoints: function increasePoints(points) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_INCREASE_POINTS,
	      points: points
	    });
	  },
	  spendPoints: function spendPoints(pp, mp) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PLAYER_ACTIONS_DECREASE_POINTS,
	      pp: pp,
	      mp: mp
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
/* 115 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(102);

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _playerActions = __webpack_require__(115);

	var c = _interopRequireWildcard(_playerActions);

	var _payloads = __webpack_require__(109);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _expenses2 = __webpack_require__(117);

	var EXPENSES = _interopRequireWildcard(_expenses2);

	var _job = __webpack_require__(111);

	var JOB = _interopRequireWildcard(_job);

	var _specialization = __webpack_require__(112);

	var _specialization2 = _interopRequireDefault(_specialization);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'PLAYER_EVENT_CHANGE';

	var _skills = {};
	var _money = 1000;
	var _expenses = [{
	  type: EXPENSES.EXPENSES_FOOD,
	  quality: 0, // poor. Eat doshik and be happy (no). costs low money
	  price: 100,
	  regularity: 1 // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
	}];

	var _points = {
	  programming: 1000,
	  marketing: 1000,
	  analyst: 1000
	};

	var _team = [{
	  name: 'James',
	  skills: {
	    programming: 1000,
	    marketing: 150,
	    analyst: 300
	  },
	  task: JOB.JOB_TASK_PROGRAMMER_POINTS,
	  jobMotivation: JOB.JOB_MOTIVATION_BUSINESS_OWNER,
	  salary: {},
	  isPlayer: true
	  // на каком основании работает в проекте
	  // за еду, за опыт, за процент с продаж, собственник бизнеса
	}];

	var _reputation = 50; // neutral reputation
	var _fame = 0; // nobody knows you

	var _loan = 0; // no loans;

	var PlayerStore = function (_EventEmitter) {
	  (0, _inherits3.default)(PlayerStore, _EventEmitter);

	  function PlayerStore() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, PlayerStore);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PlayerStore.__proto__ || (0, _getPrototypeOf2.default)(PlayerStore)).call.apply(_ref, [this].concat(args))), _this), _this.getSkill = function (skill) {
	      return Math.floor(skill / 100);
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(PlayerStore, [{
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
	    key: 'getSkills',
	    value: function getSkills() {
	      return _skills;
	    }
	  }, {
	    key: 'getMoney',
	    value: function getMoney() {
	      return _money;
	    }
	  }, {
	    key: 'getExpenses',
	    value: function getExpenses() {
	      return _expenses;
	    }
	  }, {
	    key: 'getLoanPaymentAmount',
	    value: function getLoanPaymentAmount() {
	      return _loan ? _loan * 0.01 : 0;
	    }
	  }, {
	    key: 'getLoanSize',
	    value: function getLoanSize() {
	      return _loan;
	    }

	    // getExpectedMoney() {
	    //   return
	    // }

	  }, {
	    key: 'getPoints',
	    value: function getPoints() {
	      return _points;
	    }
	  }, {
	    key: 'getTeam',
	    value: function getTeam() {
	      return _team;
	    }
	  }, {
	    key: 'getMaxPossibleFreelanceMarketingPoints',
	    value: function getMaxPossibleFreelanceMarketingPoints() {
	      return Math.floor(_money / JOB.PRICE_OF_ONE_MP);
	    }
	  }, {
	    key: 'getMaxPossibleFreelanceProgrammingPoints',
	    value: function getMaxPossibleFreelanceProgrammingPoints() {
	      return Math.floor(_money / JOB.PRICE_OF_ONE_PP);
	    }
	  }, {
	    key: 'getMaxPossibleAdClients',
	    value: function getMaxPossibleAdClients() {
	      var CLIENT_PRICE = 1;

	      return Math.floor(_money / CLIENT_PRICE);
	    }
	  }, {
	    key: 'getProgrammers',
	    value: function getProgrammers() {
	      return _team.filter(function (p) {
	        return (0, _specialization2.default)(p) === JOB.PROFESSION_PROGRAMMER;
	      });
	    }
	  }, {
	    key: 'getMarketers',
	    value: function getMarketers() {
	      return _team.filter(function (p) {
	        return (0, _specialization2.default)(p) === JOB.PROFESSION_MARKETER;
	      });
	    }
	  }, {
	    key: 'getAnalysts',
	    value: function getAnalysts() {
	      return _team.filter(function (p) {
	        return (0, _specialization2.default)(p) === JOB.PROFESSION_ANALYST;
	      });
	    }
	  }, {
	    key: 'getDesigners',
	    value: function getDesigners() {
	      return _team.filter(function (p) {
	        return (0, _specialization2.default)(p) === JOB.PROFESSION_DESIGNER;
	      });
	    }
	  }, {
	    key: 'getMarketingPointsProducedBy',
	    value: function getMarketingPointsProducedBy(p) {
	      var marketingEfficiency = 30;

	      return this.getSkill(p.skills.marketing) * marketingEfficiency;
	    }
	  }, {
	    key: 'getProgrammingPointsProducedBy',
	    value: function getProgrammingPointsProducedBy(p) {
	      var programmingEfficiency = 30;

	      return this.getSkill(p.skills.programming) * programmingEfficiency;
	    }
	  }]);
	  return PlayerStore;
	}(_events.EventEmitter);

	var store = new PlayerStore();

	var payload = _payloads2.default.scheduleStorePayload;


	_dispatcher2.default.register(function (p) {
	  if (!p.type) {
	    _logger2.default.error('empty type prop in payload ' + payload.name, p);
	    return;
	  }

	  var change = true;
	  switch (p.type) {
	    case c.PLAYER_ACTIONS_INCREASE_MONEY:
	      _money += p.amount;
	      break;
	    case c.PLAYER_ACTIONS_EXPENSES_ADD:
	      _expenses.push(p.expense);
	      break;
	    case c.PLAYER_ACTIONS_EXPENSES_REMOVE:
	      _expenses.splice(p.id, 1);
	      break;
	    case c.PLAYER_ACTIONS_LOANS_TAKE:
	      _logger2.default.shit('LOAN SIZE MUST BASE ON YOUR INCOME!!!. stores player-store.js');

	      var repay = 1.3;
	      _money += p.amount;
	      _loan += p.amount * repay;

	      _expenses.push({
	        type: EXPENSES.EXPENSES_LOAN,
	        price: p.amount * repay,
	        regularity: 1
	      });
	      break;
	    case c.PLAYER_ACTIONS_LOANS_REPAY:
	      var loanSize = _expenses[p.id].price;
	      if (loanSize <= _money) {
	        _money -= loanSize;
	        _loan -= loanSize;

	        _expenses.splice(p.id, 1);
	      } else {
	        change = false;
	      }
	      break;
	    case c.PLAYER_ACTIONS_SET_TASK:
	      _team[p.index].task = p.task;
	      break;
	    case c.PLAYER_ACTIONS_INCREASE_POINTS:
	      _points.marketing += p.points.marketing;
	      _points.programming += p.points.programming;
	      break;
	    case c.PLAYER_ACTIONS_BUY_PP:
	      _points.programming += p.pp;
	      _money -= p.pp * JOB.PRICE_OF_ONE_PP;
	      break;
	    case c.PLAYER_ACTIONS_BUY_MP:
	      _points.marketing += p.mp;
	      _money -= p.mp * JOB.PRICE_OF_ONE_MP;
	      break;
	    case c.PLAYER_ACTIONS_DECREASE_POINTS:
	      _points.marketing -= p.mp;
	      _points.programming -= p.pp;
	      break;
	    case c.PLAYER_ACTIONS_HIRE_WORKER:
	      _team.push(p.player);
	      break;
	    default:
	      break;
	  }

	  if (change) store.emitChange();
	});

	exports.default = store;

/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EXPENSES_FOOD = exports.EXPENSES_FOOD = 'EXPENSES_FOOD';
	var EXPENSES_LOAN = exports.EXPENSES_LOAN = 'EXPENSES_LOAN';

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _moneyDifference = __webpack_require__(120);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _UI = __webpack_require__(129);

	var _UI2 = _interopRequireDefault(_UI);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var Menu = function (_Component) {
	  (0, _inherits3.default)(Menu, _Component);

	  function Menu() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Menu);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.getPlayerInfoFromStore = function () {
	      _this.setState({
	        money: _playerStore2.default.getMoney(),
	        points: _playerStore2.default.getPoints()
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Menu, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.getPlayerInfoFromStore();

	      _playerStore2.default.addChangeListener(this.getPlayerInfoFromStore);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var saldo = _moneyDifference2.default.saldo() > 0;
	      var arrow = saldo ? '\u2197' : '\u2198';

	      var s = { navigation: 'navigation', moneyPositive: 'moneyPositive', moneyNegative: 'moneyNegative' };
	      var moneyIndication = saldo ? s.moneyPositive : s.moneyNegative;

	      var navigation = s.navigation;

	      var paused = props.pause;
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          (0, _preact.h)(
	            'div',
	            { className: moneyIndication },
	            '$',
	            Math.floor(state.money),
	            ' ',
	            arrow
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          (0, _preact.h)(
	            'div',
	            null,
	            '\u0414\u0435\u043D\u044C: ',
	            props.day
	          )
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          (0, _preact.h)(_UI2.default.Button, { text: paused ? '>' : '||', onClick: paused ? props.resumeGame : props.pauseGame })
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          (0, _preact.h)(_UI2.default.Button, { text: '>>', onClick: props.setGameSpeed(5) })
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          (0, _preact.h)(_UI2.default.Button, { text: '>>>', onClick: props.setGameSpeed(9) })
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          'MP: ',
	          state.points.marketing
	        ),
	        (0, _preact.h)(
	          'div',
	          { className: navigation },
	          'PP: ',
	          state.points.programming
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'div',
	            { className: navigation, onClick: props.onRenderProjectsMenu },
	            '\u041F\u0440\u043E\u0435\u043A\u0442\u044B'
	          ),
	          (0, _preact.h)(
	            'div',
	            { className: navigation, onClick: props.onRenderEconomicsMenu },
	            '\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430'
	          ),
	          (0, _preact.h)(
	            'div',
	            { className: navigation, onClick: props.onRenderStaffMenu },
	            '\u041A\u043E\u043C\u0430\u043D\u0434\u0430'
	          )
	        )
	      );
	    }
	  }]);
	  return Menu;
	}(_preact.Component);

	exports.default = Menu;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _expenses = __webpack_require__(117);

	var EXPENSES = _interopRequireWildcard(_expenses);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var calculate = function calculate() {
	  var products = _productStore2.default.getProducts();

	  // check income
	  var jobIncome = 5000;

	  var income = jobIncome + products.map(function (p, i) {
	    return _productStore2.default.getProductIncome(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  });

	  // check expenses
	  var nonProductExpenses = _playerStore2.default.getExpenses().filter(function (e) {
	    return e.type !== EXPENSES.EXPENSES_LOAN;
	  }).map(function (e, i) {
	    return e.price;
	  }).reduce(function (p, c) {
	    return p + c;
	  });

	  var productExpenses = products.map(function (p, i) {
	    return _productStore2.default.getProductExpenses(i);
	  }).reduce(function (p, c) {
	    return p + c;
	  });

	  var loans = _playerStore2.default.getLoanPaymentAmount();

	  var expenses = nonProductExpenses + productExpenses + loans;

	  var byProductIncome = products.map(function (p, i) {
	    return { name: p.name, income: _productStore2.default.getProductIncome(i) };
	  });

	  return {
	    nonProductExpenses: nonProductExpenses,
	    productExpenses: productExpenses,
	    loans: loans,

	    expenses: expenses,
	    income: income,
	    byProductIncome: byProductIncome,

	    saldo: income - expenses
	  };
	};

	exports.default = {
	  structured: calculate,

	  saldo: function saldo() {
	    return calculate().saldo;
	  }
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(102);

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _productActions = __webpack_require__(122);

	var c = _interopRequireWildcard(_productActions);

	var _payloads = __webpack_require__(109);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

	var _ideas = __webpack_require__(123);

	var IDEAS = _interopRequireWildcard(_ideas);

	var _computeRating = __webpack_require__(124);

	var _computeRating2 = _interopRequireDefault(_computeRating);

	var _productDescriptions = __webpack_require__(125);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _productStages = __webpack_require__(128);

	var PRODUCT_STAGES = _interopRequireWildcard(_productStages);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EC = 'PRODUCT_EVENT_CHANGE';

	var _products = [{
	  rating: 0, // computable value, so... needs to be deleted
	  idea: IDEAS.IDEA_WEB_HOSTING,
	  name: 'WWWEB HOSTING',
	  stage: PRODUCT_STAGES.PRODUCT_STAGE_IDEA,

	  features: {
	    offer: {
	      // 'portfolio': 0.81,
	      // 'website': 1
	    }, // features, that are attached to main idea
	    development: {}, // backups, more dev servers, e.t.c.

	    marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
	    analytics: {}, // simple analytics (main KPIs),
	    // middle (segments analytics), mid+ (segments + versions),

	    // not only chat with users, but also localisations, content updates
	    // and all sort of things, that you need doing constantly
	    support: {},

	    payment: {}
	  },

	  KPI: {
	    // accumulated values
	    debt: 0, // technical debt. Shows, how fast can you implement new features
	    clients: 10,
	    newClients: 10,

	    bugs: 10,

	    currentUXBugs: 100,
	    foundUXBugs: 50,
	    fixedUXBugs: 50
	  }
	}];

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
	    key: 'getProducts',
	    value: function getProducts() {
	      return _products;
	    }
	  }, {
	    key: 'getRating',
	    value: function getRating(i) {
	      return (0, _computeRating2.default)(_products[i]);
	    }
	  }, {
	    key: 'getClients',
	    value: function getClients(i) {
	      return _products[i].KPI.clients;
	    }
	  }, {
	    key: 'getNewClients',
	    value: function getNewClients(i) {
	      return _products[i].KPI.newClients;
	    }
	  }, {
	    key: 'getDisloyalClients',
	    value: function getDisloyalClients(i) {
	      return Math.floor(this.getClients(i) * this.getChurnRate(i));
	    }
	  }, {
	    key: 'getViralClients',
	    value: function getViralClients(i) {
	      return Math.floor(this.getNewClients(i) * this.getViralityRate(i));
	    }
	  }, {
	    key: 'getAnalyticsValueForFeatureCreating',
	    value: function getAnalyticsValueForFeatureCreating(i) {
	      // range: 0 - 1
	      // range: 0.1 - 0.4
	      var analytics = _products[i].features.analytics;

	      var value = 0;

	      var feedback = analytics.feedback;
	      var webvisor = analytics.webvisor;
	      var segmenting = analytics.segmenting;

	      if (segmenting) {
	        value = 0.4;
	      } else if (webvisor) {
	        value = 0.3;
	      } else if (feedback) {
	        value = 0.1;
	      }

	      return value;
	    }
	  }, {
	    key: 'getProductUtility',
	    value: function getProductUtility(i) {
	      var idea = this.getIdea(i);
	      return (0, _productDescriptions2.default)(idea).utility;
	    }
	  }, {
	    key: 'getPaymentModifier',
	    value: function getPaymentModifier(i) {
	      var payments = _products[i].features.payment;
	      // mockBuying
	      // basicPricing
	      // segmentedPricing
	      if (payments.segmentedPricing) {
	        return 0.95;
	      }

	      if (payments.basicPricing) {
	        return 0.5;
	      }

	      if (payments.mockBuying) {
	        return 1;
	      }

	      return 0;
	    }
	  }, {
	    key: 'getConversionRate',
	    value: function getConversionRate(i) {
	      var rating = this.getRating(i);
	      var utility = this.getProductUtility(i);

	      var paymentModifier = this.getPaymentModifier(i);

	      // let conversion = utility * Math.pow((rating), 1.5) / 1000; // rating 10 - 0.05
	      var conversion = utility * rating * paymentModifier / 1000; // rating 10 - 0.05

	      if (conversion < 0 || conversion > 15) {
	        _logger2.default.error('invalid conversion value ' + conversion);
	        return 0;
	        // throw 'INVALID_CONVERSION_ERROR';
	      }

	      return conversion;
	    }
	  }, {
	    key: 'getProductPrice',
	    value: function getProductPrice(i) {
	      return (0, _productDescriptions2.default)(this.getIdea(i)).price;
	    }
	  }, {
	    key: 'getPaymentSwitcher',
	    value: function getPaymentSwitcher(i) {
	      var payments = _products[i].features.payment;
	      // mockBuying
	      // basicPricing
	      // segmentedPricing
	      if (payments.segmentedPricing || payments.basicPricing) {
	        return 1;
	      }

	      return 0;
	    }
	  }, {
	    key: 'getProductIncome',
	    value: function getProductIncome(i) {
	      var conversion = this.getConversionRate(i) * this.getPaymentSwitcher(i); // rating 10 - 0.05

	      var clients = this.getClients(i);
	      var price = this.getProductPrice(i);
	      var payAbility = 1;

	      var payments = conversion * clients;

	      // need app
	      // want to pay
	      // can pay
	      return payments * price;
	    }
	  }, {
	    key: 'getIdea',
	    value: function getIdea(i) {
	      return _products[i].idea;
	    }
	  }, {
	    key: 'getViralityRate',
	    value: function getViralityRate(i) {
	      var rating = this.getRating(i);
	      var multiplier = (0, _productDescriptions2.default)(this.getIdea(i)).virality;
	      var marketing = _products[i].features.marketing;

	      var base = 0.1;

	      if (rating >= 7) {
	        base += (rating - 7) / 10;
	      }

	      var referralBonuses = 0;
	      // if (marketing.improvedReferralProgram) {
	      //   referralBonuses += 0.45;
	      // }

	      if (marketing.referralProgram) {
	        // referralBonuses += 0.21;
	        referralBonuses += 0.65 * marketing.referralProgram;
	      }

	      return (base + referralBonuses) * multiplier;
	    }
	  }, {
	    key: 'getChurnRate',
	    value: function getChurnRate(i) {
	      // TODO fix constant values in blog, email, support in getChurnRate(i)
	      // return answer in partitions 0-1
	      _logger2.default.shit('TODO fix constant values in blog, email, support in getChurnRate(i)');

	      var rating = this.getRating(i);

	      if (rating < 3) return 1;

	      // logger.log('getChurnRate in ProductStore', rating, Math.pow(12 - rating, 1.7));
	      var ratingModifier = Math.min(Math.pow(12 - rating, 1.65));

	      var marketing = _products[i].features.marketing;

	      var blog = marketing.blog || 0;
	      var emails = marketing.emails || 0;
	      var support = marketing.support || 0;
	      var k = 0.35; // поправочный коэффициент

	      var marketingModifier = 0.35 * blog + 0.15 * emails + 0.5 * support; // max total sum = 1

	      // 15: r7
	      // bad 10-15+
	      // good 1-5
	      var churn = ratingModifier * (1 - k * marketingModifier) / 100;
	      return churn;
	      // return churn.toFixed(0); // products[i].features.marketing;
	    }
	  }, {
	    key: 'getProductBlogCost',
	    value: function getProductBlogCost(i) {
	      var BASE_BLOG_COST = 1000;

	      return _products[i].features.marketing.blog ? BASE_BLOG_COST : 0;
	    }
	  }, {
	    key: 'getProductSupportCost',
	    value: function getProductSupportCost(i) {
	      var marketing = _products[i].features.marketing;

	      var support = marketing.support || 0;

	      if (!support) return 0;

	      var clients = this.getClients(i);

	      if (clients < 1000) return 300;
	      if (clients < 10000) return 500;
	      if (clients < 100000) return 3000;

	      return 10000;
	    }
	  }, {
	    key: 'getProductExpenses',
	    value: function getProductExpenses(i) {
	      return this.getProductBlogCost(i) + this.getProductSupportCost(i);
	    }
	  }, {
	    key: 'getName',
	    value: function getName(i) {
	      return _products[i].name;
	    }
	  }, {
	    key: 'getStage',
	    value: function getStage(i) {
	      return _products[i].stage;
	    }
	  }, {
	    key: 'getFeatureStatus',
	    value: function getFeatureStatus(i, featureGroup, featureName) {
	      return _products[i].features[featureGroup][featureName] > 0;
	    }
	  }, {
	    key: 'getCostPerClient',
	    value: function getCostPerClient(i) {
	      return (0, _productDescriptions2.default)(this.getIdea(i)).CAC;
	    }
	  }, {
	    key: 'getBugs',
	    value: function getBugs(i) {
	      return {
	        ux: {
	          max: 100,
	          found: 50,
	          fixed: 10
	        },
	        programming: {
	          max: 100,
	          found: 50,
	          fixed: 10
	        }
	      };
	    }
	  }, {
	    key: 'getRatingForMetricsTab',
	    value: function getRatingForMetricsTab(i) {
	      var phrase = void 0;
	      var features = _products[i].features;
	      var analytics = features.analytics;

	      // rating depends on
	      // number of users (stat pogreshnost)
	      // feedback form
	      // segmenting
	      // webvisor

	      if (!analytics.feedback && !analytics.webvisor && !analytics.segmenting) {
	        return 0;
	      }
	      var analyticsModifier = 1;
	      if (analytics.feedback) analyticsModifier -= 0.3;

	      if (analytics.webvisor) {
	        analyticsModifier -= 0.5;
	      } else if (analytics.segmenting) {
	        analyticsModifier -= 0.65;
	      }

	      var clients = this.getClients(i);
	      var factor = 2;
	      if (clients > 100000) {
	        factor = 1;
	      } else if (clients > 10000) {
	        factor = 1.1;
	      } else if (clients > 1000) {
	        factor = 1.2;
	      } else if (clients > 100) {
	        factor = 1.5;
	      } else {
	        factor = 2;
	      }

	      var error = (0, _round2.default)(5 * factor * analyticsModifier);
	      var offset = Math.random() * error;
	      var rating = this.getRating(i);

	      var leftValue = (0, _round2.default)(rating - offset);
	      if (leftValue < 0) {
	        leftValue = 0;
	      }

	      var rightValue = (0, _round2.default)(leftValue + error);
	      if (rightValue < 0) {
	        rightValue = 0;
	      } else if (rightValue > 10) {
	        rightValue = 10;
	      }

	      phrase = leftValue + ' - ' + rightValue;
	      phrase = rating;

	      return phrase;
	    }
	  }, {
	    key: 'getProductExpensesStructure',
	    value: function getProductExpensesStructure(i) {
	      return {
	        name: this.getName(i),
	        blog: this.getProductBlogCost(i),
	        support: this.getProductSupportCost(i)
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

	  var id = p.id;

	  var change = true;
	  switch (p.type) {
	    case c.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS:
	      _products[id].stage = PRODUCT_STAGES.PRODUCT_STAGE_NORMAL;
	      _products[id].KPI = p.KPI;
	      _products[id].features = p.features;
	      break;
	    case c.PRODUCT_ACTIONS_SWITCH_STAGE:
	      _products[id].stage = p.stage;
	      break;
	    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE:
	      var previous = _products[id].features[p.featureGroup][p.featureName] || 0;
	      var sum = previous + p.value;
	      var max = p.max;
	      // _products[id].features[p.featureGroup][p.featureName] = previous > p.value ? previous : p.value;
	      _products[p.id].features[p.featureGroup][p.featureName] = sum > max ? max : sum;
	      break;
	    case c.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS:
	      // let previous = _products[id].features[p.featureGroup][p.featureName];
	      _products[id].features[p.featureGroup][p.featureName] = 1;
	      _logger2.default.log('improved feature by points');
	      break;
	    case c.PRODUCT_ACTIONS_CLIENTS_ADD:
	      // not all users will become our clients. Some of them will vanish
	      // if you got them from ads, efficiency will be less than 1
	      var efficiency = p.efficiency || 1;
	      var clients = Math.floor(efficiency * p.clients);

	      _products[id].KPI.clients += clients;
	      _products[id].KPI.newClients += clients;
	      break;
	    case c.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD:
	      clients = p.clients;
	      _products[id].KPI.clients += clients;
	      _products[id].KPI.newClients = clients;
	      break;
	    case c.PRODUCT_ACTIONS_CLIENTS_REMOVE:
	      // churn clients
	      clients = p.clients;

	      if (_products[id].KPI.clients - clients < 0) {
	        _products[id].KPI.clients = 0;
	      } else {
	        _products[id].KPI.clients -= Math.floor(clients);
	      }

	      break;
	    default:
	      break;
	  }

	  if (change) store.emitChange();
	});

	exports.default = store;

/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PRODUCT_ACTIONS_IMPROVE_FEATURE = exports.PRODUCT_ACTIONS_IMPROVE_FEATURE = 'PRODUCT_ACTIONS_IMPROVE_FEATURE';
	var PRODUCT_ACTIONS_CLIENTS_ADD = exports.PRODUCT_ACTIONS_CLIENTS_ADD = 'PRODUCT_ACTIONS_CLIENTS_ADD';
	var PRODUCT_ACTIONS_CLIENTS_REMOVE = exports.PRODUCT_ACTIONS_CLIENTS_REMOVE = 'PRODUCT_ACTIONS_CLIENTS_REMOVE';
	var PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD = exports.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD = 'PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD';
	var PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS = exports.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS = 'PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS';
	var PRODUCT_ACTIONS_SWITCH_STAGE = exports.PRODUCT_ACTIONS_SWITCH_STAGE = 'PRODUCT_ACTIONS_SWITCH_STAGE';
	var PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS = exports.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS = 'PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS';

/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IDEA_WEB_STUDIO = exports.IDEA_WEB_STUDIO = 'IDEA_WEB_STUDIO';
	var IDEA_WEB_HOSTING = exports.IDEA_WEB_HOSTING = 'IDEA_WEB_HOSTING';

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productDescriptions = __webpack_require__(125);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getSpecificProductFeatureListByIdea = function getSpecificProductFeatureListByIdea(idea) {
	  return (0, _productDescriptions2.default)(idea).features;
	};

	exports.default = function (product) {
	  // TODO: include other features too
	  var rating = 0;

	  var idea = product.idea;


	  getSpecificProductFeatureListByIdea(idea).forEach(function (f) {
	    var value = (product.features.offer[f.name] || 0) / f.data;
	    // logger.debug('computing rating for feature', f.name);

	    rating += value * f.influence;
	  });
	  // logger.debug('rating=', rating);

	  return rating;
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (idea) {
	  switch (idea) {
	    case IDEAS.IDEA_WEB_STUDIO:
	      return _WEBSTUDIO2.default;
	      break;
	    case IDEAS.IDEA_WEB_HOSTING:
	      return _WEBHOSTING2.default;
	      break;
	  }
	};

	var _ideas = __webpack_require__(123);

	var IDEAS = _interopRequireWildcard(_ideas);

	var _WEBSTUDIO = __webpack_require__(126);

	var _WEBSTUDIO2 = _interopRequireDefault(_WEBSTUDIO);

	var _WEBHOSTING = __webpack_require__(127);

	var _WEBHOSTING2 = _interopRequireDefault(_WEBHOSTING);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	;

/***/ },
/* 126 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  description: 'Веб студия. Специализируется на разработке веб-сайтов и веб-приложений.',
	  features: [{ name: 'portfolio', influence: 5.5, description: '', time: 30 }, { name: 'website', influence: 4.5, description: '', time: 14 }],
	  utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
	  virality: 0.5, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
	  price: 1,
	  CAC: 0.018,
	  marketSize: 1000000,
	  mvp: {
	    pp: 100,
	    mp: 100
	  }
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
	  features: [{ name: 'scalability', influence: 2.5, description: '', shortDescription: 'Масштабируемость', data: 5000, time: 20 }, { name: 'website', influence: 7.5, description: '', shortDescription: 'Веб-сайт', data: 15000, time: 30 }],
	  utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
	  virality: 0.3, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
	  price: 50,
	  CAC: 1,
	  marketSize: 50000,
	  mvp: {
	    pp: 300,
	    mp: 100
	  }
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PRODUCT_STAGE_IDEA = exports.PRODUCT_STAGE_IDEA = 'PRODUCT_STAGE_IDEA';
	var PRODUCT_STAGE_MVP = exports.PRODUCT_STAGE_MVP = 'PRODUCT_STAGE_MVP';
	var PRODUCT_STAGE_NORMAL = exports.PRODUCT_STAGE_NORMAL = 'PRODUCT_STAGE_NORMAL';

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _Modal = __webpack_require__(131);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Range = __webpack_require__(142);

	var _Range2 = _interopRequireDefault(_Range);

	var _Select = __webpack_require__(118);

	var _Select2 = _interopRequireDefault(_Select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  Button: _Button2.default,
	  Modal: _Modal2.default,
	  Select: _Select2.default,
	  Range: _Range2.default
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(94);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

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
	        className = 'btn btn-primary';
	      }

	      if (props.secondary) {
	        className = 'btn btn-success';
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _messageStore = __webpack_require__(132);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _messageActions = __webpack_require__(133);

	var c = _interopRequireWildcard(_messageActions);

	var _eventRenderer = __webpack_require__(135);

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
	    value: function render() {
	      var state = this.state;


	      if (!state.drawable) return (0, _preact.h)('div', null);

	      var message = state.messages[0];

	      var body = this.renderModalBody(message);
	      // {JSON.stringify(message)}

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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _events = __webpack_require__(102);

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _messageActions = __webpack_require__(133);

	var c = _interopRequireWildcard(_messageActions);

	var _events2 = __webpack_require__(134);

	var t = _interopRequireWildcard(_events2);

	var _payloads = __webpack_require__(109);

	var _payloads2 = _interopRequireDefault(_payloads);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _job = __webpack_require__(111);

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
	      return _messages.length;
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
	    default:
	      break;
	  }

	  if (change) store.emitChange();
	});

	exports.default = store;

/***/ },
/* 133 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GAME_EVENT_ADD = exports.GAME_EVENT_ADD = 'GAME_EVENT_ADD';
	var GAME_EVENT_CHOOSE_ANSWER = exports.GAME_EVENT_CHOOSE_ANSWER = 'GAME_EVENT_CHOOSE_ANSWER';
	var GAME_EVENT_CLOSE_TAB = exports.GAME_EVENT_CLOSE_TAB = 'GAME_EVENT_CLOSE_TAB';

	var MESSAGE_TYPE_GAME_EVENT = exports.MESSAGE_TYPE_GAME_EVENT = 'MESSAGE_TYPE_GAME_EVENT';
	var MESSAGE_TYPE_INFO = exports.MESSAGE_TYPE_INFO = 'MESSAGE_TYPE_INFO';
	var MESSAGE_TYPE_POLL = exports.MESSAGE_TYPE_POLL = 'MESSAGE_TYPE_POLL';

/***/ },
/* 134 */
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

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(136);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _preact = __webpack_require__(1);

	var _FREEMONEYEVENT = __webpack_require__(138);

	var _FREEMONEYEVENT2 = _interopRequireDefault(_FREEMONEYEVENT);

	var _FREEPOINTSEVENT = __webpack_require__(140);

	var _FREEPOINTSEVENT2 = _interopRequireDefault(_FREEPOINTSEVENT);

	var _HIREENTHUSIASTEVENT = __webpack_require__(141);

	var _HIREENTHUSIASTEVENT2 = _interopRequireDefault(_HIREENTHUSIASTEVENT);

	var _events = __webpack_require__(134);

	var t = _interopRequireWildcard(_events);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	exports.default = function (message, id) {
	  switch (message.data.type) {
	    case t.GAME_EVENT_FREE_MONEY:
	      return (0, _preact.h)(_FREEMONEYEVENT2.default, { message: message, id: id });
	      break;
	    case t.GAME_EVENT_FREE_POINTS:
	      return (0, _preact.h)(_FREEPOINTSEVENT2.default, { message: message, id: id });
	      break;
	    case t.GAME_EVENT_HIRE_ENTHUSIAST:
	      return (0, _preact.h)(_HIREENTHUSIASTEVENT2.default, { message: message, id: id });
	      break;
	  }

	  return (0, _preact.h)(
	    'div',
	    null,
	    'render modal body ',
	    (0, _stringify2.default)(message)
	  );
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(8)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _messageActions = __webpack_require__(139);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        _playerActions2.default.increaseMoney(money);
	        _messageActions2.default.closeEvent(id);
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'text' },
	          '\u041D\u0435\u043A\u0442\u043E, \u043F\u043E\u0436\u0435\u043B\u0430\u0432\u0448\u0438\u0439 \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u043C, \u043F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u0432\u0430\u0448 \u043F\u0440\u043E\u0435\u043A\u0442 ',
	          money,
	          '$'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(_Button2.default, { onClick: onClick, text: '\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0445\u0430\u043B\u044F\u0432\u043D\u044B\u0435 ' + money + '$ !', primary: true })
	      );
	    }
	  }]);
	  return FreeMoneyEvent;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = FreeMoneyEvent;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _messageActions = __webpack_require__(133);

	var ACTIONS = _interopRequireWildcard(_messageActions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _messageStore = __webpack_require__(132);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  addGameEvent: function addGameEvent(eventType, data) {
	    var obj = (0, _assign2.default)({}, data, { type: eventType });
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.GAME_EVENT_ADD,
	      message: {
	        type: eventType,
	        data: obj
	      }
	    });
	  },

	  closeEvent: function closeEvent(id) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.GAME_EVENT_CLOSE_TAB,
	      id: id
	    });
	  }
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _messageActions = __webpack_require__(139);

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
	        _playerActions2.default.increasePoints({ marketing: 0, programming: points * 2 });
	        _messageActions2.default.closeEvent(id);
	      };

	      var pickMarketingPoints = function pickMarketingPoints() {
	        _playerActions2.default.increasePoints({ marketing: points * 2, programming: 0 });
	        _messageActions2.default.closeEvent(id);
	      };

	      var pickBoth = function pickBoth() {
	        _playerActions2.default.increasePoints({ marketing: points, programming: points });
	        _messageActions2.default.closeEvent(id);
	      };

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          { className: 'text' },
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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _messageActions = __webpack_require__(139);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _skills = __webpack_require__(113);

	var _skills2 = _interopRequireDefault(_skills);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var HireEnthusiastEvent = function (_Component) {
	  (0, _inherits3.default)(HireEnthusiastEvent, _Component);

	  function HireEnthusiastEvent() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, HireEnthusiastEvent);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HireEnthusiastEvent.__proto__ || (0, _getPrototypeOf2.default)(HireEnthusiastEvent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(HireEnthusiastEvent, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      var id = props.id;
	      var data = props.message.data;

	      var player = data.player;

	      var hireEnthusiast = function hireEnthusiast() {
	        _playerActions2.default.hireWorker(player);
	        _messageActions2.default.closeEvent(id);
	      };

	      var cancel = function cancel() {
	        _messageActions2.default.closeEvent(id);
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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

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
	        onChange: function onChange(event) {
	          props.onDrag(parseInt(event.target.value));
	        }
	      });
	    }
	  }]);
	  return Range;
	}(_preact.Component);

	exports.default = Range;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(129);

	var _UI2 = _interopRequireDefault(_UI);

	var _moneyDifference = __webpack_require__(120);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _Expenses = __webpack_require__(144);

	var _Expenses2 = _interopRequireDefault(_Expenses);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Economics = function (_Component) {
	  (0, _inherits3.default)(Economics, _Component);

	  function Economics() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Economics);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Economics.__proto__ || (0, _getPrototypeOf2.default)(Economics)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      possibleCredit: 0
	    }, _this.pickProducts = function () {
	      _this.setState({
	        products: _productStore2.default.getProducts()
	      });
	    }, _this.pickMoney = function () {
	      _this.setState({
	        money: _playerStore2.default.getMoney()
	      });
	    }, _this.renderIncome = function (state) {
	      // {JSON.stringify(state.income)}
	      var productIncome = _moneyDifference2.default.structured().byProductIncome.filter(function (p) {
	        return p.income > 0;
	      }).map(function (p) {
	        return (0, _preact.h)(
	          'div',
	          null,
	          p.name,
	          ' : ',
	          p.income,
	          '$'
	        );
	      });

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'b',
	          null,
	          '\u0414\u043E\u0445\u043E\u0434\u044B'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u0424\u0440\u0438\u043B\u0430\u043D\u0441: 5000$'
	        ),
	        (0, _preact.h)(
	          'div',
	          null,
	          productIncome
	        )
	      );
	    }, _this.renderExpenses = function (state) {
	      var expenses = state.products.map(function (p, i) {
	        return _productStore2.default.getProductExpensesStructure(i);
	      });

	      return (0, _preact.h)(_Expenses2.default, { expenses: expenses });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Economics, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.pickProducts();
	      this.pickMoney();

	      _playerStore2.default.addChangeListener(this.pickMoney);
	      _productStore2.default.addChangeListener(this.pickProducts);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var _this2 = this;

	      var loans = _playerStore2.default.getLoanSize();

	      var loanStatusTab = (0, _preact.h)(
	        'div',
	        null,
	        '\u0414\u043E\u043B\u0433\u043E\u0432 \u043D\u0435\u0442'
	      );
	      if (loans > 0) {
	        loanStatusTab = (0, _preact.h)(
	          'div',
	          null,
	          '\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u0430\u044F \u0437\u0430\u0434\u043E\u043B\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u044C ',
	          loans,
	          '$'
	        );
	      }

	      var takeLoan = function takeLoan(amount) {
	        var repay = 1.3;
	        return (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'div',
	            null,
	            '\u0412\u0437\u044F\u0442\u044C \u043A\u0440\u0435\u0434\u0438\u0442 \u043D\u0430 \u0441\u0443\u043C\u043C\u0443 ',
	            amount,
	            '$. \u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0451\u0436 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442: ',
	            amount * repay / 100,
	            '$'
	          ),
	          (0, _preact.h)(_UI2.default.Button, { text: '\u0412\u0437\u044F\u0442\u044C \u043A\u0440\u0435\u0434\u0438\u0442 (' + amount + '$)', onClick: function onClick() {
	              return _playerActions2.default.loans.take(amount);
	            } })
	        );
	      };

	      var onDrag = function onDrag(value) {
	        _this2.setState({ possibleCredit: Math.floor(value) });
	      };

	      var possibleCredit = state.possibleCredit;


	      var maxLoanSize = (_moneyDifference2.default.structured().income - loans) * 12;
	      var loanTakingTab = void 0;

	      if (maxLoanSize <= 0) {
	        loanTakingTab = (0, _preact.h)(
	          'div',
	          null,
	          '\u0412\u044B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u0440\u0430\u0442\u044C \u0437\u0430\u0439\u043C\u044B. \u0412\u044B\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u0437\u0430\u0439\u043C\u044B!'
	        );
	      } else {
	        loanTakingTab = (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(_UI2.default.Range, { min: 0, max: maxLoanSize, onDrag: onDrag }),
	          takeLoan(possibleCredit)
	        );
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          '\u041D\u0430 \u0432\u0430\u0448\u0435\u043C \u0441\u0447\u0435\u0442\u0443: ',
	          (0, _round2.default)(state.money),
	          '$'
	        ),
	        loanTakingTab,
	        loanStatusTab,
	        this.renderIncome(state),
	        this.renderExpenses(state)
	      );
	    }
	  }]);
	  return Economics;
	}(_preact.Component);

	exports.default = Economics;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _expenses = __webpack_require__(117);

	var EXPENSES = _interopRequireWildcard(_expenses);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Expenses = function (_Component) {
	  (0, _inherits3.default)(Expenses, _Component);

	  function Expenses() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Expenses);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Expenses.__proto__ || (0, _getPrototypeOf2.default)(Expenses)).call.apply(_ref, [this].concat(args))), _this), _this.setExpenses = function () {
	      _this.setState({
	        expenses: _playerStore2.default.getExpenses()
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Expenses, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setExpenses();

	      _playerStore2.default.addChangeListener(this.setExpenses);
	    }
	  }, {
	    key: 'render',


	    // render(props: PropsType, state: StateType) {
	    value: function render() {
	      var props = this.props;

	      var state = this.state;

	      var productExpenses = props.expenses;
	      var basicExpenses = state.expenses;

	      var renderExpense = function renderExpense(e, i) {
	        return (0, _preact.h)(
	          'div',
	          { key: 'product-expense' + i },
	          '\u0417\u0430\u0442\u0440\u0430\u0442\u044B \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442 ',
	          e.name,
	          (0, _preact.h)(
	            'ul',
	            null,
	            (0, _preact.h)(
	              'li',
	              null,
	              '\u0417\u0430\u0442\u0440\u0430\u0442\u044B \u043D\u0430 \u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0431\u043B\u043E\u0433\u0430: ',
	              e.blog
	            ),
	            (0, _preact.h)(
	              'li',
	              null,
	              '\u0417\u0430\u0442\u0440\u0430\u0442\u044B \u043D\u0430 \u0442\u0435\u0445\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443: ',
	              e.support
	            )
	          )
	        );
	      };

	      var loanIndex = 0;
	      var renderBasicExpense = function renderBasicExpense(e, i) {
	        var phrase = '';

	        if (e.type === EXPENSES.EXPENSES_FOOD) {
	          phrase = '\u0417\u0430\u0442\u0440\u0430\u0442\u044B \u043D\u0430 \u0435\u0434\u0443: ' + e.price;
	        }

	        if (e.type === EXPENSES.EXPENSES_LOAN) {
	          loanIndex++;
	          phrase = (0, _preact.h)(
	            'div',
	            null,
	            '\u0412\u044B\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432 \u043F\u043E \u0434\u043E\u043B\u0433\u0443 #$',
	            loanIndex,
	            ': $',
	            e.price * 0.01,
	            (0, _preact.h)(_Button2.default, { text: '\u041F\u043E\u0433\u0430\u0441\u0438\u0442\u044C \u0434\u043E\u043B\u0433 (' + e.price + ')', onClick: function onClick() {
	                _playerActions2.default.loans.repay(i);
	              } })
	          );
	        }

	        return (0, _preact.h)(
	          'div',
	          { key: 'basic-expense' + i },
	          phrase
	        );
	      };

	      // {JSON.stringify(state.expenses)}
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'b',
	          null,
	          '\u0420\u0430\u0441\u0445\u043E\u0434\u044B'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'h4',
	          null,
	          '\u0411\u0430\u0437\u043E\u0432\u044B\u0435 \u0440\u0430\u0441\u0445\u043E\u0434\u044B'
	        ),
	        basicExpenses.map(renderBasicExpense),
	        (0, _preact.h)(
	          'h4',
	          null,
	          '\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0440\u0430\u0441\u0445\u043E\u0434\u044B'
	        ),
	        productExpenses.map(renderExpense)
	      );
	    }
	  }]);
	  return Expenses;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = Expenses;
	;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStages = __webpack_require__(128);

	var PRODUCT_STAGES = _interopRequireWildcard(_productStages);

	var _InitialProductTab = __webpack_require__(146);

	var _InitialProductTab2 = _interopRequireDefault(_InitialProductTab);

	var _developPanel = __webpack_require__(150);

	var _developPanel2 = _interopRequireDefault(_developPanel);

	var _advertPlannerPanel = __webpack_require__(155);

	var _advertPlannerPanel2 = _interopRequireDefault(_advertPlannerPanel);

	var _PointShop = __webpack_require__(156);

	var _PointShop2 = _interopRequireDefault(_PointShop);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Product = function (_Component) {
	  (0, _inherits3.default)(Product, _Component);

	  function Product() {
	    (0, _classCallCheck3.default)(this, Product);
	    return (0, _possibleConstructorReturn3.default)(this, (Product.__proto__ || (0, _getPrototypeOf2.default)(Product)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Product, [{
	    key: 'render',
	    value: function render(props, state) {
	      var product = props.product,
	          id = props.id;


	      var body = void 0;

	      switch (product.stage) {
	        case PRODUCT_STAGES.PRODUCT_STAGE_IDEA:
	          body = (0, _preact.h)(_InitialProductTab2.default, { product: product, id: id });
	          break;
	        default:
	          body = (0, _preact.h)(
	            'div',
	            null,
	            (0, _preact.h)(_developPanel2.default, { product: product, id: id }),
	            (0, _preact.h)('br', null),
	            (0, _preact.h)('hr', null),
	            (0, _preact.h)(
	              'div',
	              null,
	              (0, _preact.h)(
	                'b',
	                null,
	                '\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u0430\u044F \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F'
	              ),
	              (0, _preact.h)(_advertPlannerPanel2.default, { product: product, id: id }),
	              (0, _preact.h)('br', null)
	            ),
	            (0, _preact.h)(_PointShop2.default, null)
	          );
	          break;
	      }

	      return body;
	    }
	  }]);
	  return Product;
	}(_preact.Component);

	exports.default = Product;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _mvpCreator = __webpack_require__(147);

	var _mvpCreator2 = _interopRequireDefault(_mvpCreator);

	var _productDescriptions = __webpack_require__(125);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var InitialProductTab = function (_Component) {
	  (0, _inherits3.default)(InitialProductTab, _Component);

	  function InitialProductTab() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, InitialProductTab);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InitialProductTab.__proto__ || (0, _getPrototypeOf2.default)(InitialProductTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(InitialProductTab, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var product = props.product;
	      var idea = product.idea;


	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _productDescriptions2.default)(idea).description
	        ),
	        (0, _preact.h)(_Button2.default, {
	          text: '\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F',
	          onClick: function onClick(e) {
	            return _mvpCreator2.default.create(props.id, [], idea);
	          },
	          primary: true
	        })
	      );
	    }
	  }]);
	  return InitialProductTab;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = InitialProductTab;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productActions = __webpack_require__(148);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _productDescriptions = __webpack_require__(125);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _random = __webpack_require__(149);

	var _random2 = _interopRequireDefault(_random);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: function create(i, basePoints, idea) {
	    var points = _playerStore2.default.getPoints();

	    // basePoints must be an array
	    _logger2.default.shit('WRITE proper basePoints array in mvp-creator.js');
	    basePoints = [{ name: 'programming', amount: 100 }, { name: 'marketing', amount: 100 }];

	    var hasEnoughPoints = true;
	    basePoints.forEach(function (p) {
	      if (points[p.name] < p.amount) hasEnoughPoints = false;
	    });

	    if (hasEnoughPoints) {
	      (function () {
	        // we can make prototype

	        _logger2.default.shit('WRITE proper randomizer in mvp-creator.js');
	        var randomDefaultKPIs = {
	          debt: 0, // technical debt. Shows, how fast can you implement new features
	          clients: 10,
	          newClients: 10,

	          bugs: 10,

	          currentUXBugs: 100,
	          foundUXBugs: 0,
	          fixedUXBugs: 0
	        };

	        var features = (0, _productDescriptions2.default)(idea).features;

	        var luck = (0, _random2.default)(1, 6) / 10; // luck in 0.1-0.6
	        _logger2.default.debug(idea, features);

	        var offer = {};
	        features.forEach(function (f) {
	          offer[f.name] = Math.floor(luck * f.data);
	        });

	        var randomDefaultFeatures = {
	          offer: offer, // features, that are attached to main idea
	          development: {}, // backups, more dev servers, e.t.c.

	          marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
	          analytics: {}, // simple analytics (main KPIs),
	          // middle (segments analytics), mid+ (segments + versions),

	          // not only chat with users, but also localisations, content updates
	          // and all sort of things, that you need doing constantly
	          support: {},
	          payment: {}
	        };

	        _playerActions2.default.spendPoints(basePoints[1].amount, basePoints[0].amount);
	        _productActions2.default.setInitialProductSettings(i, randomDefaultFeatures, randomDefaultKPIs);
	      })();
	    }
	  }
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _arguments = arguments;

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _productActions = __webpack_require__(122);

	var ACTIONS = _interopRequireWildcard(_productActions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRandomRange(min, max) {
	  return Math.random() * (max - min) + min;
	}

	exports.default = {
	  improveFeature: function improveFeature(id, featureGroup, featureName, h, max) {
	    _logger2.default.shit('fix commonExperience in improveFeature() product-actions.js');

	    var analyticsChance = _productStore2.default.getAnalyticsValueForFeatureCreating(id);
	    var chance = analyticsChance; // h.baseChance +

	    // let quality; // randomValue > chance ? h.data : 0;

	    var maxXP = 1000;
	    if (chance === 0.4) {
	      maxXP = 10000;
	    } else if (chance === 0.3) {
	      maxXP = 4000;
	    } else if (chance === 0.1) {
	      maxXP = 2000;
	    }

	    var quality = Math.floor(getRandomRange(0.1 * maxXP, maxXP));
	    _logger2.default.log('improveFeature', id, featureGroup, featureName, quality, chance);

	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
	      id: id,
	      featureGroup: featureGroup,
	      featureName: featureName,
	      value: quality,
	      max: max
	    });
	  },
	  improveFeatureByPoints: function improveFeatureByPoints(id, featureGroup, featureName) {
	    _logger2.default.debug('improveFeatureByPoints', _arguments);
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
	      id: id,
	      featureGroup: featureGroup,
	      featureName: featureName
	    });
	  },
	  setInitialProductSettings: function setInitialProductSettings(id, features, KPI) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS,
	      id: id, features: features, KPI: KPI
	    });
	  },
	  addClients: function addClients(id, clients) {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_ADD,
	      id: id,
	      clients: clients
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
	  }
	};

/***/ },
/* 149 */
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productDescriptions = __webpack_require__(125);

	var _productDescriptions2 = _interopRequireDefault(_productDescriptions);

	var _metrics = __webpack_require__(151);

	var _metrics2 = _interopRequireDefault(_metrics);

	var _Button = __webpack_require__(130);

	var _Button2 = _interopRequireDefault(_Button);

	var _professions = __webpack_require__(152);

	var PROFESSIONS = _interopRequireWildcard(_professions);

	var _productActions = __webpack_require__(148);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _featurePrice = __webpack_require__(153);

	var _featurePrice2 = _interopRequireDefault(_featurePrice);

	var _scheduleActions = __webpack_require__(154);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _workSpeed = __webpack_require__(99);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var DevelopPanel = function (_Component) {
	  (0, _inherits3.default)(DevelopPanel, _Component);

	  function DevelopPanel() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, DevelopPanel);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DevelopPanel.__proto__ || (0, _getPrototypeOf2.default)(DevelopPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      marketing: false,
	      payment: false,
	      analytics: false,
	      features: true
	    }, _this.getSpecificProductFeatureListByIdea = function (idea) {
	      return (0, _productDescriptions2.default)(idea).features;
	    }, _this.getMarketingFeatureList = function (idea) {
	      var cost = 30 * _workSpeed.WORK_SPEED_NORMAL;

	      return [{ name: 'blog', shortDescription: 'Блог проекта', description: 'Регулярное ведение блога снижает отток клиентов на 35%',
	        points: { marketing: 150, programming: 0 }, time: 2 }, { name: 'support', shortDescription: 'Техподдержка', description: 'Техподдержка снижает отток клиентов на 50%',
	        points: { marketing: 50, programming: 100 }, time: 4 }, { name: 'emails', shortDescription: 'Рассылка электронной почты', description: 'Рассылка электронной почти снижает отток клиентов на 15%',
	        points: { marketing: 50, programming: 100 }, time: 10 }, { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
	        points: { marketing: 50, programming: 100 }, time: 7 }].map((0, _featurePrice2.default)(cost));
	    }, _this.getDevelopmentFeatureList = function (idea) {
	      var cost = 50 * _workSpeed.WORK_SPEED_NORMAL;

	      return [{ name: 'backups', description: '' }, { name: 'clusters', description: '' }, { name: 'tests', description: '' }, { name: 'mobiles', description: '' } // ios android apps
	      ].map((0, _featurePrice2.default)(cost));
	    }, _this.getAnalyticFeatures = function (idea) {
	      var cost = 30 * _workSpeed.WORK_SPEED_NORMAL;

	      return [{ name: 'feedback', shortDescription: 'Форма для комментариев', description: 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез на 10%',
	        points: { programming: 50 }
	      }, { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез на 30%',
	        points: { programming: 50 }
	      }, { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: 'Повышает шансы при проверке гипотез на 40%',
	        points: { programming: 150, marketing: 100 }
	      }, { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
	        points: { programming: 50 }
	      }, { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрики "процент платящих" и "ежемесячный доход"',
	        points: { programming: 50 }
	      }];
	      // ].map(computeFeatureCost(cost));
	    }, _this.getPaymentFeatures = function (idea) {
	      var technicalDebtModifier = 1;
	      var up = Math.ceil;

	      return [{ name: 'mockBuying', shortDescription: 'Тестовая покупка', description: 'Позволяет узнать платёжеспособность клиентов. Вы не извлекаете никаких доходов с продукта',
	        points: { programming: up(50 * technicalDebtModifier), marketing: 0 }
	      }, { name: 'basicPricing', shortDescription: 'Один тарифный план', description: 'Одна цена для всех. Процент платящих снижается вдвое, однако вы начинаете зарабатывать деньги',
	        points: { programming: up(150 * technicalDebtModifier), marketing: 50 }
	      }, { name: 'segmentedPricing', shortDescription: 'Несколько тарифных планов', description: 'Несколько ценовых сегментов. Максимально возможный доход с продукта',
	        points: { programming: up(250 * technicalDebtModifier), marketing: 250 }
	      }];
	    }, _this.getTechnicalDebtDescription = function (debt) {
	      if (debt < 10) {
	        return '\u0412\u0441\u0451 \u0445\u043E\u0440\u043E\u0448\u043E';
	      } else if (debt < 50) {
	        return '\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0441\u0442\u044B \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0442 \u043F\u043B\u0430\u043A\u0430\u0442\u044C';
	      } else {
	        return '\u0422\u044B \u043C\u0440\u0430\u0437\u044C \u0438 \u043F**\u043E\u0440, \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0441\u0442\u044B \u043D\u0435\u043D\u0430\u0432\u0438\u0434\u044F\u0442 \u0442\u0435\u0431\u044F!! \u041E\u0442\u0440\u0435\u0444\u0430\u043A\u0442\u043E\u0440\u044C \u044D\u0442\u043E\u0442 \u0448\u043B\u0430\u043A!';
	      }
	    }, _this.toggleMainFeatureTab = function () {
	      var value = _this.state.features;
	      _this.setState({ features: !value });
	    }, _this.toggleAnalyticsTab = function () {
	      var value = _this.state.analytics;
	      _this.setState({ analytics: !value });
	    }, _this.togglePaymentTab = function () {
	      var value = _this.state.payment;
	      _this.setState({ payment: !value });
	    }, _this.toggleMarketingTab = function () {
	      var value = _this.state.marketing;
	      _this.setState({ marketing: !value });
	    }, _this.haveEnoughPointsToUpgrade = function (necessaryPoints) {
	      var points = _playerStore2.default.getPoints();
	      var mp = necessaryPoints.mp || 0;
	      var pp = necessaryPoints.pp || 0;

	      return points.marketing >= mp && points.programming >= pp;
	    }, _this.renderHypothesisItem = function (id, featureName, time, current, max) {
	      return function (hypothesis, i) {
	        var necessaryPoints = hypothesis.points;
	        var key = '' + featureName;

	        var pp = necessaryPoints.pp,
	            mp = necessaryPoints.mp;


	        var action = function action() {
	          _playerActions2.default.spendPoints(pp, mp);
	          _scheduleActions2.default.addTask(time, false, _workSpeed.WORK_SPEED_NORMAL, key, function () {
	            _productActions2.default.improveFeature(id, 'offer', featureName, hypothesis, max);
	          });
	        };

	        var chance = (hypothesis.baseChance + _productStore2.default.getAnalyticsValueForFeatureCreating(id)) * 100;

	        var notEnoughPPs = !_this.haveEnoughPointsToUpgrade(necessaryPoints);
	        var ratingOverflow = current >= max;
	        var disabled = notEnoughPPs || ratingOverflow;

	        var text = (0, _preact.h)(
	          'span',
	          null,
	          '\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u0443 (',
	          time,
	          ' \u0434\u043D\u0435\u0439)'
	        );

	        // <div className="hypothesis">Гипотеза (Ценность - {hypothesis.data}XP, {chance}% шанс)</div>
	        return (0, _preact.h)(
	          'div',
	          { key: 'hypothesis' + i },
	          (0, _preact.h)(
	            'div',
	            null,
	            '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F (',
	            mp,
	            'MP \u0438 ',
	            pp,
	            'PP)'
	          ),
	          (0, _preact.h)(_Button2.default, {
	            disabled: disabled,
	            onClick: action,
	            text: text,
	            primary: !ratingOverflow
	          })
	        );
	      };
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(DevelopPanel, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}

	    // computeMarketingBonus

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var props = this.props,
	          state = this.state;
	      var product = props.product;
	      var idea = product.idea;


	      var id = 0; // TODO FIX PRODUCT ID
	      _logger2.default.shit('develop-panel.js fix productID id=0');

	      var renderMainFeature = function renderMainFeature(featureGroup) {
	        return function (defaultFeature, i) {
	          var featureName = defaultFeature.name;
	          var time = defaultFeature.time,
	              shortDescription = defaultFeature.shortDescription;


	          var feature = product.features[featureGroup][featureName];

	          var current = feature || 0;
	          var max = defaultFeature.data;

	          var key = 'feature' + featureGroup + featureName + i;

	          var hypothesis = [
	          // {
	          // points: { mp: 100, pp: 100 },
	          // data: 1000,
	          // baseChance: 0.3
	          // },
	          {
	            points: { mp: 100, pp: 200 },
	            data: 4000,
	            baseChance: 0.1
	          }];

	          var description = defaultFeature.description || '';
	          var userOrientedFeatureName = shortDescription ? shortDescription : featureName;

	          var hypothesisList = '   Улучшено';
	          if (current < max) {
	            hypothesisList = hypothesis.map(_this2.renderHypothesisItem(id, featureName, time, current, max));
	          } else {
	            return (0, _preact.h)(
	              'div',
	              { key: key },
	              userOrientedFeatureName,
	              ' (\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u043E) ',
	              '\u2713',
	              (0, _preact.h)('br', null),
	              (0, _preact.h)(
	                'div',
	                { className: 'featureDescription' },
	                description
	              ),
	              (0, _preact.h)('br', null)
	            );
	          }

	          return (0, _preact.h)(
	            'div',
	            { key: key },
	            userOrientedFeatureName,
	            ' (',
	            current,
	            '/',
	            max,
	            'XP)',
	            (0, _preact.h)('br', null),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureDescription' },
	              description
	            ),
	            hypothesisList,
	            (0, _preact.h)('br', null)
	          );
	        };
	      };

	      var renderFeature = function renderFeature(featureGroup) {
	        return function (feature, i) {
	          var featureName = feature.name;

	          var key = 'feature' + featureGroup + featureName + i;

	          var standardPoints = feature.points || {};
	          var mp = standardPoints.marketing || 0;
	          var pp = standardPoints.programming || 0;
	          var points = _playerStore2.default.getPoints();

	          var enoughPointsToUpgrade = points.marketing >= mp && points.programming >= pp;

	          var upgradeFeature = function upgradeFeature(event) {
	            _logger2.default.debug('upgradeFeature', id, featureGroup, featureName, mp, pp);

	            if (enoughPointsToUpgrade) {
	              _playerActions2.default.spendPoints(pp, mp);
	              _productActions2.default.improveFeatureByPoints(id, featureGroup, featureName);
	            }
	          };

	          var description = feature.description || '';
	          var isUpgraded = _productStore2.default.getFeatureStatus(id, featureGroup, featureName);

	          var userOrientedFeatureName = feature.shortDescription ? feature.shortDescription : featureName;
	          if (isUpgraded) {
	            return (0, _preact.h)(
	              'div',
	              { key: key },
	              userOrientedFeatureName,
	              ': \u0423\u043B\u0443\u0447\u0448\u0435\u043D\u043E ',
	              '\u2713',
	              (0, _preact.h)('br', null),
	              (0, _preact.h)(
	                'div',
	                { className: 'featureDescription' },
	                description
	              )
	            );
	          }

	          var mpColors = points.marketing < mp ? "noPoints" : "enoughPoints";
	          var ppColors = points.programming < pp ? "noPoints" : "enoughPoints";

	          return (0, _preact.h)(
	            'div',
	            { key: key },
	            userOrientedFeatureName,
	            (0, _preact.h)('br', null),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureDescription' },
	              description
	            ),
	            (0, _preact.h)(
	              'div',
	              null,
	              (0, _preact.h)(
	                'div',
	                null,
	                '\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F - \xA0',
	                (0, _preact.h)(
	                  'span',
	                  { className: mpColors },
	                  'MP:',
	                  mp,
	                  '\xA0'
	                ),
	                (0, _preact.h)(
	                  'span',
	                  { className: ppColors },
	                  'PP:',
	                  pp
	                )
	              )
	            ),
	            (0, _preact.h)(_Button2.default, {
	              disabled: !enoughPointsToUpgrade,
	              onClick: upgradeFeature,
	              text: '\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C',
	              secondary: true
	            }),
	            (0, _preact.h)('br', null)
	          );
	        };
	      };

	      // console.log('product', product);
	      var featureList = this.getSpecificProductFeatureListByIdea(idea).map(renderMainFeature('offer'));

	      var marketing = this.getMarketingFeatureList(idea).map(renderFeature('marketing'));

	      var development = this.getDevelopmentFeatureList(idea).map(renderFeature('development'));

	      // <b>Разработка</b>
	      // {development}

	      var analytics = this.getAnalyticFeatures(idea).map(renderFeature('analytics'));

	      var payment = this.getPaymentFeatures(idea).map(renderFeature('payment'));

	      // var arrow = saldo ? '\u2197' : '\u2198';
	      var upArrow = '\u2191';
	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'b',
	          null,
	          '\u0420\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430'
	        ),
	        (0, _preact.h)(
	          'div',
	          { style: { padding: '15px' } },
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430'
	          ),
	          (0, _preact.h)(_metrics2.default, { product: product, id: id }),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupTitle',
	              onClick: this.toggleMainFeatureTab
	            },
	            '\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430'
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupDescriptionWrapper',
	              style: { display: state.features ? 'block' : 'none' }
	            },
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupDescription' },
	              '\u0423\u043B\u0443\u0447\u0448\u0430\u044F \u0433\u043B\u0430\u0432\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430, \u0432\u044B \u043F\u043E\u0432\u044B\u0448\u0430\u0435\u0442\u0435 \u0435\u0433\u043E \u0440\u0435\u0439\u0442\u0438\u043D\u0433, \u0447\u0442\u043E \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442 \u043A \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u044E \u0432\u0441\u0435\u0445 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0445 \u043C\u0435\u0442\u0440\u0438\u043A'
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupBody' },
	              featureList
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'hide', onClick: this.toggleMainFeatureTab },
	              '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C ',
	              upArrow
	            )
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupTitle',
	              onClick: this.toggleMarketingTab
	            },
	            '\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438'
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupDescriptionWrapper',
	              style: { display: state.marketing ? 'block' : 'none' }
	            },
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupDescription' },
	              '\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0441\u043D\u0438\u0437\u0438\u0442\u044C \u043E\u0442\u0442\u043E\u043A \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u043F\u043E\u0432\u044B\u0448\u0430\u044F \u0438\u0445 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupBody' },
	              marketing
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'hide', onClick: this.toggleMarketingTab },
	              '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C ',
	              upArrow
	            )
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupTitle',
	              onClick: this.toggleAnalyticsTab
	            },
	            '\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupDescriptionWrapper',
	              style: { display: state.analytics ? 'block' : 'none' }
	            },
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupDescription' },
	              '\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0443\u043B\u0443\u0447\u0448\u0430\u0442\u044C \u0433\u043B\u0430\u0432\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430'
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupBody' },
	              analytics
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'hide', onClick: this.toggleAnalyticsTab },
	              '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C ',
	              upArrow
	            )
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupTitle',
	              onClick: this.togglePaymentTab
	            },
	            '\u041C\u043E\u043D\u0435\u0442\u0438\u0437\u0430\u0446\u0438\u044F'
	          ),
	          (0, _preact.h)(
	            'div',
	            {
	              className: 'featureGroupDescriptionWrapper',
	              style: { display: state.payment ? 'block' : 'none' }
	            },
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupDescription' },
	              '\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0434\u043E\u0445\u043E\u0434\u044B \u0441 \u043F\u0440\u043E\u0434\u0430\u0436'
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'featureGroupBody' },
	              payment
	            ),
	            (0, _preact.h)(
	              'div',
	              { className: 'hide', onClick: this.togglePaymentTab },
	              '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C ',
	              upArrow
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return DevelopPanel;
	}(_preact.Component);

	exports.default = DevelopPanel;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _coloringRange = __webpack_require__(159);

	var _coloringRange2 = _interopRequireDefault(_coloringRange);

	var _percentify = __webpack_require__(100);

	var _percentify2 = _interopRequireDefault(_percentify);

	var _round = __webpack_require__(96);

	var _round2 = _interopRequireDefault(_round);

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
	    value: function render() {
	      var props = this.props;

	      var id = props.id;

	      var product = props.product;
	      var idea = product.idea;


	      var debt = product.KPI.debt;

	      var rating = (0, _round2.default)(_productStore2.default.getRatingForMetricsTab(id));

	      var ratingColor = _coloringRange2.default.standard(rating, 10);

	      // <div>Технический долг: {debt} ({this.getTechnicalDebtDescription(debt)})</div>
	      var churn = (0, _percentify2.default)(_productStore2.default.getChurnRate(id));
	      var disloyalClients = _productStore2.default.getDisloyalClients(id);
	      var conversion = (0, _percentify2.default)(_productStore2.default.getConversionRate(id));
	      var clients = _productStore2.default.getClients(id);
	      var income = (0, _round2.default)(_productStore2.default.getProductIncome(id));
	      var virality = (0, _round2.default)(_productStore2.default.getViralityRate(id));
	      var viralClients = _productStore2.default.getViralClients(id);

	      var newbies = _productStore2.default.getNewClients(id);

	      var canShowRatingTab = _productStore2.default.getRatingForMetricsTab(id) != 0;
	      var canShowChurnTab = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'segmenting');
	      var canShowViralityTab = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'shareAnalytics');
	      var canShowPayingPercentage = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'paymentAnalytics');
	      var canShowClientsTab = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'webvisor') || !!_productStore2.default.getFeatureStatus(id, 'analytics', 'segmenting');
	      var canShowNewClientsTab = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'webvisor') || !!_productStore2.default.getFeatureStatus(id, 'analytics', 'segmenting');
	      var canShowIncomeTab = !!_productStore2.default.getFeatureStatus(id, 'analytics', 'paymentAnalytics');

	      var ratingTab = void 0;
	      if (canShowRatingTab) {
	        ratingTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ',
	            (0, _preact.h)(
	              'span',
	              { style: { color: ratingColor } },
	              rating
	            ),
	            '/10'
	          )
	        );
	      } else {
	        ratingTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ???'
	          )
	        );
	      }

	      var churnTab = void 0;
	      if (canShowChurnTab) {
	        churnTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041E\u0442\u0442\u043E\u043A \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432: ',
	            churn,
	            '% (',
	            disloyalClients,
	            ')'
	          )
	        );
	      }

	      var viralityTab = void 0;
	      if (canShowViralityTab) {
	        viralityTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u0412\u0438\u0440\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ',
	            virality,
	            ' (',
	            viralClients,
	            ')'
	          )
	        );
	      }

	      var newClientsTab = void 0;
	      if (canShowNewClientsTab) {
	        newClientsTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041D\u043E\u0432\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B: ',
	            newbies
	          )
	        );
	      }

	      var payingPercentageTab = void 0;
	      if (canShowPayingPercentage) {
	        payingPercentageTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041F\u0440\u043E\u0446\u0435\u043D\u0442 \u043F\u043B\u0430\u0442\u044F\u0449\u0438\u0445: ',
	            conversion,
	            '%'
	          )
	        );
	      }

	      var clientsTab = void 0;
	      if (canShowClientsTab) {
	        clientsTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u041A\u043B\u0438\u0435\u043D\u0442\u044B: ',
	            clients
	          )
	        );
	      }

	      var incomeTab = void 0;
	      if (canShowIncomeTab) {
	        incomeTab = (0, _preact.h)(
	          'li',
	          null,
	          (0, _preact.h)(
	            'b',
	            null,
	            '\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434: ',
	            income,
	            '$'
	          )
	        );
	      }

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'ul',
	            null,
	            ratingTab,
	            clientsTab,
	            churnTab,
	            viralityTab,
	            payingPercentageTab,
	            incomeTab
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
/* 152 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (cost) {
	  return function (e) {
	    return (0, _assign2.default)(e, { cost: e.time * cost });
	  };
	};
	// export default cost => e => e;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dispatcher = __webpack_require__(103);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _scheduleActions = __webpack_require__(108);

	var ACTIONS = _interopRequireWildcard(_scheduleActions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  increaseDay: function increaseDay() {
	    _dispatcher2.default.dispatch({
	      type: ACTIONS.SCHEDULE_ACTIONS_DAY_TICK
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _UI = __webpack_require__(129);

	var _UI2 = _interopRequireDefault(_UI);

	var _productActions = __webpack_require__(148);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AdvertPlannerPanel = function (_Component) {
	  (0, _inherits3.default)(AdvertPlannerPanel, _Component);

	  function AdvertPlannerPanel() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, AdvertPlannerPanel);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AdvertPlannerPanel.__proto__ || (0, _getPrototypeOf2.default)(AdvertPlannerPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      possibleClients: 0
	    }, _this.onDrag = function (possibleClients) {
	      _this.setState({ possibleClients: possibleClients });
	    }, _this.inviteUsers = function (id, amountOfUsers, cost) {
	      return function () {
	        if (_playerStore2.default.getMoney() >= cost) {
	          _productActions2.default.addClients(id, amountOfUsers);
	          _playerActions2.default.increaseMoney(-cost);

	          _this.onDrag(0);
	        }
	      };
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(AdvertPlannerPanel, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props,
	          state = this.state;


	      var id = props.id;
	      var costPerClient = _productStore2.default.getCostPerClient(id);

	      var possibleClients = state.possibleClients;


	      var maxPossibleClients = Math.floor(_playerStore2.default.getMoney() / costPerClient);
	      var campaignCost = Math.ceil(possibleClients * costPerClient);

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(_UI2.default.Range, { min: 0, max: maxPossibleClients, onDrag: this.onDrag }),
	        (0, _preact.h)(
	          'div',
	          null,
	          (0, _preact.h)(
	            'div',
	            null,
	            'Invite ',
	            possibleClients,
	            ' users to your website for ',
	            campaignCost,
	            '$'
	          ),
	          (0, _preact.h)(_UI2.default.Button, {
	            item: 'start-campaign',
	            text: 'Start ad campaign for ' + campaignCost + '$',
	            onClick: this.inviteUsers(id, possibleClients, campaignCost),
	            primary: true
	          })
	        )
	      );
	    }
	  }]);
	  return AdvertPlannerPanel;
	}(_preact.Component);
	// import React, { Component, PropTypes } from 'react';

	exports.default = AdvertPlannerPanel;
	;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(40);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(45);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(46);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(85);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _preact = __webpack_require__(1);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _UI = __webpack_require__(129);

	var _UI2 = _interopRequireDefault(_UI);

	var _job = __webpack_require__(111);

	var JOB = _interopRequireWildcard(_job);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import React, { Component, PropTypes } from 'react';

	var PointShop = function (_Component) {
	  (0, _inherits3.default)(PointShop, _Component);

	  function PointShop() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, PointShop);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PointShop.__proto__ || (0, _getPrototypeOf2.default)(PointShop)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      pp: 0,
	      mp: 0
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(PointShop, [{
	    key: 'render',
	    value: function render(props) {
	      var _this2 = this;

	      var state = this.state;


	      var minPP = 0;
	      var maxPP = _playerStore2.default.getMaxPossibleFreelanceProgrammingPoints();

	      var minMP = 0;
	      var maxMP = _playerStore2.default.getMaxPossibleFreelanceMarketingPoints();

	      var pp = state.pp,
	          mp = state.mp;


	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'span',
	          null,
	          minPP
	        ),
	        (0, _preact.h)(
	          'span',
	          null,
	          (0, _preact.h)(_UI2.default.Range, { min: minPP, max: maxPP, onDrag: function onDrag(pp) {
	              _this2.setState({ pp: pp });
	            } })
	        ),
	        (0, _preact.h)(
	          'span',
	          null,
	          maxPP
	        ),
	        (0, _preact.h)(_UI2.default.Button, {
	          text: '\u041A\u0443\u043F\u0438\u0442\u044C ' + pp + ' PP \u0437\u0430 ' + JOB.PRICE_OF_ONE_PP * pp + '$',
	          onClick: function onClick() {
	            _playerActions2.default.buyProgrammingPoints(pp);
	          }
	        }),
	        (0, _preact.h)(
	          'span',
	          null,
	          minMP
	        ),
	        (0, _preact.h)(
	          'span',
	          null,
	          (0, _preact.h)(_UI2.default.Range, { min: minMP, max: maxMP, onDrag: function onDrag(mp) {
	              _this2.setState({ mp: mp });
	            } })
	        ),
	        (0, _preact.h)(
	          'span',
	          null,
	          maxMP
	        ),
	        (0, _preact.h)(_UI2.default.Button, {
	          text: '\u041A\u0443\u043F\u0438\u0442\u044C ' + mp + ' MP \u0437\u0430 ' + JOB.PRICE_OF_ONE_MP * mp + '$',
	          onClick: function onClick() {
	            _playerActions2.default.buyMarketingPoints(mp);
	          }
	        })
	      );
	    }
	  }]);
	  return PointShop;
	}(_preact.Component);

	exports.default = PointShop;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _productActions = __webpack_require__(148);

	var _productActions2 = _interopRequireDefault(_productActions);

	var _scheduleActions = __webpack_require__(154);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	var _moneyDifference = __webpack_require__(120);

	var _moneyDifference2 = _interopRequireDefault(_moneyDifference);

	var _eventGenerator = __webpack_require__(158);

	var _eventGenerator2 = _interopRequireDefault(_eventGenerator);

	var _job = __webpack_require__(111);

	var JOB = _interopRequireWildcard(_job);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isLastDayOfMonth = function isLastDayOfMonth(day) {
	  return day % 30 === 0;
	};

	var computeTasks = function computeTasks(tasks) {
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

	var run = function run() {
	  _scheduleActions2.default.increaseDay();

	  var day = _scheduleStore2.default.getDay();
	  var tasks = _scheduleStore2.default.getTasks();
	  var products = _productStore2.default.getProducts();

	  // check tasks for finishing
	  computeTasks(tasks);

	  // check if it is last day of month (pay day)
	  if (isLastDayOfMonth(day)) {
	    // calculate client amount change
	    products.forEach(function (p, i) {
	      var churn = _productStore2.default.getDisloyalClients(i);
	      var viral = _productStore2.default.getViralClients(i);

	      _productActions2.default.removeClients(i, churn);
	      _productActions2.default.viralClients(i, viral);
	    });

	    var difference = _moneyDifference2.default.saldo();

	    _playerActions2.default.increaseMoney(difference);

	    var money = _playerStore2.default.getMoney();

	    // take loans if necessary
	    if (money < 0) {
	      _playerActions2.default.loans.take(-money);
	    }

	    // calculate human points

	    // calculate programmer points
	    var ppProducers = _playerStore2.default.getTeam().filter(function (p) {
	      return p.task === JOB.JOB_TASK_PROGRAMMER_POINTS;
	    });

	    var programmingPoints = ppProducers.length ? ppProducers.map(function (p) {
	      return _playerStore2.default.getProgrammingPointsProducedBy(p);
	    }).reduce(function (p, c) {
	      return p + c;
	    }) : 0;

	    // calculate marketing points
	    var mpProducers = _playerStore2.default.getTeam().filter(function (p) {
	      return p.task === JOB.JOB_TASK_MARKETING_POINTS;
	    });
	    var marketingPoints = mpProducers.length ? mpProducers.map(function (p) {
	      return _playerStore2.default.getMarketingPointsProducedBy(p);
	    }).reduce(function (p, c) {
	      return p + c;
	    }) : 0;

	    _logger2.default.log('increase points', programmingPoints, marketingPoints);
	    _logger2.default.shit('compute penalties and bonuses for point production');

	    var points = {
	      programming: programmingPoints,
	      marketing: marketingPoints
	    };
	    _playerActions2.default.increasePoints(points);
	  }

	  // try to make an event
	  _eventGenerator2.default.emit();
	};

	exports.default = {
	  run: run
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _random = __webpack_require__(149);

	var _random2 = _interopRequireDefault(_random);

	var _events = __webpack_require__(134);

	var GAME_EVENTS = _interopRequireWildcard(_events);

	var _job = __webpack_require__(111);

	var JOB = _interopRequireWildcard(_job);

	var _flux = __webpack_require__(160);

	var _flux2 = _interopRequireDefault(_flux);

	var _logger = __webpack_require__(98);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var emit = function emit() {
	  var rnd = Math.floor((0, _random2.default)(0, 30));

	  switch (rnd) {
	    case GAME_EVENTS.GAME_EVENT_FREE_MONEY:
	      var money = Math.ceil((0, _random2.default)(2000, 15000));
	      _flux2.default.messageActions.addGameEvent(rnd, { money: money });
	      break;

	    case GAME_EVENTS.GAME_EVENT_FREE_POINTS:
	      var points = Math.ceil((0, _random2.default)(50, 275));
	      _flux2.default.messageActions.addGameEvent(rnd, { points: points });
	      break;

	    case GAME_EVENTS.GAME_EVENT_HIRE_ENTHUSIAST:
	      if (_flux2.default.playerStore.getTeam().length < 4) {
	        var names = ['Jessie', 'John', 'Pedro', 'Martin', 'Rebeca', 'Antonella'];
	        var index = Math.floor((0, _random2.default)(0, names.length));
	        var name = names[index];

	        var programming = Math.floor((0, _random2.default)(0, 1000));
	        var marketing = Math.floor((0, _random2.default)(0, 1000));
	        var analyst = Math.floor((0, _random2.default)(0, 1000));

	        _flux2.default.messageActions.addGameEvent(rnd, {
	          player: {
	            name: name,
	            skills: {
	              programming: programming,
	              marketing: marketing,
	              analyst: analyst
	            },
	            task: JOB.JOB_TASK_MARKETING_POINTS,
	            jobMotivation: JOB.JOB_MOTIVATION_IDEA_FAN,
	            salary: {}
	          }
	        });
	      }
	      break;
	  }
	};

	exports.default = {
	  emit: emit
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  standard: function standard(value, range) {
	    var green = Math.floor(value * 160 / range);
	    var red = 255 - Math.floor(value * 255 / range);

	    return "rgba(" + red + ", " + green + ", 0, 1)"; //`rgba(${red}, ${green}, 0, 1)`;
	  }
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _playerStore = __webpack_require__(116);

	var _playerStore2 = _interopRequireDefault(_playerStore);

	var _scheduleStore = __webpack_require__(101);

	var _scheduleStore2 = _interopRequireDefault(_scheduleStore);

	var _messageStore = __webpack_require__(132);

	var _messageStore2 = _interopRequireDefault(_messageStore);

	var _productStore = __webpack_require__(121);

	var _productStore2 = _interopRequireDefault(_productStore);

	var _playerActions = __webpack_require__(114);

	var _playerActions2 = _interopRequireDefault(_playerActions);

	var _scheduleActions = __webpack_require__(154);

	var _scheduleActions2 = _interopRequireDefault(_scheduleActions);

	var _messageActions = __webpack_require__(139);

	var _messageActions2 = _interopRequireDefault(_messageActions);

	var _productActions = __webpack_require__(148);

	var _productActions2 = _interopRequireDefault(_productActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  playerStore: _playerStore2.default,
	  scheduleStore: _scheduleStore2.default,
	  messageStore: _messageStore2.default,
	  productStore: _productStore2.default,
	  playerActions: _playerActions2.default,
	  scheduleActions: _scheduleActions2.default,
	  messageActions: _messageActions2.default,
	  productActions: _productActions2.default
	};

/***/ }
/******/ ]);