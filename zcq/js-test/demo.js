// 不要放弃。  11:38:22
// 当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
// 当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
// 当价格类型为“返场价”时，满 200 - 50，不叠加
// 当价格类型为“尝鲜价”时，直接打 5 折

function activity (money, type) {
    return {
        '预售价': money >= 100 ? money - 20 : money * 0.9,
        '大促价': money >= 100 ? money - 30 : money * 0.8,
        '返场价': money >= 200 ? money - 50 : money,
        '尝鲜价': money * 0.5
    }[type]
}

console.log(activity(120,'预售价'))
console.log(activity(120,'大促价'))
console.log(activity(120,'返场价'))
console.log(activity(120,'尝鲜价'))