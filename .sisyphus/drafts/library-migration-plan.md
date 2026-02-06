# Angular 14 Library Migration Plan

## Overview

This document provides a comprehensive mapping of all dependencies in the myGolf2u Portal (Angular 4.4.3) to their Angular 14 compatible versions, including replacement packages, breaking changes, and migration steps.

**Current Version**: Angular 4.4.3  
**Target Version**: Angular 14.2.x  
**Generated**: 2026-02-06

---

## Package Migration Table

### Angular Core Packages (Automatic via ng-update)

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| @angular/animations | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/cdk | 2.0.0-beta.11 | ~14.2.x | NO | Major | ng-update handles |
| @angular/common | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/compiler | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/compiler-cli | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/core | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/flex-layout | 2.0.0-beta.10 | ~14.0.0-beta.40 | NO | Major | Update via ng-update |
| @angular/forms | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/http | ~4.4.3 | **REMOVE** | YES - Deprecate | Removed in Angular 6 | Replace with @angular/common/http |
| @angular/material | 2.0.0-beta.11 | ~14.2.x | NO | Major | ng-update handles, API changes |
| @angular/platform-browser | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/platform-browser-dynamic | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/platform-server | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |
| @angular/router | ~4.4.3 | ~14.2.x | NO | Major | ng-update handles |

### NgRx State Management

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| @ngrx/core | 1.2.0 | **REMOVE** | YES - Deprecate | Package deprecated | Remove, functionality in @ngrx/store |
| @ngrx/effects | 2.0.3 | ~14.3.x | NO | Major | Update to latest @ngrx/effects |
| @ngrx/store | 2.2.2 | ~14.3.x | NO | Major | Update to latest @ngrx/store |
| @ngrx/store-devtools | 3.2.4 | ~14.3.x | NO | Major | Update to latest @ngrx/store-devtools |
| ngrx-store-localstorage | 0.1.5 | ~14.0.x | NO | Major | Update to latest version |

### Third-Party UI Components

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| primeng | 4.1.3 | ~14.2.x | NO | **MAJOR** | See PrimeNG Migration Section below |
| @ng-bootstrap/ng-bootstrap | 1.0.0-beta.5 | @ng-bootstrap/angular-bootstrap ~12.x | YES - Rename | Major API changes | See ng-bootstrap Migration Section |
| angular2-busy | 2.0.4 | **ng-busy ~14.x** | YES - Replace | API changes | See angular2-busy Migration Section |
| ng2-toastr | 4.1.2 | **ngx-toastr ~14.x** | YES - Replace | Import path, API changes | See ng2-toastr Migration Section |
| ng2-validation | 4.2.0 | **@ngx-validator/core** or manual | YES - Replace | API changes | See ng2-validation Migration Section |

### WebSocket

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| @stomp/ng2-stompjs | 0.4.2 | **@stomp/rx-stompjs** | YES - Replace | API changes | See @stomp Migration Section |

### JavaScript Libraries (Generally Compatible)

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| bootstrap | 4.0.0-beta.2 | ~5.3.x | Recommended | Major CSS changes | Update to Bootstrap 5 if compatible with design |
| chart.js | 2.6.0 | ~4.x | Recommended | Major API changes | ng2-charts wrapper may need update |
| fullcalendar | 3.4.0 | ~5.x or ~6.x | Recommended | Major API changes | @fullcalendar/angular wrapper |
| jquery | 3.1.1 | ~3.7.x | NO | Minor | Test compatibility, update if needed |
| nanoscroller | 0.8.7 | **RISK** | Check | May not work with Angular 14 | See jQuery Plugins Section |
| quill | 1.3.1 | ~1.3.x or ngx-quill | Recommended | Minor | Consider ngx-quill for Angular integration |
| font-awesome | 4.7.0 | ~6.x or use alternative | Recommended | Major breaking changes | Consider free alternatives |
| mdi | 2.0.46 | ~7.x | Recommended | Icon set changes | Test migration |
| material-design-icons | 3.0.1 | **Risk** | Check | May not work | Consider alternative |
| moment | 2.22.2 | ~2.29.x or date-fns | Optional | No breaking changes | Consider date-fns for tree-shaking |
| immutable | 3.8.1 | ~4.x | Recommended | API changes | Test thoroughly |

