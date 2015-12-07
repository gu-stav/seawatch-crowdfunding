(function(window, document) {
  const BETTERPLACE_API = 'https://api.betterplace.org/de/api_v4/projects/36808.json';

  var toggleDonateForms = function() {
    /* Spendenbank Toggle */
    var trigger = document.querySelectorAll('.spendenbank__toggle')[0];

    trigger.addEventListener('click', function(e) {
        e.preventDefault();

        var target = document.querySelectorAll('.spendenbank')[0];
        var bankTarget = document.querySelectorAll('.bankaccount')[0];

        trigger.classList.add('hidden');
        target.classList.add('spendenbank--is-visible');
        bankTarget.classList.add('bankaccount--is-visible');
    });
  };

  var fillProgressbar = function() {
    aja()
      .url(BETTERPLACE_API)
      .on('success', function(data){
        var progress = data.progress_percentage;
        var progressbar = document.querySelectorAll('.progressbar__progress');

        progressbar[0].innerHTML = progress + '% fianziert';
        progressbar[0].style.width = progress + '%';
      })
      .go();
  };

  document.addEventListener('DOMContentLoaded', function() {
    toggleDonateForms();
    fillProgressbar();
  });

}(window, document));
