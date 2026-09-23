// This used to be a byte-for-byte duplicate of src/components/Navbar.tsx —
// two separate copies of the entire navbar (mega menu, cart badge, search
// box, mobile drawer, everything), which is also why /products pages were
// rendering two navbars stacked on top of each other (this one from
// products/layout.tsx, plus the root layout's own copy). Re-exporting the
// real one fixes both: a single navbar, and one place to maintain it (e.g.
// the search box wiring) instead of two that silently drift apart.
export { default } from "@/components/Navbar";
