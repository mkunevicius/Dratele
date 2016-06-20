var React = require('react');

var Video = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <video id="video" autoplay muted loop>
          <source src="bub.mp4" type="video/mp4">
        </video>
      </div>
    )
  }
});

module.exports = Video;
