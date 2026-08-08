const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const SYMBOLS = ["🐃", "🪙", "💎", "🍒"];

app.post('/api/spin', (req, res) => {
    let currentBalance = req.body.balance || 1000;
    const bet = req.body.bet || 10;

    if (currentBalance < bet) {
        return res.json({ error: "ငွေပမာဏ မလုံလောက်ပါ" });
    }

    currentBalance -= bet;

    const slot1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const slot2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const slot3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    let winAmount = 0;
    let isWin = false;

    if (slot1 === slot2 && slot2 === slot3) {
        winAmount = bet * 10;
        isWin = true;
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        winAmount = bet * 2;
        isWin = true;
    }

    currentBalance += winAmount;

    res.json({
        slots: [slot1, slot2, slot3],
        winAmount: winAmount,
        newBalance: currentBalance,
        isWin: isWin
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
