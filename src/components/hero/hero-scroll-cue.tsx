import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function HeroScrollCue() {
	const [fallbackHidden, setFallbackHidden] = useState(false);

	useEffect(() => {
		if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) {
			return;
		}

		const onScroll = () => {
			setFallbackHidden(window.scrollY > 80);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className={cn(
				"hero-scroll-cue relative z-10 flex shrink-0 flex-col items-center pt-6 pb-2 transition-[transform,opacity] duration-200 ease-out",
				fallbackHidden && "pointer-events-none translate-y-3 opacity-0",
			)}
		>
			<a
				href="#preview"
				aria-label="Scroll to interactive app preview"
				title="Scroll down to interactive app preview"
				className="group flex flex-col items-center gap-2 rounded-full p-2 text-muted-foreground transition-colors duration-200 select-none hover:text-foreground"
			>
				<span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase transition-colors duration-150 group-hover:text-foreground">
					Preview the App
				</span>
				<div className="flex h-7 w-4.5 items-start justify-center rounded-full border border-white/20 p-1 transition-colors duration-150 group-hover:border-white/40">
					<span className="size-1.5 animate-bounce rounded-full bg-foreground/65 motion-reduce:animate-none" />
				</div>
			</a>
		</div>
	);
}
