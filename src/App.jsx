import React from 'react';

import HeaderFooterBlock from './components/HeaderFooterBlock/HeaderFooterBlock';
import ModePage from './components/ModePage/ModePage';

import './App.scss';

function App() {

  return (
    <div className="wrapper-page">
      <div className="wrapper-page__container">

        <HeaderFooterBlock>
          <ModePage />
        </HeaderFooterBlock>

      </div>
    </div>
  );
}

export default App;
