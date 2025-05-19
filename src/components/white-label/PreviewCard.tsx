
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface PreviewCardProps {
  whiteLabelSettings: {
    companyName: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    emailFooter: string;
  };
}

const PreviewCard = ({ whiteLabelSettings }: PreviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview van White Label Content</CardTitle>
        <CardDescription>
          Zo ziet je gepersonaliseerde content eruit voor klanten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
            {whiteLabelSettings.logo ? (
              <img 
                src={whiteLabelSettings.logo} 
                alt={whiteLabelSettings.companyName} 
                className="h-8"
              />
            ) : (
              <h3 className="font-bold text-lg">{whiteLabelSettings.companyName || "Jouw Bedrijf"}</h3>
            )}
            
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="p-6 bg-white">
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: whiteLabelSettings.primaryColor }}>
                SEO Rapport voor Client Website
              </h2>
              <p className="text-sm text-gray-500">Gegenereerd op {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <h4 className="font-medium text-sm text-gray-500">Totaal bezoekers</h4>
                <p className="text-2xl font-bold">1.245</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <h4 className="font-medium text-sm text-gray-500">Tijd op pagina</h4>
                <p className="text-2xl font-bold">2:34</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <h4 className="font-medium text-sm text-gray-500">Bouncepercentage</h4>
                <p className="text-2xl font-bold">42%</p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 mb-6">
              <h3 className="font-medium mb-2" style={{ color: whiteLabelSettings.secondaryColor }}>
                Google rankings voor top keywords
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>zakelijke website bouwen</span>
                  <span className="font-bold">#3</span>
                </div>
                <div className="flex justify-between">
                  <span>wordpress website kosten</span>
                  <span className="font-bold">#5</span>
                </div>
                <div className="flex justify-between">
                  <span>webdesign amsterdam</span>
                  <span className="font-bold">#8</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 text-center">
              {whiteLabelSettings.emailFooter || 
               `Powered by ${whiteLabelSettings.companyName || "Jouw Bedrijf"} | www.jouwbedrijf.nl`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
