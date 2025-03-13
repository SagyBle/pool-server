import UniApiService from "@src/services/uniApi/uni.api.service";

const holdStones = async (req: any, res: any) => {
  try {
    const { stones, duration_minutes } = req.body;

    if (!stones || !Array.isArray(stones) || stones.length === 0) {
      return res.status(400).json({ error: "Invalid stones array provided" });
    }

    const response = await UniApiService.post("/home/hold", {
      stones,
      duration_minutes,
    });

    if (!response) {
      return res.status(500).json({ error: "Failed to hold stones" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error holding stones:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const releaseStones = async (req: any, res: any) => {
  try {
    const { stones } = req.body;

    if (!stones || !Array.isArray(stones) || stones.length === 0) {
      return res.status(400).json({ error: "Invalid stones array provided" });
    }

    const response = await UniApiService.post("/home/release", { stones });

    if (!response) {
      return res.status(500).json({ error: "Failed to release stones" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error releasing stones:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const buyStones = async (req: any, res: any) => {
  try {
    const { stones, po_number } = req.body;

    if (!stones || !Array.isArray(stones) || stones.length === 0) {
      return res.status(400).json({ error: "Invalid stones array provided" });
    }

    if (!po_number) {
      return res.status(400).json({ error: "Missing required po_number" });
    }

    const response = await UniApiService.post("/home/buy", {
      stones,
      po_number,
    });

    if (!response) {
      return res.status(500).json({ error: "Failed to buy stones" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error buying stones:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getStones = async (req: any, res: any) => {
  try {
    const { stones } = req.body;

    if (!stones || !Array.isArray(stones) || stones.length === 0) {
      return res.status(400).json({ error: "Invalid stones array provided" });
    }

    const response = await UniApiService.post(
      "/home/inventory",
      { stones },
      {},
      true
    );

    if (!response) {
      return res.status(500).json({ error: "Failed to fetch inventory data" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching stones:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default { holdStones, releaseStones, buyStones, getStones };
