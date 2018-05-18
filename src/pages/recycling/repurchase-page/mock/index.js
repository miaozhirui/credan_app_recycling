module.exports = {
    
    //连连支付接口
    "/wx/v16/LLPayInterface": function(req, res) {

        var result = {
            "statusCode": 5004,
            "message": "连连支付返回参数成功",
            "success": true,
            "data": {
                "acct_name": "缪志瑞",
                "app_request": "3",
                "bg_color": "36b046",
                "busi_partner": "101001",
                "dt_order": "20171103115917",
                "id_no": "320826199009133356",
                "info_order": "还款",
                "money_order": "50.01",
                "name_goods": "还款",
                "no_agree": "",
                "no_order": "369445",
                "notify_url": "http://118.190.60.163:8030/wx/LLNotifyUrl ",
                "oid_partner": "201709080000890470",
                "risk_item": {
                    "user_info_full_name": "缪志瑞",
                    "user_info_id_no": "320826199009133356",
                    "user_info_identify_type": "2",
                    "user_info_bind_phone": "13913169273",
                    "user_info_identify_state": "1",
                    "user_info_mercht_userno": "d9a6e129762142bcab29e4ec1aade185",
                    "frms_ware_category": "2010",
                    "user_info_dt_register": "20170803161349"
                },
                "sign": "QCBhR29l1mNryf/JO3QrIuniVs+hBIfZqVuP70pHikpajpRfwpVsr8Lds63jA9T9thrUDzEr8A+ymEharVh5bLg+xlwB6PjVXlQFpXesZzLnpWwFxlET/he4qoQ7kfzIXOie/cpBaty3a9m7C9WPpcNUOuN3FhsEAL6K3L9ue8c=",
                "sign_type": "RSA",
                "url_return": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3ffa0ee90690f42&redirect_uri=http://app.credan.com/cs/account/&response_type=code&scope=snsapi_userinfo",
                "user_id": "d9a6e129762142bcab29e4ec1aade185",
                "valid_order": "30"
            }
        }

        res.json(result);
    }
}
 