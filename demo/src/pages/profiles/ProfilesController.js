import { useState } from 'react';
import { fromJS, Map } from 'immutable';
import { data } from './profiles-seed';

export const emptyProfile = Map({ id: 'new', name: '', email: '', description: ''});

export default function ProfilesController() {
  let [profiles, setProfiles] = useState(fromJS(data));

  const getProfileById = id => profiles.find(m => m.get("id") === id);
  const saveProfile = (profile, form) => profile === emptyProfile ? createProfile(form) : updateProfile(profile, form);

  return {
    profiles,
    getProfileById,
    saveProfile
  };

  function createProfile(form) {
    const lastOne = profiles.last();
    const lastId = lastOne ? lastOne.get("id") : 0;
    const id = lastId + 1;
    const newProfile = Map({ ...form, id });
    setProfiles(profiles.push(newProfile));
    return newProfile;
  }

  function updateProfile(profile, form) {
    const id = profile.get("id");
    const index = profiles.findIndex(p => p.get("id") === id);
    const currentProfile = profiles.get(index);
    const newProfile = currentProfile.merge(form);
    setProfiles(profiles.set(index, newProfile));
    return newProfile;
  }
}
