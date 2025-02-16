import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';

function Signup() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    profilePicture: null
  });
  const [message, setmessage] = useState('');
  const [erroremail, setrerroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleText = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setmessage('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setmessage('Please upload an image file');
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

  const email = formdata.email;
  const validatemail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmition = async (e) => {
    e.preventDefault();
  
    if (formdata.email.trim() === "" || formdata.password.trim() === '') {
      return setmessage('All fields are required');
    }
  
    if (!validatemail(formdata.email)) {
      return setrerroremail("Please enter a valid email address (e.g., example@domain.com).");
    } else {
      setrerroremail('');
    }
  
    const length = formdata.password.length;
    if (length < 6) {
      return seterrorpassword('Give at least 6 characters');
    } else {
      seterrorpassword('');
    }
  
    try {
      const formData = new FormData();
      formData.append('email', formdata.email);
      formData.append('password', formdata.password);
      if (formdata.profilePicture) {
        formData.append('profilePicture', formdata.profilePicture);
      }
  
      const response = await axios.post("http://localhost:4000/api/data/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setmessage(response.data.message);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error);
      console.log(error);

      if (error.response) {
        // Ensure we set a string, not an object
        setmessage(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        setmessage('No response from the server. Please try again.');
      } else {
        setmessage('An error occurred. Please try again.');
      }
    }
  };
  return (
    <div className={styles.main}>
      <form className={styles.signupForm} onSubmit={handleSubmition} noValidate>
        <h4 id="message" className={styles.errorMsg}>
          {/* Error Message */}
        </h4>
        <div className={styles.logoContainer} />
        <div className={styles.signupContent}>
          <div className={styles.signupHeader}>Register to your account</div>
          
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
            placeholder="Enter email"
            autoComplete="off"
            onChange={handleText}
            value={formdata.email}
          />
          {erroremail && <p style={{color:'red', marginLeft:'3px'}}>{erroremail}</p>}
          
          <input
            className={styles.signupInput}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleText}
            value={formdata.password}
          />
          {errorpassword && <p style={{color:'red', marginLeft:'3px'}}>{errorpassword}</p>}

          <button className={styles.signupButton} type="submit">
            Register
          </button>
          {message && (
            <p style={{color:'red', marginLeft:'60px'}}>{message}</p>
          )}
          <div className={styles.signupLinks}>
            <Link to='/login' className={styles.loginLink}>login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;