---
name: sync-and-push
description: Synchronize repository documentation against code and configuration, then prepare, commit, and push intended Git changes with a Conventional Commit title and grouped description. Shows a comprehensive pre-push summary and asks for confirmation by default; supports --direct for unattended execution.
---

# Sync and push

Invoke with `$sync-and-push` for the standard workflow: sync documentation first, run checks, show a comprehensive summary of everything about to be pushed, and wait for confirmation. Use `$sync-and-push --direct` (or an explicit instruction to sync, commit, and push directly without confirmation) to skip optional quality checks and the confirmation pause for that invocation. These are agent options, and Git never receives them.

## 1. Sync documentation

Discover the project's layout, tooling, and repository instructions before making edits.

1. Inventory the README, agent instructions, maintained docs, and any workspace or package guides within scope. Use a documentation index when one exists, and identify whose job each guide serves before updating it.
2. Use the request, working diff, or supplied baseline to identify claims likely to have changed. Compare claims about behavior and status with the implementation and relevant tests. Verify commands, versions, configuration, paths, and examples against manifests, lockfiles, CI, schemas, or other project sources.
3. Treat plans and proposals as evidence of intent. If a document and the implementation disagree and the intended behavior is unclear, leave it unchanged and note the discrepancy with references. Keep open decisions and unverified deployment claims explicit.
4. Make the smallest docs edits needed. Update the owning guide first and use links or short summaries in other files. Preserve unrelated edits, document voice, and generated blocks. For schema- or tool-generated docs, use the documented generator only when regeneration is in scope. Runtime fixes, version bumps, and release actions require separate authorization.
5. Verify changed local links and anchors, compare edited commands and examples with their sources, and run relevant repository docs checks when available.

## 2. Inspect scope and destination

- Identify the current branch, intended files (including any documentation updates from Step 1), staged changes, and push destination. Prefer the user's explicit destination or the configured upstream. If there is no upstream, use the current named branch and the configured push remote, or the sole remote when unambiguous. If the scope or destination is ambiguous, clarify before proceeding.
- Inspect staged, unstaged, and relevant untracked changes. Leave unrelated edits and staged work intact. If unrelated staged changes or mixed hunks cannot be isolated safely, ask the user how to proceed. Check for unintended credentials, generated output, and artifacts using the project's conventions.
- If there are no changes in scope, skip creating a commit. Push existing commits only when the request covers them. Before pushing, account for any outgoing commits beyond the newly prepared one.

## 3. Check and propose

- **Standard mode (default)**: Run the repository's applicable formatting check, lint, typecheck, tests, and build commands as defined by its instructions and tooling. Apply a formatter or fix failures only within the authorized scope. Report unresolved failures or unavailable checks in the summary and call them out explicitly when requesting confirmation.
- **Direct mode (`--direct`)**: Skip optional quality checks and formatting. Still run Step 1 (documentation sync), inspect the Git scope and destination, honor mandatory project checks, and leave Git hooks and branch protections enabled.

Stage the intended paths or hunks explicitly (including synced documentation) and review the staged diff. Write a Conventional Commit title in the form `type(scope): imperative summary` (omit the scope when it adds no clarity). In the body, group meaningful changes under only the applicable headings, such as **Features**, **Fixes**, **Refactors**, **Docs**, and **Chores**.

In **standard mode**, present a comprehensive pre-push summary covering:
- **Documentation sync**: files updated (or confirmed up to date), doc checks run, and any unresolved discrepancies.
- **Staged scope**: files and summary of changes staged, plus any existing outgoing commits.
- **Proposed commit**: full Conventional Commit title and body.
- **Check results**: outcomes of formatting, lint, typecheck, tests, and build.
- **Push target**: remote name/URL and branch.

Ask for one explicit confirmation covering both commit and push, then wait. If the approved scope, message, or destination changes materially, confirm the revised proposal.

In **direct mode**, proceed directly to Step 4 after reviewing the scope and destination. Required tool and repository approvals still apply.

## 4. Commit and push

Before committing, recheck that the staged snapshot and current branch still match the reviewed proposal. Commit that snapshot with the prepared title and body. Verify the commit succeeded before pushing to the identified remote and branch. Set an upstream on the first push when using a new remote branch. If the push is rejected or blocked, preserve the local commit and report the failure. History rewrites, force pushes, and changing branches require separate authorization.

Report the documentation sync results, commit hash and title, push destination and result, and any remaining working-tree changes. In direct mode, report that optional quality checks were skipped.
