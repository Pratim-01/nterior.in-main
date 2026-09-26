"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import {
    Search,
    User,
    Heart,
    ShoppingCart,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    LogOut,
} from "lucide-react";

import {
    NAV_CATEGORIES,
    type NavCategoryGroup as Category,
    type NavCategoryColumn as MegaMenuColumn,
} from "@/lib/product-navigation";
import { getLeafItemHref } from "@/lib/category-taxonomy";
import { useCart } from "@/lib/cart-context";
import AuthModal from "@/components/AuthModal";

/* =========================================================
   CATEGORY DATA — see src/lib/product-navigation.ts
========================================================= */

const categories: Category[] = NAV_CATEGORIES;

/* =========================================================
   CATEGORY PAGE URL
========================================================= */

function getCategoryHref(categoryName: string) {
    const slugMap: Record<string, string> = {
        "Tiles": "tiles",
        "Electricals": "electricals",
        "Power & Hand Tools": "power-hand-tools",
        "Plywood & Laminates": "plywood-laminates",
        "Hardware": "hardware",
        "Paints": "paints",
        "Lighting & Fans": "lighting-fans",
        "Bathroom": "bathroom",
        "Sofa and Dining": "sofa-dining",
        "Plumbing": "plumbing",
        "Kitchen": "kitchen",
        "Appliances": "appliances",
    };

    const slug =
        slugMap[categoryName] ??
        categoryName
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/\s+/g, "-");

    return `/products/items/${slug}`;
}

/* =========================================================
   PRODUCT CATEGORY URL
========================================================= */

// Every leaf item already has a real `/products/items/<folder>/...` page —
// its folder's dedicated page or that folder's generic subcategory
// catch-all (see getLeafItemHref in category-taxonomy.ts) — so this always
// lands on a real listing with its own filters, not the bare
// `/products?category=` fallback. That fallback only kicks in for a name
// that isn't in the navbar taxonomy at all.
function getProductCategoryHref(
    category: string
) {
    return getLeafItemHref(category);
}

/* =========================================================
   MEGA MENU COLUMN DISTRIBUTION
========================================================= */

function distributeMegaMenuColumns(
    groups: MegaMenuColumn[],
    columnCount: number
): MegaMenuColumn[][] {
    const columns: MegaMenuColumn[][] =
        Array.from(
            { length: columnCount },
            () => []
        );

    const heights = Array.from(
        { length: columnCount },
        () => 0
    );

    const sortedGroups = [...groups].sort(
        (a, b) =>
            b.items.length - a.items.length
    );

    sortedGroups.forEach((group) => {
        let shortestColumn = 0;

        for (
            let index = 1;
            index < columnCount;
            index++
        ) {
            if (
                heights[index] <
                heights[shortestColumn]
            ) {
                shortestColumn = index;
            }
        }

        columns[shortestColumn].push(group);

        heights[shortestColumn] +=
            group.items.length + 2.5;
    });

    return columns;
}

/* =========================================================
   MEGA MENU COLUMN
========================================================= */

