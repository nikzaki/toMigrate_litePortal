# Angular 4 to Angular 14 Migration Plan

## TL;DR

> **Quick Summary**: Incrementally upgrade Angular 4.4.3 to Angular 14 across 10 major versions (4→5→6→7→8→9→10→11→12→13→14) using ng-update, updating all dependencies and running tests after each version.
> 
> **Deliverables**:
> - Angular 14.2.x application with all packages updated
> - All 13 tests migrated and passing for Angular 14
> - RxJS 7.x with modern pipe() syntax
> - HttpClient replacing deprecated @angular/http
> - Updated third-party libraries (replacements where needed)
> - Git tag after each major version for rollback
> - Documentation of breaking changes applied
> 
> **Estimated Effort**: XL (4-6 months, 10 major versions)
> **Parallel Execution**: NO - Sequential version upgrades required
> **Critical Path**: Upgrade Version → Fix Breaks → Update Tests → Verify Build → Tag → Repeat (×10 versions)

---

## Context

### Original Request
User wants to migrate an Angular 4.4.3 codebase to Angular 14+ with support for Node.js 18.20. All library dependencies must be tallied and updated.

### Interview Summary
**Key Discussions**:
- Timeline: Moderate pace (weeks available, not urgent)
- Strategy: Incremental upgrades required - cannot skip major versions per Angular documentation
- Testing: Must run and update 13 existing tests after EACH major version upgrade
- Rollback: Git tags after each major version for safety
- Critical Libraries: angular2-busy (loading states) and jQuery deps (nanoscroller, ripple.js) must be preserved or replaced with equivalents
- Node.js: Already at 18.20 - compatible with Angular 14, no upgrade needed
- Dependencies: Keep what works, replace only when broken

**Research Findings**:
- Current stack: Angular 4.4.3, RxJS 5.4.3, NgRx (old API), Material 2.0.0-beta.11
- Deprecated patterns: @angular/http, RxJS 5 import syntax, MockBackend tests
- Third-party libs: PrimeNG 4, ng-bootstrap 1.0.0-beta.5, ng2-toastr, ng2-validation, @stomp/ng2-stompjs, angular2-busy
- Official migration path: Use ng-update sequentially, cannot skip versions
- RxJS 5→6 is major breaking change (rxjs-compat bridge needed)
- ng update @angular/core@6 @angular/cli@6 --create-commits --from=5

### Metis Review
**Note**: Metis consultation encountered technical issue. Self-review performed instead.

**Identified Gaps Addressed**:
- Need to document specific breaking changes per version
- Added: Research replacement for deprecated angular2-busy before starting
- Added: Check if @stomp/ng2-stompjs has Angular 14 compatible version
- Added: Document all third-party lib versions to try per Angular version
- Guardrails: Do NOT refactor unrelated code, do NOT add new features
- Added: E2E tests (Protractor) deprecation handling - Angular 12+ uses Cypress/Playwright
- Added: Ivy migration specifics (Angular 9+)

---

## Work Objectives

### Core Objective
Migrate the myGolf2u Portal application from Angular 4.4.3 to Angular 14.2.x while maintaining all functionality, ensuring all 13 tests pass, and preserving or replacing critical third-party libraries.

### Concrete Deliverables
- Angular 14.2.x application with updated package.json
- All source files migrated to Angular 14 syntax/imports
- 13 tests passing on Angular 14 (Karma + Jasmine, updated for HttpClient)
- Updated third-party libraries or documented replacements
- 10 git tags (v5, v6, v7, v8, v9, v10, v11, v12, v13, v14) for rollback
- Migration documentation (CHANGES.md) per version

### Definition of Done
- [ ] `ng version` shows Angular 14.2.x
- [ ] `npm ls` shows no peer dependency warnings
- [ ] `ng test` passes all 13 tests
- [ ] `ng build --prod` completes successfully
- [ ] Application starts and loads in browser (`ng serve`)

### Must Have
- Incremental upgrades through ALL major versions (cannot skip)
- Update and run 13 tests after EACH version upgrade
- Git tag after each major version completes
- Replace deprecated @angular/http with HttpClient
- Update RxJS imports to pipe() syntax
- Update Material/CDK components

### Must NOT Have (Guardrails)
- NO skipping major versions (Angular requirement)
- NO refactoring unrelated code (stay focused on migration)
- NO adding new features (only migration work)
- NO changing business logic (only syntax/API updates)
- NO "while we're at it" improvements
- Scope: Migrate ONLY, do NOT enhance

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> The executing agent will use tools (Bash, interactive_bash) to run commands and verify outputs.

### Test Decision
- **Infrastructure exists**: YES (Karma + Jasmine + Protractor)
- **Automated tests**: YES (Tests-after - update existing tests per version)
- **Framework**: Karma + Jasmine (existing), no test framework change
- **E2E**: Propector (Angular 11-), need Cypress/Playwright (Angular 12+)

### Verification Tool by Deliverable Type

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Build/Config** | Bash (Angular CLI) | Run ng build, ng test, ng version commands |
| **Package Dependencies** | Bash (npm) | Run npm ls, check peer dependency warnings |
| **Application Runtime** | interactive_bash (tmux) | Run ng serve, verify browser output |
| **Test Execution** | Bash (Karma) | Run ng test, check test results output |

### Per-Task QA Scenarios

Each version upgrade task will include:
- `ng version` to verify Angular version
- `npm ls` to check for dependency conflicts
- `ng test` to run tests and capture results
- `ng build --prod` to verify production build

---

## Execution Strategy

### Parallel Execution Waves

> **CRITICAL**: Angular version upgrades are inherently SEQUENTIAL.
> Cannot parallelize due to dependency chain.

