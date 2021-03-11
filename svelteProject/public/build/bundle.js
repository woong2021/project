
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\layout\Header.svelte generated by Svelte v3.35.0 */

    const file$2 = "src\\layout\\Header.svelte";

    function create_fragment$2(ctx) {
    	let header;
    	let section;
    	let h1;
    	let a0;
    	let t1;
    	let nav;
    	let div0;
    	let a1;
    	let t3;
    	let div1;
    	let a2;
    	let t5;
    	let div2;
    	let a3;
    	let t7;
    	let div3;
    	let a4;
    	let t9;
    	let div4;
    	let a5;
    	let t11;
    	let div5;
    	let a6;
    	let t13;
    	let div6;
    	let a7;

    	const block = {
    		c: function create() {
    			header = element("header");
    			section = element("section");
    			h1 = element("h1");
    			a0 = element("a");
    			a0.textContent = "What to do!?";
    			t1 = space();
    			nav = element("nav");
    			div0 = element("div");
    			a1 = element("a");
    			a1.textContent = "Svelte 1";
    			t3 = space();
    			div1 = element("div");
    			a2 = element("a");
    			a2.textContent = "Svelte 2";
    			t5 = space();
    			div2 = element("div");
    			a3 = element("a");
    			a3.textContent = "Svelte 3";
    			t7 = space();
    			div3 = element("div");
    			a4 = element("a");
    			a4.textContent = "Svelte 4";
    			t9 = space();
    			div4 = element("div");
    			a5 = element("a");
    			a5.textContent = "Svelte 5";
    			t11 = space();
    			div5 = element("div");
    			a6 = element("a");
    			a6.textContent = "Svelte 6";
    			t13 = space();
    			div6 = element("div");
    			a7 = element("a");
    			a7.textContent = "Svelte 7";
    			attr_dev(a0, "href", "");
    			add_location(a0, file$2, 5, 12, 60);
    			attr_dev(h1, "class", "svelte-iwb8ch");
    			add_location(h1, file$2, 5, 8, 56);
    			attr_dev(a1, "href", "");
    			add_location(a1, file$2, 7, 17, 140);
    			attr_dev(div0, "class", "svelte-iwb8ch");
    			add_location(div0, file$2, 7, 12, 135);
    			attr_dev(a2, "href", "");
    			add_location(a2, file$2, 8, 17, 188);
    			attr_dev(div1, "class", "svelte-iwb8ch");
    			add_location(div1, file$2, 8, 12, 183);
    			attr_dev(a3, "href", "");
    			add_location(a3, file$2, 9, 17, 236);
    			attr_dev(div2, "class", "svelte-iwb8ch");
    			add_location(div2, file$2, 9, 12, 231);
    			attr_dev(a4, "href", "");
    			add_location(a4, file$2, 10, 17, 284);
    			attr_dev(div3, "class", "svelte-iwb8ch");
    			add_location(div3, file$2, 10, 12, 279);
    			attr_dev(a5, "href", "");
    			add_location(a5, file$2, 11, 17, 332);
    			attr_dev(div4, "class", "svelte-iwb8ch");
    			add_location(div4, file$2, 11, 12, 327);
    			attr_dev(a6, "href", "");
    			add_location(a6, file$2, 12, 17, 380);
    			attr_dev(div5, "class", "svelte-iwb8ch");
    			add_location(div5, file$2, 12, 12, 375);
    			attr_dev(a7, "href", "");
    			add_location(a7, file$2, 13, 17, 428);
    			attr_dev(div6, "class", "svelte-iwb8ch");
    			add_location(div6, file$2, 13, 12, 423);
    			attr_dev(nav, "id", "menuList");
    			attr_dev(nav, "class", "svelte-iwb8ch");
    			add_location(nav, file$2, 6, 8, 102);
    			attr_dev(section, "class", "svelte-iwb8ch");
    			add_location(section, file$2, 4, 4, 37);
    			attr_dev(header, "class", "svelte-iwb8ch");
    			add_location(header, file$2, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, section);
    			append_dev(section, h1);
    			append_dev(h1, a0);
    			append_dev(section, t1);
    			append_dev(section, nav);
    			append_dev(nav, div0);
    			append_dev(div0, a1);
    			append_dev(nav, t3);
    			append_dev(nav, div1);
    			append_dev(div1, a2);
    			append_dev(nav, t5);
    			append_dev(nav, div2);
    			append_dev(div2, a3);
    			append_dev(nav, t7);
    			append_dev(nav, div3);
    			append_dev(div3, a4);
    			append_dev(nav, t9);
    			append_dev(nav, div4);
    			append_dev(div4, a5);
    			append_dev(nav, t11);
    			append_dev(nav, div5);
    			append_dev(div5, a6);
    			append_dev(nav, t13);
    			append_dev(nav, div6);
    			append_dev(div6, a7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\layout\Footer.svelte generated by Svelte v3.35.0 */

    const file$1 = "src\\layout\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let section;
    	let article0;
    	let t1;
    	let article1;
    	let ul;
    	let li0;
    	let a;
    	let t3;
    	let li1;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			section = element("section");
    			article0 = element("article");
    			article0.textContent = "Copyrights © 2018-2021 SeWoong, All Rights Reserved.";
    			t1 = space();
    			article1 = element("article");
    			ul = element("ul");
    			li0 = element("li");
    			a = element("a");
    			a.textContent = "010-4263-1501";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "메일보내기";
    			add_location(article0, file$1, 5, 6, 52);
    			attr_dev(a, "href", "tel:010-4263-1501");
    			attr_dev(a, "target", "_self");
    			add_location(a, file$1, 10, 18, 201);
    			add_location(li0, file$1, 10, 14, 197);
    			add_location(li1, file$1, 11, 14, 285);
    			add_location(ul, file$1, 9, 10, 177);
    			add_location(article1, file$1, 8, 6, 156);
    			add_location(section, file$1, 4, 2, 35);
    			attr_dev(footer, "class", "svelte-1ehydpq");
    			add_location(footer, file$1, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, section);
    			append_dev(section, article0);
    			append_dev(section, t1);
    			append_dev(section, article1);
    			append_dev(article1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Footer", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.35.0 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (45:2) {:else}
    function create_else_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "No name!!";
    			add_location(div, file, 45, 4, 769);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(45:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {#if toggle}
    function create_if_block(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Hello ");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = text("!");
    			add_location(div, file, 43, 4, 730);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(43:2) {#if toggle}",
    		ctx
    	});

    	return block;
    }

    // (49:4) {#each fruits as fruit}
    function create_each_block(ctx) {
    	let li;
    	let t_value = /*fruit*/ ctx[8] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file, 49, 6, 839);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fruits*/ 8 && t_value !== (t_value = /*fruit*/ ctx[8] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(49:4) {#each fruits as fruit}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let main;
    	let h1;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let p;
    	let t5;
    	let t6;
    	let img;
    	let img_src_value;
    	let t7;
    	let input;
    	let t8;
    	let button0;
    	let t10;
    	let button1;
    	let t12;
    	let t13;
    	let ul;
    	let t14;
    	let button2;
    	let t16;
    	let footer;
    	let current;
    	let mounted;
    	let dispose;
    	header = new Header({ $$inline: true });

    	function select_block_type(ctx, dirty) {
    		if (/*toggle*/ ctx[2]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	let each_value = /*fruits*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			main = element("main");
    			h1 = element("h1");
    			t1 = text("Hello ");
    			t2 = text(/*name*/ ctx[0]);
    			t3 = text("!");
    			t4 = space();
    			p = element("p");
    			t5 = text(/*age*/ ctx[1]);
    			t6 = space();
    			img = element("img");
    			t7 = space();
    			input = element("input");
    			t8 = space();
    			button0 = element("button");
    			button0.textContent = "Assign";
    			t10 = space();
    			button1 = element("button");
    			button1.textContent = "Toggle";
    			t12 = space();
    			if_block.c();
    			t13 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t14 = space();
    			button2 = element("button");
    			button2.textContent = "Eat it!!";
    			t16 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(h1, "class", "svelte-1hov68c");
    			add_location(h1, file, 29, 2, 446);
    			attr_dev(p, "class", "svelte-1hov68c");
    			add_location(p, file, 30, 2, 471);
    			if (img.src !== (img_src_value = "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*name*/ ctx[0]);
    			add_location(img, file, 31, 2, 486);
    			attr_dev(input, "type", "text");
    			add_location(input, file, 33, 2, 535);
    			add_location(button0, file, 34, 2, 577);
    			add_location(button1, file, 35, 2, 623);
    			add_location(ul, file, 47, 2, 800);
    			add_location(button2, file, 52, 2, 878);
    			attr_dev(main, "class", "svelte-1hov68c");
    			add_location(main, file, 28, 0, 437);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(h1, t3);
    			append_dev(main, t4);
    			append_dev(main, p);
    			append_dev(p, t5);
    			append_dev(main, t6);
    			append_dev(main, img);
    			append_dev(main, t7);
    			append_dev(main, input);
    			set_input_value(input, /*name*/ ctx[0]);
    			append_dev(main, t8);
    			append_dev(main, button0);
    			append_dev(main, t10);
    			append_dev(main, button1);
    			append_dev(main, t12);
    			if_block.m(main, null);
    			append_dev(main, t13);
    			append_dev(main, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(main, t14);
    			append_dev(main, button2);
    			insert_dev(target, t16, anchor);
    			mount_component(footer, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
    					listen_dev(button0, "click", /*assign*/ ctx[4], false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[7], false, false, false),
    					listen_dev(button2, "click", /*deleteFruit*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1) set_data_dev(t2, /*name*/ ctx[0]);
    			if (!current || dirty & /*age*/ 2) set_data_dev(t5, /*age*/ ctx[1]);

    			if (!current || dirty & /*name*/ 1) {
    				attr_dev(img, "alt", /*name*/ ctx[0]);
    			}

    			if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
    				set_input_value(input, /*name*/ ctx[0]);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(main, t13);
    				}
    			}

    			if (dirty & /*fruits*/ 8) {
    				each_value = /*fruits*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			if_block.d();
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t16);
    			destroy_component(footer, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let name = "world";
    	let age = 38;

    	//바인드
    	function assign() {
    		$$invalidate(0, name = "woong");
    		$$invalidate(1, age = 39);
    	}

    	let toggle = false;

    	//반복문 예시
    	let fruits = ["Apple", "Banana", "Cherry", "Orange", "Mango"];

    	function deleteFruit() {
    		$$invalidate(3, fruits = fruits.slice(1));
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	const click_handler = () => {
    		$$invalidate(2, toggle = !toggle);
    	};

    	$$self.$capture_state = () => ({
    		Header,
    		Footer,
    		name,
    		age,
    		assign,
    		toggle,
    		fruits,
    		deleteFruit
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("age" in $$props) $$invalidate(1, age = $$props.age);
    		if ("toggle" in $$props) $$invalidate(2, toggle = $$props.toggle);
    		if ("fruits" in $$props) $$invalidate(3, fruits = $$props.fruits);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		age,
    		toggle,
    		fruits,
    		assign,
    		deleteFruit,
    		input_input_handler,
    		click_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
