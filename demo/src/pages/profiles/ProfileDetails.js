import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import navigate, { Paths } from 'navigate';

export default function ProfileDetails({ profile }) {
  if (!profile) {
    return <Redirect to={Paths.Profiles} />;
  }

  return (
    <div>
      <h3 className="mt-3">Details</h3>
      <div className="form-group">
        <label>Email:</label>
        <p className="shadow p-3 mb-5 bg-white rounded">{profile.get("email")}</p>
      </div>
      <div className="form-group">
        <label>Name:</label>
        <p className="shadow p-3 mb-5 bg-white rounded">{profile.get("name")}</p>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <p className="shadow p-3 mb-5 bg-white rounded">{profile.get("description")}</p>
      </div>
      <div className="clearfix">
        <Link 
          className="btn btn-link float-right"
          to={navigate.from.ProfileDetails.to.ProfileEdit({}, false)}
          >Edit</Link>
      </div>
    </div>
  );
}