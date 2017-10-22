function initializeScripts(){
  $(".button-collapse").sideNav({
    menuWidth: 200,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });

  $('.my-borders').css({
    height: '0px',
    width: '0px'
  })

  var colors = {
        'about': 'rgb(142,85,114)',
        'projects': '#F46036',
        'algorithms': '#2E294E'
      },
      urlString = window.location.href,
      scrollHeight = $(document).scrollTop();

  var pagename = ''
  $.each(colors, function(key,val){
    if(urlString.indexOf(key) > -1){
      color = val;
      pagename = key;
    }
  });
  // debugger
  if(urlString === 'http://localhost:4000/'){
    Barba.Pjax.getTransition = function() {
      return HideShowTransition;
    };
  } else {
    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };
  }

  if(pagename){
    assignColors(pagename, color);
    $('nav a[href="/' + pagename + '"]').parent().find('div').addClass('nav-underlined');
  }

  $('.tag').click(function(event){
    event.preventDefault();

    hideCloseIcons($(this));

    var button = $(this),
        tag = $(this).attr('val'),
        projects = $('.card'),
        buttons = $('.btn'),
        active_tags = [],
        needToClearFilters = tag === "clear-filters";

    if(needToClearFilters){
      clearFilters();
    } else{
      toggleTags(button, tag);
      active_tags = addActiveTags(buttons);
      showProjects(projects, active_tags);
    }
  })

  $("nav ul li a").hover(function(e){
    $(e.target).parent().find('div').addClass('nav-hover-underlined');
  }, function(e){
    $(e.target).parent().find('div').removeClass('nav-hover-underlined');
  });

  $("#filter").click(function(event){
    event.preventDefault();
    var text = $('#filter').text(),
        options = {
          "filter": "hide filters",
          "hide filters": "filter"
        };

    $("#filter").text(options[text]);
    $("#tags").toggle(400);
  })

  $(window).scroll(() => {
    var scrollPos = $(document).scrollTop();
        documentHeight = $(document).height();
    if(scrollPos/documentHeight > 0.1){
      $('#scroll-top').css('display', 'block');
    }else {
      $('#scroll-top').css('display', 'none');
    }
  })

  $('#scroll-top').click((e)=>{
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 250);
    return false;
  })
}