function MegaMenuColumnStack({
    groups,
}: {
    groups: MegaMenuColumn[];
}) {
    return (
        <div
            className="
                flex
                min-w-0
                flex-col
                gap-4
            "
        >
            {groups.map((group) => (
                <div
                    key={group.title}
                    className="min-w-0"
                >
                    <h4
                        className="
                            mb-1
                            text-[13px]
                            font-bold
                            leading-5
                            text-[rgb(207,0,6)]
                        "
                    >
                        {group.title}
                    </h4>

                    <div className="flex flex-col">
                        {group.items.map(
                            (item) => (
                                <Link
                                    key={item}
                                    href={getProductCategoryHref(
                                        item
                                    )}
                                    className="
                                        group/item
                                        flex
                                        min-h-6
                                        items-center
                                        rounded-md
                                        px-2
                                        py-0.5
                                        text-[13px]
                                        leading-5
                                        text-gray-500
                                        transition-all
                                        duration-150
                                        hover:bg-red-50
                                        hover:text-[rgb(207,0,6)]
                                    "
                                >
                                    <span>
                                        {item}
                                    </span>

                                    <ChevronRight
                                        size={12}
                                        className="
                                            ml-1
                                            shrink-0
                                            opacity-0
                                            transition-all
                                            duration-150
                                            group-hover/item:translate-x-0.5
                                            group-hover/item:opacity-100
                                        "
                                    />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* =========================================================
   SEARCH SUGGESTIONS — debounced autocomplete dropdown, shared
   between the desktop and mobile search boxes below.
========================================================= */

function useSearchSuggestions(term: string, enabled: boolean) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const trimmed = term.trim();
        if (!enabled || trimmed.length < 2) {
            setSuggestions([]);
            return;
        }

        let cancelled = false;
        const timer = setTimeout(() => {
            fetch(`/api/search/suggest?q=${encodeURIComponent(trimmed)}`)
                .then((res) => (res.ok ? res.json() : null))
                .then((data: { suggestions?: string[] } | null) => {
                    if (!cancelled) setSuggestions(data?.suggestions ?? []);
                })
                .catch(() => {
                    if (!cancelled) setSuggestions([]);
                });
        }, 200);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [term, enabled]);

    return suggestions;
}

function SearchSuggestionsDropdown({
    suggestions,
    activeIndex,
    onHover,
    onSelect,
}: {
    suggestions: string[];
    activeIndex: number;
    onHover: (index: number) => void;
    onSelect: (suggestion: string) => void;
}) {
    if (suggestions.length === 0) return null;

    return (
        <ul
            role="listbox"
            className="
                absolute
                left-0
                right-0
                top-full
                z-50
                mt-2
                max-h-80
                overflow-y-auto
                rounded-2xl
                border
                border-gray-100
                bg-white
                py-1.5
                shadow-xl
            "
        >
            {suggestions.map((suggestion, index) => (
                <li key={suggestion} role="option" aria-selected={index === activeIndex}>
                    <button
                        type="button"
                        // onMouseDown (not onClick) fires before the input's
                        // blur, and preventDefault stops focus from moving
                        // off the input — otherwise blur would close this
                        // dropdown before the selection ever registers.
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onSelect(suggestion);
                        }}
                        onMouseEnter={() => onHover(index)}
                        className={`
                            flex
                            w-full
                            items-center
                            gap-3
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            capitalize
                            text-gray-700
                            transition
                            ${index === activeIndex
                                ? "bg-orange-50 text-gray-900"
                                : "hover:bg-gray-50"
                            }
                        `}
                    >
                        <Search size={15} className="shrink-0 text-gray-400" />
                        <span className="truncate">{suggestion}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { totalItems } = useCart();

    const isCrm =
        pathname === "/crm" ||
        pathname.startsWith("/crm/");
    const isProduct = !isCrm;

    // Desktop and mobile each get their own input so the two never fight
    // over focus/cursor position, but both submit to the same place.
    const [desktopSearchTerm, setDesktopSearchTerm] = useState("");
    const [mobileSearchTerm, setMobileSearchTerm] = useState("");

    // Always-current mirrors of the two terms above, read inside the
    // delayed callback in submitSearch (see the comment there) — a plain
    // closure over desktopSearchTerm/mobileSearchTerm would be frozen to
    // whatever they were at the moment submitSearch was called, not
    // whatever the visitor has typed since.
    const desktopTermRef = useRef("");
    const mobileTermRef = useRef("");

    // Suggestions dropdown state — one copy per input, same reasons as above.
    const [desktopFocused, setDesktopFocused] = useState(false);
    const [mobileFocused, setMobileFocused] = useState(false);
    const [desktopActiveIndex, setDesktopActiveIndex] = useState(-1);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(-1);

    // A blur fired right after submitting a search (the browser/router
    // briefly moving focus around during navigation) shouldn't be treated
    // the same as the visitor deliberately clicking away — so blur closes
    // the dropdown on a short delay, cancelled if focus comes straight
    // back. Selecting a suggestion (onMouseDown + preventDefault) never
    // triggers a real blur in the first place, so this doesn't affect that.
    const desktopBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mobileBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function focusSearch(which: "desktop" | "mobile") {
        const timer = which === "desktop" ? desktopBlurTimer : mobileBlurTimer;
        if (timer.current) clearTimeout(timer.current);
        if (which === "desktop") setDesktopFocused(true);
        else setMobileFocused(true);
    }

    function blurSearch(which: "desktop" | "mobile") {
        const timer = setTimeout(() => {
            if (which === "desktop") setDesktopFocused(false);
            else setMobileFocused(false);
        }, 150);
        if (which === "desktop") desktopBlurTimer.current = timer;
        else mobileBlurTimer.current = timer;
    }

    const desktopSuggestions = useSearchSuggestions(desktopSearchTerm, desktopFocused);
    const mobileSuggestions = useSearchSuggestions(mobileSearchTerm, mobileFocused);

    const showDesktopSuggestions = desktopFocused && desktopSuggestions.length > 0;
    const showMobileSuggestions = mobileFocused && mobileSuggestions.length > 0;

    function selectSuggestion(which: "desktop" | "mobile", suggestion: string) {
        if (which === "desktop") {
            setDesktopSearchTerm(suggestion);
            desktopTermRef.current = suggestion;
            setDesktopFocused(false);
            setDesktopActiveIndex(-1);
        } else {
            setMobileSearchTerm(suggestion);
            mobileTermRef.current = suggestion;
            setMobileFocused(false);
            setMobileActiveIndex(-1);
            setMobileMenu(false);
        }
        submitSearch(suggestion);
    }

    function handleSearchKeyDown(
        e: KeyboardEvent<HTMLInputElement>,
        which: "desktop" | "mobile"
    ) {
        const suggestions = which === "desktop" ? desktopSuggestions : mobileSuggestions;
        if (suggestions.length === 0) return;

        const activeIndex = which === "desktop" ? desktopActiveIndex : mobileActiveIndex;
        const setActiveIndex = which === "desktop" ? setDesktopActiveIndex : setMobileActiveIndex;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((activeIndex + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((activeIndex - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(which, suggestions[activeIndex]);
        } else if (e.key === "Escape") {
            setActiveIndex(-1);
            if (which === "desktop") setDesktopFocused(false);
            else setMobileFocused(false);
        }
    }

    function submitSearch(term: string) {
        const trimmed = term.trim();
        if (!trimmed) return;

        const params = new URLSearchParams();
        params.set("q", trimmed);

        // Navigate immediately with the plain search — resolveSearchFilters
        // (via /api/search/resolve) then layers the matching sub-category/
        // brand/thickness/grade checkboxes on top a moment later, once the
        // vocabulary lookup returns. If that call fails or is slow, the
        // plain `?q=` search below still returns the right products on its
        // own (see buildSearchClause in src/lib/product-query.ts) — this is
        // purely a UI precision upgrade, never a requirement for correct
        // results.
        router.push(`/search?${params.toString()}`);

        fetch(`/api/search/resolve?q=${encodeURIComponent(trimmed)}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data: { filters?: Record<string, string[]> } | null) => {
                // If the visitor has already typed something new into
                // either box since this search was submitted, applying
                // filters for the OLD term now would both be wrong and —
                // since it navigates — could steal focus right out from
                // under whatever they're typing next. Bail out instead.
                if (
                    desktopTermRef.current.trim() !== trimmed &&
                    mobileTermRef.current.trim() !== trimmed
                ) {
                    return;
                }

                const filters = data?.filters;
                if (!filters) return;
                const hasMatch = Object.values(filters).some((v) => v.length > 0);
                if (!hasMatch) return;

                const resolvedParams = new URLSearchParams();
                resolvedParams.set("q", trimmed);
                (["subCategory", "brand", "category", "thickness", "grade"] as const).forEach(
                    (key) => {
                        filters[key]?.forEach((value) => resolvedParams.append(key, value));
                    }
                );
                router.replace(`/search?${resolvedParams.toString()}`, { scroll: false });
            })
            .catch(() => {
                // Network hiccup — the plain `?q=` search already navigated
                // above, so there's nothing more to do here.
            });
    }

    function handleDesktopSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitSearch(desktopSearchTerm);
    }

    function handleMobileSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitSearch(mobileSearchTerm);
        setMobileMenu(false);
    }

    const { data: session } = useSession();
    const customerUser =
        session?.user?.accountType === "customer" ? session.user : null;

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!accountMenuOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(event.target as Node)
            ) {
                setAccountMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [accountMenuOpen]);

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const [
        openMobileCategory,
        setOpenMobileCategory,
    ] = useState<string | null>(null);

    const [
        desktopCategory,
        setDesktopCategory,
    ] = useState<string | null>(null);

    const desktopMenuCloseTimer =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    /* =======================================================
       DESKTOP MENU HELPERS
    ======================================================= */

    const clearDesktopMenuCloseTimer =
        () => {
            if (
                desktopMenuCloseTimer.current
            ) {
                clearTimeout(
                    desktopMenuCloseTimer.current
                );

                desktopMenuCloseTimer.current =
                    null;
            }
        };

    const closeDesktopMenuWithDelay =
        () => {
            clearDesktopMenuCloseTimer();

            desktopMenuCloseTimer.current =
                setTimeout(() => {
                    setDesktopCategory(null);
                }, 140);
        };

    const openDesktopCategory = (
        categoryName: string
    ) => {
        clearDesktopMenuCloseTimer();

        setDesktopCategory(
            categoryName
        );
    };

    const toggleDesktopCategory = (
        categoryName: string
    ) => {
        clearDesktopMenuCloseTimer();

        setDesktopCategory(
            (current) =>
                current === categoryName
                    ? null
                    : categoryName
        );
    };

    const activeDesktopCategory =
        categories.find(
            (category) =>
                category.name ===
                desktopCategory
        );

    /* =======================================================
       MOBILE CATEGORY
    ======================================================= */

    const toggleMobileCategory = (
        categoryName: string
    ) => {
        setOpenMobileCategory(
            (current) =>
                current === categoryName
                    ? null
                    : categoryName
        );
    };

    return (
        <>
            {/* =========================================================
                MAIN NAVBAR
            ========================================================= */}

            <header
                className="
                    fixed
                    inset-x-0
                    top-0
                    z-50
                    border-b
                    border-gray-100
                    bg-white/95
                    shadow-sm
                    backdrop-blur-xl
                "
            >
                <div className="mx-auto w-full max-w-[1920px]">

                    {/* =================================================
                        DESKTOP MAIN BAR
                    ================================================= */}

                    <div
                        className="
                            hidden
                            h-16
                            min-w-0
                            items-center
                            px-4
                            lg:grid
                            lg:grid-cols-[auto_minmax(240px,1fr)_auto]
                            lg:gap-5
                            xl:px-6
                        "
                    >
                        <div
                            className="
                                flex
                                min-w-0
                                shrink-0
                                items-center
                                gap-4
                                xl:gap-5
                            "
                        >
                            <Link
                                href="/"
                                className="
                                    group
                                    flex
                                    shrink-0
                                    items-center
                                "
                            >
                                <div
                                    className="
                                        relative
                                        -top-2
                                        mr-1
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <span
                                        className="
                                            absolute
                                            inline-flex
                                            h-4
                                            w-4
                                            animate-ping
                                            rounded-full
                                            bg-[rgb(255,193,0)]
                                            opacity-80
                                        "
                                    />

                                    <span
                                        className="
                                            relative
                                            inline-flex
                                            h-4
                                            w-4
                                            rounded-full
                                            bg-[rgb(255,193,0)]
                                            shadow-[0_0_15px_rgba(255,193,0,.8)]
                                            transition
                                            group-hover:scale-110
                                        "
                                    />
                                </div>

                                <span
                                    className="
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-[rgb(207,0,6)]
                                    "
                                    style={{
                                        fontFamily:
                                            "Candal, sans-serif",
                                    }}
                                >
                                    nterior
                                </span>
                            </Link>

                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    rounded-full
                                    bg-gray-100
                                    p-1
                                "
                            >
                                <Link
                                    href="/products"
                                    className={`
                                        whitespace-nowrap
                                        rounded-full
                                        px-4
                                        py-2
                                        text-xs
                                        font-bold
                                        transition-all
                                        duration-300
                                        xl:px-6
                                        xl:py-2.5
                                        xl:text-sm
                                        ${isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    E-Commerce
                                </Link>

                                <Link
                                    href="/crm"
                                    className={`
                                        whitespace-nowrap
                                        rounded-full
                                        px-4
                                        py-2
                                        text-xs
                                        font-bold
                                        transition-all
                                        duration-300
                                        xl:px-6
                                        xl:py-2.5
                                        xl:text-sm
                                        ${!isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    CRM
                                </Link>
                            </div>
                        </div>

                        {/* SEARCH */}

                        <div className="min-w-0">
                            <form
                                role="search"
                                onSubmit={handleDesktopSearchSubmit}
                                className="relative"
                            >
                                <Search
                                    size={19}
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[rgb(255,170,0)]
                                    "
                                />

                                <input
                                    type="search"
                                    value={desktopSearchTerm}
                                    onChange={(e) => {
                                        setDesktopSearchTerm(e.target.value);
                                        desktopTermRef.current = e.target.value;
                                        setDesktopActiveIndex(-1);
                                    }}
                                    onFocus={() => focusSearch("desktop")}
                                    onBlur={() => blurSearch("desktop")}
                                    onKeyDown={(e) => handleSearchKeyDown(e, "desktop")}
                                    placeholder="Search plywood, laminates, doorlocks..."
                                    aria-label="Search products"
                                    role="combobox"
                                    aria-expanded={showDesktopSuggestions}
                                    aria-autocomplete="list"
                                    autoComplete="off"
                                    className="
                                        h-12
                                        w-full
                                        min-w-0
                                        rounded-full
                                        border
                                        border-orange-100
                                        bg-orange-50/20
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-gray-800
                                        outline-none
                                        placeholder:text-gray-400
                                        transition
                                        focus:border-[rgb(255,170,0)]
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-yellow-200/40
                                    "
                                />

                                {showDesktopSuggestions && (
                                    <SearchSuggestionsDropdown
                                        suggestions={desktopSuggestions}
                                        activeIndex={desktopActiveIndex}
                                        onHover={setDesktopActiveIndex}
                                        onSelect={(s) => selectSuggestion("desktop", s)}
                                    />
                                )}
                            </form>
                        </div>

                        {/* ACTIONS */}

                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-2
                            "
                        >
                            <div className="relative" ref={accountMenuRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        customerUser
                                            ? setAccountMenuOpen((v) => !v)
                                            : setAuthModalOpen(true)
                                    }
                                    className="
                                        flex
                                        h-11
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-gray-200
                                        bg-white
                                        px-5
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        transition
                                        hover:border-[rgb(255,170,0)]
                                        hover:bg-orange-50
                                    "
                                >
                                    <User size={18} />

                                    <span className="hidden xl:inline max-w-[120px] truncate">
                                        {customerUser
                                            ? customerUser.name?.split(" ")[0] || "Account"
                                            : "Login"}
                                    </span>
                                </button>

                                {customerUser && accountMenuOpen && (
                                    <div
                                        className="
                                            absolute
                                            right-0
                                            top-[calc(100%+8px)]
                                            z-50
                                            w-48
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-gray-100
                                            bg-white
                                            shadow-xl
                                        "
                                    >
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {customerUser.name}
                                            </p>
                                            <p className="text-xs text-gray-400 truncate">
                                                {customerUser.email}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setAccountMenuOpen(false);
                                                signOut({ redirect: false });
                                            }}
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-2
                                                px-4
                                                py-3
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                transition
                                                hover:bg-red-50
                                                hover:text-[rgb(207,0,6)]
                                            "
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* <button
                                type="button"
                                aria-label="Wishlist"
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-gray-200
                                    bg-white
                                    text-gray-700
                                    transition
                                    hover:border-[rgb(255,170,0)]
                                    hover:bg-orange-50
                                "
                            >
                                <Heart size={20} />
                            </button> */}

                            <Link
                                href="/cart"
                                aria-label="Cart"
                                className="
                                    relative
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-gray-200
                                    bg-white
                                    text-gray-700
                                    transition
                                    hover:border-[rgb(255,170,0)]
                                    hover:bg-orange-50
                                "
                            >
                                <ShoppingCart
                                    size={20}
                                />

                                {totalItems > 0 && (
                                    <span
                                        className="
                                            absolute
                                            -right-1
                                            -top-1
                                            flex
                                            h-5
                                            w-5
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[rgb(207,0,6)]
                                            text-[10px]
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* =================================================
                        DESKTOP CATEGORY BAR
                    ================================================= */}

                    <div
                        className="
                            relative
                            hidden
                            h-11
                            min-w-0
                            items-center
                            border-t
                            border-gray-100
                            lg:flex
                        "
                        onMouseLeave={
                            closeDesktopMenuWithDelay
                        }
                    >
                        <div
                            className="
                                flex
                                min-w-0
                                w-full
                                items-center
                                gap-2
                                overflow-x-auto
                                px-3
                                py-1
                                xl:gap-5.5
                                xl:px-5
                                [scrollbar-width:none]
                                [&::-webkit-scrollbar]:hidden
                            "
                        >
                            {categories.map(
                                (category) => {
                                    const isActive =
                                        desktopCategory ===
                                        category.name;

                                    const categoryHref =
                                        getCategoryHref(
                                            category.name
                                        );

                                    return (
                                        <div
                                            key={
                                                category.name
                                            }
                                            className="
                                                relative
                                                flex
                                                shrink-0
                                                items-center
                                            "
                                            onMouseEnter={() =>
                                                openDesktopCategory(
                                                    category.name
                                                )
                                            }
                                        >
                                            {/* CATEGORY NAME */}

                                            <Link
                                                href={
                                                    categoryHref
                                                }
                                                onClick={() =>
                                                    setDesktopCategory(
                                                        null
                                                    )
                                                }
                                                onFocus={() =>
                                                    openDesktopCategory(
                                                        category.name
                                                    )
                                                }
                                                className={`
                                                    group
                                                    relative
                                                    flex
                                                    items-center
                                                    whitespace-nowrap
                                                    py-1.5
                                                    text-xs
                                                    font-semibold
                                                    transition-all
                                                    duration-200
                                                    xl:text-sm
                                                    ${isActive
                                                        ? "text-[rgb(207,0,6)]"
                                                        : "text-gray-700 hover:text-[rgb(207,0,6)]"
                                                    }
                                                `}
                                            >
                                                <span>
                                                    {
                                                        category.name
                                                    }
                                                </span>

                                                <span
                                                    className={`
                                                        absolute
                                                        bottom-0
                                                        left-0
                                                        h-0.5
                                                        rounded-full
                                                        bg-[rgb(207,0,6)]
                                                        transition-all
                                                        duration-300
                                                        ${isActive
                                                            ? "w-full"
                                                            : "w-0"
                                                        }
                                                    `}
                                                />
                                            </Link>

                                            {/* DROPDOWN ARROW */}

                                            <button
                                                type="button"
                                                aria-label={`Open ${category.name} menu`}
                                                aria-expanded={
                                                    isActive
                                                }
                                                aria-haspopup="true"
                                                onClick={(
                                                    event
                                                ) => {
                                                    event.stopPropagation();

                                                    toggleDesktopCategory(
                                                        category.name
                                                    );
                                                }}
                                                className={`
                                                    ml-1
                                                    flex
                                                    h-7
                                                    w-6
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    text-gray-600
                                                    transition-all
                                                    duration-200
                                                    hover:bg-red-50
                                                    hover:text-[rgb(207,0,6)]
                                                    ${isActive
                                                        ? "text-[rgb(207,0,6)]"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                <ChevronDown
                                                    size={14}
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                    "
                                                    style={{
                                                        transform:
                                                            isActive
                                                                ? "rotate(180deg)"
                                                                : "rotate(0deg)",
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* =========================================================
                DESKTOP MEGA MENU
            ========================================================= */}

            {activeDesktopCategory && (
                <div
                    className="
                        fixed
                        inset-x-0
                        top-[108px]
                        z-[70]
                        border-b
                        border-gray-200
                        bg-white
                        shadow-[0_16px_40px_rgba(24,34,53,0.10)]
                        animate-[megaMenuIn_180ms_ease-out]
                    "
                    onMouseEnter={
                        clearDesktopMenuCloseTimer
                    }
                    onMouseLeave={
                        closeDesktopMenuWithDelay
                    }
                >
                    <div
                        className="
                            h-1
                            w-full
                            bg-gradient-to-r
                            from-[rgb(255,170,0)]
                            via-orange-500
                            to-[rgb(207,0,6)]
                        "
                    />

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-[1920px]
                            px-5
                            py-3
                            xl:px-8
                            xl:py-4
                            2xl:px-10
                        "
                    >
                        {/* 4 COLUMNS */}

                        <div
                            className="
                                grid
                                grid-cols-4
                                gap-x-6
                                lg:gap-x-7
                                xl:hidden
                            "
                        >
                            {distributeMegaMenuColumns(
                                activeDesktopCategory.columns,
                                4
                            ).map(
                                (
                                    column,
                                    index
                                ) => (
                                    <MegaMenuColumnStack
                                        key={index}
                                        groups={column}
                                    />
                                )
                            )}
                        </div>

                        {/* 6 COLUMNS */}

                        <div
                            className="
                                hidden
                                grid-cols-6
                                gap-x-7
                                xl:grid
                                2xl:hidden
                            "
                        >
                            {distributeMegaMenuColumns(
                                activeDesktopCategory.columns,
                                6
                            ).map(
                                (
                                    column,
                                    index
                                ) => (
                                    <MegaMenuColumnStack
                                        key={index}
                                        groups={column}
                                    />
                                )
                            )}
                        </div>

                        {/* 7 COLUMNS */}

                        <div
                            className="
                                hidden
                                grid-cols-7
                                gap-x-8
                                2xl:grid
                            "
                        >
                            {distributeMegaMenuColumns(
                                activeDesktopCategory.columns,
                                7
                            ).map(
                                (
                                    column,
                                    index
                                ) => (
                                    <MegaMenuColumnStack
                                        key={index}
                                        groups={column}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                MOBILE NAVBAR
            ========================================================= */}

            <div
                className="
                    fixed
                    inset-x-0
                    top-0
                    z-50
                    border-b
                    border-gray-100
                    bg-white/95
                    shadow-sm
                    backdrop-blur-xl
                    lg:hidden
                "
            >
                {/* MOBILE FIRST ROW */}

                <div
                    className="
                        flex
                        h-16
                        min-w-0
                        items-center
                        gap-2
                        px-3
                        sm:px-4
                    "
                >
                    {/* LOGO */}

                    <Link
                        href="/"
                        className="
                            group
                            flex
                            min-w-0
                            shrink-0
                            items-center
                        "
                    >
                        <div
                            className="
                                relative
                                -top-1
                                mr-1
                                flex
                                h-3
                                w-3
                                items-center
                                justify-center
                            "
                        >
                            <span
                                className="
                                    absolute
                                    inline-flex
                                    h-3
                                    w-3
                                    animate-ping
                                    rounded-full
                                    bg-[rgb(255,193,0)]
                                    opacity-70
                                "
                            />

                            <span
                                className="
                                    relative
                                    inline-flex
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-[rgb(255,193,0)]
                                "
                            />
                        </div>

                        <span
                            className="
                                text-lg
                                font-bold
                                tracking-tight
                                text-[rgb(207,0,6)]
                                sm:text-xl
                            "
                            style={{
                                fontFamily:
                                    "Candal, sans-serif",
                            }}
                        >
                            nterior
                        </span>
                    </Link>

                    {/* MODE SWITCH */}

                    <div
                        className="
                            mx-auto
                            flex
                            min-w-0
                            max-w-[220px]
                            flex-1
                            items-center
                            rounded-full
                            bg-gray-100
                            p-1
                        "
                    >
                        <Link
                            href="/products"
                            className={`
                                flex-1
                                rounded-full
                                px-2
                                py-2
                                text-center
                                text-[11px]
                                font-bold
                                transition
                                ${isProduct
                                    ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-md"
                                    : "text-gray-600"
                                }
                            `}
                        >
                            E-Commerce
                        </Link>

                        <Link
                            href="/crm"
                            className={`
                                flex-1
                                rounded-full
                                px-2
                                py-2
                                text-center
                                text-[11px]
                                font-bold
                                transition
                                ${!isProduct
                                    ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-md"
                                    : "text-gray-600"
                                }
                            `}
                        >
                            CRM
                        </Link>
                    </div>

                    {/* MOBILE ACTIONS */}

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                        "
                    >
                        {/* <button
                            type="button"
                            aria-label="Wishlist"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                        >
                            <Heart size={19} />
                        </button> */}

                        <button
                            type="button"
                            aria-label={customerUser ? "Account" : "Login"}
                            onClick={() =>
                                customerUser
                                    ? signOut({ redirect: false })
                                    : setAuthModalOpen(true)
                            }
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                        >
                            {customerUser ? <LogOut size={19} /> : <User size={19} />}
                        </button>

                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="
                                relative
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                        >
                            <ShoppingCart size={19} />

                            {totalItems > 0 && (
                                <span
                                    className="
                                        absolute
                                        -right-0.5
                                        -top-0.5
                                        flex
                                        h-4
                                        w-4
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[rgb(207,0,6)]
                                        text-[9px]
                                        font-bold
                                        text-white
                                    "
                                >
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </Link>

                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() =>
                                setMobileMenu(true)
                            }
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                        >
                            <Menu size={23} />
                        </button>
                    </div>
                </div>

                {/* MOBILE SEARCH */}

                <div className="px-3 pb-3 sm:px-4">
                    <form
                        role="search"
                        onSubmit={handleMobileSearchSubmit}
                        className="relative"
                    >
                        <Search
                            size={18}
                            className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-[rgb(255,170,0)]
                            "
                        />

                        <input
                            type="search"
                            value={mobileSearchTerm}
                            onChange={(e) => {
                                setMobileSearchTerm(e.target.value);
                                mobileTermRef.current = e.target.value;
                                setMobileActiveIndex(-1);
                            }}
                            onFocus={() => focusSearch("mobile")}
                            onBlur={() => blurSearch("mobile")}
                            onKeyDown={(e) => handleSearchKeyDown(e, "mobile")}
                            placeholder="Search products..."
                            aria-label="Search products"
                            role="combobox"
                            aria-expanded={showMobileSuggestions}
                            aria-autocomplete="list"
                            autoComplete="off"
                            className="
                                h-11
                                w-full
                                rounded-full
                                border
                                border-orange-100
                                bg-orange-50/30
                                pl-11
                                pr-4
                                text-sm
                                text-gray-800
                                outline-none
                                placeholder:text-gray-400
                                transition
                                focus:border-[rgb(255,170,0)]
                                focus:bg-white
                                focus:ring-4
                                focus:ring-yellow-200/40
                            "
                        />

                        {showMobileSuggestions && (
                            <SearchSuggestionsDropdown
                                suggestions={mobileSuggestions}
                                activeIndex={mobileActiveIndex}
                                onHover={setMobileActiveIndex}
                                onSelect={(s) => selectSuggestion("mobile", s)}
                            />
                        )}
                    </form>
                </div>
            </div>

            {/* =========================================================
                MOBILE DRAWER
            ========================================================= */}

            {mobileMenu && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        bg-black/45
                        backdrop-blur-sm
                        lg:hidden
                    "
                    onClick={() =>
                        setMobileMenu(false)
                    }
                >
                    <div
                        className="
                            absolute
                            right-0
                            top-0
                            flex
                            h-full
                            w-[88%]
                            max-w-[420px]
                            flex-col
                            bg-white
                            shadow-2xl
                        "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* DRAWER HEADER */}

                        <div
                            className="
                                flex
                                h-16
                                shrink-0
                                items-center
                                justify-between
                                border-b
                                border-gray-100
                                px-5
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.24em]
                                        text-[rgb(207,0,6)]
                                    "
                                >
                                    Explore
                                </p>

                                <h2
                                    className="
                                        text-lg
                                        font-bold
                                        text-[#182235]
                                    "
                                >
                                    Categories
                                </h2>
                            </div>

                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gray-50
                                    text-gray-700
                                    transition
                                    hover:bg-red-50
                                    hover:text-[rgb(207,0,6)]
                                "
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* CATEGORY LIST */}

                        <div
                            className="
                                flex-1
                                overflow-y-auto
                                px-4
                                py-4
                            "
                        >
                            <div className="space-y-2">
                                {categories.map(
                                    (category) => {
                                        const isOpen =
                                            openMobileCategory ===
                                            category.name;

                                        const categoryHref =
                                            getCategoryHref(
                                                category.name
                                            );

                                        return (
                                            <div
                                                key={
                                                    category.name
                                                }
                                                className="
                                                    overflow-hidden
                                                    rounded-2xl
                                                    border
                                                    border-gray-100
                                                    bg-white
                                                "
                                            >
                                                {/* MOBILE CATEGORY HEADER */}

                                                <div
                                                    className={`
                                                        flex
                                                        w-full
                                                        items-center
                                                        transition
                                                        ${isOpen
                                                            ? "bg-red-50"
                                                            : "bg-white"
                                                        }
                                                    `}
                                                >
                                                    {/* CATEGORY LINK */}

                                                    <Link
                                                        href={
                                                            categoryHref
                                                        }
                                                        onClick={() =>
                                                            setMobileMenu(
                                                                false
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            min-w-0
                                                            flex-1
                                                            items-center
                                                            px-4
                                                            py-3.5
                                                            text-left
                                                            text-sm
                                                            font-semibold
                                                            transition
                                                            ${isOpen
                                                                ? "text-[rgb(207,0,6)]"
                                                                : "text-gray-800"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            category.name
                                                        }
                                                    </Link>

                                                    {/* SUBMENU ARROW */}

                                                    <button
                                                        type="button"
                                                        aria-label={`Toggle ${category.name} submenu`}
                                                        aria-expanded={
                                                            isOpen
                                                        }
                                                        onClick={() =>
                                                            toggleMobileCategory(
                                                                category.name
                                                            )
                                                        }
                                                        className={`
                                                            mr-2
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            transition
                                                            ${isOpen
                                                                ? "text-[rgb(207,0,6)]"
                                                                : "text-gray-600"
                                                            }
                                                        `}
                                                    >
                                                        <ChevronDown
                                                            size={17}
                                                            className="
                                                                transition-transform
                                                                duration-300
                                                            "
                                                            style={{
                                                                transform:
                                                                    isOpen
                                                                        ? "rotate(180deg)"
                                                                        : "rotate(0deg)",
                                                            }}
                                                        />
                                                    </button>
                                                </div>

                                                {/* MOBILE SUBMENU */}

                                                <div
                                                    className={`
                                                        grid
                                                        transition-all
                                                        duration-300
                                                        ${isOpen
                                                            ? "grid-rows-[1fr]"
                                                            : "grid-rows-[0fr]"
                                                        }
                                                    `}
                                                >
                                                    <div className="overflow-hidden">
                                                        <div
                                                            className="
                                                                border-t
                                                                border-gray-100
                                                                bg-gray-50/60
                                                                px-4
                                                                py-3
                                                            "
                                                        >
                                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                {category.columns.map(
                                                                    (
                                                                        column
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                column.title
                                                                            }
                                                                        >
                                                                            <h4
                                                                                className="
                                                                                    mb-1.5
                                                                                    text-xs
                                                                                    font-bold
                                                                                    text-[rgb(207,0,6)]
                                                                                "
                                                                            >
                                                                                {
                                                                                    column.title
                                                                                }
                                                                            </h4>

                                                                            <div className="flex flex-col">
                                                                                {column.items.map(
                                                                                    (
                                                                                        item
                                                                                    ) => (
                                                                                        <Link
                                                                                            key={
                                                                                                item
                                                                                            }
                                                                                            href={getProductCategoryHref(
                                                                                                item
                                                                                            )}
                                                                                            onClick={() =>
                                                                                                setMobileMenu(
                                                                                                    false
                                                                                                )
                                                                                            }
                                                                                            className="
                                                                                                rounded-md
                                                                                                py-1.5
                                                                                                text-sm
                                                                                                text-gray-600
                                                                                                transition
                                                                                                hover:bg-white
                                                                                                hover:text-[rgb(207,0,6)]
                                                                                            "
                                                                                        >
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </Link>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* DRAWER FOOTER */}

                        <div
                            className="
                                shrink-0
                                border-t
                                border-gray-100
                                p-4
                            "
                        >
                            <Link
                                href="/contact-us"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-[rgb(255,170,0)]
                                    to-[rgb(207,0,6)]
                                    px-4
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-md
                                "
                            >
                                Need help?

                                <ChevronRight
                                    size={16}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    );
}