```
Wave 1:
└── Task 1: Pre-migration research (third-party lib replacements)

Wave 2:
└── Task 2: Angular 4.4.3 → 5.x upgrade

Wave 3:
└── Task 3: Angular 5.x → 6.x upgrade (major RxJS break)

Wave 4:
└── Task 4: Angular 6.x → 7.x upgrade

Wave 5:
└── Task 5: Angular 7.x → 8.x upgrade

Wave 6:
└── Task 6: Angular 8.x → 9.x upgrade (Ivy opt-in)

Wave 7:
└── Task 7: Angular 9.x → 10.x upgrade

Wave 8:
└── Task 8: Angular 10.x → 11.x upgrade

Wave 9:
└── Task 9: Angular 11.x → 12.x upgrade (E2E framework change)

Wave 10:
└── Task 10: Angular 12.x → 13.x upgrade

Wave 11:
└── Task 11: Angular 13.x → 14.x upgrade (Ivy default)

Wave 12:
└── Task 12: Final cleanup and documentation

Critical Path: Task 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12
Parallel Speedup: NONE (fully sequential)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2 | None |
| 2 | 1 | 3 | None |
| 3 | 2 | 4 | None |
| 4 | 3 | 5 | None |
| 5 | 4 | 6 | None |
| 6 | 5 | 7 | None |
| 7 | 6 | 8 | None |
| 8 | 7 | 9 | None |
| 9 | 8 | 10 | None |
| 10 | 9 | 11 | None |
| 11 | 10 | 12 | None |
| 12 | 11 | None | None |

### Agent Dispatch Summary

| Wave | Task | Recommended Agent |
|------|-------|-------------------|
| 1 | 1 (Research) | delegate_task(category="unspecified-high") |
| 2-11 | 2-11 (Upgrades) | delegate_task(category="unspecified-low", load_skills=["git-master"]) |
| 12 | 12 (Finalize) | delegate_task(category="quick") |

---

## TODOs

- [ ] 1. Pre-Migration Research: Third-Party Library Compatibility

  **What to do**:
  - Research Angular 14 compatibility for ALL third-party packages in package.json
  - Document available replacement libraries for deprecated packages:
    - angular2-busy → check for ngx-busy or equivalent
    - ng2-toastr → ngx-toastr
    - ng2-validation → check ngx-validator packages
    - PrimeNG 4.1.3 → latest PrimeNG for Angular 14
    - ng-bootstrap 1.0.0-beta.5 → @ng-bootstrap/angular-bootstrap
    - @stomp/ng2-stompjs → @stomp/rx-stompjs
  - Create mapping table: `Package → Current Version → Angular 14 Version → Replacement (if any)`
  - Document any breaking changes for each library
  - Save findings to `.sisyphus/drafts/library-migration-plan.md`

  **Must NOT do**:
  - Do NOT install any packages yet
  - Do NOT modify any code files
  - This is RESEARCH ONLY

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires comprehensive research and documentation across multiple libraries
  - **Skills**: `[librarian]`
    - `librarian`: Finding package documentation, Angular 14 compatible versions, community recommendations

  **Parallelization**:
  - **Can Run In Parallel**: NO (must complete before any upgrade work begins)
  - **Parallel Group**: Sequential (Task 1)
  - **Blocks**: Task 2 (all upgrade work depends on this research)
  - **Blocked By**: None (can start immediately)

  **References**:
  
  **Documentation References**:
  - `package.json` - All current dependencies to research
  - `npm ls` output - Full dependency tree
  - Each library's npm page and GitHub repository
  - Angular 14 compatible package lists

  **External References**:
  - npm registry: https://www.npmjs.com/ - Check latest versions
  - PrimeNG docs: https://primeng.org/ - Current version and migration guide
  - ng-bootstrap: https://ng-bootstrap.github.io/ - Angular 14 compatible version
  - ngx-toastr: https://www.npmjs.com/package/ngx-toastr - Replacement for ng2-toastr

  **Acceptance Criteria**:

  - [ ] Research document created: `.sisyphus/drafts/library-migration-plan.md`
  - [ ] Table includes ALL packages from package.json
  - [ ] Each entry has: package name, current version, Angular 14 version, replacement needed (Y/N)
  - [ ] Breaking changes documented for each library
  - [ ] Migration steps documented for each library

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Research document exists with complete package table
    Tool: Bash
    Preconditions: Research completed
    Steps:
      1. cat .sisyphus/drafts/library-migration-plan.md
      2. Count table rows (should have at least 15 packages listed)
      3. Verify each row has 4 columns (name, current, Angular 14, replacement)
      4. grep -c "Breaking changes:" .sisyphus/drafts/library-migration-plan.md
      5. Assert count >= 10 (each major lib should have breaking changes section)
    Expected Result: Complete migration research document
    Evidence: .sisyphus/drafts/library-migration-plan.md content

  Scenario: All package.json entries are researched
    Tool: Bash
    Preconditions: package.json exists
    Steps:
      1. Extract all dependencies from package.json
      2. Count: $(cat package.json | jq '.dependencies | length')
      3. Count researched packages in library-migration-plan.md
      4. Assert researched count >= dependencies count
    Expected Result: Every dependency researched
    Evidence: Count comparison output
  ```

  **Evidence to Capture**:
  - [ ] Research document saved
  - [ ] Package count comparison output

  **Commit**: NO (research only, no code changes)

---

