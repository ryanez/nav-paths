import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Paths } from 'navigate';
import ProfilesList from './ProfilesList';
import ProfileContent from './ProfileContent';
import { ProfilesControllerContext } from './ProfilesControllerContext';
import ProfileController from './ProfilesController';
import Welcome from './Welcome';

export default function Inbox(props) {
  const controller = ProfileController();

  return (
    <ProfilesControllerContext.Provider value={controller}>
    <div className="row mt-5">
      <div className="col-lg-3">
        <h1>
          Profiles
          <span className="h5 ml-1">(<Link to={Paths.ProfileNew}>Add New</Link>)</span>
        </h1>
        <ProfilesList />
      </div>
      <div className="col-lg-9">
        <Route path={Paths.ProfileDetails} component={ProfileContent} />
        <Route path={Paths.Profiles} exact component={Welcome} />
      </div>
    </div>
    </ProfilesControllerContext.Provider>
  )
}