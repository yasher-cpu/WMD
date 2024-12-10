import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Profile() {
    const [userInfo, setUserInfo] = useState([]);

    const fetchProfile = (_id) => {
        fetch("http://localhost:4000/users/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ _id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.code === "USER-FOUND") {
                console.log("User Details:", data.result);
                setUserInfo(data.result);
            } else {
                console.error("Error fetching user details:", data.message);
            }
        })        
        .catch(error => {
            console.error("Error:", error);
        });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Container fluid className="p-4 d-flex flex-column justify-content-center align-items-center">
    <h1 className="mb-3 display-4 fw-bold">My Profile</h1>

    {userInfo ? (
        <Container className="bg-light p-4 rounded shadow">
            <Row className="mb-3">
                <Col>
                    <h5 className="fw-bold">First Name:</h5>
                    <p>{userInfo.firstName}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h5 className="fw-bold">Middle Name:</h5>
                    <p>{userInfo.middleName}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h5 className="fw-bold">Last Name:</h5>
                    <p>{userInfo.lastName}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h5 className="fw-bold">Email:</h5>
                    <p>{userInfo.email}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h5 className="fw-bold">Contact Number:</h5>
                    <p>{userInfo.contactNumber}</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button
                        size="md"
                        className="rounded-pill py-2 px-4 shadow btn-Secondary fw-bold"
                        onClick={() => window.location.href = "/change-password"}
                    >
                        Change Password
                    </Button>
                </Col>
            </Row>
        </Container>
    ) : (
        <p>Loading profile...</p>
    )}
</Container>
    );
}