### Core Development Dependencies

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| rxjs | 5.4.3 | ~7.x | NO | **MAJOR** | See RxJS Migration Section |
| typescript | 2.4.2 | ~4.6.x | NO | Major | ng-update handles |
| zone.js | 0.8.16 | ~0.11.x or ~0.12.x | NO | Major | ng-update handles |
| webpack | 3.8.1 | **Handled by CLI** | NO | N/A | Angular CLI bundles webpack |

### Testing Framework

| Package | Current Version | Angular 14 Version | Replacement Needed | Breaking Changes | Migration Steps |
|---------|----------------|-------------------|-------------------|------------------|-----------------|
| karma | ~1.7.0 | ~6.x | NO | Major | ng-update handles |
| karma-jasmine | ~1.1.0 | ~5.x | NO | Major | ng-update handles |
| jasmine-core | ~2.7.0 | ~4.x or ~5.x | NO | Major | ng-update handles |
| protractor | 5.4.1 | **REMOVE** | YES - Cypress | Deprecated in Angular 12+ | See E2E Migration Section |
| @angular/cli | 1.5.0 | ~14.2.x | NO | Major | ng-update handles |

---

## Detailed Migration Guides

### 1. angular2-busy → ng-busy

**Status**: Required replacement  
**Angular 14 Version**: ng-busy ~14.x

#### Breaking Changes:
- Import path changes from `angular2-busy` to `ng-busy`
- Directive name: `angular2-busy` → `ngBusy`
- Module import: `Angular2BusyModule` → `NgBusyModule`
- Configuration options may differ

#### Migration Steps:

1. Install ng-busy (during Angular 14 upgrade):
```bash
npm install --save ng-busy@^14.0.0
```

2. Update imports in app.module.ts:
```typescript
// OLD
import { Angular2BusyModule } from 'angular2-busy';

// NEW
import { NgBusyModule } from 'ng-busy';
```

3. Update module imports:
```typescript
// OLD
@NgModule({
  imports: [
    Angular2BusyModule
  ]
})

// NEW
@NgModule({
  imports: [
    BrowserAnimationsModule,  // Required
    NgBusyModule
  ]
})
```

4. Add CSS to angular.json:
```json
"styles": [
  "node_modules/ng-busy/src/style/busy.css",
  ...
]
```

5. Update component usage:
```typescript
// OLD - Directive syntax may differ
<div [angular2-busy]="busy">...</div>

// NEW - Use ngBusy directive
<div [ngBusy]="busy">...</div>
```

#### API Changes:
- The directive and service APIs are similar but not identical
- Check ng-busy documentation for configuration differences
- May need to adjust busy template/customizations

---

### 2. ng2-toastr → ngx-toastr

**Status**: Required replacement  
**Angular 14 Version**: ngx-toastr ~14.x (latest 19.x but 14.x for Angular 14)

#### Breaking Changes:
- Import path changes
- Toast position options changed
- Animation options changed
- Default styling differences

#### Migration Steps:

1. Install ngx-toastr:
```bash
npm install --save ngx-toastr@^14.0.0
```

2. Update app.module.ts:
```typescript
// OLD
import { ToastrModule } from 'ng2-toastr';

// NEW
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})
```

3. Add CSS to angular.json:
```json
"styles": [
  "node_modules/ngx-toastr/toastr.css"
]
```

4. Update component imports:
```typescript
// OLD
import { ToastrService } from 'ng2-toastr';

// NEW
import { ToastrService } from 'ngx-toastr';
```

5. Update toast calls (API mostly compatible, but check options):
```typescript
// Options may have slightly different names
this.toastrService.success('Success message', 'Title');
this.toastrService.error('Error message', 'Title');
```

