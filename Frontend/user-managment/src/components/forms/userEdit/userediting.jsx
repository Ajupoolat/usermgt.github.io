import React, { useState } from 'react';
import styles from './userEdit.module.css';
import { edit } from '../../ReduxFeatures/auth/authslce';
import { useDispatch, useSelector } from 'react-redux';

function EditformUser({ setshowform, user }) {
  const [formdata, setFormdata] = useState({
    email: user.email || "",
    password: "",
    profilePicture: user.profilePicture || null,
  });
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState('');
  const [previewUrl, setPreviewUrl] = useState(user.profilePicture || null);
  const dispatch = useDispatch()
  const {edited}=useSelector((state)=>state.auth)

  const handleText = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setMessage('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setMessage('Please upload an image file');
        return;
      }

      setFormdata({ ...formdata, profilePicture: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formdata.email.trim() === "" || formdata.password.trim() === '') {
      return setMessage('All fields are required');
    }

    if (!validateEmail(formdata.email)) {
      return setErrorEmail("Please enter a valid email address (e.g., example@domain.com).");
    } else {
      setErrorEmail('');
    }

    if (formdata.password.length < 6) {
      return setErrorPassword('Password must be at least 6 characters');
    } else {
      setErrorPassword('');
    }

    console.log("Updated Data:", formdata);
    setMessage("Profile updated successfully!");

    
    
    console.log(formdata.profilePicture+':PROfile1020')

    dispatch(edit({userId:user._id,formdata}))
    setshowform()
  };

  return (
    <div className={styles.main}>
      <form className={styles.signupForm} onSubmit={handleSubmit} noValidate>
        <button className={styles.close} onClick={() => setshowform(false)}>Close</button>
        <h4 id="message" className={styles.errorMsg}>{message}</h4>
        <div className={styles.logoContainer} />
        <div className={styles.signupContent}>
          <div className={styles.signupHeader}>Edit your Profile</div>
          
          <div className={styles.profileUploadContainer}>
            {previewUrl && (
              <div className={styles.imagePreview}>
                <img src={previewUrl} alt="Profile preview" className={styles.previewImage} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
              id="profilePicture"
            />
            <label htmlFor="profilePicture" className={styles.uploadButton}>
              {previewUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
            </label>
          </div>

          <input
            className={styles.signupInput}
            type="email"
            name="email"
            id="email"
            value={formdata.email}
            placeholder="Enter email"
            autoComplete="off"
            onChange={handleText}
          />
          {errorEmail && <p style={{ color: 'red', marginLeft: '3px' }}>{errorEmail}</p>}
          
          <input
            className={styles.signupInput}
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            onChange={handleText}
            value={formdata.password}
          />
          {errorPassword && <p style={{ color: 'red', marginLeft: '3px' }}>{errorPassword}</p>}

          <button className={styles.signupButton} type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditformUser;
