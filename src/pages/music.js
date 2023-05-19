
  $(".list_block .play_btn .play_icon").on("click", function (current) {
    $(this).parent().find(".play_icon").css("display", "none");
    $(this).parent().find(".pause_icon").css("display", "inline-block");
    $(".play_icon")
      .not(this)
      .parent()
      .find(".pause_icon")
      .css("display", "none");
    $(".play_icon")
      .not(this)
      .parent()
      .find(".play_icon")
      .css("display", "inline-block");

    $(this).parent().parent().addClass("isPlaying");
    $(".play_icon").not(this).parent().parent().removeClass("isPlaying");

    $(this)
      .parent()
      .parent()
      .find(".beat_animation li")
      .css("animation-play-state", "running")
      .css("opacity", "1");
    $(".play_icon")
      .not(this)
      .parent()
      .parent()
      .find(".beat_animation li")
      .css("animation-play-state", "paused")
      .css("opacity", ".1");

    $("audio").each(function (e) {
      if (e !== current.currentTarget) {
        $(this)[0].pause();
      }
    });

    $(this).parent().parent().find(".track audio")[0].play();
  });

  $(".list_block .play_btn .pause_icon").on("click", function () {
    $(this).parent().find(".pause_icon").css("display", "none");
    $(this).parent().find(".play_icon").css("display", "inline-block");

    $(this)
      .parent()
      .parent()
      .find(".beat_animation li")
      .css("animation-play-state", "paused")
      .css("opacity", "1");

    $(this).parent().parent().find(".track audio")[0].pause();
  });

  $(".autoplay_btn input")
    .on("change", function () {
      if ($(this).is(":checked")) {
        $("audio").on("ended", function () {
          $(this).parent().parent().next().find("audio")[0].play();

          $(".list_block").removeClass("isPlaying");
          $(this).parent().parent().next().addClass("isPlaying");
          $(this)
            .parent()
            .parent()
            .next()
            .find(".beat_animation li")
            .css("animation-play-state", "running")
            .css("opacity", "1");

          $(this)
            .parent()
            .parent()
            .next()
            .find(".play_icon")
            .css("display", "none");
          $(this)
            .parent()
            .parent()
            .next()
            .find(".pause_icon")
            .css("display", "inline-block");
        });
      } else {
        $("audio").on("ended", function () {
          $(".beat_animation li")
            .css("animation-play-state", "paused")
            .css("opacity", ".1");
          $(".pause_icon").css("display", "none");
          $(".play_icon").css("display", "inline-block");
        });
      }
    })
    .change();
// }
