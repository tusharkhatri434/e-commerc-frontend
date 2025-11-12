import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../context/slice/authSlice';
import { BASE_URL } from '../utils/url-config';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || '',
    }
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || '',
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData({
        ...profileData,
        [parent]: {
          ...profileData[parent],
          [child]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Update Redux state and localStorage immediately
      dispatch(updateUserProfile(profileData));
      
      // Optional: API call to sync with backend (uncomment when backend is ready)
      // const response = await fetch(`${BASE_URL}/v1/api/update-profile`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(profileData)
      // });
      // 
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.msg || 'Update failed');
      // 
      // // Update Redux with backend response
      // dispatch(updateUserProfile(data.user));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to current user data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || '',
      }
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-14">
      <Title text={{ title1: "MY", title2: "PROFILE" }} />

      <div className="flex flex-col md:flex-row gap-10 mt-10 mb-20">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={assets.profile_icon} 
                alt="Default Profile" 
                className="w-16 h-16 opacity-50"
              />
            )}
          </div>
          <h2 className="text-xl font-medium text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="mt-4 w-full">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="md:w-2/3">
          <div className="border border-gray-300 rounded-md p-6">
            <div className="inline-flex gap-2 items-center mb-6">
              <p className="text-gray-500">ACCOUNT <span className="text-gray-700 font-medium">DETAILS</span></p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled={true}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                    isEditing ? 'bg-white' : 'bg-gray-100'
                  } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="inline-flex gap-2 items-center mb-4">
                <p className="text-gray-500">SHIPPING <span className="text-gray-700 font-medium">ADDRESS</span></p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={profileData.address.street}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter street address"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={profileData.address.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter city"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                        isEditing ? 'bg-white' : 'bg-gray-100'
                      } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={profileData.address.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter state"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                        isEditing ? 'bg-white' : 'bg-gray-100'
                      } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={profileData.address.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter ZIP code"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                        isEditing ? 'bg-white' : 'bg-gray-100'
                      } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      value={profileData.address.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter country"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                        isEditing ? 'bg-white' : 'bg-gray-100'
                      } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 mt-6 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">$0</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">{user.role || 'User'}</p>
              <p className="text-sm text-gray-600">Account Type</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

