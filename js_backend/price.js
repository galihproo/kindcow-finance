const setting   =   require("../site_setting.json");
const request = require('request'); 
const Web3 = require('web3'); 


var bitsten = {};
var pair =Array();
function bitsten_feed(){
var urlapi ="https://api.bitsten.com/api/v1/public/getticker/all";
request(urlapi, function (error, response, body) {
 var b=JSON.parse(body);
 Object.keys(b.result).forEach(a=>{
    
   
    //console.log(b.result[a].last);
    bitsten[a.toUpperCase()] = b.result[a].last;

   })
 
   
});
}
setInterval(bitsten_feed,10000);
bitsten_feed();
var price1 = {}; price1['price']={};price1['pair']={};
setInterval(function(){
        WALLET.getrate("0xf3a0b335806167e9023ead645d1172892edfcc97","KIND_BUSD",8,18);
       
        setting.price_feed.forEach(element => {
            
        //if(element[3]=="USDT")
        price1['price'][element[0]] = 0;
        price1['price']["USDT"] = 1;
        if(element[1]=="bitsten")price1['price'][element[0]]=bitsten[element[2]];
       
        });
        price1['price']["KIND"] = price1['pair']['KIND_BUSD'];
        
    console.log(price1);

},5000);



var  WALLET ={
        getrate : async function(c,p,d1,d2){
   
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}];

          try {
      
        var  contract = new web3.eth.Contract(abi, c);
           
        await contract.methods.getReserves().call().then(function(resp) {
         //console.log(resp[0]);
         price1['pair'][p]=((resp[1]/(10**d2))/(resp[0]/(10**d1))).toFixed(8);
        });
      } catch (error) {
        
      }


    }
}




 
 
module.exports = price1;