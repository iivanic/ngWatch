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
var single_press_max_milisec = 200;
var long_press_max_milisec = 600;
var extra_long_press_max_milisec = 1800;
var inbetween_pause_multiple_presses_max_milisec = 200;
//navigation tree

var nav =
{
    name: "root",
    text: "root",
    timeAdjustment: 0,
    lastSubMenuIndex: 0,
    subMenu: [

        {
            name: "clock",
            text: "Clock",
            lastSubMenuIndex: 0,
            subMenu: [
            ],
            execute: light_on
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
                            name: "back",
                            text: "<--",
                            lastSubMenuIndex: 0,
                            subMenu: [
                            ]
                        }
                        , {
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
                    text: "Day Format",
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
                        },
                        {
                            name: "back",
                            text: "Back",
                            lastSubMenuIndex: 0,
                            subMenu: [
                            ]
                        }

                    ]
                },
                {
                    name: "back",
                    text: "Back",
                    lastSubMenuIndex: 0,
                    subMenu: [
                    ]
                }

            ]
        },
        {
            name: "adjustTime",
            text: "Adjust Time",
            lastSubMenuIndex: 0,
            subMenu: [
                {
                    name: "adjustHrs",
                    text: "Hour",
                    lastSubMenuIndex: 0,
                    subMenu: [
                    ]
                },
                {
                    name: "adjustMnt",
                    text: "Minute",
                    lastSubMenuIndex: 0,
                    subMenu: [
                    ]
                },
                {
                    name: "adjustSec",
                    text: "Seconds",
                    lastSubMenuIndex: 0,
                    subMenu: [
                    ]
                },
                {
                    name: "back",
                    text: "Back",
                    lastSubMenuIndex: 0,
                    subMenu: [
                    ]
                }
            ]
        }

    ]
};

var stack = [];
var curr_nav_level = nav;
var dirty = true;


var single_cutoff_timer = 0;
var single_press_counter = 0;
var lastMouse = "";
var lastMouseDownTime = 0;


function init_watch() {
    var r = document.getElementById("render");
    r.innerHTML = "";
    r.innerHTML += "<div class='light_off' style='font-size:large; font-weight:bold;line-height: 100px;height:100px;width:200px;text-align:center;' id='watch_time'>---</div>";
    r.innerHTML += "<div style='position:absolute;right:30px;top:30px;background-color:yellow;width:150px;height:50px;text-align:center;line-height: 50px;' id='indicator'>-</div>";
    document.addEventListener("mouseup", _mouseup);
    document.addEventListener("mousedown", _mousedown);
    update();
}
function press(k) {

    if (k == watch_back_root) {
        curr_nav_level = nav;
        curr_nav_level.lastSubMenuIndex = 0;
        dirty = true;
        update();
    }
    if (k == watch_prev_menu) {
        if (curr_nav_level.lastSubMenuIndex > 0)
            curr_nav_level.lastSubMenuIndex--;
        else
            curr_nav_level.lastSubMenuIndex = curr_nav_level.subMenu.length - 1;
        dirty = true;
        update();
    }
    if (k == watch_next_menu) {
        if (curr_nav_level.lastSubMenuIndex < curr_nav_level.subMenu.length - 1)
            curr_nav_level.lastSubMenuIndex++;
        else
            curr_nav_level.lastSubMenuIndex = 0;
        dirty = true;
        update();
    }

    if (k == watch_enter) {

        if (curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex].subMenu.length > 0) {
            stack.push(curr_nav_level);
            console.log("pushed " + curr_nav_level.name);
            curr_nav_level = curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex];
            console.log("new curr_nav_level " + curr_nav_level.name);
        }
        else {
            if (curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex].name == "back") {
                curr_nav_level = stack.pop();

                console.log("poped " + curr_nav_level.name);
            }
            else {
                var e = curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex].execute;
                if (e)
                    e();
                console.log("execute");
            }

        }

        dirty = true;
        update();
    }



}
function light_on() {
    var el = document.getElementById("watch_time");

    el.classList.add("light");
    el.classList.remove("light_off");

    window.setTimeout(() => {
        el.classList.remove("light");
        el.classList.add("light_off");
    }, 1500);

}
function cutoff() {
    lastMouse = "";
    lastMouseDownTime = 0;

    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
        single_cutoff_timer = 0;
    }
    if (single_press_counter == 1) {
        press(key_short);
        indicate("single press");
    }
    if (single_press_counter == 2) {
        press(key_double);
        indicate("double press");
    }
    if (single_press_counter == 3) {
        press(key_triple);
        indicate("triple press");
    }
    if (single_press_counter == 0) {

    }

    single_press_counter = 0;



    //   console.log("cut off - lastMouseDownTime " + lastMouseDownTime);


}


