import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

function pick(obj: any, [...keys]) {
    return Object.fromEntries(
        keys.filter((key) => key in obj).map((key) => [key, obj[key]])
    );
}
interface MarketData {
    market_cap: Array<number>;
    prices: Array<number>;
    total_volumes: Array<number>;
}

// make an interface with these types "name", "image", "description", "hashing_algorithm", "market_data", "coingecko_rank"
interface RawData {
    name: string;
    image: any;
    description: {
        en: string;
    };
    hashing_algorithm: string;
    market_data: any;
    current_price: {
        usd: number;
        eur: number;
        cad: number;
        jpy: number;
        aud: number;
    };
    price_change_percentage_24h: number;
    coingecko_rank: number;
}
export interface APIData extends RawData {
    marketData: MarketData;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
    getRawData(coinID: string) {
        return apiClient
            .get(`coins/${coinID}`)
            .then((res: AxiosResponse<RawData>): RawData => {
                return pick(res.data, [
                    "name",
                    "image",
                    "description",
                    "hashing_algorithm",
                    "market_data",
                    "coingecko_rank"
                ]);
            })
            .catch(() => {
                throw new Error("No coin with given ID found");
            });
    },
    getMarketData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ) {
        return apiClient
            .get(
                `coins/${coinID}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}&interval=${interval}`
            )
            .then((res: AxiosResponse): MarketData => res.data)
            .catch(() => {
                throw new Error("No coin with given ID found");
            });
    },
    async getCoinData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ): Promise<APIData> {
        return Promise.all([
            this.getRawData(coinID),
            this.getMarketData(coinID, currency, days, interval)
        ])
            .then(([basicData, marketData]) => {
                return {
                    ...basicData,
                    marketData
                };
            })
            .catch((error) => {
                throw new Error(error);
            });
    },
    async getTopCoins(
        currency: string,
        order: string = "market_cap",
        per_page: number = 20,
        page: number = 1,
        sparkline: boolean = false
    ) {
        return apiClient
            .get(
                `coins/markets?vs_currency=${currency
                    .toLowerCase()
                    .trim()}&order=${order
                    .toLowerCase()
                    .trim()}&per_page=${per_page}&page=${page}&sparkline=${sparkline}`
            )
            .then((res: AxiosResponse) => res.data)
            .catch(() => {
                throw new Error("Internal Server Error 500");
            });
    }
};
