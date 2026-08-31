
"use client";

import React from "react";
import QRCode from "react-qr-code";

const OthersEventInvites = ({ invite }) => {
    function formatTextDate(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);

        const weekday = date.toLocaleDateString("en-US", {
            weekday: "long",
        });

        const day = date.getDate();

        const month = date.toLocaleDateString("en-US", {
            month: "long",
        });

        const year = date.getFullYear();

        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;

            return (
                n +
                (s[(v - 20) % 10] || s[v] || s[0])
            );
        }

        return `${weekday}, ${getOrdinal(day)} of ${month} ${year}`;
    }

    const renderHostNames = (names) => {
        if (!names) return null;

        if (Array.isArray(names)) {
            return names.map((name, index) => (
                <h2
                    key={index}
                    className="event-host"
                >
                    {name}
                </h2>
            ));
        }

        return (
            <h2 className="event-host">
                {names}
            </h2>
        );
    };

    return (
        <div className="event-page">
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Great+Vibes&display=swap');

                * {
                    box-sizing: border-box;
                }

                .event-page {
                    min-height: 100vh;
                    width: 100%;
                    padding: 24px 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 10% 10%,
                            rgba(186, 230, 253, 0.9),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 90% 20%,
                            rgba(224, 242, 254, 0.95),
                            transparent 32%
                        ),
                        radial-gradient(
                            circle at 50% 100%,
                            rgba(125, 211, 252, 0.4),
                            transparent 40%
                        ),
                        linear-gradient(
                            135deg,
                            #eaf8ff 0%,
                            #f7fcff 48%,
                            #e0f2fe 100%
                        );

                    font-family: "DM Sans", sans-serif;
                    color: #17324d;
                }

                /* Decorative floating shapes */

                .blob {
                    position: absolute;
                    border-radius: 999px;
                    filter: blur(1px);
                    pointer-events: none;
                }

                .blob-one {
                    width: 220px;
                    height: 220px;
                    top: -100px;
                    left: -90px;
                    background: rgba(125, 211, 252, 0.28);
                }

                .blob-two {
                    width: 180px;
                    height: 180px;
                    right: -70px;
                    bottom: 8%;
                    background: rgba(186, 230, 253, 0.35);
                }

                .blob-three {
                    width: 80px;
                    height: 80px;
                    right: 12%;
                    top: 12%;
                    background: rgba(255, 255, 255, 0.65);
                }

                /* Main invitation */

                .invitation-card {
                    width: 100%;
                    max-width: 620px;
                    position: relative;
                    overflow: hidden;

                    border: 1px solid rgba(255, 255, 255, 0.9);
                    border-radius: 32px;

                    background: rgba(255, 255, 255, 0.72);

                    box-shadow:
                        0 30px 80px rgba(14, 116, 144, 0.15),
                        0 8px 25px rgba(30, 64, 175, 0.08);

                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);

                    padding: 42px 26px 38px;
                }

                .inner-border {
                    position: absolute;
                    inset: 10px;
                    border-radius: 24px;
                    border: 1px solid rgba(56, 189, 248, 0.18);
                    pointer-events: none;
                }

                /* Top ornament */

                .ornament {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 18px;
                }

                .ornament-line {
                    height: 1px;
                    width: 55px;
                    background: linear-gradient(
                        to right,
                        transparent,
                        #38bdf8
                    );
                }

                .ornament-line.right {
                    background: linear-gradient(
                        to left,
                        transparent,
                        #38bdf8
                    );
                }

                .ornament-diamond {
                    width: 9px;
                    height: 9px;
                    transform: rotate(45deg);
                    border: 1px solid #38bdf8;
                    background: #e0f7ff;
                }

                /* Main heading */

                .eyebrow {
                    text-align: center;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    font-size: 10px;
                    font-weight: 700;
                    color: #0284c7;
                    margin-bottom: 8px;
                }

                .main-title {
                    text-align: center;
                    font-family: "Great Vibes", cursive;
                    font-size: clamp(48px, 13vw, 72px);
                    line-height: 1;
                    font-weight: 400;
                    color: #0369a1;
                    margin: 0;
                }

                .subtitle {
                    text-align: center;
                    max-width: 460px;
                    margin: 14px auto 0;
                    color: #557086;
                    font-size: 14px;
                    line-height: 1.7;
                }

                /* Event title */

                .event-heading {
                    text-align: center;
                    margin: 32px 0 12px;
                }

                .event-heading-label {
                    font-family: "DM Sans", sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-size: 9px;
                    font-weight: 700;
                    color: #38bdf8;
                    margin-bottom: 7px;
                }

                .event-heading-title {
                    font-family: "Cormorant Garamond", serif;
                    font-size: clamp(31px, 8vw, 46px);
                    line-height: 1.05;
                    font-weight: 600;
                    color: #164e63;
                    margin: 0;
                }

                /* Hosts */

                .hosts {
                    text-align: center;
                    margin-top: 22px;
                }

                .event-host {
                    font-family: "Great Vibes", cursive;
                    font-size: clamp(35px, 9vw, 52px);
                    line-height: 1.15;
                    font-weight: 400;
                    color: #0e7490;
                    margin: 0;
                }

                .host-divider {
                    width: 42px;
                    height: 2px;
                    margin: 13px auto;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        #38bdf8,
                        transparent
                    );
                }

                /* Decorative center icon */

                .center-icon {
                    width: 54px;
                    height: 54px;
                    margin: 20px auto;
                    border-radius: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: linear-gradient(
                        145deg,
                        #ffffff,
                        #e0f7ff
                    );

                    border: 1px solid #bae6fd;

                    box-shadow:
                        0 8px 25px rgba(14, 116, 144, 0.12);

                    animation: floatIcon 3s ease-in-out infinite;
                }

                .center-icon svg {
                    width: 26px;
                    height: 26px;
                    color: #0284c7;
                }

                @keyframes floatIcon {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-6px);
                    }
                }

                /* Attendee */

                .attendee {
                    margin-top: 28px;
                    padding: 18px 16px;
                    text-align: center;

                    border-radius: 18px;

                    background: rgba(224, 242, 254, 0.55);
                    border: 1px solid rgba(125, 211, 252, 0.3);
                }

                .attendee-label {
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: #0284c7;
                    font-weight: 700;
                    margin-bottom: 7px;
                }

                .attendee-name {
                    font-family: "Cormorant Garamond", serif;
                    font-size: 24px;
                    font-weight: 600;
                    color: #164e63;
                }

                .attendee-address {
                    margin-top: 4px;
                    font-size: 12px;
                    color: #64748b;
                    line-height: 1.5;
                }

                /* Details */

                .details {
                    margin-top: 24px;
                    display: grid;
                    gap: 10px;
                }

                .detail-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;

                    padding: 14px;

                    border-radius: 17px;

                    background: rgba(255, 255, 255, 0.72);
                    border: 1px solid rgba(186, 230, 253, 0.7);

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .detail-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 22px rgba(14, 116, 144, 0.08);
                }

                .detail-icon {
                    flex: 0 0 42px;
                    width: 42px;
                    height: 42px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 13px;

                    background: #e0f7ff;
                    color: #0284c7;
                }

                .detail-icon svg {
                    width: 20px;
                    height: 20px;
                }

                .detail-content {
                    min-width: 0;
                }

                .detail-label {
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #7c8fa1;
                    font-weight: 700;
                    margin-bottom: 3px;
                }

                .detail-text {
                    font-family: "Cormorant Garamond", serif;
                    font-size: 17px;
                    font-weight: 600;
                    color: #164e63;
                    line-height: 1.25;
                    word-break: break-word;
                }

                /* RSVP */

                .rsvp {
                    margin: 28px auto 0;
                    width: fit-content;
                    text-align: center;
                }

                .qr-wrapper {
                    display: inline-block;
                    padding: 9px;
                    border-radius: 18px;

                    background: white;

                    box-shadow:
                        0 10px 30px rgba(14, 116, 144, 0.12);

                    border: 1px solid #d9f3ff;
                }

                .qr-label {
                    margin-top: 8px;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    color: #0284c7;
                }

                .rsvp-title {
                    font-family: "Cormorant Garamond", serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: #164e63;
                    margin-bottom: 9px;
                }

                /* Footer */

                .footer {
                    text-align: center;
                    margin-top: 30px;
                }

                .footer-script {
                    font-family: "Great Vibes", cursive;
                    font-size: 30px;
                    color: #0e7490;
                }

                .footer-name {
                    margin-top: 3px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #0369a1;
                }

                /* Bottom ornament */

                .bottom-ornament {
                    margin: 30px auto 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .bottom-line {
                    width: 70px;
                    height: 1px;
                    background: linear-gradient(
                        to right,
                        transparent,
                        #7dd3fc
                    );
                }

                .bottom-line.right {
                    background: linear-gradient(
                        to left,
                        transparent,
                        #7dd3fc
                    );
                }

                .bottom-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #38bdf8;
                }

                /* Mobile */

                @media (max-width: 480px) {
                    .event-page {
                        padding: 12px 8px;
                        align-items: flex-start;
                    }

                    .invitation-card {
                        border-radius: 26px;
                        padding: 32px 17px 30px;
                    }

                    .inner-border {
                        inset: 7px;
                        border-radius: 20px;
                    }

                    .subtitle {
                        font-size: 13px;
                        padding: 0 8px;
                    }

                    .event-heading {
                        margin-top: 27px;
                    }

                    .detail-card {
                        padding: 12px;
                    }

                    .detail-icon {
                        flex-basis: 38px;
                        width: 38px;
                        height: 38px;
                    }

                    .detail-text {
                        font-size: 16px;
                    }

                    .attendee {
                        margin-top: 23px;
                    }
                }
            `}</style>

            {/* Background decoration */}
            <div className="blob blob-one" />
            <div className="blob blob-two" />
            <div className="blob blob-three" />

            <main className="invitation-card">
                <div className="inner-border" />

                {/* Top ornament */}
                <div className="ornament">
                    <div className="ornament-line" />
                    <div className="ornament-diamond" />
                    <div className="ornament-line right" />
                </div>

                {/* Header */}
                <div className="eyebrow">
                    You Are Invited
                </div>

                <h1 className="main-title">
                    A Special Celebration
                </h1>

                <p className="subtitle">
                    We would be delighted to have you with us
                    as we gather together to celebrate a
                    beautiful occasion.
                </p>

                {/* Event heading */}
                <div className="event-heading">
                    <div className="event-heading-label">
                        Join Us For
                    </div>

                    <h2 className="event-heading-title">
                        {invite?.event?.eventname ||
                            invite?.event?.title ||
                            "A Special Event"}
                    </h2>
                </div>

                {/* Hosts */}
                <div className="hosts">
                    {renderHostNames(invite?.event?.hostnames)}

                    <div className="host-divider" />

                    <div className="center-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path
                                d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
                            />
                            <path
                                d="M19 16l.7 1.8L21.5 18l-1.8.7L19 20.5l-.7-1.8-1.8-.7 1.8-.7L19 16z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Attendee */}
                <div className="attendee">
                    <div className="attendee-label">
                        With Warm Regards To
                    </div>

                    <div className="attendee-name">
                        {invite?.attendee?.name}
                    </div>

                    {invite?.attendee?.address && (
                        <div className="attendee-address">
                            {invite.attendee.address}
                        </div>
                    )}
                </div>

                {/* RSVP */}
                <div className="rsvp">
                    <div className="rsvp-title">
                        Kindly RSVP
                    </div>

                    <div className="qr-wrapper">
                        <QRCode
                            value={String(invite?._id || "")}
                            size={92}
                            bgColor="#ffffff"
                            fgColor="#164e63"
                        />

                        <div className="qr-label">
                            Scan to RSVP
                        </div>
                    </div>
                </div>

                {/* Event details */}
                <div className="details">
                    {/* Date */}
                    <div className="detail-card">
                        <div className="detail-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="17"
                                    rx="3"
                                />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </div>

                        <div className="detail-content">
                            <div className="detail-label">
                                Date
                            </div>

                            <div className="detail-text">
                                {formatTextDate(
                                    invite?.event?.date
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="detail-card">
                        <div className="detail-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                        </div>

                        <div className="detail-content">
                            <div className="detail-label">
                                Time
                            </div>

                            <div className="detail-text">
                                {invite?.event?.time}

                                {invite?.event?.endtime
                                    ? ` — ${invite.event.endtime}`
                                    : ""}
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="detail-card">
                        <div className="detail-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                        </div>

                        <div className="detail-content">
                            <div className="detail-label">
                                Venue
                            </div>

                            <div className="detail-text">
                                {invite?.event?.location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <div className="footer-script">
                        With Love,
                    </div>

                    <div className="footer-name">
                        {invite?.event?.regards || "INVITU"}
                    </div>
                </div>

                {/* Bottom ornament */}
                <div className="bottom-ornament">
                    <div className="bottom-line" />
                    <div className="bottom-dot" />
                    <div className="bottom-dot" />
                    <div className="bottom-dot" />
                    <div className="bottom-line right" />
                </div>
            </main>
        </div>
    );
};

export default OthersEventInvites;

