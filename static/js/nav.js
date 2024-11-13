$("#zoom_img").on("click", ()=>{
    location = "https://zoom.com"
})


$("#search_img").on("click", ()=>{
   if ($("#nav_iput").val() == "") {
    $("#nav_iput").toggle()
   }
})