# Draft: Angular 4 → Angular 14+ Migration Plan

## Current State Analysis

### Project Overview
- **Project**: myGolf2u Portal (golf management application)
- **Current Angular Version**: 4.4.3 (released 2017)
- **Current Angular CLI**: 1.5.0
- **Current TypeScript**: 2.4.2
- **Current RxJS**: 5.4.3 (using deprecated import syntax)
- **Target**: Angular 14+ with Node.js 18.20.0 LTS support

### Current Dependencies Analysis
**Deprecated/Obsolete Packages:**
- `@angular/http` - deprecated in Angular 5+, removed in Angular 15
- `@ngrx/core` - deprecated, functionality merged into @ngrx/store
- `rxjs@5.4.3` - using old import syntax (`rxjs/add/operator/...`)
- `core-js@2.5.0` - using old polyfills approach
- `zone.js@0.8.16` - very old version

**Third-Party Libraries Requiring Updates:**
- `@angular/material@2.0.0-beta.11` → will become `@angular/material@14+` or `@angular/cdk@14+`
- `@angular/cdk@2.0.0-beta.11` → needs major update
- `@ng-bootstrap/ng-bootstrap@1.0.0-beta.5` → needs update to v10+
- `primeng@4.1.3` → needs update to v14+
- `ng2-toastr@4.1.2` → likely deprecated, consider replacements
- `angular2-busy@2.0.4` → likely needs replacement
- `ng2-validation@4.2.0` → likely deprecated
- `@stomp/ng2-stompjs@0.4.2` → needs update
- `bootstrap@4.0.0-beta.2` → very old beta, needs update to v5+
- `chart.js@2.6.0` → needs update
- `fullcalendar@3.4.0` → needs major update
- `quill@1.3.1` → may need update
- `jquery@3.1.1` → Angular moved away from jQuery dependency

### Architecture Observations
- Uses NgRx for state management (old API)
- Uses WebSocket (Stomp) for real-time features
- Uses Material Design components (old API)
- Multiple feature modules (admin, leaderboard, scoring, player, home)
- Lazy loading via routing modules
- Uses reactive forms (FormsModule imported)
- Custom Redux-like store with localStorage sync

### Key Breaking Changes Ahead (Angular 4 → 14)
1. **Http → HttpClient**: Complete HTTP layer rewrite
2. **RxJS 5 → RxJS 6+**: All import statements change, operators change
3. **NgRx API changes**: Store, Effects, Actions APIs all changed
4. **Material/CDK**: Component and API changes
5. **Zone.js**: Improved change detection, potential issues
6. **Module imports**: Many deprecated modules removed
7. **Animations**: Animation APIs changed
8. **Forms**: Validators and form control APIs evolved
9. **Router**: Guards and resolvers changed
10. **Testing**: TestBed and async utilities changed

## User Requirements (Confirmed)
- **Timeline**: Moderate - Weeks available (thorough approach acceptable)
- **Strategy**: Incremental upgrades (4→5→6→...→14)
- **Testing**: Test after EACH major version upgrade (not TDD during migration)
- **Dependencies**: Update existing libraries, replace only if broken
- **Node.js**: Already compatible with Angular 14 (no Node.js upgrade needed)
- **Critical Deprecated Libraries**: angular2-busy (loading), jQuery dependencies
- **Rollback Strategy**: Git tags/checkpoints after each major version
- **Test Updates**: Update and run 13 existing tests after each version upgrade

## Critical Libraries to Preserve
1. **angular2-busy** - Loading spinner functionality (CRITICAL)
2. **jQuery + plugins** - nanoscroller, custom ripple.js (CRITICAL)
3. **ng2-toastr** - Toast notifications (replace if broken)
4. **ng2-validation** - Form validation (replace if broken)

## Test Infrastructure Status
**✅ Test Infrastructure Exists**
- Framework: Karma + Jasmine for unit tests, Protractor + Jasmine for E2E
- Test files: 13 .spec.ts files (components, services, reducers, utilities)
- Coverage tools: karma-coverage-istanbul-reporter
- Migration: Tests will need updates but foundation is solid
- Key migration needs:
  - Replace MockBackend with HttpTestingController
  - Update TestBed imports
  - Maintain existing test structure

## Research Findings: Angular Upgrade Strategy

### Official Recommendations
1. **Cannot skip major versions** - Must upgrade sequentially
2. **Use ng-update** for automated migrations with `--create-commits`
3. **Path**: 4.4.3 → 5.x → 6.x → 7.x → 8.x → 9.x → 10.x → 11.x → 12.x → 13.x → 14.x
4. **Budget**: 2-3 weeks per major version for medium apps
5. **Estimated timeline**: 4-6 months total

### Key Breaking Changes by Version
- **5→6**: RxJS 6 migration (biggest change), HttpClient mandatory
- **8→9**: Ivy renderer introduction
- **11→12**: View Engine removed, Ivy-only
- **12→13**: Standalone components (dev preview)

### Third-Party Library Strategy
- Update Angular-related packages with ng-update
- Check each library for Angular 14 compatibility
- Fork/maintain if no updates available
- Replace abandonware with modern alternatives

### Automated Tools Available
- `ng-update @angular/core@<version> @angular/cli@<version>`
- Automatic code transformations via schematics
- `--create-commits` flag for safe rollback
