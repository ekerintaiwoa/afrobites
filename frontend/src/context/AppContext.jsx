import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    en: {
        'hero-tag': 'Now Serving Hamburg', 'hero-title': 'Real African<br>Food in <span style="color:var(--orange)">Hamburg</span>',
        'hero-sub': 'Bold flavors rooted in West African tradition — cooked fresh, delivered hot.',
        'cta-order': '📅 Book a Table', 'cta-menu': 'View Menu',
        'stat1': 'Happy Customers', 'stat2': 'Authentic Dishes', 'stat3': 'Ø Wartezeit', 'stat4': 'Rating',
        'feat-tag': 'Our Bestsellers', 'feat-title': 'Taste West Africa,<br>Right Here in Hamburg',
        'feat-sub': 'Every dish is made from scratch with authentic ingredients sourced directly from West Africa.',
        'about-tag': 'Our Story', 'about-title': 'Bringing Africa\'s<br>Kitchen to Hamburg',
        'about-sub': 'King\'s Afro Bites was born out of a simple mission: to bring the bold, soulful flavors of West Africa to Hamburg.',
        'v1': 'Authentic Recipes', 'v2': 'Fresh Ingredients', 'v3': 'Fast Delivery', 'v4': 'Made with Love'
    },
    de: {
        'hero-tag': 'Jetzt in Hamburg Servieren', 'hero-title': 'Echtes Afrikanisches<br>Essen in <span style="color:var(--orange)">Hamburg</span>',
        'hero-sub': 'Kräftige Aromen aus der westafrikanischen Tradition — frisch gekocht, heiß geliefert.',
        'cta-order': '📅 Tisch Reservieren', 'cta-menu': 'Speisekarte',
        'stat1': 'Zufriedene Kunden', 'stat2': 'Authentische Gerichte', 'stat3': 'Ø Wartezeit', 'stat4': 'Bewertung',
        'feat-tag': 'Unsere Bestseller', 'feat-title': 'Westafrika schmecken,<br>Mitten in Hamburg',
        'feat-sub': 'Jedes Gericht wird von Grund auf neu mit authentischen Zutaten aus Westafrika zubereitet.',
        'about-tag': 'Unsere Geschichte', 'about-title': 'Afrikas Küche<br>nach Hamburg bringen',
        'about-sub': 'King\'s Afro Bites wurde aus einer einfachen Mission geboren: die kräftigen Aromen Westafrikas nach Hamburg zu bringen.',
        'v1': 'Authentische Rezepte', 'v2': 'Frische Zutaten', 'v3': 'Schnelle Lieferung', 'v4': 'Mit Liebe gemacht'
    }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const [isResModalOpen, setIsResModalOpen] = useState(false);

    const t = (key) => translations[lang][key] || key;

    const toggleLang = () => setLang(lang === 'en' ? 'de' : 'en');

    return (
        <AppContext.Provider value={{
            lang, toggleLang, t,
            isResModalOpen, setIsResModalOpen,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
