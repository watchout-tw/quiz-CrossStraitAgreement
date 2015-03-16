/** @jsx React.DOM */

var React = require('react/addons');

require('./CompleteMessage.css');

var CompleteMessage = React.createClass({
  //width=”760″ height=”500″ frameborder=”0″ marginheight=”0″ marginwidth=”0″

  render () {
    return (
        <div className="CompleteMessage">
          <div className="CompleteMessage-title">MISSION COMPLETED!</div>
          <div className="CompleteMessage-title">你已完成第 {this.props.copyIndex} 份副本任務</div>

          <div className="CompleteMessage-share">協助解除更多副本</div>

          <div className="CompleteMessage-item">了解更多關於兩岸監督條例的相關訊息，請持續關注
              <a className="CompleteMessage-link" href="http://goo.gl/2lJoEg" target="_blank">經濟民主連合</a>＆
              <a className="CompleteMessage-link" href="http://goo.gl/QknVVR" target="_blank">沃草</a>
              粉絲頁。</div>
        </div>
    );
  }
});

module.exports = CompleteMessage;


