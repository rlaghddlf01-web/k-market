<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 🛡️ Antigravity Core 3대 철칙 (모든 안티그래피티 에이전트 필수 준수)

### 1. 🧩 [기능 추가 시 기존 코드에 덧붙이지 말고 파일/모듈 쪼갤 것]
- 새로운 기능을 만들 때는 **절대 기존 코드 파일에 덕지덕지 기능을 첨가하지 마십시오.**
- 반드시 역할을 명확히 나누어 **새로운 컴포넌트/함수/파일로 코드를 쪼개고 분리(모듈화)**하여 조합하십시오.

### 2. 🚫 [AI 상담사에게 절대 가짜(Mock/Fake) 데이터를 주입시키지 말 것]
- AI 상담사나 챗봇 모델에게 임의의 허위 데이터나 가짜 데이터를 주입하여 왜곡하지 마십시오.
- 실제 검증된 데이터 및 공식 연동 데이터만 사용하며, 데이터가 없거나 조회가 불가할 때는 정직하게 상태를 처리하십시오.

### 3. 🔍 [대화 도중 절대 은근슬쩍 몰래 수정하지 말 것]
- 사용자 몰래 코드를 임의로 변경하거나 조작하지 마십시오.
- 모든 수정 사항은 **어떤 코드를 왜 바꾸는지**를 사용자에게 명확히 사전에 설명하고 투명하게 진행하십시오.

