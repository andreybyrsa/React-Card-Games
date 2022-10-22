import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './HeaderFooterBlock.scss';

const modes = [
  'BlackJack 21', 'Baccarat',
];

function HeaderFooterBlock({
  children,
}) {
  const [currentMode, setCurrentMode] = useState('BlackJack 21');

  const getCurrentMode = (mode) => {
    if (mode === currentMode) {
      return;
    }
    setCurrentMode(modes.filter(str => str === mode).join(''));
  }

  return (
    <>
      <div className="header-border-wrapper">
        <p className="header-page__title">{currentMode}</p>
      </div>

      <div className="content-page">
        {children}
      </div>

      <div className="footer-border-wrapper">
        <div className="footer-page-container">
          <button
            onClick={() => getCurrentMode(modes[0])}
            className="footer-page-container__button"
          >
            {modes[0]}
          </button>
          <button
            onClick={() => getCurrentMode(modes[1])}
            className="footer-page-container__button"
          >
            {modes[1]}
          </button>
        </div>
      </div>
    </>
  );
}

HeaderFooterBlock.defaultProps = {
  children: null,
};

HeaderFooterBlock.propTypes = {
  children: PropTypes.element,
};

export default HeaderFooterBlock;
