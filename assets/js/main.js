// 記事の目次づくりと、表を横スクロールできるようにする処理
(function () {
  var prose = document.querySelector('.post .prose');
  var toc = document.querySelector('.toc');
  if (prose && toc) {
    var heads = prose.querySelectorAll('h2');
    if (heads.length >= 3) {
      var list = toc.querySelector('ol');
      heads.forEach(function (h, i) {
        if (!h.id) h.id = 'section-' + (i + 1);
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
      toc.hidden = false;
    }
  }
  document.querySelectorAll('.prose table').forEach(function (t) {
    if (t.parentElement.classList.contains('table-scroll')) return;
    var w = document.createElement('div');
    w.className = 'table-scroll';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
})();
