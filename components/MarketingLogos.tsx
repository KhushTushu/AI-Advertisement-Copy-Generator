
import React from 'react';

const LogoItem: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
  <div className="flex flex-col items-center group cursor-pointer grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-2">
      <img src={icon} alt={name} className="w-full h-full object-contain" />
    </div>
    <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors">{name}</span>
  </div>
);

const MarketingLogos: React.FC = () => {
  const logos = [
    { name: 'Google Ads', icon: 'https://www.gstatic.com/images/branding/product/2x/google_ads_96dp.png' },
    { name: 'Meta', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'TikTok', icon: 'https://img.icons8.com/color/48/tiktok.png' },
    { name: 'LinkedIn', icon: 'https://img.icons8.com/color/48/linkedin.png' },
    { name: 'HubSpot', icon: 'https://img.icons8.com/color/48/hubspot.png' },
    { name: 'Mailchimp', icon: 'https://img.icons8.com/color/48/mailchimp.png' },
  ];

  return (
    <div className="w-full py-12 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
      {logos.map((logo) => (
        <LogoItem key={logo.name} {...logo} />
      ))}
    </div>
  );
};

export default MarketingLogos;
