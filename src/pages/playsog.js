 const HelpForDev = () => (
    <div>
      var NewComponent = React.createClass({"{"}
      render: function() {"{"}
      return (
      <div>
        function printData(song_list) {"{"}'{"{"}'{"}"}
        $(document).ready(function () {"{"}'{"{"}'{"}"}
        var list = $(".list_artist"); var list_block; for (var key in song_list){" "}
        {"{"}'{"{"}'{"}"}
        list_block = $('
        <div classname="list_block_artist">
          '); list.append(list_block); list_block.append( '
          <span classname="play_btn">
            <img classname="play_icon" src="images/play.svg" />
            <img classname="pause_icon" src="images/pause.svg" />
          </span>
          ' ); list_block.append( '
          <span classname="song_title">
            ' + song_list[key].name + "
            <span>
              " ); list_block.append( '
              <span classname="song_artist">
                ' + song_list[key].artistName + "
                <span>
                  " ); list_block.append( '
                  <span classname="song_genre">
                    ' + song_list[key].genre + "
                    <span>
                      " ); list_block.append( '
                      <span classname="song_duration">
                        ' + song_list[key].duration + "
                        <span>
                          " ); list_block.append( '
                          <span classname="beat_animation">
                            <ul>
                              <li />
                              <li />
                              <li />
                              <li />
                              <li />
                            </ul>
                            <span>
                              ' ); list_block.append( '
                              <span classname="track">
                                <audio id="audio" controls>
                                  <source
                                    src="http://localhost:4000/songs/name/?name=' +
        song_list[key].music +
        ' "
                                    type="audio/mp3"
                                  />
                                </audio>
                                <span>
                                  ' ); list_block.append( '
                                  <span classname="download_btn">
                                    <a
                                      target="_blank"
                                      href="' +
        '"
                                    >
                                      <img src="images/download.svg" />
                                    </a>
                                    <span>
                                      ' );
                                      {"{"}'{"}"}'{"}"}
                                      // play functionally $(".list_block_artist
                                      .play_btn .play_icon").on("click", function
                                      (current) {"{"}'{"{"}'{"}"}
                                      $(this).parent().find(".play_icon").css("display",
                                      "none");
                                      $(this).parent().find(".pause_icon").css("display",
                                      "inline-block"); $(".play_icon") .not(this)
                                      .parent() .find(".pause_icon")
                                      .css("display", "none"); $(".play_icon")
                                      .not(this) .parent() .find(".play_icon")
                                      .css("display", "inline-block");
                                      $(this).parent().parent().addClass("isPlaying");
                                      $(".play_icon") .not(this) .parent()
                                      .parent() .removeClass("isPlaying"); $(this)
                                      .parent() .parent() .find(".beat_animation
                                      li") .css("animation-play-state", "running")
                                      .css("opacity", "1"); $(".play_icon")
                                      .not(this) .parent() .parent()
                                      .find(".beat_animation li")
                                      .css("animation-play-state", "paused")
                                      .css("opacity", ".1");
                                      $("audio").each(function (e) {"{"}'{"{"}'
                                      {"}"}
                                      if (e !== current.currentTarget) {"{"}'{"{"}
                                      '{"}"}
                                      $(this)[0].pause();
                                      {"{"}'{"}"}'{"}"}
                                      {"{"}'{"}"}'{"}"});
                                      $(this).parent().parent().find(".track
                                      audio")[0].play();
                                      {"{"}'{"}"}'{"}"}); $(".list_block_artist
                                      .play_btn .pause_icon").on("click", function
                                      () {"{"}'{"{"}'{"}"}
                                      $(this).parent().find(".pause_icon").css("display",
                                      "none");
                                      $(this).parent().find(".play_icon").css("display",
                                      "inline-block"); $(this) .parent() .parent()
                                      .find(".beat_animation li")
                                      .css("animation-play-state", "paused")
                                      .css("opacity", "1");
                                      $(this).parent().parent().find(".track
                                      audio")[0].pause();
                                      {"{"}'{"}"}'{"}"}); $(".autoplay_btn input")
                                      .on("change", function () {"{"}'{"{"}'{"}"}
                                      if ($(this).is(":checked")) {"{"}'{"{"}'
                                      {"}"}
                                      $("audio").on("ended", function () {"{"}'
                                      {"{"}'{"}"}
                                      $(this).parent().parent().next().find("audio")[0].play();
                                      $(".list_block_artist").removeClass("isPlaying");
                                      $(this).parent().parent().next().addClass("isPlaying");
                                      $(this) .parent() .parent() .next()
                                      .find(".beat_animation li")
                                      .css("animation-play-state", "running")
                                      .css("opacity", "1"); $(this) .parent()
                                      .parent() .next() .find(".play_icon")
                                      .css("display", "none"); $(this) .parent()
                                      .parent() .next() .find(".pause_icon")
                                      .css("display", "inline-block");
                                      {"{"}'{"}"}'{"}"});
                                      {"{"}'{"}"}'{"}"} else {"{"}'{"{"}'{"}"}
                                      $("audio").on("ended", function () {"{"}'
                                      {"{"}'{"}"}
                                      $(".beat_animation li")
                                      .css("animation-play-state", "paused")
                                      .css("opacity", ".1");
                                      $(".pause_icon").css("display", "none");
                                      $(".play_icon").css("display",
                                      "inline-block");
                                      {"{"}'{"}"}'{"}"});
                                      {"{"}'{"}"}'{"}"}
                                      {"{"}'{"}"}'{"}"}) .change();
                                      {"{"}'{"}"}'{"}"});
                                      {"{"}'{"}"}'{"}"}
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </div>
        );
        {"}"}
        {"}"});
      </div>
    </div>
  )

  export default HelpForDev;
  