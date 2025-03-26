import UniApiService from "@src/services/uniApi/uni.api.service";
import StoneUniLab from "../../models/stones/stoneUniLab.model";
import data from "../../data/response.json";
import natural from "../../data/natural.json";
import StoneUniNatural from "@src/models/stones/stoneUniNatural.model";

const fetchFullInventoryLab = async (req: any, res: any) => {
  try {
    console.log("🔄 Fetching full uni inventory lab...");
    // const response = await UniApiService.post(
    //   "/home/inventory",
    //   { exclude_naturals: 1, exclude_lab_growns: 0 },
    //   {},
    //   { timeout: 900000, parseCsv: true } // ✅ Custom timeout and CSV parsing enabled
    // );

    const response = await importStoneUniLabJSONToDB();

    if (!response || !Array.isArray(response)) {
      console.error("❌ Failed to fetch or invalid inventory data");
      return res.status(500).json({ error: "Invalid inventory data" });
    }

    // ✅ Insert API response directly into MongoDB
    await StoneUniLab.insertMany(response);
    console.log("✅ Inventory successfully inserted into MongoDB!");

    return res
      .status(200)
      .json({ message: "Inventory fetched and stored successfully" });
  } catch (error) {
    console.error("❌ Error fetching or storing full inventory (lab):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// TODO: make it work as lab!
const fetchFullInventoryNatural = async (req: any, res: any) => {
  try {
    // const response = await UniApiService.post(
    //   "/home/inventory",
    //   { exclude_naturals: 0, exclude_lab_growns: 1 },
    //   {},
    //   { timeout: 900000, parseCsv: true }
    // );

    const response = await importStoneUniNaturalJSONToDB();

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch full inventory (natural)" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching full inventory (natural):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchInventoryUpdates = async (req: any, res: any) => {
  console.log("sagy1");
  const twoDaysAgoSeconds = Math.floor(Date.now() / 1000) - 2 * 24 * 60 * 60;
  console.log(twoDaysAgoSeconds);

  try {
    const response = await UniApiService.post(
      "/home/inventory",
      {
        updates_since: twoDaysAgoSeconds,
      },
      {},
      { timeout: 900000, parseCsv: true }
    );
    console.log("sagy2", response);

    const mockResponse = [
      {
        stone_id: "01-06434003",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "1.800",
        buy_price_per_carat: "17212.5",
        buy_price_total: "30982.50",
        shape: "BR",
        color: "D",
        clarity: "IF",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "7.6700",
        width: "7.7400",
        height: "4.8400",
        ratio: "0.99",
        depth: "62.9%",
        table: "57%",
        origin: "NA",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6434003/7455408",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6434003&surl=https://d305ukokfjetib.cloudfront.net/2023/8/17/grabber/imaged/7455408",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/8/17/grabber/imaged/7455408/still.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742796328",
      },
      {
        stone_id: "01-07845082",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.180",
        buy_price_per_carat: "1460.39",
        buy_price_total: "262.87",
        shape: "BR",
        color: "E",
        clarity: "VVS2",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "FNT",
        length: "3.6600",
        width: "3.6900",
        height: "2.1800",
        ratio: "0.99",
        depth: "59.2%",
        table: "59%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/7845082/10128822",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=7845082&surl=https://d305ukokfjetib.cloudfront.net/2024/4/19/grabber/imaged/10128822",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/4/19/grabber/imaged/10128822/default.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2024/4/19/grabber/imaged/10128822/still.jpg",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742797166",
      },
      {
        stone_id: "01-03821428",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.510",
        buy_price_per_carat: "2128.73",
        buy_price_total: "1085.65",
        shape: "PS",
        color: "F",
        clarity: "VS1",
        cut: "",
        polish: "EX",
        symmetry: "VG",
        flu: "NON",
        length: "6.4200",
        width: "4.3700",
        height: "2.9500",
        ratio: "1.47",
        depth: "67.5%",
        table: "54%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/3821428/4007468",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=3821428&surl=https://d305ukokfjetib.cloudfront.net/2023/3/24/grabber/imaged/4007468",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/3/24/grabber/imaged/4007468/still.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "United States",
        natural_diamond: "1",
        estimated_delivery: "1-2 days",
        updated_on: "1742797326",
      },
      {
        stone_id: "01-04298437",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.240",
        buy_price_per_carat: "1326.33",
        buy_price_total: "318.32",
        shape: "BR",
        color: "E",
        clarity: "SI1",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "FNT",
        length: "3.9500",
        width: "3.9800",
        height: "2.4700",
        ratio: "0.99",
        depth: "62.4%",
        table: "58%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/4298437/9570097",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=4298437&surl=https://d305ukokfjetib.cloudfront.net/2024/3/12/grabber/imaged/9570097",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/3/12/grabber/imaged/9570097/default.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2024/3/12/grabber/imaged/9570097/still.jpg",
        sku_url_3: "",
        country: "United States",
        natural_diamond: "1",
        estimated_delivery: "1-2 days",
        updated_on: "1742797408",
      },
      {
        stone_id: "01-06527955",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.240",
        buy_price_per_carat: "1696.04",
        buy_price_total: "407.05",
        shape: "BR",
        color: "E",
        clarity: "IF",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "FNT",
        length: "4.0300",
        width: "4.0500",
        height: "2.4800",
        ratio: "1.00",
        depth: "61.5%",
        table: "58%",
        origin: "Angola",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6527955/7592627",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6527955&surl=https://d305ukokfjetib.cloudfront.net/2023/9/1/grabber/imaged/7592627",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/9/1/grabber/imaged/7592627/still.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2023/9/1/grabber/imaged/7592627/default.jpg",
        sku_url_3:
          "https://d305ukokfjetib.cloudfront.net/2023/9/1/grabber/imaged/7592627/heart.jpg",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742797478",
      },
      {
        stone_id: "01-07745740",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.350",
        buy_price_per_carat: "2399",
        buy_price_total: "839.65",
        shape: "BR",
        color: "D",
        clarity: "VVS1",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "4.5100",
        width: "4.5400",
        height: "2.7700",
        ratio: "0.99",
        depth: "61.1%",
        table: "60%",
        origin: "NA",
        grading_url: "",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=7745740&surl=https://d305ukokfjetib.cloudfront.net/2024/4/5/grabber/imaged/9924193",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/4/5/grabber/imaged/9924193/default.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2024/4/5/grabber/imaged/9924193/still.jpg",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742879246",
      },
      {
        stone_id: "01-07789864",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.350",
        buy_price_per_carat: "2399",
        buy_price_total: "839.65",
        shape: "BR",
        color: "D",
        clarity: "VVS1",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "4.5200",
        width: "4.5300",
        height: "2.8200",
        ratio: "1.00",
        depth: "62.2%",
        table: "55%",
        origin: "NA",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/7789864/10026884",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=7789864&surl=https://d305ukokfjetib.cloudfront.net/2024/4/12/grabber/imaged/10026884",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/4/12/grabber/imaged/10026884/default.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2024/4/12/grabber/imaged/10026884/still.jpg",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742879409",
      },
      {
        stone_id: "01-07278026",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "1.180",
        buy_price_per_carat: "10125.81",
        buy_price_total: "11948.45",
        shape: "BR",
        color: "D",
        clarity: "VVS2",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "6.7100",
        width: "6.7400",
        height: "4.2200",
        ratio: "1.00",
        depth: "62.8%",
        table: "57%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/7278026/8908453",
        video_url: "",
        sku_url: "",
        sku_url_2: "",
        sku_url_3: "",
        country: "Belgium",
        natural_diamond: "1",
        estimated_delivery: "10 days",
        updated_on: "1742880163",
      },
      {
        stone_id: "01-06858001",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "1.510",
        buy_price_per_carat: "7737.44",
        buy_price_total: "11683.54",
        shape: "OV",
        color: "F",
        clarity: "VVS2",
        cut: "",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "9.8900",
        width: "6.2900",
        height: "3.7400",
        ratio: "1.57",
        depth: "59.5%",
        table: "60%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6858001/10756997",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6858001&surl=https://d305ukokfjetib.cloudfront.net/2023/10/28/grabber/imaged/8152509",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/10/28/grabber/imaged/8152509/default.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2023/10/28/grabber/imaged/8152509/still.jpg",
        sku_url_3: "",
        country: "",
        natural_diamond: "1",
        estimated_delivery: "",
        updated_on: "1742880427",
      },
      {
        stone_id: "01-07647126",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "1.500",
        buy_price_per_carat: "7613.98",
        buy_price_total: "11420.97",
        shape: "OV",
        color: "F",
        clarity: "VVS2",
        cut: "",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "9.3900",
        width: "6.1200",
        height: "3.8200",
        ratio: "1.53",
        depth: "62.4%",
        table: "58%",
        origin: "NA",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/7647126/9701180",
        video_url: "",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/4/12/grabber/imaged/9701180/default.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742880427",
      },
      {
        stone_id: "01-07851229",
        lab: "GIA",
        active: "1",
        reserved: "0",
        reserved_till: "0",
        carat: "0.500",
        buy_price_per_carat: "900",
        buy_price_total: "450.00",
        shape: "BR",
        color: "D",
        clarity: "IF",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "FNT",
        length: "0.0000",
        width: "0.0000",
        height: "0.0000",
        ratio: "0.00",
        depth: "0%",
        table: "0%",
        origin: "Canada",
        grading_url: "",
        video_url: "",
        sku_url: "",
        sku_url_2: "",
        sku_url_3: "",
        country: "",
        natural_diamond: "1",
        estimated_delivery: "",
        updated_on: "1742880454",
      },
      {
        stone_id: "01-07851230",
        lab: "GIA",
        active: "1",
        reserved: "0",
        reserved_till: "0",
        carat: "0.500",
        buy_price_per_carat: "1612.9",
        buy_price_total: "806.45",
        shape: "BR",
        color: "D",
        clarity: "VVS1",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "FNT",
        length: "0.0000",
        width: "0.0000",
        height: "0.0000",
        ratio: "0.00",
        depth: "0%",
        table: "0%",
        origin: "Canada",
        grading_url: "",
        video_url: "",
        sku_url: "",
        sku_url_2: "",
        sku_url_3: "",
        country: "",
        natural_diamond: "1",
        estimated_delivery: "",
        updated_on: "1742882567",
      },
      {
        stone_id: "01-06032049",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.320",
        buy_price_per_carat: "1628.25",
        buy_price_total: "521.04",
        shape: "MQ",
        color: "D",
        clarity: "VVS2",
        cut: "",
        polish: "EX",
        symmetry: "VG",
        flu: "NON",
        length: "6.7900",
        width: "3.5400",
        height: "2.1800",
        ratio: "1.92",
        depth: "61.5%",
        table: "62%",
        origin: "DTC",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6032049/6765215",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6032049&surl=https://d305ukokfjetib.cloudfront.net/2023/7/26/grabber/imaged/6765215",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/7/26/grabber/imaged/6765215/still.jpg",
        sku_url_2:
          "https://d305ukokfjetib.cloudfront.net/2023/8/24/grabber/imaged/6765215/default.jpg",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742905162",
      },
      {
        stone_id: "01-06570686",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "0.300",
        buy_price_per_carat: "1673.17",
        buy_price_total: "501.95",
        shape: "MQ",
        color: "D",
        clarity: "VVS2",
        cut: "",
        polish: "VG",
        symmetry: "EX",
        flu: "NON",
        length: "6.7100",
        width: "3.5300",
        height: "2.2600",
        ratio: "1.90",
        depth: "64%",
        table: "58%",
        origin: "DTC",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6570686/7642728",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6570686&surl=https://d305ukokfjetib.cloudfront.net/2024/1/16/grabber/imaged/7642728",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/1/16/grabber/imaged/7642728/still.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742905162",
      },
    ];

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch inventory updates" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching inventory updates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const importStoneUniLabJSONToDB = async () => {
  // get as body which file to import
  try {
    // Insert data into MongoDB
    await StoneUniLab.insertMany(data);
    console.log("JSON data imported successfully!");
    return true;
  } catch (error) {
    console.error("Error importing JSON:", error);
    return false;
  }
};

const importStoneUniNaturalJSONToDB = async () => {
  // get as body which file to import
  try {
    // Insert data into MongoDB
    await StoneUniNatural.insertMany(natural);
    console.log("JSON data imported successfully!");
    return true;
  } catch (error) {
    console.error("Error importing JSON:", error);
    return false;
  }
};

export default {
  fetchFullInventoryLab,
  fetchFullInventoryNatural,
  fetchInventoryUpdates,
  importStoneUniLabJSONToDB,
  importStoneUniNaturalJSONToDB,
};
