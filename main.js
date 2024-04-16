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

// key press timing cut offs
var single_press = 150;
var long_press = 600;
var extra_long_press = 1800;
var intermediate_for_multiple_presses = 200;
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
    update();
}
function press(k) {

}

function single_cutoff() {
    //  console.log("cut off");
    if (single_press_counter == 1) {
        press(key_short);
        console.log("single");
    }
    if (single_press_counter == 2) {
        press(key_double);
        console.log("double");

    } if (single_press_counter == 3) {
        press(key_triple);
        console.log("triple");

    }
    lastShortTime = 0;
    single_cutoff_timer = 0;
    single_press_counter = 0;
    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
    }
    lastMouse = "";
    lastMouseDownTime = 0;
}

var lastShortTime = 0;
var single_cutoff_timer = 0;
var single_press_counter = 0;
function short_p(t) {
    // console.log("short");
    lastShortTime = t;
    single_press_counter++;
    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
    }
    if (single_press_counter > 3) {
        single_cutoff();
        return;
    }
    single_cutoff_timer = window.setTimeout(single_cutoff, intermediate_for_multiple_presses);

}
function long_p(t) {
    console.log("long " + t);
    press(key_long);
}
function extra_long_p(t) {
    console.log("extra_long " + t);
    press(key_extra_long);
}
var lastMouse = "";
var lastMouseDownTime = 0;
function _mouseup(e) {
    if (lastMouse != "down")
        return;
    lastMouse = "up";
    var now = new Date();
    if (lastMouseDownTime == 0)
        lastMouseDownTime = new Date();
    var time = new Date(now - lastMouseDownTime).getMilliseconds();
    //  console.log("up - press lasted for " + time);
    if (time < single_press) {
        short_p(time);
        return;
    }
    if (time < long_press) {
        long_p(time);
        return;
    }
    if (time < extra_long_press) {
        extra_long_p(time);
        return;
    }
}
function _mousedown(e) {
    if (e.buttons != 1)
        return;
    if (lastMouse != "down")
        lastMouseDownTime = new Date();
    lastMouse = "down";

    //   console.log("down");
}

function update() {
    window.setTimeout(update, 100);
    var t = document.getElementById("watch_time");
    t.innerHTML = new Date().toLocaleTimeString();
}

init_watch();