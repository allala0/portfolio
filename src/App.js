import React from 'react';

const Scene = React.lazy(() => import('./components/Scene'));

function App(){
    return (
        <Scene />
    );
}

export default App;
