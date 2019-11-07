import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useForm from 'react-hook-form'
import classNames from 'classnames';
import navigate, { Paths } from 'navigate';
import { emptyProfile } from './ProfilesController';
import { ProfilesControllerContext } from './ProfilesControllerContext';


export default function ProfileEdit({ profile }) {
  const defaultValues = {
    email: profile.get("email"),
    name: profile.get("name"),
    description: profile.get("description")
  };
  const { register, handleSubmit, errors, reset } = useForm({ defaultValues });
  const controller = useContext(ProfilesControllerContext);
  const isNew = profile === emptyProfile;
  const cancelUrl = isNew
  ? navigate.from.ProfileNew.to.Profiles({}, false)
  : navigate.from.ProfileEdit.to.ProfileDetails({}, false);
  const onSubmit = form => {
    const newProfile = controller.saveProfile(profile, form);
    const profileId = newProfile.get("id");
    navigate.to.ProfileDetails({ profileId });
  }

  useEffect(() => reset({
    email: profile.get("email"),
    name: profile.get("name"),
    description: profile.get("description")
  }), [profile, reset]);
  
  if (!profile) {
    return <Redirect to={Paths.Profiles} />;
  }  

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mt-3">{isNew ? 'New' : 'Edit'}</h3>
        <div className="form-group">
          <label htmlFor="from">Email:</label>
          <input 
            className={classNames("form-control", { "is-invalid": errors.email })}
            name="email" 
            ref={register({ required: true })} />
          {errors.email && <div className="invalid-feedback">Email field is required</div>}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input 
            className={classNames("form-control", { "is-invalid": errors.name })}
            name="name" 
            ref={register({ required: true })} />
          {errors.name && <div className="invalid-feedback">Name is required</div>}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            className="form-control" 
            rows={5} 
            name="description" 
            ref={register} />
        </div>
        <div className="clearfix">
          <Link className="btn btn-link float-right" to={cancelUrl}>Cancel</Link>
          <button className="btn btn-primary float-right" type="submit">Save</button>
        </div>
      </form>
  );  
}