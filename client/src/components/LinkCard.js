import React from 'react';

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link</h2>

            <p>
                Your new minimized link :{' '}
                <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.to}
                </a>
            </p>
            <p>
                Source :{' '}
                <a href={link.from} target="_blank" rel="noopener noreferrer">
                    {link.from}
                </a>
            </p>
            <p>
                Click counter : <strong>{link.clicks}</strong>
            </p>
            <p>
                Data creation : <strong>{new Date(link.date).toLocaleDateString()}</strong>{' '}
            </p>
        </>
    );
};
