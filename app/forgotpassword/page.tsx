"use client";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <main className="form-signin w-100 m-auto">
              <Form>
                <div className="text-center mb-4">
                  <img
                    className="mb-4"
                    src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                    alt=""
                    width="72"
                    height="57"
                  />
                  <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
                  <p className="text-body-secondary">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="email"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <Form.Label htmlFor="floatingInput">Email address</Form.Label>
                </Form.Floating>

                <Button variant="primary" size="lg" type="submit" className="w-100 py-2">
                  Change Password
                </Button>

                <div className="text-center mt-3">
                  <Link href="/" className="text-decoration-none">
                    Back to Sign In
                  </Link>
                </div>

                <p className="mt-5 mb-3 text-body-secondary text-center">
                  &copy; 2017–2025
                </p>
              </Form>
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}