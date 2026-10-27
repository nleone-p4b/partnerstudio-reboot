# Architecture rules
- Homepage redesign primitives live in src/components/studio; shared motion and glass primitives keep interactions consistent.
- Contact capture is a deterministic client-side conversation using the existing send-contact-email function; free service questions use existing service content, without a new AI dependency.
- Physics loads on demand and decorative animation respects reduced motion and visibility to limit runtime work.
- About and Services share a cyclic conveyor with scroll-linked movement, pointer inertia, accessible arrows and complete-text dialogs to keep content horizontal.
- The network constellation belongs to the hero and expands only one category at a time; physics containment is enforced by a separately tested pose clamp.