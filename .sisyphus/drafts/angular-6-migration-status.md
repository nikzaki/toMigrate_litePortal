# Angular 4 → 6 Migration Status

**Last Updated**: 2026-02-07
**Current Version**: Angular 6.1.10 (Work In Progress)
**Starting Version**: Angular 4.4.3

---

## ✅ Completed Tasks

### 1. Pre-Migration Research
- All 65 packages mapped with Angular 6 compatible versions
- Breaking changes documented
- Migration plan created
- Document saved to: `.sisyphus/drafts/library-migration-plan.md`

### 2. Package Updates (package.json)
**Angular Core Packages**:
- `@angular/animations`: ~4.4.3 → ~6.1.10 ✓
- `@angular/common`: ~4.4.3 → ~6.1.10 ✓
- `@angular/compiler`: ~4.4.3 → ~6.1.10 ✓
- `@angular/compiler-cli`: ~4.4.3 → ~6.1.10 ✓
- `@angular/core`: ~4.4.3 → ~6.1.10 ✓
- `@angular/forms`: ~4.4.3 → ~6.1.10 ✓
- `@angular/http`: ~4.4.3 → ~6.1.10 ✓
- `@angular/platform-browser`: ~4.4.3 → ~6.1.10 ✓
- `@angular/platform-browser-dynamic`: ~4.4.3 → ~6.1.10 ✓
- `@angular/router`: ~4.4.3 → ~6.1.10 ✓
- `@angular/language-service`: ~4.4.3 → ~6.1.10 ✓

**Material & CDK**:
- `@angular/material`: 2.0.0-beta.11 → ~6.4.7 ✓
- `@angular/cdk`: ~2.0.0-beta.12 → ~6.4.7 ✓
- `@angular/flex-layout`: (removed) → ~6.0.0-beta.18 ✓

**RxJS**:
- `rxjs`: 5.4.3 → 6.6.7 ✓
- `rxjs-compat`: (added) → ^6.6.7 ✓

**NgRx**:
- `@ngrx/effects`: 2.0.3 → ~6.1.0 ✓
- `@ngrx/store`: 2.2.2 → ~6.1.0 ✓
- `@ngrx/store-devtools`: 3.2.4 → ~6.1.0 ✓
- `@ngrx/core`: 1.2.0 → (removed, deprecated) ✓

**Third-Party Libraries**:
- `@ng-bootstrap/ng-bootstrap`: 1.0.0-beta.5 → ~4.0.0 ✓ (needs fix)
- `primeng`: 4.1.3 → ^6.1.4 ✓
- `ngx-toastr`: (new, replacing ng2-toastr) → ^9.1.2 ✓
- `font-awesome`: 4.7.0 → ^4.7.0 ✓
- `@stomp/ng2-stompjs`: 0.4.2 → (removed) ✓
- `web-animations-js`: 2.3.1 → ^2.3.2 ✓
- `ng-busy`: (new, replacing angular2-busy) → ^1.4.8 ✓ (needs fix)

**DevDependencies**:
- `@angular/cli`: 1.5.0 → ~6.2.9 ✓
- `@angular-devkit/build-angular`: 21.1.3 → 0.13.10 ✓ (corrected for Angular 6)
- `typescript`: ~2.4.2 → ~2.9.2 ✓
- `ts-node`: ~4.1.0 → ~7.0.1 ✓
- `tslint`: ~5.9.1 → ~5.11.0 ✓
- `karma`: ~1.7.1 → ~2.0.5 ✓
- `codelyzer`: ~4.0.1 → ~4.5.0 ✓

### 3. Configuration Changes
- `.angular-cli.json` → `angular.json` ✓
- Project structure updated for Angular 6 ✓
- Builder configurations migrated ✓

### 4. Git Safety
- Created tag: `v4.4.3-pre-migration` ✓
- Created tag: `v4.4.3-before-v6-jump` ✓
- Created tag: `v6.1.10-wip` (current progress) ✓

---

## ⚠️ Remaining Issues

### Critical Blockers (Build Failing)

1. **webpack 4 Missing**
   - Error: `Cannot destructure property 'createHash' of 'undefined' or 'null'`
   - Cause: mini-css-extract-plugin incompatible without webpack 4
   - Fix: `npm install webpack@4.46.0 --save-dev --legacy-peer-deps`

2. **ng-bootstrap Version Mismatch**
   - Current: `@ng-bootstrap/ng-bootstrap@4.2.2` (requires Angular 7+)
   - Need: `@ng-bootstrap/ng-bootstrap@3.3.1` (for Angular 6)
   - Fix: `npm install @ng-bootstrap/ng-bootstrap@3.3.1 --legacy-peer-deps`

