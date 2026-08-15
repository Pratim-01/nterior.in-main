"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    SearchX,
    ShoppingBag,
} from "lucide-react";

type NoProductsFoundProps = {
    category?: string;
};

export default function NoProductsFound({
    category,
}: NoProductsFoundProps) {
    const router = useRouter();

    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div
                className="
                    relative
                    mx-auto
                    flex
                    w-full
                    max-w-4xl
                    flex-col
                    items-center
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-100
                    bg-white
                    px-5
                    py-10
                    text-center
                    shadow-[0_12px_40px_rgba(24,34,53,0.07)]
                    sm:px-10
                    sm:py-14
                "
            >
                {/* Decorative gradient */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-0
                        h-1
                        w-32
                        -translate-x-1/2
                        rounded-b-full
                        bg-gradient-to-r
                        from-[rgb(255,170,0)]
                        to-[rgb(207,0,6)]
                    "
                />

                {/* Soft background decoration */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-orange-50
                        opacity-70
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-20
                        -left-20
                        h-48
                        w-48
                        rounded-full
                        bg-red-50
                        opacity-60
                        blur-3xl
                    "
                />

                {/* Illustration */}

                <div
                    className="
                        relative
                        z-10
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-red-100
                        bg-gradient-to-br
                        from-red-50
                        to-orange-50
                        shadow-sm
                    "
                >
                    <SearchX
                        size={36}
                        strokeWidth={1.7}
                        className="text-[rgb(207,0,6)]"
                    />

                    <span
                        className="
                            absolute
                            -right-1
                            -top-1
                            h-3
                            w-3
                            rounded-full
                            bg-[rgb(255,170,0)]
                            shadow-sm
                        "
                    />
                </div>

                {/* Small label */}

                <span
                    className="
                        relative
                        z-10
                        mb-2
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-[rgb(207,0,6)]
                    "
                >
                    Product Search
                </span>

                {/* Heading */}

                <h1
                    className="
                        relative
                        z-10
                        max-w-2xl
                        text-2xl
                        font-bold
                        tracking-tight
                        text-[#182235]
                        sm:text-3xl
                    "
                >
                    No products found
                </h1>

                {/* Category */}

                {category && (
                    <div
                        className="
                            relative
                            z-10
                            mt-3
                            inline-flex
                            max-w-full
                            items-center
                            rounded-full
                            border
                            border-orange-100
                            bg-orange-50/60
                            px-4
                            py-1.5
                        "
                    >
                        <span
                            className="
                                truncate
                                text-sm
                                font-semibold
                                text-[#182235]
                            "
                        >
                            {category}
                        </span>
                    </div>
                )}

                {/* Description */}

                <p
                    className="
                        relative
                        z-10
                        mt-5
                        max-w-xl
                        text-sm
                        leading-6
                        text-gray-500
                        sm:text-base
                    "
                >
                    We couldn't find any products in this
                    category right now. Try another
                    category or browse all available
                    products.
                </p>

                {/* Actions */}

                <div
                    className="
                        relative
                        z-10
                        mt-8
                        flex
                        w-full
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        sm:w-auto
                        sm:flex-row
                    "
                >
                    {/* Browse products */}

                    <Link
                        href="/products"
                        className="
                            group
                            inline-flex
                            h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-gradient-to-r
                            from-[rgb(255,170,0)]
                            to-[rgb(207,0,6)]
                            px-6
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_8px_20px_rgba(207,0,6,0.18)]
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:shadow-[0_12px_25px_rgba(207,0,6,0.25)]
                            sm:w-auto
                        "
                    >
                        <ShoppingBag
                            size={17}
                        />

                        Browse all products

                        <ArrowRight
                            size={16}
                            className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                    {/* Back */}

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="
                            inline-flex
                            h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            border
                            border-gray-200
                            bg-white
                            px-6
                            text-sm
                            font-semibold
                            text-[#182235]
                            transition-all
                            duration-200
                            hover:border-gray-300
                            hover:bg-gray-50
                            sm:w-auto
                        "
                    >
                        <ArrowLeft
                            size={16}
                        />

                        Go back
                    </button>
                </div>

                {/* Bottom hint */}

                <div
                    className="
                        relative
                        z-10
                        mt-7
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-400
                    "
                >
                    <span
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[rgb(255,170,0)]
                        "
                    />

                    More products are being added
                        regularly.
                </div>
            </div>
        </section>
    );
}