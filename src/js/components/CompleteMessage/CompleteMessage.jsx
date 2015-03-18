/** @jsx React.DOM */

var React = require('react/addons');

require('./CompleteMessage.css');

var CompleteMessage = React.createClass({
  
  _onShare(){
    //var name = encodeURIComponent("兩岸監督條例，民意大調查");
    //var caption = encodeURIComponent("人民來立法，千人揪副本！還差 xx 人就能進化到Lv. O！");
    
    //var picture = encodeURIComponent("http://soidid.github.io/qaDraft/build/79c377fffe29fb60366e458da5fa89b6.png");
    //window.open("https://www.facebook.com/dialog/feed?app_id=1569112793348264&display=popup&caption=&link=https%3A%2F%2Fquiz.musou.tw%2FCrossStraitAgreement&redirect_uri=https%3A%2F%2Fquiz.musou.tw%2FCrossStraitAgreement&name="+name+"&caption="+caption+"&picture="+picture);
    
    var diff = 0, currentLevel = 1;
    var votes = this.props.copyIndex;
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
    var picture = encodeURIComponent("http://quiz.musou.tw/shares/level"+currentLevel+".jpg");

    var appid = "1569111413348402";
    window.location.href = "https://www.facebook.com/dialog/feed?app_id="+appid+"&display=popup&caption=&link=http%3A%2F%2Fquiz.musou.tw%2FCrossStraitAgreement&redirect_uri=http%3A%2F%2Fquiz.musou.tw%2FCrossStraitAgreement&picture="+picture;
  },

  render () {

    var diff = 0, currentLevel = 1;
    var votes = this.props.copyIndex;
    

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

    var promote = "";

    // console.log(currentLevel);
    // console.log(diff);
    
    //人民來立法，千人揪副本！
    if(currentLevel < 5) {
      promote = "還差 " + parseInt(diff, 10) + " 人就能進化到 Lv. " + (currentLevel + 1) + "！";
    } else {
      promote = "已經成功達到 Lv. 5！";
    }

    var imgURL = require("./images/lv"+currentLevel+".jpg");

   

    return (
        <div className="CompleteMessage">
          <div className="CompleteMessage-title">MISSION COMPLETED!</div>
          <div className="CompleteMessage-title">你已完成第 {votes} 份副本任務</div>

          <div className="CompleteMessage-promote">
              <img className="CompleteMessage-img"
                   src={imgURL} 
                   onClick={this._onShare} />
              <div className="CompleteMessage-diff">{promote}</div>
              
              <div className="CompleteMessage-share"
                   onClick={this._onShare} >分享吧！揪更多公民一起來解副本！</div>
          </div>

          

          <div className="CompleteMessage-about">
              <div className="CompleteMessage-aboutText">了解更多關於兩岸監督條例的相關訊息，請持續關注</div>
              <a className="CompleteMessage-link" href="http://goo.gl/QknVVR" target="_blank">沃草</a>
              <a className="CompleteMessage-link" href="http://goo.gl/2lJoEg" target="_blank">經濟民主連合</a>
          </div>
        </div>
    );
  }
});

module.exports = CompleteMessage;


