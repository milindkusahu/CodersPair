import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const styles = {
  label: "block text-sm/6 font-medium mt-2",
  input: "input w-full max-w-xs",
  inputfull: "input w-full",
  select: "select w-full",
  button:
    "btn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-gray-200 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer",
  textarea: "textarea w-full",
};

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills,
      });

      setSuccess(res.data.message);
      dispatch(addUser(res.data.data));
    } catch (err) {
      setSuccess("");
      setError(err?.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center my-10">
      {/* Form Section */}
      <div className="mx-4 lg:mx-10">
        <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight">
          Edit Profile
        </h2>

        <div className="mt-10 mx-auto max-w-md lg:max-w-2xl card bg-base-300 shadow-sm p-4 lg:p-6">
          <form className="space-y-6" onSubmit={(e) => saveProfile(e)}>
            {/* First Name and Last Name */}
            <div className="grid sm:grid-cols-2 sm:gap-4 lg:gap-6">
              <div>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div>
                <label htmlFor="age" className={styles.label}>
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className={styles.input}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gender" className={styles.label}>
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={styles.select}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="photoUrl" className={styles.label}>
                  Photo URL
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="photoUrl"
                  name="photoUrl"
                  type="url"
                  className={styles.inputfull}
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                {photoUrl && (
                  <div className="mt-3">
                    <img
                      src={photoUrl}
                      alt="Profile View"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* About */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="about" className={styles.label}>
                  About Me
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className={styles.textarea}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="skills" className={styles.label}>
                  Skills
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className={styles.inputfull}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
            </div>

            {/* Password */}
            {/* <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={styles.inputfull}
                  value=""
                  onChange=""
                />
              </div>
            </div> */}

            {success && (
              <div role="alert" className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex justify-center mx-10">
        <div className="w-full">
          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight">
            Profile Preview
          </h2>

          <div className="mt-10">
            <UserCard
              user={{
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
