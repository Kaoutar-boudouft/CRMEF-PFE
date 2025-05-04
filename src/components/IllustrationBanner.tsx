import React from 'react';

interface IllustrationBannerProps {
  imageUrl: string;
  text: string;
  arabicText?: string;
  showArabic?: boolean;
}

const IllustrationBanner: React.FC<IllustrationBannerProps> = ({ 
  imageUrl, 
  text, 
  arabicText,
  showArabic = false
}) => {
  return (
    <div className="w-full bg-gold-50 overflow-hidden rounded-lg">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 sm:mr-6">
          <img 
            src={imageUrl} 
            alt="Educational illustration" 
            className="h-32 object-contain"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-navy-800 text-base sm:text-lg font-medium">
            {text}
          </p>
          {showArabic && arabicText && (
            <p className="text-navy-800 text-base sm:text-lg font-medium mt-2 text-right" dir="rtl">
              {arabicText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IllustrationBanner;