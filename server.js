var express = require("express");
var fs = require("fs");
var request = require("request");
var app = express();
var PORT = process.env.PORT || 3000;

app.use('/build', express.static("build"));

app.use('/shares', express.static("shares"));

app.get('/', function (req, res) {
  return res.redirect("/CrossStraitAgreement");
});

app.get('/CrossStraitAgreement', function (req, res) {
  var diff = 0, currentLevel = 1;
  var html = fs.readFileSync(__dirname + '/index.html', { encoding:'utf8' });



  return request.get('https://quiz-crossstrait.firebaseio.com/totalVotesCount.json', function(err, response, body){
    var votes = Number(JSON.parse(body).votes);
    if(!req.query.lv) return res.redirect('/CrossStraitAgreement?lv=' + currentLevel + '&votes=' + votes);

    if( 0 <= votes && votes < 299) {
      diff = 300 - votes;
    } else if ( 300 <= votes && votes < 499 ){
      diff = 500 - votes;
      currentLevel = 2;
    } else if ( 500 <= votes && votes < 699 ){
      diff = 700 - votes;
      currentLevel = 3;
    } else if ( 700 <= votes && votes < 887 ){
      diff = 888 - votes;
      currentLevel = 4;
    } else {
      currentLevel = 5;
    }

    if(currentLevel < 5) {
      html = html.replace(/\{\{description\}\}/, "人民來立法，千人揪副本！還差 " + diff + " 人就能進化到Lv. " + (currentLevel + 1) + "！");
    } else {
      html = html.replace(/\{\{description\}\}/, "人民來立法，千人揪副本！已經成功達到Lv. 5！");
    }

    html = html.replace(/\{\{shares\}\}/, "http://quiz-test.musou.tw/shares/level" + currentLevel + ".jpg");

    return res.status(200).send(html);
  });
});

app.listen(PORT, function () {
  console.log("Server Listen on", PORT);
});