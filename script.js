
function calculate() {
    const amountInvested = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interest').value);
    const numberOfYears = parseFloat(document.getElementById('years').value);

    if (isNaN(amountInvested) || isNaN(interestRate) || isNaN(numberOfYears)) {
        alert('Please fill all the fields with valid numbers.');
        return;
    }

    const data = {
        labels: ['Invested Amount', 'Returns'],
        datasets: [{
            data: [amountInvested, calculateReturns(amountInvested, interestRate, numberOfYears)],
            backgroundColor: ['#FF6384', '#36A2EB'],
        }]
    };

    const ctx = document.getElementById('pieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
    });

    const lineData = {
        labels: Array.from({ length: numberOfYears }, (_, i) => i + 1),
        datasets: [{
            label: 'Returns Over Years',
            data: calculateReturnsOverYears(amountInvested, interestRate, numberOfYears),
            borderColor: '#36A2EB',
            fill: false,
        }]
    };

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const myLineChart = new Chart(lineCtx, {
        type: 'line',
        data: lineData,
    });
}

function calculateReturns(amount, interest, years) {
    const rate = 1 + interest / 100;
    const returns = amount * Math.pow(rate, years);
    return parseFloat(returns.toFixed(2));
}

function calculateReturnsOverYears(amount, interest, years) {
    const rate = 1 + interest / 100;
    let returns = [amount];
    for (let i = 1; i <= years; i++) {
        const currentAmount = returns[i - 1];
        const annualIncrease = currentAmount * 0.05; // 5% annual rise
        const newAmount = currentAmount + annualIncrease;
        returns.push(parseFloat((newAmount * rate).toFixed(2)));
    }
    return returns;
}
