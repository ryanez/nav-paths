import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import navigate from 'navigate';
import { ProfilesControllerContext } from './ProfilesControllerContext';

export default function ProfilesList() {
  const controller = useContext(ProfilesControllerContext);
  return (
    <div className="list-group">
      { controller.profiles.map(ProfileItem) }
    </div>
  );
}

function ProfileItem(profile) {
  const profileId = profile.get("id");
  const url = navigate.to.ProfileDetails({ profileId }, false);

  return (
    <NavLink key={profileId} className="list-group-item" to={url}>{ profile.get("name") }</NavLink>
  )
}