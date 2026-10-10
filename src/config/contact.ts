export const COMPANY_NAME = 'Vimal Tour & Travellers';
export const CONTACT_PHONE = '9559113710';
export const CONTACT_PHONE_DISPLAY = '+91 9559113710';
export const WHATSAPP_NUMBER = '919559113710';
export const DEFAULT_WHATSAPP_MESSAGE = `Hello ${COMPANY_NAME}, I would like to enquire about a taxi/tour.`;

export const getWhatsAppLink = (message: string = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
