import React, {Component, Prototype} from 'react';
import s from '../../../css/display.css';

const Display = (props) => (
  <div className={s.display}>{props.text}</div>
)

export default Display