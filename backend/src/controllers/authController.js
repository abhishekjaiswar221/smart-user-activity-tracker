import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const data = await registerUserService({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("Error in registerUser controller:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const data = await loginUserService({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("Error in loginUser controller:", error);

    return res.status(401).json({
      message: error.message,
    });
  }
}
