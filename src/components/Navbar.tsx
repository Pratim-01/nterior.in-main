"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Search,
    User,
    Heart,
    ShoppingCart,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";

import {
    NAV_CATEGORIES,
    type NavCategoryGroup as Category,
    type NavCategoryColumn as MegaMenuColumn,
} from "@/lib/product-navigation";
import { getLeafItemHref } from "@/lib/category-taxonomy";
import { useCart } from "@/lib/cart-context";

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
   NAVBAR
========================================================= */

export default function Navbar() {
    const pathname = usePathname();
    const { totalItems } = useCart();

    const isProduct =
        pathname === "/products" ||
        pathname.startsWith("/products/");

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
                            <div className="relative">
                                <Search
                                    size={19}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[rgb(255,170,0)]
                                    "
                                />

                                <input
                                    type="search"
                                    placeholder="Search furniture, wardrobes, kitchens..."
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
                            </div>
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
                            <button
                                type="button"
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

                                <span className="hidden xl:inline">
                                    Login
                                </span>
                            </button>

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
                    <div className="relative">
                        <Search
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-[rgb(255,170,0)]
                            "
                        />

                        <input
                            type="search"
                            placeholder="Search products..."
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
                    </div>
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
        </>
    );
}