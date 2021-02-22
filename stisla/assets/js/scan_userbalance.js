var allpid = setting.pid;
//console.log(allpid);
function lp(){
 
var a = 0;
allpid.forEach(b => {
 WALLET.getBalanceLP(a); 
 WALLET.getPendingReward(a); 
 WALLET.getPoolInfo(a);
 WALLET.getWalletLpBalance(a);
 WALLET.totalSupply(setting.token.contract);
 WALLET.burn(setting.token.contract,8,'0x0000000000000000000000000000000000000000');
 a++;
});
}

setInterval(lp,30000);
lp();

 WALLET.getPoolLength();
 WALLET.getRewardPool();
 
var allsym = setting.list_token;
 
function lt(){
  
var a = 0;
allsym.forEach(b => {
 //   console.log(b);
 WALLET.getName(b[1]);
 WALLET.getSym(b[1]);
 a++;
});
}

 
lt();


setInterval(rate,30000);
function rate(){

    $.get( "price", function( data ) {
        
        for (const [key, value] of Object.entries(data.price)) {
            var k = key.toLocaleLowerCase();
            if($('.price-'+k).length>0)
                {  
                
                console.log(k);
                document.getElementsByClassName('price-'+k)[0].innerHTML = number_format(value);
                }

            
          }


        
          for (const [a, value] of Object.entries(data.lp)) {
         
            if($('.total-liq-pid-'+a).length>0)
                {   
                document.getElementsByClassName('total-liq-pid-'+a)[0].innerHTML = number_format(value*data.rate_lp[a]);
                }

            
          }
        
        
      });
 
}

 
rate();
