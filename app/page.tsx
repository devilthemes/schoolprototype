"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "superadmin@gmail.com") {
      router.push("/superadmin");
    } else if (email === "schooladmin@gmail.com") {
      router.push("/schooladmin");
    } else if (email === "teacher@gmail.com") {
      router.push("/teacher");
    } else {
      alert("Invalid email. Use superadmin@gmail.com, schooladmin@gmail.com or teacher@gmail.com");
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <main className="form-signin w-100 m-auto">
              <Form onSubmit={handleSignIn}>
                <div className="flex flex-column text-center mb-4 justify-content-center">
                  <div className="flex justify-content-center">
                    <img
                      className="mb-4"
                      src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                      alt=""
                      width="72"
                      height="57"
                    />
                  </div>
                  <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                </div>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="email"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingInput">Email address</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <Form.Label htmlFor="floatingPassword">Password</Form.Label>
                </Form.Floating>

                <div className="d-flex justify-content-between align-items-center my-3">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    id="checkDefault"
                  />
                  <Link href="/forgotpassword" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 py-2"
                >
                  Sign in
                </Button>

                <p className="mt-5 mb-3 text-body-secondary text-center">
                  &copy; 2026
                </p>
              </Form>
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
