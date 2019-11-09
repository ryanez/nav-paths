import React from 'react';

const Badge = ({ alt, badgeUrl }) => (
  <a className="mr-1" href={badgeUrl}><img src={badgeUrl} alt={alt}/></a>
);

export default function Home() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="pt-5">Demo</h1>
        <p>
          <Badge alt="NPM Version" badgeUrl="https://badgen.net/npm/v/nav-paths"/>
          <Badge alt="License" badgeUrl="https://badgen.net/npm/license/nav-paths"/>
          <Badge alt="Build status" badgeUrl="https://badgen.net/travis/ryanez/nav-paths"/>
          <Badge alt="Coverage Status" badgeUrl="https://coveralls.io/repos/github/ryanez/nav-paths/badge.svg?branch=master"/>
        </p>
        <p>
          This demo was created in the first instance to show how to use the <a href="https://github.com/ryanez/nav-paths">nav-paths</a> framework.
          Then it scalated a little bit by the addtion of some frameworks and the use of React's new feature <strong>Hooks</strong>.
        </p>
        <h2 className="pb-3">Frameworks</h2>
        <h4>React Router</h4>
        <p><a href="https://www.npmjs.com/package/react-router">React Router</a> framework and <a href="https://www.npmjs.com/package/react">React</a> are the strong dependencies for <span>nav-paths</span> to work.</p>
        <h4>Immutable</h4>
        <p><a href="https://www.npmjs.com/package/immutable">Immutable</a> is a framework used to make it simple to maintain the state of the app.</p>
        <h4>React Hook Form</h4>
        <p><a href="https://www.npmjs.com/package/react-hook-form">React Hook Form</a> is the framework used for form validation and data collection.</p>
        <h4>ClassNames</h4>
        <p><a href="https://www.npmjs.com/package/classnames">ClassNames</a> is a framework used to for conditionally joining classNames together.</p>
        <h4>Bootstrap</h4>
        <p>You think this demo is ugly? well, it was worst, <a href="https://www.npmjs.com/package/bootstrap">Bootstrap</a> is a simple framework for easy build layouts and in addtion we borrowed styles and markup from <a href="https://github.com/BlackrockDigital/startbootstrap-shop-homepage">Start Bootstrap Shop Home Page</a> template</p>
      </div>
    </div>
  );
}
