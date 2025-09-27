import { FC } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  alt?: string;
}

export const ModernLogo: FC<LogoProps> = ({ 
  size = 40, 
  className = "", 
  alt = "Logo do Campus PArt"
}) => {
  // Usa a logo do diretório public
  const logoSrc = "/logo.png";
  
  return (
    <img 
      src={logoSrc}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
      onError={(e) => {
        // Fallback para um ícone SVG simples se a imagem não carregar
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallbackSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        fallbackSvg.setAttribute('width', size.toString());
        fallbackSvg.setAttribute('height', size.toString());
        fallbackSvg.setAttribute('viewBox', '0 0 100 100');
        fallbackSvg.setAttribute('class', className);
        
        fallbackSvg.innerHTML = `
          <circle cx="50" cy="50" r="48" fill="#1351B4" stroke="#168821" stroke-width="4"/>
          <text x="50" y="55" text-anchor="middle" fill="white" font-size="20" font-weight="bold">CP</text>
        `;
        
        target.parentNode?.insertBefore(fallbackSvg, target);
      }}
    />
  );
};

export default ModernLogo;