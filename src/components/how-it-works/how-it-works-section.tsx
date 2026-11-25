import { HOW_IT_WORKS_CARDS } from "@/constants/landing-data";
import { ArrowUpRight, Layers } from "lucide-react";
import { useEffect, useRef } from "react";

export function HowItWorksSection() {
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReduced) return;

		const updateCardDepth = () => {
			const cards = cardRefs.current;
			for (let i = 0; i < cards.length; i++) {
				const current = cards[i];
				if (!current) continue;
				const next = cards[i + 1];
				if (!next) {
					current.style.transform = "scale(1)";
					current.style.opacity = "1";
					continue;
				}
				const currentRect = current.getBoundingClientRect();
				const nextRect = next.getBoundingClientRect();
				const cardHeight = currentRect.height || 320;
				const gap = nextRect.top - currentRect.top;
				const coverage = Math.min(Math.max(1 - gap / cardHeight, 0), 1);

				const scale = 1 - 0.045 * coverage;
				const opacity = 1 - 0.22 * coverage;
				current.style.transform = `scale(${scale.toFixed(4)})`;
				current.style.opacity = opacity.toFixed(3);
				current.style.transformOrigin = "50% 0%";
			}
		};

		const onScroll = () => {
			if (rafRef.current !== null) return;
			rafRef.current = window.requestAnimationFrame(() => {
				updateCardDepth();
				rafRef.current = null;
			});
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		updateCardDepth();

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (rafRef.current !== null) {
				window.cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
		};
	}, []);

	return (
		<section
			id="how-it-works"
			aria-labelledby="how-it-works-heading"
			className="relative scroll-mt-4 px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto max-w-4xl">
				{/* Section Header */}
				<div className="mx-auto max-w-2xl text-center">
					<h2
						id="how-it-works-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						How it works.
					</h2>
					<p className="mx-auto mt-3.5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						Manual student forms take ten minutes of fragile tab-switching. The portal handles
						everything locally and only pauses for your inbox code.
					</p>
				</div>

				{/* Sticky Stacking Pipeline Cards */}
				<div className="relative mt-14 sm:mt-20">
					{HOW_IT_WORKS_CARDS.map((card, idx) => (
						<div
							key={card.id}
							ref={(el) => {
								cardRefs.current[idx] = el;
							}}
							style={{
								top: `calc(88px + ${idx} * 14px)`,
								zIndex: idx + 1,
							}}
							className="surface-card sticky mb-10 rounded-3xl border border-white/10 bg-card/96 p-6 backdrop-blur-xl will-change-transform sm:mb-14 sm:p-8"
						>
							<div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-5">
								<div className="flex items-center gap-3">
									<span className="flex size-7 items-center justify-center rounded-full bg-primary/14 font-mono text-xs font-bold text-primary">
										{card.step}
									</span>
									<h3 className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
										{card.title}
									</h3>
								</div>

								<span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
									<Layers className="size-3 text-primary" aria-hidden="true" />
									<span>{card.phase}</span>
								</span>
							</div>

							<p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
								{card.description}
							</p>

							<div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/50 pt-5 sm:grid-cols-4">
								{card.meta.map((item) => (
									<div key={item.label} className="flex flex-col gap-1">
										<span className="text-[11px] font-medium text-muted-foreground">
											{item.label}
										</span>
										<span
											className={
												item.isAccent
													? "text-sm font-semibold text-primary"
													: "text-sm font-semibold text-foreground"
											}
										>
											{item.value}
										</span>
									</div>
								))}
							</div>

							{card.actionLink ? (
								<div className="mt-5 border-t border-border/50 pt-4">
									<a
										href={card.actionLink.url}
										target="_blank"
										rel="noreferrer noopener"
										className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors duration-150 hover:text-primary/80 hover:underline"
									>
										<span>{card.actionLink.label}</span>
										<ArrowUpRight className="size-3.5" aria-hidden="true" />
									</a>
								</div>
							) : null}
						</div>
					))}

					<div className="h-[24vh] w-full" aria-hidden="true" />
				</div>
			</div>
		</section>
	);
}
