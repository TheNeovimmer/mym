$(function() {

  // ===== NAVBAR TOGGLE =====
  function closeNav() {
    $('.nav-links').removeClass('open');
    $('.menu-toggle').removeClass('open');
    $('body').removeClass('nav-open');
  }

  $('.menu-toggle').on('click', function() {
    $('.nav-links').toggleClass('open');
    $('.menu-toggle').toggleClass('open');
    $('body').toggleClass('nav-open');
  });

  $('.nav-links a').on('click', closeNav);

  $(document).on('click', '.nav-links.open', function(e) {
    if ($(e.target).closest('.nav-links > div').length === 0) {
      closeNav();
    }
  });

  // ===== AUTH TABS =====
  $('.auth-tab').on('click', function() {
    var target = $(this).data('tab');
    $('.auth-tab').removeClass('active');
    $(this).addClass('active');
    $('.auth-form').removeClass('active');
    $('#' + target + 'Form').addClass('active');
  });

  // ===== TOGGLE PASSWORD =====
  $(document).on('click', '.toggle-pw', function() {
    var input = $(this).siblings('input');
    var type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  // ===== PASSWORD STRENGTH =====
  $(document).on('input', '#signupForm input[type="password"]', function() {
    var val = $(this).val();
    var $bars = $('.pw-strength span');
    var strength = 0;
    if (val.length > 0) strength = 1;
    if (val.length >= 6) strength = 2;
    if (val.length >= 10 && /[A-Z]/.test(val) && /[0-9]/.test(val)) strength = 3;
    $bars.each(function(i) {
      $(this).css('background', i < strength ? (strength === 1 ? 'var(--red)' : strength === 2 ? 'var(--orange)' : 'var(--green)') : 'var(--border)');
    });
  });

  // ===== LESSON OPTIONS =====
  $(document).on('click', '.option-btn', function() {
    var $el = $(this);
    var isCorrect = $el.data('correct') === true;
    $('.option-btn').css('pointer-events', 'none');
    $el.addClass(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      $('.lesson-overlay').fadeIn(300);
      showConfetti();
      showToast('Correct! +15 XP', 'success');
    } else {
      $('.option-btn[data-correct="true"]').addClass('correct');
      showToast('Not quite. Keep trying!', 'error');
      var $hearts = $('.lesson-lives i');
      if ($hearts.length) {
        $hearts.last().css({opacity:'0.15',transform:'scale(0.8)'});
        setTimeout(function() { $hearts.last().remove(); }, 300);
      }
      if ($('.lesson-lives i').length === 0) {
        setTimeout(function() {
          showToast('No lives left! Try again.', 'error');
          location.href = 'courses.html';
        }, 1500);
      }
    }
  });

  // ===== FLASHCARD FLIP =====
  $(document).on('click', '.flashcard', function() {
    $(this).toggleClass('flipped');
  });

  // ===== RATE BUTTONS =====
  $(document).on('click', '.rate-btn', function() {
    var rating = $(this).data('rate');
    showToast(rating === 'easy' ? 'Great! Keep it up!' : rating === 'okay' ? 'Keep practicing!' : "You'll get it next time!", 'success');
    var $card = $('.flashcard');
    $card.removeClass('flipped');
    var words = ['Hello', 'Good', 'Peace', 'I Love You', 'Thank You', 'Please', 'Sorry', 'Yes'];
    var idx = Math.floor(Math.random() * words.length);
    setTimeout(function() {
      $card.find('.flashcard-back h2').text(words[idx]);
      $card.find('.flashcard-back .flashcard-sub').text('A common sign');
    }, 200);
  });

  // ===== CHAT SEND =====
  $(document).on('click', '.btn-send', function() {
    var $input = $('.mym-input input');
    var text = $input.val().trim();
    if (!text) return;
    addChatMsg(text, 'user');
    $input.val('');
    setTimeout(function() {
      var reply = getMymReply(text);
      addChatMsg(reply, 'bot');
    }, 1200);
  });

  $(document).on('keypress', '.mym-input input', function(e) {
    if (e.which === 13) $('.btn-send').click();
  });

  function addChatMsg(text, sender) {
    var cls = sender === 'user' ? 'user' : 'bot';
    var bubbleCls = sender === 'user' ? ' user-bubble' : '';
    var html = '<div class="mym-msg ' + cls + '"><div class="msg-bubble' + bubbleCls + '">' + text + '</div></div>';
    $('.mym-messages').append(html);
    $('.mym-messages').scrollTop($('.mym-messages')[0].scrollHeight);
  }

  // ===== QUICK ACTIONS =====
  $(document).on('click', '.quick-action', function() {
    var text = $(this).text();
    $('.mym-input input').val(text).focus();
    $('.btn-send').click();
  });

  function getMymReply(text) {
    var t = text.toLowerCase();
    if (t.includes('hello') || t.includes('hi') || t.includes('hey') || t.includes('greet')) {
      return 'Hello! Ready to practice some signs today? Try signing "hello" — its a wave with your dominant hand!';
    }
    if (t.includes('thank') || t.includes('thanks')) {
      return 'Youre welcome! The sign for "thank you" is bringing your fingers to your chin and moving your hand forward. Try it!';
    }
    if (t.includes('help') || t.includes('stuck') || t.includes('confused')) {
      return 'Im here to help! Which sign would you like to learn? You can say "alphabet", "numbers", "family", "food", or ask about any specific word!';
    }
    if (t.includes('alphabet') || t.includes('abc') || t.includes('letter') || t.includes('spell')) {
      return 'Great choice! The ASL alphabet uses one-handed finger-spelling. Lets start with A (fist), B (open palm with thumb across), and C (curved hand). Which letter interests you?';
    }
    if (t.includes('name')) {
      return 'To sign "name", tap your index and middle fingers together twice on your forehead. Then fingerspell your name! Whats your name?';
    }
    if (t.includes('how are you') || t.includes('how r u')) {
      return 'Im doing great! To sign "How are you?" point your index fingers down, thumbs up, and circle them forward. Try it with me!';
    }
    if (t.includes('sorry')) {
      return 'To sign "sorry" make a fist and rub it in a circle over your chest. Its like your heart is sorry!';
    }
    if (t.includes('please')) {
      return 'To sign "please" place your open hand flat on your chest and move it in a circle. Its a polite gesture!';
    }
    if (t.includes('love') || t.includes('ily')) {
      return 'The ILY (I Love You) sign combines the letters I, L, and Y in ASL thumb+index+pinky out, middle+ring folded. Show it to someone today!';
    }
    if (t.includes('yes') || t.includes('no')) {
      return 'Yes: make a fist and nod it up and down like a head nodding. No: bring your thumb+index+middle together and open like a mouth saying "no".';
    }
    if (t.includes('food') || t.includes('eat') || t.includes('hungry')) {
      return 'To sign "eat" bring all fingertips together to your mouth, like taking a bite. "Hungry" is a C-shape moving down your chest!';
    }
    if (t.includes('progress') || t.includes('streak') || t.includes('xp')) {
      return 'Youre making great progress! Check your Dashboard to see your current streak, XP, and weekly challenge status. Keep it up!';
    }
    if (t.includes('number') || t.includes('count')) {
      return 'Numbers in ASL use one hand. 1-5 use your fingers up, 6-9 use touch gestures, and 10 uses a sideways L-shape that shakes. Want to practice numbers?';
    }
    return "Thats a great question! In ASL, context is important. Try showing me the sign or typing the word you want to learn. I can show you the proper technique!";
  }

  // ===== LIBRARY TABS =====
  $(document).on('click', '.lib-tab', function() {
    $('.lib-tab').removeClass('active');
    $(this).addClass('active');
  });

  // ===== LIBRARY SEARCH =====
  $(document).on('input', '.library-search input', function() {
    var q = $(this).val().toLowerCase();
    $('.sign-card').each(function() {
      $(this).toggle($(this).text().toLowerCase().includes(q));
    });
  });

  // ===== TREE NODE CLICK =====
  $(document).on('click', '.tree-node.active', function() {
    window.location.href = 'lesson.html';
  });

  // ===== CONFETTI =====
  function showConfetti() {
    var colors = ['#1072cf', '#fd6c22', '#58b82c', '#ffb800', '#e84040'];
    var $container = $('<div class="confetti-container"></div>');
    $('body').append($container);
    for (var i = 0; i < 80; i++) {
      var piece = $('<div class="confetti-piece"></div>');
      piece.css({
        left: Math.random() * 100 + '%',
        background: colors[Math.floor(Math.random() * colors.length)],
        width: (Math.random() * 8 + 4) + 'px',
        height: (Math.random() * 8 + 4) + 'px',
        animationDuration: (Math.random() * 2 + 1.5) + 's',
        animationDelay: (Math.random() * 0.8) + 's',
        borderRadius: Math.random() > 0.5 ? '50%' : '2px'
      });
      $container.append(piece);
    }
    setTimeout(function() { $container.remove(); }, 5000);
  }
  window.showConfetti = showConfetti;

  // ===== TOAST =====
  function showToast(msg, type) {
    var $toast = $('.toast');
    if (!$toast.length) {
      $toast = $('<div class="toast"></div>');
      $('body').append($toast);
    }
    $toast.text(msg).attr('class', 'toast ' + type + ' show');
    setTimeout(function() { $toast.removeClass('show'); }, 3500);
  }
  window.showToast = showToast;

  // ===== FAQ ACCORDION =====
  $(document).on('click', '.faq-question', function() {
    $(this).parent('.faq-item').toggleClass('open');
  });

  // ===== LESSON OVERLAY CLOSE =====
  $(document).on('click', '.lesson-overlay', function(e) {
    if ($(e.target).hasClass('lesson-overlay')) {
      $(this).fadeOut(300);
    }
  });

  // ===== BOOKMARK TOGGLE =====
  $(document).on('click', '.bookmark-icon', function(e) {
    e.stopPropagation();
    $(this).toggleClass('fa-regular fa-solid');
    var name = $(this).closest('.sign-card').find('h4').text();
    showToast($(this).hasClass('fa-solid') ? name + ' bookmarked!' : 'Bookmark removed', 'success');
  });

  // ===== SOCIAL AUTH TOAST =====
  $(document).on('click', '.social-btn', function() {
    showToast('Social sign-in coming soon!', 'success');
  });

  // ===== NEWSLETTER =====
  $(document).on('submit', '.newsletter-form', function(e) {
    e.preventDefault();
    var email = $(this).find('input').val();
    if (email) {
      showToast('Subscribed! Welcome to MYM', 'success');
      $(this).find('input').val('');
    }
  });

  // ===== XP ANIMATION =====
  $('.xp-animate').each(function() {
    var target = parseInt($(this).text()) || 0;
    var current = 0;
    var step = Math.ceil(target / 25);
    var $el = $(this);
    var interval = setInterval(function() {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      $el.text(current);
    }, 30);
  });

});
