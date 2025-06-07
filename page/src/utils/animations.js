export const fadeIn = {
    from: { opacity: 0 },
    to: { opacity: 1 },
  };
  
  export const slideInFromLeft = {
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  };
  
  export const slideInFromRight = {
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  };
  
  export const scaleUp = {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
  };