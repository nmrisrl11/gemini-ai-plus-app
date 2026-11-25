import { DownloadSection } from "@/components/download/download-section";
import { FaqSection } from "@/components/faq/faq-section";
import { FeaturesSection } from "@/components/features/features-section";
import { HeroSection } from "@/components/hero/hero-section";
import { HowItWorksSection } from "@/components/how-it-works/how-it-works-section";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { Footer } from "@/components/layout/footer";
import { NotFoundPage } from "@/components/layout/not-found-page";
import { PreviewSection } from "@/components/preview/preview-section";
import { useEffect, useState } from "react";

function isNonExistentPath(): boolean {
	const rawPath = window.location.pathname.replace(/\/+$/, "") || "/";
	return rawPath !== "/" && rawPath !== "/index.html";
}

export function App() {
	const [isNotFound, setIsNotFound] = useState(isNonExistentPath);

	useEffect(() => {
		const handleLocationChange = () => {
			setIsNotFound(isNonExistentPath());
		};
		window.addEventListener("popstate", handleLocationChange);
		return () => window.removeEventListener("popstate", handleLocationChange);
	}, []);

	const handleNavigateHome = () => {
		window.history.pushState(null, "", "/");
		setIsNotFound(false);
	};

	if (isNotFound) {
		return <NotFoundPage onNavigateHome={handleNavigateHome} />;
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* WCAG 2.4.1 Bypass Blocks */}
			<a
				href="#main-content"
				title="Skip to main content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
			>
				Skip to main content
			</a>

			<FloatingNavbar />

			<main id="main-content" tabIndex={-1} className="outline-none">
				<HeroSection />
				<PreviewSection />
				<HowItWorksSection />
				<FeaturesSection />
				<FaqSection />
				<DownloadSection />
			</main>

			<Footer />
		</div>
	);
}

export default App;
