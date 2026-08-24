// api/index.js - Vercel Serverless Function
const express = require('express');
const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'running', 
        time: new Date().toISOString()
    });
});

// ==================== PAYMENT SUCCESS - GET ====================
app.get('/payment/success', (req, res) => {
    const paymentKey = req.query.paymentkey || req.query.payment_key || req.query.key;
    const reference = req.query.reference || req.query.ref || '';
    const user_id = req.query.user_id || req.query.uid || '';
    const amount = req.query.amount || req.query.amt || '';
    
    // !!! আপনার বটের ইউজারনেম দিয়ে পরিবর্তন করুন !!!
    const botLink = `https://t.me/CraftlandXfollowersBot?start=${reference}`;
    
    console.log('✅ Payment Success (GET):', paymentKey);
    console.log('🔗 Reference:', reference);
    console.log('👤 User:', user_id);
    console.log('💰 Amount:', amount);
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Successful - ৳${amount}</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                -webkit-user-select: none;
                user-select: none;
            }
            .container {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            .checkmark {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                animation: scaleIn 0.5s ease;
            }
            .checkmark svg { width: 40px; height: 40px; }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #00ff88, #00cc6a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .amount-display {
                font-size: 42px;
                font-weight: 800;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 15px 0;
            }
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .status-badge {
                display: inline-block;
                background: rgba(0,255,136,0.15);
                color: #00ff88;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .claim-btn {
                display: inline-block;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                color: #000;
                padding: 15px 40px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 700;
                font-size: 18px;
                transition: all 0.3s;
                animation: pulse 2s infinite;
            }
            .claim-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(0,255,136,0.3);
            }
            .auto-redirect { color: #666; margin-top: 20px; font-size: 12px; }
            .countdown { color: #00ff88; font-weight: 600; }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
                70% { box-shadow: 0 0 0 20px rgba(0,255,136,0); }
                100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); }
            }
        </style>
    </head>
    <body oncontextmenu="return false;">
        <div class="container">
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="status-badge">✅ Payment Verified</div>
            <h1 class="title">Payment Successful!</h1>
            <div class="amount-display">৳${amount}</div>
            <p class="subtitle">Amount has been added to your balance</p>
            <a href="${botLink}" class="claim-btn">🎉 CLAIM BALANCE</a>
            <p class="auto-redirect">Auto redirect in <span class="countdown" id="countdown">10</span> seconds...</p>
        </div>
        
        <script>
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('copy', e => e.preventDefault());
            
            let countdown = 10;
            const countdownEl = document.getElementById('countdown');
            
            setInterval(() => {
                countdown--;
                if (countdownEl) countdownEl.textContent = countdown;
                if (countdown <= 0) {
                    window.location.href = '${botLink}';
                }
            }, 1000);
        </script>
    </body>
    </html>
    `);
});

// ==================== PAYMENT SUCCESS - POST ====================
app.post('/payment/success', (req, res) => {
    console.log('✅ Payment Success (POST):', JSON.stringify(req.body, null, 2));
    
    const paymentKey = req.body.paymentkey || req.body.payment_key || req.body.key;
    const metadata = req.body.metadata || {};
    const reference = metadata.reference || req.body.reference || '';
    const user_id = metadata.user_id || req.body.user_id || '';
    const amount = metadata.amount || req.body.amount || '';
    
    // !!! আপনার বটের ইউজারনেম দিয়ে পরিবর্তন করুন !!!
    const botLink = `https://t.me/CraftlandXfollowersBot?start=${reference}`;
    
    res.json({ 
        status: 'success', 
        message: 'Payment received',
        data: { paymentKey, user_id, amount, reference }
    });
});

// ==================== PAYMENT CANCEL ====================
app.get('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled (GET)');
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Cancelled</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                user-select: none;
            }
            .container {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            .cancel-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                animation: scaleIn 0.5s ease;
            }
            .cancel-icon svg { width: 40px; height: 40px; }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .status-badge {
                display: inline-block;
                background: rgba(255,71,87,0.15);
                color: #ff4757;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .bot-btn {
                display: inline-block;
                background: linear-gradient(135deg, #0088cc, #006699);
                color: #fff;
                padding: 12px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
            }
            .bot-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0,136,204,0.3);
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="cancel-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div class="status-badge">❌ Order Cancelled</div>
            <h1 class="title">Payment Cancelled</h1>
            <p class="subtitle">No charges were made. You can try again anytime.</p>
            <a href="https://t.me/CraftlandXfollowersBot" class="bot-btn">🤖 Return to Bot</a>
        </div>
    </body>
    </html>
    `);
});

app.post('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled (POST)');
    res.json({ status: 'cancelled' });
});

// Root
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Bot Webhook Server</title>
        <style>
            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
            .status { color: #00ff88; font-size: 24px; }
        </style>
    </head>
    <body>
        <h1>🤖 Free Fire Like Bot</h1>
        <p class="status">✅ Jubayer Server Running</p>
    </body>
    </html>
    `);
});

// ==================== VERCEL EXPORT ====================
// Vercel-এর জন্য app এক্সপোর্ট করুন
module.exports = app;
