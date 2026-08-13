"use client";

import { FormEvent, useState } from "react";

export default function ContactUs() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Connect this to your API/backend later.
        setSubmitted(true);
    };

    return (
        <section
            className="
        w-full
        bg-white

        px-4
        py-8

        sm:px-6
        sm:py-10

        lg:px-8
        lg:py-12
      "
        >
            <div
                className="
          mx-auto
          w-full
          max-w-7xl
        "
            >
                <div
                    className="
            overflow-hidden

            rounded-[22px]

            border
            border-[#e9e6e1]

            bg-[#faf9f6]

            shadow-[0_8px_30px_rgba(24,34,53,0.06)]
          "
                >
                    <div
                        className="
              grid
              grid-cols-1

              lg:grid-cols-[0.9fr_1.1fr]
            "
                    >
                        {/* ==================================================
    LEFT — CONTACT INFORMATION
================================================== */}

                        <div
                            className="
    relative
    flex
    flex-col

    overflow-hidden

    border-b
    border-[#e5e1db]

    bg-[#f7f6f3]

    px-6
    py-7

    sm:px-8
    sm:py-8

    lg:border-b-0
    lg:border-r
    lg:px-10
    lg:py-9
  "
                        >
                            {/* Decorative background */}

                            <div
                                className="
      pointer-events-none
      absolute
      -right-24
      -top-24

      h-64
      w-64

      rounded-full

      bg-[#CF0006]/[0.035]

      blur-3xl
    "
                            />

                            {/* Top accent */}

                            <div
                                className="
      absolute
      left-0
      top-0

      h-1
      w-28

      rounded-br-full

      bg-[#CF0006]
    "
                            />

                            {/* ==================================================
      INTRO
  ================================================== */}

                            <div className="relative z-10">
                                <div
                                    className="
        mb-3

        flex
        items-center
        gap-2
      "
                                >
                                    <span
                                        className="
          h-1.5
          w-7

          rounded-full

          bg-[#CF0006]
        "
                                    />

                                    <p
                                        className="
          text-[10px]
          font-bold
          uppercase

          tracking-[0.18em]

          text-[#CF0006]
        "
                                    >
                                        CONTACT US
                                    </p>
                                </div>

                                <h2
                                    className="
        max-w-[500px]

        text-[29px]
        font-bold
        leading-[1.12]

        tracking-[-0.04em]

        text-[#182235]

        sm:text-[33px]

        lg:text-[36px]
      "
                                >
                                    Let&apos;s build
                                    <br />

                                    <span className="text-[#CF0006]">
                                        something better.
                                    </span>
                                </h2>

                                <p
                                    className="
        mt-3

        max-w-[500px]

        text-[13px]
        leading-5

        text-[#667085]

        sm:text-[14px]
      "
                                >
                                    From choosing the right materials to finding the perfect
                                    finish, our team is here to help you make confident
                                    decisions for your space.
                                </p>
                            </div>

                            {/* ==================================================
      SERVICE HIGHLIGHTS
  ================================================== */}

                            <div
                                className="
      relative
      z-10

      mt-6

      space-y-3
    "
                            >
                                {/* ITEM 1 */}

                                <div className="flex items-center gap-3">
                                    <span
                                        className="
          flex
          h-7
          w-7
          shrink-0

          items-center
          justify-center

          rounded-[8px]

          bg-[#fff0f0]

          text-[10px]
          font-bold

          text-[#CF0006]
        "
                                    >
                                        01
                                    </span>

                                    <div>
                                        <p
                                            className="
            text-[12px]
            font-semibold

            text-[#182235]
          "
                                        >
                                            Product guidance
                                        </p>

                                        <p
                                            className="
            mt-0.5

            text-[10px]

            text-[#8a929e]
          "
                                        >
                                            Find the right products
                                        </p>
                                    </div>
                                </div>

                                {/* ITEM 2 */}

                                <div className="flex items-center gap-3">
                                    <span
                                        className="
          flex
          h-7
          w-7
          shrink-0

          items-center
          justify-center

          rounded-[8px]

          bg-[#eef1f5]

          text-[10px]
          font-bold

          text-[#182235]
        "
                                    >
                                        02
                                    </span>

                                    <div>
                                        <p
                                            className="
            text-[12px]
            font-semibold

            text-[#182235]
          "
                                        >
                                            Project assistance
                                        </p>

                                        <p
                                            className="
            mt-0.5

            text-[10px]

            text-[#8a929e]
          "
                                        >
                                            Support for every project
                                        </p>
                                    </div>
                                </div>

                                {/* ITEM 3 */}

                                <div className="flex items-center gap-3">
                                    <span
                                        className="
          flex
          h-7
          w-7
          shrink-0

          items-center
          justify-center

          rounded-[8px]

          bg-[#fff0f0]

          text-[10px]
          font-bold

          text-[#CF0006]
        "
                                    >
                                        03
                                    </span>

                                    <div>
                                        <p
                                            className="
            text-[12px]
            font-semibold

            text-[#182235]
          "
                                        >
                                            Expert support
                                        </p>

                                        <p
                                            className="
            mt-0.5

            text-[10px]

            text-[#8a929e]
          "
                                        >
                                            Help when you need it
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ==================================================
      CONTACT DETAILS — NO BOXES
  ================================================== */}

                            <div
                                className="
      relative
      z-10

      mt-6

      flex
      flex-col

      gap-4

      border-t
      border-[#e3dfd9]

      pt-5

      sm:flex-row
      sm:items-start
      sm:gap-10

      lg:flex-col
      lg:gap-4
    "
                            >
                                {/* PHONE */}

                                <a
                                    href="tel:+919000000000"
                                    className="
        group
        min-w-0
      "
                                >
                                    <p
                                        className="
          text-[9px]
          font-bold
          uppercase

          tracking-[0.15em]

          text-[#98a0ad]
        "
                                    >
                                        Call us
                                    </p>

                                    <div
                                        className="
          mt-1

          flex
          items-center
          gap-2
        "
                                    >
                                        <span
                                            className="
            text-[13px]
            font-semibold

            text-[#182235]

            transition-colors
            duration-200

            group-hover:text-[#CF0006]
          "
                                        >
                                            +91 90000 00000
                                        </span>

                                        <span
                                            className="
            text-[14px]

            text-[#CF0006]

            transition-transform
            duration-200

            group-hover:translate-x-1
          "
                                        >
                                            →
                                        </span>
                                    </div>
                                </a>

                                {/* EMAIL */}

                                <a
                                    href="mailto:support@yourstore.com"
                                    className="
        group
        min-w-0
      "
                                >
                                    <p
                                        className="
          text-[9px]
          font-bold
          uppercase

          tracking-[0.15em]

          text-[#98a0ad]
        "
                                    >
                                        Email us
                                    </p>

                                    <div
                                        className="
          mt-1

          flex
          items-center
          gap-2
        "
                                    >
                                        <span
                                            className="
            truncate

            text-[13px]
            font-semibold

            text-[#182235]

            transition-colors
            duration-200

            group-hover:text-[#CF0006]
          "
                                        >
                                            support@yourstore.com
                                        </span>

                                        <span
                                            className="
            text-[14px]

            text-[#CF0006]

            transition-transform
            duration-200

            group-hover:translate-x-1
          "
                                        >
                                            →
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* ==================================================
      RESPONSE STATUS
  ================================================== */}

                            <div
                                className="
      relative
      z-10

      mt-5

      flex
      items-center
      gap-2
    "
                            >
                                <span
                                    className="
        h-1.5
        w-1.5
        shrink-0

        rounded-full

        bg-[#CF0006]
      "
                                />

                                <p
                                    className="
        text-[10px]
        leading-4

        text-[#7b8491]
      "
                                >
                                    Our team typically responds within one business day.
                                </p>
                            </div>
                        </div>

                        {/* ==================================================
                RIGHT — CONTACT FORM
            ================================================== */}

                        <div
                            className="
                bg-white

                px-6
                py-7

                sm:px-8
                sm:py-8

                lg:px-10
                lg:py-10
              "
                        >
                            {/* FORM HEADER */}

                            <div className="mb-6">
                                <h3
                                    className="
                    text-[21px]
                    font-bold
                    leading-tight

                    tracking-[-0.025em]

                    text-[#182235]

                    sm:text-[23px]
                  "
                                >
                                    Send us a message
                                </h3>

                                <p
                                    className="
                    mt-1.5

                    text-[13px]
                    leading-5

                    text-[#7b8491]
                  "
                                >
                                    Tell us what you need and we&apos;ll get back to you.
                                </p>
                            </div>

                            {/* ==================================================
                  FORM
              ================================================== */}

                            <form
                                onSubmit={handleSubmit}
                                className="
                  space-y-4
                "
                            >
                                {/* NAME */}

                                <div
                                    className="
                    grid
                    grid-cols-1
                    gap-4

                    sm:grid-cols-2
                  "
                                >
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            className="
                        mb-1.5
                        block

                        text-[12px]
                        font-semibold

                        text-[#344054]
                      "
                                        >
                                            Full name
                                        </label>

                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            className="
                        h-11
                        w-full

                        rounded-[10px]

                        border
                        border-[#dedbd5]

                        bg-[#faf9f6]

                        px-3.5

                        text-[13px]
                        text-[#182235]

                        outline-none

                        placeholder:text-[#a1a7b0]

                        transition-all
                        duration-200

                        focus:border-[#CF0006]
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#CF0006]/10
                      "
                                        />
                                    </div>

                                    {/* PHONE */}

                                    <div>
                                        <label
                                            htmlFor="contact-phone"
                                            className="
                        mb-1.5
                        block

                        text-[12px]
                        font-semibold

                        text-[#344054]
                      "
                                        >
                                            Phone number
                                        </label>

                                        <input
                                            id="contact-phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+91"
                                            className="
                        h-11
                        w-full

                        rounded-[10px]

                        border
                        border-[#dedbd5]

                        bg-[#faf9f6]

                        px-3.5

                        text-[13px]
                        text-[#182235]

                        outline-none

                        placeholder:text-[#a1a7b0]

                        transition-all
                        duration-200

                        focus:border-[#CF0006]
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#CF0006]/10
                      "
                                        />
                                    </div>
                                </div>

                                {/* EMAIL */}

                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="
                      mb-1.5
                      block

                      text-[12px]
                      font-semibold

                      text-[#344054]
                    "
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="
                      h-11
                      w-full

                      rounded-[10px]

                      border
                      border-[#dedbd5]

                      bg-[#faf9f6]

                      px-3.5

                      text-[13px]
                      text-[#182235]

                      outline-none

                      placeholder:text-[#a1a7b0]

                      transition-all
                      duration-200

                      focus:border-[#CF0006]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#CF0006]/10
                    "
                                    />
                                </div>

                                {/* PROJECT TYPE */}

                                <div>
                                    <label
                                        htmlFor="contact-project"
                                        className="
                      mb-1.5
                      block

                      text-[12px]
                      font-semibold

                      text-[#344054]
                    "
                                    >
                                        What can we help with?
                                    </label>

                                    <select
                                        id="contact-project"
                                        name="project"
                                        defaultValue=""
                                        className="
                      h-11
                      w-full

                      rounded-[10px]

                      border
                      border-[#dedbd5]

                      bg-[#faf9f6]

                      px-3.5

                      text-[13px]

                      text-[#667085]

                      outline-none

                      transition-all
                      duration-200

                      focus:border-[#CF0006]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#CF0006]/10
                    "
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>

                                        <option value="tiles">
                                            Tiles
                                        </option>

                                        <option value="paints">
                                            Paints
                                        </option>

                                        <option value="plywood">
                                            Plywood & Laminates
                                        </option>

                                        <option value="electricals">
                                            Electricals
                                        </option>

                                        <option value="other">
                                            Other enquiry
                                        </option>
                                    </select>
                                </div>

                                {/* MESSAGE */}

                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="
                      mb-1.5
                      block

                      text-[12px]
                      font-semibold

                      text-[#344054]
                    "
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us a little about your requirement..."
                                        required
                                        className="
                      min-h-[105px]
                      w-full
                      resize-none

                      rounded-[10px]

                      border
                      border-[#dedbd5]

                      bg-[#faf9f6]

                      px-3.5
                      py-3

                      text-[13px]
                      leading-5

                      text-[#182235]

                      outline-none

                      placeholder:text-[#a1a7b0]

                      transition-all
                      duration-200

                      focus:border-[#CF0006]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#CF0006]/10
                    "
                                    />
                                </div>

                                {/* ==================================================
                    SUBMIT
                ================================================== */}

                                <div
                                    className="
                    flex
                    flex-col
                    gap-3

                    pt-1

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                                >
                                    <p
                                        className="
                      max-w-[300px]

                      text-[10px]
                      leading-4

                      text-[#98a0ad]
                    "
                                    >
                                        By submitting this form, you agree to be contacted
                                        regarding your enquiry.
                                    </p>

                                    <button
                                        type="submit"
                                        className="
                      inline-flex
                      h-11
                      shrink-0

                      items-center
                      justify-center

                      rounded-[10px]

                      bg-[#CF0006]

                      px-6

                      text-[13px]
                      font-bold

                      text-white

                      shadow-[0_5px_14px_rgba(207,0,6,0.18)]

                      transition-all
                      duration-200

                      hover:bg-[#b90005]
                      hover:shadow-[0_7px_18px_rgba(207,0,6,0.22)]

                      active:scale-[0.98]
                    "
                                    >
                                        Send message
                                    </button>
                                </div>

                                {/* SUCCESS MESSAGE */}

                                {submitted && (
                                    <div
                                        className="
                      rounded-[10px]

                      border
                      border-[#cce8d2]

                      bg-[#f1faf3]

                      px-4
                      py-3

                      text-[12px]
                      font-medium

                      text-[#28733b]
                    "
                                    >
                                        Thanks! Your message has been received. We&apos;ll
                                        get back to you shortly.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}