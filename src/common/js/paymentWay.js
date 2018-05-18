export default data => {

    data.forEach(item => {

        switch (item.payGatewayType) {

            case 501:
                item.name = "快捷支付"; //支付名称
                item.class = "kuaijie"; //用来显示图标的class
                item.selected = !!item.selected ? true : false; //用来判断是否选中了
                break;
            case 801:
                item.name = "微信支付";
                item.class = "weixin";
                item.selected = !!item.selected ? true : false;
                break;

        }
    })

    return data;
}