#### API Changes:
- Position options: 'top-right', 'bottom-right', etc.
- Animation options changed
- Progress bar options changed
- Check ngx-toastr docs for exact API

---

### 3. PrimeNG 4.1.3 → PrimeNG 14.x

**Status**: Major upgrade required  
**Angular 14 Version**: primeng ~14.2.x

#### Breaking Changes (Major):
- DataTable completely rewritten multiple times
- Dialog component API changes
- Theming system changed (v18+ has new theming, but v14 still uses old system)
- Many component template/API changes
- Input/Output properties renamed
- CSS classes changed

#### Migration Steps:

1. Update PrimeNG during ng-update process:
```bash
# Angular 14 upgrade will handle this
npm install primeng@^14.2.0
```

2. Review PrimeNG migration guides:
- Official: https://primeng.org/migration
- For v14: Check migration guide for v5-v14 incremental updates

3. Update imports (usually just version number changes):
```typescript
import { DataTableModule } from 'primeng/datatable';
import { DialogModule } from 'primeng/dialog';
// ... other imports remain similar
```

4. Update templates (MAJOR work):
- DataTable columns restructured
- Dialog templates changed
- Many component input/output properties renamed

5. Update theming:
```scss
// OLD theme paths may change
@import '~primeng/resources/themes/omega/theme.css';
@import '~primeng/resources/primeng.css';

// NEW for PrimeNG 14
@import '~primeng/resources/themes/lara-light-blue/theme.css';
@import '~primeng/resources/primeng.css';
@import '~primeicons/primeicons.css';
```

#### Component-Specific Changes:

**DataTable (p-table)**
- Column template structure changed
- Pagination inputs changed
- Filtering inputs changed

**Dialog (p-dialog)**
- `[show]` → `[visible]`
- Event names changed

**Checklist:**
- [ ] Read PrimeNG migration guide for each version 5-14
- [ ] Update all component templates
- [ ] Update theme imports
- [ ] Test all PrimeNG components thoroughly
- [ ] Consider PrimeNG PRO support for complex migrations

---

### 4. ng-bootstrap 1.0.0-beta → @ng-bootstrap/angular-bootstrap

**Status**: Package renamed  
**Angular 14 Version**: @ng-bootstrap/angular-bootstrap ~12.x or ~13.x

#### Breaking Changes:
- Package name changed
- Major API changes between v1 and v12+
- Many component inputs/outputs renamed
- Some components replaced or redesigned

#### Migration Steps:

1. Install new package:
```bash
npm uninstall @ng-bootstrap/ng-bootstrap
npm install --save @ng-bootstrap/angular-bootstrap@^12.0.0
```

2. Update app.module.ts:
```typescript
// OLD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// NEW
import { NgbModule } from '@ng-bootstrap/angular-bootstrap';
```

3. Update component imports:
```typescript
// Import paths remain similar but check each component
import { NgbModal, NgbPanel } from '@ng-bootstrap/angular-bootstrap';
```

4. Review ng-bootstrap migration guide:
- https://ng-bootstrap.github.io/#/home
- Check changelog for breaking changes between v1 and v12

#### API Changes:
- Modal configuration options changed
- Accordion/route APIs changed
- Datepicker has major changes
- Check each component used in the project

---

### 5. ng2-validation → @ngx-validator/core or Manual

**Status**: Uncertain replacement  
**Angular 14 Version**: Manual validation or @ngx-validator/core

#### Breaking Changes:
- ng2-validation may not have Angular 14 compatible version
- Validation directives approach is outdated in Angular 14

#### Migration Steps:

**Option 1: Use @ngx-validator/core**
```bash
npm install --save @ngx-validator/core
```
Research if this meets requirements.

**Option 2: Migrate to Angular Reactive Forms**
```typescript
// OLD - ng2-validation directives
<input [ngModel]="email" validation-email />

// NEW - Angular 14 Reactive Form validators
this.form = fb.group({
  email: ['', [Validators.required, Validators.email]]
});
```

