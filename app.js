// Forex Analyzer Pro - Main Application

// Initialize on page load
window.onload = load;

// Show/Hide pages
function show(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Remove active from all nav buttons
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    
    // Show selected page
    document.getElementById(page).classList.add('active');
    
    // Activate nav button
    event.target.classList.add('active');
}

// Load price data from TwelveData API
async function load() {
    try {
        const pair = document.getElementById('pair').value;
        const symbol = pair.replace('/', '');
        
        // Check if API key is configured
        if (!CONFIG.TWELVEDATA_KEY || CONFIG.TWELVEDATA_KEY === 'demo') {
            showMockData();
            console.warn('⚠️ Using mock data. Please configure API key in config.js');
            return;
        }
        
        const url = `${CONFIG.API_ENDPOINTS.TWELVEDATA}?symbol=${symbol}&interval=1min&outputsize=10&apikey=${CONFIG.TWELVEDATA_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code) {
            throw new Error(data.message || 'API Error');
        }
        
        if (!data.values || data.values.length === 0) {
            showMockData();
            return;
        }
        
        const close = parseFloat(data.values[0].close);
        const bid = close;
        const ask = close + 0.00015;
        
        document.getElementById('bid').innerText = bid.toFixed(5);
        document.getElementById('ask').innerText = ask.toFixed(5);
        
        updateIndicators(bid, pair);
        
    } catch (error) {
        console.error('Error loading data:', error);
        showMockData();
    }
}

// Show mock data when API fails or not configured
function showMockData() {
    const mockPrices = {
        'EUR/USD': 1.08945,
        'GBP/USD': 1.26780,
        'USD/JPY': 149.50,
        'AUD/USD': 0.65420
    };
    
    const pair = document.getElementById('pair').value;
    const price = mockPrices[pair] || 1.0;
    
    document.getElementById('bid').innerText = price.toFixed(5);
    document.getElementById('ask').innerText = (price + 0.00015).toFixed(5);
    
    updateIndicators(price, pair);
}

// Update technical indicators
function updateIndicators(price, pair) {
    try {
        // Simulate RSI calculation
        const rsi = Math.random() * 100;
        const rsiSignal = rsi > 70 ? '📈 Overbought' : rsi < 30 ? '📉 Oversold' : '➡️ Neutral';
        
        // Simulate MACD
        const macdValue = (Math.random() - 0.5) * 0.01;
        const macdSignal = macdValue > 0 ? '📈 Bullish' : '📉 Bearish';
        
        // Determine trend
        const trend = price > 1.085 ? '📈 Uptrend' : '📉 Downtrend';
        
        document.getElementById('ind').innerHTML = `
            <div class="row"><span>RSI (14)</span><span>${rsi.toFixed(1)} - ${rsiSignal}</span></div>
            <div class="row"><span>MACD</span><span>${macdSignal}</span></div>
            <div class="row"><span>Trend</span><span>${trend}</span></div>
            <div class="row"><span>Last Update</span><span>${new Date().toLocaleTimeString()}</span></div>
        `;
    } catch (error) {
        console.error('Error updating indicators:', error);
    }
}

// Generate AI analysis using Grok
async function generateAI() {
    const resultDiv = document.getElementById('aiR');
    
    if (!CONFIG.GROK_KEY) {
        resultDiv.innerHTML = '<span class="error">❌ Grok API key not configured</span>';
        return;
    }
    
    resultDiv.innerText = '⏳ Loading AI analysis...';
    
    try {
        const pair = document.getElementById('pair').value;
        const bid = document.getElementById('bid').innerText;
        
        const response = await fetch(CONFIG.API_ENDPOINTS.GROK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.GROK_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-2-1212',
                messages: [{
                    role: 'user',
                    content: `Analisis singkat ${pair} pada harga ${bid}. Berikan rekomendasi BUY atau SELL dengan alasan teknis. Format: SIGNAL: [BUY/SELL] | ALASAN: [penjelasan singkat]`
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            resultDiv.innerText = data.choices[0].message.content;
            resultDiv.classList.add('success');
        } else {
            throw new Error('Invalid response format');
        }
        
    } catch (error) {
        console.error('Error generating AI analysis:', error);
        resultDiv.innerHTML = `<span class="error">❌ Error: ${error.message}</span>
        
Tips for setup:
1. Get Grok API key from https://x.ai/
2. Open browser console (F12)
3. Run: setAPIKeys('your-twelvedata-key', 'your-grok-key')
4. Keys are stored locally in browser storage`;
        resultDiv.classList.remove('success');
    }
}

// Position size calculator
function calc() {
    try {
        const balance = parseFloat(document.getElementById('bal').value);
        const riskPercent = parseFloat(document.getElementById('risk').value);
        const slPips = parseFloat(document.getElementById('sl').value);
        
        // Validation
        if (!balance || !riskPercent || !slPips || balance <= 0 || riskPercent <= 0 || slPips <= 0) {
            document.getElementById('res').innerHTML = '<span class="error">❌ Please enter valid positive numbers</span>';
            return;
        }
        
        const riskAmount = balance * (riskPercent / 100);
        const lotSize = (riskAmount / slPips / 10).toFixed(2);
        const dollarsPerPip = (balance * (riskPercent / 100) / slPips).toFixed(2);
        
        document.getElementById('res').innerHTML = `
            <strong>📊 Position Size Calculation</strong><br><br>
            Account Balance: $${balance.toLocaleString()}<br>
            Risk Amount: $${riskAmount.toFixed(2)}<br>
            Stop Loss: ${slPips} pips<br>
            <br>
            <strong>Results:</strong><br>
            Position Size: <span class="success">${lotSize} lots</span><br>
            Dollar per Pip: <span class="success">$${dollarsPerPip}</span>
        `;
    } catch (error) {
        console.error('Calculator error:', error);
        document.getElementById('res').innerHTML = '<span class="error">❌ Calculation error: ' + error.message + '</span>';
    }
}

// Setup prompt
console.log('%c🚀 Forex Analyzer Pro Initialized', 'color: #0D8ABC; font-size: 16px; font-weight: bold;');
console.log('%cTo configure API keys, run:', 'color: #a0aec0;');
console.log('setAPIKeys("your-twelvedata-key", "your-grok-key")');