- [ ] 2. Angular 4.4.3 → 5.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-5`
  - Backup current state: `git tag v4.4.3-before-migration`
  - Update Angular CLI globally: `npm install -g @angular/cli@latest`
  - Update project packages:
    ```bash
    ng update @angular/cli@5 @angular/core@5 --create-commits --from=4
    ```
  - Update remaining dependencies to Angular 5 compatible versions
  - Run `npm ls` to check for peer dependency warnings
  - Fix any deprecated imports (check Angular 5 changelog)
  - Update and run all 13 tests
  - Verify build: `ng build --prod`
  - On success: `git tag v5.0.0-migration-complete`
  - Document changes in CHANGES.md under "## Angular 5.0.0"

  **Must NOT do**:
  - Do NOT skip to Angular 6 (must follow sequence)
  - Do NOT refactor unrelated code
  - Do NOT add new features

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Well-defined upgrade procedure following Angular migration guide
  - **Skills**: `[git-master]`
    - `git-master`: Branch management, tagging, commits for rollback safety

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential upgrade chain)
  - **Parallel Group**: Sequential (Task 2)
  - **Blocks**: Task 3 (Angular 6 upgrade)
  - **Blocked By**: Task 1 (research must complete first)

  **References**:
  
  **Pattern References** (follow ng update conventions):
  - Angular 5 migration guide: https://angular.io/guide/upgrading-to-version-5
  - package.json scripts - Preserve existing scripts
  - src/tsconfig.json - Keep existing compiler options

  **API/Type References**:
  - Current Angular 4.4.3 imports in src/
  - Angular 5 deprecated modules list

  **Documentation References**:
  - Angular 5 changelog: https://github.com/angular/angular/blob/master/CHANGELOG.md#500-2017-11-09
  - Breaking changes in Angular 5

  **Acceptance Criteria**:

  - [ ] Branch created: migration/angular-5
  - [ ] Tag created: v4.4.3-before-migration
  - [ ] ng version shows: Angular 5.x.x
  - [ ] npm ls shows: 0 peer dependency warnings
  - [ ] ng test passes: 13/13 tests passing
  - [ ] ng build --prod completes: exit code 0
  - [ ] Tag created: v5.0.0-migration-complete
  - [ ] CHANGES.md updated with Angular 5 changes

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify Angular 5 version installed
    Tool: Bash
    Preconditions: Upgrade completed
    Steps:
      1. ng version
      2. Assert output contains "@angular/core: 5."
      3. Assert output contains "@angular/cli: 5."
      4. ng version --json | jq '.["@angular/core"].version' | cut -d'.' -f1
      5. Assert major version equals 5
    Expected Result: Angular 5.x.x installed
    Evidence: ng version output saved to .sisyphus/evidence/task-2-ng-version.txt

  Scenario: Verify no peer dependency warnings
    Tool: Bash
    Preconditions: Packages updated
    Steps:
      1. npm ls > /tmp/npm-ls.txt 2>&1
      2. grep -i "peer dep" /tmp/npm-ls.txt || echo "No warnings"
      3. Assert: No "UNMET PEER DEPENDENCY" in output
      4. Assert: Exit code 0
    Expected Result: Clean dependency tree
    Evidence: /tmp/npm-ls.txt saved

  Scenario: All 13 tests pass
    Tool: Bash (interactive for headless mode)
    Preconditions: Angular 5 installed, tests updated
    Steps:
      1. export CHROME_BIN=chromium
      2. ng test --watch=false --code-coverage --browsers=ChromeHeadless
      3. Wait for test completion (timeout: 120s)
      4. Assert output contains "SUCCESS: 13"
      5. Assert exit code 0
    Expected Result: All tests passing
    Evidence: Test output saved to .sisyphus/evidence/task-2-test-results.txt

  Scenario: Production build succeeds
    Tool: Bash
    Preconditions: Tests passing
    Steps:
      1. ng build --prod
      2. Assert exit code 0
      3. Assert dist/ directory exists
      4. Assert dist/main.bundle.js exists (AOT compiled)
      5. ls -lh dist/ | wc -l
      6. Assert file count >= 10 (has build artifacts)
    Expected Result: Production build successful
    Evidence: Build output saved

  Scenario: Git tags created for rollback
    Tool: Bash
    Preconditions: Upgrade complete and verified
    Steps:
      1. git tag | grep "v4.4.3-before-migration"
      2. Assert tag exists
      3. git tag | grep "v5.0.0-migration-complete"
      4. Assert tag exists
      5. git show v5.0.0-migration-complete --quiet
      6. Assert commit exists
    Expected Result: Both tags created
    Evidence: git tag output saved

  Scenario: Application starts and loads
    Tool: interactive_bash (tmux)
    Preconditions: Build successful
    Steps:
      1. tmux new-session -d -s angular-test "ng serve"
      2. Wait for "Compiled successfully" in output (timeout: 60s)
      3. curl -s http://localhost:4200 | head -20
      4. Assert output contains "<app-root>" or "<mygolf2u-root>"
      5. tmux send-keys -t angular-test "C-c" Enter
      6. tmux kill-session -t angular-test
    Expected Result: Dev server runs and app loads
    Evidence: curl output saved
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-2-ng-version.txt
  - [ ] .sisyphus/evidence/task-2-npm-ls.txt
  - [ ] .sisyphus/evidence/task-2-test-results.txt
  - [ ] .sisyphus/evidence/task-2-build-output.txt

  **Commit**: YES (groups with Task 3)
  - Message: `feat(migration): upgrade to Angular 5.2.x`
  - Files: package.json, package-lock.json, src/ (modified files), CHANGES.md
  - Pre-commit: `ng test --watch=false`

---

- [ ] 3. Angular 5.x → 6.x Upgrade (MAJOR BREAKING CHANGES)

  **What to do**:
  - Create git branch: `migration/angular-6`
  - Tag before starting: `git tag v5.x-before-v6-migration`
  - **CRITICAL**: RxJS 5 → 6 migration (major breaking change)
  - Install rxjs-compat for gradual migration:
    ```bash
    npm install rxjs-compat
    ng update @angular/cli@6 @angular/core@6 --create-commits --from=5 --migrate-only
    ```
  - **RxJS migration**: Run automated migration tool
    ```bash
    npx rxjs-tslint -p tsconfig.json
    ```
  - Replace deprecated @angular/http with HttpClient (manual code changes)
  - Update all HTTP imports:
    - Remove: `import { Http } from '@angular/http'`
    - Add: `import { HttpClient } from '@angular/common/http'`
  - Update NgRx from old API to @ngrx/store@6 (if using store)
  - Update all 13 tests (replace MockBackend with HttpClientTestingModule)
  - Run tests: `ng test`
  - Verify build: `ng build --prod`
  - Remove rxjs-compat after all tests pass:
    ```bash
    npm uninstall rxjs-compat
    ```
  - Update remaining third-party libs to Angular 6 versions (use research from Task 1)
  - Re-run tests and build
  - On success: `git tag v6.0.0-migration-complete`
  - Document changes in CHANGES.md under "## Angular 6.0.0"

  **Must NOT do**:
  - Do NOT skip to Angular 7
  - Do NOT leave rxjs-compat in final package.json (must remove)
  - Do NOT skip HttpClient migration (required)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Follows migration guide, mostly automated with manual fixes
  - **Skills**: `[git-master]`
    - `git-master`: Tagging, branches for safe rollback

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Task 3)
  - **Blocks**: Task 4 (Angular 7 upgrade)
  - **Blocked By**: Task 2 (Angular 5 must complete)

  **References**:
  
  **Pattern References** (RxJS migration):
  - src/app/**/*.service.ts - HTTP services using old Http → HttpClient pattern
  - src/app/**/*.spec.ts - MockBackend → HttpClientTestingModule pattern

  **API/Type References**:
  - @angular/common/http HttpClient - New HTTP API
  - RxJS 6 pipeable operators - .pipe() syntax
  - HttpClientTestingModule - Test module for HTTP

  **Documentation References**:
  - Angular 6 migration guide: https://angular.io/guide/upgrading-to-version-6
  - RxJS 6 migration guide: https://rxjs-dev.firebaseapp.com/guide/v6/migration
  - HttpClient guide: https://angular.io/guide/http

  **External References**:
  - rxjs-tslint: https://github.com/ReactiveX/rxjs-tslint

  **Acceptance Criteria**:

  - [ ] Branch created: migration/angular-6
  - [ ] Tag created: v5.x-before-v6-migration
  - [ ] ng version shows: Angular 6.x.x
  - [ ] RxJS 6.x installed: npm ls rxjs shows ^6.0.0
  - [ ] rxjs-compat REMOVED from package.json (not in dependencies)
  - [ ] @angular/http NOT in package.json (replaced by @angular/common/http)
  - [ ] All .service.ts files use HttpClient (grep: no imports from @angular/http)
  - [ ] All .spec.ts files use HttpClientTestingModule
  - [ ] ng test passes: 13/13 tests passing
  - [ ] ng build --prod completes: exit code 0
  - [ ] Tag created: v6.0.0-migration-complete

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify Angular 6 and RxJS 6 installed
    Tool: Bash
    Preconditions: Upgrade completed
    Steps:
      1. ng version
      2. Assert output contains "@angular/core: 6."
      3. npm ls rxjs
      4. Assert output contains "rxjs@6."
      5. npm ls rxjs-compat
      6. Assert output contains "UNMET DEPENDENCY" or "empty" (compat removed)
      7. cat package.json | jq '.dependencies.rxjs-compat'
      8. Assert: null or error (not in dependencies)
    Expected Result: Angular 6 + RxJS 6, no rxjs-compat
    Evidence: Version outputs saved

  Scenario: Verify @angular/http removed
    Tool: Bash
    Preconditions: Migration complete
    Steps:
      1. grep -r "from '@angular/http'" src/ || echo "No old imports found"
      2. Assert: No matches (old HTTP imports removed)
      3. grep -r "HttpClient" src/app | wc -l
      4. Assert count >= 5 (HttpClient is used)
      5. npm ls @angular/http 2>&1 | grep "UNMET"
      6. Assert: @angular/http is unmet (not in dependencies)
    Expected Result: Old HTTP module fully replaced
    Evidence: grep outputs saved

  Scenario: Verify RxJS pipe() syntax used
    Tool: Bash
    Preconditions: RxJS 6 migration complete
    Steps:
      1. grep -r "\.map(" src/app | grep -v "\.pipe(" | wc -l
      2. Assert count == 0 (no bare .map() calls, all in .pipe())
      3. grep -r "\.pipe(" src/app | wc -l
      4. Assert count >= 5 (pipeable operators used)
    Expected Result: Modern RxJS 6 syntax throughout
    Evidence: grep outputs saved

  Scenario: All tests pass with new HttpClient
    Tool: Bash
    Preconditions: Tests updated
    Steps:
      1. ng test --watch=false --code-coverage --browsers=ChromeHeadless
      2. Assert output contains "SUCCESS: 13"
      3. Assert exit code 0
      4. grep -r "MockBackend" src/app || echo "No MockBackend found"
      5. Assert: No MockBackend references (replaced)
    Expected Result: Tests pass with HttpClientTestingModule
    Evidence: Test output saved
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-3-rxjs-migration.txt
  - [ ] .sisyphus/evidence/task-3-http-client-verify.txt
  - [ ] .sisyphus/evidence/task-3-test-results.txt

  **Commit**: YES (groups with Task 4)
  - Message: `feat(migration): upgrade to Angular 6.1.x, RxJS 6, HttpClient`
  - Files: package.json, src/**/*.service.ts, src/**/*.spec.ts, CHANGES.md
  - Pre-commit: `ng test --watch=false`

---

- [ ] 4. Angular 6.x → 7.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-7`
  - Tag before starting: `git tag v6.x-before-v7-migration`
  - Update Angular packages:
    ```bash
    ng update @angular/cli@7 @angular/core@7 --create-commits --from=6
    ```
  - Update TypeScript to 3.1.x (Angular 7 requirement)
  - Update third-party libraries to Angular 7 compatible versions
  - Run `npm ls` to check dependencies
  - Update tests for any API changes
  - Run tests: `ng test`
  - Verify build: `ng build --prod`
  - On success: `git tag v7.0.0-migration-complete`
  - Document changes in CHANGES.md

  **Must NOT do**:
  - Do NOT skip versions
  - Do NOT refactor unrelated code

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Standard ng update procedure
  - **Skills**: `[git-master]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 5
  - **Blocked By**: Task 3

  **Acceptance Criteria**:

  - [ ] ng version shows: Angular 7.x.x
  - [ ] TypeScript version: 3.1.x
  - [ ] ng test passes: 13/13 tests
  - [ ] ng build --prod succeeds
  - [ ] Tag created: v7.0.0-migration-complete

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Verify Angular 7 installed
    Tool: Bash
    Steps:
      1. ng version --json | jq '.["@angular/core"].version' | cut -d'.' -f1
      2. Assert: 7
      3. npm ls typescript
      4. Assert: typescript@3.1.x
    Expected Result: Angular 7 + TS 3.1
    Evidence: Version outputs
  ```

  **Commit**: YES (with Task 5)

