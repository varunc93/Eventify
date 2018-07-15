import React from 'react';

const PageNotFound = ({history}) => (
    <div>
        <h1>Error 404: Page Not Found!</h1>
        <div onClick={() => history.push("/")} className="ui teal button">HomePage</div>
    </div>
);

export default PageNotFound;