**Option 3: Custom Validators**
Create custom validators matching ng2-validation behavior:
```typescript
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(control.value) ? null : { email: true };
}
```

#### Recommendation:
Migrate to Angular Reactive Forms with built-in validators - this is the Angular 14 best practice.

---

### 6. @stomp/ng2-stompjs → @stomp/rx-stompjs

**Status**: Required replacement  
**Angular 14 Version**: @stomp/rx-stompjs

#### Breaking Changes:
- Package renamed and rewritten
- API changes
- RxJS 6+ integration

#### Migration Steps:

1. Install new package:
```bash
npm uninstall @stomp/ng2-stompjs
npm install --save @stomp/rx-stompjs
```

2. Update service imports:
```typescript
// OLD
import { StompService } from '@stomp/ng2-stompjs';

// NEW
import { RxStompService } from '@stomp/rx-stompjs';
```

3. Update WebSocket configuration:
```typescript
// OLD
@Injectable()
export class MyService {
  constructor(private stompService: StompService) {
    this.stompService.config = {...};
  }
}

// NEW
@Injectable()
export class MyService {
  constructor(private rxStompService: RxStompService) {
    this.rxStompService.stompClient.configure({...});
  }
}
```

4. Update subscription patterns:
```typescript
// OLD
this.stompService.subscribe('/topic/messages');

// NEW - RxJS 6+ pipe syntax
this.rxStompService.watch('/topic/messages').pipe(
  // operators
);
```

---

### 7. RxJS 5.4.3 → 7.x

**Status**: Major breaking change (happens in Angular 6 upgrade)  
**Angular 14 Version**: ~7.x

#### Breaking Changes (RxJS 5 → 6):
- `.map()`, `.filter()`, etc. → `.pipe(map(), filter())`
- Import syntax changes
- Many operators renamed

#### Migration Steps:

1. Angular 6 upgrade will install rxjs-compat temporarily:
```bash
npm install rxjs-compat
```

2. Run automated migration tool:
```bash
npx rxjs-tslint -p tsconfig.json
```

3. Update imports:
```typescript
// OLD - RxJS 5
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// NEW - RxJS 6+
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
```

4. Update operators:
```typescript
// OLD
this.http.get(url)
  .map(data => data.results)
  .filter(item => item.active)
  .subscribe();

// NEW - Use pipe()
this.http.get(url).pipe(
  map(data => data.results),
  filter(item => item.active)
).subscribe();
```

5. Remove rxjs-compat after migration:
```bash
npm uninstall rxjs-compat
```

#### RxJS 6 → 7 (Angular 14):
- Mostly compatible, minor deprecations
- Update to RxJS 7 during Angular 14 upgrade
- No major breaking changes

---

### 8. @angular/http → @angular/common/http

**Status**: Deprecated in Angular 6, removed in Angular 14  
**Replacement**: HttpClient

#### Breaking Changes:
- `Http` → `HttpClient`
- `Response` parsing automatic
- `Request` options changed
- Interceptors API different

#### Migration Steps:

1. Update service imports:
```typescript
// OLD
import { Http } from '@angular/http';

// NEW
import { HttpClient } from '@angular/common/http';
```

2. Update service injection:
```typescript
// OLD
constructor(private http: Http) {}

// NEW
constructor(private http: HttpClient) {}
```

3. Update HTTP calls:
```typescript
// OLD
this.http.get(url)
  .map(res => res.json())
  .subscribe(data => {...});

// NEW - JSON parsing automatic
this.http.get(url).subscribe(data => {...});
```

4. Update request options:
```typescript
// OLD
let headers = new Headers({'Content-Type': 'application/json'});
let options = new RequestOptions({ headers: headers });

// NEW
let headers = new HttpHeaders({'Content-Type': 'application/json'});
let options = { headers: headers };
```

5. Update tests (see Testing section)

---

### 9. Protractor → Cypress/Playwright

