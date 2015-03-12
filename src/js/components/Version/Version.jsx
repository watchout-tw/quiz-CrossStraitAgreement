/** @jsx React.DOM */

var React = require('react/addons');

require('./Version.css');

var versionData = {
	"尤美女": { title:"尤美女版", imgFilename:"尤美女"},
    "EY": { title:"行政院版", imgFilename:"EY" },
    "DPP": { title:"民進黨團版", imgFilename:"DPP" },
    "TSU": { title:"台聯黨團版", imgFilename:"TSU" },
    "鄭麗君": { title:"鄭麗君版", imgFilename:"鄭麗君" },
    "姚文智": { title:"姚文智版", imgFilename:"姚文智" },
    "李應元": { title:"李應元版", imgFilename:"李應元" },
    "江啟臣": { title:"江啟臣版", imgFilename:"江啟臣" }
};
var peopleVersion = "尤美女";

var Version = React.createClass({
 

  render () {
  	var name = this.props.name;
    var { title,
          imgFilename } = versionData[name];
   
    var imgUrl = require("./images/"+imgFilename+".png");
    
    

    //////// NEEDS refactor
    var result = "";
    if(this.props.cover){

    	//Larger
    	var textItem = peopleVersion === name ? <div className="version-text">{title}<br/>即民間團體版</div> : 
        <div className="version-text">{title}</div> ;

        result = (
        <div className="Version">
            <img className="Version-img" 
                 src={imgUrl} />
            {textItem}
        </div>

        );

    }else{

    	//Smaller

    	var textItem = (this.props.totalCount > 3) ? <div className="version-text--smallInline">{title}</div> :
    	<div className="version-text--small">{title}</div> ;

    	result = (
        <div className="Version--small">
            <img className="Version-img--small" 
                 src={imgUrl} />
            {textItem}
        </div>

        );
        
    }

    return result;
  }
});

module.exports = Version;

