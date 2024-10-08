import { AxiosInstance } from 'axios';
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

declare class SportradarAPI {
    providers: Provider[];
    headers: Headers;
    jar: CookieJar;
    axiosInstance: AxiosInstance;

    constructor(baseURL?: string | null, locale?: string, timezone?: string);

    fetchData<T>(endpoint: string): Promise<T | null>;

    getSportsList(): Promise<{ sports: any[] } | null>;

    getSupportedCountries(sportId: number): Promise<{ countries: any[] } | null>;

    getCountryDetails(countryId: number): Promise<{ country: any } | null>;

    getTournaments(sportId: number, countryId: number): Promise<{ tournaments: any[] } | null>;

    getSeasonMeta(tournamentId: number): Promise<{ season: any } | null>;

    getSeasonTables(tournamentId: number): Promise<{ tables: any[] } | null>;

    getFormTable(tournamentId: number): Promise<{ form_table: any[] } | null>;

    getLeagueSummary(tournamentId: number): Promise<{ league_summary: any } | null>;

    getUniqueTeamStats(tournamentId: number): Promise<{ team_stats: any[] } | null>;

    getGoalsData(tournamentId: number): Promise<{ goals: any } | null>;

    getOverUnder(tournamentId: number): Promise<{ over_under: any } | null>;

    getTeamNextGames(teamId: number): Promise<{ next_games: any[] } | null>;

    getMatchDetails(matchId: number): Promise<{ match: any } | null>;
}

export { SportradarAPI, Provider, Headers };
