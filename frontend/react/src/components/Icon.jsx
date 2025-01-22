import React from 'react';

const Icon = ({ name, className = 'w-5 h-5' ,src}) => {
  const icons = {
    home: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 50 50"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"
          />
        </svg>
      ),
      
    about: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12h4.5" />
      </svg>
    ),
    contact: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5L2.25 6.75"
        />
      </svg>
    ),
    notification: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={className}
      >
        <path
          d="M256 73.825c-100.613 0-182.18 81.562-182.18 182.17a182.18 182.18 0 0 0 364.36 0c0-100.608-81.572-182.17-182.18-182.17zm0 282.92a23.683 23.683 0 0 1-23.682-23.678h47.36A23.68 23.68 0 0 1 256 356.745zm80.015-47.425c0 8.753-7.092 9.334-15.841 9.334H191.822c-8.749 0-15.837-.58-15.837-9.334v-1.512a15.814 15.814 0 0 1 9.009-14.247l5.03-43.418a66.01 66.01 0 0 1 52.41-64.591v-16.857a13.572 13.572 0 0 1 27.146 0v16.857a66.01 66.01 0 0 1 52.404 64.591l5.032 43.427a15.793 15.793 0 0 1 9.009 14.238v1.512z"
        />
      </svg>
    ),
    login: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-1">
        <g fill="none" stroke="currentColor">
          <path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
          <circle cx="12" cy="7" r="3" />
        </g>
      </svg> 
    ),
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 50 50" className={className}>
      <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
      </svg>
    ),
    location: (
     
          <img
            src={src ||"../img/location.svg"}
            alt="location"
            className={className}
          />
      
    ),
    request: (
                
                  <img
                    src={src ||"/img/request.svg"}
                    alt="location"
                    className={className}
                  />
              
            ),
  };

  return icons[name] || null;
};

export default Icon;
