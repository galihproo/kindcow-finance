var HANDLE ={
    Deposit : function(pid,res){
        console.log(res);
    },
    AddContract : function(res){
        location.reload();
        toast('Success','add '+res)
    },
    Withdraw : function(pid,res){
        console.log(res);
    },
    Account : function(res){
        //console.log(res);

        if(res.length==42){
            var walletConnector = document.querySelectorAll('.connect-to-wallet');
            for(var i =0;i<walletConnector.length;i++)
                {
                    walletConnector[i].style.display = 'none';
                };
       var walletConnector = document.querySelectorAll('.logedin');
        for(var i =0;i<walletConnector.length;i++)
            {
        walletConnector[i].style.display = '';
            };


            if(document.getElementsByClassName('mywallet-address').length>0)
            for(var x =0;x<document.getElementsByClassName('mywallet-address').length;x++)
            document.getElementsByClassName('mywallet-address')[x].innerHTML = res;


                 
           setCookie("current-wallet", res,10);
           checkApproved(res);
        }

    }, Logout : function(res){
        console.log("Logout");

        if(res==0){
            var walletConnector = document.querySelectorAll('.connect-to-wallet');
            for(var i =0;i<walletConnector.length;i++)
                {
                    walletConnector[i].style.display = '';
                };
       var walletConnector = document.querySelectorAll('.logedin');
        for(var i =0;i<walletConnector.length;i++)
            {
        walletConnector[i].style.display = 'none';
            };


            if(document.getElementsByClassName('mywallet-address').length>0)
            for(var x =0;x<document.getElementsByClassName('mywallet-address').length;x++)
            document.getElementsByClassName('mywallet-address')[x].innerHTML = res;
                 
              
        }
        deleteAllCookies();
        logoutcss();
        setCookie("current-wallet", 0,10);
        


    },
    Approve : function (pid,res) {

        if(res.length==66){
        
        console.log(res);
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-pid-"+pid,"true");
        toast('title',res);
        }


        
    },
    PendingReward : function (pid,res) {

        
        if($('.pending-reward-pid-'+pid).length>0)
        {
        document.getElementsByClassName('pending-reward-pid-'+pid)[0].innerHTML = number_format(res);
        }
        
    },
    BalanceLP : function (pid,res) {
        
        if($('.your-lp-pid-'+pid).length>0)
        {   var x=0;
            for(x=0;x<$('.your-lp-pid-'+pid).length;x++) {
                $('.your-lp-pid-'+pid)[x].innerHTML = number_format(res);
               } 
        } 
       
        
    }
    ,
    Allowance : function (pid,res) {
        if(res>=999999999){
        if ($('.get-approve-pid-'+pid).length>0) 
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = 'none';
        if ($('.non-approve-pid-'+pid).length>0) 
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = 'none';
        if ($('.approved-pid-'+pid).length>0) 
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-pid-"+pid,"true");
        //console.log(res);
        }
        
    },
    Metamask : function (res) {
        console.log(res);
        
    }
    ,
    PoolInfo : function (pid,res) {
        var tokenprice = 1;
        var total_aloct = 12000;
        if ($('.alloc-pid-'+pid).length>0) 
        document.getElementsByClassName('alloc-pid-'+pid)[0].innerHTML = number_format(res[1],0);
        if ($('.block-reward-pid-'+pid).length>0) 
        document.getElementsByClassName('block-reward-pid-'+pid)[0].innerHTML = number_format((res[1]/total_aloct)*tokenprice*28800);

        
        
    },
    PoolInfoVote : function (pid,res) {
        $('#sortable-table tbody').append(
            '<tr>\
            <td>'+pid+'</td>\
            <td>'+res[0]+'</td>\
            <td class="name-'+res[0].toLowerCase()+'">???</td>\
            <td class="align-middle">'+res[1]+'</td>\
            <td style="font-size:32px;">\
              <i class="bi bi-arrow-down-square-fill text-warning vote-down-pid-'+pid+'" style="cursor: pointer;"></i>\
              <i class="bi bi-arrow-up-square-fill text-success vote-up-pid-'+pid+'" style="cursor: pointer;"></i>\
          </td>\
          </tr>'
        );

        WALLET.getName(res[0]);

   
  // WALLET.getAllowance(0);

    if(document.querySelectorAll(".vote-down-pid-"+pid).length>0)
    document.querySelectorAll(".vote-down-pid-"+pid)[0].addEventListener('click', function(event) {
        loading(event.target);
        showLoader();
        WALLET.voteDown(pid,1);
      });
  
  
     if(document.querySelectorAll(".vote-up-pid-"+pid).length>0)
    document.querySelectorAll(".vote-up-pid-"+pid)[0].addEventListener('click', function(event) {
        loading(event.target);
        showLoader();
        WALLET.voteUp(pid,1);
      });
   
       
    },
    poolLength : function (resp) {
        for (let index = 0; index < resp; index++) {
               WALLET.getPoolInfoVote(index);
        }

       // console.log('data' + datas);
    },
    BalanceWallet : function (pid,res) {
        
        if(document.getElementsByClassName('your-wallet-lp-pid-'+pid).length>0)
        {
        document.getElementsByClassName('your-wallet-lp-pid-'+pid)[0].innerHTML = number_format(res);
        }

       // console.log('data' + datas);
    },
    poolReward : function (res) {
        
        if(document.getElementById('reward-voter')!== null)
        {
        document.getElementById('reward-voter').innerHTML = number_format(res/100000000);
        }

       // console.log('data' + datas);
    }
    ,
    Name : function (contract,res) {
        
        if(document.getElementsByClassName('name-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('name-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('name-'+contract.toLowerCase())[x].innerHTML = res;
        }

       // console.log('data' + datas);
    } ,
    Symbol : function (contract,res) {
        
        if(document.getElementsByClassName('sym-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('sym-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('sym-'+contract.toLowerCase())[x].innerHTML = res;
        }

       // console.log('data' + datas);
    },
    Supply : function (contract,res) {
        
        if(document.getElementsByClassName('supply-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('supply-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('supply-'+contract.toLowerCase())[x].innerHTML = number_format(res) ;
        }

       // console.log('data' + datas);
    }
    ,
    burn : function (contract,res) {
        
        if(document.getElementsByClassName('burn-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('burn-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('burn-'+contract.toLowerCase())[x].innerHTML = number_format(res) ;
        }

       // console.log('data' + datas);
    }
}




 