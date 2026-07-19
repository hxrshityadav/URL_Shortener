# Graph Report - c:\Users\yadav\OneDrive\Desktop\URL Shortener  (2026-07-19)

## Corpus Check
- 121 files · ~107,461 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 636 nodes · 1296 edges · 37 communities (33 shown, 4 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pricing & Plan Config
- JWT & Security Filter
- Redirect Handling
- NPM Frontend Dependencies
- URL Shortener API
- Analytics APIs
- Build & Lint Config
- Razorpay Payment Integration
- Frontend Pages & Components
- Core Application Layout
- Auth & Registration DTOs
- Extra Frontend Pages & Backgrounds
- User Subscription Info
- Dashboard Pages & Views
- Router & Layout Views
- Cookie & Privacy Management
- Maven Wrapper Script
- Pricing Page & Error Handling
- Security Exception Handling
- Auth Integration Tests
- Shorten Form Components
- CORS Configuration
- Fluid Motion Background
- Application Main Class
- Application Context Tests
- Shader Background Effect
- Landing Page Component
- Mock & Dummy Data
- Documentation
- Maven Project Definition

## God Nodes (most connected - your core abstractions)
1. `useStoreContext()` - 47 edges
2. `User` - 45 edges
3. `UrlMappingService` - 34 edges
4. `SubscriptionService` - 25 edges
5. `UserService` - 20 edges
6. `UrlMapping` - 19 edges
7. `UserRepository` - 17 edges
8. `UrlMappingController` - 16 edges
9. `RazorpayPaymentService` - 14 edges
10. `ClickEventRepository` - 12 edges

## Surprising Connections (you probably didn't know these)
- `AnalyticsController` --references--> `SubscriptionService`  [EXTRACTED]
  Backend/src/main/java/com/url/shortener/controller/AnalyticsController.java → Backend/src/main/java/com/url/shortener/service/SubscriptionService.java
- `AnalyticsController` --references--> `UrlMappingService`  [EXTRACTED]
  Backend/src/main/java/com/url/shortener/controller/AnalyticsController.java → Backend/src/main/java/com/url/shortener/service/UrlMappingService.java
- `AnalyticsController` --references--> `UserService`  [EXTRACTED]
  Backend/src/main/java/com/url/shortener/controller/AnalyticsController.java → Backend/src/main/java/com/url/shortener/service/UserService.java
- `PaymentController` --references--> `UserService`  [EXTRACTED]
  Backend/src/main/java/com/url/shortener/controller/PaymentController.java → Backend/src/main/java/com/url/shortener/service/UserService.java
- `RedirectController` --references--> `UrlMappingService`  [EXTRACTED]
  Backend/src/main/java/com/url/shortener/controller/RedirectController.java → Backend/src/main/java/com/url/shortener/service/UrlMappingService.java

## Import Cycles
- None detected.

## Communities (37 total, 4 thin omitted)

### Community 0 - "Pricing & Plan Config"
Cohesion: 0.06
Nodes (42): GetMapping, RequestMapping, RequiredArgsConstructor, ResponseEntity, RestController, PricingController, AllArgsConstructor, Data (+34 more)

### Community 1 - "JWT & Security Filter"
Cohesion: 0.08
Nodes (32): AuthenticationConfiguration, HttpServletRequest, HttpServletResponse, Override, RequiredArgsConstructor, UserDetailsService, JwtAuthenticationFilter, HttpServletRequest (+24 more)

### Community 2 - "Redirect Handling"
Cohesion: 0.06
Nodes (25): GetMapping, HttpServletRequest, RequiredArgsConstructor, ResponseEntity, RestController, RedirectController, ClickEventDTO, Data (+17 more)

### Community 3 - "NPM Frontend Dependencies"
Cohesion: 0.04
Nodes (49): axios, chart.js, dayjs, @emotion/react, @emotion/styled, framer-motion, dependencies, axios (+41 more)

### Community 4 - "URL Shortener API"
Cohesion: 0.12
Nodes (21): GetMapping, HttpServletRequest, HttpServletResponse, PostMapping, PreAuthorize, Principal, RequestMapping, RequiredArgsConstructor (+13 more)

### Community 5 - "Analytics APIs"
Cohesion: 0.10
Nodes (28): AnalyticsController, GetMapping, PreAuthorize, Principal, RequestMapping, RequiredArgsConstructor, ResponseEntity, RestController (+20 more)

### Community 6 - "Build & Lint Config"
Cohesion: 0.05
Nodes (36): autoprefixer, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, autoprefixer (+28 more)

### Community 7 - "Razorpay Payment Integration"
Cohesion: 0.11
Nodes (17): PostMapping, PreAuthorize, Principal, RequestMapping, RequiredArgsConstructor, ResponseEntity, RestController, PaymentController (+9 more)

### Community 8 - "Frontend Pages & Components"
Cohesion: 0.10
Nodes (20): AboutPage(), blockConfig, AboutStatsSection(), parseTarget(), statValues, CustomerReviewsSection(), initials(), REVIEW_IDS (+12 more)

### Community 9 - "Core Application Layout"
Cohesion: 0.11
Nodes (21): App(), AppRouter(), SubDomainRouter(), CursorDot(), LanguageSwitcher(), ContextProvider(), getStoredTheme(), bundles (+13 more)

### Community 10 - "Auth & Registration DTOs"
Cohesion: 0.13
Nodes (18): AuthController, AllArgsConstructor, PostMapping, RequestMapping, ResponseEntity, RestController, Data, LoginRequest (+10 more)

### Community 11 - "Extra Frontend Pages & Backgrounds"
Cohesion: 0.20
Nodes (10): AccessibilityPage(), CookiePage(), Graph(), ErrorPage(), Loader(), NavBar(), PrivacyPage(), TermsPage() (+2 more)

### Community 12 - "User Subscription Info"
Cohesion: 0.24
Nodes (13): GetMapping, PreAuthorize, Principal, RequestMapping, RequiredArgsConstructor, ResponseEntity, RestController, SubscriptionController (+5 more)

### Community 13 - "Dashboard Pages & Views"
Cohesion: 0.30
Nodes (10): AnalyticsPage(), fmt(), DashboardHome(), EditLinkPage(), authHeaders(), downloadAnalyticsCsv(), fetchLinkAnalytics(), useFetchAnalyticsBreakdown() (+2 more)

### Community 14 - "Router & Layout Views"
Cohesion: 0.20
Nodes (7): CreateLinkPage(), DashboardLayout(), Footer(), LoginPage(), ShortenUrlPage(), SignupPage(), PrivateRoute()

### Community 15 - "Cookie & Privacy Management"
Cohesion: 0.36
Nodes (8): getInitialPrefs(), parsePrefs(), PrivacyManagerPage(), defaultSecure(), getCookie(), isBrowser(), removeCookie(), setCookie()

### Community 16 - "Maven Wrapper Script"
Cohesion: 0.33
Nodes (6): mvnw script, clean(), die(), exec_maven(), set_java_home(), verbose()

### Community 17 - "Pricing Page & Error Handling"
Cohesion: 0.39
Nodes (7): computePrice(), formatMoney(), loadRazorpayScript(), PlanCard(), PricingSection(), usePlans(), extractApiErrorMessage()

### Community 18 - "Security Exception Handling"
Cohesion: 0.43
Nodes (6): AuthenticationExceptionControllerAdvice, ResponseEntity, BadCredentialsException, ExceptionHandler, ProblemDetail, RestControllerAdvice

### Community 19 - "Auth Integration Tests"
Cohesion: 0.48
Nodes (5): AutoConfigureMockMvc, AuthLoginMvcTest, SpringBootTest, Test, MockMvc

### Community 20 - "Shorten Form Components"
Cohesion: 0.43
Nodes (3): CreateNewShorten(), TextField(), fadeUpMountProps()

### Community 21 - "CORS Configuration"
Cohesion: 0.53
Nodes (4): Bean, Configuration, WebConfig, CorsConfigurationSource

### Community 22 - "Fluid Motion Background"
Cohesion: 0.40
Nodes (4): DARK_THEME_COLORS, FluidMotionBackground(), LIGHT_THEME_COLORS, rand()

### Community 23 - "Application Main Class"
Cohesion: 0.50
Nodes (3): UrlShortenerSbApplication, README.md, SpringBootApplication

### Community 24 - "Application Context Tests"
Cohesion: 0.60
Nodes (3): SpringBootTest, Test, UrlShortenerSbApplicationTests

### Community 25 - "Shader Background Effect"
Cohesion: 0.50
Nodes (3): DEFAULT_COLORS, HomeShaderBackground(), rand()

## Knowledge Gaps
- **69 isolated node(s):** `com.url:url-shortener-sb`, `STARTER`, `PRO`, `BUSINESS`, `NOT_FOUND` (+64 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `Pricing & Plan Config` to `JWT & Security Filter`, `Redirect Handling`, `URL Shortener API`, `Analytics APIs`, `Razorpay Payment Integration`, `Auth & Registration DTOs`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `UserService` connect `Auth & Registration DTOs` to `Pricing & Plan Config`, `JWT & Security Filter`, `URL Shortener API`, `Analytics APIs`, `Razorpay Payment Integration`, `User Subscription Info`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `JwtUtils` connect `JWT & Security Filter` to `Auth & Registration DTOs`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `com.url:url-shortener-sb`, `STARTER`, `PRO` to the rest of the system?**
  _69 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pricing & Plan Config` be split into smaller, more focused modules?**
  _Cohesion score 0.059154929577464786 - nodes in this community are weakly interconnected._
- **Should `JWT & Security Filter` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `Redirect Handling` be split into smaller, more focused modules?**
  _Cohesion score 0.06095791001451379 - nodes in this community are weakly interconnected._