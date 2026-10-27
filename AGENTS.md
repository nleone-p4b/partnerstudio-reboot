# Architecture rules
- Homepage redesign primitives live in src/components/studio; shared motion and glass primitives keep interactions consistent.
- Contact capture is a deterministic client-side conversation using the existing send-contact-email function; free service questions use existing service content, without a new AI dependency.
- Physics loads on demand and decorative animation respects reduced motion and visibility to limit runtime work.
- The site is a single desktop screen (>=1280px, no page scroll): navbar, badge, sphere constellation, physics pills and CTA row; mobile and portrait tablet stack and scroll normally.
- Chi Siamo, Servizi and Partnership live in navbar dialogs instead of page sections; the three sector spheres expand into an overlay card carrying each sector's services.
- The sphere constellation belongs to the hero and expands only one sector at a time; physics containment is enforced by a separately tested pose clamp and pills keep a fixed angle so they stack instead of overlapping.
- Dialog content must not use the liquid-glass class: it sets position:relative and wins over Tailwind's fixed utility.