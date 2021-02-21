
 var MasterContract = setting.master_contract.contract;
  
 
  

 var WALLET = {

       checkMetamask :  function(){

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            HANDLE.Metamask(true);
            return true;
          } else 
            {
            console.log("Need metamask to run this application");
            HANDLE.Metamask(false);
            return false;
            }


     }, logout :   function(){

        
        HANDLE.Logout("0");

     },

         getAccount : async function(){
       
       
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        HANDLE.Account(account);

     },

       reqApprove : async function (pid){

        var contract    =  setting.pid[pid].contract;  //
        const web3 = new Web3(ethereum);
         
          var abi   =[{
            "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }];
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var fr = accounts[0];
        var  contract4 = new web3.eth.Contract(abi, contract);

         
        await   contract4.methods.allowance(fr,MasterContract).call().then(function(resp) {
            
            if(resp>999999999)  {
                HANDLE.Allowance(pid,999999999);
                  //  HANDLE.Approve(pid,pid); 
                return  true; }
            else
            {
            var co    = setting.pid[pid].contract;  //liq
            var to    = MasterContract;  //mc
            var abi =[
            {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
            ]; 
            const web3 = new Web3(ethereum);
            //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            //const account = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn="115792089237316195423570985008687907853269984665640564039457584007913129639935";
            contract.methods.approve(to, amn).send({from:  fr}, 
            function(err, transactionHash) {
            //console.log(transactionHash);
            HANDLE.Approve(pid,transactionHash);
            return true;
            });
            }
        });

        
        },
       
        reqDeposit : async function (pid,am){
            var co    = MasterContract;  
            var digit = setting.pid[pid].digits;
            const web3 = new Web3(ethereum);
          // check decimal before deposit
            var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
            var  contract = new web3.eth.Contract(abid, setting.pid[pid].contract);
            await  contract.methods.decimals().call().then(function(resp) {
             
            WALLET.Deposit(pid,am*(10**resp))
             

            });
            },
           
       
        reqWitdraw : async function (pid,am){
            var co    = MasterContract;  
            var digit = setting.pid[pid].digits;
            const web3 = new Web3(ethereum);
          // check decimal before deposit
            var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
            var  contract = new web3.eth.Contract(abid, setting.pid[pid].contract);
            await  contract.methods.decimals().call().then(function(resp) {
                
            WALLET.Withdraw(pid,am*(10**resp))
             

            });
            },
            
       
        Deposit : async function (pid,am){
           
          var co    = MasterContract;  
          var digit = setting.pid[pid].digits;
          const web3 = new Web3(ethereum);
        
            var abi =[  {
              "inputs": [{
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
              }, {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }],
              "name": "deposit",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          } ];
             
             
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            var fr = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn =  BigInt(am )  ; amn+="";
          
            var tx = {
                from: fr,
                to: co,
                data: contract.methods.deposit(pid, amn).encodeABI() 
                
            };
            web3.eth.sendTransaction(tx).then(res => {
              hideLoader();
                HANDLE.Deposit(pid,res);
                WALLET.getWalletLpBalance(pid);
                //console.log("res",res);
            }).catch(err => {
                //onsole.log("err",err)
            });

           

         
          },

            addContract : async function (token){
              var co    = MasterContract;  
              const web3 = new Web3(ethereum);
              
                var abi =[ {
                  "inputs": [
                    {
                      "internalType": "contract IERC20",
                      "name": "_lpToken",
                      "type": "address"
                    }
                  ],
                  "name": "add",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                } ];
                 
                 
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract = new web3.eth.Contract(abi, co);
              
                var tx = {
                    from: fr,
                    to: co,
                    data: contract.methods.add(token).encodeABI() 
                    
                };
                web3.eth.sendTransaction(tx).then(res => {
                    HANDLE.AddContract(res);
                    //console.log("res",res);
                }).catch(err => {
                    //console.log("err",err)
                });
               
              },

            Withdraw : async function  (pid,am){
                var co    = MasterContract;   
                var digit = setting.pid[pid].digits;
                  
                  const web3 = new Web3(ethereum);
                
                  var abi =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }];
                   
                   
                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                  var amn =  BigInt(am)  ; amn+="";
                  var tx = {
                      from: fr,
                      to: co,
                      data: contract.methods.withdraw(pid, amn).encodeABI() 
                      
                  };
                  web3.eth.sendTransaction(tx).then(res => {
                      //console.log("res",res);
                      hideLoader();
                      HANDLE.Withdraw(pid,res);
                      WALLET.getBalanceLP(pid);
                  }).catch(err => {
                     // console.log("err",err)
                  });
                 
                },
                voteUp : async function  (pid,am){
                    var co    = MasterContract;   
                    var digit = setting.pid[pid].digits;
                      
                      const web3 = new Web3(ethereum);
                    
                      var abi =[{
                          "inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},
                                    {"internalType":"uint256","name":"_allocPoint","type":"uint256"}],
                           "name":"voteDown",
                           "outputs":[],
                           "stateMutability":"nonpayable","type":"function"}
                           ,
                           {"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"voteUp","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                       
                       
                      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                      var fr = accounts[0];
                      var  contract = new web3.eth.Contract(abi, co);
                      var tx = {
                          from: fr,
                          to: co,
                          data: contract.methods.voteUp(pid, 1).encodeABI() 
                          
                      };
                      web3.eth.sendTransaction(tx).then(res => {
                        hideLoader();
                        WALLET.getPoolInfo(pid);
                          //console.log("res",res);
                         // HANDLE.VoteUp(pid,res);
                      }).catch(err => {
                          console.log("err",err)
                      });
                     
                    },
                    voteDown : async function  (pid,am){
                        var co    = MasterContract;   
                        var digit = setting.pid[pid].digits;
                          
                          const web3 = new Web3(ethereum);
                        
                          var abi =[{
                              "inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},
                                        {"internalType":"uint256","name":"_allocPoint","type":"uint256"}],
                               "name":"voteDown",
                               "outputs":[],
                               "stateMutability":"nonpayable","type":"function"}
                               ,
                               {"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"voteUp","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                           
                           
                          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                          var fr = accounts[0];
                          var  contract = new web3.eth.Contract(abi, co);
                          var tx = {
                              from: fr,
                              to: co,
                              data: contract.methods.voteDown(pid, 1).encodeABI() 
                              
                          };
                          web3.eth.sendTransaction(tx).then(res => {
                              //console.log("res",res);
                             // HANDLE.VoteUp(pid,res);
                             hideLoader();
                             WALLET.getPoolInfo(pid);
                          }).catch(err => {
                             // console.log("err",err)
                          });
                         
                        }
                        ,
    

            getPoolInfo : async function(pid){
  
                var co    = MasterContract;  //
                var digit = setting.token.digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.poolInfo(pid).call().then(function(resp) {
                   
                  //console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                 HANDLE.PoolInfo(pid,resp);
                });
            },
             
            getPoolInfoVote : async function(pid){
  
                var co    = MasterContract;  //
                var digit = setting.token.digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.poolInfo(pid).call().then(function(resp) {
                   
                //   console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                 HANDLE.PoolInfoVote(pid,resp);
                });
            },

            getPendingReward : async function(pid){
  
                var co    = MasterContract;  //
                var digit = setting.token.digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "pendingKind",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.pendingKind(pid,fr).call().then(function(resp) {
                   
                 //  console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                    HANDLE.PendingReward(pid,resp / Math.pow(10,digit));
                });
            },
            getBalanceLP : async function(pid){
  
                var co    = MasterContract;  //
                var digit = setting.pid[pid].digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "balanceLP",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];

                try {
                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                await contract.methods.balanceLP(pid,fr).call().then(function(resp) {
                 HANDLE.BalanceLP(pid,resp / Math.pow(10,digit));
                });
              } catch (error) {
              
              }
            },
            getWalletLpBalance : async function(pid){
  
              var co    = setting.pid[pid].contract;  //
              var digit = setting.pid[pid].digits ;
              const web3 = new Web3(ethereum);
               
                var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                try {
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              var fr = accounts[0];
              var  contract = new web3.eth.Contract(abi, co);
                 
              await contract.methods.balanceOf(fr).call().then(function(resp) {
              HANDLE.BalanceWallet(pid,resp / Math.pow(10,digit));
              });
            } catch (error) {
              
            }


          },
            getAllowance : async function(pid){
  
                var contract    =  setting.pid[pid].contract;  //
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }, {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }],
                    "name": "allowance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract4 = new web3.eth.Contract(abi, contract);

                 
                await   contract4.methods.allowance(fr,MasterContract).call().then(function(resp) {
                      HANDLE.Allowance(pid,resp);
                });
            
            },
            getPoolLength : async function(){
  
                var co    = MasterContract;  //
                // var digit = setting.pid[pid].digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [],
                    "name": "poolLength",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  }];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                await contract.methods.poolLength().call().then(function(resp) {
                   
               HANDLE.poolLength(resp);
                });
            },
            getRewardPool : async function(){
  
              var co    = MasterContract;  //
              // var digit = setting.pid[pid].digits ;
              const web3 = new Web3(ethereum);
               
                var abi   =[ {"inputs":[],"name":"total_Vote_Reward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
              ];

              try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract = new web3.eth.Contract(abi, co);
                 
              await contract.methods.total_Vote_Reward().call().then(function(resp) {
              HANDLE.poolReward(resp);
              });
            } catch (error) {
              
            }


          },getName : async function(c){
  
            var co    = c;  //
            // var digit = setting.pid[pid].digits ;
            const web3 = new Web3(ethereum);
             
              var abi   =[{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
            ];

            try {   
           var  contract = new web3.eth.Contract(abi, co);
            await contract.methods.name().call().then(function(resp) {
            HANDLE.Name(c,resp);
            });} catch (error) {
              
            }
        },
        getSym: async function(c){
  
          var co    = c;  //
          const web3 = new Web3(ethereum);
          var abi   =[{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

          try {
          var  contract = new web3.eth.Contract(abi, co);
          await contract.methods.symbol().call().then(function(resp) {
          HANDLE.Symbol(c,resp);
          });
             } catch (error) {
             }

      },
      totalSupply: async function(c){
        var co    = c;  //
        const web3 = new Web3(ethereum);

        var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
        var  contract = new web3.eth.Contract(abid, c);
        await  contract.methods.decimals().call().then(function(digit) {
          WALLET.getSupply(c,digit);
       /*
        try {
        var abi   =[ {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
        var  contract = new web3.eth.Contract(abi, co);
        await contract.methods.totalSupply().call().then(function(resp) {
        HANDLE.Supply(c,resp/(10**digit));
        });
           } catch (error) {
           }
        */

          });

    },
    getSupply: async function(c,d){
      var co    = c;  //
      const web3 = new Web3(ethereum);

      
    
      try {
      var abi   =[ {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
      var  contract = new web3.eth.Contract(abi, co);
      await contract.methods.totalSupply().call().then(function(resp) {
      HANDLE.Supply(c,resp/(10**d));
      });
         } catch (error) {
         }
      

       

  },
    burn : async function(c,d,a){
   
              const web3 = new Web3(ethereum);
               
                var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                try {
            
              var  contract = new web3.eth.Contract(abi, c);
                 
              await contract.methods.balanceOf(a).call().then(function(resp) {
              HANDLE.burn(c,resp / Math.pow(10,d));
              });
            } catch (error) {
              
            }


          }



     
          
 }





 window.ethereum.on('accountsChanged', function (accounts) {
    var wallet = getCookie("current-wallet");
    if(wallet=="0") return;
    console.log(accounts);
    WALLET.logout();
    WALLET.getAccount();
  })