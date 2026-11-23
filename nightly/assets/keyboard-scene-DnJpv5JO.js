import{a as e,d as t,f as n,g as r,h as i,i as a,l as o,m as s,n as c,o as l,r as u,s as d,t as f,u as p,y as m}from"./index-DBw6doCj.js";import{$ as h,A as g,Bt as _,C as v,Ct as y,D as b,Dt as x,E as S,G as C,Gt as w,Ht as T,Jt as E,Kt as D,Lt as ee,N as te,Nt as ne,O,Ot as k,Pt as re,Q as A,Rt as j,S as M,St as ie,Tt as ae,Ut as N,Vt as P,W as oe,Wt as F,Z as I,_ as L,a as se,b as R,dt as z,et as ce,f as le,ft as ue,h as de,i as fe,it as B,k as pe,kt as me,l as he,m as V,mt as H,nt as ge,o as _e,ot as ve,p as ye,pt as be,rt as U,t as xe,tt as W,u as G,ut as Se,v as Ce,vt as we,w as Te,wt as Ee,x as De,xt as K,y as Oe,z as q,zt as ke}from"./OrbitControls-C97-yGK9.js";import{n as Ae,r as J,t as je}from"./switch-model-By1o1h6j.js";import{n as Me,t as Ne}from"./appearance-DTZoWBJw.js";var Pe=t(p(`q1-max-ansi-encoder`),`control_dial`);function Fe(e){let t=new Map(e.children.filter(e=>e.name.startsWith(`key_`)).map(e=>[e.name.slice(4),e])),r=i.keys.map(e=>{let n=e.code===`ControlRight`?`ControlLeft`:e.code===`Escape`?`EscapeFn`:e.code,r=t.get(n),i=s[75].find(t=>t.width===e.width),a=i&&t.get(i.code);if(!r||!a)throw Error(`Missing Q1 cap template: ${e.code}`);let o=new O;o.name=`key_${e.code}`,o.position.set(e.x,r.position.y,-e.y);for(let e of a.children)if(!e.name.startsWith(`legend_`)){let t=e.clone(),n=r.children.find(e=>e instanceof h&&!e.name.startsWith(`legend_`));t instanceof h&&n instanceof h&&(t.material=n.material),o.add(t)}for(let e of r.children)e.name.startsWith(`legend_`)&&o.add(e.clone());return o});for(let n of t.values())e.remove(n);for(let t of e.children)t.position.x*=16.25/16,t.position.z*=6.5/6,t.scale.x*=16.25/16,t.scale.z*=6.5/6;e.add(...r);let a=n(Pe.size[0]/2),o=n(Pe.size[2]),c=new h(new R(a,a,o,64),new B({color:m,metalness:.85,roughness:.3}));c.name=`control_dial`,c.position.set(i.stockEncoder.x,.43+o/2,-i.stockEncoder.y),e.add(c)}var Ie={id:`am-hatsu-split-4x6`,name:`AM HATSU split 4x6 study`,layout:`4x6-split-ortho`,unit:`u`,fidelity:`illustrative`,note:`Official sources call HATSU a 4x6 / 45% split ortholinear board. Per-half 4x6 is the usual 45% split-ortho reading; Angry Miao does not publish CAD, half footprints, tent angle, or a total key count. Coordinates are a visual study, not manufacturer dimensions.`,source:{product:`https://store.angrymiao.com/products/am-hatsu`,manual:`https://cdn-www.angrymiao.com/pdf/AMHATSUUserManual%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf`},bounds:{width:15,height:4,splitGap:3},halves:{left:{centerX:-4.5,columns:6,rows:4},right:{centerX:4.5,columns:6,rows:4}},keys:[{code:`Escape`,half:`left`,row:0,col:0,width:1,x:-7,y:1.5},{code:`Digit1`,half:`left`,row:0,col:1,width:1,x:-6,y:1.5},{code:`Digit2`,half:`left`,row:0,col:2,width:1,x:-5,y:1.5},{code:`Digit3`,half:`left`,row:0,col:3,width:1,x:-4,y:1.5},{code:`Digit4`,half:`left`,row:0,col:4,width:1,x:-3,y:1.5},{code:`Digit5`,half:`left`,row:0,col:5,width:1,x:-2,y:1.5},{code:`KeyQ`,half:`left`,row:1,col:0,width:1,x:-7,y:.5},{code:`KeyW`,half:`left`,row:1,col:1,width:1,x:-6,y:.5},{code:`KeyE`,half:`left`,row:1,col:2,width:1,x:-5,y:.5},{code:`KeyR`,half:`left`,row:1,col:3,width:1,x:-4,y:.5},{code:`KeyT`,half:`left`,row:1,col:4,width:1,x:-3,y:.5},{code:`BracketLeft`,half:`left`,row:1,col:5,width:1,x:-2,y:.5},{code:`KeyA`,half:`left`,row:2,col:0,width:1,x:-7,y:-.5},{code:`KeyS`,half:`left`,row:2,col:1,width:1,x:-6,y:-.5},{code:`KeyD`,half:`left`,row:2,col:2,width:1,x:-5,y:-.5},{code:`KeyF`,half:`left`,row:2,col:3,width:1,x:-4,y:-.5},{code:`KeyG`,half:`left`,row:2,col:4,width:1,x:-3,y:-.5},{code:`Semicolon`,half:`left`,row:2,col:5,width:1,x:-2,y:-.5},{code:`KeyZ`,half:`left`,row:3,col:0,width:1,x:-7,y:-1.5},{code:`KeyX`,half:`left`,row:3,col:1,width:1,x:-6,y:-1.5},{code:`KeyC`,half:`left`,row:3,col:2,width:1,x:-5,y:-1.5},{code:`KeyV`,half:`left`,row:3,col:3,width:1,x:-4,y:-1.5},{code:`KeyB`,half:`left`,row:3,col:4,width:1,x:-3,y:-1.5},{code:`Quote`,half:`left`,row:3,col:5,width:1,x:-2,y:-1.5},{code:`Digit6`,half:`right`,row:0,col:0,width:1,x:2,y:1.5},{code:`Digit7`,half:`right`,row:0,col:1,width:1,x:3,y:1.5},{code:`Digit8`,half:`right`,row:0,col:2,width:1,x:4,y:1.5},{code:`Digit9`,half:`right`,row:0,col:3,width:1,x:5,y:1.5},{code:`Digit0`,half:`right`,row:0,col:4,width:1,x:6,y:1.5},{code:`Backspace`,half:`right`,row:0,col:5,width:1,x:7,y:1.5},{code:`KeyY`,half:`right`,row:1,col:0,width:1,x:2,y:.5},{code:`KeyU`,half:`right`,row:1,col:1,width:1,x:3,y:.5},{code:`KeyI`,half:`right`,row:1,col:2,width:1,x:4,y:.5},{code:`KeyO`,half:`right`,row:1,col:3,width:1,x:5,y:.5},{code:`KeyP`,half:`right`,row:1,col:4,width:1,x:6,y:.5},{code:`BracketRight`,half:`right`,row:1,col:5,width:1,x:7,y:.5},{code:`KeyH`,half:`right`,row:2,col:0,width:1,x:2,y:-.5},{code:`KeyJ`,half:`right`,row:2,col:1,width:1,x:3,y:-.5},{code:`KeyK`,half:`right`,row:2,col:2,width:1,x:4,y:-.5},{code:`KeyL`,half:`right`,row:2,col:3,width:1,x:5,y:-.5},{code:`Slash`,half:`right`,row:2,col:4,width:1,x:6,y:-.5},{code:`Enter`,half:`right`,row:2,col:5,width:1,x:7,y:-.5},{code:`KeyN`,half:`right`,row:3,col:0,width:1,x:2,y:-1.5},{code:`KeyM`,half:`right`,row:3,col:1,width:1,x:3,y:-1.5},{code:`Comma`,half:`right`,row:3,col:2,width:1,x:4,y:-1.5},{code:`Period`,half:`right`,row:3,col:3,width:1,x:5,y:-1.5},{code:`ShiftRight`,half:`right`,row:3,col:4,width:1,x:6,y:-1.5},{code:`ControlRight`,half:`right`,row:3,col:5,width:1,x:7,y:-1.5}]};function Le(e){let t=new Map(e.children.filter(e=>e.name.startsWith(`key_`)).map(e=>[e.name.slice(4),e])),n=t.get(`KeyA`);if(!n)throw Error(`Missing 1u HATSU cap template: KeyA`);let r=n.position.y,i=Ie.keys.map(e=>{let i=t.get(e.code),a=new O;a.name=`key_${e.code}`,a.position.set(e.x,r,-e.y);for(let e of n.children)e.name.startsWith(`legend_`)||a.add(e.clone());if(i){for(let t of i.children)if(t.name.startsWith(`legend_`)){let n=t.clone();n.name=`legend_${e.code}`,a.add(n)}}return a});for(;e.children.length;)e.remove(e.children[0]);e.add(...i);let a=new B({name:`case`,color:`#4a5564`,metalness:.8,roughness:.33}),o=new B({name:`plate`,color:`#30343a`,metalness:.4,roughness:.35}),s=new B({name:`pcb`,color:`#0f2e24`,roughness:.65}),c=new O;c.name=`case_bottom`;let l=new O;l.name=`plate`;let u=new O;u.name=`pcb`;for(let e of[`left`,`right`]){let t=Ie.halves[e].centerX,n=new h(new J(6.7,.42,4.7,4,.16),a);n.name=`case_${e}`,n.position.set(t,.05,0),c.add(n);let r=new h(new J(6.15,.05,4.15,2,.04),o);r.name=`plate_${e}`,r.position.set(t,.39,0),l.add(r);let i=new h(new J(6.1,.08,4.1,2,.04),s);i.name=`pcb_${e}`,i.position.set(t,.29,0),u.add(i)}e.add(c,l,u)}var Y={rows:5,columns:40,width:14,depth:1.55,y:.58,z:-3.42};function Re(e){if(e.getObjectByName(`display_panel`))return;let t=new O;t.name=`display_panel`;let n=new h(new J(Y.width+.18,.08,Y.depth+.12,2,.04),new B({name:`mod`,color:`#111114`,metalness:.2,roughness:.4}));n.position.set(0,Y.y,Y.z),t.add(n);let r=Y.width/Y.columns,i=Y.depth/Y.rows,a=new G(r*.72,.03,i*.72),o=new B({name:`accent`,color:`#5ce1ff`,emissive:`#5ce1ff`,emissiveIntensity:.55,roughness:.35}),s=new te(a,o,Y.rows*Y.columns);s.name=`display_pixels`;let c=new A,l=0,u=-Y.width/2+r/2,d=Y.z-Y.depth/2+i/2;for(let e=0;e<Y.rows;e++)for(let t=0;t<Y.columns;t++)s.setMatrixAt(l++,c.makeTranslation(u+t*r,Y.y+.055,d+e*i));t.add(s),e.add(t)}var ze={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},X=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Be=new z(-1,1,1,-1,0,1),Z=new class extends le{constructor(){super(),this.setAttribute(`position`,new S([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new S([0,2,0,0,2,0],2))}},Ve=class{constructor(e){this._mesh=new h(Z,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},He=class extends X{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof k?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=P.clone(e.uniforms),this.material=new k({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ve(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ue=class extends X{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},We=class extends X{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ge=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new F);this._width=n.width,this._height=n.height,t=new E(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pe}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new He(ze),this.copyPass.material.blending=0,this.timer=new j}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ue!==void 0&&(r instanceof Ue?n=!0:r instanceof We&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new F);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ke=class extends X{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new L}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},qe={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new F},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new A},cameraProjectionMatrixInverse:{value:new A},cameraWorldMatrix:{value:new A},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new w(-1,-1,-1)},sceneBoxMax:{value:new w(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Je={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ye={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Xe(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=Ze(t),r=n.length,i=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],a=2*Math.PI*t/r,o=new w(Math.cos(a),Math.sin(a),0).normalize();i[e*4]=(o.x*.5+.5)*255,i[e*4+1]=(o.y*.5+.5)*255,i[e*4+2]=127,i[e*4+3]=255}let a=new De(i,t,t);return a.wrapS=Ee,a.wrapT=Ee,a.needsUpdate=!0,a}function Ze(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var Qe={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:$e(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new F},cameraProjectionMatrixInverse:{value:new A},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function $e(e,t,n){let r=et(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function et(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new w(Math.cos(a),Math.sin(a),o))}return r}var tt=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let ee=.5-y*y-b*b;return ee<0?i=0:(ee*=ee,i=ee*ee*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,ee=g-S+2*d,te=_-C+2*d,ne=v-w+2*d,O=g-1+3*d,k=_-1+3*d,re=v-1+3*d,A=c&255,j=l&255,M=u&255,ie=this.perm[A+this.perm[j+this.perm[M]]]%12,ae=this.perm[A+y+this.perm[j+b+this.perm[M+x]]]%12,N=this.perm[A+S+this.perm[j+C+this.perm[M+w]]]%12,P=this.perm[A+1+this.perm[j+1+this.perm[M+1]]]%12,oe=.6-g*g-_*_-v*v;oe<0?r=0:(oe*=oe,r=oe*oe*this._dot3(this.grad3[ie],g,_,v));let F=.6-T*T-E*E-D*D;F<0?i=0:(F*=F,i=F*F*this._dot3(this.grad3[ae],T,E,D));let I=.6-ee*ee-te*te-ne*ne;I<0?a=0:(I*=I,a=I*I*this._dot3(this.grad3[N],ee,te,ne));let L=.6-O*O-k*k-re*re;return L<0?o=0:(L*=L,o=L*L*this._dot3(this.grad3[P],O,k,re)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,ee=w>T?32:0,te=w>E?16:0,ne=T>E?8:0,O=w>D?4:0,k=T>D?2:0,re=+(E>D),A=ee+te+ne+O+k+re,j=+(a[A][0]>=3),M=+(a[A][1]>=3),ie=+(a[A][2]>=3),ae=+(a[A][3]>=3),N=+(a[A][0]>=2),P=+(a[A][1]>=2),oe=+(a[A][2]>=2),F=+(a[A][3]>=2),I=+(a[A][0]>=1),L=+(a[A][1]>=1),se=+(a[A][2]>=1),R=+(a[A][3]>=1),z=w-j+c,ce=T-M+c,le=E-ie+c,ue=D-ae+c,de=w-N+2*c,fe=T-P+2*c,B=E-oe+2*c,pe=D-F+2*c,me=w-I+3*c,he=T-L+3*c,V=E-se+3*c,H=D-R+3*c,ge=w-1+4*c,_e=T-1+4*c,ve=E-1+4*c,ye=D-1+4*c,be=h&255,U=g&255,xe=_&255,W=v&255,G=o[be+o[U+o[xe+o[W]]]]%32,Se=o[be+j+o[U+M+o[xe+ie+o[W+ae]]]]%32,Ce=o[be+N+o[U+P+o[xe+oe+o[W+F]]]]%32,we=o[be+I+o[U+L+o[xe+se+o[W+R]]]]%32,Te=o[be+1+o[U+1+o[xe+1+o[W+1]]]]%32,Ee=.6-w*w-T*T-E*E-D*D;Ee<0?l=0:(Ee*=Ee,l=Ee*Ee*this._dot4(i[G],w,T,E,D));let De=.6-z*z-ce*ce-le*le-ue*ue;De<0?u=0:(De*=De,u=De*De*this._dot4(i[Se],z,ce,le,ue));let K=.6-de*de-fe*fe-B*B-pe*pe;K<0?d=0:(K*=K,d=K*K*this._dot4(i[Ce],de,fe,B,pe));let Oe=.6-me*me-he*he-V*V-H*H;Oe<0?f=0:(Oe*=Oe,f=Oe*Oe*this._dot4(i[we],me,he,V,H));let q=.6-ge*ge-_e*_e-ve*ve-ye*ye;return q<0?p=0:(q*=q,p=q*q*this._dot4(i[Te],ge,_e,ve,ye)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},nt=class e extends X{constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Xe(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new E(this.width,this.height,{type:pe}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new k({defines:Object.assign({},qe.defines),uniforms:P.clone(qe.uniforms),vertexShader:qe.vertexShader,fragmentShader:qe.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new ge,this.normalMaterial.blending=0,this.pdMaterial=new k({defines:Object.assign({},Qe.defines),uniforms:P.clone(Qe.uniforms),vertexShader:Qe.vertexShader,fragmentShader:Qe.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new k({defines:Object.assign({},Je.defines),uniforms:P.clone(Je.uniforms),vertexShader:Je.vertexShader,fragmentShader:Je.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new k({uniforms:P.clone(ze.uniforms),vertexShader:ze.vertexShader,fragmentShader:ze.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new k({uniforms:P.clone(Ye.uniforms),vertexShader:Ye.vertexShader,fragmentShader:Ye.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ve(null),this._originalClearColor=new L,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new v,this.depthTexture.format=M,this.depthTexture.type=N,this.normalRenderTarget=new E(this.width,this.height,{minFilter:ve,magFilter:ve,type:pe,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=$e(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new tt,n=e*e*4,r=new Uint8Array(n);for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=n,o=i;r[(n*e+i)*4]=(t.noise(a,o)*.5+.5)*255,r[(n*e+i)*4+1]=(t.noise(a+e,o)*.5+.5)*255,r[(n*e+i)*4+2]=(t.noise(a,o+e)*.5+.5)*255,r[(n*e+i)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let i=new De(r,e,e,K,T);return i.wrapS=Ee,i.wrapT=Ee,i.needsUpdate=!0,i}};nt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var rt={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},it=class extends X{constructor(){super(),this.isOutputPass=!0,this.uniforms=P.clone(rt.uniforms),this.material=new ie({name:rt.name,uniforms:this.uniforms,vertexShader:rt.vertexShader,fragmentShader:rt.fragmentShader}),this._fsQuad=new Ve(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ce.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},at=class extends x{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new G;e.deleteAttribute(`uv`);let t=new B({side:1}),n=new B,r=new H(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new h(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new te(e,n,6),o=new Se;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new h(e,ot(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new h(e,ot(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new h(e,ot(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new h(e,ot(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new h(e,ot(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new h(e,ot(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ot(e){return new W({color:0,emissive:16777215,emissiveIntensity:e})}function st(e){let t=e>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function ct(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,{element:n,ctx:n.getContext(`2d`)}}function lt(){let{element:e,ctx:t}=ct(2048,512);if(!t)return e;let n=st(1987),r=t.createLinearGradient(0,0,0,512);r.addColorStop(0,`#6e3a22`),r.addColorStop(.5,`#7d4428`),r.addColorStop(1,`#69351f`),t.fillStyle=r,t.fillRect(0,0,2048,512);for(let e=0;e<4;e++){let r=e*128;t.fillStyle=`rgba(${n()>.5?`120,62,34`:`96,48,26`},${.25+n()*.3})`,t.fillRect(0,r,2048,128),t.fillStyle=`rgba(32,14,6,.55)`,t.fillRect(0,r,2048,1.5)}for(let e=0;e<2600;e++){let e=n()*512,r=n()*2200-100,i=60+n()*900;t.strokeStyle=n()<.55?`rgba(48,20,8,${.08+n()*.16})`:`rgba(196,118,70,${.06+n()*.12})`,t.lineWidth=.4+n()*1.6,t.beginPath(),t.moveTo(r,e),t.bezierCurveTo(r+i*.3,e-1.5+n()*3,r+i*.65,e+n()*4-2,r+i,e+n()*2-1),t.stroke()}for(let e=0;e<9;e++){let e=n()*2048,r=n()*512;for(let n=0;n<7;n++)t.strokeStyle=`rgba(52,22,9,${.05+n*.012})`,t.lineWidth=1,t.beginPath(),t.ellipse(e,r,70+n*22,7+n*3,0,0,Math.PI*2),t.stroke()}return e}function ut(){let{element:e,ctx:t}=ct(512,512);if(!t)return e;let n=st(4401);t.fillStyle=`#9a9a9a`,t.fillRect(0,0,512,512);for(let e=0;e<1400;e++){let e=n()*512,r=n()*512,i=6+n()*46,a=Math.round(120+n()*90),o=t.createRadialGradient(e,r,0,e,r,i);o.addColorStop(0,`rgba(${a},${a},${a},.16)`),o.addColorStop(1,`rgba(${a},${a},${a},0)`),t.fillStyle=o,t.fillRect(e-i,r-i,i*2,i*2)}for(let e=0;e<260;e++){let e=n()*512,r=n()*512;t.strokeStyle=`rgba(${n()>.5?210:70},${n()>.5?210:70},${n()>.5?210:70},.05)`,t.lineWidth=2+n()*6,t.beginPath(),t.arc(e,r,30+n()*80,n()*6,n()*6+.8),t.stroke()}return e}function dt(e){let{element:t,ctx:n}=ct(1024,512);if(!n)return t;let r=st(733+e*97),i=[[`#8fae9f`,`#a3bfae`,`#7f9e8c`],[`#5f8770`,`#6f9878`,`#557a62`],[`#365a43`,`#41684b`,`#2c4c37`]][e],a=[250,190,120][e];n.fillStyle=i[2],n.beginPath(),n.moveTo(0,512);for(let t=0;t<=1024;t+=8)n.lineTo(t,a+30+22*Math.sin(t*.006+e*2)+10*Math.sin(t*.03));n.lineTo(1024,512),n.fill();let o=[170,150,120][e];for(let t=0;t<o;t++){let t=r()*1060-18,o=(e+1)*(26+r()*40),s=a-o*(.6+r()*.8)+40*Math.sin(t*.01);if(n.fillStyle=i[Math.floor(r()*3)],r()<(e===0?.7:e===1?.45:.15)){for(let e=0;e<7;e++){let r=(e+1)/7,i=o*(.12+.32*r);n.beginPath(),n.moveTo(t,s+r*o*.9-o*.25),n.lineTo(t+i,s+r*o*1.05),n.lineTo(t-i,s+r*o*1.05),n.closePath(),n.fill()}n.fillRect(t-o*.02,s+o,o*.04,60+o)}else{for(let e=0;e<14;e++)n.beginPath(),n.ellipse(t+(r()-.5)*o*.9,s+r()*o*.7,o*(.22+r()*.2),o*(.18+r()*.18),0,0,Math.PI*2),n.fill();n.fillStyle=`rgba(30,40,30,.6)`,n.fillRect(t-o*.03,s+o*.6,o*.06,40+o*.6)}}if(e===2)for(let e=0;e<160;e++)n.fillStyle=i[Math.floor(r()*3)],n.beginPath(),n.ellipse(r()*1024,r()*150,20+r()*50,14+r()*30,0,0,7),n.fill();for(let t=0;t<260-e*60;t++)n.fillStyle=`rgba(230,240,214,${.03+r()*.05})`,n.beginPath(),n.arc(r()*1024,a-60+r()*260,1+r()*4,0,7),n.fill();return t}function ft(){let{element:e,ctx:t}=ct(64,256);if(!t)return e;let n=t.createLinearGradient(0,0,0,256);return n.addColorStop(0,`#e9f0ec`),n.addColorStop(.55,`#f4f1e4`),n.addColorStop(1,`#c9d3c4`),t.fillStyle=n,t.fillRect(0,0,64,256),e}function pt(e){let t=1280,{element:n,ctx:r}=ct(t,720);if(!r)return n;let i=st(1873),a={day:{sky:[`#5f9fd6`,`#a9cfe9`,`#e7eef0`],ridges:[`#a7b9c6`,`#7f98a8`,`#5d7889`,`#3c5866`],peak:`#7d8a92`,snow:`#f4f6f6`,trees:`#1f3d2c`,water:[32,92,110],glow:null},sunset:{sky:[`#43375e`,`#c86e5a`,`#f6c27f`],ridges:[`#9a6a73`,`#7b5260`,`#59404f`,`#3a2c38`],peak:`#6e4a52`,snow:`#f7c9a5`,trees:`#22171d`,water:[70,38,48],glow:`#ffd49a`},storm:{sky:[`#4c5864`,`#76838e`,`#9aa4ab`],ridges:[`#7d8992`,`#66737c`,`#4f5c65`,`#36424a`],peak:`#58646c`,snow:`#c8d0d4`,trees:`#1b2927`,water:[44,58,64],glow:null},night:{sky:[`#070f2a`,`#14275a`,`#2a4580`],ridges:[`#2a3c66`,`#203158`,`#182648`,`#101b36`],peak:`#1e2c52`,snow:`#9fb2e0`,trees:`#07101f`,water:[12,24,58],glow:`#e9efff`}}[e],o=720*.58,s=r.createLinearGradient(0,0,0,o);if(s.addColorStop(0,a.sky[0]),s.addColorStop(.6,a.sky[1]),s.addColorStop(1,a.sky[2]),r.fillStyle=s,r.fillRect(0,0,t,o),e===`night`)for(let e=0;e<220;e++)r.fillStyle=`rgba(255,255,255,${.2+i()*.7})`,r.fillRect(i()*t,i()*o*.8,1.4,1.4);if(a.glow){let n=e===`night`?t*.68:t*.62,i=e===`night`?115.2:o*.86,s=e===`night`?22:46,c=r.createRadialGradient(n,i,0,n,i,s*7);c.addColorStop(0,a.glow),c.addColorStop(.12,a.glow+`cc`),c.addColorStop(1,a.glow+`00`),r.fillStyle=c,r.fillRect(0,0,t,o),r.fillStyle=a.glow,r.beginPath(),r.arc(n,i,s,0,Math.PI*2),r.fill()}if(e===`storm`)for(let e=0;e<40;e++)r.fillStyle=`rgba(60,68,78,${.12+i()*.15})`,r.beginPath(),r.ellipse(i()*t,i()*o*.5,120+i()*220,30+i()*40,0,0,7),r.fill();a.ridges.forEach((e,n)=>{r.beginPath(),r.moveTo(0,o);for(let e=0;e<=t;e+=4){let i=e/t,a=o-(60-n*9)-(26+10*n)*Math.sin(i*7+n*1.7)-12*Math.sin(i*21+n*3);r.lineTo(e,a)}r.lineTo(t,o),r.closePath(),r.fillStyle=e,r.fill()});let c=t*.46,l=122.4;r.fillStyle=a.peak,r.beginPath(),r.moveTo(258.80000000000007,o),r.lineTo(528.8000000000001,192.4),r.lineTo(c,l),r.lineTo(658.8000000000001,212.4),r.lineTo(948.8000000000001,o),r.closePath(),r.fill(),r.fillStyle=a.snow,r.beginPath(),r.moveTo(496.80000000000007,230.4),r.lineTo(528.8000000000001,192.4),r.lineTo(c,l),r.lineTo(658.8000000000001,212.4),r.lineTo(692.8000000000001,254.4),r.lineTo(640.8000000000001,234.4),r.lineTo(606.8000000000001,262.4),r.lineTo(566.8000000000001,226.4),r.lineTo(530.8000000000001,252.4),r.closePath(),r.fill();function u(e,t,n){if(r){r.fillRect(e-n*.015,t-n,n*.03,n);for(let i=0;i<9;i++){let a=(i+1)/10,o=n*(.02+.17*a);r.beginPath(),r.moveTo(e,t-n+a*n*.75-n*.12),r.lineTo(e+o,t-n+a*n*.92),r.lineTo(e-o,t-n+a*n*.92),r.closePath(),r.fill()}}}r.fillStyle=a.trees;for(let e=0;e<260;e++){let e=i()<.5,n=i();u(e?n*t*.36:t-n*t*.34,423.59999999999997+(1-n)*30,(16+(1-n)*120)*(.5+i()))}let d=r.getImageData(0,0,t,417),f=r.createImageData(t,303);for(let e=0;e<f.height;e++){let n=e/f.height,r=Math.max(0,d.height-1-Math.floor(e*.9+4*Math.sin(e*.3)*n));for(let i=0;i<t;i++){let o=Math.min(1279,Math.max(0,i+Math.floor(6*n*Math.sin(e*.2+i*.01)))),s=(r*t+o)*4,c=(e*t+i)*4;for(let e=0;e<3;e++)f.data[c+e]=d.data[s+e]*(.72-.3*n)+a.water[e]*(.28+.3*n);f.data[c+3]=255}}return r.putImageData(f,0,417),r.fillStyle=a.trees,r.globalAlpha=.55,r.fillRect(0,o,t,3),r.globalAlpha=1,n}var Q={deskTop:-.22,floor:-39,ceiling:96,backWall:-17.5,window:{x0:-62,x1:-16,y0:2.2,y1:40,mullion:-39},blindBottom:23,slatSpacing:1.3,slatDepth:1.1,desk:{x0:-30,x1:50,z0:-17.2,z1:12}};function mt(e){let t=I.degToRad(e.sunElevation),n=I.degToRad(66+e.sunAzimuth*.3);return new w(Math.cos(t)*Math.sin(n),-Math.sin(t),Math.cos(t)*Math.cos(n)).normalize()}function ht(e,t){let n=(Q.slatDepth*Math.abs(Math.sin(e+I.degToRad(t)))+.08)/Q.slatSpacing;return I.clamp(1-n,.08,.92)}var gt=[`sunColor`,`skyColor`,`groundColor`,`outside`,`shaftColor`,`wall`],_t=[`sunElevation`,`sunAzimuth`,`sunIntensity`,`skyIntensity`,`environment`,`exposure`,`lampIntensity`,`screenGain`,`outsideGain`,`shaftDensity`,`blindTilt`,`rain`,`keyFill`];function vt(e){let t={};for(let n of gt)t[n]=new L(e[n]);for(let n of _t)t[n]=e[n];return t}function yt(e,{software:t=!1}={}){let n=new O;n.name=`desk-environment`;let r=new Set,i=new Set,o=new Set,s=[],c=[],l=!1;function d(e,t=.7,n=0){let r=new B({color:e,roughness:t,metalness:n});return i.add(r),r}function f(e,t,n,i=0,a=0,o=0){r.add(e);let s=new h(e,t);return s.position.set(i,a,o),s.castShadow=s.receiveShadow=!0,n.add(s),s}function p(e,n=!0){let r=new ye(e);return n&&(r.colorSpace=ae),r.anisotropy=t?1:8,o.add(r),r}let m=st(2211),v=p(ut(),!1);v.wrapS=v.wrapT=Ee,v.repeat.set(5,3);let y=new B({color:u.afternoon.wall,roughness:.94,roughnessMap:v,bumpMap:v,bumpScale:.6});i.add(y);let{x0:b,x1:x,y0:C,y1:T}=Q.window,E=Q.backWall-3,D={left:-170,right:170};f(new G(b-D.left,Q.ceiling-Q.floor,6),y,n,(D.left+b)/2,(Q.ceiling+Q.floor)/2,E),f(new G(D.right-x,Q.ceiling-Q.floor,6),y,n,(D.right+x)/2,(Q.ceiling+Q.floor)/2,E),f(new G(x-b,Q.ceiling-T,6),y,n,(b+x)/2,(Q.ceiling+T)/2,E),f(new G(x-b,C-Q.floor,6),y,n,(b+x)/2,(C+Q.floor)/2,E),f(new G(D.right-D.left,2,200),d(`#2a3431`,.95),n,0,Q.ceiling+1,Q.backWall+99);let re=d(`#2b1e16`,.78);f(new G(D.right-D.left,1,200),re,n,0,Q.floor-.5,Q.backWall+99),f(new G(D.right-D.left,4,.6),d(`#1f2a27`,.8),n,0,Q.floor+2,Q.backWall+.3);let A=d(`#171a19`,.55,.2),j=new O;j.name=`studio-window`,n.add(j);let M=1.4,ie=Q.backWall-3.2;for(let e of[b+.6,Q.window.mullion,x-.6])f(new G(e===Q.window.mullion?1:1.2,T-C,M),A,j,e,(C+T)/2,ie);for(let e of[C+.6,T-.6])f(new G(x-b,1.2,M),A,j,(b+x)/2,e,ie);let N=d(`#2a2421`,.62);f(new G(x-b+3,1,8.5),N,j,(b+x)/2,C-.5,Q.backWall-3+1.25);let P={time:{value:0},rain:{value:0},tint:{value:new L(`#cfe0da`)},flash:{value:0}},oe=new k({transparent:!0,depthWrite:!1,uniforms:P,vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`
      varying vec2 vUv; uniform float time, rain, flash; uniform vec3 tint;
      float hash(float n){ return fract(sin(n)*43758.5453); }
      void main(){
        vec2 uv = vUv*vec2(46.0, 58.0);
        float streaks = 0.0;
        for (int layer = 0; layer < 2; layer++) {
          float scale = layer == 0 ? 1.0 : 1.9;
          vec2 p = uv*scale;
          float column = floor(p.x);
          float speed = 2.0 + hash(column*3.1 + float(layer))*4.0;
          float y = fract(p.y*0.08 + time*speed*0.12 + hash(column));
          float x = abs(fract(p.x) - 0.5);
          float drop = (1.0 - smoothstep(0.02, 0.16, x)) * smoothstep(0.0, 0.08, y) * (1.0 - smoothstep(0.08, 0.4, y));
          streaks += drop * step(0.55, hash(column*7.7 + float(layer)*13.0));
        }
        float beads = step(0.985, hash(floor(uv.x*3.0)*91.0 + floor(uv.y*3.0)*17.0)) * 0.6;
        float wet = clamp(streaks + beads, 0.0, 1.0) * rain;
        vec3 color = mix(tint * 0.3, vec3(0.62, 0.7, 0.74), wet) + flash * 0.6;
        gl_FragColor = vec4(color, 0.04 + wet * 0.26 + rain * 0.2 + flash * 0.3);
        #include <colorspace_fragment>
      }`});i.add(oe);let I=f(new be(x-b,T-C),oe,j,(b+x)/2,(C+T)/2,ie-.2);I.name=`window-glass`,I.castShadow=I.receiveShadow=!1;let se=[],z=new ce({map:p(ft()),fog:!1});i.add(z),se.push(z);let ue=new O;ue.name=`forest-backdrop`,n.add(ue);let fe=f(new be(700,420),z,ue,-120,60,-240);fe.castShadow=fe.receiveShadow=!1,[{z:-200,w:620,h:300,y:10},{z:-120,w:380,h:190,y:2},{z:-55,w:210,h:110,y:8}].forEach((e,t)=>{let n=new ce({map:p(dt(t)),transparent:!0,alphaTest:.02,fog:!1});i.add(n),se.push(n);let r=f(new be(e.w,e.h),n,ue,-60-t*10,e.y+e.h/2-40,e.z);r.castShadow=r.receiveShadow=!1});let pe=Math.floor((T-Q.blindBottom)/Q.slatSpacing),me=new G(x-b-1.2,.08,Q.slatDepth);r.add(me);let he=d(`#cbbfa9`,.7),ge=new te(me,he,pe);ge.name=`blind-slats`,ge.castShadow=ge.receiveShadow=!0,j.add(ge);let _e=new Se;function ve(e){for(let t=0;t<pe;t++)_e.position.set((b+x)/2,T-1-t*Q.slatSpacing,Q.backWall-1.2),_e.rotation.set(e,0,0),_e.updateMatrix(),ge.setMatrixAt(t,_e.matrix);ge.instanceMatrix.needsUpdate=!0}ve(u.afternoon.blindTilt),f(new G(x-b-.6,.5,1.5),d(`#b9ad97`,.6),j,(b+x)/2,Q.blindBottom-.4,Q.backWall-1.2);for(let e of[b+9,x-9]){let t=f(new R(.05,.05,T-Q.blindBottom,5),d(`#e0d8c8`,.8),j,e,(T+Q.blindBottom)/2,Q.backWall-.55);t.castShadow=!1}let U=p(lt());U.wrapS=U.wrapT=Ee;let xe=new B({map:U,roughness:.46,bumpMap:U,bumpScale:.05});i.add(xe);let W=Q.desk,Ce=W.x1-W.x0,De=W.z1-W.z0,K=f(new J(Ce,1.9,De,3,.45),xe,n,(W.x0+W.x1)/2,Q.deskTop-.95,(W.z0+W.z1)/2);K.name=`walnut-desk`;let Ae=d(`#5c2f1b`,.55),je=new O;je.name=`desk-drawers`,n.add(je),f(new G(Ce-2,4.2,1),Ae,je,(W.x0+W.x1)/2,Q.deskTop-4,W.z1-1.6);let Me=d(`#b59a62`,.35,.8);for(let e of[-12,14,34])f(new J(17,3.4,.5,2,.15),xe,je,e,Q.deskTop-4,W.z1-1),f(new J(3.2,.35,.5,2,.15),Me,je,e,Q.deskTop-4,W.z1-.6);for(let e of[W.x0+2,W.x1-2])for(let t of[W.z0+2,W.z1-2.5])f(new G(2.2,-Q.floor+Q.deskTop-2,2.2),Ae,n,e,(Q.floor+Q.deskTop-2)/2,t);let Ne=new O;Ne.name=`office-chair`,Ne.position.set(-21,2.5,17.5),Ne.rotation.y=.18,n.add(Ne);let Pe=d(`#1b2022`,.62),Fe=d(`#2a2d2f`,.3,.85),Ie=f(new J(15,12,1.1,5,.55),Pe,Ne,0,-3.5,0);Ie.rotation.x=-.12;let Le=new V([new w(-7.6,-9.5,.2),new w(-7.8,1.6,-.9),new w(0,2.9,-1.1),new w(7.8,1.6,-.9),new w(7.6,-9.5,.2)],!1);f(new _(Le,40,.32,8,!1),Fe,Ne),f(new J(18,1.6,17,3,.6),Pe,Ne,0,-16,-8);for(let e of[-1,1]){let t=new V([new w(e*9.2,-16,-14),new w(e*9.6,-9,-9),new w(e*9.4,-8.5,-2),new w(e*8.8,-12,.6),new w(e*8.6,2,.6)]);f(new _(t,32,.32,8,!1),Fe,Ne)}f(new R(.9,.9,14,12),Fe,Ne,0,-24,-8);let Y=new O;Y.name=`studio-display`,Y.position.set(0,-.2,-10.5),n.add(Y);let Re=d(`#b4b7ba`,.3,.9);f(new J(8,.28,5.4,3,.12),Re,Y,0,.16,.4);let ze=f(new J(2.6,8.6,.3,2,.1),Re,Y,0,4.3,-1.3);ze.rotation.x=-.2,f(new J(20.3,12,.5,4,.22),Re,Y,0,9,-.05),f(new J(19.82,11.52,.06,2,.02),d(`#050606`,.25),Y,0,9,.24);let X=new Map;function Be(e){let t=X.get(e);return t||(t=p(pt(e)),X.set(e,t)),t}let Z={mapA:{value:Be(`day`)},mapB:{value:Be(`day`)},mixT:{value:0},gain:{value:1}},Ve=new k({uniforms:Z,toneMapped:!1,vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`
      varying vec2 vUv; uniform sampler2D mapA, mapB; uniform float mixT, gain;
      void main(){
        vec3 color = mix(texture2D(mapA, vUv).rgb, texture2D(mapB, vUv).rgb, mixT) * gain;
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }`});i.add(Ve);let He=f(new be(19.12,10.82),Ve,Y,0,9,.322);He.name=`monitor-screen`,He.castShadow=He.receiveShadow=!1;let Ue=new H(`#cfdcf0`,0,40,2);Ue.position.set(0,7,5),Y.add(Ue);let We=new le,Ge=[],Ke=[],qe=[];for(let e=0;e<=18;e++){let t=e/18,n=Math.sin(Math.PI*t)*.34;for(let e=0;e<5;e++){let r=(e-2)/2;qe.push(e/4,t),Ge.push(r*n,t,Math.sin(t*Math.PI)*.16+Math.abs(r)*.09)}}for(let e=0;e<18;e++)for(let t=0;t<4;t++){let n=e*5+t;Ke.push(n,n+5,n+1,n+1,n+5,n+6)}We.setAttribute(`position`,new S(Ge,3)),We.setIndex(Ke),We.setAttribute(`uv`,new S(qe,2)),We.computeVertexNormals(),r.add(We);let Je=d(`#ffffff`,.78),Ye=document.createElement(`canvas`);Ye.width=128,Ye.height=256;let Xe=Ye.getContext(`2d`);if(Xe){let e=Xe.createLinearGradient(0,0,128,0);e.addColorStop(0,`#a2ad88`),e.addColorStop(.5,`#e7e9c9`),e.addColorStop(1,`#acb992`),Xe.fillStyle=e,Xe.fillRect(0,0,128,256),Xe.strokeStyle=`#ecedc569`,Xe.lineWidth=1,Xe.beginPath(),Xe.moveTo(64,0),Xe.lineTo(64,256);for(let e=16;e<240;e+=20)for(let t of[-1,1])Xe.moveTo(64,e),Xe.quadraticCurveTo(64+t*18,e-10,64+t*58,e-22);Xe.stroke();let t=p(Ye);Je.map=t,Je.bumpMap=t,Je.bumpScale=.014}Je.side=2;let Ze=d(`#516444`,.8),Qe=d(`#292a1f`,1);function $e(e,t,r,i,a=`#9d9680`){let o=new O;o.position.set(e,i,t),o.scale.setScalar(r),n.add(o);let l=d(a,.9),u=[new F(.8,0),new F(.94,.08),new F(1.12,1.65),new F(1.1,1.73),new F(1.02,1.73),new F(.9,.16)];f(new q(u,40),l,o);let p=f(new de(1.04,32),Qe,o,0,1.6,0);p.rotation.x=-Math.PI/2;let m=new te(We,Je,22);m.castShadow=m.receiveShadow=!0;let h=new O;o.add(h),h.add(m),s.push(h);let g=[],v=new Se;for(let e=0;e<22;e++){let t=e*2.39996,n=.6+e%4*.25,r=2.2+e%7*.42,i=new w(Math.cos(t)*n,r,Math.sin(t)*n),a=new w(Math.cos(t)*1.3,.1+e%3*.25,Math.sin(t)*1.3).normalize();v.position.copy(i),v.quaternion.setFromUnitVectors(new w(0,1,0),a),v.scale.set(1.6+e%3*.2,1.8+e%4*.22,1.7),v.updateMatrix(),m.setMatrixAt(e,v.matrix),g.push(v.clone()),m.setColorAt(e,new L().setHSL(.26+e%4*.012,.3,.09+e%5*.02));let o=new we(new w(0,1.5,0),new w(i.x*.2,r,i.z*.2),i);f(new _(o,8,.027,5,!1),Ze,h)}return c.push({mesh:m,poses:g}),o}$e(-24,Q.backWall-1.2,2.2,C,`#6f6a5c`),$e(-50,Q.backWall-1.6,2.8,C,`#8e7f69`),$e(-34,2,4.2,Q.floor,`#3b3c35`);let et=new O;et.name=`pencil-cup`,et.position.set(-12.5,Q.deskTop,-6.5),n.add(et),f(new q([new F(0,0),new F(1.35,0),new F(1.4,3.6),new F(1.28,3.6),new F(1.22,.25),new F(0,.25)],32),d(`#5a5148`,.85),et),[`#c8a24a`,`#30353a`,`#9b4a35`,`#c8a24a`].forEach((e,t)=>{let n=new O,r=t*1.7;n.position.set(Math.cos(r)*.55,.3,Math.sin(r)*.55),n.rotation.set(Math.sin(r)*.16,0,-Math.cos(r)*.16),et.add(n);let i=d(e,.5);f(new R(.15,.15,6.2,6),i,n,0,3.1,0),f(new Oe(.15,.6,6),d(`#d9c39a`,.8),n,0,6.5,0)});let tt=f(new ne(1,32,16),d(`#3a3532`,.48,.1),n,12.4,Q.deskTop+.18,1);tt.name=`desk-mouse`,tt.scale.set(1.15,.62,1.9);let nt=new O;nt.name=`notepad`,nt.position.set(-15,Q.deskTop,4.5),nt.rotation.y=.32,n.add(nt),f(new J(5.2,.24,7,2,.05),d(`#dcd3c1`,.92),nt,0,.12,0);let rt=f(new R(.13,.1,6.4,10),d(`#1d2227`,.35,.5),nt,1.1,.38,0);rt.rotation.x=Math.PI/2,rt.rotation.z=.2,rt.name=`pen`;let it=new O;it.position.set(21,Q.deskTop,-2.5),it.scale.setScalar(.9),n.add(it);let at=d(`#b6afa0`,.36);f(new q([new F(.88,0),new F(1.02,.12),new F(1.08,1.66),new F(.99,1.71),new F(.92,.22)],40),at,it),f(new ke(.6,.13,10,32),at,it,1.14,.9,0);let ot=f(new de(.99,32),d(`#241910`,.22),it,0,1.43,0);ot.rotation.x=-Math.PI/2;let ct=new k({transparent:!0,depthWrite:!1,side:2,uniforms:{time:{value:0},phase:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`
      varying vec2 vUv; uniform float time; uniform float phase;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);}
      float cloud(vec2 p){return noise(p)*.57+noise(p*2.07)*.28+noise(p*4.13)*.15;}
      void main(){
        float y=vUv.y;
        float drift=.08*sin(y*9.0-time*.45+phase)+.09*y*sin(time*.17+phase);
        float x=vUv.x-.5-drift;
        float width=.035+y*.24;
        float envelope=exp(-x*x/(width*width))*smoothstep(0.0,.09,y)*pow(1.0-y,1.8);
        vec2 flow=vec2(x*13.0+phase,y*7.0-time*.48);
        float detail=cloud(flow+vec2(cloud(flow*.6+time*.08),0.0));
        float alpha=envelope*smoothstep(.28,.72,detail)*.22;
        gl_FragColor=vec4(.82,.86,.79,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});i.add(ct);let yt=f(new be(3.6,5.2),ct,it,0,3.95,0);yt.name=`coffee-steam`,yt.layers.set(1),yt.castShadow=yt.receiveShadow=!1;let bt=d(`#d7cdb3`,.9),xt=d(`#28342c`,.78),St=new O;St.name=`architect-field-notebook`,St.position.set(25,Q.deskTop+.04,3),St.rotation.y=-.3,St.scale.setScalar(.85),n.add(St),f(new J(9.25,.09,7.02,3,.04),xt,St,0,.05,0);for(let e of[-1,1])f(new J(4.46,.22,6.8,2,.06),bt,St,e*2.26,.17,0);let Ct=new be(9,6.75,48,8),wt=Ct.getAttribute(`position`);for(let e=0;e<wt.count;e++){let t=wt.getX(e),n=wt.getY(e);wt.setXYZ(e,t,.32+.17*Math.sin(Math.abs(t)/4.5*Math.PI)-.1*Math.exp(-t*t*15),-n)}Ct.computeVertexNormals();let Tt=d(`#ffffff`,.93),Et=f(Ct,Tt,St);Et.name=`sketchbook-illustration`,new ee().load(new URL(`textures/solarpunk-sketchbook.png`,document.baseURI).href,t=>{if(l){t.dispose();return}t.colorSpace=ae,t.anisotropy=8,o.add(t),Tt.map=t,Tt.needsUpdate=!0,e()});let Dt=[`#6d4a33`,`#2f3d3a`,`#8b6b45`,`#43302a`,`#a08a68`,`#273330`];function Ot(e,t,r,i,a=0){let o=new O;o.position.set(e,t,r),o.rotation.y=a,n.add(o);let s=0;for(let e=0;e<i;e++){let e=.8+m()*.7,t=f(new J(7.5+m()*2,e,5.2+m()*1.2,2,.08),d(Dt[Math.floor(m()*Dt.length)],.82),o,(m()-.5)*.6,s+e/2,0);t.rotation.y=(m()-.5)*.18,s+=e}return{stack:o,height:s}}let kt=Ot(19,Q.deskTop,-12,3,.08);Ot(30,Q.deskTop,-10.5,4,-.2);let At=new O;At.name=`mushroom-lamp`,At.position.set(19,Q.deskTop+kt.height,-12),At.scale.setScalar(.72),n.add(At);let jt=new B({color:`#e9c9a0`,emissive:`#ff9f4a`,emissiveIntensity:1.2,roughness:.5});i.add(jt),f(new R(1.9,2.1,.5,32),jt,At,0,.25,0),f(new R(.75,1.1,5.2,24),jt,At,0,2.9,0);let Mt=f(new ne(4.2,40,20,0,Math.PI*2,0,Math.PI/2),jt,At,0,5.2,0);Mt.scale.y=.72,Mt.castShadow=!1;let Nt=f(new de(4.2,40),new ce({color:`#ffd9a3`}),At,0,5.19,0);i.add(Nt.material),Nt.rotation.x=Math.PI/2,Nt.castShadow=!1;let Pt=new H(`#ffb86e`,0,0,2);Pt.position.set(19,Q.deskTop+kt.height+3.2,-11),Pt.castShadow=!1,n.add(Pt);let Ft=document.createElement(`canvas`);Ft.width=Ft.height=128;let It=Ft.getContext(`2d`);if(It){let e=It.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,`rgba(255,255,255,1)`),e.addColorStop(.35,`rgba(255,255,255,.35)`),e.addColorStop(1,`rgba(255,255,255,0)`),It.fillStyle=e,It.fillRect(0,0,128,128)}let Lt=new ce({map:p(Ft),color:`#ff9f55`,transparent:!0,blending:2,depthWrite:!1});i.add(Lt);let Rt=f(new be(52,40),Lt,n,19,Q.deskTop+kt.height+6,Q.backWall+.2);Rt.castShadow=Rt.receiveShadow=!1,Rt.name=`lamp-bounce`;let zt=f(new G(22,.8,5),N,n,31,20,Q.backWall+2.5);zt.name=`wall-shelf`;for(let e=0;e<7;e++){let t=5+m()*2.2,r=f(new J(.9+m()*.4,t,4,2,.06),d(Dt[e%Dt.length],.84),n,22+e*1.25,20.4+t/2,Q.backWall+2.5);e===6&&(r.rotation.z=-.24)}let Bt=f(new q([new F(0,0),new F(1.1,0),new F(1.5,1.4),new F(.9,3.2),new F(.55,4.2),new F(.7,4.6)],28),d(`#8f7f6c`,.7),n,36.5,20.4,Q.backWall+2.6);Bt.name=`vase`;let Vt=d(`#3b2a1e`,.9);for(let e=0;e<3;e++){let t=(e-1)*.5,r=new V([new w(36.5,24.6,Q.backWall+2.6),new w(36.5+t*1.5,28,Q.backWall+2.6),new w(36.5+t*3.2,32+e,Q.backWall+2.3)]);f(new _(r,12,.08,4,!1),Vt,n)}let $=new Te(`#ffffff`,0);$.name=`room-sun`,$.castShadow=!0,$.shadow.mapSize.set(t?1024:2048,t?1024:2048),Object.assign($.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:1,far:320}),$.shadow.camera.updateProjectionMatrix(),$.shadow.normalBias=.05,$.shadow.bias=-4e-4,$.shadow.radius=2,$.shadow.blurSamples=6,$.target.position.set(-6,0,0),n.add($,$.target);let Ht=new g(`#c4d4d6`,`#4a3e2e`,0);Ht.name=`room-sky`,n.add(Ht);let Ut=new Te(`#f2efe8`,0);Ut.position.set(10,26,30),Ut.target.position.set(0,0,0),n.add(Ut,Ut.target);let Wt={travel:{value:new w(0,-1,1)},color:{value:new L(`#fff2dc`)},density:{value:0},opening:{value:.5}},Gt=new k({transparent:!0,depthWrite:!1,side:2,blending:2,uniforms:Wt,vertexShader:`varying vec3 vLocal; void main(){ vLocal = position + 0.5; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying vec3 vLocal; uniform vec3 travel, color; uniform float density, opening;
      void main(){
        float px = ${b.toFixed(1)} + vLocal.x * ${(x-b).toFixed(1)};
        float py = ${C.toFixed(1)} + vLocal.y * ${(T-C).toFixed(1)};
        float t = vLocal.z * 120.0;
        float u = smoothstep(0.0, 0.09, vLocal.x) * (1.0 - smoothstep(0.91, 1.0, vLocal.x));
        float v = smoothstep(0.0, 0.08, vLocal.y) * (1.0 - smoothstep(0.92, 1.0, vLocal.y));
        float mullion = smoothstep(0.6, 1.6, abs(px - (${Q.window.mullion.toFixed(1)})));
        float slat = fract((${T.toFixed(1)} - py) / ${Q.slatSpacing.toFixed(2)});
        float clear = 1.0 - smoothstep(opening * 0.5 - 0.2, opening * 0.5 + 0.2, abs(slat - 0.5));
        float blind = py > ${Q.blindBottom.toFixed(1)} ? mix(0.3, 0.9, clear) : 0.4;
        float beam = px + py * 0.45;
        float gaps = pow(max(0.0, sin(beam * 0.42 + 0.9) * 0.62 + sin(beam * 0.93 + 2.1) * 0.38), 2.6);
        float fade = exp(-t / 70.0) * smoothstep(0.0, 6.0, t);
        // One surface stands in for a whole column of air, hence the larger gain.
        float a = u * v * mullion * blind * fade * (0.04 + gaps) * density * 0.065;
        gl_FragColor = vec4(color * a, 1.0);
        #include <colorspace_fragment>
      }`});i.add(Gt);let Kt=[],qt=(e,t,n,r)=>Kt.push(...e,...t,...n,...e,...n,...r);for(let e=1;e<8;e++){let t=e/8-.5;qt([t,-.5,-.5],[t,.5,-.5],[t,.5,.5],[t,-.5,.5])}for(let e=1;e<5;e++){let t=e/5-.5;qt([-.5,t,-.5],[.5,t,-.5],[.5,t,.5],[-.5,t,.5])}let Jt=new le;Jt.setAttribute(`position`,new S(Kt,3)),r.add(Jt);let Yt=new h(Jt,Gt);Yt.name=`efficient-shafts`,Yt.matrixAutoUpdate=!1,Yt.visible=t,Yt.frustumCulled=!1,Yt.renderOrder=5,n.add(Yt);function Xt(e){let t=new w(x-b,0,0),n=new w(0,T-C,0),r=e.clone().multiplyScalar(120),i=new w((b+x)/2,(C+T)/2,Q.backWall).addScaledVector(r,.5);Yt.matrix.makeBasis(t,n,r).setPosition(i),Yt.matrixWorldNeedsUpdate=!0}let Zt={preset:`afternoon`,brightness:72},Qt=vt(u.afternoon),$t=vt(u.afternoon),en=vt(u.afternoon),tn=1,nn=a(72),rn=nn,an=nn,on=`day`,sn=0,cn=4,ln=new w;function un(e,t){for(let n of gt)e[n].copy(t[n]);for(let n of _t)e[n]=t[n]}function dn(){let e=en;ln.copy(mt(e)),$.position.copy($.target.position).addScaledVector(ln,-150),$.color.copy(e.sunColor),$.intensity=e.sunIntensity,Ht.color.copy(e.skyColor),Ht.groundColor.copy(e.groundColor),Ht.intensity=e.skyIntensity*(1+sn*4),Ut.intensity=e.keyFill,Pt.intensity=e.lampIntensity*60,jt.emissiveIntensity=.25+e.lampIntensity*.55,Lt.opacity=Math.min(1,.12+e.lampIntensity*.12),Z.gain.value=e.screenGain,Ue.intensity=e.screenGain*14;for(let t of se)t.color.copy(e.outside).multiplyScalar(e.outsideGain*(1+sn*2.5));y.color.copy(e.wall),P.rain.value=e.rain,P.tint.value.copy(e.outside),P.flash.value=sn,ve(e.blindTilt),Wt.travel.value.copy(ln),Wt.color.value.copy(e.shaftColor),Wt.density.value=e.shaftDensity*e.sunIntensity*.4,Wt.opening.value=ht(e.blindTilt,e.sunElevation),Xt(ln)}dn();let fn=new Se;return{group:n,monitor:Y,screen:He,sun:$,light:en,travel:ln,get gain(){return an},get flash(){return sn},get progress(){return tn},setShaftMode(e){Yt.visible=e===`geometry`},setLighting(t,n){let r=t.preset!==Zt.preset;Zt=t,Qt=vt(u.afternoon),un(Qt,en),un($t,vt(u[t.preset])),nn=an,rn=a(t.brightness);let i=u[t.preset].screen;i!==on&&(Z.mapA.value=Z.mixT.value>.5?Z.mapB.value:Z.mapA.value,Z.mapB.value=Be(i),Z.mixT.value=0,on=i),tn=r||nn!==rn?0:tn,n&&(tn=1,un(en,$t),an=rn,Z.mapA.value=Z.mapB.value,Z.mixT.value=0,dn()),e()},step(e,t,n){let r=!1;if(tn<1){tn=n?1:Math.min(1,tn+e/1.2);let t=tn*tn*(3-2*tn);for(let e of gt)en[e].copy(Qt[e]).lerp($t[e],t);for(let e of _t)en[e]=Qt[e]+($t[e]-Qt[e])*t;an=nn+(rn-nn)*t,Z.mapA.value!==Z.mapB.value&&(Z.mixT.value=t,tn>=1&&(Z.mapA.value=Z.mapB.value,Z.mixT.value=0)),r=tn<1}let i=en.rain>.5&&t&&!n;return i&&(cn-=e,cn<=0&&(sn=1,cn=6+m()*9)),sn>0&&(sn=i?Math.max(0,sn-e*2.6):0,r=!0),dn(),r},updateAmbient(e,t){s.forEach((t,n)=>{t.rotation.z=Math.sin(e*.37+n*1.9)*.009,t.rotation.x=Math.sin(e*.29+n)*.006}),c.forEach(({mesh:t,poses:n},r)=>{n.forEach((n,i)=>{fn.position.copy(n.position),fn.scale.copy(n.scale),fn.quaternion.copy(n.quaternion),fn.rotateX(Math.sin(e*.85+i*.7+r)*.019+Math.sin(e*1.9+i)*.004),fn.updateMatrix(),t.setMatrixAt(i,fn.matrix)}),t.instanceMatrix.needsUpdate=!0}),ct.uniforms.time.value=e,P.time.value=e;let n=t.position.clone();it.worldToLocal(n),yt.rotation.y=Math.atan2(n.x,n.z)},dispose(){l=!0,r.forEach(e=>e.dispose()),i.forEach(e=>e.dispose()),o.forEach(e=>e.dispose()),$.shadow.map?.dispose()}}}function bt(e){let{x0:t,x1:n,y0:r,y1:i,mullion:a}=Q.window,o=e=>e.toFixed(3),s=new He({name:`StudioShafts`,uniforms:{tDiffuse:{value:null},tDepth:{value:null},invProjection:{value:new A},cameraWorld:{value:new A},travel:{value:new w(.5,-.5,.7)},shaftColor:{value:new L(`#fff2dc`)},density:{value:0},opening:{value:.5},time:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying vec2 vUv;
      uniform sampler2D tDiffuse, tDepth;
      uniform mat4 invProjection, cameraWorld;
      uniform vec3 travel, shaftColor;
      uniform float density, opening, time;
      const int STEPS = 36;
      // Integral of the clear part of a repeated slat cell, so a sample that
      // covers several slats averages them instead of aliasing.
      float clearIntegral(float y, float spacing, float clearHalf) {
        float q = y / spacing, fq = fract(q);
        return spacing * (floor(q) * 2.0 * clearHalf + min(fq, clearHalf) + max(0.0, fq - (1.0 - clearHalf)));
      }
      void main() {
        vec4 base = texture2D(tDiffuse, vUv);
        if (density <= 0.0001) { gl_FragColor = base; return; }
        float depth = texture2D(tDepth, vUv).r;
        vec4 view = invProjection * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
        view /= view.w;
        vec3 eye = cameraWorld[3].xyz;
        vec3 toPixel = (cameraWorld * vec4(view.xyz, 1.0)).xyz - eye;
        float total = min(length(toPixel), 180.0);
        vec3 dir = normalize(toPixel);
        float ds = total / float(STEPS);
        float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
        float spacing = ${o(Q.slatSpacing)};
        float clearHalf = 0.5 * opening;
        float light = 0.0;
        for (int i = 0; i < STEPS; i++) {
          vec3 p = eye + dir * (float(i) + jitter) * ds;
          if (p.z < ${o(Q.backWall)} || p.y < ${o(Q.floor)} || p.y > ${o(Q.ceiling)}) continue;
          float t = (p.z - (${o(Q.backWall)})) / travel.z;
          vec3 pane = p - travel * t;
          // smoothstep needs edge0 < edge1; reversed edges are undefined in GLSL.
          float window = smoothstep(${o(t)}, ${o(t+1.5)}, pane.x) * (1.0 - smoothstep(${o(n-1.5)}, ${o(n)}, pane.x))
            * smoothstep(${o(r)}, ${o(r+1)}, pane.y) * (1.0 - smoothstep(${o(i-1)}, ${o(i)}, pane.y))
            * smoothstep(0.45, 0.9, abs(pane.x - (${o(a)})));
          if (window <= 0.0) continue;
          // The open lower panes scatter less than the slatted blind, which
          // keeps the beams readable as beams rather than one bright slab.
          float blind = 0.4;
          if (pane.y > ${o(Q.blindBottom)}) {
            float footprint = max(0.02, 0.5 * ds * abs(dir.y - dir.z * travel.y / travel.z));
            float y = ${o(i)} - pane.y;
            blind = clamp((clearIntegral(y + footprint, spacing, clearHalf) - clearIntegral(y - footprint, spacing, clearHalf)) / (2.0 * footprint), 0.0, 1.0);
          }
          // The desk top shades everything beneath it.
          float under = 1.0;
          if (p.y < ${o(Q.deskTop-1.9)}) {
            vec3 q = p - travel * ((p.y - (${o(Q.deskTop-1.9)})) / travel.y);
            under = 1.0 - step(${o(Q.desk.x0)}, q.x) * step(q.x, ${o(Q.desk.x1)}) * step(${o(Q.desk.z0)}, q.z) * step(q.z, ${o(Q.desk.z1)});
          }
          // Gaps in the canopy outside break the aperture into a few distinct
          // beams instead of one even slab of haze.
          float u = pane.x + pane.y * 0.45;
          float gaps = pow(max(0.0, sin(u * 0.42 + 0.9) * 0.62 + sin(u * 0.93 + 2.1) * 0.38), 2.6);
          float dust = 0.78 + 0.22 * sin(p.x * 0.31 + time * 0.21) * sin(p.y * 0.23 - time * 0.17) * sin(p.z * 0.27 + 1.7);
          float fade = smoothstep(0.0, 5.0, t) * exp(-t / 70.0);
          light += window * blind * under * fade * dust * (0.04 + gaps) * ds;
        }
        gl_FragColor = vec4(base.rgb + shaftColor * light * density * 0.055, base.a);
      }`});return s.uniforms.tDepth.value=e,s}function xt(e){let t=null,n=new F,r=new x,i=new z(-1,1,1,-1,0,1),a={frame:{value:null},viewport:{value:new F(1,1)},rect:{value:new D},center:{value:new F},halfExtent:{value:new F(1,1)},radius:{value:20},contact:{value:new F},hold:{value:0},age:{value:-1},selected:{value:0},dpr:{value:1}},o=new k({uniforms:a,depthTest:!1,depthWrite:!1,transparent:!1,vertexShader:`
      uniform vec4 rect; uniform vec2 viewport;
      void main() {
        // Flip v so the quad keeps its winding after the y-down mapping.
        vec2 p = mix(rect.xy, rect.zw, vec2(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5));
        gl_Position = vec4(p.x / viewport.x * 2.0 - 1.0, 1.0 - p.y / viewport.y * 2.0, 0.0, 1.0);
      }`,fragmentShader:`
      uniform sampler2D frame;
      uniform vec2 viewport, center, halfExtent, contact;
      uniform vec4 rect;
      uniform float radius, hold, age, selected, dpr;
      float sd(vec2 p, float r) { vec2 q = abs(p) - halfExtent + r; return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; }
      vec3 room(vec2 px) { return texture2D(frame, clamp(vec2(px.x / viewport.x, 1.0 - px.y / viewport.y), 0.001, 0.999)).rgb; }
      void main() {
        vec2 px = vec2(gl_FragCoord.x, viewport.y * dpr - gl_FragCoord.y) / dpr;
        vec2 p = px - center;
        float r = min(radius, min(halfExtent.x, halfExtent.y));
        float d = sd(p, r);
        float aa = max(fwidth(d), 0.5);
        float mask = 1.0 - smoothstep(-aa, aa, d);
        if (mask <= 0.0) discard;
        vec2 normal = normalize(vec2(sd(p + vec2(0.5, 0.0), r) - sd(p - vec2(0.5, 0.0), r), sd(p + vec2(0.0, 0.5), r) - sd(p - vec2(0.0, 0.5), r)) + vec2(0.00001));
        float depth = max(0.0, -d);
        float lip = 1.0 - smoothstep(0.0, r * 0.68, depth);
        float tilt = 0.91 * lip - 0.13 * exp(-pow((depth / r - 0.56) / 0.19, 2.0));
        vec3 N = vec3(normal * tilt, sqrt(max(0.0, 1.0 - tilt * tilt)));
        vec3 ray = refract(vec3(0.0, 0.0, -1.0), N, 1.0 / 1.46);
        vec2 delta = px - contact;
        vec2 dir = delta / max(length(delta), 0.01);
        float reach = length((halfExtent + abs(contact - center)) * vec2(1.0, 1.22));
        float t = clamp(age / ${f.toFixed(2)}, 0.0, 1.0);
        float toWave = length(delta * vec2(1.0, 1.22)) - (1.0 - pow(1.0 - t, 1.65)) * (reach + 42.0);
        float crest = age < 0.0 ? 0.0 : exp(-pow(toWave / 16.0, 2.0)) * (1.0 - smoothstep(0.7, 1.0, t));
        float wake = age < 0.0 ? 0.0 : exp(-pow((toWave + 22.0) / 28.0, 2.0)) * (1.0 - t);
        vec2 bent = px + ray.xy / max(0.15, -ray.z) * r * 1.1
          - delta * 0.19 * hold * exp(-dot(delta, delta) / 3400.0)
          + dir * (crest * 16.0 - wake * 7.0);
        vec2 split = dir * crest * 4.0;
        vec3 glass = vec3(room(bent + split).r, room(bent).g, room(bent - split).b);
        // Smoke the body so white type keeps its contrast over bright rooms.
        // Matches GLASS.lensBody / lensLift in lib/theme.ts, which the contrast test checks.
        float body = 0.34 - 0.03 * selected;
        glass = glass * body + vec3(0.035, 0.043, 0.043);
        glass += room(px + normal * r * 2.0) * (lip * 0.2 + crest * 0.13);
        glass += vec3(1.0, 0.97, 0.9) * (0.5 * exp(-depth / 1.1) + 0.12 * pow(lip, 3.0)) * (0.6 + 0.4 * dot(normal, normalize(vec2(-0.6, -1.0))));
        // Selected tiles carry a pearl sheen that drifts across the lens.
        vec3 pearl = 0.55 + 0.45 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + (p.x - p.y) / (halfExtent.x * 3.2) + lip * 0.35));
        glass = mix(glass, glass * 0.75 + pearl * 0.22, selected * (0.18 + 0.5 * lip));
        gl_FragColor = vec4(mix(room(px), glass, mask), 1.0);
      }`}),s=new h(new be(2,2),o);return s.frustumCulled=!1,r.add(s),{draw(o,s,c,l){let u=o.getBoundingClientRect(),d=[];for(let e of s){let t=e.element.getBoundingClientRect();t.width<2||t.right<u.left||t.left>u.right||t.bottom<u.top||t.top>u.bottom||e.element.closest(`[hidden]`)||d.push([e,t])}let f=!1;if(!d.length)return{animating:!1,count:0};e.getDrawingBufferSize(n),(!t||t.image.width!==n.x||t.image.height!==n.y)&&(t?.dispose(),t=new b(n.x,n.y),t.minFilter=t.magFilter=oe),e.setRenderTarget(null),e.copyFramebufferToTexture(t),a.dpr.value=n.x/Math.max(1,u.width),a.frame.value=t,a.viewport.value.set(u.width,u.height);let p=e.autoClear;e.autoClear=!1;let m=performance.now();for(let[t,n]of d){let o=n.left-u.left,s=n.top-u.top;t.hold=l?t.holdTarget:I.damp(t.hold,t.holdTarget,23,c),Math.abs(t.hold-t.holdTarget)>.002&&(f=!0);let d=(m-t.releasedAt)/1e3,p=!l&&d>=0&&d<1;p&&(f=!0),a.rect.value.set(o-2,s-2,o+n.width+2,s+n.height+2),a.center.value.set(o+n.width/2,s+n.height/2),a.halfExtent.value.set(n.width/2,n.height/2),a.radius.value=t.radius,a.contact.value.set(o+n.width*t.contact[0],s+n.height*t.contact[1]),a.hold.value=t.hold,a.age.value=p?d:-1,a.selected.value=t.selected,e.render(r,i)}return e.autoClear=p,{animating:f,count:d.length}},dispose(){t?.dispose(),s.geometry.dispose(),o.dispose()}}}function St([e,t,n,r],i,a){let o=t.x-n.x,s=r.x-n.x,c=t.y-n.y,l=r.y-n.y,u=e.x-t.x+n.x-r.x,d=e.y-t.y+n.y-r.y,f=o*l-s*c;if(Math.abs(f)<.001||i<=0||a<=0)return null;let p=(u*l-s*d)/f,m=(o*d-u*c)/f;return`matrix3d(${[(t.x-e.x+p*t.x)/i,(t.y-e.y+p*t.y)/i,0,p/i,(r.x-e.x+m*r.x)/a,(r.y-e.y+m*r.y)/a,0,m/a,0,0,1,0,e.x,e.y,0,1].join(`,`)})`}var Ct=6;function wt({selections:e,customAccessories:t,keys:n,bounds:i}){let a=r(t),o=new O;o.name=`accessory-previews`;let s=new Set,c=new Set,l=[],u=[],d={artisan:0,external:0,planned:0,omitted:0},f=!1;function p(e,t=.4,n=0){let r=new B({color:e,roughness:t,metalness:n});return c.add(r),r}function m(e,t,n,r=0,i=0,a=0){s.add(t);let o=new h(t,n);return o.position.set(r,i,a),o.castShadow=o.receiveShadow=!0,e.add(o),o}function g(e,t,n,r=.06){return new J(e,t,n,2,r)}function _(e){let t=new O;t.name=`illustrative-artisan`;let n=p(`#155963`,.3);m(t,g(e-.08,.12,.92),n,0,.06);let r=new U({color:`#82d9cf`,roughness:.13,metalness:0,transparent:!0,opacity:.42,depthWrite:!1,clearcoat:1,clearcoatRoughness:.12});c.add(r);let i=m(t,g(e-.12,.44,.84,.1),r,0,.32);i.name=`translucent-resin-shell`,i.castShadow=!1;let a=p(`#efd7a8`,.65),o=p(`#e4894e`,.34,.12),s=p(`#417d65`,.6),l=new ne(1,10,6),u=Math.max(1,Math.floor(e));for(let n=0;n<u;n++){let r=((n+.5)/u-.5)*(e-.3);m(t,l,a,r-.13,.2,.1).scale.set(.15,.1,.11),m(t,l,s,r+.14,.2,-.13).scale.set(.11,.06,.14);let i=m(t,l,o,r+.04,.32,.05);i.scale.set(.13,.045,.07),i.rotation.y=-.6}return t}function v(){let e=new O;e.name=`illustrative-macropad`;let t=p(`#303934`,.44,.4),n=p(`#e6dbc0`),r=p(`#cb7548`),i=p(`#9ca995`,.34,.65);m(e,g(3.65,.35,5.75,.14),t,0,.175),m(e,g(3.45,.07,5.55),i,0,.37);let a=g(.86,.35,.86,.09),o=new te(a,n,12);l.push(o),s.add(a);let c=new A;for(let e=0;e<12;e++)o.setMatrixAt(e,c.makeTranslation(e%3-1,.59,Math.floor(e/3)-.9)),o.setColorAt(e,e<3?r.color:n.color);o.name=`macropad-twelve-keys`,o.castShadow=o.receiveShadow=!0,e.add(o),m(e,g(1.8,.08,.72,.04),t,-.58,.44,-2.12);let u=p(`#a4e5c5`,.7);u.emissive.set(`#39715a`),u.emissiveIntensity=.4;let d=new G(1.12,.01,.045);for(let t=0;t<3;t++)m(e,d,u,-.65,.487,-2.3+t*.15);return m(e,new R(.38,.38,.42,20),t,1.04,.64,-2.12),m(e,new G(.045,.015,.16),n,1.04,.857,-2.29),m(e,g(.4,.15,.14,.02),t,-.9,.17,-2.91),e}function y(e){let t=new O;t.name=`unmounted-${e}`;let n=p(`#333a34`,.8),r=p(`#176c58`,.65),i=p(`#b7b6ab`,.3,.8),a=p(`#171c1b`,.4);if(m(t,g(3.8,.12,2.5),n,0,.06),e===`encoder`){m(t,g(.85,.55,.8),i,-.65,.4),m(t,new R(.16,.16,.6,16),i,-.65,.95),m(t,new R(.45,.45,.55,24),a,.75,.4);for(let e=0;e<3;e++)m(t,g(.07,.07,.5,.01),i,-.9+e*.25,.2,.55)}else if(e===`screen`){m(t,g(2.1,.1,1.85),r,0,.22),m(t,g(1.8,.06,1.1),a,0,.31,-.1);for(let e=0;e<4;e++)m(t,g(.09,.22,.09,.01),i,-.4+e*.27,.4,.7)}else{m(t,g(3.2,.1,1.1),r,0,.22);for(let e=0;e<4;e++){let n=-1.2+e*.8;m(t,g(.52,.02,.52,.01),a,n,.28);for(let e of[-.35,.35])m(t,new R(.055,.055,.025,8),i,n,.28,e)}}return t}function b(e=2.8,t=1.8){let n=new O;return n.name=`unavailable-product-geometry`,n.userData.geometry=`unavailable`,m(n,g(e,.1,t),p(`#717b74`,.8),0,.05),m(n,g(e*.55,.02,.035,.01),p(`#c7cec4`),0,.11),n}let x=new Map;for(let t of e)t.location.kind===`key`&&x.set(t.location.keyId,(x.get(t.location.keyId)??0)+1);let S={left:0,right:0,above:0},C={left:0,right:0,above:0},T=0;for(let t of e)t.location.kind===`external`&&a.some(e=>e.id===t.productId&&(e.kind===`macropad`||e.id.startsWith(`import-accessory:`)))&&T<Ct&&(C[t.location.position]++,T++);for(let t of e){let e=a.find(e=>e.id===t.productId),r=t.location;if(e?.kind===`artisan`&&r.kind===`key`){let i=n.get(r.keyId),a=i?.children.find(e=>e instanceof h&&e.name.startsWith(`cap`));a instanceof h&&a.geometry.computeBoundingBox();let o=a instanceof h?a.geometry.boundingBox?.getSize(new w).x:void 0;if(e.sizeU===null||!i||o===void 0||Math.abs(o+.08-e.sizeU)>.03||x.get(r.keyId)!==1||t.quantity!==1){d.omitted++;continue}let s=i.children.map(e=>({object:e,visible:e.visible}));s.forEach(({object:e})=>{e.visible=!1});let c=e.id.startsWith(`import-accessory:`)?b(e.sizeU-.08,.92):_(e.sizeU);c.userData.selectionId=t.id,i.add(c),u.push({group:c,originals:s}),d.artisan++}else if(e&&r.kind===`external`&&(e.kind===`macropad`||e.id.startsWith(`import-accessory:`))){if(d.external>=Ct||i.isEmpty()){d.omitted++;continue}let n=S[r.position]++,a=n%3,s=Math.floor(n/3),c=a-(Math.min(C[r.position],3)-1)/2,l=e.id.startsWith(`import-accessory:`)?b():v();l.userData.selectionId=t.id;let u=.6;l.position.set(r.position===`left`?i.min.x-1.825-u-s*4.1:r.position===`right`?i.max.x+1.825+u+s*4.1:c*4.1,-.2,r.position===`above`?i.min.z-2.875-u-s*6.2:c*6.2),o.add(l),d.external++}else if(r.kind===`embedded`&&e&&(e.id.startsWith(`import-accessory:`)||e.kind===`screen`||e?.kind===`buttons`||e?.kind===`encoder`)){if(d.planned>=6||i.isEmpty()){d.omitted++;continue}let n=e.id.startsWith(`import-accessory:`)?b():e.kind===`screen`||e.kind===`buttons`||e.kind===`encoder`?y(e.kind):b();n.userData.selectionId=t.id,n.userData.installation=`unmounted`,n.position.set((d.planned%3-1)*4.1,-.2,i.max.z+1.9+Math.floor(d.planned/3)*2.8),o.add(n),d.planned++}else d.omitted++}return{group:o,counts:d,dispose(){if(!f){f=!0;for(let e of u){e.group.removeFromParent();for(let{object:t,visible:n}of e.originals)t.visible=n}o.removeFromParent(),l.forEach(e=>e.dispose()),s.forEach(e=>e.dispose()),c.forEach(e=>e.dispose())}}}}var Tt=class extends nt{render(...e){this.camera.layers.disable(1);try{super.render(...e)}finally{this.camera.layers.enable(1)}}};function Et(e){let t=new Set,n=new Set;e.traverse(e=>{if(e instanceof h){n.add(e.geometry);for(let n of Array.isArray(e.material)?e.material:[e.material])t.add(n)}}),n.forEach(e=>e.dispose()),t.forEach(e=>e.dispose())}async function Dt(e,t){let n=o(t),r=0;for(let t of n.requests){let n=e.getObjectByName(t.role),i=n?.parent;if(n&&i)try{let e=(await new Me().loadAsync(new URL(t.assetPath,document.baseURI).href)).scene,a=new he().setFromObject(n).getCenter(new w);e.position.copy(n.position),e.quaternion.copy(n.quaternion),e.scale.copy(n.scale),n instanceof h&&e.traverse(e=>{if(!(e instanceof h))return;let t=e.material;e.material=n.material;for(let e of Array.isArray(t)?t:[t])e.dispose()}),e.name=t.role,i.add(e),e.updateWorldMatrix(!0,!0);let o=new he().setFromObject(e).getCenter(new w);e.position.copy(i.worldToLocal(e.getWorldPosition(new w).add(a.sub(o)))),n.name=`${t.role}_study`,n.visible=!1,r+=1}catch{}}e.userData.cadParts=r,e.userData.cadTwin=n.twin}function Ot(e){return e.kind===`keyboard`?e.hatsu?`keyboard-hatsu`:e.cyberboard?`keyboard-cyberboard-r2`:e.q1Max?`keyboard-q1-max`:`keyboard-${e.layout}`:e.model}function kt(e){return e===`keyboard-hatsu`?`keyboard-60.glb`:e===`keyboard-q1-max`||e===`keyboard-cyberboard-r2`?`keyboard-75.glb`:`${e}.glb`}function At(t,n,r){let i=r,a=n,o=!1,s=!1,u=0,f=0,p=!0,m=0,g=0,_=null,v=null,b=null,S=.4,T=0,D=0,ee=0,ne=11,O=0,k=new Map,A=new Set,j=new Map,M=new WeakMap,ie=new Map,ae=new Map,N=new Set,P=``,L=window.matchMedia(`(prefers-reduced-motion: reduce)`),R=L.matches,z=new se({antialias:!0,alpha:!0,powerPreference:`high-performance`}),ce=z.getContext(),le=ce.getExtension(`WEBGL_debug_renderer_info`),de=String(ce.getParameter(le?le.UNMASKED_RENDERER_WEBGL:ce.RENDERER)),V=/swiftshader|llvmpipe|softpipe|software rasterizer|microsoft basic render/i.test(de);t.dataset.renderQuality=V?`efficient`:`full`,z.setPixelRatio(V?.75:Math.min(window.devicePixelRatio,2)),z.shadowMap.enabled=!0,z.shadowMap.type=V?1:3,z.toneMapping=7,z.toneMappingExposure=1,z.domElement.tabIndex=0,z.domElement.setAttribute(`role`,`application`),z.domElement.setAttribute(`aria-label`,`Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.`),t.appendChild(z.domElement);let H=new x,ge=new fe(z),ve=new at,ye=ge.fromScene(ve,V?0:.04,.1,100,{size:V?32:256});H.environment=ye.texture,H.environmentIntensity=.7,ve.dispose();let U=new ue(34,1,.1,150);U.position.set(7,15,19),U.layers.enable(1);let W=new xe(U,z.domElement);W.enableDamping=!R&&!V,W.dampingFactor=.1,W.minDistance=12,W.maxDistance=46,W.maxPolarAngle=Math.PI*.48,W.target.set(0,.4,0),W.enablePan=!1;let G=new Te(`#ffffff`,2.2);G.position.set(-12,19,-10),G.castShadow=!0,G.shadow.mapSize.set(V?512:2048,V?512:2048),G.shadow.camera.left=-14,G.shadow.camera.right=14,G.shadow.camera.top=12,G.shadow.camera.bottom=-12,G.shadow.radius=3,G.shadow.blurSamples=8,G.shadow.normalBias=.03,G.shadow.bias=-1e-4,H.add(G);let Se=new Te(`#ffffff`,.8);Se.position.set(8,5,-5);let Ce=new _e(`#ffffff`,.25);H.add(Se,Ce);let we=new h(new be(200,200),new me({color:`#524c3c`,opacity:.22}));we.rotation.x=-Math.PI/2,we.position.y=-.22,we.receiveShadow=!0,H.add(we);let K=yt(()=>{Ie=!0,X()},{software:V});H.add(K.group),K.setShaftMode(V?`geometry`:`raymarch`),e(),d.quality=V?`efficient`:`full`,d.shafts=V?`geometry`:`raymarch`,d.glass=V?`css`:`webgl`;let Oe=l.subscribe(e=>{K.setLighting(e,L.matches),Ie=!0,X()}),q=V?null:(()=>{let e=new E(1,1,{type:pe,samples:2}),t=new Ge(z,e);t.addPass(new Ke(H,U));let n=new Tt(H,U,1,1);n.updateGtaoMaterial({radius:.9,thickness:1.5,distanceFallOff:.75,samples:12}),n.blendIntensity=.7,t.addPass(n);let r=bt(n.depthTexture);t.addPass(r);let i=new it;return t.addPass(i),{composer:t,occlusion:n,shafts:r,output:i}})(),ke=V?new E(1,1,{type:pe}):null,J=V?null:xt(z),Pe={wake:()=>X(),enabled:!!J},Ie=!0;K.setLighting(l.get(),!0);let Y=new Uint8Array(65536);for(let e=0;e<Y.length;e+=4){let t=150+Math.floor(Math.random()*80);Y[e]=Y[e+1]=Y[e+2]=t,Y[e+3]=255}let ze=new De(Y,128,128);ze.wrapS=ze.wrapT=Ee,ze.repeat.set(10,10),ze.magFilter=oe,ze.minFilter=C,ze.generateMipmaps=!0,ze.needsUpdate=!0;function X(){window.clearTimeout(f),f=0,!o&&!s&&!u&&p&&!document.hidden&&(u=requestAnimationFrame(Je),t.dataset.renderState=`active`)}function Be(e=!1){K.group.visible=a.environment!==`studio`,we.visible=!K.group.visible,z.domElement.setAttribute(`aria-label`,a.environment===`typing`?`Keyboard preview. Type inside the monitor or click a key to try your build.`:`Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.`);let t=a.device.kind===`control-deck`?a.device.lighting:`Studio`;G.color.set(t===`Daylight`||K.group.visible?`#fff1db`:`#ffffff`);let n=K.group.visible;G.intensity=n?0:t===`After hours`?.7:2.2,G.castShadow=!n,Se.intensity=n?0:t===`After hours`?.3:.8,Ce.intensity=n?0:.25,H.environmentIntensity=t===`After hours`?.35:n?K.light.environment:.7,c.attach(n&&a.environment===`desk`?Pe:null);let r=new Map([[`case`,a.caseColor],[`alpha`,a.alpha],[`mod`,a.mod],[`accent`,a.accent],[`space`,a.space],[`switch_housing`,Ae(a.switchId??``).housing],[`switch_stem`,Ae(a.switchId??``).stem]]);for(let[t,n]of ae){let i=t.name.split(`.`)[0],o=i.startsWith(`legend_`),s=r.get(o?i.slice(7):i);if(s&&n.set(o?Ne(s):s),e&&t.color.copy(n),i===`case`){let e=a.finish===`Polycarbonate`;t.transparent!==e&&(t.transparent=e,t.needsUpdate=!0),t.metalness=a.finish===`Aluminum`?.8:a.finish===`Brass`?.95:0,t.roughness=e?.2:.33,t.opacity=e?.62:1,t.depthWrite=!e}}if(a.device.kind===`keyboard`){let e=_?.getObjectByName(`switches`);e&&(e.visible=a.exploded)}X()}function Z(){Ie=!0;let e=a.environment===`typing`;if(W.enableRotate=W.enableZoom=!e,W.enableDamping=!R&&!V&&!e,W.maxDistance=e?80:46,D=e?-3:0,T=0,K.monitor.scale.y=e&&t.clientWidth<700?1.65:1,e){let e=t.clientWidth<700;S=e?10:5,b=new w(0,e?25:17,e?52:38),ot(),W.update(),U.position.copy(b),W.target.set(0,S,D),W.update(),b=null,X();return}ct();let n=a.device.kind===`control-deck`,r=!n&&a.environment===`desk`&&a.view===`perspective`;T=r?-2:0;let i=n?a.exploded?.55:.46:a.environment===`desk`&&!r?1.24:1;S=r?-1.4:n&&a.exploded?1.35:a.environment===`desk`&&!r?1.8:.4,W.minDistance=a.device.kind===`control-deck`?7:12,b=a.view===`top`?new w(0,26,.01):a.view===`front`?new w(0,6,25):n?new w(-7,27,14):r?new w(-7,25,18):new w(-7,18,21),b.multiplyScalar(i);let o=a.environment===`desk`&&!a.closeUp&&(a.view===`perspective`||a.view===`reset`);if(W.maxDistance=a.environment===`desk`?95:46,W.minAzimuthAngle=a.environment===`desk`?-.85:-1/0,W.maxAzimuthAngle=a.environment===`desk`?.85:1/0,o){let e=Ve(n);a.exploded&&(e.target.y+=1.5,e.position.lerp(e.target,.18)),b=e.position,T=e.target.x,S=e.target.y,D=e.target.z}O=U.aspect,Ue(),X()}function Ve(e){let t=I.smoothstep(U.aspect,.75,1.45),n=new w().lerpVectors(new w(1.2,12.5,19.5),new w(7.5,22,55),t),r=new w().lerpVectors(new w(-.4,3.4,-3),new w(1.5,10,-6),t);return e&&n.sub(r).multiplyScalar(.7).add(r),{position:n,target:r}}function He(){if(!(v?.counts.external||v?.counts.planned))return[];let e=new he().setFromObject(v.group);return _&&e.union(new he().setFromObject(_)),[e.min.x,e.max.x].flatMap(t=>[e.min.y,e.max.y].flatMap(n=>[e.min.z,e.max.z].map(e=>new w(t,n,e))))}function Ue(){let e=He();if(!b||!e.length)return;let t=U.clone();t.position.copy(b);let n=new w(T,S,D);t.lookAt(n),t.updateMatrixWorld();let r=Math.tan(I.degToRad(U.fov/2))*.86,i=r*U.aspect,a=0;for(let n of e)n.applyMatrix4(t.matrixWorldInverse),a=Math.max(a,Math.abs(n.x)/i+n.z,Math.abs(n.y)/r+n.z);b.add(b.clone().sub(n).normalize().multiplyScalar(a)),W.maxDistance=Math.max(46,b.distanceTo(n)*1.15)}function We(){let e=!!(v?.counts.external||v?.counts.planned);v?.dispose(),v=null,_&&a.device.kind===`keyboard`&&(v=wt({selections:a.accessories??[],customAccessories:a.customAccessories,keys:j,bounds:new he().setFromObject(_)}),H.add(v.group)),t.dataset.accessoryArtisanCount=String(v?.counts.artisan??0),t.dataset.accessoryExternalCount=String(v?.counts.external??0),t.dataset.accessoryPlannedCount=String(v?.counts.planned??0),t.dataset.accessoryOmittedCount=String(v?.counts.omitted??0),Ie=!0,(e||v?.counts.external||v?.counts.planned)&&Z(),X()}async function qe(e){let n=Ot(e),r=++g;i.status({kind:`loading`});let s=k.get(n);s||(s=new Me().loadAsync(new URL(`models/${kt(n)}`,document.baseURI).href).then(async t=>{if(o)return Et(t.scene),t.scene;if(e.kind===`keyboard`){e.hatsu?Le(t.scene):e.cyberboard?Re(t.scene):e.q1Max&&Fe(t.scene),await Dt(t.scene,e);let n=[];t.scene.traverse(e=>{e.name.startsWith(`key_`)&&n.push(new w(e.position.x,.3,e.position.z))}),t.scene.add(je(n,a.switchId??``).group)}return A.add(t.scene),t.scene}),k.set(n,s));try{let a=await s;if(o||r!==g)return;v?.dispose(),v=null,_&&H.remove(_),_=a,j.clear(),ae.clear(),N.clear(),P=``,ie.clear();for(let[t,n]of Object.entries({plate:1.01,pcb:.51,switches:e.kind===`keyboard`?2.3:1.75,screen:1.01,control_dial:e.kind===`keyboard`?4.8:1.01,control_joystick:1.01})){let e=_.getObjectByName(t);e&&(M.has(e)||M.set(e,e.position.y),ie.set(e,n))}_.traverse(e=>{if(e.name.startsWith(`key_`)&&(j.set(e.name.slice(4),e),M.has(e)||M.set(e,e.position.y)),e instanceof h){e.castShadow=!0,e.receiveShadow=!0;for(let t of Array.isArray(e.material)?e.material:[e.material])t instanceof B&&(ae.set(t,t.color.clone()),t.name.startsWith(`legend`)||(t.bumpMap=ze,t.bumpScale=.003))}}),t.dataset.switchCount=String(_.getObjectByName(`switch_bases`)instanceof te?j.size:0),t.dataset.keyboardVariant=n,t.dataset.keyCount=String(j.size),t.dataset.cadParts=String(_.userData.cadParts??0),t.dataset.cadTwin=_.userData.cadTwin?`1`:`0`,H.add(_),We(),Be(!0),i.status({kind:`ready`}),X()}catch{k.delete(n),!o&&r===g&&i.status({kind:`error`,message:`The keyboard model could not load. Check your connection and try again.`})}}function Je(e){if(u=0,o||!p||document.hidden)return;let n=Math.min((e-m)/1e3||1/60,.05);m=e,R!==L.matches&&ut();let r=!1,i=(e,t,i)=>R||V||Math.abs(e-t)<5e-4?t:(r=!0,I.damp(e,t,i,n));for(let[e,t]of j)t.position.y=i(t.position.y,(M.get(t)??t.position.y)+(a.exploded?a.device.kind===`keyboard`?4.8:2.6:0)-(N.has(e)?.14:0),19),t.scale.y=i(t.scale.y,a.device.kind===`control-deck`?1:a.profile===`Tall sculpted`?1.5:a.profile===`Low uniform`?.7:1,14);for(let[e,t]of ie)e.position.y=i(e.position.y,(M.get(e)??e.position.y)+(a.exploded?t:0),12);let s=_?.getObjectByName(`control_dial`);s&&a.device.kind===`control-deck`&&(s.rotation.y=i(s.rotation.y,(a.device.dial-.5)*Math.PI*1.5,16));for(let[e,t]of ae)e.color.r=i(e.color.r,t.r,14),e.color.g=i(e.color.g,t.g,14),e.color.b=i(e.color.b,t.b,14);b&&(U.position.x=i(U.position.x,b.x,10),U.position.y=i(U.position.y,b.y,10),U.position.z=i(U.position.z,b.z,10),U.position.distanceTo(b)<.002&&(U.position.copy(b),b=null)),W.target.x=i(W.target.x,T,10),W.target.y=i(W.target.y,S,10),W.target.z=i(W.target.z,D,10);let l=W.update(n),h=K.group.visible&&a.roomMotion!==!1&&!R&&!(V&&a.environment===`typing`);if(h&&(ee+=n),K.group.visible?(K.updateAmbient(ee,U),K.step(n,h,R)&&(r=!0,Ie=!0),z.toneMappingExposure=K.light.exposure*K.gain*(1+K.flash*.25),H.environmentIntensity=K.light.environment):z.toneMappingExposure=1,d.transition=K.progress,d.exposure=z.toneMappingExposure,q){let e=q.shafts.uniforms;e.invProjection.value.copy(U.projectionMatrixInverse),e.cameraWorld.value.copy(U.matrixWorld),e.travel.value.copy(K.travel),e.shaftColor.value.copy(K.light.shaftColor),e.density.value=K.group.visible?K.light.shaftDensity*K.light.sunIntensity:0,e.opening.value=ht(K.light.blindTilt,K.light.sunElevation),e.time.value=ee,q.shafts.enabled=K.group.visible}if(ke&&a.environment===`typing`?(Ie&&=(_&&(_.visible=!1),v&&(v.group.visible=!1),z.setRenderTarget(ke),z.render(H,U),z.setRenderTarget(null),_&&(_.visible=!0),v&&(v.group.visible=!0),!1),K.group.visible=!1,we.visible=!0,H.background=ke.texture,z.render(H,U),H.background=null,K.group.visible=!0,we.visible=!1):K.group.visible&&q?q.composer.render(n):z.render(H,U),d.frames+=1,d.lenses=0,J&&K.group.visible&&a.environment===`desk`&&c.entries().size){let e=J.draw(z.domElement,c.entries(),n,R);d.lenses=e.count,e.animating&&(r=!0)}st(),r||l?X():h&&(f=window.setTimeout(X,1e3/(V?12:30))),t.dataset.renderFrames=String(z.info.render.frame),t.dataset.renderState=u||f?`active`:`idle`}function Ye(){for(let e of N)i.release(e);N.clear(),P=``,X()}let Xe=e=>e instanceof HTMLElement&&!!e.closest(`input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]`);function Ze(e){if(!(Xe(e.target)||document.querySelector(`dialog[open]`)||e.metaKey||e.ctrlKey||e.altKey||e.code===`Tab`||e.code===`Escape`)&&!(e.target instanceof HTMLElement&&e.target.closest(`button,a,summary`)&&!/^(Key[A-Z]|Digit[0-9])$/.test(e.code))){if(a.environment!==`typing`&&e.target===z.domElement&&[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`+`,`-`,`=`].includes(e.key)){e.preventDefault(),b=null;let t=U.position.clone().sub(W.target),n=new re().setFromVector3(t);e.key===`ArrowLeft`&&(n.theta-=.12),e.key===`ArrowRight`&&(n.theta+=.12),e.key===`ArrowUp`&&(n.phi-=.08),e.key===`ArrowDown`&&(n.phi+=.08),(e.key===`+`||e.key===`=`)&&(n.radius*=.9),e.key===`-`&&(n.radius*=1.1),n.radius=I.clamp(n.radius,W.minDistance,W.maxDistance),n.phi=I.clamp(n.phi,.01,W.maxPolarAngle),U.position.copy(W.target).add(new w().setFromSpherical(n)),X();return}!e.repeat&&j.has(e.code)&&(e.preventDefault(),N.add(e.code),i.press(e.code),X())}}function Qe(e){N.delete(e.code)&&(i.release(e.code),X())}function $e(e){e instanceof CustomEvent&&(e.detail?.reset?N.clear():typeof e.detail?.code==`string`&&(e.detail.down?N.add(e.detail.code):N.delete(e.detail.code)),X())}let et=new y,tt=new F;function nt(e){if(!e.isPrimary||e.button!==0)return;z.domElement.focus({preventScroll:!0});let t=z.domElement.getBoundingClientRect();if(tt.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),et.setFromCamera(tt,U),!_)return;let n=et.intersectObject(_,!0)[0]?.object??null;for(;n&&!n.name.startsWith(`key_`);)n=n.parent;n&&(P=n.name.slice(4),N.add(P),i.press(P),X())}function rt(){P&&N.delete(P)&&i.release(P),P=``,X()}function ot(){let e=U.clone();e.position.copy(b??U.position),e.lookAt(0,S,D),e.updateMatrixWorld();let t=0,n=[...[-10.3,10.3].flatMap(e=>[3,15.2*K.monitor.scale.y].map(t=>new w(e,t,-10.5))),...[-8.5,8.5].flatMap(e=>[-3.5,3.5].map(t=>new w(e,0,t))),...He()];for(let r of n){let n=r.applyMatrix4(e.matrixWorldInverse);t=Math.max(t,Math.abs(n.y/n.z),Math.abs(n.x/n.z)/U.aspect)}U.fov=I.radToDeg(2*Math.atan(t*1.055)),U.updateProjectionMatrix()}function st(){let e=t.querySelector(`.monitor-display`);if(!e||a.environment!==`typing`)return;let n=(e,n)=>{let r=K.screen.localToWorld(new w(e,n,0)).project(U);return{x:(r.x+1)*t.clientWidth/2,y:(1-r.y)*t.clientHeight/2}},r=[n(-9.56,5.41),n(9.56,5.41),n(9.56,-5.41),n(-9.56,-5.41)],i=Math.max(320,Math.round(Math.hypot(r[1].x-r[0].x,r[1].y-r[0].y))),o=i*10.82*K.monitor.scale.y/19.12,s=St(r,i,o);if(!s)return;e.style.width=`${i}px`,e.style.height=`${o}px`,e.style.transform=s,t.dataset.monitor=`projected`;let c=new w(0,1,4).project(U);t.dataset.keyboardY=String((1-c.y)*t.clientHeight/2)}function ct(){let e=Math.max(t.clientWidth,1),n=Math.max(t.clientHeight,1),r=e/n;z.setSize(e,n),ke?.setSize(Math.max(1,Math.round(e*z.getPixelRatio())),Math.max(1,Math.round(n*z.getPixelRatio()))),Ie=!0,q?.composer.setSize(e,n),q?.occlusion.setSize(Math.round(e*.75),Math.round(n*.75)),U.aspect=r;let i=a.environment===`desk`&&!a.closeUp?40:34;U.fov=I.radToDeg(2*Math.atan(Math.tan(I.degToRad(i)/2)*Math.max(1,1.5/r))),a.environment===`typing`?(K.monitor.scale.y=e<700?1.65:1,S=e<700?10:5,b=new w(0,e<700?25:17,e<700?52:38),ot(),U.position.copy(b),W.target.set(0,S,D),W.update(),b=null):(U.updateProjectionMatrix(),a.environment===`desk`&&O&&Math.abs(Math.log(r/O))>.15&&(O=r,window.setTimeout(()=>{o||Z()})),(v?.counts.external||v?.counts.planned)&&(b??=U.position.clone(),Ue())),X()}function lt(){document.hidden?(Ye(),cancelAnimationFrame(u),window.clearTimeout(f),f=0,u=0,t.dataset.renderState=`paused`):(m=performance.now(),X())}function ut(){R=L.matches,W.enableDamping=!R&&!V&&a.environment!==`typing`,X()}function dt(){b=null,X()}function ft(e){e.preventDefault(),s=!0,cancelAnimationFrame(u),window.clearTimeout(f),f=0,u=0,i.status({kind:`error`,message:`The 3D preview paused after a graphics reset. Try loading it again.`})}let pt=new ResizeObserver(ct);pt.observe(t);let Q=new IntersectionObserver(([e])=>{p=e.isIntersecting,p?(m=performance.now(),X()):(cancelAnimationFrame(u),window.clearTimeout(f),f=0,u=0,t.dataset.renderState=`paused`)});return Q.observe(t),W.addEventListener(`change`,X),W.addEventListener(`start`,dt),window.addEventListener(`keydown`,Ze),window.addEventListener(`keyup`,Qe),window.addEventListener(`blur`,Ye),window.addEventListener(`pointerup`,rt),window.addEventListener(`pointercancel`,rt),window.addEventListener(`keyconf-demo`,$e),window.addEventListener(`scroll`,X,{passive:!0}),document.addEventListener(`visibilitychange`,lt),L.addEventListener(`change`,ut),z.domElement.addEventListener(`pointerdown`,nt),z.domElement.addEventListener(`webglcontextlost`,ft),ct(),Z(),Be(!0),qe(n.device),{update(e,t){i=t;let n=Ot(e.device)!==Ot(a.device),r=e.view!==a.view||n||e.environment!==a.environment||e.closeUp!==a.closeUp,o=e.exploded!==a.exploded,s=JSON.stringify(e.accessories)!==JSON.stringify(a.accessories)||JSON.stringify(e.customAccessories)!==JSON.stringify(a.customAccessories),c=JSON.stringify(a)!==JSON.stringify(e);a=e,n?qe(e.device):s&&We();let l=e.environment===`desk`&&!e.closeUp&&(e.view===`perspective`||e.view===`reset`);if(r||o&&l)Z();else if(o){let t=U.position.clone().sub(W.target);e.exploded&&(ne=t.length()),e.environment===`desk`?S+=e.exploded?1.2:-1.2:(S=e.exploded?1.35:.4,T=0,D=0),t.setLength(e.exploded?Math.max(14,t.length()):ne),b=t.add(new w(T,S,D))}c&&Be()},dispose(){o=!0,g++,cancelAnimationFrame(u),window.clearTimeout(f),f=0,pt.disconnect(),Q.disconnect(),W.dispose(),window.removeEventListener(`keydown`,Ze),window.removeEventListener(`keyup`,Qe),window.removeEventListener(`blur`,Ye),window.removeEventListener(`pointerup`,rt),window.removeEventListener(`pointercancel`,rt),window.removeEventListener(`keyconf-demo`,$e),document.removeEventListener(`visibilitychange`,lt),L.removeEventListener(`change`,ut),z.domElement.removeEventListener(`pointerdown`,nt),z.domElement.removeEventListener(`webglcontextlost`,ft),v?.dispose(),A.forEach(Et),Oe(),c.attach(null),J?.dispose(),window.removeEventListener(`scroll`,X),K.dispose(),q?.shafts.dispose(),q?.occlusion.dispose(),q?.output.dispose(),q?.composer.dispose(),ke?.dispose(),we.geometry.dispose(),we.material.dispose(),ze.dispose(),ye.dispose(),ge.dispose(),z.dispose(),z.domElement.remove()}}}export{At as createKeyboardScene,Ot as modelIdFor,kt as sourceGlb};