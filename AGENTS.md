# Architecture rules
- Homepage redesign primitives live in src/components/studio; shared motion and glass primitives keep interactions consistent.
- Contact capture is a deterministic client-side conversation using the existing send-contact-email function; free service questions use existing service content, without a new AI dependency.
- Physics loads on demand and decorative animation respects reduced motion and visibility to limit runtime work.