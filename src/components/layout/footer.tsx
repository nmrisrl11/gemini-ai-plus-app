import { APP_INFO } from "@/constants/app-info";
import { ArrowUp } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
	const scrollToTop = () => {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
	};

	return (
		<footer className="relative z-10 -mt-px bg-background pt-16 pb-16 text-xs text-muted-foreground sm:pt-24 sm:pb-24">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
					{/* Brand Column */}
					<div className="flex max-w-md flex-col gap-3.5">
						<div className="flex items-center gap-2.5">
							<img
								src="/icons/64.webp"
								alt="Google AI Plus Portal icon"
								title="Google AI Plus Portal"
								width={32}
								height={32}
								loading="lazy"
								className="size-8 shrink-0 object-contain"
							/>
							<span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
								{APP_INFO.name}
							</span>
						</div>

						<p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
							{APP_INFO.description}
						</p>
					</div>

					{/* Typography-Driven Columns */}
					<nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
						<div className="flex flex-col gap-4">
							<span className="text-xs font-semibold text-foreground">Portal</span>
							<div className="flex flex-col gap-2.5 text-xs">
								<a
									href="#preview"
									title="Jump to Interactive Preview"
									className="transition-colors duration-150 hover:text-foreground"
								>
									Preview
								</a>
								<a
									href="#how-it-works"
									title="Jump to How it works"
									className="transition-colors duration-150 hover:text-foreground"
								>
									How it works
								</a>
								<a
									href="#features"
									title="Jump to Features"
									className="transition-colors duration-150 hover:text-foreground"
								>
									Features
								</a>
								<a
									href="#faq"
									title="Jump to Frequently Asked Questions"
									className="transition-colors duration-150 hover:text-foreground"
								>
									FAQ
								</a>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<span className="text-xs font-semibold text-foreground">Resources</span>
							<div className="flex flex-col gap-2.5 text-xs">
								<a
									href={APP_INFO.latestReleaseUrl}
									target="_blank"
									rel="noreferrer noopener"
									title="Download Google AI Plus Portal for Windows"
									className="transition-colors duration-150 hover:text-foreground"
								>
									Download for Windows
								</a>
								<a
									href={APP_INFO.githubUrl}
									target="_blank"
									rel="noreferrer noopener"
									title="View Google AI Plus Portal on GitHub"
									className="transition-colors duration-150 hover:text-foreground"
								>
									GitHub Repository
								</a>
								<a
									href={APP_INFO.githubReleasesUrl}
									target="_blank"
									rel="noreferrer noopener"
									title="Browse all releases on GitHub"
									className="transition-colors duration-150 hover:text-foreground"
								>
									All Releases
								</a>
								<a
									href={APP_INFO.licenseUrl}
									target="_blank"
									rel="noreferrer noopener"
									title="Read the MIT License"
									className="transition-colors duration-150 hover:text-foreground"
								>
									MIT License
								</a>
							</div>
						</div>
					</nav>
				</div>

				{/* Hairline Legal & Back-to-top Bar */}
				<div className="mt-14 border-t border-border/40 pt-8 sm:mt-16">
					<div className="flex flex-col items-start justify-between gap-4 text-[11px] leading-relaxed text-muted-foreground/80 sm:flex-row sm:items-center">
						<div className="flex flex-col gap-1">
							<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
								<span>
									© {CURRENT_YEAR} {APP_INFO.name}.
								</span>
								<span aria-hidden="true">·</span>
								<span>
									Independent open-source utility. Not affiliated with Google LLC, Alphabet Inc., or
									Internshala.
								</span>
							</div>
							<span className="text-[10px] text-muted-foreground/85">
								Google, Google One, Google AI Plus, and Gemini are trademarks of Google LLC.
							</span>
						</div>

						<button
							type="button"
							onClick={scrollToTop}
							className="tactile-press inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-muted-foreground hover:text-foreground"
						>
							<span>Back to top</span>
							<ArrowUp className="size-3" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
