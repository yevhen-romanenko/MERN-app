import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">You have no links yet!</p>;
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Source link</th>
                    <th>Minimized</th>
                    <th>Clicks</th>
                    <th>Open Link</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>{link.clicks}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open Details</Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
