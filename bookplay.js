/* A bookmarklet that finds links to music files on a webpage (mp3,m4a, etc...)
 and builds a little HTML5 player to plays them in order. */

function player() {
  this.show = function() {
    if (document.getElementById('bmplayer') !== null) {
      var pl = document.getElementById('bmplayer');
      return pl.parentElement.removeChild(pl);
    }
    this.p = document.createElement('div');
    this.p.id = "bmplayer";
    this.p.style.cssText = "width: 400px;height: 30px;position: fixed;top: 5px;right: 5px;";
    document.body.appendChild(this.p);
    this.populate();
    this.changeTrack();
  }

  this.populate = function() {
    var pbutton = document.createElement('input'),
        nbutton = document.createElement('input'),
        as = document.getElementsByTagName('a'),
        audio = document.createElement('audio'),
        skipStyle = 'background: rgb(66, 66, 66);border-radius: 7px;color: white;';
    skipStyle += "height: 30px;border: none;outline: none;top: 0px;";
    skipStyle += "vertical-align: top;position: relative;margin-right:3px;";

    pbutton.type = nbutton.type = "button";
    pbutton.value = "<<";
    nbutton.value = ">>";
    pbutton.setAttribute('step',-1);
    nbutton.setAttribute('step',1);
    pbutton.style.cssText = nbutton.style.cssText = skipStyle;
    pbutton.onclick = nbutton.onclick = this.changeTrack;
    this.p.appendChild(pbutton);
    this.p.appendChild(nbutton);
    as = Array.prototype.slice.call(as);
    audio.id = "bmaudio";
    audio.playlist = as.filter(function(e){return e.href.match(/\.(mp3|m4a|ogg|wav)$/i)});
    audio.setAttribute('currenttrack',-1);
    audio.preload = "none";
    audio.autoplay = false;
    audio.controls = "controls";
    audio.onended = this.changeTrack;
    this.p.appendChild(audio);
  }

  this.changeTrack = function() {
    var bmaudio = document.getElementById('bmaudio');
    var curTrack = Math.floor(bmaudio.getAttribute('currenttrack'));
    if (curTrack >= 0) {    
      bmaudio.playlist[curTrack].style.background = "none";
    }
    if (!this.hasOwnProperty('step')) {
      this.step = 1;
    }
    curTrack = curTrack+Math.floor(this.step);
    bmaudio.setAttribute('currenttrack',curTrack);
    bmaudio.playlist[curTrack].style.background = 'rgb(146, 253, 180)';
    bmaudio.src = bmaudio.playlist[curTrack];
    bmaudio.play();
  }
}

p = new player();
p.show();
