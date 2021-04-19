var problems = null
var btn = document.querySelector("#btn")
    // var app1 = new Vue({
    //     el: "#btn",
    //     data: {
    //         problems: problems
    //     },
    //     methods: {
    //         choose: function(e) {
    //             console.log(e.target.getAttribute('val'))

//             var fathers = e.target.parentNode.parentNode.children
//             for (let i = 0; i < 5; i++) {
//                 let tmp = fathers[i].children[0]
//                     // console.log(tmp)
//                 tmp.setAttribute("selected", "false")
//                 tmp.style = ""
//             }
//             e.target.style = "background-color: lightblue; color: white;"
//             e.target.setAttribute('selected', "true")
//                 // console.log(fathers)
//         }
//     }
// })

btn.addEventListener('click', function() {
    var uname = document.querySelector("#uname")
    var uage = document.querySelector("#uage")
    var sex = document.querySelector("#SEX").selectedIndex //性别1男2女
    var phone = document.querySelector("#phone")
    var notdone = []
        // console.log(uname.value, sex, phone.value, uage.value)
    var choices = document.querySelectorAll("#choose")
    var mychoose = []
    let flag = 0
    for (let i = 0; i < choices.length; i++) {
        sons = choices[i].children
        for (let j = 0; j < sons.length; j++) {
            if (sons[j].children[0].getAttribute('selected') == 1) {
                mychoose.push(sons[j].children[0].getAttribute('val'))
                flag = 1
                break;
            }
        }
        if (flag == 0) {
            notdone.push(i + 1)
        }
        flag = 0
    }
    if (notdone.length != 0) {
        alert("第" + notdone + "题还没完成")
    } else if (uname.value == "" || phone.value == "" || uage.value == "" || sex == 0) {
        alert("姓名或手机号或年龄或性别未输入")
    } else if (notdone.length == 0) {
        if (sex == 1) {
            sex = "男"
        } else {
            sex = "女"
        }
        axios.post("http://192.168.1.109:83/result/new", {
            age: uage.value,
            list: mychoose,
            name: uname.value,
            telephone: phone.value,
            time: "123456"
        }).then(function(response) {
            console.log(response)
        })
    }
    notdone = []
})


function getProblems() {
    var that = this;
    axios.get("http://192.168.1.109:83/title/query").then(function(res) {
        // that.msg = res.data;
        problems = res.data
        console.log(problems)
        var app = new Vue({
            el: "#app",
            data: {
                problems: problems
            },
            methods: {
                choose: function(e) {
                    // console.log(e.target.getAttribute('val'))
                    var fathers = e.target.parentNode.parentNode.children
                    for (let i = 0; i < 5; i++) {
                        let tmp = fathers[i].children[0]
                            // console.log(tmp)
                        tmp.setAttribute("selected", 0)
                            // console.log(tmp)
                        tmp.style = ""
                    }
                    e.target.style = "background-color: lightblue; color: white;"
                    e.target.setAttribute('selected', 1)
                        // console.log(e.target)
                        // console.log(fathers)
                }
            }
        })
    })
}
window.onload = getProblems;