import React from 'react';

export default function Card({ color, header, title, subtitle, body }) {
  function classes() {
    const bg = color ? ' text-bg-' + color : ' ';
    return 'card mb-3 ' + bg;
  }

  return (
    <div className={classes()} style={{ width: '18rem' }}>
      <div className='card-header'>{header}</div>
      <div className='card-body'>
        {title && <h5 className='card-title'>{title}</h5>}
        {subtitle && (
          <h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
        )}
        {(body && <div className='card-text'>{body}</div>) || (
          <h1>{'This is a test body'}</h1>
        )}
      </div>
    </div>
  );
}
