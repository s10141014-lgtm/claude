// 積立シミュレーター（毎月積み立て・月複利で計算）
(function () {
  var form = document.getElementById('sim-form');
  if (!form) return;
  var yen = new Intl.NumberFormat('ja-JP');

  function fmt(v) {
    if (v >= 1e8) return (v / 1e8).toFixed(2).replace(/\.?0+$/, '') + '億円';
    return yen.format(Math.round(v / 1e4)) + '万円';
  }
  function num(id, min, max) {
    var v = parseFloat(document.getElementById(id).value);
    if (isNaN(v)) v = min;
    return Math.min(Math.max(v, min), max);
  }

  function calc() {
    var monthly = num('sim-monthly', 0, 1000) * 1e4;
    var rate = num('sim-rate', 0, 15) / 100;
    var years = Math.round(num('sim-years', 1, 50));
    var initial = num('sim-initial', 0, 100000) * 1e4;
    var r = Math.pow(1 + rate, 1 / 12) - 1;

    var value = initial, principal = initial, rows = [];
    for (var m = 1; m <= years * 12; m++) {
      value = value * (1 + r) + monthly;
      principal += monthly;
      if (m % 12 === 0) rows.push({ y: m / 12, p: principal, v: value });
    }
    var gain = value - principal;

    document.getElementById('res-total').textContent = fmt(value);
    document.getElementById('res-principal').textContent = fmt(principal);
    document.getElementById('res-gain').textContent = fmt(gain);
    var pct = value > 0 ? (principal / value) * 100 : 100;
    document.getElementById('bar-principal').style.width = pct + '%';
    document.getElementById('bar-gain').style.width = (100 - pct) + '%';

    var tbody = document.getElementById('sim-rows');
    tbody.innerHTML = '';
    var step = years > 20 ? 5 : years > 10 ? 2 : 1;
    rows.forEach(function (row) {
      if (row.y % step !== 0 && row.y !== years) return;
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + row.y + '年後</td><td>' + fmt(row.p) + '</td><td>' + fmt(row.v - row.p) + '</td><td><strong>' + fmt(row.v) + '</strong></td>';
      tbody.appendChild(tr);
    });
  }

  form.addEventListener('input', calc);
  form.addEventListener('submit', function (e) { e.preventDefault(); calc(); });
  calc();
})();
