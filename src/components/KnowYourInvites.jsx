import React, { useEffect, useMemo, useState } from "react";

/**
 * InvitesDashboard
 * Shows every invite a user has received as a ticket-style card.
 * Click a card to open the full invite in a modal.
 *
 * Pass the raw API payload as `apiResponse` (shape: { success, invites: [...] }).
 * Each entry in `invites` is rendered as one card, so if the same event
 * appears more than once (e.g. multiple household invites), each still
 * gets its own ticket — matching what the API actually returns.
 */

const SAMPLE_DATA = {
    success: true,
    invites: [
        {
            attendee: {
                name: "Eagle 🦅",
                email: "eagle@gmail.com",
                address: "Koodal, Pathanamthitta",
                phone: "65766766866",
                noofpersons: "3",
            },
            id: "6891528e987d66aad9046b0f",
            eventid: "6881423a4c97348cda3c6e11",
            event: {
                _id: "6881423a4c97348cda3c6e11",
                title: "Karthik Surya Reception",
                type: "wedding",
                bridename: "Varsha B",
                groomname: "Karthik Surya",
                location: "Travancore International Convention Centre, Karyavattom, Trivandrum",
                date: "2025-09-01",
                housename: "",
                otherevent: "",
                time: "18:00",
                endtime: "23:59",
                inviteid: "688e9db458efd54279f1f675",
                regards: "Suresh Kumar, Molly, Ghost & Lady",
            },
        },
        {
            attendee: {
                name: "Eagle Gaming & Family",
                email: "eagle@gmail.com",
                address: "Koodal, Pathanamthitta",
                phone: "6266262",
                noofpersons: 1,
                inviteid: "68b23912559de280c8ee7851",
            },
            id: "68b23912559de280c8ee7851",
            eventid: "6881423a4c97348cda3c6e11",
            event: {
                _id: "6881423a4c97348cda3c6e11",
                title: "Karthik Surya Reception",
                type: "wedding",
                bridename: "Varsha B",
                groomname: "Karthik Surya",
                location: "Travancore International Convention Centre, Karyavattom, Trivandrum",
                date: "2025-09-01",
                housename: "",
                otherevent: "",
                time: "18:00",
                endtime: "23:59",
                inviteid: "688e9db458efd54279f1f675",
                regards: "Suresh Kumar, Molly, Ghost & Lady",
            },
        },
        {
            attendee: {
                name: "Eagle 🦅",
                email: "eagle@gmail.com",
                address: "Koodal, Pathanamthitta",
                phone: "65766766866",
                noofpersons: "4",
            },
            id: "689152a0987d66aad9046b12-demo",
            eventid: "demo-housewarming",
            event: {
                _id: "demo-housewarming",
                title: "Grihapravesham",
                type: "housewarming",
                bridename: "",
                groomname: "",
                location: "Anjali Nivas, Kottayam Road, Pathanamthitta",
                date: "2026-11-14",
                housename: "Anjali Nivas",
                otherevent: "",
                time: "09:30",
                endtime: "13:00",
                inviteid: "demo-2",
                regards: "Rekha & Vinod",
            },
        },
    ],
};

const PALETTE = {
    inkTeal: "#0B3B39",
    deepTeal: "#0F4A46",
    midTeal: "#17756C",
    brightTeal: "#2E9E93",
    paleTeal: "#E7F1EE",
    gold: "#C9A227",
    softGold: "#E7D6A0",
    ivory: "#FBF6EC",
    text: "#122A27",
    fade: "#5C7C78",
};

function loadFonts() {
    if (typeof document === "undefined") return;
    if (document.getElementById("event-invite-fonts")) return;
    const link = document.createElement("link");
    link.id = "event-invite-fonts";
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap";
    document.head.appendChild(link);
}

