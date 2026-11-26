import { GithubIcon } from "@/components/icons";
import { APP_INFO } from "@/constants/app-info";
import { NAV_ITEMS } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

const MOBILE_LABELS = [{ id: "", label: "Sections" }, ...NAV_ITEMS] as const;

interface FloatingNavbarProps {
	isPaused?: boolean;
	isRevealed?: boolean;
}

export function FloatingNavbar({ isPaused = false, isRevealed = false }: FloatingNavbarProps) {
	const showPausedIndicator = isPaused && isRevealed;
	const [isVisible, setIsVisible] = useState(false);
	const [activeId, setActiveId] = useState("");
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const hero = document.getElementById("hero");
			const shouldShow = hero
				? hero.getBoundingClientRect().bottom <= window.innerHeight * 0.45
				: window.scrollY > 380;

			setIsVisible(shouldShow);

			if (!shouldShow) {
				setActiveId("");
				return;
			}

			const focalLine = window.innerHeight * 0.34;
			let matched = "";
			for (const item of NAV_ITEMS) {
				const el = document.getElementById(item.id);
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				if (rect.top <= focalLine && rect.bottom > focalLine) {
					matched = item.id;
					break;
				}
			}
			setActiveId(matched);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!mobileOpen) return;
		const closeOnScroll = () => setMobileOpen(false);
		const closeOnEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMobileOpen(false);
		};
		window.addEventListener("scroll", closeOnScroll, { passive: true, once: true });
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			window.removeEventListener("scroll", closeOnScroll);
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [mobileOpen]);

	const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
		e.preventDefault();
		const target = document.getElementById(id);
		if (!target) return;
		setActiveId(id);
		setMobileOpen(false);
		target.scrollIntoView({ behavior: "smooth" });
		window.history.replaceState(null, "", `#${id}`);
	};

	return (
		<>
			{mobileOpen ? (
				<div
					className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs sm:hidden"
					onClick={() => setMobileOpen(false)}
					aria-hidden="true"
				/>
			) : null}

			<header
				aria-label="Floating navigation"
				className={cn(
					"fixed inset-x-0 top-3.5 z-50 flex flex-col items-center px-3 transition-[transform,opacity] duration-250 ease-out sm:top-5",
					isVisible
						? "pointer-events-auto translate-y-0 scale-100 opacity-100"
						: "pointer-events-none -translate-y-4 scale-[0.96] opacity-0",
				)}
			>
				<div className="flex max-w-[96vw] items-center gap-1 rounded-full border border-white/12 bg-background/90 p-1 pl-2 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:gap-1.5 sm:p-1.5 sm:pl-2.5">
					{/* Mobile section selector (zero-shift grid stacker) */}
					<button
						type="button"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-expanded={mobileOpen}
						aria-controls="mobile-nav-menu"
						aria-label="Toggle section menu"
						className={cn(
							"tactile-press flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium sm:hidden",
							mobileOpen
								? "bg-accent text-foreground"
								: "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
						)}
					>
						<span className="grid grid-cols-1 grid-rows-1 items-center justify-items-start overflow-hidden text-left">
							{MOBILE_LABELS.map((item) => {
								const isCurrent = (activeId || "") === item.id;
								return (
									<span
										key={item.id || "default"}
										aria-hidden={!isCurrent}
										className={cn(
											"col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-200 ease-out",
											isCurrent
												? "translate-y-0 opacity-100"
												: "pointer-events-none -translate-y-1.5 opacity-0",
										)}
									>
										{item.label}
									</span>
								);
							})}
						</span>
						<ChevronDown
							aria-hidden="true"
							className={cn(
								"size-3 shrink-0 transition-transform duration-200 ease-out",
								mobileOpen ? "rotate-180 text-foreground" : "text-muted-foreground",
							)}
						/>
					</button>

					{/* Desktop Nav Links */}
					<nav aria-label="Main" className="hidden items-center gap-0.5 sm:flex">
						{NAV_ITEMS.map((item) => {
							const isActive = activeId === item.id;
							return (
								<a
									key={item.id}
									href={`#${item.id}`}
									title={`Jump to ${item.label}`}
									onClick={(e) => handleNavClick(e, item.id)}
									aria-current={isActive ? "location" : undefined}
									className={cn(
										"tactile-press rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap",
										isActive
											? "bg-primary/14 text-primary"
											: "text-muted-foreground hover:bg-white/6 hover:text-foreground",
									)}
								>
									{item.label}
								</a>
							);
						})}
					</nav>

					<span className="mx-0.5 h-3.5 w-px bg-border/70" aria-hidden="true" />

					{/* GitHub */}
					<a
						href={APP_INFO.githubUrl}
						target="_blank"
						rel="noreferrer noopener"
						aria-label="View repository on GitHub"
						title="GitHub repository"
						className="tactile-press flex size-7.5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-white/8 hover:text-foreground"
					>
						<GithubIcon className="size-3.5" />
					</a>

					{/* Primary Download Pill */}
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						title={
							showPausedIndicator
								? "Promotion temporarily paused — download Google AI Plus Portal for Windows"
								: "Download Google AI Plus Portal for Windows"
						}
						className="tactile-pill inline-flex h-7.5 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/60 bg-linear-to-b from-white via-[#fafafa] to-[#e7ecf2] px-3.5 text-[11px] font-semibold text-slate-950 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,1)] hover:opacity-95 sm:h-8 sm:px-4 sm:text-xs"
					>
						{showPausedIndicator ? (
							<span className="size-1.5 rounded-full bg-rose-500" aria-hidden="true" />
						) : null}
						<span>Download</span>
					</a>
				</div>

				{/* Origin-aware Mobile Dropdown (concentric 12px outer -> 4px pad -> 8px item) */}
				{mobileOpen ? (
					<div
						id="mobile-nav-menu"
						className="mobile-nav-popover mt-1.5 w-48 overflow-hidden rounded-[12px] border border-white/10 bg-[#0e1117]/95 p-1 shadow-[0_14px_32px_-8px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:hidden"
					>
						<nav aria-label="Mobile sections" className="flex flex-col gap-0.5">
							{NAV_ITEMS.map((item) => {
								const isActive = activeId === item.id;
								return (
									<a
										key={item.id}
										href={`#${item.id}`}
										title={`Jump to ${item.label}`}
										onClick={(e) => handleNavClick(e, item.id)}
										aria-current={isActive ? "location" : undefined}
										className={cn(
											"tactile-press flex items-center justify-between rounded-[8px] px-2.5 py-1.5 text-xs font-medium",
											isActive
												? "bg-white/8 text-foreground"
												: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
										)}
									>
										<span>{item.label}</span>
										{isActive ? <span className="size-1.5 rounded-full bg-primary" /> : null}
									</a>
								);
							})}
						</nav>
					</div>
				) : null}
			</header>
		</>
	);
}