function short_p(t) {
    //   console.log("short");

    single_press_counter++;
    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
        single_cutoff_timer = 0;
    }
    if (single_press_counter > 2) {

        cutoff();
        return;
    }
    single_cutoff_timer = window.setTimeout(cutoff, inbetween_pause_multiple_presses_max_milisec);

}
function long_p(t) {
    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
        single_cutoff_timer = 0;
    }
    indicate("long press " + t)
    single_press_counter = 0;
    cutoff();
    press(key_long);

}
function extra_long_p(t) {
    if (single_cutoff_timer) {
        window.clearTimeout(single_cutoff_timer);
        single_cutoff_timer = 0;
    }
    indicate("extra_long press " + t);
    single_press_counter = 0;
    cutoff();
    press(key_extra_long);

}

function _mouseup(e) {
    e.stopPropagation();
    e.preventDefault();
    if (lastMouse != "down")
        return;
    lastMouse = "up";

    var time_msec = Date.now() - lastMouseDownTime;
    //   console.log("up - press lasted for " + time_msec);
    if (time_msec < single_press_max_milisec) {
        short_p(time_msec);
        return;
    }
    if (time_msec < long_press_max_milisec) {
        long_p(time_msec);
        return;
    }
    if (time_msec < extra_long_press_max_milisec) {
        extra_long_p(time_msec);
        return;
    }
}
function _mousedown(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.buttons != 1)
        return;
    if (lastMouse != "down") {
        lastMouseDownTime = Date.now();
        //       console.log("_mousedown - lastMouseDownTime " + lastMouseDownTime);
    }
    lastMouse = "down";

    //   console.log("down");
}


var up = 0;
function update() {
    if (up) {
        window.clearTimeout(up);
        up = 0;
    }
    // if key is pressed for too long, stop it.
    if (lastMouseDownTime > 0) {
        var time_msec = Date.now() - lastMouseDownTime;
        if (time_msec > extra_long_press_max_milisec) {
            extra_long_p(time_msec);
        }
    }

    if (dirty) {
        var c = document.getElementById("clock");
        c.innerHTML = "";
        for (var i in curr_nav_level.subMenu) {
            c.innerHTML += "<span " + (i == curr_nav_level.lastSubMenuIndex ? "style='text-decoration:underline;'" : "") + " id='m_" + i + "'>" + curr_nav_level.subMenu[i].text + "</span>&nbsp;";
        }
        dirty = false;
    }

    var t = document.getElementById("watch_time");
    var current_name = curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex].name;
    if (current_name == "default" || current_name == "clock") {
        t.innerHTML = new Date().toLocaleTimeString();

    }
    else {
        t.innerHTML = curr_nav_level.subMenu[curr_nav_level.lastSubMenuIndex].text;
    }




    up = window.setTimeout(update, 500);
}

var cl = 0;
function indicate(str) {
    if (cl)
        window.clearTimeout(cl);
    document.getElementById("indicator").innerText = str;

    cl = setTimeout(() => {
        document.getElementById("indicator").innerText = "-"
    }, 500);

}

init_watch();