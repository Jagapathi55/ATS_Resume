import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Avatar,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [resumeCount, setResumeCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }

    api.get("/resume/my-resumes").then((res) => {
      setResumeCount(res.data.length);
    });
  }, []);

  const saveProfile = async () => {
    try {
      const res = await api.put("/auth/update", {
        name: profile.name,
        email: profile.email,
      });

      const updatedUser = {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 5, bgcolor: "#f3f4ff" }}>
      <Typography variant="h3" fontWeight="bold" color="#2c2c2c" mb={1}>
        My Profile
      </Typography>
      <Typography color="gray" mb={6}>
        Manage your personal information & resume statistics
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "2fr 1fr" }}
        gap={5}
      >
        <Card
          sx={{
            borderRadius: "20px",
            p: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="600">
                Profile Information
              </Typography>

              {!editMode && (
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mt={4} display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Full Name"
                fullWidth
                disabled={!editMode}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />

              <TextField
                label="Email Address"
                fullWidth
                disabled
                value={profile.email}
              />

              {editMode && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.4,
                    borderRadius: "12px",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={saveProfile}
                >
                  Save Changes
                </Button>
              )}

              {!editMode && (
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  sx={{
                    mt: 2,
                    py: 1.4,
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                  onClick={() => setPasswordModal(true)}
                >
                  Change Password
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        <Box display="flex" flexDirection="column" gap={4}>
          <Card
            sx={{
              borderRadius: "20px",
              p: 4,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <Avatar
              sx={{
                width: 110,
                height: 110,
                mx: "auto",
                bgcolor: "#7b61ff",
                fontSize: "40px",
              }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography variant="h6" mt={2} fontWeight="600">
              {profile.name}
            </Typography>
            <Typography color="gray">{profile.email}</Typography>
          </Card>

          <Card
            sx={{
              borderRadius: "20px",
              p: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="600"
              color="#333"
              mb={3}
              textAlign="center"
            >
              Profile Stats
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="gray">Resumes Created</Typography>
              <Typography fontWeight="600" color="#4f46e5">
                {resumeCount}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography color="gray">Avg ATS Score</Typography>
              <Typography fontWeight="600" color="#0ea75a">
                68%
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>

      <ChangePasswordModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
      />
    </Box>
  );
}
