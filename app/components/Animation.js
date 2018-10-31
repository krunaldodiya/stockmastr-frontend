import React from 'react';

import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

const like = require('../../assets/js/like.json');

class Animation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: null,
    };
  }

  async componentWillMount() {
    this.playAnimation();
  }

  playAnimation = async () => {
    const { animation } = this.state;

    if (!animation) {
      this.setState({ animation: like }, this.playAnimation);
    }

    if (animation) {
      this.animation.reset();
      this.animation.play();
    }
  };

  render() {
    return (
      <Lottie
        style={{
          position: 'absolute',
          top: 112,
          left: 125,
          width: 90,
          height: 90,
        }}
        ref={animation => (this.animation = animation)}
        source={this.state.animation}
        autoPlay
      />
    );
  }
}

export default Animation;
