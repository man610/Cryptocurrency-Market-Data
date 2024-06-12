const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-Ti2SssAr3muB2n5cXwTMXve9' }
};
let homepage = document.querySelector(".boxes");

async function apicall() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options);
        const data = await response.json();
        console.log(data);
        data.map((Element) => {
            let changeColor = Element.price_change_percentage_24h >= 0 ? 'green' : 'red';
            let priceChangePercentage = Math.abs(Element.price_change_percentage_24h);
            homepage.innerHTML += `
                <div class="box">
                    <div class="box1" style="color: ${changeColor};">${Math.round((priceChangePercentage + Number.EPSILON) * 100) / 100}%</div>
                    <div class="img"><img src=${Element.image} alt="logo"></div>
                    <div class="name"><h2>${Element.name}</h2></div>
                    <div class="symbol"><label for="">Symbol: </label>${Element.symbol}</div>
                    <div class="price"><label for="">Price: </label>$${Element.current_price}</div>
                    <div class="marketcap"><label for="">Market Cap: </label>$${Element.market_cap}</div>
                    <div class="price_change_24th"><label for="">Change 24h: </label>$${Math.round((Element.price_change_24h + Number.EPSILON) * 10000) / 10000}</div>
                </div>`;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
apicall();