import React from 'react';
import s from '../../../css/button.css';

const Button = (props) => {
  const className = `${s.button}`.concat(props.size == 'large' ? ` ${s.buttonLarge}` : ``).concat(props.fill == 'yes' ? ` ${s.fill}`: ``);
  return <div className={className} onClick={props.buttonPress}>{props.text}</div>
}

export default Button