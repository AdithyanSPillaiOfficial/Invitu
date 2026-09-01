import { ImageResponse } from "next/og";

export const runtime = "edge";

async function getInvite(inviteid) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/getinvitedetails`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inviteid }),
            cache: "no-store",
        }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.success ? data.invite : null;
}

export default async function Image({ params }) {
    const { inviteid } = await params;

    const invite = await getInvite(inviteid);
    const event = invite?.event;

    const eventName =
        event?.eventname ||
        event?.title ||
        "Special Event";

    const hosts = Array.isArray(event?.hostnames)
        ? event.hostnames.join(" & ")
        : event?.hostnames || "";

    const date = event?.date
        ? new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "";

    const time = event?.time
        ? `${event.time}${
              event?.endtime
                  ? ` - ${event.endtime}`
                  : ""
          }`
        : "";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",

                    background:
                        "linear-gradient(135deg, #e0f7ff 0%, #f8fdff 50%, #bae6fd 100%)",

                    color: "#164e63",

                    position: "relative",
                }}
            >
                {/* Background decoration */}

                <div
                    style={{
                        position: "absolute",
                        width: "420px",
                        height: "420px",
                        borderRadius: "9999px",
                        background: "#bae6fd",
                        opacity: 0.45,
                        top: "-180px",
                        left: "-130px",

                        // IMPORTANT
                        display: "flex",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "300px",
                        height: "300px",
                        borderRadius: "9999px",
                        background: "#7dd3fc",
                        opacity: 0.2,
                        right: "-100px",
                        bottom: "-120px",

                        // IMPORTANT
                        display: "flex",
                    }}
                />

                {/* Main card */}

                <div
                    style={{
                        width: "1040px",
                        height: "510px",

                        borderRadius: "36px",

                        background: "rgba(255,255,255,0.9)",

                        border:
                            "2px solid rgba(255,255,255,0.95)",

                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                        justifyContent: "center",

                        padding: "45px 70px",

                        position: "relative",

                        boxShadow:
                            "0 25px 60px rgba(14,116,144,0.15)",
                    }}
                >
                    {/* Invitation label */}

                    <div
                        style={{
                            display: "flex",

                            fontSize: "20px",
                            letterSpacing: "6px",
                            textTransform: "uppercase",

                            color: "#0284c7",
                            fontWeight: 700,

                            marginBottom: "18px",
                        }}
                    >
                        YOU ARE INVITED
                    </div>

                    {/* Event name */}

                    <div
                        style={{
                            display: "flex",

                            fontSize: "62px",
                            fontWeight: 700,

                            textAlign: "center",

                            color: "#164e63",

                            lineHeight: 1.05,

                            maxWidth: "850px",
                        }}
                    >
                        {eventName}
                    </div>

                    {/* Hosts */}

                    {hosts && (
                        <div
                            style={{
                                display: "flex",

                                fontSize: "30px",

                                marginTop: "18px",

                                color: "#0e7490",

                                fontWeight: 500,

                                textAlign: "center",
                            }}
                        >
                            {hosts}
                        </div>
                    )}

                    {/* Divider */}

                    <div
                        style={{
                            display: "flex",

                            width: "100px",
                            height: "3px",

                            background: "#38bdf8",

                            marginTop: "25px",
                            marginBottom: "25px",
                        }}
                    />

                    {/* Event details */}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",

                            alignItems: "center",
                            justifyContent: "center",

                            gap: "35px",

                            fontSize: "24px",

                            color: "#475569",

                            textAlign: "center",
                        }}
                    >
                        {date && (
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                📅 {date}
                            </div>
                        )}

                        {time && (
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                🕐 {time}
                            </div>
                        )}
                    </div>

                    {/* Location */}

                    {event?.location && (
                        <div
                            style={{
                                display: "flex",

                                fontSize: "22px",

                                color: "#64748b",

                                marginTop: "15px",

                                textAlign: "center",

                                maxWidth: "850px",
                            }}
                        >
                            📍 {event.location}
                        </div>
                    )}

                    {/* Footer */}

                    <div
                        style={{
                            display: "flex",

                            position: "absolute",

                            bottom: "25px",

                            fontSize: "17px",

                            letterSpacing: "3px",

                            color: "#0284c7",
                        }}
                    >
                        INVITU
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}