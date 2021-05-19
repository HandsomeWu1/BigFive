var problems = null
    //var path = "http://192.168.1.102:82"
    // var path = "http://localhost:82"
var path = "http://47.99.164.238:9832"
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
    var group = document.querySelector("#group").selectedIndex //选择组织
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
    } else if (uname.value == "" || phone.value == "" || uage.value == "" || sex == 0 || group == 0) {
        alert("姓名或手机号或年龄或性别或组织未输入")
    } else if (notdone.length == 0) {
        if (sex == 1) {
            sex = "男"
        } else {
            sex = "女"
        }
        axios.post(path + "/result/newBigfive", {
            age: uage.value,
            list: mychoose,
            // list:[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
            group: group,
            name: uname.value,
            telephone: phone.value,
        }).then(function(response) {
            alert(response.data)
            if (response.data == "success") {
                window.location = "result.html"
            }
        })
    }
    // axios.post(path + "/result/newBigfive", {
    //     age: uage.value,
    //     //list: mychoose,
    //     list:[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    //     name: uname.value,
    //     telephone: phone.value,
    // }).then(function(response) {
    //     alert(response.data)
    //     if (response.data == "success") {
    //         window.location = "result.html"
    //     }
    // })
})



function getProblems() {
    var that = this;
    axios.get(path + "/title/bigfive").then(function(res) {
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