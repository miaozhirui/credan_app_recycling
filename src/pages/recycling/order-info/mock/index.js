module.exports = {

    "/v16/get/loanInfo": function(req, res) {


        var body = req.body;

        if (body.termNum == 7) {

            var data = {

                lendMoney: 2000, //租金总额
                payMoney: 1720, //到账金额
                // 租金总额=lendMoney-payMoney
                //日租金=(lendMoney-payMoney)/termNum
                termNum: 7
            }
        }

        if (body.termNum == 14) {

            var data = {

                lendMoney: 2000, //租金总额
                payMoney: 1720, //到账金额
                // 租金总额=lendMoney-payMoney
                //日租金=(lendMoney-payMoney)/termNum
                termNum: 14
            }
        }

        res.json(data)
    },

    "/v2/cashloan/submitOrderInfo": function(req, res) {

         var result = {
            "statusCode": 200,
            "message": "提交及时雨订单",
            "data": {
                "cashId": "null",
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 1
            },
            "success": true
        }

        res.json(result);
    }
}