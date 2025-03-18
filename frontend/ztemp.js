import userModel from "../models/userModel.js";

const getUserAuthDetails = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing details." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found." };
    }

    return res.status(200).json({ success: true, userDetails: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
