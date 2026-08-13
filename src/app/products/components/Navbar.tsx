"use client";
import { useRef, useState, type MouseEvent } from "react";
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
/* =========================================================
   CATEGORY DATA
========================================================= */
const categories = [
    {
        name: "Tiles",
        columns: [
            {
                title: "Vitrified Tiles",
                items: [
                    "Vitrified Floor Tile",
                    "Parking Tile",
                    "Elevation Tile",
                ],
            },
            {
                title: "Ceramic Tiles",
                items: [
                    "Ceramic Wall Tile",
                    "Ceramic Floor Tile",
                    "Ceramic Parking Tile",
                    "Ceramic Elevation Tile",
                ],
            },
            {
                title: "Laminate Flooring",
                items: ["Laminate Flooring"],
            },
        ],
    },
    {
        name: "Electricals",
        columns: [
            {
                title: "Switches & Sockets",
                items: [
                    "Modular Switches",
                    "Sockets",
                    "Switch Plates",
                ],
            },
            {
                title: "Electrical Accessories",
                items: [
                    "Wires & Cables",
                    "MCB & Distribution",
                    "Electrical Boxes",
                ],
            },
            {
                title: "Lighting",
                items: [
                    "LED Lights",
                    "Downlights",
                    "Decorative Lights",
                ],
            },
        ],
    },
    {
        name: "Power & Hand Tools",
        columns: [
            {
                title: "Power Tools",
                items: [
                    "Drills",
                    "Grinders",
                    "Cutting Tools",
                ],
            },
            {
                title: "Hand Tools",
                items: [
                    "Hammers",
                    "Screwdrivers",
                    "Wrenches",
                ],
            },
            {
                title: "Accessories",
                items: [
                    "Drill Bits",
                    "Blades",
                    "Tool Accessories",
                ],
            },
        ],
    },
    {
        name: "Plywood & Laminates",
        columns: [
            {
                title: "Plywood",
                items: [
                    "Commercial Plywood",
                    "BWP Plywood",
                    "Marine Plywood",
                ],
            },
            {
                title: "Laminates",
                items: [
                    "Decorative Laminates",
                    "Wood Finish Laminates",
                    "High Pressure Laminates",
                ],
            },
            {
                title: "Boards",
                items: [
                    "MDF Boards",
                    "Particle Boards",
                    "Block Boards",
                ],
            },
        ],
    },
    {
        name: "Hardware",
        columns: [
            {
                title: "Door Hardware",
                items: [
                    "Door Handles",
                    "Locks",
                    "Hinges",
                ],
            },
            {
                title: "Furniture Hardware",
                items: [
                    "Drawer Channels",
                    "Cabinet Hinges",
                    "Handles & Knobs",
                ],
            },
            {
                title: "Accessories",
                items: [
                    "Hooks",
                    "Brackets",
                    "Fasteners",
                ],
            },
        ],
    },
    {
        name: "Paints",
        columns: [
            {
                title: "Interior Paints",
                items: [
                    "Interior Wall Paint",
                    "Emulsion Paint",
                    "Primer",
                ],
            },
            {
                title: "Exterior Paints",
                items: [
                    "Exterior Wall Paint",
                    "Weatherproof Paint",
                    "Exterior Primer",
                ],
            },
            {
                title: "Specialty Paints",
                items: [
                    "Wood Paint",
                    "Metal Paint",
                    "Texture Paint",
                ],
            },
        ],
    },
    {
        name: "Lighting & Fans",
        columns: [
            {
                title: "Lighting",
                items: [
                    "Ceiling Lights",
                    "Pendant Lights",
                    "Wall Lights",
                ],
            },
            {
                title: "LED Lighting",
                items: [
                    "LED Bulbs",
                    "LED Panels",
                    "Strip Lights",
                ],
            },
            {
                title: "Fans",
                items: [
                    "Ceiling Fans",
                    "Decorative Fans",
                    "Exhaust Fans",
                ],
            },
        ],
    },
    {
        name: "Bathroom",
        columns: [
            {
                title: "Sanitaryware",
                items: [
                    "Wash Basins",
                    "Toilets",
                    "Urinals",
                ],
            },
            {
                title: "Bath Fittings",
                items: [
                    "Faucets",
                    "Showers",
                    "Health Faucets",
                ],
            },
            {
                title: "Bathroom Accessories",
                items: [
                    "Mirrors",
                    "Towel Holders",
                    "Bathroom Shelves",
                ],
            },
        ],
    },
    {
        name: "Plumbing",
        columns: [
            {
                title: "Pipes",
                items: [
                    "PVC Pipes",
                    "CPVC Pipes",
                    "UPVC Pipes",
                ],
            },
            {
                title: "Fittings",
                items: [
                    "Pipe Fittings",
                    "Valves",
                    "Connectors",
                ],
            },
            {
                title: "Plumbing Accessories",
                items: [
                    "Drainage",
                    "Water Tanks",
                    "Plumbing Tools",
                ],
            },
        ],
    },
    {
        name: "Kitchen",
        columns: [
            {
                title: "Kitchen Hardware",
                items: [
                    "Cabinet Handles",
                    "Drawer Channels",
                    "Kitchen Hinges",
                ],
            },
            {
                title: "Kitchen Storage",
                items: [
                    "Pull Out Baskets",
                    "Corner Units",
                    "Bottle Pull Outs",
                ],
            },
            {
                title: "Kitchen Accessories",
                items: [
                    "Sinks",
                    "Taps",
                    "Kitchen Organizers",
                ],
            },
        ],
    },
    {
        name: "Appliances",
        columns: [
            {
                title: "Kitchen Appliances",
                items: [
                    "Chimneys",
                    "Hobs",
                    "Built-in Ovens",
                ],
            },
            {
                title: "Home Appliances",
                items: [
                    "Air Coolers",
                    "Water Heaters",
                    "Small Appliances",
                ],
            },
            {
                title: "Cooling",
                items: [
                    "Fans",
                    "Air Conditioners",
                    "Air Purifiers",
                ],
            },
        ],
    },
    {
        name: "Rugs & Curtains",
        columns: [
            {
                title: "Rugs",
                items: [
                    "Living Room Rugs",
                    "Bedroom Rugs",
                    "Area Rugs",
                ],
            },
            {
                title: "Curtains",
                items: [
                    "Blackout Curtains",
                    "Sheer Curtains",
                    "Window Curtains",
                ],
            },
            {
                title: "Accessories",
                items: [
                    "Curtain Rods",
                    "Blinds",
                    "Cushions",
                ],
            },
        ],
    },
];
export default function Navbar() {
    const pathname = usePathname();
    const isProduct = pathname === "/products";
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openMobileCategory, setOpenMobileCategory] =
        useState<string | null>(null);

    // Desktop mega-menu state. The menu itself stays fixed to the
    // full category-navigation width; only this pointer moves.
    const [desktopCategory, setDesktopCategory] =
        useState<string | null>(null);
    const [desktopPointerLeft, setDesktopPointerLeft] =
        useState(0);
    const desktopMenuCloseTimer = useRef<ReturnType<
        typeof setTimeout
    > | null>(null);

    const clearDesktopMenuCloseTimer = () => {
        if (desktopMenuCloseTimer.current) {
            clearTimeout(desktopMenuCloseTimer.current);
            desktopMenuCloseTimer.current = null;
        }
    };

    const closeDesktopMenuWithDelay = () => {
        clearDesktopMenuCloseTimer();

        desktopMenuCloseTimer.current = setTimeout(() => {
            setDesktopCategory(null);
        }, 120);
    };

    const openDesktopCategory = (
        event: MouseEvent<HTMLButtonElement>,
        categoryName: string
    ) => {
        clearDesktopMenuCloseTimer();

        const rect = event.currentTarget.getBoundingClientRect();

        setDesktopCategory(categoryName);
        setDesktopPointerLeft(rect.left + rect.width / 2);
    };

    const activeDesktopCategory = categories.find(
        (category) => category.name === desktopCategory
    );

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
                        DESKTOP NAVBAR
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
                        {/* =================================================
                            LEFT SIDE
                        ================================================= */}
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
                            {/* LOGO */}
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
                            {/* E-COMMERCE / CRM */}
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
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 xl:px-6 xl:py-2.5 xl:text-sm ${isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    E-Commerce
                                </Link>
                                <Link
                                    href="/crm"
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 xl:px-6 xl:py-2.5 xl:text-sm ${!isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    CRM
                                </Link>
                            </div>
                        </div>
                        {/* =================================================
                            SEARCH
                        ================================================= */}
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
                                        bg-orange-50/40
                                        pl-12
                                        pr-5
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
                        {/* =================================================
                            RIGHT SIDE
                        ================================================= */}
                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                justify-end
                                gap-2
                                xl:gap-3
                            "
                        >
                            <button
                                type="button"
                                className="
                                    hidden
                                    items-center
                                    gap-2
                                    whitespace-nowrap
                                    rounded-full
                                    border
                                    border-gray-200
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    transition
                                    hover:border-[rgb(255,170,0)]
                                    hover:bg-orange-50
                                    xl:flex
                                "
                            >
                                <User size={18} />
                                Login
                            </button>
                            <button
                                type="button"
                                aria-label="Wishlist"
                                className="
                                    relative
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
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
                            </button>
                            <button
                                type="button"
                                aria-label="Shopping cart"
                                className="
                                    relative
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
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
                                <ShoppingCart size={20} />
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
                                    0
                                </span>
                            </button>
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
                        onMouseLeave={closeDesktopMenuWithDelay}
                    >
                        {/* CATEGORY SCROLLER */}
                        <div
                            className="
                                flex
                                min-w-0
                                w-full
                                items-center
                                gap-5
                                overflow-x-auto
                                px-5
                                py-1
                                xl:gap-7
                                xl:px-6
                                [scrollbar-width:none]
                                [&::-webkit-scrollbar]:hidden
                            "
                        >
                            {categories.map((category) => {
                                const isActive =
                                    desktopCategory === category.name;

                                return (
                                    <div
                                        key={category.name}
                                        className="
                                            relative
                                            shrink-0
                                        "
                                    >
                                        {/* CATEGORY BUTTON */}
                                        <button
                                            type="button"
                                            onMouseEnter={(event) =>
                                                openDesktopCategory(
                                                    event,
                                                    category.name
                                                )
                                            }
                                            onFocus={(event) =>
                                                openDesktopCategory(
                                                    event,
                                                    category.name
                                                )
                                            }
                                            className={`
                                                relative
                                                flex
                                                items-center
                                                gap-1
                                                whitespace-nowrap
                                                py-1.5
                                                text-xs
                                                font-semibold
                                                transition-all
                                                duration-200
                                                xl:text-sm
                                                ${
                                                    isActive
                                                        ? "text-[rgb(207,0,6)]"
                                                        : "text-gray-700 hover:text-[rgb(207,0,6)]"
                                                }
                                            `}
                                            aria-expanded={isActive}
                                            aria-haspopup="true"
                                        >
                                            <span>
                                                {category.name}
                                            </span>

                                            <ChevronDown
                                                size={14}
                                                className={`
                                                    shrink-0
                                                    transition-transform
                                                    duration-300
                                                    ${
                                                        isActive
                                                            ? "rotate-180"
                                                            : ""
                                                    }
                                                `}
                                            />

                                            {/* ACTIVE UNDERLINE */}
                                            <span
                                                className={`
                                                    absolute
                                                    bottom-0
                                                    left-1/2
                                                    h-0.5
                                                    -translate-x-1/2
                                                    rounded-full
                                                    bg-[rgb(207,0,6)]
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isActive
                                                            ? "w-full"
                                                            : "w-0"
                                                    }
                                                `}
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* =================================================
                            DESKTOP MEGA MENU

                            The panel is NOT positioned relative to the
                            selected category. It always spans the complete
                            category navigation width.

                            Only the small pointer follows the selected
                            category.
                        ================================================= */}
                        {activeDesktopCategory && (
                            <div
                                className="
                                    fixed
                                    left-0
                                    right-0
                                    z-[70]
                                    translate-y-0
                                    opacity-100
                                    transition-all
                                    duration-200
                                    ease-out
                                "
                                style={{
                                    top: "108px",
                                }}
                                onMouseEnter={
                                    clearDesktopMenuCloseTimer
                                }
                                onMouseLeave={
                                    closeDesktopMenuWithDelay
                                }
                            >
                                {/* POINTER CONNECTING TO ACTIVE CATEGORY */}
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -top-2
                                        z-10
                                        h-4
                                        w-4
                                        rotate-45
                                        border-l
                                        border-t
                                        border-gray-200
                                        bg-white
                                        transition-all
                                        duration-200
                                        ease-out
                                    "
                                    style={{
                                        left:
                                            desktopPointerLeft - 8,
                                    }}
                                />

                                <div
                                    className="
                                        relative
                                        mx-auto
                                        w-full
                                        max-w-[1920px]
                                        overflow-hidden
                                        border-b
                                        border-gray-200
                                        bg-white
                                        shadow-[0_20px_60px_rgba(15,23,42,0.14)]
                                    "
                                >
                                    {/* TOP ACCENT */}
                                    <div
                                        className="
                                            h-1
                                            w-full
                                            bg-gradient-to-r
                                            from-[rgb(255,170,0)]
                                            via-[rgb(255,100,0)]
                                            to-[rgb(207,0,6)]
                                        "
                                    />

                                    <div
                                        className="
                                            px-5
                                            py-6
                                            xl:px-8
                                            xl:py-7
                                        "
                                    >
                                        {/* MENU HEADER */}
                                        <div
                                            className="
                                                mb-5
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >
                                            <div>
                                                <p
                                                    className="
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-[rgb(207,0,6)]
                                                    "
                                                >
                                                    Explore
                                                </p>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-xl
                                                        font-bold
                                                        tracking-tight
                                                        text-gray-900
                                                    "
                                                >
                                                    {
                                                        activeDesktopCategory.name
                                                    }
                                                </h3>
                                            </div>

                                            <span
                                                className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-gray-50
                                                    text-gray-400
                                                "
                                            >
                                                <ChevronRight
                                                    size={18}
                                                />
                                            </span>
                                        </div>

                                        {/* MENU COLUMNS */}
                                        <div
                                            className="
                                                grid
                                                grid-cols-3
                                                gap-8
                                                xl:gap-12
                                            "
                                        >
                                            {activeDesktopCategory.columns.map(
                                                (column) => (
                                                    <div
                                                        key={
                                                            column.title
                                                        }
                                                        className="
                                                            min-w-0
                                                        "
                                                    >
                                                        <h4
                                                            className="
                                                                mb-2.5
                                                                text-sm
                                                                font-bold
                                                                text-[rgb(207,0,6)]
                                                            "
                                                        >
                                                            {
                                                                column.title
                                                            }
                                                        </h4>

                                                        <div
                                                            className="
                                                                space-y-1
                                                            "
                                                        >
                                                            {column.items.map(
                                                                (
                                                                    item
                                                                ) => (
                                                                    <button
                                                                        key={
                                                                            item
                                                                        }
                                                                        type="button"
                                                                        className="
                                                                            group/item
                                                                            flex
                                                                            w-full
                                                                            items-center
                                                                            justify-between
                                                                            rounded-lg
                                                                            px-2
                                                                            py-1.5
                                                                            text-left
                                                                            text-sm
                                                                            text-gray-600
                                                                            transition-all
                                                                            duration-200
                                                                            hover:bg-red-50
                                                                            hover:text-[rgb(207,0,6)]
                                                                        "
                                                                    >
                                                                        <span>
                                                                            {
                                                                                item
                                                                            }
                                                                        </span>

                                                                        <ChevronRight
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="
                                                                                -translate-x-1
                                                                                opacity-0
                                                                                transition-all
                                                                                duration-200
                                                                                group-hover/item:translate-x-0
                                                                                group-hover/item:opacity-100
                                                                            "
                                                                        />
                                                                    </button>
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
                        )}
                    </div>
                    {/* =================================================
                        MOBILE NAVBAR
                    ================================================= */}
                    <div className="lg:hidden">
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
                                        -top-2
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
                                            h-4
                                            w-4
                                            animate-ping
                                            rounded-full
                                            bg-yellow-400
                                            opacity-80
                                        "
                                    />
                                    <span
                                        className="
                                            relative
                                            inline-flex
                                            h-3
                                            w-3
                                            rounded-full
                                            bg-yellow-400
                                        "
                                    />
                                </div>
                                <span
                                    className="
                                        text-lg
                                        font-bold
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
                            {/* MOBILE TOGGLE */}
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
                                    shadow-sm
                                "
                            >
                                <Link
                                    href="/products"
                                    className={`min-w-0 flex-1 rounded-full px-2 py-2 text-center text-[10px] font-bold transition-all duration-300 sm:px-3 sm:text-xs ${isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600"
                                        }`}
                                >
                                    <span className="block truncate">
                                        E-Commerce
                                    </span>
                                </Link>
                                <Link
                                    href="/crm"
                                    className={`min-w-0 flex-1 rounded-full px-2 py-2 text-center text-[10px] font-bold transition-all duration-300 sm:px-3 sm:text-xs ${!isProduct
                                            ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                                            : "text-gray-600"
                                        }`}
                                >
                                    <span className="block truncate">
                                        CRM
                                    </span>
                                </Link>
                            </div>
                            {/* MOBILE ACTIONS */}
                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-1
                                    sm:gap-2
                                "
                            >
                                <button
                                    type="button"
                                    aria-label="Shopping cart"
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
                                        sm:h-10
                                        sm:w-10
                                    "
                                >
                                    <ShoppingCart size={20} />
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
                                        0
                                    </span>
                                </button>
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
                                        sm:h-10
                                        sm:w-10
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
                                        bg-orange-50/40
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
                </div>
            </header>
            {/* =============================================================
                MOBILE DRAWER
            ============================================================= */}
            {mobileMenu && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[60]
                        bg-black/50
                        backdrop-blur-sm
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
                            h-full
                            w-[88%]
                            max-w-sm
                            overflow-y-auto
                            bg-white
                            shadow-2xl
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        {/* DRAWER HEADER */}
                        <div
                            className="
                                sticky
                                top-0
                                z-10
                                flex
                                items-center
                                justify-between
                                border-b
                                border-gray-100
                                bg-white/95
                                px-5
                                py-5
                                backdrop-blur-xl
                            "
                        >
                            <div className="flex items-center">
                                <div
                                    className="
                                        relative
                                        -top-2
                                        mr-1
                                        flex
                                        h-4
                                        w-4
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
                                        "
                                    />
                                </div>
                                <span
                                    className="
                                        text-2xl
                                        font-bold
                                        text-[rgb(207,0,6)]
                                    "
                                    style={{
                                        fontFamily:
                                            "Candal, sans-serif",
                                    }}
                                >
                                    nterior
                                </span>
                            </div>
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className="
                                    rounded-full
                                    p-2
                                    text-gray-700
                                    transition
                                    hover:bg-gray-100
                                "
                            >
                                <X size={24} />
                            </button>
                        </div>
                        {/* =================================================
                            LOGIN CARD
                        ================================================= */}
                        <div
                            className="
                                m-5
                                rounded-3xl
                                bg-gradient-to-r
                                from-[rgb(255,170,0)]
                                to-[rgb(207,0,6)]
                                p-5
                                text-white
                                shadow-xl
                            "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-white/20
                                        backdrop-blur
                                    "
                                >
                                    <User size={28} />
                                </div>
                                <div>
                                    <p className="text-sm text-white/90">
                                        Welcome to
                                    </p>
                                    <h3 className="text-2xl font-black">
                                        Nterior
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <Link
                                    href="/login"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        rounded-2xl
                                        bg-white
                                        py-3
                                        text-center
                                        font-bold
                                        text-[rgb(207,0,6)]
                                    "
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        rounded-2xl
                                        border
                                        border-white/30
                                        bg-white/10
                                        py-3
                                        text-center
                                        font-bold
                                        text-white
                                        backdrop-blur
                                    "
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}
                        <div className="px-5">
                            <p
                                className="
                                    mb-3
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.25em]
                                    text-gray-400
                                "
                            >
                                Quick Actions
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/wishlist"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        bg-white
                                        p-4
                                        shadow-sm
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-red-50
                                            text-[rgb(207,0,6)]
                                        "
                                    >
                                        <Heart size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-800">
                                        Wishlist
                                    </span>
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        bg-white
                                        p-4
                                        shadow-sm
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-orange-50
                                            text-[rgb(255,170,0)]
                                        "
                                    >
                                        <ShoppingCart size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-800">
                                        Cart
                                    </span>
                                </Link>
                            </div>
                        </div>
                        {/* =================================================
                            MOBILE CATEGORIES
                        ================================================= */}
                        <div className="mt-8 px-5 pb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.25em]
                                        text-gray-400
                                    "
                                >
                                    Categories
                                </p>
                                <Link
                                    href="/products"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        text-sm
                                        font-bold
                                        text-[rgb(207,0,6)]
                                    "
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {categories.map((category) => {
                                    const isOpen =
                                        openMobileCategory ===
                                        category.name;
                                    return (
                                        <div
                                            key={category.name}
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-gray-100
                                                bg-white
                                                shadow-sm
                                                transition-all
                                                duration-300
                                            "
                                        >
                                            {/* CATEGORY */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMobileCategory(
                                                        isOpen
                                                            ? null
                                                            : category.name
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    px-4
                                                    py-4
                                                    text-left
                                                    transition-colors
                                                    ${isOpen
                                                        ? "bg-red-50 text-[rgb(207,0,6)]"
                                                        : "text-gray-800 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                <span className="font-semibold">
                                                    {category.name}
                                                </span>
                                                <ChevronDown
                                                    size={18}
                                                    className={`
                                                        transition-transform
                                                        duration-300
                                                        ${isOpen
                                                            ? "rotate-180 text-[rgb(207,0,6)]"
                                                            : "text-gray-400"
                                                        }
                                                    `}
                                                />
                                            </button>
                                            {/* SUBMENU */}
                                            <div
                                                className={`
                                                    grid
                                                    transition-all
                                                    duration-300
                                                    ease-in-out
                                                    ${isOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
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
                                                            py-4
                                                        "
                                                    >
                                                        <div className="space-y-4">
                                                            {category.columns.map(
                                                                (
                                                                    column
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            column.title
                                                                        }
                                                                    >
                                                                        <p
                                                                            className="
                                                                                mb-2
                                                                                text-[11px]
                                                                                font-bold
                                                                                uppercase
                                                                                tracking-[0.12em]
                                                                                text-[rgb(207,0,6)]
                                                                            "
                                                                        >
                                                                            {
                                                                                column.title
                                                                            }
                                                                        </p>
                                                                        <div className="space-y-1">
                                                                            {column.items.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <button
                                                                                        key={
                                                                                            item
                                                                                        }
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            setMobileMenu(
                                                                                                false
                                                                                            )
                                                                                        }
                                                                                        className="
                                                                                            flex
                                                                                            w-full
                                                                                            items-center
                                                                                            justify-between
                                                                                            rounded-lg
                                                                                            px-2
                                                                                            py-2
                                                                                            text-left
                                                                                            text-sm
                                                                                            text-gray-600
                                                                                            transition
                                                                                            hover:bg-white
                                                                                            hover:text-[rgb(207,0,6)]
                                                                                        "
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </span>
                                                                                        <ChevronRight
                                                                                            size={
                                                                                                15
                                                                                            }
                                                                                            className="text-gray-300"
                                                                                        />
                                                                                    </button>
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
                                })}
                            </div>
                        </div>
                        {/* =================================================
                            BOTTOM CTA
                        ================================================= */}
                        <div className="px-5 pb-8">
                            <Link
                                href="/contact-us"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className="
                                    block
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-[rgb(255,170,0)]
                                    to-[rgb(207,0,6)]
                                    py-4
                                    text-center
                                    text-lg
                                    font-black
                                    text-white
                                    shadow-[0_12px_30px_rgba(207,0,6,.28)]
                                    transition
                                    hover:scale-[1.02]
                                "
                            >
                                Book Free Consultation
                            </Link>
                            <p className="mt-4 text-center text-xs text-gray-500">
                                Design • Furniture • Execution • Warranty
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}