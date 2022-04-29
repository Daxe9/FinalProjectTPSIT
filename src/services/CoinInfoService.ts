import axios from "axios";

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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
    getRawData(coinID: string) {
        return apiClient
            .get(`coins/${coinID}`)
            .then(({ data }) =>
                pick(data, [
                    "description",
                    "hashing_algorithm",
                    "market_data",
                    "coingecko_rank"
                ])
            )
            .catch((error) => {
                return new Error(error);
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
            .then(({ data }) => data)
            .catch((error) => {
                return new Error(error);
            });
    },
    async getCoinData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ): Promise<any> {
        await sleep(1000);
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