---

- [ ] 5. Angular 7.x → 8.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-8`
  - Tag before: `git tag v7.x-before-v8-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@8 @angular/core@8 --create-commits --from=7
    ```
  - Update Angular CLI configuration for differential loading (modern vs legacy browsers)
  - Update browserslist in package.json
  - Update third-party libs
  - Run tests and build
  - Tag: `v8.0.0-migration-complete`
  - Document changes

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 4, blocks Task 6

  **Acceptance Criteria**:

  - [ ] ng version: Angular 8.x.x
  - [ ] ng test passes
  - [ ] ng build --prod generates modern+legacy bundles
  - [ ] Tag created

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Verify differential loading
    Tool: Bash
    Steps:
      1. ng build --prod
      2. ls dist/ | grep -E "(es5|es2015)"
      3. Assert: Both es5 and es2015 directories exist
    Expected Result: Differential loading enabled
    Evidence: dist directory listing
  ```

  **Commit**: YES (with Task 6)

---

- [ ] 6. Angular 8.x → 9.x Upgrade (IVY OPT-IN)

  **What to do**:
  - Create git branch: `migration/angular-9`
  - Tag before: `git tag v8.x-before-v9-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@9 @angular/core@9 --create-commits --from=8
    ```
  - **CRITICAL**: Angular 9 introduces Ivy (new rendering engine)
  - Ivy is opt-in in Angular 9 - enable by adding `enableIvy: true` to tsconfig.json
  - Update TypeScript to 3.8.x
  - Update third-party libs for Ivy compatibility
  - Run tests: `ng test`
  - Verify build: `ng build --prod`
  - Compare bundle sizes (Ivy should be smaller)
  - Tag: `v9.0.0-migration-complete`
  - Document Ivy-specific changes

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 5, blocks Task 7

  **Acceptance Criteria**:

  - [ ] ng version: Angular 9.x.x
  - [ ] tsconfig.json has: `"angularCompilerOptions": { "enableIvy": true }`
  - [ ] ng test passes
  - [ ] ng build --prod succeeds
  - [ ] Bundle size reduced (check dist/main*.js size)
  - [ ] Tag created

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Verify Ivy enabled
    Tool: Bash
    Steps:
      1. cat tsconfig.json | grep -A5 "angularCompilerOptions"
      2. Assert output contains "enableIry": true"
      3. ng build --prod
      4. ls -lh dist/main*.js
      5. Assert file size < previous build (Ivy smaller)
    Expected Result: Ivy enabled and working
    Evidence: tsconfig excerpt, build sizes
  ```

  **Commit**: YES (with Task 7)

---

- [ ] 7. Angular 9.x → 10.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-10`
  - Tag before: `git tag v9.x-before-v10-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@10 @angular/core@10 --create-commits --from=9
    ```
  - Update TypeScript to 3.9.x
  - browserslist configuration change (now in package.json, not .browserslistrc)
  - Update third-party libs
  - Run tests and build
  - Tag: `v10.0.0-migration-complete`
  - Document changes

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 6, blocks Task 8

  **Acceptance Criteria**:

  - [ ] ng version: Angular 10.x.x
  - [ ] browserslist in package.json (not separate file)
  - [ ] ng test passes
  - [ ] ng build --prod succeeds
  - [ ] Tag created

  **Commit**: YES (with Task 8)

