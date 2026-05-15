import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await registerUserService({
      name,
      email,
      password,
    });

    // Set cookie
    res.cookie("token", result.token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
    });
  } catch (error) {
    console.error("Error in registerUser controller:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUserService({
      email,
      password,
    });

    // Set JWT in cookie
    res.cookie("token", result.token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: result.user,
    });
  } catch (error) {
    console.error("Error in loginUser controller:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}
