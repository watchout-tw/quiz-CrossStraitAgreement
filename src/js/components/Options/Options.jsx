/** @jsx React.DOM */

var React = require('react/addons');

require('./Options.css');

var Options = React.createClass({
  
  render () {
  	
   
    // <div className="Option-sets">
    //           <div className="Option-item" ng-click="choose('Q1','A')"
    //                ng-className="{'is-choosed':isUsersChoice('Q1','A')}">A. 一國兩區：台灣地區與大陸地區
    //           </div>
    //ng-click="choose('Q1','A')"

    var {classSet} = React.addons;
    var optionItems = this.props.data.map((item,i)=>{
        
        var { index,
              content,
              version} = item;

        var classes = classSet({
            "Options-item": true,
            "is-choosed": this.props.userVote === index
        });
        
        var boundClick = this.props.onAnswerHandler.bind(null, {
            id: this.props.id, // QuestionID
            index: item.index,  // Option Index
            versions: item.versions
        });

        return (
            <div className={classes}
                 key={i}
                 onClick={boundClick}>{index}. {content}</div>  
        )
    });

    return (
      <div className="Options">
          {optionItems}
      </div>
      
    );
  }
});

module.exports = Options;


