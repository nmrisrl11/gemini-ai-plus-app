import {
	createCanvas,
	createDotSpriteCanvas,
	createRadialGlowCanvas,
	drawStepCard,
} from "@/components/how-it-works/draw-step-card";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

export interface RailSceneCanvasProps {
	progressRef: RefObject<number>;
	reducedMotion: boolean;
}

const STEP_COUNT = 4;
const CARD_WIDTH = 1.65;
const CARD_HEIGHT = 1.155;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = clamp01((x - edge0) / (edge1 - edge0));
	return t * t * (3 - 2 * t);
};

export default function RailSceneCanvas({ progressRef, reducedMotion }: RailSceneCanvasProps) {
	const hostRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const host = hostRef.current;
		if (!host) return undefined;

		let alive = true;
		let visible = true;
		let rafId = 0;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.domElement.className = "block size-full";
		renderer.domElement.setAttribute("aria-hidden", "true");
		host.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x090c12, 5.5, 19);

		const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 80);

		const textures: THREE.Texture[] = [];
		const makeTexture = (canvas: HTMLCanvasElement) => {
			const t = new THREE.CanvasTexture(canvas);
			t.colorSpace = THREE.SRGBColorSpace;
			t.anisotropy = 4;
			textures.push(t);
			return t;
		};

		// 7-point centripetal CatmullRomCurve3 snaking gently along -z
		const curve = new THREE.CatmullRomCurve3(
			[
				new THREE.Vector3(-1.8, 0.05, 5.5),
				new THREE.Vector3(-0.7, 0.35, 1.0),
				new THREE.Vector3(1.1, 0.0, -4.0),
				new THREE.Vector3(1.5, -0.25, -9.5),
				new THREE.Vector3(-0.9, 0.25, -15.0),
				new THREE.Vector3(-1.4, -0.05, -20.5),
				new THREE.Vector3(0.8, 0.1, -25.5),
			],
			false,
			"centripetal",
		);

		// Dotted electric-sky route rail below the camera path
		const routePoints = curve.getSpacedPoints(160);
		const routePositions = new Float32Array(routePoints.length * 3);
		routePoints.forEach((pt, i) => {
			routePositions[i * 3] = pt.x;
			routePositions[i * 3 + 1] = pt.y - 0.32;
			routePositions[i * 3 + 2] = pt.z;
		});
		const routeGeo = new THREE.BufferGeometry();
		routeGeo.setAttribute("position", new THREE.BufferAttribute(routePositions, 3));
		const dotTex = makeTexture(createDotSpriteCanvas());
		const routeMat = new THREE.PointsMaterial({
			color: 0x38bdf8,
			size: 0.065,
			map: dotTex,
			alphaTest: 0.4,
			transparent: true,
			opacity: 0.56,
		});
		scene.add(new THREE.Points(routeGeo, routeMat));

		// Shared card & glow geometries
		const cardGeo = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT);
		const glowGeo = new THREE.PlaneGeometry(2.8, 2.15);
		const glowTex = makeTexture(createRadialGlowCanvas());

		const cardCanvases: {
			canvas: HTMLCanvasElement;
			texture: THREE.CanvasTexture;
			kind: number;
		}[] = [];

		const P = new THREE.Vector3();
		const T = new THREE.Vector3();
		const N = new THREE.Vector3();
		const UP = new THREE.Vector3(0, 1, 0);

		const cardStops = [0.13, 0.38, 0.63, 0.87];
		const cards = cardStops.map((u, idx) => {
			const side = idx % 2 === 0 ? 1 : -1;
			const canvas = createCanvas(640, 448);
			const ctx = canvas.getContext("2d");
			if (ctx) drawStepCard(ctx, idx, 640, 448);
			const texture = makeTexture(canvas);
			cardCanvases.push({ canvas, texture, kind: idx });

			const cardMat = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				toneMapped: false,
			});
			const mesh = new THREE.Mesh(cardGeo, cardMat);

			const glowMat = new THREE.MeshBasicMaterial({
				map: glowTex,
				transparent: true,
				depthWrite: false,
				opacity: 0.52,
			});
			const glowMesh = new THREE.Mesh(glowGeo, glowMat);
			glowMesh.position.set(0, -0.08, -0.05);
			mesh.add(glowMesh);

			scene.add(mesh);
			return { mesh, u, side, baseY: 0, idx };
		});

		// Repaint cards once Geist fonts finish loading
		if (document.fonts?.load) {
			Promise.allSettled([
				document.fonts.load('600 24px "Geist Variable"'),
				document.fonts.load('500 18px "Geist Mono Variable"'),
			]).then(() => {
				if (!alive) return;
				for (const item of cardCanvases) {
					const ctx = item.canvas.getContext("2d");
					if (ctx) {
						drawStepCard(ctx, item.kind, 640, 448);
						item.texture.needsUpdate = true;
					}
				}
			});
		}

		// Responsive card placement & scale so portrait mobile viewports never clip cards
		let compactMode = false;
		const layoutCards = (viewportWidth: number, viewportHeight: number) => {
			const aspect = viewportWidth / Math.max(1, viewportHeight);
			compactMode = viewportWidth < 640 || aspect < 0.85;
			const lateralOffset = compactMode ? 0.08 : 1.08;
			const yLift = compactMode ? 0.36 : 0.14;
			camera.fov = compactMode ? 62 : 44;

			for (const c of cards) {
				curve.getPointAt(c.u, P);
				curve.getTangentAt(c.u, T);
				N.crossVectors(T, UP).normalize();
				c.mesh.position.set(
					P.x + N.x * c.side * lateralOffset,
					P.y + yLift,
					P.z + N.z * c.side * lateralOffset,
				);
				c.baseY = c.mesh.position.y;
				c.mesh.lookAt(P.x - T.x * 2.6, c.baseY, P.z - T.z * 2.6);
			}
		};

		const handleResize = () => {
			const width = host.clientWidth || 1;
			const height = host.clientHeight || 1;
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			layoutCards(width, height);
			camera.updateProjectionMatrix();
		};

		handleResize();
		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(host);

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				visible = entries.some((entry) => entry.isIntersecting);
				if (visible && alive && !rafId) {
					lastTime = performance.now();
					rafId = requestAnimationFrame(tick);
				}
			},
			{ rootMargin: "120px" },
		);
		intersectionObserver.observe(host);

		const lookTarget = new THREE.Vector3();
		let smoothProgress = progressRef.current ?? 0;
		let lastTime = performance.now();

		const renderFrame = (progress: number, seconds: number) => {
			const uCam = 0.02 + progress * 0.74;
			curve.getPointAt(uCam, P);
			curve.getPointAt(Math.min(0.99, uCam + 0.07), lookTarget);
			camera.position.set(P.x, P.y + 0.14, P.z);
			camera.lookAt(lookTarget.x, lookTarget.y + 0.08, lookTarget.z);

			const activeIdx = progress * (STEP_COUNT - 1);
			const baseScale = compactMode ? 0.78 : 1;
			for (const c of cards) {
				const focus = 1 - smoothstep(0.08, 0.72, Math.abs(activeIdx - c.idx));
				c.mesh.scale.setScalar(baseScale * (1 + 0.16 * focus));
				c.mesh.position.y = reducedMotion
					? c.baseY
					: c.baseY + Math.sin(seconds * 1.15 + c.idx) * 0.04;
			}

			renderer.render(scene, camera);
		};

		const tick = (now: number) => {
			rafId = 0;
			if (!alive || !visible || document.hidden) return;

			const dt = Math.min(0.1, Math.max(0, (now - lastTime) / 1000));
			lastTime = now;

			const target = clamp01(progressRef.current ?? 0);
			if (reducedMotion) {
				smoothProgress = target;
			} else {
				smoothProgress += (target - smoothProgress) * (1 - Math.exp(-dt * 6.5));
			}

			renderFrame(smoothProgress, now / 1000);
			rafId = requestAnimationFrame(tick);
		};

		const onVisibilityChange = () => {
			if (!document.hidden && visible && alive && !rafId) {
				lastTime = performance.now();
				rafId = requestAnimationFrame(tick);
			}
		};
		document.addEventListener("visibilitychange", onVisibilityChange);

		// Kick off first render immediately
		renderFrame(smoothProgress, 0);
		rafId = requestAnimationFrame(tick);

		return () => {
			alive = false;
			if (rafId) cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener("visibilitychange", onVisibilityChange);

			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
					obj.geometry?.dispose();
					const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
					for (const mat of mats) mat?.dispose();
				}
			});
			for (const t of textures) t.dispose();
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, [progressRef, reducedMotion]);

	return <div ref={hostRef} className="pointer-events-none absolute inset-0 size-full" />;
}
