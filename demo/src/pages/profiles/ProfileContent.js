import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paths } from 'navigate';
import { emptyProfile } from './ProfilesController';
import { ProfilesControllerContext } from './ProfilesControllerContext';
import ProfileEdit from './ProfileEdit';
import ProfileDetails from './ProfileDetails';

export default function ProfileContent({ match }) {
  const { profileId } = match.params;
  const controller = useContext(ProfilesControllerContext);
  const profile = controller.getProfileById(parseInt(profileId, 10));

  return (
    <Switch>
      <Route path={Paths.ProfileNew} render={props => (<ProfileEdit profile={emptyProfile} />)}/>
      <Route path={Paths.ProfileEdit} render={props => (<ProfileEdit profile={profile} />)} />
      <Route path={Paths.ProfileDetails} render={props => (<ProfileDetails profile={profile} />)} />
    </Switch>
  );
}
