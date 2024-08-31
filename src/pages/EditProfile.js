import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../services/api";
import EditProfileCard from "../components/Feature/EditProfileCard";

function EditProfile() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((postItems) => {
        console.log("Fetched Post Items:", postItems[0]);
        setPostItems(postItems);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <EditProfileCard name={postItems[0]?.name} job={postItems[0]?.job} />
    </>
  );
}

export default EditProfile;
