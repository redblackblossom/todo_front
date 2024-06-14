import { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDisabled(
      !(email && password && confirmPassword && password === confirmPassword)
    );
  }, [email, password, confirmPassword]);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password: password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      alert("회원가입 완료! 로그인 해주세요");
      navigate("/");
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup failed");
    }
  };
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="xs" className="mt-20">
      <Box className="p-4 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
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
          <div className="mb-4">
            <TextField
              label="비밀번호 재입력"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="contained" color="primary" onClick={handleLogin}>
              로그인
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              disabled={isDisabled}
            >
              회원가입
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
