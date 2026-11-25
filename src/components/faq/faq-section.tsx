import { APP_INFO } from "@/constants/app-info";
import { FAQ_ITEMS } from "@/constants/landing-data";
import { ArrowUpRight, HelpCircle, MessageSquare, Plus } from "lucide-react";

export function FaqSection() {
	return (
		<section
			id="faq"
			aria-labelledby="faq-heading"
			className="relative scroll-mt-4 px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto max-w-6xl">
				<div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Sticky Column */}
					<div className="lg:sticky lg:top-24 lg:col-span-4">
						<h2
							id="faq-heading"
							className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl"
						>
							Frequently asked questions.
						</h2>

						<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
							How local execution, browser discovery, Google One billing verification, and release
							checksums work.
						</p>

						<div className="mt-8 divide-y divide-border/60 border-y border-border/60">
							<a
								href={APP_INFO.githubDiscussionsUrl}
								target="_blank"
								rel="noreferrer noopener"
								className="group flex items-center justify-between py-3.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
							>
								<span className="flex items-center gap-2.5">
									<MessageSquare
										className="size-3.5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
										aria-hidden="true"
									/>
									<span>Community Discussions</span>
								</span>
								<ArrowUpRight
									className="size-3.5 transition-transform duration-180 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									aria-hidden="true"
								/>
							</a>

							<a
								href={APP_INFO.githubIssuesUrl}
								target="_blank"
								rel="noreferrer noopener"
								className="group flex items-center justify-between py-3.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
							>
								<span className="flex items-center gap-2.5">
									<HelpCircle
										className="size-3.5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
										aria-hidden="true"
									/>
									<span>Report an Issue</span>
								</span>
								<ArrowUpRight
									className="size-3.5 transition-transform duration-180 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									aria-hidden="true"
								/>
							</a>
						</div>
					</div>

					{/* Right Native Accessible Accordion (Non-exclusive <details> for easy comparison & find-in-page) */}
					<div className="divide-y divide-border/60 lg:col-span-8">
						{FAQ_ITEMS.map((item, idx) => (
							<details key={item.q} className="faq-item group" open={idx === 0}>
								<summary className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left text-base font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary sm:py-6 sm:text-lg">
									<span>{item.q}</span>
									<span
										data-faq-plus
										aria-hidden="true"
										className="mt-1 flex size-5.5 shrink-0 items-center justify-center rounded-md border border-border/75 text-muted-foreground group-open:border-primary/60 group-open:text-primary"
									>
										<Plus className="size-3.5" />
									</span>
								</summary>
								<p className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
									{item.a}
								</p>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
