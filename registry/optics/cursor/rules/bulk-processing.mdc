---
description: Rules for heavy tasks optimization
globs: *
alwaysApply: false
---
# Cursor Heavy Tasks Optimization Rules

## Core Principles

Work directly and efficiently. Complete tasks in the most straightforward way possible without adding unnecessary complexity or intermediate steps.

## File Operations

Update files one at a time in sequential order. Never create scripts, automation tools, or batch processors to handle file updates.

Make direct edits to each file. Open, modify, save. Repeat for the next file.

When updating multiple files, work through them systematically in a logical order (alphabetical, by directory structure, or by dependency order).

Avoid creating helper utilities or migration scripts. The overhead of creating and maintaining these tools exceeds the benefit for most tasks.

## Batch Processing

Process related changes in batches by type, not by creating automation.

Example: If updating imports across 20 files, update all imports in file 1, then all imports in file 2, etc. Don't create a script to find and replace imports.

Group similar edits mentally and apply them consistently across files, but execute them manually.

## Task Breakdown

Break large refactoring tasks into logical chunks: files in one directory, then another directory, then another.

Complete one chunk fully before moving to the next. Don't partially update everything.

When updating 50+ files, consider breaking the work into multiple sessions rather than creating automation.

## No Script Creation Policy

Never suggest creating Python scripts, Node.js scripts, or shell scripts to automate repetitive file changes.

Never suggest creating temporary utilities, helpers, or tools to process multiple files.

Never propose regex-based find-and-replace scripts across the codebase.

The exception: Build tools, linters, or formatters that are permanent parts of the project infrastructure.

## Efficiency Without Automation

Use your text editing capabilities directly. You can see and modify multiple files efficiently without scripts.

Leverage pattern recognition to work faster, but still process files individually.

Keep track of progress mentally or through comments in chat, not through generated checklists or tracking scripts.

## When Working with Many Files

For 5-10 files: Update them all directly, one by one.

For 10-30 files: Update them in batches of 5-10, taking breaks between batches.

For 30+ files: Break into logical groups (by feature, directory, or module) and process each group separately.

For 100+ files: Suggest the user consider using their IDE's built-in refactoring tools or find-and-replace, but still work file by file if they prefer.

## Refactoring Guidelines

Apply changes consistently but manually. If you rename a function, update each call site by editing each file.

Don't generate migration guides or step-by-step instruction files. Just do the work.

Don't create TODO lists or tracking documents unless explicitly requested.

## Progress Communication

Report progress naturally: "Updated 5 of 12 files" not "Running batch processor: 41% complete".

If a task is interrupted, remember where you left off and continue from there.

Don't create checkpoint files or progress trackers.

## Quality Over Speed

Take time to review each change in context. Fast automation often misses edge cases.

Understand what you're changing in each file. Don't blindly apply patterns.

Manual updates allow you to spot issues, inconsistencies, or better approaches.

## Complexity Assessment

Before starting a large task, assess if the approach is appropriate:
- Will manual updates introduce human error? Proceed carefully.
- Is the pattern truly repetitive? Then manual work is straightforward.
- Are there edge cases in each file? Manual review catches these.

## What NOT to Do

Never create update.py, migrate.js, refactor.sh, or similar scripts.

Never generate find-and-replace commands for the user to run.

Never create wrapper scripts that call your own API to process files.

Never suggest "let me write a quick script to handle this" - just handle it.

## Communication Style

Be direct: "I'll update these 15 files now" not "I'll create a script to update these files".

Show progress through actual work, not through generated reports.

If a task truly requires automation (100+ files with complex logic), suggest the user use professional refactoring tools instead of creating temporary scripts.

## Exception Cases

The only acceptable "scripts" are:
- Standard build tools (webpack, vite, etc.)
- Linters and formatters (ESLint, Prettier)
- Testing frameworks
- Database migrations (managed by ORMs)
- Deployment scripts (part of infrastructure)

These are permanent project infrastructure, not temporary task facilitators.