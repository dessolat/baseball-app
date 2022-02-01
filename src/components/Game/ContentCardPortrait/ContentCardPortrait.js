import React from 'react';

const ContentCardPortrait = ({ className, src, cl, ...props }) => {
  return (
    <div className={cl.portrait} {...props}>
      <img className={className} src={src} alt='Portrait' />
    </div>
  );
};

export default ContentCardPortrait;
