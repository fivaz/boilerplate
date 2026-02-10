import { Logo } from "@/components/logo";

export default async function HomePage() {
	return (
		<>
			<header className="bg-card border-border sticky top-0 z-20 border-b">
				<div className="space-y-4 px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-200">
								<Logo className="size-6" />
							</div>
							<div>
								<h1 className="text-foreground text-lg font-bold">Boilerplate</h1>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="flex flex-1 flex-col overflow-auto">
				<div className="p-4"></div>
			</main>
		</>
	);
}