---

- [ ] 8. Angular 10.x → 11.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-11`
  - Tag before: `git tag v10.x-before-v11-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@11 @angular/core@11 --create-commits --from=10
    ```
  - Update TypeScript to 4.0.x
  - Update third-party libs
  - Run tests and build
  - Tag: `v11.0.0-migration-complete`
  - Document changes

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 7, blocks Task 9

  **Acceptance Criteria**:

  - [ ] ng version: Angular 11.x.x
  - [ ] TypeScript 4.0.x
  - [ ] ng test passes
  - [ ] ng build --prod succeeds
  - [ ] Tag created

  **Commit**: YES (with Task 9)

---

- [ ] 9. Angular 11.x → 12.x Upgrade (E2E FRAMEWORK CHANGE)

  **What to do**:
  - Create git branch: `migration/angular-12`
  - Tag before: `git tag v11.x-before-v12-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@12 @angular/core@12 --create-commits --from=11
    ```
  - **CRITICAL**: Angular 12+ deprecates Protractor
  - ng update will prompt to switch E2E framework
  - **Choose Cypress** (recommended) or **Playwright**
  - Migrate Protractor tests to chosen framework
  - Update TypeScript to 4.2.x
  - Update third-party libs for Angular 12
  - Run unit tests: `ng test`
  - Run E2E tests: `ng e2e` (with new framework)
  - Verify build
  - Tag: `v12.0.0-migration-complete`
  - Document E2E migration

  **Must NOT do**:
  - Do NOT keep Protractor (deprecated)
  - Do NOT skip E2E test migration

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 8, blocks Task 10

  **Acceptance Criteria**:

  - [ ] ng version: Angular 12.x.x
  - [ ] Protractor REMOVED from package.json
  - [ ] Cypress OR Playwright installed
  - [ ] E2E tests converted and passing
  - [ ] ng test passes (13 unit tests)
  - [ ] ng e2e passes
  - [ ] ng build --prod succeeds
  - [ ] Tag created

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Verify E2E framework migration
    Tool: Bash
    Steps:
      1. cat package.json | jq '.devDependencies.protractor'
      2. Assert: null (removed)
      3. cat package.json | jq '.devDependencies.cypress or .devDependencies.playwright'
      4. Assert: exists (new framework installed)
      5. ng e2e
      6. Assert: exit code 0
    Expected Result: E2E tests running with new framework
    Evidence: package.json excerpt, e2e output
  ```

  **Commit**: YES (with Task 10)

