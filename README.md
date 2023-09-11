<div align='center'> 
  <h1> Soom-GPT </h1>

`OpenAI`, `Replicate`을 이용해 `Next.js 13 App Router` 로 구현한 `AIaaS` 웹앱 (챗봇, 소셜로그인 포함)

  <p>
    The project's README provides an introduction to the Soom-GPT project, which appears to be a web application that interacts with the GPT model. The README contains setup instructions, environment variables, and other essential details for getting started with the project.
  </p>
</div>

<h4 align="center">
  <a href="https://gpt.soom.today">View Demo</a>
</h4>

### About The Project

<p>
  <img src="https://img.shields.io/badge/Replicate-000000?style=flat-square&logo=farfetch&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next%2Ejs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-4D2B1A?style=flat-square&logo=Ameba&logoColor=white"/>
  <img src="https://img.shields.io/badge/Papago-2DB400?style=flat-square&logo=bower&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>
  <img src="https://img.shields.io/badge/Radix UI-161618?style=flat-square&logo=radixui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

> #### 주의 사항
>
> 1. AI API 호출시 타임아웃이 발생할 수 있습니다. 이는 `Vercel Freetier` 에서 허용된 응답시간을 초과해서 발생한 상황으로 이를 해결하는 Workaround는 두가지가 있습니다.
>
>    - Localhost 접근: `git`을 클론한 뒤 로컬에서 `.env.example`, `prisma schema`를 참고해서 작업 (localhost에서는 function 타임아웃이 없기 때문에 정상적으로 작동)
>    - 짧은 응답 시간의 질문: Demonstration용이기 때문에 기능 확인 용으로 짧은 응답타임의 간단한 질문만 시도
>
>    결론적으로 포트폴리오 용이기 때문에 짧은 응답의 질문을 하는 것을 권장합니다.
>
> 2. 결재는 실제로 진행되지 않는 샘플이기 때문에 임의의 카드번호 (e.g. 4242-4242-4242-4242) 등을 입력해도 가상 결재 프로세스가 진행됩니다. 결재 후에는 ai 요청 limit이 풀린것을 확인할 수 있습니다. Abusing 발생 할 경우를 대비해 일정 이상의 반복된 요청은 블록이 진행됩니다.
> 3. 현재 개발 환경 보존을 위해 컨테이너 정보를 Docker 폴더에 저장하였습니다. 개발 환경 접근은 `docker-compose.yml` 을 통해 진행할 수 있습니다.

---

#### 1. Application Layouts:

- **Auth Layout:** This layout seems to handle authentication-related components and functionalities.
- **Dashboard Layout:** A layout dedicated to the user's dashboard, possibly where they can view and manage their interactions with the GPT model.
- **Home Layout:** The main landing page of the application, which includes both the layout and the page content.

#### 2. API Routes:

- **Code Route:** Handles API requests related to code.
- **Conversation Route:** Manages API interactions for conversations.
- **Image Route:** Deals with image-related API requests.
- **Music Route:** Manages music-related API interactions.
- **Video Route:** Handles video-related API requests.

#### 3. Components:

- **General Components:** The project includes general components like `Empty`, `Heading`, and `Loader` which might be used throughout the application.
- **Chat Component:** There's a `CrispChat` component, suggesting the application might have a chat feature.
- **Home Components:** Components like `LandingContent` and `LandingHero` are specifically designed for the home or landing page.
- **Modal Component:** The `ModalProvider` component suggests the application uses modals for certain interactions.
- **Sidebar Component:** The `Navbar` component indicates the presence of a navigation bar, likely on the side of the application.

#### 4. Libraries and Utilities:

- **API Limit:** A utility to handle API rate limits.
- **OpenAI:** A library or utility to interact with the OpenAI API, suggesting that the application directly communicates with the GPT model via OpenAI.

This summary provides a high-level overview of the Soom-GPT project's structure and functionalities. For a detailed understanding, diving deeper into the codebase and documentation would be recommended.

---

### Project Tree

```
📦 soom-gpt
├─ .env.example
├─ README.md
├─ app
│  ├─ (auth)
│  │  ├─ (routes)
│  │  │  ├─ sign-in
│  │  │  │  └─ [[...sign-in]]
│  │  │  │     └─ page.tsx
│  │  │  └─ sign-up
│  │  │     └─ [[...sign-up]]
│  │  │        └─ page.tsx
│  │  └─ layout.tsx
│  ├─ (dashboard)
│  │  ├─ (routes)
│  │  │  ├─ code
│  │  │  │  └─ page.tsx
│  │  │  ├─ conversation
│  │  │  │  └─ page.tsx
│  │  │  ├─ dashboard
│  │  │  │  └─ page.tsx
│  │  │  ├─ image
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ music
│  │  │  │  └─ page.tsx
│  │  │  ├─ settings
│  │  │  │  └─ page.tsx
│  │  │  └─ video
│  │  │     └─ page.tsx
│  │  └─ layout.tsx
│  ├─ (home)
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ code
│  │  │  └─ route.ts
│  │  ├─ conversation
│  │  │  └─ route.ts
│  │  ├─ image
│  │  │  └─ route.ts
│  │  ├─ music
│  │  │  └─ route.ts
│  │  ├─ stripe
│  │  │  └─ route.ts
│  │  ├─ video
│  │  │  └─ route.ts
│  │  └─ webhook
│  │     └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  └─ layout.tsx
├─ assets
│  ├─ empty.svg
│  ├─ logo-letter.png
│  └─ logo.png
├─ components.json
├─ components
│  ├─ Empty.tsx
│  ├─ Heading.tsx
│  ├─ Loader.tsx
│  ├─ SubscriptionButton.tsx
│  ├─ avatar
│  │  ├─ BotAvatar.tsx
│  │  ├─ UserAvatar.tsx
│  │  └─ index.ts
│  ├─ chat
│  │  ├─ CrispChat.tsx
│  │  └─ CrispProvider.tsx
│  ├─ home
│  │  ├─ LandingContent.tsx
│  │  ├─ LandingHero.tsx
│  │  ├─ LandingNavbar.tsx
│  │  └─ index.ts
│  ├─ modal
│  │  ├─ ModalProvider.tsx
│  │  └─ ProModal.tsx
│  ├─ sidebar
│  │  ├─ MobileSidebar.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ index.ts
│  ├─ subscription
│  │  └─ FreeCounter.tsx
│  ├─ toaster
│  │  └─ ToasterProvider.tsx
│  └─ ui
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ dialog.tsx
│     ├─ form.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ progress.tsx
│     ├─ select.tsx
│     └─ sheet.tsx
├─ constants.ts
├─ hooks
│  └─ useProModal.tsx
├─ lib
│  ├─ apiLimit.ts
│  ├─ openai.ts
│  ├─ papago.ts
│  ├─ prismadb.ts
│  ├─ replicate.ts
│  ├─ stripe.ts
│  ├─ subscription.ts
│  └─ utils.ts
├─ middleware.ts
├─ package.json
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ logo.png
└─ tsconfig.json
```

---

<h4 align="center">
  Developed by SOOM
</h4>
