import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            return;
        }

        fetch("http://localhost:4000/users/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.code === "PASSWORD-CHANGE-SUCCESS") {
                setSuccess(true);
                setError("");
            } else {
                setError(data.message);
            }
        })
        .catch(error => {
            setError("An error occurred while changing the password.");
            console.error("Error:", error);
        });
    };

    return (
        <Container className="p-5 mt-4 bg-light rounded shadow">
            <h2 className="mb-4 text-center">Change Password</h2>
            {success && (
                <div className="alert alert-success" role="alert">
                    Password changed successfully!
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" size="lg" className="w-100">
                    Change Password
                </Button>
            </Form>
        </Container>
    );
}
