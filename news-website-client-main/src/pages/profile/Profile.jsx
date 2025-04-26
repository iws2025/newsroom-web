import React, { useEffect, useState } from 'react'
import AvatarUpload from '../../components/imageUpload/AvatarUpload'
import { getProfile, updateProfile } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { cleanObj } from '../../utilities/utils';

const Profile = () => {
    const { user, saveUser } = useAuth();
    const [data, setData] = useState({
        email: "",
        username: "",
        description: "",
        currentPassword: "",
        newPassword: "",
    });
    const [avatar, setAvatar] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setData((prevForm) => ({
          ...prevForm, 
          [name]: value, 
        }));
    };

    const fetchUser = async () => {
        try {
            const response = await getProfile(user._id);
            const fetchedUser = response.data;
            setData(prev => ({
                ...prev,
                email: fetchedUser.email,
                username: fetchedUser.username,
                description: fetchedUser.description ?? "",
            }));
            setAvatar(fetchedUser.avatar);
        } catch (error) {   
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if ((data.currentPassword || data.newPassword)) {
            if (data.currentPassword) {
                if (!data.newPassword) {
                    toast.error("Please enter passwords");
                    return;
                }
            };
            if (data.newPassword) {
                if (!data.currentPassword) {
                    toast.error("Please enter passwords");
                    return;
                }
            };
            if (data.currentPassword !== data.newPassword) {
                toast.error("Passwords do not match");
                return;
            }
        }

        if (!data.username || !avatar) {
            toast.error("Please enter all required fields!");
            return;
        }

        const result = await updateProfile(cleanObj({
            userId: user._id,
            username: data.username,
            password: data.newPassword ?? "",
            description: data.description,
            avatar: avatar
        }));
        if (result) {
            toast.success(result.message);
            saveUser(result.user);
            fetchUser();
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div id="profile">
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="/home">Home</a>
                        <span className="breadcrumb-item active">Profile</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Update Profile</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="bg-light mb-3 p-5">
                                <h4 className="text-center">Avatar</h4>
                                <AvatarUpload avatar={avatar} setAvatar={setAvatar}/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3 p-5">
                                <div id="success"></div>
                                <form onSubmit={onSubmit} autoComplete="off">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="control-group">
                                                <label htmlFor="email" className="font-weight-bold">Email</label>
                                                <input type="text" className="form-control p-4" placeholder="Email" disabled name="email" value={data.email} autoComplete="off"/>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="control-group">
                                                <label htmlFor="username" className="font-weight-bold">Username</label>
                                                <input type="text" className="form-control p-4" placeholder="Username" name="username" value={data.username} onChange={handleInputChange} autoComplete="off"/>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="currentPassword" className="font-weight-bold">Current Password</label>
                                        <input type="password" className="form-control p-4" placeholder="Current Password" name="currentPassword" value={data.currentPassword} onChange={handleInputChange} autoComplete="off"/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="newPassword" className="font-weight-bold">New Password</label>
                                        <input type="password" className="form-control p-4" placeholder="New Password" name="newPassword" value={data.newPassword} onChange={handleInputChange}/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="description" className="font-weight-bold">Description</label>
                                        <textarea className="form-control" rows="4" placeholder="Description" name="description" value={data.description} onChange={handleInputChange}></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary font-weight-semi-bold px-4" style={{ height: "50px" }} onClick={onSubmit}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile