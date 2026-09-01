import Popup from '@/widgets/Popup'
import { Share } from 'lucide-react';
import React, { useRef, useState } from 'react'
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

function InviteCodePopup({ togglePopup, inviteId, event }) {
    // Use state to manage the button text and the URL
    const [buttonText, setButtonText] = useState('Copy');
    const urlToCopy = document.location.origin + "/invite/" + inviteId;

    // Use a ref to access the text field element for copying
    const urlRef = useRef(null);

    const handleShare = async () => {
        console.log(event);
        const shareData = {
            title : event.title,
            text : [event.title, event?.otherevent, `${event.groom}${event?.bride ? ` weds ${event?.bride}` : ''}`, event.housename, event.birthdayperson , event.date, `${event.time}${event?.endtime ? ` to ${event?.endtime}` : ''}`, event.location ].filter(x => x && x !== 'undefined').join(' - '),
            url : `https://${window.location.hostname}/invite/${inviteId}`
        };
        try {
            if(navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.title} ${shareData.text} ${shareData.url} `);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error While Sharing")
        }
    }

    // This function handles the click event of the copy button
    const handleCopy = () => {
        // Select the text in the div
        const range = document.createRange();
        range.selectNode(urlRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Execute the copy command
        try {
            document.execCommand('copy');
            // Update the button text to show success feedback
            setButtonText('Copied!');
            toast.success("Invite Link Copied!")
            // Reset the button text after a short delay
            setTimeout(() => {
                setButtonText('Copy');
            }, 2000); // 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
            setButtonText('Error');
        }

        // Deselect the text
        window.getSelection().removeAllRanges();
    };

    return (
        <div className='box-border'>
            <Popup title={"Share Invite"} togglePopup={togglePopup}>
                <div className="w-auto flex md:flex-row flex-col justify-center items-center box-border">
                    {/* Title */}
                    <br />

                    <div className='w-65 flex flex-col items-center text-center mb-5 p-3 md:mr-3 border border-teal-500 rounded-md'>
                        <div>Scan to Share</div>
                        <QRCode value={urlToCopy} size={200} />
                    </div>

                    <div className='flex flex-col max-w-full'>
                        {/* URL Display and Copy Button Container */}
                        <div className="flex flex-col h-15 max-w-full sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 bg-teal-50 dark:bg-gray-700 p-3 border border-teal-500 rounded-md gap-5">
                            {/* URL text display */}
                            <div
                                ref={urlRef}
                                className="w-full sm:flex-grow font-mono text-gray-700 dark:text-gray-200 text-sm md:text-base break-words"
                            >
                                {urlToCopy}
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                            >
                                {buttonText}
                            </button>
                        </div>
                        <div className='w-full flex mt-20 justify-center'>
                            <div className='w-min p-5 flex flex-row gap-2 bg-teal-700 text-white rounded-3xl' onClick={handleShare}>
                                <Share />
                                Share
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default InviteCodePopup