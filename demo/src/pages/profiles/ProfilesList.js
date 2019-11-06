import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
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
  const active = !!navigate.isActive(url);

  return (
    <Link 
      key={profileId} 
      className={classNames("list-group-item", { active })}
      to={url}
      >{ profile.get("name") }</Link>
  )
}