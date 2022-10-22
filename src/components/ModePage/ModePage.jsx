import React from 'react';
import {
  DollarSign,
  Plus,
  X,
  ArrowDownLeft,
  Check,
} from "react-feather";

import './ModePage.scss';

function ModePage() {
  return (
    <div className="mode-border-wrapper">
      <div className="mode-block">

        <div className="mode-block__game-content">
          <div className="mode-block__card">15</div>
        </div>

        <div className="mode-block__game-result">You win</div>

        <div className="mode-block__game-content">
          <div className="mode-block__card">21</div>
        </div>

        <div className="mode-block__container">
          <button className="mode-block__button">
            <ArrowDownLeft size={40} color="#e6e6e6" />
          </button>
          <button className="mode-block__button">
            <DollarSign size={40} color="#e6e6e6" />
          </button>
          <button className="mode-block__button">
            <Check size={40} color="#e6e6e6" />
          </button>
          <button className="mode-block__button">
            <X size={40} color="#e6e6e6" />
          </button>
          <button className="mode-block__button">
            <Plus size={40} color="#e6e6e6" />
          </button>
        </div>

        <div className="mode-block__container">
          <div className="mode-block__credits">Deposit:</div>
          <div className="mode-block__credits">Total bet:</div>
        </div>

      </div>
    </div>
  );
}

export default ModePage;
