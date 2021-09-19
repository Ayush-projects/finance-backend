const { findByIdAndUpdate } = require('./models/wallet.js');
const wallet = require('./models/wallet.js')
class Transaction{
    static async isWalletValid(id)
    {
         let tempList = await wallet.find({_id: id});
         if(tempList.length==0)
         {
             return false;
         }
         return true;

    }
    static async isBalanceAvailable(id, amount)
    {   let tempList = await wallet.find({_id: id});
        if(tempList[0].balance >= amount)
        {
            return true;
        }
        return false;
    }

    static async topUp(id, amount)
    {   
        let tempList = await wallet.find({_id: id});
        console.log(tempList)
        let temp = await wallet.findByIdAndUpdate({_id: id}, {balance: tempList[0].balance+amount})
        return temp;
        
        
    }

    static async transfer(from, to, amount)
    {
        if(Transaction.isWalletValid(from) && Transaction.isWalletValid(to) && Transaction.isBalanceAvailable(from, amount))
        {
            let tempList1 = await wallet.find({_id: from});
            let temp = await wallet.findByIdAndUpdate({_id: from}, {balance: tempList1[0].balance-amount});
            let tempList2 = await wallet.find({_id: to});
            let temp1 = await wallet.findByIdAndUpdate({_id: to}, {balance: tempList2[0].balance+amount});
            return true;
            
        }
        return false;
    }
    
}




module.exports = Transaction;