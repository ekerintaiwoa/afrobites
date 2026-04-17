import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    en: {
        'hero-tag': 'Now Serving Hamburg', 'hero-title': 'Real African<br>Food in <span style="color:var(--orange)">Hamburg</span>',
        'hero-sub': 'Bold flavors rooted in West African tradition — cooked fresh, delivered hot.',
        'cta-order': '📅 Book a Table', 'cta-menu': 'View Menu',
        'stat1': 'Happy Customers', 'stat2': 'Authentic Dishes', 'stat3': 'Ø Wartezeit', 'stat4': 'Rating',
        'feat-tag': 'Our Bestsellers', 'feat-title': 'Taste West Africa,<br>Right Here in Hamburg',
        'feat-sub': 'Every dish is made from scratch with authentic ingredients sourced directly from West Africa.',
        'about-tag': 'Our Story', 'about-title': 'Bringing Ghana\'s<br>Kitchen to Hamburg',
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
        'about-tag': 'Unsere Geschichte', 'about-title': 'Ghanas Küche<br>nach Hamburg bringen',
        'about-sub': 'King\'s Afro Bites wurde aus einer einfachen Mission geboren: die kräftigen Aromen Westafrikas nach Hamburg zu bringen.',
        'v1': 'Authentische Rezepte', 'v2': 'Frische Zutaten', 'v3': 'Schnelle Lieferung', 'v4': 'Mit Liebe gemacht'
    }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isResModalOpen, setIsResModalOpen] = useState(false);

    const t = (key) => translations[lang][key] || key;

    const toggleLang = () => setLang(lang === 'en' ? 'de' : 'en');

    const addToCart = (item) => {
        const existing = cart.find(i => i.name === item.name);
        if (existing) {
            setCart(cart.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (name) => {
        setCart(cart.filter(i => i.name !== name));
    };

    const updateQty = (name, delta) => {
        setCart(cart.map(i => {
            if (i.name === name) {
                const newQty = i.qty + delta;
                return newQty > 0 ? { ...i, qty: newQty } : null;
            }
            return i;
        }).filter(Boolean));
    };

    const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <AppContext.Provider value={{
            lang, toggleLang, t,
            cart, addToCart, removeFromCart, updateQty, getSubtotal,
            isCartOpen, setIsCartOpen,
            isResModalOpen, setIsResModalOpen,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
