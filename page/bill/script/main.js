// 6 7 10 11 15

var app = new Vue({
  el: document.getElementById('app'),
  data: {
    year: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018_6'],
    data: []
  },
  methods: {
    loadBill(year) {
      if(!this._d) this._d = {};
      $.getJSON(`/data/alipay_record_${year}.json`, data => {
        data.shift();
        data.forEach(i => {
          if(!this._d[i[0]]) {
            this._d[i[0]] = true;
            this.data.push(i);
          }
        });
      });
    },
    getIndexCount(data, index) {
      var tem = {};
      data.forEach(i => {
        if(tem[i[index]]) {
          tem[i[index]].count++;
          tem[i[index]].value += parseFloat(i[9]) + parseFloat(i[12]) - parseFloat(i[13]);
          tem[i[index]].value = Math.round(tem[i[index]].value * 100) / 100;
        }else {
          tem[i[index]] = {
            count: 1,
            name: i[index],
            value: parseFloat(i[9]) + parseFloat(i[12]) - parseFloat(i[13])
          };
        }
      });
      return tem;
    }
  },
  computed: {
    index6() {
      return this.getIndexCount(this.data, 6);
    },
    index7() {
      var tem = this.getIndexCount(this.data, 7);
      var arr = [];
      for(var i in tem) {
        arr.push(tem[i]);
      }
      arr.sort((b, a) => a.value - b.value);
      return arr;
    },
    index10() {
      return this.getIndexCount(this.data, 10);
    },
    index11() {
      return this.getIndexCount(this.data, 11);
    },
    index15() {
      return this.getIndexCount(this.data, 15);
    },
    out() {
      var sum = 0;
      this.data.forEach(i => {
        if(i[10] == '支出') {
          sum += parseFloat(i[9]) + parseFloat(i[12]) - parseFloat(i[13]);
        }
      });
      sum = Math.round(sum * 100) / 100;
      return sum;
    },
    yeb() {
      var sum = 0;
      this.data.forEach(i => {
        if(i[8].indexOf('收益发放') != -1 && i[8].indexOf('余额宝') !== -1) {
          sum += parseFloat(i[9]);
        }
      });
      sum = Math.round(sum * 100) / 100;
      return sum;
    }
  }
});

function analysis() {
  var file = document.getElementById('file').files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(f) {
    var data = [];
    var rsArr = this.result.split("\r\n");
    for(var i = 4, l = rsArr.length; i < l; i++) {
      data.push(rsArr[i].split(','));
    }
    funDownload(stringify(data), file.name.split('.')[0] + '.json');
  };
}
function stringify(data) {
  var s = '[';
  for(var poi = 0, l = data.length; poi < l; poi++) {
    if(data[poi][0].indexOf('----------') != -1) break;
    if(poi) {
      s += ',\r\n  [';
    }else {
      s += '\r\n  [';
    }
    s += data[poi].map(t => ('"' + t.trim() + '"')).join(', ');
    s += ']';
  }
  s += '\r\n]';
  return s;
}
function funDownload(content, filename) {
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}