import { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { getSiteSettings } from '../utils/api';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '+1234567890';
  const phoneNumber = settings?.phoneNumber || '+1234567890';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 space-y-2">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center w-12 h-12 bg-gold text-black rounded-full shadow-lg hover:bg-lightGold transition-all golden-glow"
          >
            <FaPhone size={20} />
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-gold text-black rounded-full shadow-lg hover:bg-lightGold transition-all golden-glow"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default FloatingContact;