function parseEventDate(event) {
    if (!event?.date) return null;
    const [y, m, d] = event.date.split("-").map(Number);
    if (!y || !m || !d) return null;
    const [eh, em] = (event.endtime || "23:59").split(":").map(Number);
    return new Date(y, m - 1, d, eh || 23, em || 59);
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(t) {
    if (!t) return "";
    const [hStr, mStr] = t.split(":");
    let h = Number(hStr);
    const period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mStr} ${period}`;
}

function dayMonth(dateStr) {
    if (!dateStr) return { day: "--", month: "" };
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return {
        day: String(d).padStart(2, "0"),
        month: dt.toLocaleDateString("en-IN", { month: "short" }),
        weekday: dt.toLocaleDateString("en-IN", { weekday: "short" }),
    };
}

function guestCount(noofpersons) {
    const n = parseInt(noofpersons, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
}

function headlineFor(event) {
    const type = (event?.type || "").toLowerCase();
    if (type === "wedding" && (event.bridename || event.groomname)) {
        return { kind: "wedding", names: [event.bridename, event.groomname].filter(Boolean), subtitle: event.title, label: "Wedding" };
    }
    if (type === "housewarming" && event.housename) {
        return { kind: "housewarming", names: [event.housename], subtitle: event.title, label: "Housewarming" };
    }
    if (event?.otherevent) {
        return { kind: "other", names: [event.otherevent], subtitle: event.title, label: event.type || "Event" };
    }
    return { kind: "generic", names: [event?.title || "Event"], subtitle: "", label: event?.type || "Event" };
}

function calendarLink(event) {
    if (!event?.date) return null;
    const start = `${event.date.replace(/-/g, "")}T${(event.time || "00:00").replace(":", "")}00`;
    const end = `${event.date.replace(/-/g, "")}T${(event.endtime || "23:59").replace(":", "")}00`;
    const text = encodeURIComponent(event.title || "Event");
    const details = encodeURIComponent(event.regards || "");
    const loc = encodeURIComponent(event.location || "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${loc}`;
}

function Motif({ kind, size = 30 }) {
    const stroke = PALETTE.gold;
    if (kind === "wedding") {
        return (
            <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
                <circle cx="17" cy="23" r="9" stroke={stroke} strokeWidth="1.6" />
                <circle cx="29" cy="23" r="9" stroke={stroke} strokeWidth="1.6" />
            </svg>
        );
    }
    if (kind === "housewarming") {
        return (
            <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
                <path d="M8 22 23 9l15 13" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20v15h22V20" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    return (
        <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
            <path d="M23 6c4 6 4 10 0 16-4-6-4-10 0-16Z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="23" cy="30" r="8" stroke={stroke} strokeWidth="1.6" />
        </svg>
    );
}

function IconLine({ path, color = PALETTE.brightTeal, size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d={path} stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const ICONS = {
    pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 20c0-2.5-1.2-4.7-3-5.9M14 5.2A3 3 0 1 1 15.5 11",
    clock: "M12 8v4l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    phone: "M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.6 19 5 13.4 5 6a2 2 0 0 1 1-3Z",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
    close: "M6 6l12 12M18 6 6 18",
};

function InviteCard({ invite, onOpen }) {
    const { attendee, event } = invite;
    const headline = headlineFor(event);
    const { day, month, weekday } = dayMonth(event.date);
    const past = parseEventDate(event) ? parseEventDate(event) < new Date() : false;

    return (
        <button
            onClick={() => onOpen(invite)}
            className="ei-card text-left w-full flex rounded-md overflow-hidden transition-transform"
            style={{
                background: PALETTE.ivory,
                border: `1px solid ${PALETTE.softGold}`,
                opacity: past ? 0.72 : 1,
            }}
        >
            <div
                className="flex flex-col items-center justify-center px-4 py-5 shrink-0"
                style={{ background: PALETTE.deepTeal, color: PALETTE.ivory, width: "92px" }}
            >
                <span className="text-xs uppercase tracking-wide" style={{ color: PALETTE.softGold }}>
                    {weekday}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl leading-none mt-1">
                    {day}
                </span>
                <span className="text-xs mt-1" style={{ color: PALETTE.softGold }}>
                    {month}
                </span>
            </div>

            <div className="relative flex flex-col justify-center px-2" aria-hidden="true">
                <span
                    className="block w-3 h-3 rounded-full absolute -top-1.5 -left-1.5"
                    style={{ background: PALETTE.inkTeal }}
                />
                <span
                    className="block w-3 h-3 rounded-full absolute -bottom-1.5 -left-1.5"
                    style={{ background: PALETTE.inkTeal }}
                />
                <div className="h-full border-l border-dashed" style={{ borderColor: PALETTE.softGold }} />
            </div>

            <div className="flex-1 px-4 py-4 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: PALETTE.paleTeal, color: PALETTE.midTeal }}
                    >
                        {headline.label}
                    </span>
                    {past && (
                        <span className="text-xs" style={{ color: PALETTE.fade }}>
                            Past event
                        </span>
                    )}
                </div>

                <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.text }}
                    className="text-xl sm:text-2xl mt-1 truncate"
                >
                    {headline.kind === "wedding" ? headline.names.join(" & ") : headline.names[0]}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: PALETTE.fade }}>
                    <IconLine path={ICONS.pin} size={14} />
                    <span className="truncate">{event.location}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: PALETTE.midTeal }}>
                        <IconLine path={ICONS.users} size={14} />
                        {guestCount(attendee.noofpersons)} guest{guestCount(attendee.noofpersons) > 1 ? "s" : ""}
                    </div>
                    <span className="text-sm underline" style={{ color: PALETTE.gold }}>
                        View invite
                    </span>
                </div>
            </div>
        </button>
    );
}

