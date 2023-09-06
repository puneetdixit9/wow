import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import {
    Avatar,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    Box,
    Switch,
    Autocomplete,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import UserSession from '../../services/auth';
import { getUserByEmail, fetchCafeConfig, updateUserProfile } from '../../redux/actions/Items';

const UserProfile = () => {
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
    const [userActivationUpdating, setUserActivationUpdating] = useState(false)
    const [emptyRoleError, setEmptyRoleError] = useState(false)
    const [userEmailSearch, setUserEmailSearch] = useState(false)
    const countryCode = "+91"

    useEffect(() => {
        dispatch(fetchCafeConfig("hassanpur"))
    }, [])

    useEffect(() => {
        setUserProfile(reducerState.userInfo)
        setUserProfileCopy(reducerState.userInfo)
        setCafeConfig(reducerState.cafeConfig)
        setSearchingUser(reducerState.gettingUserInfo)
    }, [reducerState.userInfo, reducerState.cafeConfig, reducerState.gettingUserInfo])

    useEffect(() => {
        if (!reducerState.isUserUpdating) {
            setUserActivationUpdating(false)
            if (updatingUserProfile && !reducerState.isError) {
                setUpdatedUserProfileFields({})
            }
            setUpdatingUserProfile(false)
        }
    }, [reducerState.isUserUpdating])

    const handleSearchInputChange = (value) => {
        setSearchQuery(value)
        setUserEmailSearch(false)
    }

    const searchUser = () => {
        if (searchQuery.length) {
            setSearchUserError(false)
            dispatch(getUserByEmail(searchQuery))
            setSearchingUser(true)
            setUserEmailSearch(true)
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
        if ("role" in updatedUserProfileFields && updatedUserProfileFields["role"] === null) {
            setEmptyRoleError(true)
        } else {
            dispatch(updateUserProfile(userProfile.email, updatedUserProfileFields))
            setUpdatingUserProfile(true)
        }
    };

    const handleProfileChange = (key, value) => {
        if (key === "role" && value) {
            setEmptyRoleError(false)
        } else if (key === "phone" && value.length > 10) {
            return
        }
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
        dispatch(updateUserProfile(userProfile.email, payload))
        setUserActivationUpdating(true)
    }


    return (

        <Container sx={{ marginTop: 2 }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: "10px", mb: "10px", position: "sticky" }}>
                <Grid item xs={12} lg={9} xl={6} sx={{ display: "flex", justifyContent: "center", marginBottom: { xs: "10px", lg: 0 } }}>
                    <TextField
                        label="User Email"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                        error={searchUserError}
                        helperText={searchUserError ? "Invalid Email" : ""}
                    />
                </Grid>
                <Grid item xs={12} lg={3} xl={2} sx={{ display: "flex", justifyContent: "center", marginBottom: { xs: "10px", lg: 0 } }}>
                    <Button
                        variant="contained"
                        sx={{ display: "block" }}
                        onClick={searchUser}
                        disabled={searchingUser}
                        startIcon={searchingUser ? <CircularProgress size={15} /> : null}
                    >
                        {searchingUser ? 'Searching...' : 'Search User'}
                    </Button>
                </Grid>
            </Grid>

            {Object.keys(userProfile).length > 0 ? (
                <Paper elevation={1} sx={{ padding: 3 }}>
                    <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />

                    <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                        <Grid item>
                            <Typography variant="h7" sx={{ mt: 2 }}>{userProfile.email} | {userProfile.role}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">User Activate/Deactivate</Typography>
                            {userActivationUpdating ? (
                                <CircularProgress size={20} />
                            ) : (
                                <Switch checked={userProfile.is_active} onChange={handleActiveInactiveUser} color="primary" disabled={!UserSession.isAdmin()} />
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
                                sx={{ mb: 2 }}
                                onChange={(event) => handleProfileChange("first_name", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Last Name"
                                value={userProfile.last_name || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => handleProfileChange("last_name", event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Phone Number"
                                value={userProfile.phone || ''}
                                disabled={!editingInfo}
                                fullWidth
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{countryCode}</InputAdornment>,
                                    inputProps: {
                                        pattern: "\\d*",
                                        inputMode: "numeric",
                                        maxLength: 10,
                                    },
                                }}
                                onChange={(event) => handleProfileChange("phone", event.target.value)}
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
                                        error={emptyRoleError}
                                        helperText={emptyRoleError ? "Role can not be empty" : ""}
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
            ) : (
                userEmailSearch ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="25vh"
                        textAlign="center"
                    >
                        <Typography variant="h3">404 - User not found with ({searchQuery})</Typography>
                        <Typography variant="body1">
                            Please check your entered email address and try again.
                        </Typography>
                    </Box>
                ) : null

            )}
        </Container>
    );
}

export default UserProfile;
