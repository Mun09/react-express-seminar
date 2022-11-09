const express = require('express');
const authMiddleware = require('../middleware/auth');
const AccountModel = require('../models/account');

const router = express.Router();

class BankDB {
    static _inst_;
    static getInst = () => {
        if ( !BankDB._inst_ ) BankDB._inst_ = new BankDB();
        return BankDB._inst_;
    }

    constructor() {
      const newAccount = new AccountModel({_name: process.env.API_KEY, total: 10000});
      const res = newAccount.save();
      console.log("[Bank-DB] DB Init Completed"); 
    }

    getBalance = async ( name ) => {
        try {
          const data = await AccountModel.findOne({ _name : name });
          return {data: data, success: true};
        } catch (e) {
          console.log(`[Account-DB] Balance Error: ${ e }`);
          return {success: false};
        }
    }

    transaction = async ( item ) => {
        const { name, amount } = item;
        try {
          const OUpdateFiler = { _name : name };
          const res = await AccountModel.findOneAndUpdate(OUpdateFiler, { $inc: { total : amount}}, {new: true});
          return {success: true, data: res};
        } catch (e) {
          console.log(`[Account-DB] Transaction Error: ${ e }`);
          return {success: false};
        }
    }
}

const bankDBInst = BankDB.getInst();

router.post('/getInfo', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const dbRes = await bankDBInst.getBalance( name );
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.success });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/transaction', authMiddleware, async (req, res) => {
    try {
        const { amount, name } = req.body;
        const dbRes = await bankDBInst.transaction( { name: name, amount: parseInt(amount) } );
        if (dbRes.success) return res.status(200).json(dbRes.data); // { success: true, balance: dbRes.data[0].total, msg: "Transaction success" }
        else return res.status(500).json({ error: dbRes.success });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;