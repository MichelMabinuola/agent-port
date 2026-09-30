# Project: "Window is RAM" interactive portfolio/resume

## Concept
- Personal portfolio inspired by Lynn Fisher's resize-driven design (lynnandtonic.com)
- Core metaphor: the browser window width is physical memory (RAM)
- Resume sections are "pages" in memory; shrinking the window creates memory pressure and swaps sections out
- Owner background: database and Linux performance engineer (SingleStore, Linux memory management), based in Korea
- Tone: playful for general visitors, technically accurate for engineers

## Design direction
- Must feel like lynnandtonic.com: clean, bold and easy to navigate. Avoid generic card/dashboard UI.
- Current look: a sticky sidebar holds the name and a "page table" nav, where each section has a 4 KiB page address (`0x0000`, `0x1000`, …). On mobile the nav becomes a sticky top bar. Big bold headings, summary-first sections, label/content rows, one green accent color.
- Emoji `icon`s stay in `resume.json` but aren't rendered yet. They may come back on the swap chips.

## Tech stack (suggested)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for section animations
- Anthropic API for the agent (server-side only, never expose the key)
- Serverless functions + a key-value store (e.g. Vercel KV / Upstash Redis) for shared results
- Deploy on Vercel

## Content / data
- All resume content lives in one structured file (`src/content/resume.json`)
- Sections: About, Experience, Projects, Skills, Contact
- Each section has: id, title, icon, short summary, full content
- Use placeholder content for now; the owner will fill in real details later

## Feature 1: Window-as-RAM layout
- Top header: name, title, and a live readout "VmRSS ___ MB · VmSwap ___ MB"
- Physical memory bar showing how many sections fit at the current width
- Number of resident sections is derived from viewport width (full width = all resident, narrowest = 1)
- Eviction uses LRU: least recently viewed sections are swapped out first
- Track "last accessed" per section (when scrolled into view or clicked)
- Swapped sections move to a "/dev/swap" area at the bottom, shown as compact grayed chips
- Clicking a swapped chip "faults it in": short loading delay (~700ms), then it becomes resident and may evict another LRU section
- "TRIGGER GC FLUSH" button resets everything to resident
- Smooth animations when sections move between memory and swap
- Mobile: users can't resize, so provide a width/memory slider or a sensible default state
- Respect prefers-reduced-motion
- Support light and dark mode

## Feature 2: "query the leaf" agent
- Input box labeled "query the leaf" plus 3-4 suggested question chips
- Visitor asks a question about the owner (e.g. "Database performance experience?")
- Server-side API route sends the question + resume content to the Anthropic API
- Agent answers ONLY from resume content; if not covered, it says so ("Not on the resume")
- Agent response returns structured JSON: `{ answer, relevantSectionIds[] }`
- Relevant sections are faulted in from swap and highlighted; others stay swapped
- Rate limiting per IP plus a daily global cap to control API cost
- Short, friendly error state if the API fails or the limit is hit

## Feature 3: Share a result
- "Share this result" button under each answer
- Saves a snapshot to the KV store: question, answer, relevantSectionIds, timestamp
- Generates a short link: `/r/{shortId}`
- Opening the link restores the exact state (same question, same answer, same resident sections) without calling the API again
- Shared results expire after 30 days
- Open Graph preview (title = question, description = truncated answer) so links look good in Slack, KakaoTalk, email
- Copy-to-clipboard with a "Link copied" confirmation

## Feature 4: Owner insights (later / optional)
- Simple private view or log of questions asked and shared, so the owner can see what recruiters look for

## Non-functional
- Fast first load; the site must still read as a normal resume if JS fails
- Accessible: keyboard navigation, focus states, screen-reader labels on swap chips and buttons
- No API keys or secrets in client code
- Clean, readable code with components split by feature

## Build order
1. [x] Static resume page from the content file (plus the lynnandtonic-style redesign)
2. [ ] Window-as-RAM layout with LRU swap, fault-in, and flush
3. [ ] Agent API route + query box + section highlighting
4. [ ] Share snapshots, `/r/{id}` route, OG previews
5. [ ] Rate limiting, polish, mobile, accessibility

Update the checklist above as phases are completed.
