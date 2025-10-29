"use client";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import * as React from "react";

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none pb-12">
			{/* Header */}
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Materials</h1>
				<p className="text-muted-foreground text-xl">
					Beautiful and consistent materials.
				</p>
			</div>

			<div className="px-12 flex items-center justify-center">
				<GridContainer cols={9} rows={4} className="relative">
					<GridRow>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-emerald-700 !border-l-4 !border-t-4 border-l-emerald-900 border-t-emerald-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
				</GridContainer>
			</div>

			<div className="px-12 flex items-center justify-center">
				<GridContainer cols={9} rows={4} className="relative">
					<GridRow>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
				</GridContainer>
			</div>

			<div className="px-12 flex items-center justify-center">
				<GridContainer cols={9} rows={4} className="relative">
					<GridRow>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
					</GridRow>
					<GridRow>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
						<GridItem className="bg-red-800 !border-l-4 !border-t-4 border-l-red-900 border-t-red-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
						<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
					</GridRow>
				</GridContainer>
			</div>
		</main>
	);
}
