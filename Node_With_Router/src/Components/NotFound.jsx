import React from 'react';
import {Link} from "react-router";

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default NotFound;
