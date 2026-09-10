import{a as e,c as t,f as n,i as r,l as i,n as a,r as o,s}from"./index-C3CNTFXg.js";import{$ as c,Bt as l,C as u,Ct as d,D as f,Dt as p,G as m,Gt as h,Ht as g,Lt as _,N as v,Nt as y,O as b,Ot as x,Pt as S,Q as C,Rt as w,S as T,St as E,T as D,Tt as O,Ut as k,Vt as A,W as ee,Wt as j,Z as te,_ as M,a as ne,b as N,dt as P,et as F,f as re,ft as ie,h as I,i as L,it as R,k as ae,kt as oe,l as se,m as z,mt as ce,nt as le,o as ue,ot as de,p as B,pt as fe,qt as pe,rt as V,t as H,tt as me,u as U,ut as he,v as W,vt as G,w as ge,wt as _e,x as ve,xt as K,y as ye,z as be,zt as q}from"./OrbitControls-B4H6o0iW.js";import{n as xe,r as J,t as Se}from"./switch-model-Cw4rdJU9.js";import{n as Ce,t as we}from"./appearance-aG9MEyA_.js";var Y=r(o(`q1-max-ansi-encoder`),`control_dial`);function Te(r){let i=new Map(r.children.filter(e=>e.name.startsWith(`key_`)).map(e=>[e.name.slice(4),e])),a=t.keys.map(e=>{let t=e.code===`ControlRight`?`ControlLeft`:e.code===`Escape`?`EscapeFn`:e.code,n=i.get(t),r=s[75].find(t=>t.width===e.width),a=r&&i.get(r.code);if(!n||!a)throw Error(`Missing Q1 cap template: ${e.code}`);let o=new b;o.name=`key_${e.code}`,o.position.set(e.x,n.position.y,-e.y);for(let e of a.children)if(!e.name.startsWith(`legend_`)){let t=e.clone(),r=n.children.find(e=>e instanceof c&&!e.name.startsWith(`legend_`));t instanceof c&&r instanceof c&&(t.material=r.material),o.add(t)}for(let e of n.children)e.name.startsWith(`legend_`)&&o.add(e.clone());return o});for(let e of i.values())r.remove(e);for(let e of r.children)e.position.x*=16.25/16,e.position.z*=6.5/6,e.scale.x*=16.25/16,e.scale.z*=6.5/6;r.add(...a);let o=e(Y.size[0]/2),l=e(Y.size[2]),u=new c(new N(o,o,l,64),new R({color:n,metalness:.85,roughness:.3}));u.name=`control_dial`,u.position.set(t.stockEncoder.x,.43+l/2,-t.stockEncoder.y),r.add(u)}var X={id:`am-hatsu-split-4x6`,name:`AM HATSU split 4x6 study`,layout:`4x6-split-ortho`,unit:`u`,fidelity:`illustrative`,note:`Official sources call HATSU a 4x6 / 45% split ortholinear board. Per-half 4x6 is the usual 45% split-ortho reading; Angry Miao does not publish CAD, half footprints, tent angle, or a total key count. Coordinates are a visual study, not manufacturer dimensions.`,source:{product:`https://store.angrymiao.com/products/am-hatsu`,manual:`https://cdn-www.angrymiao.com/pdf/AMHATSUUserManual%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf`},bounds:{width:15,height:4,splitGap:3},halves:{left:{centerX:-4.5,columns:6,rows:4},right:{centerX:4.5,columns:6,rows:4}},keys:[{code:`Escape`,half:`left`,row:0,col:0,width:1,x:-7,y:1.5},{code:`Digit1`,half:`left`,row:0,col:1,width:1,x:-6,y:1.5},{code:`Digit2`,half:`left`,row:0,col:2,width:1,x:-5,y:1.5},{code:`Digit3`,half:`left`,row:0,col:3,width:1,x:-4,y:1.5},{code:`Digit4`,half:`left`,row:0,col:4,width:1,x:-3,y:1.5},{code:`Digit5`,half:`left`,row:0,col:5,width:1,x:-2,y:1.5},{code:`KeyQ`,half:`left`,row:1,col:0,width:1,x:-7,y:.5},{code:`KeyW`,half:`left`,row:1,col:1,width:1,x:-6,y:.5},{code:`KeyE`,half:`left`,row:1,col:2,width:1,x:-5,y:.5},{code:`KeyR`,half:`left`,row:1,col:3,width:1,x:-4,y:.5},{code:`KeyT`,half:`left`,row:1,col:4,width:1,x:-3,y:.5},{code:`BracketLeft`,half:`left`,row:1,col:5,width:1,x:-2,y:.5},{code:`KeyA`,half:`left`,row:2,col:0,width:1,x:-7,y:-.5},{code:`KeyS`,half:`left`,row:2,col:1,width:1,x:-6,y:-.5},{code:`KeyD`,half:`left`,row:2,col:2,width:1,x:-5,y:-.5},{code:`KeyF`,half:`left`,row:2,col:3,width:1,x:-4,y:-.5},{code:`KeyG`,half:`left`,row:2,col:4,width:1,x:-3,y:-.5},{code:`Semicolon`,half:`left`,row:2,col:5,width:1,x:-2,y:-.5},{code:`KeyZ`,half:`left`,row:3,col:0,width:1,x:-7,y:-1.5},{code:`KeyX`,half:`left`,row:3,col:1,width:1,x:-6,y:-1.5},{code:`KeyC`,half:`left`,row:3,col:2,width:1,x:-5,y:-1.5},{code:`KeyV`,half:`left`,row:3,col:3,width:1,x:-4,y:-1.5},{code:`KeyB`,half:`left`,row:3,col:4,width:1,x:-3,y:-1.5},{code:`Quote`,half:`left`,row:3,col:5,width:1,x:-2,y:-1.5},{code:`Digit6`,half:`right`,row:0,col:0,width:1,x:2,y:1.5},{code:`Digit7`,half:`right`,row:0,col:1,width:1,x:3,y:1.5},{code:`Digit8`,half:`right`,row:0,col:2,width:1,x:4,y:1.5},{code:`Digit9`,half:`right`,row:0,col:3,width:1,x:5,y:1.5},{code:`Digit0`,half:`right`,row:0,col:4,width:1,x:6,y:1.5},{code:`Backspace`,half:`right`,row:0,col:5,width:1,x:7,y:1.5},{code:`KeyY`,half:`right`,row:1,col:0,width:1,x:2,y:.5},{code:`KeyU`,half:`right`,row:1,col:1,width:1,x:3,y:.5},{code:`KeyI`,half:`right`,row:1,col:2,width:1,x:4,y:.5},{code:`KeyO`,half:`right`,row:1,col:3,width:1,x:5,y:.5},{code:`KeyP`,half:`right`,row:1,col:4,width:1,x:6,y:.5},{code:`BracketRight`,half:`right`,row:1,col:5,width:1,x:7,y:.5},{code:`KeyH`,half:`right`,row:2,col:0,width:1,x:2,y:-.5},{code:`KeyJ`,half:`right`,row:2,col:1,width:1,x:3,y:-.5},{code:`KeyK`,half:`right`,row:2,col:2,width:1,x:4,y:-.5},{code:`KeyL`,half:`right`,row:2,col:3,width:1,x:5,y:-.5},{code:`Slash`,half:`right`,row:2,col:4,width:1,x:6,y:-.5},{code:`Enter`,half:`right`,row:2,col:5,width:1,x:7,y:-.5},{code:`KeyN`,half:`right`,row:3,col:0,width:1,x:2,y:-1.5},{code:`KeyM`,half:`right`,row:3,col:1,width:1,x:3,y:-1.5},{code:`Comma`,half:`right`,row:3,col:2,width:1,x:4,y:-1.5},{code:`Period`,half:`right`,row:3,col:3,width:1,x:5,y:-1.5},{code:`ShiftRight`,half:`right`,row:3,col:4,width:1,x:6,y:-1.5},{code:`ControlRight`,half:`right`,row:3,col:5,width:1,x:7,y:-1.5}]};function Ee(e){let t=new Map(e.children.filter(e=>e.name.startsWith(`key_`)).map(e=>[e.name.slice(4),e])),n=t.get(`KeyA`);if(!n)throw Error(`Missing 1u HATSU cap template: KeyA`);let r=n.position.y,i=X.keys.map(e=>{let i=t.get(e.code),a=new b;a.name=`key_${e.code}`,a.position.set(e.x,r,-e.y);for(let e of n.children)e.name.startsWith(`legend_`)||a.add(e.clone());if(i){for(let t of i.children)if(t.name.startsWith(`legend_`)){let n=t.clone();n.name=`legend_${e.code}`,a.add(n)}}return a});for(;e.children.length;)e.remove(e.children[0]);e.add(...i);let a=new R({name:`case`,color:`#4a5564`,metalness:.8,roughness:.33}),o=new R({name:`plate`,color:`#30343a`,metalness:.4,roughness:.35}),s=new R({name:`pcb`,color:`#0f2e24`,roughness:.65}),l=new b;l.name=`case_bottom`;let u=new b;u.name=`plate`;let d=new b;d.name=`pcb`;for(let e of[`left`,`right`]){let t=X.halves[e].centerX,n=new c(new J(6.7,.42,4.7,4,.16),a);n.name=`case_${e}`,n.position.set(t,.05,0),l.add(n);let r=new c(new J(6.15,.05,4.15,2,.04),o);r.name=`plate_${e}`,r.position.set(t,.39,0),u.add(r);let i=new c(new J(6.1,.08,4.1,2,.04),s);i.name=`pcb_${e}`,i.position.set(t,.29,0),d.add(i)}e.add(l,u,d)}var Z={rows:5,columns:40,width:14,depth:1.55,y:.58,z:-3.42};function De(e){if(e.getObjectByName(`display_panel`))return;let t=new b;t.name=`display_panel`;let n=new c(new J(Z.width+.18,.08,Z.depth+.12,2,.04),new R({name:`mod`,color:`#111114`,metalness:.2,roughness:.4}));n.position.set(0,Z.y,Z.z),t.add(n);let r=Z.width/Z.columns,i=Z.depth/Z.rows,a=new U(r*.72,.03,i*.72),o=new R({name:`accent`,color:`#5ce1ff`,emissive:`#5ce1ff`,emissiveIntensity:.55,roughness:.35}),s=new v(a,o,Z.rows*Z.columns);s.name=`display_pixels`;let l=new C,u=0,d=-Z.width/2+r/2,f=Z.z-Z.depth/2+i/2;for(let e=0;e<Z.rows;e++)for(let t=0;t<Z.columns;t++)s.setMatrixAt(u++,l.makeTranslation(d+t*r,Z.y+.055,f+e*i));t.add(s),e.add(t)}var Q={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},$=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Oe=new P(-1,1,1,-1,0,1),ke=new class extends re{constructor(){super(),this.setAttribute(`position`,new f([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new f([0,2,0,0,2,0],2))}},Ae=class{constructor(e){this._mesh=new c(ke,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Oe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},je=class extends ${constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof x?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=A.clone(e.uniforms),this.material=new x({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ae(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Me=class extends ${constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ne=class extends ${constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Pe=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new j);this._width=n.width,this._height=n.height,t=new pe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ae}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new je(Q),this.copyPass.material.blending=0,this.timer=new w}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Me!==void 0&&(r instanceof Me?n=!0:r instanceof Ne&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new j);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Fe=class extends ${constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new M}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Ie={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new j},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new C},cameraProjectionMatrixInverse:{value:new C},cameraWorldMatrix:{value:new C},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new h(-1,-1,-1)},sceneBoxMax:{value:new h(1,1,1)}},vertexShader:`

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
		}`},Le={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Re={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function ze(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=Be(t),r=n.length,i=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],a=2*Math.PI*t/r,o=new h(Math.cos(a),Math.sin(a),0).normalize();i[e*4]=(o.x*.5+.5)*255,i[e*4+1]=(o.y*.5+.5)*255,i[e*4+2]=127,i[e*4+3]=255}let a=new ve(i,t,t);return a.wrapS=_e,a.wrapT=_e,a.needsUpdate=!0,a}function Be(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var Ve={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:He(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new j},cameraProjectionMatrixInverse:{value:new C},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function He(e,t,n){let r=Ue(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function Ue(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new h(Math.cos(a),Math.sin(a),o))}return r}var We=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,ee=g-1+3*d,j=_-1+3*d,te=v-1+3*d,M=c&255,ne=l&255,N=u&255,P=this.perm[M+this.perm[ne+this.perm[N]]]%12,F=this.perm[M+y+this.perm[ne+b+this.perm[N+x]]]%12,re=this.perm[M+S+this.perm[ne+C+this.perm[N+w]]]%12,ie=this.perm[M+1+this.perm[ne+1+this.perm[N+1]]]%12,I=.6-g*g-_*_-v*v;I<0?r=0:(I*=I,r=I*I*this._dot3(this.grad3[P],g,_,v));let L=.6-T*T-E*E-D*D;L<0?i=0:(L*=L,i=L*L*this._dot3(this.grad3[F],T,E,D));let R=.6-O*O-k*k-A*A;R<0?a=0:(R*=R,a=R*R*this._dot3(this.grad3[re],O,k,A));let ae=.6-ee*ee-j*j-te*te;return ae<0?o=0:(ae*=ae,o=ae*ae*this._dot3(this.grad3[ie],ee,j,te)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,ee=w>D?4:0,j=T>D?2:0,te=+(E>D),M=O+k+A+ee+j+te,ne=+(a[M][0]>=3),N=+(a[M][1]>=3),P=+(a[M][2]>=3),F=+(a[M][3]>=3),re=+(a[M][0]>=2),ie=+(a[M][1]>=2),I=+(a[M][2]>=2),L=+(a[M][3]>=2),R=+(a[M][0]>=1),ae=+(a[M][1]>=1),oe=+(a[M][2]>=1),se=+(a[M][3]>=1),z=w-ne+c,ce=T-N+c,le=E-P+c,ue=D-F+c,de=w-re+2*c,B=T-ie+2*c,fe=E-I+2*c,pe=D-L+2*c,V=w-R+3*c,H=T-ae+3*c,me=E-oe+3*c,U=D-se+3*c,he=w-1+4*c,W=T-1+4*c,G=E-1+4*c,ge=D-1+4*c,_e=h&255,ve=g&255,K=_&255,ye=v&255,be=o[_e+o[ve+o[K+o[ye]]]]%32,q=o[_e+ne+o[ve+N+o[K+P+o[ye+F]]]]%32,xe=o[_e+re+o[ve+ie+o[K+I+o[ye+L]]]]%32,J=o[_e+R+o[ve+ae+o[K+oe+o[ye+se]]]]%32,Se=o[_e+1+o[ve+1+o[K+1+o[ye+1]]]]%32,Ce=.6-w*w-T*T-E*E-D*D;Ce<0?l=0:(Ce*=Ce,l=Ce*Ce*this._dot4(i[be],w,T,E,D));let we=.6-z*z-ce*ce-le*le-ue*ue;we<0?u=0:(we*=we,u=we*we*this._dot4(i[q],z,ce,le,ue));let Y=.6-de*de-B*B-fe*fe-pe*pe;Y<0?d=0:(Y*=Y,d=Y*Y*this._dot4(i[xe],de,B,fe,pe));let Te=.6-V*V-H*H-me*me-U*U;Te<0?f=0:(Te*=Te,f=Te*Te*this._dot4(i[J],V,H,me,U));let X=.6-he*he-W*W-G*G-ge*ge;return X<0?p=0:(X*=X,p=X*X*this._dot4(i[Se],he,W,G,ge)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},Ge=class e extends ${constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=ze(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new pe(this.width,this.height,{type:ae}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new x({defines:Object.assign({},Ie.defines),uniforms:A.clone(Ie.uniforms),vertexShader:Ie.vertexShader,fragmentShader:Ie.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new le,this.normalMaterial.blending=0,this.pdMaterial=new x({defines:Object.assign({},Ve.defines),uniforms:A.clone(Ve.uniforms),vertexShader:Ve.vertexShader,fragmentShader:Ve.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new x({defines:Object.assign({},Le.defines),uniforms:A.clone(Le.uniforms),vertexShader:Le.vertexShader,fragmentShader:Le.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new x({uniforms:A.clone(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new x({uniforms:A.clone(Re.uniforms),vertexShader:Re.vertexShader,fragmentShader:Re.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ae(null),this._originalClearColor=new M,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new u,this.depthTexture.format=T,this.depthTexture.type=k,this.normalRenderTarget=new pe(this.width,this.height,{minFilter:de,magFilter:de,type:ae,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=He(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new We,n=e*e*4,r=new Uint8Array(n);for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=n,o=i;r[(n*e+i)*4]=(t.noise(a,o)*.5+.5)*255,r[(n*e+i)*4+1]=(t.noise(a+e,o)*.5+.5)*255,r[(n*e+i)*4+2]=(t.noise(a,o+e)*.5+.5)*255,r[(n*e+i)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let i=new ve(r,e,e,K,g);return i.wrapS=_e,i.wrapT=_e,i.needsUpdate=!0,i}};Ge.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ke={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},qe=class extends ${constructor(){super(),this.isOutputPass=!0,this.uniforms=A.clone(Ke.uniforms),this.material=new E({name:Ke.name,uniforms:this.uniforms,vertexShader:Ke.vertexShader,fragmentShader:Ke.fragmentShader}),this._fsQuad=new Ae(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},W.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Je=class extends p{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new U;e.deleteAttribute(`uv`);let t=new R({side:1}),n=new R,r=new ce(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new c(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new v(e,n,6),o=new he;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new c(e,Ye(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let l=new c(e,Ye(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new c(e,Ye(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new c(e,Ye(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let f=new c(e,Ye(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let p=new c(e,Ye(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ye(e){return new me({color:0,emissive:16777215,emissiveIntensity:e})}function Xe(e){let t=new b;t.name=`desk-environment`;let n=new Set,r=new Set,i=new Set,a=[],o=[],s=!1;function u(e,t=.7,n=0){let i=new R({color:e,roughness:t,metalness:n});return r.add(i),i}function d(e,t,r,i=0,a=0,o=0){n.add(e);let s=new c(e,t);return s.position.set(i,a,o),s.castShadow=s.receiveShadow=!0,r.add(s),s}let p=u(`#b4a68e`,.84),m=document.createElement(`canvas`);m.width=1024,m.height=512;let g=m.getContext(`2d`);if(g){g.fillStyle=`#79694f`,g.fillRect(0,0,1024,512);for(let e=0;e<450;e++){let t=e*512/450;g.strokeStyle=e%3==0?`#282a2216`:`#ded6bb12`,g.lineWidth=e%7==0?1.3:.5,g.beginPath(),g.moveTo(0,t),g.bezierCurveTo(300,t+Math.sin(e*.25)*8,750,t-5,1024,t+3),g.stroke()}let e=new B(m);e.colorSpace=O,e.wrapS=e.wrapT=_e,e.repeat.set(3,3),p.map=e,p.bumpMap=e,p.bumpScale=.035,i.add(e)}d(new J(52,.7,46,3,.25),p,t,0,-.59,-3);let S=u(`#343e37`,.97);d(new U(20,.035,9.2),S,t,0,-.218,0);let C=u(`#d7cdb3`,.9),w=u(`#28342c`,.78),T=u(`#a58d57`,.45,.6),E=new b;E.position.set(8,-.2,-7.4),E.rotation.y=-.16,t.add(E),d(new U(5,.08,6.8),w,E,0,.07,0),d(new U(4.85,.56,6.62),C,E,.03,.38,0),d(new U(5,.08,6.8),w,E,0,.71,0);let k=d(new U(4.5,.42,5.4),u(`#79715e`),E,-.25,.99,.14);k.rotation.y=.15;for(let e=0;e<8;e++)d(new U(4.86,.01,6.63),u(e%2?`#a69b83`:`#bdb19a`),E,.03,.12+e*.065,0);let A=new re,ee=[],te=[],ne=[];for(let e=0;e<=18;e++){let t=e/18,n=Math.sin(Math.PI*t)*.34;for(let e=0;e<5;e++){let r=(e-2)/2;ne.push(e/4,t),ee.push(r*n,t,Math.sin(t*Math.PI)*.16+Math.abs(r)*.09)}}for(let e=0;e<18;e++)for(let t=0;t<4;t++){let n=e*5+t;te.push(n,n+5,n+1,n+1,n+5,n+6)}A.setAttribute(`position`,new f(ee,3)),A.setIndex(te),A.setAttribute(`uv`,new f(ne,2)),A.computeVertexNormals(),n.add(A);let P=u(`#ffffff`,.78),ie=document.createElement(`canvas`);ie.width=128,ie.height=256;let L=ie.getContext(`2d`);if(L){let e=L.createLinearGradient(0,0,128,0);e.addColorStop(0,`#a2ad88`),e.addColorStop(.5,`#e7e9c9`),e.addColorStop(1,`#acb992`),L.fillStyle=e,L.fillRect(0,0,128,256),L.strokeStyle=`#ecedc569`,L.lineWidth=1,L.beginPath(),L.moveTo(64,0),L.lineTo(64,256);for(let e=16;e<240;e+=20)for(let t of[-1,1])L.moveTo(64,e),L.quadraticCurveTo(64+t*18,e-10,64+t*58,e-22);L.stroke();let t=new B(ie);t.colorSpace=O,P.map=t,P.bumpMap=t,P.bumpScale=.014,i.add(t)}P.side=2;let ae=u(`#516444`,.8),oe=u(`#292a1f`,1);function se(e,n,r,i){let s=new b;s.position.set(e,i,n),s.scale.setScalar(r),t.add(s);let c=u(`#9d9680`,.9),f=[new j(.8,0),new j(.94,.08),new j(1.12,1.65),new j(1.1,1.73),new j(1.02,1.73),new j(.9,.16)];d(new be(f,48),c,s);let p=d(new I(1.04,40),oe,s,0,1.6,0);p.rotation.x=-Math.PI/2;let m=new v(A,P,22);m.castShadow=m.receiveShadow=!0;let g=new b;s.add(g),g.add(m),a.push(g);let _=[],y=new he;for(let e=0;e<22;e++){let t=e*2.39996,n=.6+e%4*.25,r=2.2+e%7*.42,i=new h(Math.cos(t)*n,r,Math.sin(t)*n),a=new h(Math.cos(t)*1.3,.1+e%3*.25,Math.sin(t)*1.3).normalize();y.position.copy(i),y.quaternion.setFromUnitVectors(new h(0,1,0),a),y.scale.set(1.6+e%3*.2,1.8+e%4*.22,1.7),y.updateMatrix(),m.setMatrixAt(e,y.matrix),_.push(y.clone()),m.setColorAt(e,new M().setHSL(.26+e%4*.012,.26,.075+e%5*.018));let o=new G(new h(0,1.5,0),new h(i.x*.2,r,i.z*.2),i);d(new l(o,10,.027,5,!1),ae,g)}o.push({mesh:m,poses:_})}se(8,-7.3,.85,1.04),se(-11,5.8,1.1,-.22);let le=new b;le.position.set(-11,-.2,-6.4),t.add(le);let ue=u(`#b6afa0`,.36);d(new be([new j(.88,0),new j(1.02,.12),new j(1.08,1.66),new j(.99,1.71),new j(.92,.22)],48),ue,le),d(new q(.6,.13,12,40),ue,le,1.14,.9,0);let de=d(new I(.99,40),u(`#241910`,.22),le,0,1.43,0);de.rotation.x=-Math.PI/2,d(new N(1.48,1.48,.09,48),u(`#756c54`),le,0,.02,0);let pe=new x({transparent:!0,depthWrite:!1,side:2,uniforms:{time:{value:0},phase:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`
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
      }`});r.add(pe);let V=d(new fe(3.6,5.2),pe,le,0,3.95,0);V.name=`coffee-steam`,V.layers.set(1),V.castShadow=V.receiveShadow=!1;let H=new b;H.name=`architect-field-notebook`,H.position.set(11.5,-.16,5.8),H.rotation.y=-.22,t.add(H),d(new J(9.25,.09,7.02,3,.04),w,H,0,.05,0);for(let e of[-1,1]){d(new J(4.46,.22,6.8,2,.06),C,H,e*2.26,.17,0);for(let t=0;t<7;t++)d(new U(4.44,.008,6.79),C,H,e*2.26,.085+t*.027,0)}let me=new fe(9,6.75,72,12),W=me.getAttribute(`position`);for(let e=0;e<W.count;e++){let t=W.getX(e),n=W.getY(e);W.setXYZ(e,t,.32+.17*Math.sin(Math.abs(t)/4.5*Math.PI)-.1*Math.exp(-t*t*15),-n)}me.computeVertexNormals();let ge=u(`#ffffff`,.93),ve=d(me,ge,H);ve.name=`sketchbook-illustration`,new _().load(new URL(`textures/solarpunk-sketchbook.png`,document.baseURI).href,t=>{if(s){t.dispose();return}t.colorSpace=O,t.anisotropy=8,i.add(t),ge.map=t,ge.needsUpdate=!0,e()});let K=d(new U(.16,.015,2.1),u(`#958356`,.96),H,.13,.07,3.9);K.rotation.y=.14;let xe=u(`#202822`,.34,.55),Se=u(`#b9bbb0`,.29,.88);function Ce(e,t,r,i,a){let o=new b;o.name=`precision-mechanical-pencil`,o.position.set(t,.59,r),o.rotation.set(Math.PI/2,0,i),e.add(o);let s=u(a,.34,.72);d(new N(.115,.115,3.55,6),s,o,0,.7,0),d(new N(.128,.128,1.45,32),Se,o,0,-1.83,0);let c=new q(.129,.008,3,24),f=new v(c,xe,28);n.add(c);let p=new he;for(let e=0;e<28;e++)p.position.y=-2.5+e*.05,p.rotation.set(Math.PI/2,e%2?.12:-.12,0),p.updateMatrix(),f.setMatrixAt(e,p.matrix);o.add(f),d(new N(.115,.035,.42,24),Se,o,0,-2.76,0),d(new N(.027,.027,.32,16),Se,o,0,-3.12,0),d(new N(.012,.012,.16,8),xe,o,0,-3.35,0),d(new N(.137,.137,.17,24),Se,o,0,2.55,0),d(new N(.08,.08,.34,24),s,o,0,2.77,0),d(new N(.125,.125,.08,24),Se,o,0,2.97,0);let m=new z([new h(.1,2.57,0),new h(.2,2.47,0),new h(.21,1.38,0),new h(.15,1.26,0)]);d(new l(m,18,.025,7,!1),Se,o)}Ce(H,3.65,.35,.13,`#4c6054`),Ce(t,8.9,6.75,-.32,`#b79b61`);let we=new b;we.position.set(11.5,-.12,-.5),we.rotation.y=-.08,t.add(we),d(new U(7,.08,.55),T,we);for(let e=0;e<55;e++)d(new U(.012,.004,e%5==0?.38:.2),xe,we,-3.2+e*.117,.044,.06);let Y=new b;Y.name=`solarpunk-monitor`,Y.position.set(0,-.2,-10.5),t.add(Y),d(new J(6,.25,3.5,3,.12),xe,Y,0,.14,.8),d(new J(1.2,4.5,.7,3,.18),T,Y,0,2.4,-.15),d(new J(20,12,.62,4,.25),xe,Y,0,9,0),d(new J(20.06,.32,.67,3,.1),p,Y,0,3.15,0);let Te=document.createElement(`canvas`);Te.width=1600,Te.height=900;let X=Te.getContext(`2d`);if(X){X.fillStyle=`#14221c`,X.fillRect(0,0,1600,900);let e=X.createRadialGradient(1050,250,0,900,340,850);e.addColorStop(0,`#2e5140`),e.addColorStop(1,`#13201b`),X.fillStyle=e,X.fillRect(0,0,1600,900)}let Ee=new B(Te);Ee.colorSpace=O,i.add(Ee);let Z=new F({map:Ee,toneMapped:!1});r.add(Z);let De=d(new fe(19.12,10.82),Z,Y,0,9,.322);De.name=`monitor-screen`,De.castShadow=De.receiveShadow=!1,d(new y(.045,8,6),u(`#b4cdb2`,.4),Y,9.25,3.2,.35);for(let e=0;e<16;e++)d(new U(.35,.045,.08),T,Y,-3.75+e*.5,3.16,.36);let Q=new b;Q.position.set(-14,-.2,-11),t.add(Q),d(new N(1.6,1.75,.22,48),xe,Q,0,.12,0);let $=new z([new h(0,.2,0),new h(-.3,5.6,0),new h(1.6,8.6,0),new h(3.4,8.2,.5)]);d(new l($,40,.095,12,!1),T,Q);let Oe=d(new ye(1.5,1.2,48,1,!0),xe,Q,3.4,7.9,.5);Oe.rotation.z=-.12;let ke=d(new I(1.43,48),new F({color:`#f0d7a2`}),Q,3.4,7.32,.5);r.add(ke.material),ke.rotation.x=-Math.PI/2;let Ae=new ce(`#ffddb0`,16,18,2);Ae.position.set(-10.6,6.8,-10.5),t.add(Ae);let je=new b;je.position.set(15,-.2,-10.7),je.rotation.y=-.35,t.add(je),d(new J(3,.2,2.8,3,.1),p,je,0,.15,0),d(new J(.48,5,.5,2,.1),T,je,0,2.7,0),d(new J(2,.35,1.4,3,.16),p,je,0,5.3,0);let Me=new D(0,3.65,2.04,2.02,0,Math.PI,!1,0).getPoints(40).map(e=>new h(e.x,e.y,.1));d(new l(new z(Me),40,.22,10,!1),xe,je);for(let e of[-1,1]){let t=new b;t.position.set(e*1.97,3.45,.1),t.rotation.z=e*.1,je.add(t);let n=d(new N(1,1,.5,48),Se,t);n.rotation.z=Math.PI/2;let r=d(new q(.78,.21,12,48),xe,t,-e*.37,0,0);r.rotation.y=Math.PI/2;for(let n=0;n<6;n++){let r=d(new q(.22+n*.11,.014,4,40),xe,t,e*.265,0,0);r.rotation.y=Math.PI/2}}let Ne=u(`#364639`,.98),Pe=u(`#86775b`,.81);d(new U(150,160,.5),Ne,t,0,-2,-25);let Fe=new F({color:`#80987d`,transparent:!0,opacity:.56});r.add(Fe),new _().load(new URL(`textures/solarpunk-window-garden.png`,document.baseURI).href,t=>{if(s){t.dispose();return}t.colorSpace=O,t.anisotropy=4,i.add(t),Fe.map=t,Fe.color.set(`#dde1cb`),Fe.opacity=.9,Fe.needsUpdate=!0,e()}),d(new fe(38,25),Fe,t,-8,11,-24.68);for(let e=0;e<6;e++)d(new U(.22,25,.32),Pe,t,-27+e*7.6,11,-24.3);for(let e of[-1.5,11,23.5])d(new U(38,.2,.32),Pe,t,-8,e,-24.3);for(let e=0;e<9;e++){let n=d(new U(38,.13,1.2),Pe,t,-8,16+e*.85,-24.1);n.rotation.x=.3}d(new U(38,.35,3),p,t,-8,-1.3,-23.6),se(-20,-20,1.9,-1.15),se(10,-20,1.35,-1.15),d(new U(9,.3,2.8),p,t,18,11,-23);for(let e=0;e<6;e++){let n=d(new J(.6,2.2+e%3*.3,1.5,2,.04),e%2?w:C,t,15.4+e*.68,12.3,-23);n.rotation.z=e===5?-.15:0}let Ie=new he;return{group:t,monitor:Y,screen:De,updateAmbient(e,t){a.forEach((t,n)=>{t.rotation.z=Math.sin(e*.37+n*1.9)*.009,t.rotation.x=Math.sin(e*.29+n)*.006}),o.forEach(({mesh:t,poses:n},r)=>{n.forEach((n,i)=>{Ie.position.copy(n.position),Ie.scale.copy(n.scale),Ie.quaternion.copy(n.quaternion),Ie.rotateX(Math.sin(e*.85+i*.7+r)*.019+Math.sin(e*1.9+i)*.004),Ie.updateMatrix(),t.setMatrixAt(i,Ie.matrix)}),t.instanceMatrix.needsUpdate=!0}),pe.uniforms.time.value=e;let n=t.position.clone();le.worldToLocal(n),V.rotation.y=Math.atan2(n.x,n.z)},dispose(){s=!0,n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),i.forEach(e=>e.dispose())}}}function Ze([e,t,n,r],i,a){let o=t.x-n.x,s=r.x-n.x,c=t.y-n.y,l=r.y-n.y,u=e.x-t.x+n.x-r.x,d=e.y-t.y+n.y-r.y,f=o*l-s*c;if(Math.abs(f)<.001||i<=0||a<=0)return null;let p=(u*l-s*d)/f,m=(o*d-u*c)/f;return`matrix3d(${[(t.x-e.x+p*t.x)/i,(t.y-e.y+p*t.y)/i,0,p/i,(r.x-e.x+m*r.x)/a,(r.y-e.y+m*r.y)/a,0,m/a,0,0,1,0,e.x,e.y,0,1].join(`,`)})`}var Qe=6;function $e({selections:e,customAccessories:t,keys:n,bounds:r}){let a=i(t),o=new b;o.name=`accessory-previews`;let s=new Set,l=new Set,u=[],d=[],f={artisan:0,external:0,planned:0,omitted:0},p=!1;function m(e,t=.4,n=0){let r=new R({color:e,roughness:t,metalness:n});return l.add(r),r}function g(e,t,n,r=0,i=0,a=0){s.add(t);let o=new c(t,n);return o.position.set(r,i,a),o.castShadow=o.receiveShadow=!0,e.add(o),o}function _(e,t,n,r=.06){return new J(e,t,n,2,r)}function x(e){let t=new b;t.name=`illustrative-artisan`;let n=m(`#155963`,.3);g(t,_(e-.08,.12,.92),n,0,.06);let r=new V({color:`#82d9cf`,roughness:.13,metalness:0,transparent:!0,opacity:.42,depthWrite:!1,clearcoat:1,clearcoatRoughness:.12});l.add(r);let i=g(t,_(e-.12,.44,.84,.1),r,0,.32);i.name=`translucent-resin-shell`,i.castShadow=!1;let a=m(`#efd7a8`,.65),o=m(`#e4894e`,.34,.12),s=m(`#417d65`,.6),c=new y(1,10,6),u=Math.max(1,Math.floor(e));for(let n=0;n<u;n++){let r=((n+.5)/u-.5)*(e-.3);g(t,c,a,r-.13,.2,.1).scale.set(.15,.1,.11),g(t,c,s,r+.14,.2,-.13).scale.set(.11,.06,.14);let i=g(t,c,o,r+.04,.32,.05);i.scale.set(.13,.045,.07),i.rotation.y=-.6}return t}function S(){let e=new b;e.name=`illustrative-macropad`;let t=m(`#303934`,.44,.4),n=m(`#e6dbc0`),r=m(`#cb7548`),i=m(`#9ca995`,.34,.65);g(e,_(3.65,.35,5.75,.14),t,0,.175),g(e,_(3.45,.07,5.55),i,0,.37);let a=_(.86,.35,.86,.09),o=new v(a,n,12);u.push(o),s.add(a);let c=new C;for(let e=0;e<12;e++)o.setMatrixAt(e,c.makeTranslation(e%3-1,.59,Math.floor(e/3)-.9)),o.setColorAt(e,e<3?r.color:n.color);o.name=`macropad-twelve-keys`,o.castShadow=o.receiveShadow=!0,e.add(o),g(e,_(1.8,.08,.72,.04),t,-.58,.44,-2.12);let l=m(`#a4e5c5`,.7);l.emissive.set(`#39715a`),l.emissiveIntensity=.4;let d=new U(1.12,.01,.045);for(let t=0;t<3;t++)g(e,d,l,-.65,.487,-2.3+t*.15);return g(e,new N(.38,.38,.42,20),t,1.04,.64,-2.12),g(e,new U(.045,.015,.16),n,1.04,.857,-2.29),g(e,_(.4,.15,.14,.02),t,-.9,.17,-2.91),e}function w(e){let t=new b;t.name=`unmounted-${e}`;let n=m(`#333a34`,.8),r=m(`#176c58`,.65),i=m(`#b7b6ab`,.3,.8),a=m(`#171c1b`,.4);if(g(t,_(3.8,.12,2.5),n,0,.06),e===`encoder`){g(t,_(.85,.55,.8),i,-.65,.4),g(t,new N(.16,.16,.6,16),i,-.65,.95),g(t,new N(.45,.45,.55,24),a,.75,.4);for(let e=0;e<3;e++)g(t,_(.07,.07,.5,.01),i,-.9+e*.25,.2,.55)}else if(e===`screen`){g(t,_(2.1,.1,1.85),r,0,.22),g(t,_(1.8,.06,1.1),a,0,.31,-.1);for(let e=0;e<4;e++)g(t,_(.09,.22,.09,.01),i,-.4+e*.27,.4,.7)}else{g(t,_(3.2,.1,1.1),r,0,.22);for(let e=0;e<4;e++){let n=-1.2+e*.8;g(t,_(.52,.02,.52,.01),a,n,.28);for(let e of[-.35,.35])g(t,new N(.055,.055,.025,8),i,n,.28,e)}}return t}function T(e=2.8,t=1.8){let n=new b;return n.name=`unavailable-product-geometry`,n.userData.geometry=`unavailable`,g(n,_(e,.1,t),m(`#717b74`,.8),0,.05),g(n,_(e*.55,.02,.035,.01),m(`#c7cec4`),0,.11),n}let E=new Map;for(let t of e)t.location.kind===`key`&&E.set(t.location.keyId,(E.get(t.location.keyId)??0)+1);let D={left:0,right:0,above:0},O={left:0,right:0,above:0},k=0;for(let t of e)t.location.kind===`external`&&a.some(e=>e.id===t.productId&&(e.kind===`macropad`||e.id.startsWith(`import-accessory:`)))&&k<Qe&&(O[t.location.position]++,k++);for(let t of e){let e=a.find(e=>e.id===t.productId),i=t.location;if(e?.kind===`artisan`&&i.kind===`key`){let r=n.get(i.keyId),a=r?.children.find(e=>e instanceof c&&e.name.startsWith(`cap`));a instanceof c&&a.geometry.computeBoundingBox();let o=a instanceof c?a.geometry.boundingBox?.getSize(new h).x:void 0;if(e.sizeU===null||!r||o===void 0||Math.abs(o+.08-e.sizeU)>.03||E.get(i.keyId)!==1||t.quantity!==1){f.omitted++;continue}let s=r.children.map(e=>({object:e,visible:e.visible}));s.forEach(({object:e})=>{e.visible=!1});let l=e.id.startsWith(`import-accessory:`)?T(e.sizeU-.08,.92):x(e.sizeU);l.userData.selectionId=t.id,r.add(l),d.push({group:l,originals:s}),f.artisan++}else if(e&&i.kind===`external`&&(e.kind===`macropad`||e.id.startsWith(`import-accessory:`))){if(f.external>=Qe||r.isEmpty()){f.omitted++;continue}let n=D[i.position]++,a=n%3,s=Math.floor(n/3),c=a-(Math.min(O[i.position],3)-1)/2,l=e.id.startsWith(`import-accessory:`)?T():S();l.userData.selectionId=t.id;let u=.6;l.position.set(i.position===`left`?r.min.x-1.825-u-s*4.1:i.position===`right`?r.max.x+1.825+u+s*4.1:c*4.1,-.2,i.position===`above`?r.min.z-2.875-u-s*6.2:c*6.2),o.add(l),f.external++}else if(i.kind===`embedded`&&e&&(e.id.startsWith(`import-accessory:`)||e.kind===`screen`||e?.kind===`buttons`||e?.kind===`encoder`)){if(f.planned>=6||r.isEmpty()){f.omitted++;continue}let n=e.id.startsWith(`import-accessory:`)?T():e.kind===`screen`||e.kind===`buttons`||e.kind===`encoder`?w(e.kind):T();n.userData.selectionId=t.id,n.userData.installation=`unmounted`,n.position.set((f.planned%3-1)*4.1,-.2,r.max.z+1.9+Math.floor(f.planned/3)*2.8),o.add(n),f.planned++}else f.omitted++}return{group:o,counts:f,dispose(){if(!p){p=!0;for(let e of d){e.group.removeFromParent();for(let{object:t,visible:n}of e.originals)t.visible=n}o.removeFromParent(),u.forEach(e=>e.dispose()),s.forEach(e=>e.dispose()),l.forEach(e=>e.dispose())}}}}var et=class extends Ge{render(...e){this.camera.layers.disable(1);try{super.render(...e)}finally{this.camera.layers.enable(1)}}};function tt(e){let t=new Set,n=new Set;e.traverse(e=>{if(e instanceof c){n.add(e.geometry);for(let n of Array.isArray(e.material)?e.material:[e.material])t.add(n)}}),n.forEach(e=>e.dispose()),t.forEach(e=>e.dispose())}async function nt(e,t){let n=a(t),r=0;for(let t of n.requests){let n=e.getObjectByName(t.role),i=n?.parent;if(n&&i)try{let e=(await new Ce().loadAsync(new URL(t.assetPath,document.baseURI).href)).scene,a=new se().setFromObject(n).getCenter(new h);e.position.copy(n.position),e.quaternion.copy(n.quaternion),e.scale.copy(n.scale),n instanceof c&&e.traverse(e=>{if(!(e instanceof c))return;let t=e.material;e.material=n.material;for(let e of Array.isArray(t)?t:[t])e.dispose()}),e.name=t.role,i.add(e),e.updateWorldMatrix(!0,!0);let o=new se().setFromObject(e).getCenter(new h);e.position.copy(i.worldToLocal(e.getWorldPosition(new h).add(a.sub(o)))),n.name=`${t.role}_study`,n.visible=!1,r+=1}catch{}}e.userData.cadParts=r,e.userData.cadTwin=n.twin}function rt(e){return e.kind===`keyboard`?e.hatsu?`keyboard-hatsu`:e.cyberboard?`keyboard-cyberboard-r2`:e.q1Max?`keyboard-q1-max`:`keyboard-${e.layout}`:e.model}function it(e){return e===`keyboard-hatsu`?`keyboard-60.glb`:e===`keyboard-q1-max`||e===`keyboard-cyberboard-r2`?`keyboard-75.glb`:`${e}.glb`}function at(e,t,n){let r=n,i=t,a=!1,o=!1,s=0,l=0,u=!0,f=0,g=0,_=null,y=null,b=null,x=.4,C=0,w=0,T=0,E=11,D=new Map,O=new Set,k=new Map,A=new WeakMap,M=new Map,N=new Map,P=new Set,F=``,re=window.matchMedia(`(prefers-reduced-motion: reduce)`),I=re.matches,z=new ne({antialias:!0,alpha:!0,powerPreference:`high-performance`}),ce=z.getContext(),le=ce.getExtension(`WEBGL_debug_renderer_info`),de=String(ce.getParameter(le?le.UNMASKED_RENDERER_WEBGL:ce.RENDERER)),B=/swiftshader|llvmpipe|softpipe|software rasterizer|microsoft basic render/i.test(de);e.dataset.renderQuality=B?`efficient`:`full`,z.setPixelRatio(B?.75:Math.min(window.devicePixelRatio,2)),z.shadowMap.enabled=!0,z.shadowMap.type=B?1:3,z.toneMapping=7,z.toneMappingExposure=1,z.domElement.tabIndex=0,z.domElement.setAttribute(`role`,`application`),z.domElement.setAttribute(`aria-label`,`Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.`),e.appendChild(z.domElement);let V=new p,me=new L(z),U=new Je,he=me.fromScene(U,B?0:.04,.1,100,{size:B?32:256});V.environment=he.texture,V.environmentIntensity=.7,U.dispose();let W=new ie(34,1,.1,150);W.position.set(7,15,19),W.layers.enable(1);let G=new H(W,z.domElement);G.enableDamping=!I&&!B,G.dampingFactor=.1,G.minDistance=12,G.maxDistance=46,G.maxPolarAngle=Math.PI*.48,G.target.set(0,.4,0),G.enablePan=!1;let K=new ge(`#ffffff`,2.2);K.position.set(-12,19,-10),K.castShadow=!0,K.shadow.mapSize.set(B?512:2048,B?512:2048),K.shadow.camera.left=-14,K.shadow.camera.right=14,K.shadow.camera.top=12,K.shadow.camera.bottom=-12,K.shadow.radius=3,K.shadow.blurSamples=8,K.shadow.normalBias=.03,K.shadow.bias=-1e-4,V.add(K);let ye=new ge(`#ffffff`,.8);ye.position.set(8,5,-5),V.add(ye,new ue(`#ffffff`,.25));let be=new c(new fe(200,200),new oe({color:`#524c3c`,opacity:.22}));be.rotation.x=-Math.PI/2,be.position.y=-.22,be.receiveShadow=!0,V.add(be);let q=Xe(()=>{X=!0,$()});V.add(q.group);let J=B?null:(()=>{let e=new pe(1,1,{type:ae,samples:2}),t=new Pe(z,e);t.addPass(new Fe(V,W));let n=new et(V,W,1,1);n.updateGtaoMaterial({radius:.9,thickness:1.5,distanceFallOff:.75,samples:12}),n.blendIntensity=.7,t.addPass(n);let r=new qe;return t.addPass(r),{composer:t,occlusion:n,output:r}})(),Y=B?new pe(1,1,{type:ae}):null,X=!0,Z=new Uint8Array(65536);for(let e=0;e<Z.length;e+=4){let t=150+Math.floor(Math.random()*80);Z[e]=Z[e+1]=Z[e+2]=t,Z[e+3]=255}let Q=new ve(Z,128,128);Q.wrapS=Q.wrapT=_e,Q.repeat.set(10,10),Q.magFilter=ee,Q.minFilter=m,Q.generateMipmaps=!0,Q.needsUpdate=!0;function $(){window.clearTimeout(l),l=0,!a&&!o&&!s&&u&&!document.hidden&&(s=requestAnimationFrame(Ie),e.dataset.renderState=`active`)}function Oe(e=!1){q.group.visible=i.environment!==`studio`,be.visible=!q.group.visible,z.domElement.setAttribute(`aria-label`,i.environment===`typing`?`Keyboard preview. Type inside the monitor or click a key to try your build.`:`Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.`);let t=i.device.kind===`control-deck`?i.device.lighting:`Studio`;K.color.set(t===`Daylight`||q.group.visible?`#fff1db`:`#ffffff`),K.intensity=t===`After hours`?.7:q.group.visible?.9:2.2,ye.intensity=t===`After hours`?.3:.8,V.environmentIntensity=t===`After hours`?.35:q.group.visible?.72:.7;let n=new Map([[`case`,i.caseColor],[`alpha`,i.alpha],[`mod`,i.mod],[`accent`,i.accent],[`space`,i.space],[`switch_housing`,xe(i.switchId??``).housing],[`switch_stem`,xe(i.switchId??``).stem]]);for(let[t,r]of N){let a=t.name.split(`.`)[0],o=a.startsWith(`legend_`),s=n.get(o?a.slice(7):a);if(s&&r.set(o?we(s):s),e&&t.color.copy(r),a===`case`){let e=i.finish===`Polycarbonate`;t.transparent!==e&&(t.transparent=e,t.needsUpdate=!0),t.metalness=i.finish===`Aluminum`?.8:i.finish===`Brass`?.95:0,t.roughness=e?.2:.33,t.opacity=e?.62:1,t.depthWrite=!e}}if(i.device.kind===`keyboard`){let e=_?.getObjectByName(`switches`);e&&(e.visible=i.exploded)}$()}function ke(){X=!0;let t=i.environment===`typing`;if(G.enableRotate=G.enableZoom=!t,G.enableDamping=!I&&!B&&!t,G.maxDistance=t?80:46,w=t?-3:0,C=0,q.monitor.scale.y=t&&e.clientWidth<700?1.65:1,t){let t=e.clientWidth<700;x=t?10:5,b=new h(0,t?25:17,t?52:38),Ke(),G.update(),W.position.copy(b),G.target.set(0,x,w),G.update(),b=null,$();return}Qe();let n=i.device.kind===`control-deck`,r=!n&&i.environment===`desk`&&i.view===`perspective`;C=r?-2:0;let a=n?i.exploded?.55:.46:i.environment===`desk`&&!r?1.24:1;x=r?-1.4:n&&i.exploded?1.35:i.environment===`desk`&&!r?1.8:.4,G.minDistance=i.device.kind===`control-deck`?7:12,b=i.view===`top`?new h(0,26,.01):i.view===`front`?new h(0,6,25):n?new h(-7,27,14):r?new h(-7,25,18):new h(-7,18,21),b.multiplyScalar(a),je(),$()}function Ae(){if(!(y?.counts.external||y?.counts.planned))return[];let e=new se().setFromObject(y.group);return _&&e.union(new se().setFromObject(_)),[e.min.x,e.max.x].flatMap(t=>[e.min.y,e.max.y].flatMap(n=>[e.min.z,e.max.z].map(e=>new h(t,n,e))))}function je(){let e=Ae();if(!b||!e.length)return;let t=W.clone();t.position.copy(b);let n=new h(C,x,w);t.lookAt(n),t.updateMatrixWorld();let r=Math.tan(te.degToRad(W.fov/2))*.86,i=r*W.aspect,a=0;for(let n of e)n.applyMatrix4(t.matrixWorldInverse),a=Math.max(a,Math.abs(n.x)/i+n.z,Math.abs(n.y)/r+n.z);b.add(b.clone().sub(n).normalize().multiplyScalar(a)),G.maxDistance=Math.max(46,b.distanceTo(n)*1.15)}function Me(){let t=!!(y?.counts.external||y?.counts.planned);y?.dispose(),y=null,_&&i.device.kind===`keyboard`&&(y=$e({selections:i.accessories??[],customAccessories:i.customAccessories,keys:k,bounds:new se().setFromObject(_)}),V.add(y.group)),e.dataset.accessoryArtisanCount=String(y?.counts.artisan??0),e.dataset.accessoryExternalCount=String(y?.counts.external??0),e.dataset.accessoryPlannedCount=String(y?.counts.planned??0),e.dataset.accessoryOmittedCount=String(y?.counts.omitted??0),X=!0,(t||y?.counts.external||y?.counts.planned)&&ke(),$()}async function Ne(t){let n=rt(t),o=++g;r.status({kind:`loading`});let s=D.get(n);s||(s=new Ce().loadAsync(new URL(`models/${it(n)}`,document.baseURI).href).then(async e=>{if(a)return tt(e.scene),e.scene;if(t.kind===`keyboard`){t.hatsu?Ee(e.scene):t.cyberboard?De(e.scene):t.q1Max&&Te(e.scene),await nt(e.scene,t);let n=[];e.scene.traverse(e=>{e.name.startsWith(`key_`)&&n.push(new h(e.position.x,.3,e.position.z))}),e.scene.add(Se(n,i.switchId??``).group)}return O.add(e.scene),e.scene}),D.set(n,s));try{let i=await s;if(a||o!==g)return;y?.dispose(),y=null,_&&V.remove(_),_=i,k.clear(),N.clear(),P.clear(),F=``,M.clear();for(let[e,n]of Object.entries({plate:1.01,pcb:.51,switches:t.kind===`keyboard`?2.3:1.75,screen:1.01,control_dial:t.kind===`keyboard`?4.8:1.01,control_joystick:1.01})){let t=_.getObjectByName(e);t&&(A.has(t)||A.set(t,t.position.y),M.set(t,n))}_.traverse(e=>{if(e.name.startsWith(`key_`)&&(k.set(e.name.slice(4),e),A.has(e)||A.set(e,e.position.y)),e instanceof c){e.castShadow=!0,e.receiveShadow=!0;for(let t of Array.isArray(e.material)?e.material:[e.material])t instanceof R&&(N.set(t,t.color.clone()),t.name.startsWith(`legend`)||(t.bumpMap=Q,t.bumpScale=.003))}}),e.dataset.switchCount=String(_.getObjectByName(`switch_bases`)instanceof v?k.size:0),e.dataset.keyboardVariant=n,e.dataset.keyCount=String(k.size),e.dataset.cadParts=String(_.userData.cadParts??0),e.dataset.cadTwin=_.userData.cadTwin?`1`:`0`,V.add(_),Me(),Oe(!0),r.status({kind:`ready`}),$()}catch{D.delete(n),!a&&o===g&&r.status({kind:`error`,message:`The keyboard model could not load. Check your connection and try again.`})}}function Ie(t){if(s=0,a||!u||document.hidden)return;let n=Math.min((t-f)/1e3||1/60,.05);f=t;let r=!1,o=(e,t,i)=>I||B||Math.abs(e-t)<5e-4?t:(r=!0,te.damp(e,t,i,n));for(let[e,t]of k)t.position.y=o(t.position.y,(A.get(t)??t.position.y)+(i.exploded?i.device.kind===`keyboard`?4.8:2.6:0)-(P.has(e)?.14:0),19),t.scale.y=o(t.scale.y,i.device.kind===`control-deck`?1:i.profile===`Tall sculpted`?1.5:i.profile===`Low uniform`?.7:1,14);for(let[e,t]of M)e.position.y=o(e.position.y,(A.get(e)??e.position.y)+(i.exploded?t:0),12);let c=_?.getObjectByName(`control_dial`);c&&i.device.kind===`control-deck`&&(c.rotation.y=o(c.rotation.y,(i.device.dial-.5)*Math.PI*1.5,16));for(let[e,t]of N)e.color.r=o(e.color.r,t.r,14),e.color.g=o(e.color.g,t.g,14),e.color.b=o(e.color.b,t.b,14);b&&(W.position.x=o(W.position.x,b.x,10),W.position.y=o(W.position.y,b.y,10),W.position.z=o(W.position.z,b.z,10),W.position.distanceTo(b)<.002&&(W.position.copy(b),b=null)),G.target.x=o(G.target.x,C,10),G.target.y=o(G.target.y,x,10),G.target.z=o(G.target.z,w,10);let d=G.update(n),p=q.group.visible&&i.roomMotion!==!1&&!I&&!(B&&i.environment===`typing`);p&&(T+=n),q.group.visible&&q.updateAmbient(T,W),Y&&i.environment===`typing`?(X&&=(_&&(_.visible=!1),y&&(y.group.visible=!1),z.setRenderTarget(Y),z.render(V,W),z.setRenderTarget(null),_&&(_.visible=!0),y&&(y.group.visible=!0),!1),q.group.visible=!1,be.visible=!0,V.background=Y.texture,z.render(V,W),V.background=null,q.group.visible=!0,be.visible=!1):q.group.visible&&J?J.composer.render(n):z.render(V,W),Ye(),r||d?$():p&&(l=window.setTimeout($,1e3/(B?12:30))),e.dataset.renderFrames=String(z.info.render.frame),e.dataset.renderState=s||l?`active`:`idle`}function Le(){for(let e of P)r.release(e);P.clear(),F=``,$()}let Re=e=>e instanceof HTMLElement&&!!e.closest(`input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]`);function ze(e){if(!(Re(e.target)||document.querySelector(`dialog[open]`)||e.metaKey||e.ctrlKey||e.altKey||e.code===`Tab`||e.code===`Escape`)&&!(e.target instanceof HTMLElement&&e.target.closest(`button,a,summary`)&&!/^(Key[A-Z]|Digit[0-9])$/.test(e.code))){if(i.environment!==`typing`&&e.target===z.domElement&&[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`+`,`-`,`=`].includes(e.key)){e.preventDefault(),b=null;let t=W.position.clone().sub(G.target),n=new S().setFromVector3(t);e.key===`ArrowLeft`&&(n.theta-=.12),e.key===`ArrowRight`&&(n.theta+=.12),e.key===`ArrowUp`&&(n.phi-=.08),e.key===`ArrowDown`&&(n.phi+=.08),(e.key===`+`||e.key===`=`)&&(n.radius*=.9),e.key===`-`&&(n.radius*=1.1),n.radius=te.clamp(n.radius,G.minDistance,G.maxDistance),n.phi=te.clamp(n.phi,.01,G.maxPolarAngle),W.position.copy(G.target).add(new h().setFromSpherical(n)),$();return}!e.repeat&&k.has(e.code)&&(e.preventDefault(),P.add(e.code),r.press(e.code),$())}}function Be(e){P.delete(e.code)&&(r.release(e.code),$())}function Ve(e){e instanceof CustomEvent&&(e.detail?.reset?P.clear():typeof e.detail?.code==`string`&&(e.detail.down?P.add(e.detail.code):P.delete(e.detail.code)),$())}let He=new d,Ue=new j;function We(e){if(!e.isPrimary||e.button!==0)return;z.domElement.focus({preventScroll:!0});let t=z.domElement.getBoundingClientRect();if(Ue.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),He.setFromCamera(Ue,W),!_)return;let n=He.intersectObject(_,!0)[0]?.object??null;for(;n&&!n.name.startsWith(`key_`);)n=n.parent;n&&(F=n.name.slice(4),P.add(F),r.press(F),$())}function Ge(){F&&P.delete(F)&&r.release(F),F=``,$()}function Ke(){let e=W.clone();e.position.copy(b??W.position),e.lookAt(0,x,w),e.updateMatrixWorld();let t=0,n=[...[-10.3,10.3].flatMap(e=>[3,15.2*q.monitor.scale.y].map(t=>new h(e,t,-10.5))),...[-8.5,8.5].flatMap(e=>[-3.5,3.5].map(t=>new h(e,0,t))),...Ae()];for(let r of n){let n=r.applyMatrix4(e.matrixWorldInverse);t=Math.max(t,Math.abs(n.y/n.z),Math.abs(n.x/n.z)/W.aspect)}W.fov=te.radToDeg(2*Math.atan(t*1.055)),W.updateProjectionMatrix()}function Ye(){let t=e.querySelector(`.monitor-display`);if(!t||i.environment!==`typing`)return;let n=(t,n)=>{let r=q.screen.localToWorld(new h(t,n,0)).project(W);return{x:(r.x+1)*e.clientWidth/2,y:(1-r.y)*e.clientHeight/2}},r=[n(-9.56,5.41),n(9.56,5.41),n(9.56,-5.41),n(-9.56,-5.41)],a=Math.max(320,Math.round(Math.hypot(r[1].x-r[0].x,r[1].y-r[0].y))),o=a*10.82*q.monitor.scale.y/19.12,s=Ze(r,a,o);if(!s)return;t.style.width=`${a}px`,t.style.height=`${o}px`,t.style.transform=s,e.dataset.monitor=`projected`;let c=new h(0,1,4).project(W);e.dataset.keyboardY=String((1-c.y)*e.clientHeight/2)}function Qe(){let t=Math.max(e.clientWidth,1),n=Math.max(e.clientHeight,1),r=t/n;z.setSize(t,n),Y?.setSize(Math.max(1,Math.round(t*z.getPixelRatio())),Math.max(1,Math.round(n*z.getPixelRatio()))),X=!0,J?.composer.setSize(t,n),J?.occlusion.setSize(Math.round(t*.75),Math.round(n*.75)),W.aspect=r,W.fov=te.radToDeg(2*Math.atan(Math.tan(te.degToRad(34)/2)*Math.max(1,1.5/r))),i.environment===`typing`?(q.monitor.scale.y=t<700?1.65:1,x=t<700?10:5,b=new h(0,t<700?25:17,t<700?52:38),Ke(),W.position.copy(b),G.target.set(0,x,w),G.update(),b=null):(W.updateProjectionMatrix(),(y?.counts.external||y?.counts.planned)&&(b??=W.position.clone(),je())),$()}function at(){document.hidden?(Le(),cancelAnimationFrame(s),window.clearTimeout(l),l=0,s=0,e.dataset.renderState=`paused`):(f=performance.now(),$())}function ot(){I=re.matches,G.enableDamping=!I&&!B&&i.environment!==`typing`,$()}function st(){b=null,$()}function ct(e){e.preventDefault(),o=!0,cancelAnimationFrame(s),window.clearTimeout(l),l=0,s=0,r.status({kind:`error`,message:`The 3D preview paused after a graphics reset. Try loading it again.`})}let lt=new ResizeObserver(Qe);lt.observe(e);let ut=new IntersectionObserver(([t])=>{u=t.isIntersecting,u?(f=performance.now(),$()):(cancelAnimationFrame(s),window.clearTimeout(l),l=0,s=0,e.dataset.renderState=`paused`)});return ut.observe(e),G.addEventListener(`change`,$),G.addEventListener(`start`,st),window.addEventListener(`keydown`,ze),window.addEventListener(`keyup`,Be),window.addEventListener(`blur`,Le),window.addEventListener(`pointerup`,Ge),window.addEventListener(`pointercancel`,Ge),window.addEventListener(`keyconf-demo`,Ve),document.addEventListener(`visibilitychange`,at),re.addEventListener(`change`,ot),z.domElement.addEventListener(`pointerdown`,We),z.domElement.addEventListener(`webglcontextlost`,ct),Qe(),ke(),Oe(!0),Ne(t.device),{update(e,t){r=t;let n=rt(e.device)!==rt(i.device),a=e.view!==i.view||n||e.environment!==i.environment,o=e.exploded!==i.exploded,s=JSON.stringify(e.accessories)!==JSON.stringify(i.accessories)||JSON.stringify(e.customAccessories)!==JSON.stringify(i.customAccessories),c=JSON.stringify(i)!==JSON.stringify(e);if(i=e,n?Ne(e.device):s&&Me(),a)ke();else if(o){let t=W.position.clone().sub(G.target);e.exploded&&(E=t.length()),x=e.exploded?1.35:.4,t.setLength(e.exploded?Math.max(14,t.length()):E),b=t.add(new h(0,x,0))}c&&Oe()},dispose(){a=!0,g++,cancelAnimationFrame(s),window.clearTimeout(l),l=0,lt.disconnect(),ut.disconnect(),G.dispose(),window.removeEventListener(`keydown`,ze),window.removeEventListener(`keyup`,Be),window.removeEventListener(`blur`,Le),window.removeEventListener(`pointerup`,Ge),window.removeEventListener(`pointercancel`,Ge),window.removeEventListener(`keyconf-demo`,Ve),document.removeEventListener(`visibilitychange`,at),re.removeEventListener(`change`,ot),z.domElement.removeEventListener(`pointerdown`,We),z.domElement.removeEventListener(`webglcontextlost`,ct),y?.dispose(),O.forEach(tt),q.dispose(),J?.occlusion.dispose(),J?.output.dispose(),J?.composer.dispose(),Y?.dispose(),be.geometry.dispose(),be.material.dispose(),Q.dispose(),he.dispose(),me.dispose(),z.dispose(),z.domElement.remove()}}}export{at as createKeyboardScene,rt as modelIdFor,it as sourceGlb};