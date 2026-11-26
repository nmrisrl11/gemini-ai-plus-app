import type { HowItWorksStep } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface StepCaptionOverlayProps {
	step: HowItWorksStep;
	stepIndex: number;
	totalSteps: number;
}

export const StepCaptionOverlay = memo(function StepCaptionOverlay({
	step,
	stepIndex,
	totalSteps,
}: StepCaptionOverlayProps) {
	return (
		<div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 sm:inset-x-6 sm:bottom-10">
			<div className="mx-auto max-w-6xl">
				<div
					key={step.id}
					aria-live="polite"
					className="caption-step-enter pointer-events-auto flex max-w-md flex-col gap-2.5 rounded-[12px] border border-white/10 bg-[#0c1017]/88 p-5 backdrop-blur-xl"
				>
					<div className="flex items-center justify-between gap-4">
						<span className="font-mono text-[11px] font-medium tracking-wide text-muted-foreground">
							{step.kicker}
						</span>
						<div className="flex items-center gap-1" aria-hidden="true">
							{Array.from({ length: totalSteps }, (_, i) => (
								<span
									key={i}
									className={cn(
										"h-0.5 w-4 rounded-full transition-colors duration-200 ease-out",
										i === stepIndex ? "bg-foreground/85" : "bg-white/12",
									)}
								/>
							))}
						</div>
					</div>
					<h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
						{step.title}
					</h3>
					<p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
				</div>
			</div>
		</div>
	);
});
