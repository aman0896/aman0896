import React from "react";
import "./UserProfile.css";

const EditUserProf = () => {
  return (
    <div className="container p-5">
    <div className="row gutters">
       <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100 border-0">
             <div className="card-body">
                <div className="account-settings">
                   <div className="user-profile">
                      <div className="user-avatar">

                          <a href="#" aria-label="Change Profile Picture" className="change-pic">
                            <div className="profile-pic" style={{backgroundImage: "url(" + "https://bootdey.com/img/Content/avatar/avatar7.png" + ")"}} >
                            <input class="avatar-file h-100 w-100" type="file" name="file" accept="image/*"/>
                                <span className="glyphicon glyphicon-camera"></span>
                                <span>Change Image</span>

                            </div>
                          </a>

{/* 
                         <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Maxwell Admin"
                            /> */}
                      </div>
                      <h5 className="user-name">Random Person</h5>
                   </div>
                   {/* <div class="text-center">
                      <div class="file btn btn-sm btn-primary w-100">
                         Upload
                         <input class="avatar-file" type="file" name="file" accept="image/*"/>
                      </div>
                   </div> */}
                </div>
             </div>
          </div>
       </div>
       <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
             <div className="card-body">
                <div className="row gutters">
                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h3 className="mb-3 text-primary">Edit Profile Details</h3>
                      {/* 
                      <h5 className="mb-3 font-weight-bold">Profile</h5>
                      */}
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group no-bottom-border">
                         <label for="firstName">First Name</label>
                         <input type="text" class="form-control" id="firstName" placeholder="Enter your first name"/>
                      </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group no-bottom-border">
                         <label for="lastName">Last Name</label>
                         <input type="text" class="form-control" id="lastName" placeholder="Enter your last name"/>
                      </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group no-bottom-border">
                         <label for="email">Email</label>
                         <input type="email" class="form-control" id="email" placeholder="Email"/>
                      </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group no-bottom-border">
                         <label for="PhoneNumber">Phone Number</label>
                         <input type="url" class="form-control" id="PhoneNumber" placeholder="Phone Number"/>
                      </div>
                   </div>

                   
            <div class="col-12">
				<div class="form-group no-bottom-border">
					<label>Address</label>
					<textarea type="text" class="form-control" rows="2" placeholder="Address"></textarea>
				</div>
			</div> 

                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div>
                         <button
                            type="button"
                            id="submit"
                            name="submit"
                            className="btn btn-primary mr-2 float-right"
                            >
                         Update
                         </button>
                      </div>
                   </div>
         

                </div>
           
             </div>
          </div>
       </div>
       <div className="col-12 mt-4">
          <div className="card">
             <div className="card-body">
             <h3 className="mb-3 text-primary">Change Password</h3>
                <div className="row gutters">
                   <div class=" col-6">
                      <div class="form-group no-bottom-border">
                         <label for="currentPassword">Current Password</label>
                         <input type="password" class="form-control" id="currentPassword" placeholder="Enter your current password"/>
                      </div>
                   </div>
                   <div class=" col-6">
                      <div class="form-group no-bottom-border">
                         <label for="newPassword">New Password</label>
                         <input type="password" class="form-control" id="newPassword" placeholder="Enter your new password"/>
                      </div>
                   </div>
                   {/* 
                   <div class=" col-6">
                      <div class="form-group no-bottom-border">
                         <label for="confirmPassword">Confirm Password</label>
                         <input type="password" class="form-control" id="confirmPassword" placeholder="retype your new password"/>
                      </div>
                   </div>
                   */}
                </div>
                <div className="row gutters">
                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div>
                         <button
                            type="button"
                            id="submit"
                            name="submit"
                            className="btn btn-primary mr-2 float-right"
                            >
                         Update
                         </button>
                         {/* <button
                            type="button"
                            id="submit"
                            name="submit"
                            className="btn btn-primary mr-2"
                            >
                         Cancel
                         </button> */}
                      </div>
                   </div>
                </div>
             </div>
             
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                      <div>
                         <button
                            type="button"
                            id="submit"
                            name="submit"
                            className="btn cancel-btn btn-primary mr-2 "
                            >
                         Cancel
                         </button>
                      </div>
                   </div>
       </div>
    </div>
 </div>
  );
};

export default EditUserProf;
