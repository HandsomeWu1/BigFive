var problems = null
    // var path = "http://192.168.43.75:82"
    //  var path = "http://localhost:9832"
var path = "http://47.99.164.238:9832"
var btn = document.querySelector("#btn")
btn.addEventListener('click', function() {
    var uname = document.querySelector("#uname")
    var uage = document.querySelector("#uage")
    var sex = document.querySelector("#SEX").selectedIndex //性别1男2女
    var org = 0
    var phone = ""
    var notdone = []
        // console.log(uname.value, sex, phone.value, uage.value)
    var ipts = document.querySelectorAll("input")
    var mychoose = ""
        //判断
    for (let i = 2; i < ipts.length; i += 4) {
        if (ipts[i].checked == false && ipts[i + 1].checked == false && ipts[i + 2].checked == false && ipts[i + 3].checked == false) {
            notdone.push(parseInt((i - 3) / 4 + 1))
        }
        for (let j = 0; j < 4; j++) {
            if (ipts[i + j].checked == true) {
                mychoose = mychoose + ipts[i + j].getAttribute("protype")
            }
        }
    }
    console.log(mychoose)
    if (notdone.length != 0) {
        alert("第" + notdone + "题还没完成")
    } else if (uname.value == "" || uage.value == "" || sex == 0) {
        alert("姓名或年龄或性别未输入")
    } else if (notdone.length == 0) {
        if (sex == 1) {
            sex = "男"
        } else {
            sex = "女"
        }
        axios.post(path + "/result/newDisc", {
            age: uage.value,
            res: mychoose,
            name: uname.value,
            org: 0,
            sex: sex,
            telephone: "",
        }).then(function(response) {
            alert(response.data)
            if (response.data == "success") {
                window.location = "DISC_result.html"
            }
        })
    }
    //     notdone = []
})


function getProblems() {
    var that = this;
    axios.get(path + "/title/disc").then(function(res) {
        // that.msg = res.data;
        problems = res.data

        for (let index = 0; index < problems.length; index++) {
            problems[index][0].num = problems[index][0].num + ""

        }
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
                },
                bigchoose(e) {
                    console.log(e.target.parentNode.children[0].children)
                    let ipt = e.target.parentNode.children[0].children[0]
                    ipt.click()
                }
            }
        })
    })
}
window.onload = getProblems;