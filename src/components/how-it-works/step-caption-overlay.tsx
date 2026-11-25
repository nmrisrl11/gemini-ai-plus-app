import type { HowItWorksStep } from "@/constants/landing-data";
import { memo } from "react";

interface StepCaptionOverlayProps {
	step: HowItWorksStep;
}

export const StepCaptionOverlay = memo(function StepCaptionOverlay({
	step,
}: StepCaptionOverlayProps) {
	return (
		<div className="pointer-events-none absolute inset-x-4 bottom-8 z-20 sm:inset-x-6 sm:bottom-12">
			<div className="mx-auto max-w-6xl">
				<div
					key={step.id}
					aria-live="polite"
					className="mobile-nav-popover pointer-events-auto flex max-w-md flex-col gap-2 rounded-[10px] border border-white/10 bg-[#090c12]/80 p-4 backdrop-blur-xl sm:p-5"
				>
					<span className="font-mono text-[11px] font-semibold tracking-wider text-primary uppercase">
						{step.kicker}
					</span>
					<h3 className="text-xl font-bold tracking-[-0.03em] text-foreground sm:text-2xl">
						{step.title}
					</h3>
					<p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
						{step.description}
					</p>
				</div>
			</div>
		</div>
	);
});
