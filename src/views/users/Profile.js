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

const UserProfile = () => {
    const userId = 2

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer);

    const [userProfile, setUserProfile] = useState({})
    const [userProfileCopy, setUserProfileCopy] = useState({})
    const [editingInfo, setEditingInfo] = useState(false);
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState({})
    const [updatingUserProfile, setUpdatingUserProfile] = useState(false);
    const [updatedUserProfileFields, setUpdatedUserProfileFields] = useState({});

    // useEffect(() => {
    //     if (UserSession.isAuthenticated()) {
    //         // dispatch(getRoles())
    //         // dispatch(getSubFunctions())
    //         // dispatch(getUserProfile(userId))
    //         // dispatch(getAvailablePermission())
    //         // dispatch(getUserPermissions(userId))
    //     } else {
    //         navigate("/signin")
    //     }
    // }, [])

    // useEffect(() => {
    //     setUserProfile(projectsState.userProfileData)
    //     setUserProfileCopy(projectsState.userProfileData)
    //     setSubFunctionsData(projectsState.subFunctions)
    //     setRoles(projectsState.roles)
    //     setAvailablePermissions(projectsState.permissions)
    //     setUserPermissions(projectsState.userPermissions)
    //     setUserUpdatedPermissions(projectsState.userPermissions)
    // }, [projectsState.userProfileData, projectsState.subFunctions, projectsState.roles, projectsState.permissions, projectsState.userPermissions])


    // useEffect(() => {
    //     setFilteredSubFunctions(subFunctionsData.filter(subFunction => subFunction.dept_id === userProfile.dept_id))
    //     setSelectedFunction(subFunctionsData.find(subFunction => subFunction.func_id === userProfile.func_id));
    //     setSelectedDepartment(subFunctionsData.find(subFunction => subFunction.dept_id === userProfile.dept_id)?.dept_name || '');
    //     setSelectedRole(roles.find(role => role.role_id === userProfile.role_id));
    // }, [subFunctionsData, roles])

    // useEffect(() => {
    //     const oldPermissions = userPermissions.map(permission => permission.permission_id)
    //     const updatedPermissions = userUpdatedPermissions.map(permission => permission.permission_id)
    //     const isPermissionAdded = !updatedPermissions.every(permissionId => oldPermissions.includes(permissionId))
    //     const isPermissionRemoved = !oldPermissions.every(permissionId => updatedPermissions.includes(permissionId))

    //     setIsPermissionUpdated(true)
    //     if (isPermissionAdded && isPermissionRemoved) {
    //         console.log("Permissions added and removed")
    //     } else if (isPermissionAdded) {
    //         console.log("Permission Added")
    //     } else if (isPermissionRemoved) {
    //         console.log("Permission Removed")
    //     } else {
    //         setIsPermissionUpdated(false)
    //         console.log("No change in permissions")
    //     }
    // }, [userUpdatedPermissions, userPermissions])

    // useEffect(() => {
    //     if (!projectsState.isUserUpdating) {
    //         setUpdatingUserProfile(false)
    //         setEditingInfo(false);
    //         setUpdatedUserProfileFields({})
    //     }
    // }, [projectsState.userPermissionsUpdating, projectsState.isUserUpdating])


    const handleRoleOrFunctionChange = (key, newValue) => {
        if (newValue) {
            if (key === "func_id") {
                handleProfileChange(key, newValue.func_id)
            } else {
                setSelectedRole(newValue)
                handleProfileChange(key, newValue.role_id)
            }
        }
    }


    const handleEditInfoToggle = () => {
        if (editingInfo) {
            setUserProfile(userProfileCopy)
        }
        setEditingInfo(!editingInfo);
    };

    const handleSave = () => {
        if ("dept_id" in updatedUserProfileFields && !("func_id" in updatedUserProfileFields)) {
            return;
        }

        // dispatch(updateUserDetails(userId, updatedUserProfileFields))
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
        // dispatch(updateUserDetails(userId, payload));
        setUserProfile(
            {
                ...userProfile,
                is_active: !userProfile.is_active
            }
        );
    }


    return (
        <Container sx={{ marginTop: 2 }}>
            <Paper elevation={1} sx={{ padding: 3 }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />

                <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                    <Grid item>
                        <Typography variant="h7" sx={{ mt: 2 }}>{userProfile.email} | {roles.find(role => role.role_id === userProfile.role_id)?.role_name || ""}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Deactivate User</Typography>
                        {projectsState ? (
                            <CircularProgress size={20} />
                        ) : (
                            <Switch checked={!userProfile.is_active} onChange={handleActiveInactiveUser} color="primary" disabled={!UserSession.isAdmin()} />
                        )}
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 2 }}>Personal Information</Typography>

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
                            label="Username"
                            value={userProfile.username || ''}
                            disabled
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Phone Number"
                            value={userProfile.mobile_number || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => handleProfileChange("mobile_number", event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="User Id"
                            value={userProfile.user_id || ''}
                            disabled
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            id="role"
                            options={roles}
                            getOptionLabel={(option) => (option ? option.role_name : '')}
                            value={selectedRole}
                            onChange={(event, newValue) => handleRoleOrFunctionChange("role_id", newValue)}
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
        </Container>
    );
}

export default UserProfile;
