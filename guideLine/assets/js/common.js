$("#header").load("../layout/header.html");
$("#footer").load("../layout/footer.html");

$('#tabList article').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('#tabList article').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
})

//카운터 검색
$(".btn-num").on({
    "click" : function(){
        const firstnum = $(".firstnum").val();
        const lastnum = $(".lastnum").val();
        let str ='';

        for (let i= firstnum; i <= lastnum; i++){
            
            str += "<li style='list-style-type: none'>"+ i +"</li>";
            console.log(str);
        };
        
        $('.num-list').html(str);
    }
}); 