import React from 'react';

const customStyles = {
  fontFamily: 'Montserrat',
  fontSize: '32px',
  fontWeight: '600',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  color:'#243B55',
};

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src="../img/logo.png" alt="Logo" className="h-[80px] w-[80px] mr-1" />
      <span style={customStyles} className="text-xl font-bold text-gray-800">HUMMIE</span>
    </div>
  );
};

export default Logo;
