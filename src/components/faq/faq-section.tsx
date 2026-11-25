import { APP_INFO } from "@/constants/app-info";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";

export function FaqSection() {
	const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");

	const visibleItems = useMemo(
		() =>
			activeCategory === "all"
				? FAQ_ITEMS
				: FAQ_ITEMS.filter((item) => item.category === activeCategory),
		[activeCategory],
	);

	return (
		<section
			id="faq"
			aria-labelledby="faq-heading"
			className="relative flex min-h-dvh scroll-mt-4 flex-col justify-center px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto w-full max-w-3xl">
				{/* Centered Editorial Header */}
				<div className="mx-auto max-w-xl text-center">
					<h2
						id="faq-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						Common questions.
					</h2>
					<p className="mx-auto mt-3.5 max-w-lg text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
						Quick answers on privacy, setup, and Google One billing—nothing hidden in fine print.
					</p>
				</div>

				{/* Monochrome Topic Filter Strip */}
				<div className="mt-8 flex justify-center sm:mt-10">
					<div
						role="group"
						aria-label="Filter questions by topic"
						className="inline-flex items-center gap-1 rounded-[10px] border border-white/10 bg-[#0e1117] p-1"
					>
						{FAQ_CATEGORIES.map((category) => {
							const isActive = category.id === activeCategory;
							return (
								<button
									key={category.id}
									type="button"
									aria-pressed={isActive}
									onClick={() => setActiveCategory(category.id)}
									className={cn(
										"tactile-press cursor-pointer rounded-[7px] px-3.5 py-1.5 text-xs font-medium",
										isActive
											? "bg-white/10 text-foreground"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{category.label}
								</button>
							);
						})}
					</div>
				</div>

				{/* Numbered Hairline Disclosure Surface */}
				<div className="mt-8 min-h-104 sm:mt-10">
					<div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0e1117]">
						<div className="divide-y divide-white/8">
							{visibleItems.map((item, idx) => (
								<details
									key={`${activeCategory}-${item.id}`}
									name="faq-accordion"
									className="faq-item group"
									open={idx === 0}
								>
									<summary className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left transition-colors duration-150 hover:bg-white/2 sm:px-6 sm:py-5.5">
										<span
											aria-hidden="true"
											className="mt-0.5 w-6 shrink-0 font-mono text-xs text-muted-foreground/55 tabular-nums transition-colors duration-150 group-open:text-muted-foreground"
										>
											{String(idx + 1).padStart(2, "0")}
										</span>
										<span className="flex-1 text-sm font-semibold tracking-tight text-foreground sm:text-base">
											{item.q}
										</span>
										<span
											data-faq-plus
											aria-hidden="true"
											className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-150 group-open:text-foreground group-hover:text-foreground"
										>
											<Plus className="size-4" />
										</span>
									</summary>
									<div className="pr-10 pb-5 pl-5 sm:pr-14 sm:pb-6 sm:pl-16">
										<p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
									</div>
								</details>
							))}
						</div>
					</div>
				</div>

				{/* Quiet Inline Help Footer */}
				<div className="mt-6 flex flex-col items-center justify-between gap-3 px-1 text-xs text-muted-foreground sm:flex-row sm:text-sm">
					<span>Still have a question?</span>
					<div className="flex items-center gap-5">
						<a
							href={APP_INFO.githubDiscussionsUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="hover-arrow-shift tactile-press inline-flex items-center gap-1 font-medium text-foreground/85 transition-colors duration-150 hover:text-foreground"
						>
							<span>Ask in Discussions</span>
							<ArrowUpRight
								data-arrow
								className="size-3.5 text-muted-foreground transition-transform duration-180 ease-out"
								aria-hidden="true"
							/>
						</a>
						<span aria-hidden="true" className="h-3 w-px bg-white/12" />
						<a
							href={APP_INFO.githubIssuesUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="hover-arrow-shift tactile-press inline-flex items-center gap-1 font-medium text-foreground/85 transition-colors duration-150 hover:text-foreground"
						>
							<span>Report an issue</span>
							<ArrowUpRight
								data-arrow
								className="size-3.5 text-muted-foreground transition-transform duration-180 ease-out"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
