import { Button } from "@/components/ui/button";

export function App() {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-foreground">
			<div className="flex max-w-md flex-col items-center gap-4 text-center">
				<h1 className="text-3xl font-semibold tracking-tight">Gemini AI Plus</h1>
				<p className="text-sm text-muted-foreground">
					Starter workspace configured with React, Vite, TypeScript, Tailwind CSS, shadcn/ui,
					oxlint, and oxfmt.
				</p>
				<Button type="button">Get Started</Button>
			</div>
		</main>
	);
}

export default App;