**Status**: Deprecated in Angular 12+  
**Replacement**: Cypress (recommended) or Playwright

#### Breaking Changes:
- Complete rewrite of E2E tests
- Different syntax and approach
- Different configuration

#### Migration Steps:

1. Angular 12 upgrade will prompt for E2E framework choice
2. Choose Cypress (recommended) or Playwright
3. Remove Protractor:
```bash
npm uninstall protractor
```

4. Install Cypress:
```bash
npm install --save-dev cypress
ng add @cypress/schematic
```

5. Rewrite E2E tests in Cypress syntax:
```typescript
// OLD - Protractor
describe('My App', () => {
  it('should display title', () => {
    browser.get('/');
    expect(element(by.css('h1')).getText()).toEqual('My App');
  });
});

// NEW - Cypress
describe('My App', () => {
  it('should display title', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'My App');
  });
});
```

---

### 10. jQuery Dependencies (nanoscroller, ripple.js)

**Status**: HIGH RISK  
**Action Required**: Manual testing and possible replacement

#### Issues:
- jQuery plugins may not work with Angular 14's Ivy renderer
- nanoscroller hasn't been updated since 2017
- Direct DOM manipulation conflicts with Angular

#### Migration Options:

**Option 1: Test thoroughly**
- Keep jQuery but test extensively with Angular 14
- May work but no guarantee

**Option 2: Find Angular-native replacements**
- nanoscroller → Angular CDK Scroll or ngx-scrollbar
- ripple.js → Material Design ripple or custom directive

**Option 3: Custom implementation**
- Implement scroll/ripple in pure Angular

---

## Test Migration

### MockBackend → HttpClientTestingModule

#### Breaking Changes:
- `MockBackend` deprecated
- `MockConnection` deprecated
- New testing module: `HttpClientTestingModule`

#### Migration Steps:

1. Update test imports:
```typescript
// OLD
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// NEW
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
```

2. Update test setup:
```typescript
// OLD
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
      MyService,
      { provide: Http, useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions] },
      MockBackend,
      BaseRequestOptions
    ]
  });
});

// NEW
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MyService]
  });
});
```

3. Update test assertions:
```typescript
// OLD
it('should get data', inject([MyService, MockBackend], (service, backend) => {
  backend.connections.subscribe((conn: MockConnection) => {
    conn.mockRespond(new Response(new ResponseOptions({body: mockData})));
  });
  service.getData().subscribe(data => expect(data).toEqual(mockData));
}));

// NEW
it('should get data', inject([MyService, HttpTestingController], (service, httpMock) => {
  service.getData().subscribe(data => expect(data).toEqual(mockData));
  const req = httpMock.expectOne('/api/data');
  req.flush(mockData);
  httpMock.verify();
}));
```

---

## Risk Assessment

### High Risk Packages (Manual Work Required)

1. **nanoscroller** - Last updated 2017, unlikely to work with Angular 14
   - **Risk**: Very High
   - **Action**: Replace with ngx-scrollbar or CDK Scroll

2. **angular2-busy** → **ng-busy**
   - **Risk**: Medium
   - **Action**: API changes, test thoroughly

3. **ng2-validation**
   - **Risk**: High
   - **Action**: Migrate to Reactive Forms validators

4. **PrimeNG** 4 → 14
   - **Risk**: High
   - **Action**: Major breaking changes, 10 version jumps

5. **jQuery ripple.js**
   - **Risk**: Medium
   - **Action**: Test or replace with Angular solution

### Medium Risk Packages

1. **ng-bootstrap** 1 → 12
   - **Action**: API changes, check each component

2. **@stomp/ng2-stompjs** → **@stomp/rx-stompjs**
   - **Action**: API changes, rewrite WebSocket services

3. **Material Design** beta → stable
   - **Action**: Many API changes

---

## Migration Checklist by Angular Version

### Pre-Migration (Task 1)
- [ ] Complete research (this document)
- [ ] Verify all packages have Angular 14 versions
- [ ] Document manual code changes needed
- [ ] Estimate timeline for each package migration

