"use client";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";
const code = [
	{
		language: "jsx",
		filename: "code-block.jsx",
		code: `<CodeBlock data={code} defaultValue={code[0].filename}>
	<CodeBlockHeader>
		<CodeBlockFiles>
			{(item) => (
				<CodeBlockFilename key={item.language} value={item.filename}>
					{item.filename}
				</CodeBlockFilename>
			)}
		</CodeBlockFiles>
		<CodeBlockSelect>
			<CodeBlockSelectTrigger>
				<CodeBlockSelectValue />
			</CodeBlockSelectTrigger>
			<CodeBlockSelectContent>
				{(item) => (
					<CodeBlockSelectItem
						key={item.language}
						value={item.filename}
					>
						{item.language}
					</CodeBlockSelectItem>
				)}
			</CodeBlockSelectContent>
		</CodeBlockSelect>
		<CodeBlockCopyButton
			onCopy={() => console.log("Copied code to clipboard")}
			onError={() => console.error("Failed to copy code to clipboard")}
		/>
	</CodeBlockHeader>
	<CodeBlockBody>
		{(item) => (
			<CodeBlockItem key={item.language} value={item.filename}>
				<CodeBlockContent language={item.language} className="bg-sidebar">
					{item.code}
				</CodeBlockContent>
			</CodeBlockItem>
		)}
	</CodeBlockBody>
</CodeBlock>`,
	},
];

export default function Page() {
	return (
		<main className="flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-12">
				<h1 className="text-4xl font-bold tracking-tight">
					AgusMayol's Optics
				</h1>
				<p className="text-muted-foreground text-xl">
					A personalized design system that combines aura, intuitive
					functionality, and visual appeal.
				</p>
			</div>

			<div className="px-12 flex items-center justify-center">
				<CodeBlock data={code} defaultValue={code[0].filename}>
					<CodeBlockHeader>
						<CodeBlockFiles>
							{(item) => (
								<CodeBlockFilename key={item.language} value={item.filename}>
									{item.filename}
								</CodeBlockFilename>
							)}
						</CodeBlockFiles>
						<CodeBlockSelect>
							<CodeBlockSelectTrigger>
								<CodeBlockSelectValue />
							</CodeBlockSelectTrigger>
							<CodeBlockSelectContent>
								{(item) => (
									<CodeBlockSelectItem
										key={item.language}
										value={item.filename}
									>
										{item.language}
									</CodeBlockSelectItem>
								)}
							</CodeBlockSelectContent>
						</CodeBlockSelect>
						<CodeBlockCopyButton
							onCopy={() => console.log("Copied code to clipboard")}
							onError={() => console.error("Failed to copy code to clipboard")}
						/>
					</CodeBlockHeader>
					<CodeBlockBody>
						{(item) => (
							<CodeBlockItem key={item.language} value={item.filename}>
								<CodeBlockContent
									language={item.language}
									className="bg-sidebar"
								>
									{item.code}
								</CodeBlockContent>
							</CodeBlockItem>
						)}
					</CodeBlockBody>
				</CodeBlock>
			</div>
		</main>
	);
}
