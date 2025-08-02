import Popup from '@/widgets/Popup'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

function InviteCodePopup({ togglePopup, inviteId }) {
    // Use state to manage the button text and the URL
    const [buttonText, setButtonText] = useState('Copy');
    const urlToCopy = "https://"+document.location.host+"/invite/"+inviteId;

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
        <div>
            <Popup title={"Share Invite"} togglePopup={togglePopup}>
                <div className="w-full">
                    {/* Title */}
                    <br />

                    {/* URL Display and Copy Button Container */}
                    <div className="flex items-center space-x-2 bg-teal-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-teal-500">
                        {/* URL text display */}
                        <div
                            ref={urlRef}
                            className="flex-grow font-mono text-gray-700 dark:text-gray-200 text-sm md:text-base overflow-hidden whitespace-nowrap overflow-ellipsis"
                        >
                            {urlToCopy}
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
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