function InviteModal({ invite, onClose }) {
    const { attendee, event } = invite;
    const headline = headlineFor(event);
    const persons = guestCount(attendee.noofpersons);
    const calLink = calendarLink(event);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(6, 26, 24, 0.72)" }}
            onClick={onClose}
        >
            <div
                className="ei-modal w-full max-w-md rounded-lg overflow-hidden relative"
                style={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.softGold}`, maxHeight: "90vh", overflowY: "auto" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close invite"
                    className="absolute top-3 right-3 z-10 rounded-full p-1.5"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                >
                    <IconLine path={ICONS.close} color={PALETTE.ivory} size={16} />
                </button>

                <div
                    className="px-8 pt-10 pb-8 text-center"
                    style={{ background: `linear-gradient(180deg, ${PALETTE.deepTeal}, ${PALETTE.midTeal})`, color: PALETTE.ivory }}
                >
                    <div className="flex justify-center mb-4">
                        <Motif kind={headline.kind} size={40} />
                    </div>

                    {headline.kind === "wedding" ? (
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl leading-tight">
                            {headline.names[0]}
                            <span style={{ color: PALETTE.softGold }} className="block text-xl my-1 italic">
                                weds
                            </span>
                            {headline.names[1]}
                        </h1>
                    ) : (
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl leading-tight">
                            {headline.names[0]}
                        </h1>
                    )}

                    {headline.subtitle && headline.subtitle !== headline.names[0] && (
                        <p style={{ color: PALETTE.softGold }} className="mt-3 text-sm tracking-wide">
                            {headline.subtitle}
                        </p>
                    )}
                </div>

                <div className="px-8 py-8 flex flex-col gap-5">
                    <div className="flex items-start gap-3">
                        <IconLine path={ICONS.clock} />
                        <div>
                            <p className="text-sm" style={{ color: PALETTE.midTeal }}>
                                {formatDate(event.date)}
                            </p>
                            <p className="text-sm opacity-80">
                                {formatTime(event.time)} – {formatTime(event.endtime)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <IconLine path={ICONS.pin} />
                        <p className="text-sm leading-relaxed">{event.location}</p>
                    </div>

                    <div className="h-px w-full my-1" style={{ background: PALETTE.softGold, opacity: 0.5 }} />

                    <div>
                        <p className="text-sm" style={{ color: PALETTE.midTeal }}>
                            Dear {attendee.name.trim()},
                        </p>
                        <p className="text-sm mt-1 leading-relaxed">
                            You{persons > 1 ? ` and ${persons - 1} guest${persons - 1 > 1 ? "s" : ""}` : ""}{" "}
                            {persons > 1 ? "are" : "is"} cordially invited. Please carry this invite for entry.
                        </p>
                    </div>

                    {attendee.phone && (
                        <div className="flex items-start gap-3">
                            <IconLine path={ICONS.phone} />
                            <p className="text-sm">{attendee.phone}</p>
                        </div>
                    )}

                    {event.regards && (
                        <p className="text-sm italic mt-1" style={{ color: PALETTE.midTeal }}>
                            With warm regards, {event.regards}
                        </p>
                    )}

                    {calLink && (
                        <a
                            href={calLink}
                            target="_blank"
                            rel="noreferrer"
                            className="ei-link mt-1 text-sm text-center rounded-md py-2.5"
                            style={{ background: PALETTE.gold, color: PALETTE.inkTeal, fontWeight: 500 }}
                        >
                            Save the date
                        </a>
                    )}
                    <a
                        href={`https://${window.location.host}/invite/${invite.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ei-link mt-1 text-sm text-center rounded-md py-2.5"
                        style={{ background: PALETTE.gold, color: PALETTE.inkTeal, fontWeight: 500 }}
                    >
                        View Event card
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function KnowYourInvites({ invites }) {
    useEffect(loadFonts, []);

    console.log(invites);

    const [query, setQuery] = useState("");
    const [tab, setTab] = useState("all");
    const [openInvite, setOpenInvite] = useState(null);

    const now = useMemo(() => new Date(), []);

    const filtered = useMemo(() => {
        return invites
            .filter((inv) => {
                const isPast = parseEventDate(inv.event) ? parseEventDate(inv.event) < now : false;
                if (tab === "upcoming" && isPast) return false;
                if (tab === "past" && !isPast) return false;
                return true;
            })
            .filter((inv) => {
                if (!query.trim()) return true;
                const h = headlineFor(inv.event);
                const haystack = [
                    inv.event.title,
                    inv.event.location,
                    h.names.join(" "),
                    h.label,
                ]
                    .join(" ")
                    .toLowerCase();
                return haystack.includes(query.trim().toLowerCase());
            })
            .sort((a, b) => (parseEventDate(a.event)?.getTime() || 0) - (parseEventDate(b.event)?.getTime() || 0));
    }, [invites, tab, query, now]);

    const upcomingCount = useMemo(
        () => invites.filter((inv) => parseEventDate(inv.event) && parseEventDate(inv.event) >= now).length,
        [invites, now]
    );

    return (
        <div
            style={{
                background: `radial-gradient(circle at 50% -10%, ${PALETTE.deepTeal}, ${PALETTE.inkTeal} 65%)`,
                fontFamily: "Jost, sans-serif",
                color: PALETTE.text,
                minHeight: "100%",
            }}
            className="w-full h-screen px-4 sm:px-8 py-10"
        >
            <style>{`
        .ei-card:hover { transform: translateY(-2px); }
        .ei-card:focus-visible, .ei-tab:focus-visible, .ei-search:focus-visible, .ei-link:focus-visible {
          outline: 2px solid ${PALETTE.brightTeal};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ei-card { transition: none !important; }
        }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                    <div>
                        <h1
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.ivory }}
                            className="text-4xl sm:text-5xl"
                        >
                            Your invitations
                        </h1>
                        <p style={{ color: PALETTE.softGold }} className="text-sm mt-1">
                            {invites.length} invite{invites.length !== 1 ? "s" : ""} · {upcomingCount} upcoming
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex gap-5">
                        {[
                            { id: "all", label: "All" },
                            { id: "upcoming", label: "Upcoming" },
                            { id: "past", label: "Past" },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className="ei-tab text-sm pb-1"
                                style={{
                                    color: tab === t.id ? PALETTE.ivory : PALETTE.fade,
                                    borderBottom: tab === t.id ? `2px solid ${PALETTE.gold}` : "2px solid transparent",
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative sm:ml-auto w-full sm:w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <IconLine path={ICONS.search} color={PALETTE.fade} size={15} />
                        </span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search invitations"
                            className="ei-search w-full text-sm rounded-md pl-9 pr-3 py-2"
                            style={{ background: PALETTE.ivory, color: PALETTE.text, border: `1px solid ${PALETTE.softGold}` }}
                        />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div
                        className="rounded-md py-16 text-center"
                        style={{ background: PALETTE.deepTeal, color: PALETTE.paleTeal, border: `1px solid ${PALETTE.midTeal}` }}
                    >
                        <p className="text-sm">No invitations match here yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {filtered.map((inv) => (
                            <InviteCard key={inv.id} invite={inv} onOpen={setOpenInvite} />
                        ))}
                    </div>
                )}
            </div>

            {openInvite && <InviteModal invite={openInvite} onClose={() => setOpenInvite(null)} />}
        </div>
    );
}