
import React from 'react';
import CompanyDetailsCard from './CompanyDetailsCard';
import LogoCard from './LogoCard';
import ColorsCard from './ColorsCard';
import CustomDomainCard from './CustomDomainCard';

interface BrandingTabContentProps {
  whiteLabelSettings: {
    companyName: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    emailFooter: string;
    customDomain: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrandingTabContent = ({
  whiteLabelSettings,
  handleInputChange,
  handleLogoUpload
}: BrandingTabContentProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <CompanyDetailsCard 
        companyName={whiteLabelSettings.companyName}
        emailFooter={whiteLabelSettings.emailFooter}
        handleInputChange={handleInputChange}
      />
      
      <LogoCard 
        logo={whiteLabelSettings.logo}
        handleLogoUpload={handleLogoUpload}
      />
      
      <ColorsCard 
        primaryColor={whiteLabelSettings.primaryColor}
        secondaryColor={whiteLabelSettings.secondaryColor}
        handleInputChange={handleInputChange}
      />
      
      <CustomDomainCard
        customDomain={whiteLabelSettings.customDomain}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default BrandingTabContent;
