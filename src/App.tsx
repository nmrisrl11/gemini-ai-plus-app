import { DownloadSection } from "@/components/landing/download-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FloatingNavbar } from "@/components/landing/floating-navbar";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { InstallSection } from "@/components/landing/install-section";
import { NotFoundPage } from "@/components/landing/not-found-page";
import { PreviewSection } from "@/components/landing/preview-section";
import { SupportSection } from "@/components/landing/support-section";
import { WorkflowSection } from "@/components/landing/workflow-section";
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
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
			>
				Skip to main content
			</a>

			<FloatingNavbar />

			<main id="main-content" tabIndex={-1} className="outline-none">
				<HeroSection />
				<PreviewSection />
				<WorkflowSection />
				<FeaturesSection />
				<InstallSection />
				<FaqSection />
				<SupportSection />
				<DownloadSection />
			</main>

			<Footer />
		</div>
	);
}

export default App;
