import React from 'react';
import './App.scss';

function App() {
    return (
        <div className="main">
            <div className="content">
                <div className='name'>
                    <h1 className='h-no-gap'>Thomas W. Horn</h1>
                </div>
                <div className='blurb'>
                    <h1 className="h-no-gap">Software Engineer, Full Stack Developer, Passionate Tinkerer</h1>
                </div>
            </div>

            {/* left and right spacers */}
            <div className="left"></div>
            <div className="right"></div>
        </div>
    );
}

export default App;
