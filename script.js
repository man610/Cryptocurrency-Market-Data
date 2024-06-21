const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-Ti2SssAr3muB2n5cXwTMXve9' }
};
let homepage = document.querySelector(".boxes");
const x=document.querySelector(".coinnumber");
const z=document.querySelector(".cointype");
const a=document.querySelector(".coinorder");
let b=0;
let w=0;
let y=0;
console.log(x.options[y].innerHTML);
function myfunction(){
    homepage.innerHTML='';
    w=z.selectedIndex;
    y=x.selectedIndex;
    b=a.selectedIndex;
    console.log(w);
    console.log(y);
    console.log(b);
    if(w==0){
        api=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${a.options[b].innerHTML}&per_page=${x.options[y].innerHTML}`;
    }
    else{
        api=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${z.options[w].innerHTML}&order=${a.options[b].innerHTML}&per_page=${x.options[y].innerHTML}`;
    }
    apicall();
}
//   const api=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10`
   let api=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${x.options[y].innerHTML}`;

async function apicall() {
    try {
        const response = await fetch(api, options);
        const data = await response.json();
        console.log(data);
        data.map((Element) => {
            let changeColor = Element.price_change_percentage_24h >= 0 ? 'green' : 'red';
            let priceChangePercentage = Math.abs(Element.price_change_percentage_24h);
            homepage.innerHTML += `
            <div class="box" onclick="clickbox('${Element.id}')">
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
function clickbox(coinId) {
    window.open(`https://www.coingecko.com/en/coins/${coinId}`, '_blank');
}

