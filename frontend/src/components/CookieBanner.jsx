import { useState } from 'react';
import { Cookie, Check, ExternalLink } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookieConsent';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => !localStorage.getItem(COOKIE_CONSENT_KEY));
  const [isHidden, setIsHidden] = useState(false);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsHidden(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsHidden(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-banner ${isHidden ? 'cookie-banner-hiding' : ''}`}>
      <div className="cookie-banner-content">
        <div className="cookie-banner-icon">
          <Cookie size={24} />
        </div>
        <div className="cookie-banner-text">
          <p className="cookie-banner-title">We value your privacy</p>
          <p className="cookie-banner-description">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept All", you consent to our use of cookies. Read our{' '}
            <a href="/legal" className="cookie-link">Cookie Policy</a> for more details.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button onClick={handleReject} className="cookie-btn cookie-btn-reject">
            Reject
          </button>
          <a href="/legal" className="cookie-btn cookie-btn-learn">
            <ExternalLink size={14} />
            Learn More
          </a>
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            <Check size={14} />
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;