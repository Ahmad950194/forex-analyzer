// Configuration - API Keys should be stored in environment variables or a backend server
// For GitHub Pages deployment, consider using a serverless function (Netlify, Vercel)

const CONFIG = {
    // TwelveData API - Get key from https://twelvedata.com/
    TWELVEDATA_KEY: localStorage.getItem('TWELVEDATA_KEY') || 'demo',
    
    // Grok AI API - Get key from https://x.ai/
    GROK_KEY: localStorage.getItem('GROK_KEY') || null,
    
    // API Endpoints
    API_ENDPOINTS: {
        TWELVEDATA: 'https://api.twelvedata.com/time_series',
        GROK: 'https://api.x.ai/v1/chat/completions'
    }
};

// Function to set API keys from user input
function setAPIKeys(twelveDataKey, grokKey) {
    if (twelveDataKey) {
        CONFIG.TWELVEDATA_KEY = twelveDataKey;
        localStorage.setItem('TWELVEDATA_KEY', twelveDataKey);
        console.log('✅ TwelveData key configured');
    }
    if (grokKey) {
        CONFIG.GROK_KEY = grokKey;
        localStorage.setItem('GROK_KEY', grokKey);
        console.log('✅ Grok key configured');
    }
}

// Note: Never hardcode sensitive keys in client-side code
// For production, use a backend API or environment variables through a build process