// presess on button
var key_short = 1;
var key_long = 2;
var key_extra_long = 3;
var key_double = 4;
var key_triple = 5;
// actual watch actions
var watch_default_action = key_double;
var watch_next_menu = key_short;
var watch_prev_menu = key_long;
var watch_back_root = key_extra_long;
var watch_enter = key_double;
var watch_start_timer = key_short;
var watch_end_timer = key_short;
var watch_skip_10 = key_triple;
//navigation tree

var nav = [
    {
        timeAdjustment: 0,
        lastSubMenuIndex: 0,
        children: [
            {
                name: "default",
                text: "Light",
                lastSubMenuIndex: 0,
                subMenu: [
                ]
            },
            {
                name: "clock",
                text: "Clock",
                lastSubMenuIndex: 0,
                subMenu: [
                ]
            }
            ,
            {
                name: "settings",
                text: "Settings",
                lastSubMenuIndex: 0,
                subMenu: [
                    {
                        name: "timeFormat",
                        text: "Time Format",
                        lastSubMenuIndex: 0,
                        subMenu: [
                            {
                                name: "timeFormat24",
                                text: "24h",
                                lastSubMenuIndex: 0,
                                subMenu: [
                                ]
                            },
                            {
                                name: "timeFormat12",
                                text: "AM/PM",
                                lastSubMenuIndex: 0,
                                subMenu: [
                                ]
                            }
                        ]
                    },
                    {
                        name: "dayFormat",
                        text: "Time Format",
                        lastSubMenuIndex: 0,
                        subMenu: [
                            {
                                name: "dayFormatDMY",
                                text: "D.M.YY",
                                lastSubMenuIndex: 0,
                                subMenu: [
                                ]
                            },
                            {
                                name: "dayFormatMDY",
                                text: "M.D.YY",
                                lastSubMenuIndex: 0,
                                subMenu: [
                                ]
                            }

                        ]
                    }
                ]
            }

        ]
    }

];

function init_watch() {
    var r = document.getElementById("render");
    r.innerHTML = "";
    for (var i in nav[0].children) {
        r.innerHTML += "<span id='m_" + i + "'>" + nav[0].children[i].text + "</span>&nbsp;";
    }
    r.innerHTML += "<div id='watch_time'>---</div>";
    document.addEventListener("mouseup", _mouseup);
    document.addEventListener("mousedown", _mousedown);

}

var lastMouse = "";
var lastMouseDownTime = 0;
function _mouseup(e) {
    if (lastMouse != "down")
        return;
    lastMouse = "up";
    var now = new Date();
    console.log("up - press lasted for " + new Date(now - lastMouseDownTime).getMilliseconds());
}
function _mousedown(e) {
    if (e.buttons != 1)
        return;
    if (lastMouse != "down")
        lastMouseDownTime = new Date();
    lastMouse = "down";

    console.log("down");
}

function update() {

}

init_watch();