3. **ng-busy Version Mismatch**
   - Current: `ng-busy@1.4.8` (requires Angular 5)
   - Need: Find Angular 6 compatible version or replace with alternative
   - Options:
     - Try `ng-busy@2.0.0` (if available)
     - Use `ngx-busy` instead
     - Replace with `@ngneat/hot-toast` or similar

4. **npm Install Incomplete**
   - Error: ENOTEMPTY (Windows file locking in node_modules/.staging)
   - Cause: Repeated npm install attempts with `--ignore-scripts`
   - Fix:
     ```bash
     rm -rf node_modules/.staging
     rm -rf node_modules
     npm install --legacy-peer-deps
     ```

### Code Changes Needed

1. **RxJS Import Migration** (5 → 6)
   - Old: `.map()`, `.filter()`, `.switchMap()` (chain operators)
   - New: `.pipe(map(), filter(), switchMap())` (pipeable operators)
   - Estimate: ~50-100 files need updates
   - Automated tool available: `rxjs-tslint`

2. **HttpClient Migration** (optional for Angular 6)
   - Old: `import { Http } from '@angular/http'`
   - New: `import { HttpClient } from '@angular/common/http'`
   - Note: @angular/http still works in Angular 6 but deprecated

3. **Third-Party Library Import Updates**
   - `angular2-busy` → `ng-busy` (already in package.json)
   - `ng2-toastr` → `ngx-toastr` (already in package.json)
   - `@stomp/ng2-stompjs` → need replacement (removed from package.json)

4. **Test Updates**
   - Update TestBed configurations for Angular 6
   - Fix MockBackend usage (deprecated, use HttpClientTestingModule)
   - Update RxJS testing patterns (pipeable operators)

---

## 🔧 Immediate Next Steps

### Step 1: Fix Peer Dependencies
```bash
# Install webpack 4
npm install webpack@4.46.0 --save-dev --legacy-peer-deps

# Downgrade ng-bootstrap for Angular 6
npm install @ng-bootstrap/ng-bootstrap@3.3.1 --legacy-peer-deps

# Fix ng-busy (try v2 or replace)
npm install ng-busy@2.0.0 --legacy-peer-deps
# OR replace with alternative
```

### Step 2: Complete npm Install
```bash
rm -rf node_modules/.staging
rm -rf node_modules
npm install --legacy-peer-deps
```

### Step 3: Verify Build
```bash
npx ng build
```

### Step 4: Fix RxJS Imports (Automated)
```bash
npx rxjs-tslint
```

### Step 5: Update Tests
```bash
npm run test
```

---

## 📊 Progress

- **Task 1 (Research)**: ✅ 100% Complete
- **Task 2 (Angular 5)**: ⏭️ Skipped (Node.js 18 incompatibility)
- **Task 3 (Angular 6)**: 🟡 70% Complete
  - Package updates: ✅ 100%
  - Configuration: ✅ 100%
  - Dependencies: ⚠️ 80% (peer dependency issues)
  - Code changes: ❌ 0% (pending)
  - Tests: ❌ 0% (pending)
  - Build verification: ❌ Blocked by dependencies

**Overall Migration**: ~25% Complete (Angular 4 → 6 of 14 total versions)

---

## 📝 Notes

### Node.js Compatibility
- **Node.js 18.20.1**: Compatible with Angular 6+ ✅
- **Angular 5 Issue**: Angular CLI 1.7.4 (for Angular 5) incompatible with Node.js 18
- **Decision**: Skip Angular 5, jump to Angular 6

### Windows-Specific Issues
- npm staging directory ENOTEMPTY errors (file locking)
- Workaround: Use `--ignore-scripts` flag (causes other issues)
- Better approach: Close all node processes before npm install

### Migration Complexity
- **Breaking Changes**: High (RxJS 5→6 is major breaking change)
- **Estimated Time**: 2-3 weeks for Angular 6 (if proceeding from here)
- **Total Estimated**: 4-6 months for full migration (Angular 4 → 14)

---

## 🏷️ Git Tags

- `v4.4.3-pre-migration`: Starting point before any changes
- `v4.4.3-before-v6-jump`: After Angular 5 attempt, before Angular 6 jump
- `v6.1.10-wip`: Current progress (Angular 6 packages updated, build broken)

---

## 🚦 Rollback Instructions

If needed, rollback to previous stable state:

```bash
# Rollback to Angular 4.4.3 (before migration)
git checkout v4.4.3-pre-migration
npm install

# Rollback to Angular 6 WIP (current state)
git checkout v6.1.10-wip
npm install --legacy-peer-deps
```

---

**Status**: Ready for peer dependency fixes and code migration
**Next Action**: Fix webpack 4, ng-bootstrap, ng-busy versions
**Estimated Completion**: 2-3 weeks (if continuing from current state)
