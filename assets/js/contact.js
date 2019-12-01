function setCookie(name, value, days) {
  var expires = "";
  if(days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while(c.charAt(0) == ' ') c = c.substring(1, c.length);
    if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}
/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document)
  .ready(function () {

    var urlParams = new URLSearchParams(location.search);
    if(urlParams.has('ref')) {
      setCookie('ref', urlParams.get('ref'), 30);
    }


    $("#submit_btn")
      .click(function () {
        //get input field values
        var user_name = $('input[name=name]')
          .val();
        var user_email = $('input[name=email]')
          .val();
        var user_message = $('textarea[name=message]')
          .val();
        var choice = $('input[name=choice]')
          .val();
        var ref = getCookie('ref');
        if(ref) {
          choice = choice + " : ref-cookie = " + ref;
        }

        var proceed = true;
        if(user_name == "") {
          $('input[name=name]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_email == "") {
          $('input[name=email]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_message == "") {
          $('textarea[name=message]')
            .css('border-color', '#e41919');
          //    proceed = false;
        }
        //everything looks good! proceed...
        if(proceed) {
          //data to be sent to server
          post_data = {
            'name': user_name,
            'email': user_email,
            'message': user_message,
            'choice': choice
          };
          var url = 'https://script.google.com/macros/s/AKfycbxk_Np2R_F1LlinTA33bAQPyg5XZn-rrs4M5xWC3lGRvts2kSX_/exec';
          var jqxhr = $.post(url, post_data, function (post_data) {
              setTimeout(function () {
                window.location.replace('thank-you.html');
              }, 500);
            })
            .fail(function (data) {
              setTimeout(function () {
                window.location.replace('error.html');
              }, 500);
            });
        }
        return false;
      });



      $("#submit_btn2")
      .click(function () {
        //get input field values
        var user_name = $('input[name=name2]')
          .val();
        var user_email = $('input[name=email2]')
          .val();
        var user_message = $('textarea[name=message2]')
          .val();
        var choice = $('input[name=choice2]')
          .val();
        var ref = getCookie('ref');
        if(ref) {
          choice = choice + " : ref-cookie = " + ref;
        }

        var proceed = true;
        if(user_name == "") {
          $('input[name=name2]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_email == "") {
          $('input[name=email2]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_message == "") {
          $('textarea[name=message2]')
            .css('border-color', '#e41919');
          //    proceed = false;
        }
        //everything looks good! proceed...
        if(proceed) {
          //data to be sent to server
          post_data = {
            'name': user_name,
            'email': user_email,
            'message': user_message,
            'choice': choice
          };
          var url = 'https://script.google.com/macros/s/AKfycbxk_Np2R_F1LlinTA33bAQPyg5XZn-rrs4M5xWC3lGRvts2kSX_/exec';
          var jqxhr = $.post(url, post_data, function (post_data) {
              setTimeout(function () {
                window.location.replace('thank-you.html');
              }, 500);
            })
            .fail(function (data) {
              setTimeout(function () {
                window.location.replace('error.html');
              }, 500);
            });
        }
        return false;
      });


      $("#submit_btn3")
      .click(function () {
        //get input field values
        var user_name = $('input[name=name3]')
          .val();
        var user_email = $('input[name=email3]')
          .val();
        var user_message = $('textarea[name=message3]')
          .val();
        var choice = $('input[name=choice3]')
          .val();
        var ref = getCookie('ref');
        if(ref) {
          choice = choice + " : ref-cookie = " + ref;
        }

        var proceed = true;
        if(user_name == "") {
          $('input[name=name3]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_email == "") {
          $('input[name=email3]')
            .css('border-color', '#e41919');
          proceed = false;
        }
        if(user_message == "") {
          $('textarea[name=message3]')
            .css('border-color', '#e41919');
          //    proceed = false;
        }
        //everything looks good! proceed...
        if(proceed) {
          //data to be sent to server
          post_data = {
            'name': user_name,
            'email': user_email,
            'message': user_message,
            'choice': choice
          };
          var url = 'https://script.google.com/macros/s/AKfycbxk_Np2R_F1LlinTA33bAQPyg5XZn-rrs4M5xWC3lGRvts2kSX_/exec';
          var jqxhr = $.post(url, post_data, function (post_data) {
              setTimeout(function () {
                window.location.replace('thank-you.html');
              }, 500);
            })
            .fail(function (data) {
              setTimeout(function () {
                window.location.replace('error.html');
              }, 500);
            });
        }
        return false;
      });

  });