---

- [ ] 10. Angular 12.x → 13.x Upgrade

  **What to do**:
  - Create git branch: `migration/angular-13`
  - Tag before: `git tag v12.x-before-v13-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@13 @angular/core@13 --create-commits --from=12
    ```
  - Update TypeScript to 4.4.x
  - Update third-party libs
  - Run tests and build
  - Tag: `v13.0.0-migration-complete`
  - Document changes

  **Recommended Agent Profile**: `unspecified-low` + `[git-master]`
  **Parallelization**: NO, blocked by Task 9, blocks Task 11

  **Acceptance Criteria**:

  - [ ] ng version: Angular 13.x.x
  - [ ] ng test passes
  - [ ] ng e2e passes
  - [ ] ng build --prod succeeds
  - [ ] Tag created

  **Commit**: YES (with Task 11)

---

- [ ] 11. Angular 13.x → 14.x Upgrade (IVY DEFAULT)

  **What to do**:
  - Create git branch: `migration/angular-14`
  - Tag before: `git tag v13.x-before-v14-migration`
  - Update packages:
    ```bash
    ng update @angular/cli@14 @angular/core@14 --create-commits --from=13
    ```
  - **CRITICAL**: Angular 14 makes Ivy the ONLY rendering engine (View Engine removed)
  - Verify no View Engine specific code remains
  - Update TypeScript to 4.6.x
  - Update all third-party libs to Angular 14 versions (use research from Task 1)
  - **Replace deprecated packages**:
    - angular2-busy → ngx-busy (or documented equivalent)
    - ng2-toastr → ngx-toastr
    - ng2-validation → find Angular 14 compatible validator
  - Update any remaining Material/CDK component APIs
  - Run tests: `ng test`
  - Run E2E: `ng e2e`
  - Verify build: `ng build --prod`
  - Final verification that all 13 unit tests pass
  - Tag: `v14.0.0-migration-complete`
  - Document all changes in CHANGES.md

  **Must NOT do**:
  - Do NOT skip third-party lib updates
  - Do NOT leave deprecated packages

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Final upgrade step, straightforward ng update
  - **Skills**: `[git-master]`
    - `git-master`: Final tag creation, branch management

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 12 (final cleanup)
  - **Blocked By**: Task 10 (Angular 13 must complete)

  **References**:
  
  **Pattern References**:
  - src/app/**/* - All Ivy-compatible code
  - Task 1 research document - Library replacement mappings

  **Documentation References**:
  - Angular 14 upgrade guide: https://angular.io/guide/upgrading-to-version-14
  - Angular 14 changelog: https://github.com/angular/angular/blob/main/CHANGELOG.md

  **Acceptance Criteria**:

  - [ ] Branch created: migration/angular-14
  - [ ] Tag created: v13.x-before-v14-migration
  - [ ] ng version shows: Angular 14.x.x
  - [ ] TypeScript 4.6.x installed
  - [ ] All third-party libs updated to Angular 14 versions
  - [ ] angular2-busy REPLACED (not in package.json)
  - [ ] ng2-toastr REPLACED (ngx-toastr installed)
  - [ ] ng test passes: 13/13 tests
  - [ ] ng e2e passes
  - [ ] ng build --prod succeeds
  - [ ] Tag created: v14.0.0-migration-complete

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify Angular 14 installed
    Tool: Bash
    Preconditions: Final upgrade complete
    Steps:
      1. ng version --json
      2. Assert output contains "@angular/core": "14."
      3. npm ls typescript
      4. Assert: typescript@4.6.x
    Expected Result: Angular 14 + TS 4.6
    Evidence: Version outputs

  Scenario: Verify all deprecated packages replaced
    Tool: Bash
    Preconditions: Package updates complete
    Steps:
      1. cat package.json | jq '.dependencies | keys | .[]' | grep "ng2-"
      2. Assert: No matches (all ng2- packages replaced)
      3. cat package.json | jq '.dependencies | keys | .[]' | grep "angular2-"
      4. Assert: No matches (angular2-busy replaced)
      5. npm ls ngx-toastr
      6. Assert: ngx-toastr installed (replacement for ng2-toastr)
    Expected Result: All legacy packages replaced
    Evidence: package.json dependency list

  Scenario: All 13 unit tests pass
    Tool: Bash
    Preconditions: Tests updated for Angular 14
    Steps:
      1. ng test --watch=false --code-coverage --browsers=ChromeHeadless
      2. Wait for completion (timeout: 120s)
      3. Assert output contains "SUCCESS: 13"
      4. Assert exit code 0
    Expected Result: All tests passing on Angular 14
    Evidence: Test results output

  Scenario: E2E tests pass with new framework
    Tool: Bash
    Preconditions: E2E framework migrated
    Steps:
      1. ng e2e
      2. Assert exit code 0
      3. Assert output contains "All specs passed"
    Expected Result: E2E tests passing
    Evidence: E2E output

  Scenario: Production build successful
    Tool: Bash
    Preconditions: All tests passing
    Steps:
      1. ng build --prod
      2. Assert exit code 0
      3. ls -lh dist/
      4. Assert dist/ has build artifacts (>= 10 files)
      5. Check bundle sizes are reasonable (< 5MB total)
    Expected Result: Clean production build
    Evidence: Build output, dist listing

  Scenario: Application runs in browser
    Tool: interactive_bash (tmux)
    Preconditions: Build successful
    Steps:
      1. tmux new-session -d -s angular-14-test "ng serve"
      2. Wait for "Compiled successfully" (timeout: 60s)
      3. curl -s http://localhost:4200 | head -30
      4. Assert output contains app root selector
      5. tmux send-keys -t angular-14-test "C-c" Enter
      6. tmux kill-session -t angular-14-test
    Expected Result: App loads and renders
    Evidence: curl output saved
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-11-angular-14-version.txt
  - [ ] .sisyphus/evidence/task-11-packages-replaced.txt
  - [ ] .sisyphus/evidence/task-11-test-results.txt
  - [ ] .sisyphus/evidence/task-11-e2e-results.txt
  - [ ] .sisyphus/evidence/task-11-build-output.txt

  **Commit**: YES (final commit)
  - Message: `feat(migration): upgrade to Angular 14.2.x, complete migration`
  - Files: package.json, CHANGES.md, all modified files
  - Pre-commit: `ng test --watch=false && ng e2e`

