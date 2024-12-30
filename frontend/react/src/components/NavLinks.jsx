import React from 'react';
import Icon from './Icon';

const NavLink = ({ href, label, icon, className = '' }) => {
  const defaultClasses =
    'flex items-center hover:underline transition-colors duration-200';
  
  // Custom styles
  const customStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 800,
    lineHeight: '19.36px',
    textAlign: 'left',
    textUnderlinePosition: 'from-font',
    color:'#243B5599',
  };

  return (
    <a href={href} className={`${defaultClasses} ${className}`} style={customStyles}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </a>
  );
};

const NavLinks = ({ isMobile, links = [], className = '' }) => {
  const containerClasses = isMobile ? 'space-y-4' : 'flex space-x-6';

  return (
    <ul className={containerClasses}>
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.href}
            label={link.label}
            icon={<Icon name={link.icon} />}
            className={`${className}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
