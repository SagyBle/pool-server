import { parse } from "csv-parse/sync"; // CSV parser
import ApiService from "../api/api.service";

class UniApiService extends ApiService {
  private static instance: UniApiService;

  constructor(baseURL: string) {
    super(baseURL);
  }

  /**
   * GET request with optional CSV parsing
   */
  public async get<T>(
    endpoint: string,
    headers: object = {},
    parseCsv: boolean = false
  ): Promise<T | null> {
    // const response: any = await super.get(endpoint, headers);
    // const response: any = await super.get(endpoint, headers);
    const response = `stone_id,lab,active,reserved,reserved_till,carat,buy_price_per_carat,buy_price_total,shape,color,clarity,cut,polish,symmetry,flu,length,width,height,ratio,depth,table,origin,milky,shade,eye_clean,grading_url,video_url,sku_url,sku_url_2,sku_url_3,country,natural_diamond,estimated_delivery,updated_on
01-09746776,GIA,1,0,0,2.010,10833.33,21775.00,BR,G,VVS2,EX,EX,EX,NON,8.1200,8.1700,4.9400,0.99,60.7%,60%,Botswana,"No Milky",None,,,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9746776&surl=https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557480,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557480/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557480/heart.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557480/arrow.jpg,India,1,"5-7 days",1734557595
01-09746789,GIA,1,0,0,2.010,13215.05,26562.26,BR,F,VVS2,EX,EX,EX,NON,8.1400,8.1800,4.9200,1.00,60.2%,60%,Angola,"No Milky",None,,,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9746789&surl=https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557493,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557493/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557493/heart.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557493/arrow.jpg,India,1,"5-7 days",1734557595
01-09746824,GIA,1,0,0,2.010,8080.65,16242.10,BR,H,VS1,EX,EX,EX,NON,7.9800,8.0300,5.0000,0.99,62.5%,59%,,"No Milky",None,Yes,,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9746824&surl=https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557528,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557528/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557528/heart.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557528/arrow.jpg,India,1,"5-7 days",1734557595
01-09746807,GIA,1,0,0,1.000,3258.06,3258.06,BR,H,VVS2,EX,EX,EX,NON,6.4000,6.4400,3.9300,0.99,61.3%,60%,Angola,"No Milky",None,Yes,,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9746807&surl=https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557511,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557511/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557511/heart.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/18/grabber/imaged/13557511/arrow.jpg,India,1,"5-7 days",1734557595
01-09701715,GIA,1,0,0,1.500,6854.84,10282.26,BR,F,VS2,EX,EX,EX,NON,7.2800,7.3300,4.5600,0.99,62.4%,58%,,"No Milky",None,Yes,http://sl.customersapi.local.coolwebcode.com/media/cert/9701715/13462101,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9701715&surl=https://d305ukokfjetib.cloudfront.net/2024/12/9/grabber/imaged/13462101,https://d305ukokfjetib.cloudfront.net/2024/12/9/grabber/imaged/13462101/still.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/9/grabber/imaged/13462101/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/12/9/grabber/imaged/13462101/heart.jpg,India,1,"5-7 days",1734567717
01-09619425,GIA,1,0,0,1.040,3691.49,3839.15,BR,E,VS2,EX,EX,EX,FNT,6.4800,6.5200,4.0200,0.99,61.9%,58%,,"No Milky",None,Borderline,http://sl.customersapi.local.coolwebcode.com/media/cert/9619425/13289591,http://sl.customersapi.local.coolwebcode.com/vision/detail.php?d=9619425&surl=https://d305ukokfjetib.cloudfront.net/2024/11/22/grabber/imaged/13289591,https://d305ukokfjetib.cloudfront.net/2024/11/22/grabber/imaged/13289591/still.jpg,https://d305ukokfjetib.cloudfront.net/2024/11/22/grabber/imaged/13289591/default.jpg,https://d305ukokfjetib.cloudfront.net/2024/11/22/grabber/imaged/13289591/heart.jpg,"United States",1,"1-2 days",1734567718`;
    if (!response) return null;

    try {
      if (parseCsv) {
        return parse(response, { columns: true, skip_empty_lines: true }) as T;
      } else {
        return JSON.parse(response) as T;
      }
    } catch (error) {
      console.error("❌ Parsing Failed:", error);
      return null;
    }
  }
}

export default new UniApiService("");
