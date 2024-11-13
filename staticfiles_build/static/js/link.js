let validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$("#book_btn").on("click", ()=>{
   if ($("#company_name").val() == "") {
       alert("Company Name can't be empty !")
       return
   }

   if (!validEmail.test($("#company_email").val())) {
        alert("Company email can't be empty !")
        return
   }

   $(".link_copy").show()

   let hostname_ = window.location.hostname;
   let url = hostname_ + "/zoommeeting/zoommeeting?meeting=video&id="+btoa($("#company_name").val())+"&access="+btoa($("#company_email").val());

   $("#generate_link").html(`<a href="${url}">${url}</a>`)

   $("#company_name").val("")
   $("#company_email").val("")
});

// copy link

function copyFunction() {
    const copyText = document.getElementById("generate_link").textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    // k2button.innerText = "Text copied";
    alert("Copied !")
      textArea.remove();
  }

  $("#copy_btn").on("click", ()=>{
    if ($("#generate_link").text() !="") {
        copyFunction()
    }
  })