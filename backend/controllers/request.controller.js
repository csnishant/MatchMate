import Request from "../models/request.js";

export const sendRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.body;

    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);

    if (!receiverId) {
      console.log("❌ Receiver ID missing");
      return res.status(400).json({ message: "Receiver ID required" });
    }

    const existing = await Request.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    console.log("Existing Request:", existing);

    if (existing) {
      if (existing.status === "pending") {
        console.log("Request already sent");
        return res.status(400).json({ message: "Request already sent" });
      }

      if (existing.status === "accepted") {
        return res.status(400).json({ message: "Already connected" });
      }

      if (existing.status === "rejected") {
        await Request.deleteOne({ _id: existing._id });
      }
    }

    const newRequest = new Request({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await newRequest.save();

    console.log("✅ New Request Saved");
    res.status(200).json({ message: "Request sent successfully" });
  } catch (err) {
    console.error("❌ Send Request Error:", err);
    res.status(500).json({ message: "Failed to send request" });
  }
};

export const getAcceptedRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const acceptedRequests = await Request.find({
      sender: userId,
      status: "accepted",
    }).populate("receiver", "name age gender profilePic");

    const users = acceptedRequests.map((req) => req.receiver);

    res.status(200).json({ users });
  } catch (err) {
    console.error("Accepted Request Error:", err);
    res.status(500).json({ message: "Failed to fetch accepted requests" });
  }
};
export const getMyRequests = async (req, res) => {
  try {
    const senderId = req.userId;

    const requests = await Request.find({ sender: senderId }).populate(
      "receiver",
      "name _id"
    );

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Failed to load requests" });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const receiverId = req.userId;

    const requests = await Request.find({
      receiver: receiverId,
      status: "pending",
    }).populate("sender", "name profilePic age gender"); // show who sent the request

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get Received Requests Error:", error);
    res.status(500).json({ message: "Failed to fetch received requests" });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res
      .status(200)
      .json({ message: `Request ${status} successfully`, request });
  } catch (error) {
    console.error("Update Request Error:", error);
    res.status(500).json({ message: "Failed to update request" });
  }
};
