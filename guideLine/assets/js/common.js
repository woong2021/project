$("#header").load("../layout/header.html");
$("#footer").load("../layout/footer.html");

$('#tabList article').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('#tabList article').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
})