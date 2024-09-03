import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../services/api";
import EditProfileCard from "../components/Feature/EditProfileCard";

function EditProfile() {
  return (
    <>
      <EditProfileCard />
    </>
  );
}

export default EditProfile;
