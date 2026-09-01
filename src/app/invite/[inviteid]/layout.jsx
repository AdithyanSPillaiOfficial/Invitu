import { headers } from "next/headers";
import { cache } from "react";

const getInvite = cache(async (inviteid) => {
    // Await headers to read the request information
    const headersList = await headers();
    // Get the standard 'host' header or fallback to 'x-forwarded-host' for proxies
    let hostname = headersList.get('x-forwarded-host') || headersList.get('host');
    if (!hostname) hostname = process?.env?.NEXT_PUBLIC_SITE_HOST;
    console.log('Hostname : ' + hostname)

    const result = await fetch(
        `https://${hostname}/api/getinvitedetails`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inviteid }),
            cache: "no-store"
        }
    );

    if (!result.ok) return null;

    const res = await result.json();

    return res.success ? res.invite : null;
});

export async function generateMetadata({ params }) {
    const { inviteid } = await params;

    const invite = await getInvite(inviteid);
    const event = invite?.event;

    // Await headers to read the request information
    const headersList = await headers();
    // Get the standard 'host' header or fallback to 'x-forwarded-host' for proxies
    let hostname = headersList.get('x-forwarded-host') || headersList.get('host');
    if (!hostname) hostname = process?.env?.NEXT_PUBLIC_SITE_HOST;

    if (!event) {
        return {
            title: "Invitation",
            description: "You are invited to a special event!"
        };
    }

    const eventName =
        event.eventname ||
        event.title ||
        "Special Event";

    const hosts = Array.isArray(event.hostnames)
        ? event.hostnames.join(" & ")
        : event.hostnames || "";

    const date = event.date
        ? new Date(event.date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "";

    const time = event.time
        ? `${event.time}${event.endtime
            ? ` - ${event.endtime}`
            : ""
        }`
        : "";

    const description = [
        hosts,
        date,
        time,
        event.location
    ]
        .filter(Boolean)
        .join(" • ");

    const imageUrl = event.image
        ? event.image.startsWith("http")
            ? event.image
            : new URL(
                event.image,
                hostname
            ).toString()
        : `https://${hostname}/invite/${inviteid}/opengraph-image`;

    return {
        title: `${eventName} | You're Invited`,

        description,

        openGraph: {
            title: `${eventName} | You're Invited`,
            description,
            type: "website",

            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: eventName
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: `${eventName} | You're Invited`,
            description,
            images: [imageUrl]
        }
    };
}

export default function Layout({ children }) {
    return children;
}