module.exports = {
    
    //订单列表
    "/v16/iou/getLoanAndRepaying": function(req, res) {
        
        // ==============逾期的情况 
        // 1.未逾期未还款的，显示待回购，status=6，repaystatus=1，overdueday=0。
        // 2.逾期了，就显示已逾期，status=6，repaystatus=1，overdueday>0。
        // 3.正常还款，显示已回购,status=6，repaystatus=2，overdueday=0。
        // 4.逾期还款，显示逾期已回购,status=6，repaystatus=2，overdueday>0。
        var data = [{
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 1, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '', //还款日期string
                repayStatus: 1, //还款状态 number
                termNum: 7,
                lendTime: '1513500446000',
                loanId: 12312312312312312,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf",
                fundRepayAccountId: '504',
                repayingSid: '123',
                 arriveTime: '1515427200000', //借款日期
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 2, //状态number
                termDate: '', //还款日期string
                repayStatus: 2, //还款状态 number
                termNum: 7,
                lendTime: '1513500446000',
                loanId: 12312312312312312,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf",
                repayingSid: '123'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 3, //状态number
                termDate: '1513500446000', //还款日期string,
                repayStatus: 1, //还款状态number(1, 未还款; 2已还款)
                termNum: 14,
                lendTime: '1513500446000', //申请日期
                arriveTime: '1515427200000', //借款日期
                loanId: 12312312312312312,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/6272b2adda5043109f58653f595cc99a.png",
                repayingSid: '123'
                // signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf"
            },

            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 4, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 3,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf",
                repayingSid: '123'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 5, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 4,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf",
                repayingSid: '123'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 5,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf",
                repayingSid: '123'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 12, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 6,
                signatureUrl: "",
                repayingSid: '123'
            },
            //需要还款的记录
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 13, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 7,
                signatureUrl: "",
                repayingSid: '123',
                fundRepayAccountId: '504',
                loanRepayingId: 1947211213,
                fundRepayAccounts:[
                    {
                        id:801,//支付账号ID
                        payGatewayType:801//支付类型: 微信支付801，连连支付501
                    },
                    {
                        id:802,
                        payGatewayType:501//连连支付
                    }
                ]
            },
             {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 7,
                signatureUrl: "",
                repayingSid: '123',
                fundRepayAccountId: '504',
                loanRepayingId: 1947211213,
                fundRepayAccounts:[
                    {
                        id:801,//支付账号ID
                        payGatewayType:801//支付类型: 微信支付801，连连支付501
                    },
                    // {
                    //     id:802,
                    //     payGatewayType:501//连连支付
                    // }
                ]
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 16, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 8,
                signatureUrl: "",
                repayingSid: '123'
            },
        ]

        // data = [];

        var result = {

            code: 0,
            data: data,
            message: '提示信息'
        }

        res.json(result);
    },
}
