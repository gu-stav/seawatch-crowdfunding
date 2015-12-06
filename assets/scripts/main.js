var BETTERPLACE_API = 'https://api.betterplace.org/de/api_v4/projects/36808.json';

aja()
  .url(BETTERPLACE_API)
  .on('success', function(data){
    var progress = data.progress_percentage;
    var progressbar = document.querySelectorAll('.progressbar__progress');

    progressbar[0].innerHTML = progress + '% fianziert';
    progressbar[0].style.width = progress + '%';
  })
  .go();