### Angular 5 Upgrade (Task 2)
- [ ] Update all @angular packages to ~5.2.x
- [ ] Update TypeScript to ~2.4.x
- [ ] Fix any deprecation warnings
- [ ] Run tests

### Angular 6 Upgrade (Task 3)
- [ ] **CRITICAL**: Migrate RxJS 5 → 6
- [ ] **CRITICAL**: Replace @angular/http with HttpClient
- [ ] Update all tests to use HttpClientTestingModule
- [ ] Install rxjs-compat, run migration tool, remove rxjs-compat
- [ ] Update @ngrx packages to ~6.x
- [ ] Run all 13 tests

### Angular 7-10 Upgrades (Tasks 4-7)
- [ ] Sequential version upgrades
- [ ] Update TypeScript each version
- [ ] Update third-party libs gradually
- [ ] Run tests after each version

### Angular 11 Upgrade (Task 8)
- [ ] Update TypeScript to ~4.0.x
- [ ] Update Material/CDK
- [ ] Run tests

### Angular 12 Upgrade (Task 9)
- [ ] **CRITICAL**: Migrate E2E tests from Protractor to Cypress
- [ ] Remove protractor from package.json
- [ ] Install Cypress
- [ ] Rewrite E2E tests
- [ ] Run unit tests and E2E tests

### Angular 13 Upgrade (Task 10)
- [ ] Update TypeScript to ~4.4.x
- [ ] Update all third-party libs
- [ ] Run tests

### Angular 14 Upgrade (Task 11)
- [ ] **CRITICAL**: Replace all deprecated packages:
  - [ ] angular2-busy → ng-busy
  - [ ] ng2-toastr → ngx-toastr
  - [ ] ng2-validation → Reactive Forms
  - [ ] @stomp/ng2-stompjs → @stomp/rx-stompjs
- [ ] Update PrimeNG to ~14.2.x
- [ ] Update ng-bootstrap to @ng-bootstrap/angular-bootstrap
- [ ] Update RxJS to ~7.x
- [ ] Test jQuery dependencies
- [ ] Run all 13 unit tests
- [ ] Run E2E tests
- [ ] Production build

---

## Package Summary Statistics

- **Total Dependencies**: 47 (dependencies) + 18 (devDependencies) = 65 packages
- **Automatic Updates**: ~20 (Angular core, RxJS, TypeScript via ng-update)
- **Manual Replacements**: 6 critical packages
  - angular2-busy, ng2-toastr, ng2-validation, @stomp/ng2-stompjs, @angular/http, protractor
- **High Risk**: 5 packages (nanoscroller, PrimeNG, ng2-validation, Material, jQuery plugins)
- **Medium Risk**: 7 packages (ng-bootstrap, @stomp, RxJS, ng2-toastr)

## Estimated Migration Timeline

Based on complexity:

| Task | Estimated Time |
|------|---------------|
| Task 1: Research | **2-3 days** |
| Task 2: Angular 5 upgrade | 3-5 days |
| Task 3: Angular 6 + RxJS + HttpClient | **2-3 weeks** |
| Tasks 4-8: Angular 7-11 | 6-8 weeks |
| Task 9: Angular 12 + E2E migration | **2-3 weeks** |
| Task 10: Angular 13 | 1-2 weeks |
| Task 11: Angular 14 + package replacements | **3-4 weeks** |
| Task 12: Cleanup and documentation | 2-3 days |
| **Total** | **4-6 months** |

---

## Success Criteria

After migration complete:

1. All packages updated to Angular 14 compatible versions
2. All 13 unit tests passing with HttpClientTestingModule
3. All E2E tests passing with Cypress
4. Production build succeeds
5. No peer dependency warnings
6. jQuery dependencies tested and working (or replaced)
7. Application runs in browser without errors

---

**Document Status**: ✅ Complete  
**Next Step**: Proceed to Task 2 - Angular 4.4.3 → 5.x upgrade
