// Translation Service using MyMemory API (Free, no API key needed)

interface TranslateResponse {
  responseData: {
    translatedText: string;
  };
  responseStatus: number;
}

/**
 * Translate text between Hindi and English
 * @param text - Text to translate
 * @param from - Source language ('hi' or 'en')
 * @param to - Target language ('hi' or 'en')
 */
export const translateText = async (
  text: string,
  from: 'hi' | 'en' = 'en',
  to: 'hi' | 'en' = 'hi'
): Promise<string> => {
  try {
    // MyMemory API (Free, no key needed)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    
    const response = await fetch(url);
    const data: TranslateResponse = await response.json();
    
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      console.error('Translation failed:', data);
      return text; // Return original text if translation fails
    }
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
};

/**
 * Auto-detect language and translate
 * If text is in Hindi, translate to English
 * If text is in English, translate to Hindi
 */
export const autoTranslate = async (text: string): Promise<string> => {
  // Simple detection: if text contains Devanagari characters, it's Hindi
  const isHindi = /[\u0900-\u097F]/.test(text);
  
  if (isHindi) {
    return translateText(text, 'hi', 'en');
  } else {
    return translateText(text, 'en', 'hi');
  }
};

/**
 * Translate to Hindi (for English text)
 */
export const translateToHindi = async (text: string): Promise<string> => {
  return translateText(text, 'en', 'hi');
};

/**
 * Translate to English (for Hindi text)
 */
export const translateToEnglish = async (text: string): Promise<string> => {
  return translateText(text, 'hi', 'en');
};
