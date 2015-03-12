/** @jsx React.DOM */

var React = require('react/addons');

require('./Cover.css');

var Cover = React.createClass({
  
  _onStartTest() {

    // Scroll to fisrt question
    var target = $("#Question1");
    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);
  },
  render () {
  	var EDUimgURL = require("./images/EDU.jpg");
    var watchoutURL = require("./images/watchout.png");
    return (
      <div>
          <div className="Cover-Hero">
              <div className="Cover-LogoSets">
                  <img className="Cover-Logo" src={EDUimgURL} />
                  <img className="Cover-Logo" src={watchoutURL} />
              </div>

              <div className="Cover-content">
                  <div className="Cover-heroImage">主視覺</div>
              </div>
          </div>
          <div className="Cover-Intro">
              <div className="Cover-content">
                  <div className="Cover-title">
                        <div className="Cover-titleMain">副本說明</div>
                        <div className="Cover-titleSub">民意大搜查・千人揪副本</div>
                  </div>
                  <div className="Cover-description">
                      <p>2014年，由立委張慶忠「30秒審查服貿」的爭議，引發學生及公民團體的「318佔領立法院」行動中，提出「先立法，再審查」及「制定兩岸協議監督條例」的訴求。兩岸協議監督條例，目的是為了制訂關於以後兩岸之間簽協議的遊戲規則。</p>
                      <p>目前立法院中陸續提出八個版本的草案：尤美女版(即民間團體版)、行政院版、民進黨團版、台聯黨團版、鄭麗君版、姚文智版、李應元版、江啟臣版。而目前這些版本的草案，雖已通過一讀程序，但仍未付委(交付內政委員會審查)。</p>
                      <p>而這個會期，國、民兩黨都將兩岸監督條例列為優先法案，但面對各版本間的爭議，立委們要如何解決呢？各位公民心中最理想的兩岸協議監督條例，又應該有哪些規定呢？邀請各位公民，一起來立法！只要三分鐘，投票支持你心中最好的制度！</p>
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


