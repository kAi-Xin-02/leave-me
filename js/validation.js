const ValidationUtils = {
    sanitizeHTML(text) {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;'
        };
        return String(text).replace(/[&<>"'\/]/g, char => entityMap[char]);
    },

    validateName(name) {
        const trimmed = name.trim();
        if (trimmed.length === 0) {
            return { valid: false, error: 'Name is required' };
        }
        if (trimmed.length > 50) {
            return { valid: false, error: 'Name must be under 50 characters' };
        }
        const namePattern = /^[a-zA-Z0-9\s\-_.']+$/;
        if (!namePattern.test(trimmed)) {
            return { valid: false, error: 'Name contains invalid characters' };
        }
        return { valid: true, value: trimmed };
    },

    validateMessage(message) {
        const trimmed = message.trim();
        if (trimmed.length === 0) {
            return { valid: false, error: 'Message is required' };
        }
        if (trimmed.length < 5) {
            return { valid: false, error: 'Message must be at least 5 characters' };
        }
        if (trimmed.length > 500) {
            return { valid: false, error: 'Message must be under 500 characters' };
        }
        return { valid: true, value: trimmed };
    },

    checkRateLimit() {
        const lastSubmit = localStorage.getItem('lastMessageTime');
        if (!lastSubmit) {
            return { allowed: true };
        }
        
        const timeSince = Date.now() - parseInt(lastSubmit);
        const cooldownMinutes = 5;
        const cooldownMs = cooldownMinutes * 60 * 1000;
        
        if (timeSince < cooldownMs) {
            const remainingMs = cooldownMs - timeSince;
            const remainingMinutes = Math.ceil(remainingMs / 60000);
            return { 
                allowed: false, 
                remainingMinutes,
                error: `Please wait ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} before sending another message`
            };
        }
        
        return { allowed: true };
    },

    setRateLimit() {
        localStorage.setItem('lastMessageTime', Date.now().toString());
    },

    basicProfanityFilter(text) {
        const badWords = ['spam', 'test123'];
        const lowerText = text.toLowerCase();
        
        for (const word of badWords) {
            if (lowerText.includes(word)) {
                return { clean: false, error: 'Message contains inappropriate content' };
            }
        }
        
        return { clean: true };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
}
