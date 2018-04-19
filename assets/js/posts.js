var postsContent = $(".content");

postsContent.on('mouseenter', function() {
    $(this).css("color", "rgb(0, 92, 167)");
});

postsContent.on('mouseleave', function() {
    $("this .site-posts__post-title").css("color", "black");
    $("this .site-posts__post-preview").css("color", "rgb(85, 85, 85)");
});