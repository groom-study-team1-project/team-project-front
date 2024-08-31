import React from "react";
import { PostProfile } from "../Common/PostCardComponents";

function EditProfileCard({ name, job }) {
  return (
    <>
      <PostProfile name={name} job={job} />
    </>
  );
}

export default EditProfileCard;
