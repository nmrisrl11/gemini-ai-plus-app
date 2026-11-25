import { StepCaptionOverlay } from "@/components/how-it-works/step-caption-overlay";
import { StepProgressRail } from "@/components/how-it-works/step-progress-rail";
import { HOW_IT_WORKS_STEPS } from "@/constants/landing-data";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";

const RailSceneCanvas = lazy(() => import("@/components/how-it-works/rail-scene-canvas"));

const STEP_COUNT = HOW_IT_WORKS_STEPS.length;

function getInitialReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HowItWorksSection() {
	const trackRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef(0);

	const [activeStep, setActiveStep] = useState(0);
	const [shouldMount3D, setShouldMount3D] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);

	// Listen for OS reduced-motion preference changes
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	// Lazy-mount the Three.js chunk only as the user approaches this section
	useEffect(() => {
		const el = trackRef.current;
		if (!el || shouldMount3D) return undefined;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setShouldMount3D(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "320px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [shouldMount3D]);

	// Native page-scroll progress driver (updates ref directly, only re-renders on step change)
	useEffect(() => {
		if (reducedMotion) return undefined;

		const updateFromScroll = () => {
			const track = trackRef.current;
			if (!track) return;
			const rect = track.getBoundingClientRect();
			const scrollable = track.offsetHeight - window.innerHeight;
			if (scrollable <= 0) return;

			const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
			progressRef.current = raw;

			const nextIdx = Math.min(STEP_COUNT - 1, Math.max(0, Math.round(raw * (STEP_COUNT - 1))));
			setActiveStep((prev) => (prev === nextIdx ? prev : nextIdx));
		};

		window.addEventListener("scroll", updateFromScroll, { passive: true });
		window.addEventListener("resize", updateFromScroll, { passive: true });
		updateFromScroll();

		return () => {
			window.removeEventListener("scroll", updateFromScroll);
			window.removeEventListener("resize", updateFromScroll);
		};
	}, [reducedMotion]);

	const handleSelectStep = useCallback(
		(index: number) => {
			const clamped = Math.min(STEP_COUNT - 1, Math.max(0, index));
			const targetProgress = STEP_COUNT > 1 ? clamped / (STEP_COUNT - 1) : 0;

			if (reducedMotion) {
				progressRef.current = targetProgress;
				setActiveStep(clamped);
				return;
			}

			const track = trackRef.current;
			if (!track) return;
			const scrollable = track.offsetHeight - window.innerHeight;
			const trackTop = track.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: trackTop + targetProgress * Math.max(0, scrollable),
				behavior: "smooth",
			});
		},
		[reducedMotion],
	);

	const currentStep = HOW_IT_WORKS_STEPS[activeStep];

	return (
		<section
			id="how-it-works"
			aria-labelledby="how-it-works-heading"
			className="relative min-h-dvh scroll-mt-4 pt-20 pb-8 sm:scroll-mt-6 sm:pt-24 sm:pb-12"
		>
			{/* Section Header */}
			<div className="mx-auto max-w-xl px-4 text-center sm:px-6">
				<h2
					id="how-it-works-heading"
					className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
				>
					How it works.
				</h2>
				<p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
					Follow the four-step local pipeline from profile setup to your official Google One offer
					link.
				</p>
			</div>

			{/* Full-bleed continuous native-scroll 3D rail track */}
			<div
				ref={trackRef}
				className={
					reducedMotion
						? "relative mt-6 h-[min(78dvh,640px)] w-full"
						: "relative mt-6 h-[270vh] w-full sm:h-[300vh]"
				}
			>
				<div className="sticky top-0 h-dvh w-full overflow-hidden bg-background">
					{/* Seamless atmospheric glow + top/bottom edge blends into the page */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.1)_0%,rgba(9,12,18,0)_66%)]"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-background to-transparent"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-background to-transparent"
					/>

					{/* Lazy-loaded Three.js Camera-on-a-Rail Scene */}
					{shouldMount3D ? (
						<Suspense fallback={null}>
							<RailSceneCanvas progressRef={progressRef} reducedMotion={reducedMotion} />
						</Suspense>
					) : null}

					{/* Step jump buttons shown only for reduced-motion fallback */}
					{reducedMotion ? (
						<StepProgressRail
							steps={HOW_IT_WORKS_STEPS}
							activeIndex={activeStep}
							onSelectStep={handleSelectStep}
						/>
					) : null}

					{/* Active Step Editorial Caption */}
					<StepCaptionOverlay step={currentStep} />
				</div>
			</div>
		</section>
	);
}
