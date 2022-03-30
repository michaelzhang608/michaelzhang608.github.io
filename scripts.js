$(document).ready(() => {
    $(".preview").popover({
        trigger: "hover",
        html: true,
        content: function () {
            return '<img class="img-fluid" src="' + $(this).data('img') + '" />';
        }
    });
})