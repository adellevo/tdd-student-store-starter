import React from 'react';
import image from './codepath.svg';
import './About.css';

export default function About() {
  return (
    <div className="about">
      <h3>About</h3>
      <div className="content">
        <p>
          The codepath student store offers great products at great prices from
          a great team and for a great cause. We've searched far and wide for
          items that perk the interests of even the most eccentric students and
          decided to offer them all here in one place. All proceeds go towards
          bringing high quality CS education to college students around the
          country.
        </p>

        <img src={image} />
      </div>
    </div>
  );
}
