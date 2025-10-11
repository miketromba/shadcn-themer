export default function TypographyShowcase() {
	return (
		<div className="w-full h-full overflow-auto">
			<div className="container max-w-4xl py-12 px-8 space-y-16">
				{/* Sans-serif Section */}
				<section className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold tracking-tight">
							Sans-serif Typography
						</h1>
						<p className="text-muted-foreground mt-3 text-lg">
							The primary typeface used throughout the interface
						</p>
					</div>

					<div className="space-y-6">
						<div>
							<h2 className="text-3xl font-semibold mb-3">
								Heading Level 2
							</h2>
							<p className="text-lg leading-relaxed">
								This is body text in your selected sans-serif
								font. It should be highly readable and work well
								at various sizes. The quick brown fox jumps over
								the lazy dog.
							</p>
						</div>

						<div>
							<h3 className="text-2xl font-semibold mb-3">
								Heading Level 3
							</h3>
							<p className="leading-relaxed">
								Regular paragraph text demonstrates how your
								font performs in longer reading contexts. Good
								typography makes content accessible and
								engaging.
							</p>
						</div>

						<div>
							<h4 className="text-xl font-semibold mb-2">
								Heading Level 4
							</h4>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Smaller text size is used for captions, labels,
								and secondary information throughout the
								interface.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="border rounded-lg p-5">
							<h5 className="font-medium mb-3">Card Title</h5>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Cards and components often use sans-serif for
								clarity and consistency.
							</p>
						</div>
						<div className="border rounded-lg p-5">
							<h5 className="font-medium mb-3">Another Card</h5>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Test how your font looks in UI components like
								cards, buttons, and form elements.
							</p>
						</div>
					</div>
				</section>

				{/* Serif Section */}
				<section className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold tracking-tight font-serif">
							Serif Typography
						</h1>
						<p className="text-muted-foreground mt-3 text-lg font-serif">
							Traditional typefaces with decorative strokes
						</p>
					</div>

					<div className="space-y-6">
						<div className="font-serif">
							<h2 className="text-3xl font-semibold mb-4">
								Elegant Headings
							</h2>
							<p className="text-lg leading-relaxed">
								Serif fonts bring a sense of tradition and
								elegance to your design. They're excellent for
								long-form reading and can add sophistication to
								headings. The quick brown fox jumps over the
								lazy dog.
							</p>
						</div>

						<blockquote className="border-l-4 border-primary pl-6 py-3 italic font-serif text-lg leading-relaxed">
							"Typography is the craft of endowing human language
							with a durable visual form."
						</blockquote>

						<div className="font-serif">
							<p className="leading-relaxed text-base">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris.
							</p>
						</div>
					</div>
				</section>

				{/* Monospace Section */}
				<section className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold tracking-tight font-mono">
							Monospace Typography
						</h1>
						<p className="text-muted-foreground mt-3 text-lg font-mono">
							Fixed-width fonts for code and technical content
						</p>
					</div>

					<div className="space-y-6">
						<div className="font-mono text-sm">
							<div className="bg-muted p-6 rounded-lg">
								<pre className="text-sm leading-relaxed">
									<code>{`function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

const result = greet("World");`}</code>
								</pre>
							</div>
						</div>

						<div className="font-mono space-y-3">
							<p className="text-sm">
								<span className="text-muted-foreground">$</span>{' '}
								npm install @shadcn/ui
							</p>
							<p className="text-sm">
								<span className="text-muted-foreground">$</span>{' '}
								pnpm add lucide-react
							</p>
							<p className="text-sm">
								<span className="text-muted-foreground">$</span>{' '}
								yarn add clsx
							</p>
						</div>

						<div className="grid grid-cols-2 gap-6 font-mono text-sm">
							<div className="bg-muted p-4 rounded">
								<div className="text-muted-foreground mb-2">
									Token
								</div>
								<div className="text-xs break-all">
									eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
								</div>
							</div>
							<div className="bg-muted p-4 rounded">
								<div className="text-muted-foreground mb-2">
									Endpoint
								</div>
								<div className="text-xs break-all">
									https://api.example.com/v1
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Mixed Usage Example */}
				<section className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold tracking-tight">
							Combined Typography
						</h1>
						<p className="text-muted-foreground mt-3 text-lg">
							How different font families work together
						</p>
					</div>

					<div className="border rounded-lg p-8 space-y-6">
						<h3 className="text-2xl font-semibold">
							Product Documentation
						</h3>
						<p className="leading-relaxed text-base">
							This paragraph uses your sans-serif font for
							excellent readability in UI contexts. It's perfect
							for general interface text.
						</p>
						<blockquote className="font-serif italic text-lg border-l-4 border-muted pl-6 py-2">
							Important quotes and callouts might use serif fonts
							to stand out and add emphasis.
						</blockquote>
						<div className="bg-muted p-5 rounded font-mono text-sm">
							<code>
								const example = "Code blocks use monospace";
							</code>
						</div>
					</div>

					<div className="grid gap-6">
						<div className="border rounded-lg p-6">
							<h4 className="font-medium mb-2 text-lg">
								System Message
							</h4>
							<p className="text-sm text-muted-foreground mb-3">
								Sans-serif for UI elements
							</p>
							<code className="text-xs font-mono bg-muted px-3 py-2 rounded inline-block">
								status: connected
							</code>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