---

- [ ] 12. Final Cleanup and Documentation

  **What to do**:
  - Create CHANGES.md with complete migration history:
    - List all Angular versions upgraded (4→5→6→...→14)
    - Document all breaking changes applied
    - Document all package replacements
    - Document any manual code changes required
  - Verify all git tags are present:
    - v4.4.3-before-migration
    - v5.0.0-migration-complete
    - v6.0.0-migration-complete
    - v7.0.0-migration-complete
    - v8.0.0-migration-complete
    - v9.0.0-migration-complete
    - v10.0.0-migration-complete
    - v11.0.0-migration-complete
    - v12.0.0-migration-complete
    - v13.0.0-migration-complete
    - v14.0.0-migration-complete
  - Verify final state:
    - `ng version` shows Angular 14.2.x
    - `npm ls` shows no peer dependency warnings
    - `ng test` passes (13/13 tests)
    - `ng build --prod` succeeds
    - Application runs in browser
  - Create MIGRATION_SUMMARY.md with:
    - Before/after package.json comparison
    - Total time taken (for future reference)
    - Lessons learned
    - Any remaining manual steps for user
  - Delete .sisyphus/drafts/library-migration-plan.md (research no longer needed)

  **Must NOT do**:
  - Do NOT make any code changes
  - This is documentation and verification ONLY

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Documentation task, no code changes
  - **Skills**: `[]` (no special skills needed)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: None (final task)
  - **Blocked By**: Task 11 (migration must complete)

  **References**:
  
  **Pattern References**:
  - All git tags created during migration
  - CHANGES.md (created during each upgrade)
  - package.json (final state)

  **Documentation References**:
  - Angular migration guides referenced throughout

  **Acceptance Criteria**:

  - [ ] CHANGES.md complete with all version upgrades documented
  - [ ] MIGRATION_SUMMARY.md created
  - [ ] All 11 git tags verified (list and verify existence)
  - [ ] ng version confirms Angular 14.2.x
  - [ ] npm ls clean (0 peer warnings)
  - [ ] ng test passes (13/13)
  - [ ] ng build --prod succeeds
  - [ ] .sisyphus/drafts/library-migration-plan.md deleted

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify all git tags exist
    Tool: Bash
    Preconditions: All migration tasks complete
    Steps:
      1. git tag | sort -V
      2. Count tags: $(git tag | wc -l)
      3. Assert: count >= 11 (all migration tags present)
      4. Verify each tag:
         - git tag -l "v4.4.3-before-migration"
         - git tag -l "v5.0.0-migration-complete"
         - git tag -l "v6.0.0-migration-complete"
         - git tag -l "v7.0.0-migration-complete"
         - git tag -l "v8.0.0-migration-complete"
         - git tag -l "v9.0.0-migration-complete"
         - git tag -l "v10.0.0-migration-complete"
         - git tag -l "v11.0.0-migration-complete"
         - git tag -l "v12.0.0-migration-complete"
         - git tag -l "v13.0.0-migration-complete"
         - git tag -l "v14.0.0-migration-complete"
      5. Assert: Each tag command returns exactly 1 line (tag exists)
    Expected Result: All 11 tags present and valid
    Evidence: git tag listing saved

  Scenario: Final verification - Angular 14, tests, build
    Tool: Bash
    Preconditions: Migration complete
    Steps:
      1. ng version --json > .sisyphus/evidence/final-ng-version.json
      2. cat .sisyphus/evidence/final-ng-version.json | jq '.["@angular/core"].version'
      3. Assert: Contains "14."
      4. npm ls > .sisyphus/evidence/final-npm-ls.txt 2>&1
      5. grep -i "peer dep" .sisyphus/evidence/final-npm-ls.txt
      6. Assert: No matches (clean dependency tree)
      7. ng test --watch=false --browsers=ChromeHeadless > .sisyphus/evidence/final-tests.txt
      8. cat .sisyphus/evidence/final-tests.txt | grep "SUCCESS"
      9. Assert: Contains "13"
      10. ng build --prod > .sisyphus/evidence/final-build.txt
      11. Assert exit code 0
    Expected Result: All verification commands pass
    Evidence: All output files in .sisyphus/evidence/

  Scenario: Verify documentation complete
    Tool: Bash
    Preconditions: All tasks done
    Steps:
      1. ls -lh CHANGES.md
      2. Assert file exists and size > 0
      3. cat CHANGES.md | grep "## Angular 14.0.0"
      4. Assert: Section exists
      5. ls -lh MIGRATION_SUMMARY.md
      6. Assert file exists and size > 0
      7. cat MIGRATION_SUMMARY.md | grep -E "(Before|After|Lessons)"
      8. Assert: Summary sections present
    Expected Result: Complete documentation
    Evidence: File listings and content samples

  Scenario: Cleanup temporary research file
    Tool: Bash
    Preconditions: Migration complete, documentation done
    Steps:
      1. ls .sisyphus/drafts/library-migration-plan.md 2>&1
      2. If exists: rm .sisyphus/drafts/library-migration-plan.md
      3. ls .sisyphus/drafts/library-migration-plan.md 2>&1
      4. Assert: "No such file or directory" (deleted)
    Expected Result: Temporary research file removed
    Evidence: ls output showing deletion
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/final-ng-version.json
  - [ ] .sisyphus/evidence/final-npm-ls.txt
  - [ ] .sisyphus/evidence/final-tests.txt
  - [ ] .sisyphus/evidence/final-build.txt
  - [ ] .sisyphus/evidence/git-tags-list.txt

  **Commit**: YES (final documentation commit)
  - Message: `docs(migration): add complete migration summary and changelog`
  - Files: CHANGES.md, MIGRATION_SUMMARY.md
  - Pre-commit: `cat CHANGES.md | head -20` (verify file exists)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 2 | `feat(migration): upgrade to Angular 5.2.x` | package.json, src/, CHANGES.md | ng test |
