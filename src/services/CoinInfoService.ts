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

// make an interface with these types "name", "image", "description", "hashing_algorithm", "market_data", "coingecko_rank"
interface APIData {
    name: string;
    image: any;
    description: string;
    hashing_algorithm: string;
    market_data: any;
    coingecko_rank: number;
}

export default {
    getRawData(coinID: string) {
        return apiClient
            .get(`coins/${coinID}`)
            .then((res: AxiosResponse<APIData>): APIData => {
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
            .then((res: AxiosResponse) => res.data)
            .catch(() => {
                throw new Error("No coin with given ID found");
            });
    },
    async getCoinData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ): Promise<any> {
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
                return new Error(error);
            });
    }
};
