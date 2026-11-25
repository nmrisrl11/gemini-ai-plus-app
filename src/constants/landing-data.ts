export interface NavItem {
	id: string;
	label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "preview", label: "Preview" },
	{ id: "how-it-works", label: "How it works" },
	{ id: "features", label: "Features" },
	{ id: "faq", label: "FAQ" },
] as const;

export type PlanBenefitIcon = "sparkles" | "storage" | "flow" | "workspace";

export interface PlanBenefit {
	title: string;
	detail: string;
	spec: string;
	icon: PlanBenefitIcon;
}

export const PLAN_BENEFITS: readonly PlanBenefit[] = [
	{
		title: "Gemini app",
		detail: "Double usage limits plus Hydrogen model access",
		spec: "2x limits",
		icon: "sparkles",
	},
	{
		title: "400 GB cloud storage",
		detail: "Shared across Google Photos, Drive, and Gmail",
		spec: "400 GB",
		icon: "storage",
	},
	{
		title: "Google Flow & Music",
		detail: "Expanded AI creative and music studio access",
		spec: "Flow + Music",
		icon: "flow",
	},
	{
		title: "Search, Gmail & Notebook",
		detail: "Nano Banana in Search, Gmail AI, and Audio Overviews",
		spec: "Workspace AI",
		icon: "workspace",
	},
] as const;

export interface DemoProfile {
	firstName: string;
	lastName: string;
	phone: string;
	sampleEmail: string;
	keyLength: number;
}

export const DEMO_PROFILES: readonly DemoProfile[] = [
	{
		firstName: "Ananya",
		lastName: "Sharma",
		phone: "+91 8444200182",
		sampleEmail: "ananya.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Rohan",
		lastName: "Deshmukh",
		phone: "+91 9821047391",
		sampleEmail: "rohan.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Priya",
		lastName: "Nair",
		phone: "+91 7982154036",
		sampleEmail: "priya.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Arjun",
		lastName: "Kulkarni",
		phone: "+91 9145823704",
		sampleEmail: "arjun.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Meera",
		lastName: "Iyer",
		phone: "+91 8826401953",
		sampleEmail: "meera.demo@example.com",
		keyLength: 12,
	},
] as const;

export const BROWSER_OPTIONS = ["Auto-Detect", "Google Chrome", "Microsoft Edge", "Brave"] as const;

export type BrowserOption = (typeof BROWSER_OPTIONS)[number];

export interface HowItWorksStep {
	id: string;
	step: string;
	kicker: string;
	title: string;
	description: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
	{
		id: "profile",
		step: "01",
		kicker: "01 · Setup",
		title: "Fill in your details once.",
		description: "Generate ready-to-use profile details in one click, or type your own.",
	},
	{
		id: "browser",
		step: "02",
		kicker: "02 · Browser",
		title: "Uses your own browser.",
		description: "Opens directly in Chrome, Edge, or Brave—nothing extra to download.",
	},
	{
		id: "confirm",
		step: "03",
		kicker: "03 · Verify",
		title: "Pauses when you're needed.",
		description: "Enter your inbox code or finish a security check before it continues.",
	},
	{
		id: "redeem",
		step: "04",
		kicker: "04 · Ready",
		title: "Your link, saved for you.",
		description: "Captures your official Google One offer link and keeps a local copy.",
	},
] as const;

export type FeatureSpotlightId = "browser" | "privacy" | "portable" | "recovery";

export interface FeatureSpotlight {
	id: FeatureSpotlightId;
	title: string;
	description: string;
}

export const FEATURE_SPOTLIGHTS: readonly FeatureSpotlight[] = [
	{
		id: "browser",
		title: "Works with your browser",
		description:
			"Uses Chrome, Edge, or Brave already on your PC, so you skip giant extra downloads.",
	},
	{
		id: "privacy",
		title: "Private by default",
		description:
			"Everything stays on your computer—no sign-ups, no tracking, and nothing sent to any server.",
	},
	{
		id: "portable",
		title: "Just download and open",
		description:
			"One lightweight Windows app you can double-click right away, publicly verified and open source.",
	},
	{
		id: "recovery",
		title: "Pauses safely when needed",
		description:
			"If a security check pops up, it waits for you and lets you pick up right where you left off.",
	},
] as const;

export const SUPPORTED_BROWSERS = ["Chrome", "Edge", "Brave", "Opera", "Vivaldi"] as const;

export type FaqCategory = "all" | "privacy" | "setup" | "billing";

export const FAQ_CATEGORIES: readonly { id: FaqCategory; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "privacy", label: "Privacy" },
	{ id: "setup", label: "Setup" },
	{ id: "billing", label: "Billing" },
] as const;

export interface FaqItem {
	id: string;
	category: Exclude<FaqCategory, "all">;
	q: string;
	a: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
	{
		id: "local-privacy",
		category: "privacy",
		q: "Does the app send my details to any server?",
		a: "Never. Everything runs directly on your Windows PC with no accounts, tracking, or remote servers. Your details and offer links stay in a local folder right next to the app.",
	},
	{
		id: "no-extra-installs",
		category: "setup",
		q: "Do I need to install anything else first?",
		a: "No. Just download the single Windows file and double-click to open. It works with Chrome, Edge, or Brave already on your computer, so there are no extra browsers or runtimes to install.",
	},
	{
		id: "payment-method",
		category: "billing",
		q: "Why does Google ask for a payment method?",
		a: "Google One requires a card or PayPal on file for all promotional offers to verify your account. You pay $0.00 today for the 12-month Google AI Plus period, and you can turn off auto-renewal right away in Google One settings while keeping the full year.",
	},
	{
		id: "security-check",
		category: "setup",
		q: "What if a security check or CAPTCHA pops up?",
		a: "The app pauses automatically and lets you complete the check yourself in the browser window before continuing, keeping your account safe from lockouts.",
	},
	{
		id: "interrupted-run",
		category: "setup",
		q: "What if something gets interrupted halfway?",
		a: "You don't have to start over. If your connection drops or a window closes mid-way, the built-in recovery helper can reconnect to your browser and finish grabbing your link.",
	},
	{
		id: "verified-download",
		category: "privacy",
		q: "How do I know the download is safe?",
		a: "Every release is open source and built automatically from public code on GitHub, complete with an independent VirusTotal scan and file checksum so you can verify it yourself.",
	},
] as const;