| 3 | `feat(migration): upgrade to Angular 6.1.x, RxJS 6, HttpClient` | package.json, src/**/*.service.ts, src/**/*.spec.ts | ng test |
| 4 | `feat(migration): upgrade to Angular 7.2.x` | package.json, src/ | ng test |
| 5 | `feat(migration): upgrade to Angular 8.4.x` | package.json, angular.json | ng test |
| 6 | `feat(migration): upgrade to Angular 9.1.x, enable Ivy` | package.json, tsconfig.json | ng test |
| 7 | `feat(migration): upgrade to Angular 10.2.x` | package.json | ng test |
| 8 | `feat(migration): upgrade to Angular 11.2.x` | package.json | ng test |
| 9 | `feat(migration): upgrade to Angular 12.2.x, migrate E2E to Cypress` | package.json, e2e/, cypress.json | ng test && ng e2e |
| 10 | `feat(migration): upgrade to Angular 13.3.x` | package.json | ng test && ng e2e |
| 11 | `feat(migration): upgrade to Angular 14.2.x, complete migration` | package.json, src/ | ng test && ng e2e |
| 12 | `docs(migration): add complete migration summary and changelog` | CHANGES.md, MIGRATION_SUMMARY.md | cat CHANGES.md |

---

## Success Criteria

### Verification Commands
```bash
# Verify Angular version
ng version  # Expected: Angular 14.2.x

# Verify dependencies
npm ls  # Expected: 0 peer dependency warnings

# Verify all tests pass
ng test --watch=false  # Expected: SUCCESS: 13 tests

# Verify E2E tests pass (with Cypress/Playwright)
ng e2e  # Expected: All specs passed

# Verify production build
ng build --prod  # Expected: Exit code 0, dist/ generated

# Verify git tags for rollback
git tag | grep "migration-complete"  # Expected: 10 tags (v5-v14)
```

### Final Checklist
- [ ] Angular version: 14.2.x (confirmed via `ng version`)
- [ ] All 13 unit tests passing
- [ ] All E2E tests passing (Cypress or Playwright)
- [ ] Production build successful
- [ ] No peer dependency warnings
- [ ] All deprecated packages replaced
  - [ ] angular2-busy → ngx-busy or equivalent
  - [ ] ng2-toastr → ngx-toastr
  - [ ] @angular/http → @angular/common/http
- [ ] HttpClient used throughout (no old Http)
- [ ] RxJS 6+ pipe() syntax used throughout
- [ ] Ivy enabled (default in Angular 14)
- [ ] All 10 git tags present for rollback
- [ ] CHANGES.md complete
- [ ] MIGRATION_SUMMARY.md created

---

## Notes

### Estimated Timeline
- **Task 1 (Research)**: 2-3 days
- **Tasks 2-4 (Angular 5-6)**: 3-4 weeks (RxJS migration is complex)
- **Tasks 5-8 (Angular 7-10)**: 6-8 weeks
- **Tasks 9-11 (Angular 11-14)**: 6-8 weeks
- **Task 12 (Cleanup)**: 2-3 days
- **Total**: 4-6 months

### Critical Breaking Changes by Version
| Angular Version | Major Breaking Changes |
|----------------|------------------------|
| 5 → 6 | RxJS 5→6 (pipe() syntax), HttpClient required, NgRx API |
| 6 → 7 | Minor, mostly TypeScript updates |
| 7 → 8 | Differential loading, CLI config changes |
| 8 → 9 | Ivy opt-in, TypeScript 3.8 |
| 9 → 10 | browserslist in package.json |
| 10 → 11 | TypeScript 4.0 |
| 11 → 12 | Protractor deprecated, use Cypress/Playwright |
| 12 → 13 | TypeScript 4.4 |
| 13 → 14 | View Engine removed, Ivy-only |

### Third-Party Library Replacements
| Old Package | New Package (Angular 14) | Migration Notes |
|-------------|--------------------------|-----------------|
| angular2-busy | ngx-busy or ng-busy | Find actively maintained alternative |
| ng2-toastr | ngx-toastr | Direct replacement |
| ng2-validation | @ngx-validator/core or manual | Check for Angular 14 compatible version |
| PrimeNG 4.1.3 | PrimeNG 14.x | Follow PrimeNG migration guide |
| ng-bootstrap 1.0.0-beta | @ng-bootstrap/angular-bootstrap 12.x | API changes, check docs |
| @stomp/ng2-stompjs | @stomp/rx-stompjs | WebSocket client for Angular 14 |

### Risk Areas
1. **RxJS 5→6 migration**: Most complex step, requires careful code review
2. **Third-party lib replacements**: May have API changes requiring code updates
3. **E2E migration (Angular 12)**: Protractor → Cypress/Playwright requires test rewrite
4. **jQuery dependencies**: nanoscroller and ripple.js may not work with Angular 14
5. **Material Design**: Beta version used, significant API changes expected

### Rollback Strategy
Each major version has a git tag:
- To rollback from Angular 6 to 5: `git checkout v5.0.0-migration-complete`
- To restart any version: Use the previous "complete" tag as baseline

### Dependencies Not Checked (Manual Review Required)
- Custom jQuery plugins (nanoscroller, ripple.js)
- Any internal npm packages not in public registry
- Environment-specific packages (check all entries in package.json)
