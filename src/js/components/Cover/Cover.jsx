/** @jsx React.DOM */

var React = require('react/addons');
var Version = require('../Version/Version.jsx');

require('./Cover.css');

var versions = ["鄭麗君", "姚文智", "DPP", "尤美女", "EY", "李應元", "TSU", "江啟臣"];

var Cover = React.createClass({

  
  _onStartTest() {

    // Scroll to fisrt question
    var target = $("#Question1");
    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);
  },
  _onGoToIntro(){
    // Scroll to intro
    var target = $(".Cover-intro");
    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);

  },
  render () {
  	var EDUimgURL = require("./images/EDU.jpg");
    var watchoutURL = require("./images/watchout.png");
    var heroImg = ($(window).width() > 400) ? require("./images/Cover-large.png"):require("./images/Cover-small.png");

    var versionItem = versions.map((item, i)=>{
        return (
            <Version name={item}
                     key={i}
                     type={"cover"} />
        );
    });

    var totalCountIndex = (this.props.totalCount) ? <div className="Cover-arrowBox"
                          onClick={this._onGoToIntro}>開啟副本 No.{this.props.totalCount+1}</div> : "";

    return (
      <div>
          <div className="Cover-hero">
              <div className="Cover-logoSets">
                  <img className="Cover-logo" src={EDUimgURL} />
                  <img className="Cover-logo" src={watchoutURL} />
              </div>

              <div className="Cover-heroContent">
                  <div className="Cover-heroText">
                      <div className="Cover-heroSub">兩岸監督條例，人民來立法</div>
                      <div className="Cover-heroTitle">民意大搜查<br/>千人揪副本</div>
                  </div>
                  <img className="Cover-heroImage"
                       src={heroImg} />

                  <div className="Cover-activateButton">
                      {totalCountIndex}
                  </div>
                  <div className="Cover-activateDate">副本開啟時間：2015/03/18 -</div>
              </div>
          </div>
          <div className="Cover-about">本問卷內容及版本對照由經濟民主連合提供，網頁由沃草製作</div>
          <div className="Cover-intro">
              <div className="Cover-content">
                  <div className="Cover-title">
                        <div className="Cover-titleMain">副本說明</div>
                  </div>
                  <div className="Cover-description">
                      <p>2014年，由立委張慶忠「30秒審查服貿」的爭議，引發學生及公民團體的「318佔領立法院」行動中，提出「先立法，再審查」及「制定兩岸協議監督條例」的訴求。兩岸協議監督條例，目的是為了制訂關於以後兩岸之間簽協議的遊戲規則。</p>
                      <p>目前立法院中陸續提出八個版本的草案：</p>
                      {versionItem}

                      <p>而目前這些版本的草案，雖已通過一讀程序，但仍未付委（交付內政委員會審查）。</p>
                      <p>而這個會期，國、民兩黨都將兩岸監督條例列為優先法案，也就是近三個月內非常有可能進入實質審查，全民注意唷！但面對各版本間的爭議，立委們要如何解決呢？各位公民心中最理想的兩岸協議監督條例，又應該有哪些規定呢？</p>
                      <p>監督條例要確實，人民來立法。花『三分鐘』，阻止再一次的『三十秒』，請投票支持你心中最好的制度。</p>
                  </div>
                  <div className="Cover-button"
                       onClick={this._onStartTest}>GO!</div>
              </div>
          </div>
      </div>
    );
  }
});

module.exports = Cover;


