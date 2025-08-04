import Popup from '@/widgets/Popup'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

function InviteCodePopup({ togglePopup, inviteId }) {
    // Use state to manage the button text and the URL
    const [buttonText, setButtonText] = useState('Copy');
    const urlToCopy = document.location.origin + "/invite/" + inviteId;

    // Use a ref to access the text field element for copying
    const urlRef = useRef(null);

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
                <div className="w-full">
                    {/* Title */}
                    <br />

                    {/* URL Display and Copy Button Container */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 bg-teal-50 dark:bg-gray-700 p-3 border border-teal-500 rounded-md">
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
                </div>
            </Popup>
        </div>
    )
}

export default InviteCodePopup