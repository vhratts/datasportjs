import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

interface Provider {
    tid: number;
    name: string;
    default: boolean;
    slug: string;
    id: string;
    s5: string;
    url: string;
}

interface Headers {
    [key: string]: string | number | boolean;
}

class SportradarAPI {
    providers: Provider[] = [
        {
            tid: 1,
            name: 'Sport Radar',
            default: true,
            slug: 'sport-radar',
            id: 'sportradar',
            s5: 'https://stats.fn.sportradar.com/sportradar',
            url: 'https://sportradar.com'
        },
        {
            tid: 2,
            name: 'Bet365',
            default: false,
            slug: 'bet-365',
            id: 'bet365',
            s5: 'https://stats.fn.sportradar.com/bet365',
            url: 'https://bet365.com'
        },
        {
            tid: 3,
            name: 'BetWay',
            default: false,
            slug: 'bet-way',
            id: 'betway',
            s5: 'https://stats.fn.sportradar.com/betway',
            url: 'https://betway.com'
        },
        {
            tid: 4,
            name: 'BetFair',
            default: false,
            slug: 'bet-fair',
            id: 'betFair',
            s5: 'https://stats.fn.sportradar.com/betFair',
            url: 'https://betfair.com'
        },
        {
            tid: 5,
            name: 'Betano',
            default: false,
            slug: 'betano',
            id: 'betano',
            s5: 'https://stats.fn.sportradar.com/betano',
            url: 'https://betano.com'
        },
        {
            tid: 6,
            name: 'Rivalo',
            default: false,
            slug: 'rivalo',
            id: 'rivalo',
            s5: 'https://stats.fn.sportradar.com/rivalo',
            url: 'https://rivalo.com'
        },
        {
            tid: 7,
            name: '888Sport',
            default: false,
            slug: '888sport',
            id: '888sport',
            s5: 'https://stats.fn.sportradar.com/888sport',
            url: 'https://888sport.com'
        },
        {
            tid: 8,
            name: 'SportingBet',
            default: false,
            slug: 'sporting-bet',
            id: 'sportingbet',
            s5: 'https://stats.fn.sportradar.com/sportingbet',
            url: 'https://sportingbet.com'
        },
    ];

    headers: Headers = {
        'accept': '*/*',
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'origin': 'https://s5.sir.sportradar.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://s5.sir.sportradar.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    };

    jar: CookieJar;
    axiosInstance: AxiosInstance;

    constructor(baseURL: string | null = null, locale: string = 'br', timezone: string = 'America:New_York') {
        if (baseURL == null) {
            const provider = this.providers.find((p) => p.default);
            baseURL = provider ? provider.s5 : '';
        }

        this.jar = new CookieJar();
        this.axiosInstance = wrapper(axios.create({
            baseURL: `${baseURL}/${locale}/${timezone}/gismo`,
            jar: this.jar,
            withCredentials: true,
            headers: this.headers,
        }));
    }

    /**
     * Função auxiliar para fazer requisições GET usando Axios.
     * 
     * @param endpoint - O endpoint específico para a chamada de API (sem a URL base).
     * @returns Os dados retornados da API ou `null` em caso de erro.
     */
    async fetchData<T>(endpoint: string): Promise<T | null> {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data.doc[0].data as T;
        } catch (error) {
            console.error(`Erro ao buscar dados do endpoint ${endpoint}:`, error);
            return null;
        }
    }

    // Adicionar anotações de tipos em cada função conforme necessário
    async getSportsList(): Promise<{ sports: any[] } | null> {
        return this.fetchData('config_sports/41/0');
    }

    async getSupportedCountries(sportId: number): Promise<{ countries: any[] } | null> {
        return this.fetchData(`config_tree_mini/41/0/${sportId}`);
    }

    async getCountryDetails(countryId: number): Promise<{ country: any } | null> {
        return this.fetchData(`category_get/${countryId}`);
    }

    async getTournaments(sportId: number, countryId: number): Promise<{ tournaments: any[] } | null> {
        return this.fetchData(`config_tree_mini/41/0/${sportId}/${countryId}`);
    }

    async getSeasonMeta(tournamentId: number): Promise<{ season: any } | null> {
        return this.fetchData(`stats_season_meta/${tournamentId}`);
    }

    async getSeasonTables(tournamentId: number): Promise<{ tables: any[] } | null> {
        return this.fetchData(`stats_season_tables/${tournamentId}`);
    }

    async getFormTable(tournamentId: number): Promise<{ form_table: any[] } | null> {
        return this.fetchData(`stats_formtable/${tournamentId}`);
    }

    async getLeagueSummary(tournamentId: number): Promise<{ league_summary: any } | null> {
        return this.fetchData(`stats_season_leaguesummary/${tournamentId}/main`);
    }

    async getUniqueTeamStats(tournamentId: number): Promise<{ team_stats: any[] } | null> {
        return this.fetchData(`stats_season_uniqueteamstats/${tournamentId}`);
    }

    async getGoalsData(tournamentId: number): Promise<{ goals: any } | null> {
        return this.fetchData(`stats_season_goals/${tournamentId}/main`);
    }

    async getOverUnder(tournamentId: number): Promise<{ over_under: any } | null> {
        return this.fetchData(`stats_season_overunder/${tournamentId}`);
    }

    async getTeamNextGames(teamId: number): Promise<{ next_games: any[] } | null> {
        return this.fetchData(`stats_team_nextx/${teamId}`);
    }

    async getMatchDetails(matchId: number): Promise<{ match: any } | null> {
        return this.fetchData(`match_get/${matchId}`);
    }
}

export {
    SportradarAPI
};
