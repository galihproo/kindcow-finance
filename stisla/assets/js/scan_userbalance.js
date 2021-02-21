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
