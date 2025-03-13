import UniApiService from "@src/services/uniApi/uni.api.service";

const checkStonesAvailability = async (req: any, res: any) => {
  try {
    const { stones } = req.body;

    if (!stones || !Array.isArray(stones) || stones.length === 0) {
      return res.status(400).json({ error: "Invalid stones array provided" });
    }

    const response = await UniApiService.post("/home/check-availability", {
      stones,
    });

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch availability data" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error checking availability:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default { checkStonesAvailability };
