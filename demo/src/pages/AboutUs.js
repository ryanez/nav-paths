import React from 'react';

export default function AboutUs() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="pt-5">About Me</h1>
        <p>
          <a href="http://theawkwardyeti.com/comic/heart-caught-act/">
            <img 
              className="img-fluid"
              alt="Heart Gets Caught in the Act"
              title="Heart Gets Caught in the Act"
              src="http://theawkwardyeti.com/wp-content/uploads/2016/10/100516_HeartGetsCaughtintheAct.png" />
          </a>
        </p>
        <h5 className="mb-5">I love this comic, you should <a href="https://theawkwardstore.com/">go and buy</a> some cool stuff!</h5>
      </div>
      <div className="col-12 mb-5">
        <div className="my-5"></div>
      </div>
    </div>
  );
}