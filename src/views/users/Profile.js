import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import {
    Avatar,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    Switch,
    Autocomplete,
    CircularProgress,
} from '@mui/material';
import UserSession from '../../services/auth';
import { getUserByEmail, fetchCafeConfig } from '../../redux/actions/Items';

const UserProfile = () => {
    const userId = 2

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const reducerState = useAppSelector(state => state.itemsReducer)

    const [userProfile, setUserProfile] = useState({})
    const [userProfileCopy, setUserProfileCopy] = useState({})
    const [editingInfo, setEditingInfo] = useState(false);
    const [updatingUserProfile, setUpdatingUserProfile] = useState(false);
    const [updatedUserProfileFields, setUpdatedUserProfileFields] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [cafeConfig, setCafeConfig] = useState({});
    const [searchingUser, setSearchingUser] = useState(false);
    const [searchUserError, setSearchUserError] = useState(false);

    useEffect(() => {
        dispatch(fetchCafeConfig("hassanpur"))
    }, [])

    useEffect(() => {
        setUserProfile(reducerState.userInfo)
        setUserProfileCopy(reducerState.userInfo)
        setCafeConfig(reducerState.cafeConfig)
        setSearchingUser(reducerState.gettingUserInfo)
    }, [reducerState.userInfo, reducerState.cafeConfig, reducerState.gettingUserInfo])

    const searchUser = () => {
        if (searchQuery.length) {
            setSearchUserError(false)
            dispatch(getUserByEmail(searchQuery))
            setSearchingUser(true)
        } else {
            setSearchUserError(true)
        }
        
    }

    const handleEditInfoToggle = () => {
        if (editingInfo) {
            setUserProfile(userProfileCopy)
        }
        setEditingInfo(!editingInfo);
    };

    const handleSave = () => {
        setUpdatingUserProfile(true)
    };

    const handleProfileChange = (key, value) => {
        setUserProfile({
            ...userProfile,
            [key]: value
        });
        setUpdatedUserProfileFields({
            ...updatedUserProfileFields,
            [key]: value
        })
    };

    const handleActiveInactiveUser = () => {
        const payload = {
            is_active: !userProfile.is_active
        };
        setUserProfile(
            {
                ...userProfile,
                is_active: !userProfile.is_active
            }
        );
    }


    return (

        <Container sx={{ marginTop: 2 }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: "10px", mb: "10px", position: "sticky" }}>
                <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                        label="Search user by email"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        error={searchUserError}
                        helperText={searchUserError ? "Invalid Email" : ""}
                    />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Button
                        variant="contained"
                        sx={{ ml: 2, display: "block" }}
                        onClick={searchUser}
                        disabled={searchingUser}
                        startIcon={searchingUser ? <CircularProgress size={15} /> : null}
                    >
                        {searchingUser ? 'Searching...' : 'Search User'}
                    </Button>
                </Grid>
            </Grid>

            {Object.keys(userProfile).length > 0 && (
                <Paper elevation={1} sx={{ padding: 3 }}>
                    <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />

                    <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                        <Grid item>
                            <Typography variant="h7" sx={{ mt: 2 }}>{userProfile.email} | {userProfile.role}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">Deactivate User</Typography>
                            {reducerState.userActivatioUpdating ? (
                                <CircularProgress size={20} />
                            ) : (
                                <Switch checked={!userProfile.is_active} onChange={handleActiveInactiveUser} color="primary" disabled={!UserSession.isAdmin()} />
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="First Name"
                                value={userProfile.first_name || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2, mt: 2 }}
                                onChange={(event) => handleProfileChange("first_name", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Middle Name"
                                value={userProfile.middle_name || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2, mt: 2 }}
                                onChange={(event) => handleProfileChange("middle_name", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Last Name"
                                value={userProfile.last_name || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2, mt: 2 }}
                                onChange={(event) => handleProfileChange("last_name", event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Email"
                                value={userProfile.email || ''}
                                disabled
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Phone Number"
                                value={userProfile.phone || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => handleProfileChange("mobile_number", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="User Id"
                                value={userProfile._id || ''}
                                disabled
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                                id="role"
                                options={cafeConfig.roles}
                                getOptionLabel={(option) => (option)}
                                value={userProfile.role}
                                onChange={(event, newValue) => handleProfileChange("role", newValue)}
                                disabled={!editingInfo || !UserSession.isAdmin()}
                                sx={{ mb: 2 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        name="role"
                                        label="Role"
                                    />
                                )}
                            />

                        </Grid>
                    </Grid>
                    {editingInfo ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                sx={{ marginRight: 2 }}
                                disabled={updatingUserProfile || !Object.keys(updatedUserProfileFields).length}
                                startIcon={updatingUserProfile ? <CircularProgress size={20} /> : null}
                            >
                                {updatingUserProfile ? 'Updating...' : 'Update'}
                            </Button>
                            <Button variant="outlined" onClick={handleEditInfoToggle}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleEditInfoToggle} disabled={!userProfile.is_active}>
                            Edit
                        </Button>
                    )}
                </Paper>
            )}
        </Container>
    );
}

export default UserProfile;
