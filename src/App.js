import React from 'react';

const Scene = React.lazy(() => import('./components/Scene'));
// const Scene = require('./components/Scene');

function App(){
    return (
        <Scene />
    );
}

export default App;
