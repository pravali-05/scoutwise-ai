import { useState } from "react";
import { Bot, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ValidationError {
  loc?: string[];
  msg?: string;
  type?: string;
}

interface RegisterResponse {
  success?: boolean;
  message?: string;
  detail?: string | ValidationError[];
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // -----------------------------------------
    // Validate fields
    // -----------------------------------------

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    // -----------------------------------------
    // Validate email
    // -----------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    // -----------------------------------------
    // Validate password
    // -----------------------------------------

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters long."
      );
      return;
    }

    // -----------------------------------------
    // Confirm password
    // -----------------------------------------

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // -----------------------------------------
    // Prevent duplicate requests
    // -----------------------------------------

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------
      // Send registration request
      // -----------------------------------------

      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      // -----------------------------------------
      // Read backend response
      // -----------------------------------------

      const data =
        (await response.json()) as RegisterResponse;

      console.log(
        "Register status:",
        response.status
      );

      console.log(
        "Register response:",
        data
      );

      // -----------------------------------------
      // Handle backend error
      // -----------------------------------------

      if (!response.ok) {
        let errorMessage =
          "Registration failed.";

        if (Array.isArray(data.detail)) {
          errorMessage = data.detail
            .map(
              (error) =>
                error.msg ||
                "Validation error"
            )
            .join("\n");
        } else if (
          typeof data.detail === "string"
        ) {
          errorMessage = data.detail;
        } else if (
          typeof data.message === "string"
        ) {
          errorMessage = data.message;
        }

        alert(errorMessage);

        return;
      }

      // -----------------------------------------
      // Registration successful
      // -----------------------------------------

      alert(
        "Registration Successful! 🎉"
      );

      // -----------------------------------------
      // Go to login
      // -----------------------------------------

      navigate("/login");

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Cannot connect to FastAPI backend. Make sure FastAPI is running."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
            <Bot size={40} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-bold">
          Create Account 🚀
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Join MyGenie AI Assistant
        </p>

        <div className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>

            <div className="mt-2 flex items-center rounded-xl border px-4">
              <User
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <div className="mt-2 flex items-center rounded-xl border px-4">
              <Mail
                size={20}
                className="text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="mt-2 flex items-center rounded-xl border px-4">
              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <div className="mt-2 flex items-center rounded-xl border px-4">
              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
            className="ml-1 cursor-pointer font-semibold text-blue-600"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}