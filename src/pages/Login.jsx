import { useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password: password }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Login failed");
      }

      const data = await response.json();
      const jwt = data.accessToken;
      localStorage.setItem("accessToken", jwt);
      navigate("/main");
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };

  const handleSignup = () => {
    navigate("/join");
  };
  return (
    <Container maxWidth="xs" className="mt-20">
      <Box className="p-4 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
        <form noValidate autoComplete="off">
          <div className="mb-4">
            <TextField
              label="아이디"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="비밀번호"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="contained" color="primary" onClick={handleSignup}>
              회원가입
            </Button>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              로그인
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
