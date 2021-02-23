const setting   =   require("../site_setting.json");
const request = require('request'); 
const Web3 = require('web3'); 


var bitsten = {};
 
function bitsten_feed(){
var urlapi ="https://api.bitsten.com/api/v1/public/getticker/all";
request(urlapi, function (error, response, body) {
  if( response&&response.statusCode == 200){}else return;
 

 var b=JSON.parse(body);
 Object.keys(b.result).forEach(a=>{
    
   
    //console.log(b.result[a].last);
    bitsten[a.toUpperCase()] = b.result[a].last;

   })
 
   
});
}
setInterval(bitsten_feed,10000);
bitsten_feed();
var price1 = {}; price1['price']={};price1['pair']={};price1['lp']={};price1['global_lp']={};price1['token_lp']={};price1['total_lp']={};price1['rate_lp']={};price1['kind_lp']={};
price1['token_lp']['busd']={};
price1['token_lp']['wbnb']={};
price1['token_lp']['kind']={};

setInterval(function(){
        WALLET.getrate("0xf3a0b335806167e9023ead645d1172892edfcc97","KIND_BUSD",8,18);
       
        setting.price_feed.forEach(element => {
            
        //if(element[3]=="USDT")
        price1['price'][element[0]] = 0;
        price1['price']["USDT"] = 1;
        if(element[1]=="bitsten")price1['price'][element[0]]=bitsten[element[2]];
       
        });
        price1['price']["KIND"] = price1['pair']['KIND_BUSD'];
        
        // console.log(price1);

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


    } ,getPoolInfo : async function(pid){
  
        var co    = setting.master_contract.contract;  //
        //console.log(co);
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];

          
          var  contract = new web3.eth.Contract(abi, co);
           
          await  contract.methods.poolInfo(pid).call().then(function(resp) {
           
          //console.log(resp); 
          price1['lp'][pid]=resp[4]/(10**setting.pid[pid].digits);
         // if(setting.pid[pid].type=="staking")
          price1['global_lp'][pid]=resp[4]/(10**setting.pid[pid].digits);
            //return (resp / Math.pow(10,digit));
         //HANDLE.PoolInfo(pid,resp);
        });
    },
    getWalletLpBalance : async function(con,pid,code,addr,digit){
       if(setting.pid[pid].type=="staking")addr=setting.master_contract.contract;
        
        const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

        try {
      
      var  contract = new web3.eth.Contract(abi, con);
         
      await contract.methods.balanceOf(addr).call().then(function(resp) {
       price1['token_lp'][code][pid]=resp/(10**digit);
      });
    } catch (error) {
      
    }


  }, getSupply: async function(pid){
       
        const web3 = new Web3("https://bsc-dataseed.binance.org");
        
        var co=setting.pid[pid].contract
      
        try {
        var abi   =[ {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
        var  contract = new web3.eth.Contract(abi, co);
        await contract.methods.totalSupply().call().then(function(resp) {
               price1['global_lp'][pid]=resp/(10**setting.pid[pid].digits);
        });
           } catch (error) {
           }
        
  
         
  
    } ,
    getlphere : async function(con,pid,addr,digit){
       //if(setting.pid[pid].type=="staking")addr=setting.master_contract.contract;
       
        const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

        try {
      
      var  contract = new web3.eth.Contract(abi, con);
         
      await contract.methods.balanceOf(addr).call().then(function(resp) {


        price1['lp'][pid]=resp/(10**digit);
        
       // if(setting.pid[pid].type=="staking")
       // price1['global_lp'][pid]=resp[4]/(10**setting.pid[pid].digits);


      });
    } catch (error) {
      
    }


  }
}

function gp(){
var pid = setting.pid.length;
//console.log(pid);
for(var a=0;a<pid;a++){
        if(setting.pid[a].type=="farm")
        WALLET.getlphere(setting.pid[a].contract,a,setting.master_contract.contract,setting.pid[a].digits);
        else 
        WALLET.getPoolInfo(a);
        if(setting.pid[a].type=="farm")
        WALLET.getSupply(a); 
        WALLET.getWalletLpBalance('0xe9e7cea3dedca5984780bafc599bd69add087d56',a,'busd',setting.pid[a].contract,18);
        WALLET.getWalletLpBalance('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',a,'wbnb',setting.pid[a].contract,18);
        WALLET.getWalletLpBalance('0x0917ed9cb1277e0190e1f5a208b75d8394294d1a',a,'kind',setting.pid[a].contract,8);
        
      
}



}
setInterval(gp,10000);
gp();


function tlp(){
        var pid = setting.pid.length;
        //console.log(pid);
        for(var a=0;a<pid;a++){
                if(setting.pid[a].type=="farm"){
                        if(price1['token_lp']['busd'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['busd'][a] * 2 ) ;
                                else
                        if(price1['token_lp']['wbnb'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['wbnb'][a] * 2 *price1['price']['BNB'] ) ;
                                else
                        if(price1['token_lp']['kind'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['kind'][a] * 2 * price1['price']['KIND'] )  ;
                        }   
         
                if(setting.pid[a].type=="staking"){
                         
                        if(price1['token_lp']['kind'][a]>0){
                            price1['total_lp'][a] =  (price1['token_lp']['kind'][a]  * price1['price']['KIND'] )  ;
                        }
                }   
        } 
        }
        setInterval(tlp,10000);
        tlp();



        function ratelp(){
                var pid = setting.pid.length;
                //console.log(pid);
                for(var a=0;a<pid;a++){
                price1['rate_lp'][a]= price1['total_lp'][a]/price1['global_lp'][a];
                } 
                }
                setInterval(ratelp,10000);
                ratelp();

                function ki(){
                        var pid = setting.pid.length;
                        //console.log(pid);
                        for(var a=0;a<pid;a++){
                        price1['kind_lp'][a]= price1['rate_lp'][a]*price1['lp'][a];
                        } 
                        }
                        setInterval(ki,10000);
                        ki();





 
 
 
module.exports = price1;